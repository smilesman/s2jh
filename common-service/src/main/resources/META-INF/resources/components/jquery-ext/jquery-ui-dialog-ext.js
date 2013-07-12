/**
 */

(function($) {

    $.extend($.ui.dialog.prototype, {

        initMinMaxRestore : function() {
            var self = this, options = self.options;
            self._isMax = false;
            self._isMin = false;

            uiDialogTitlebarMaxRestore = $('<a href="#"></a>').addClass('ui-dialog-titlebar-max ' + 'ui-corner-all').attr('role', 'button').hover(function() {
                uiDialogTitlebarMaxRestore.addClass('ui-state-hover');
            }, function() {
                uiDialogTitlebarMaxRestore.removeClass('ui-state-hover');
            }).focus(function() {
                uiDialogTitlebarMaxRestore.addClass('ui-state-focus');
            }).blur(function() {
                uiDialogTitlebarMaxRestore.removeClass('ui-state-focus');
            }).click(function(event) {
                if (self._isMax || self._isMin) {
                    self.restore(event);
                } else {
                    self.maximize(event);
                }
                return false;
            }).appendTo(self.uiDialogTitlebar);

            self.uiDialogTitlebar.dblclick(function(event) {
                uiDialogTitlebarMaxRestore.trigger("click");
                return false;
            });

            uiDialogTitlebarMaxRestoreText = (self.uiDialogTitlebarMaxRestoreText = $('<span></span>')).addClass('ui-icon ' + 'ui-icon-extlink').text("Max").appendTo(uiDialogTitlebarMaxRestore);

            /* Minimize the window */
            uiDialogTitlebarMin = (self.uiDialogTitlebarMin = $('<a href="#"></a>')).addClass('ui-dialog-titlebar-min ' + 'ui-corner-all').attr('role', 'button').hover(function() {
                uiDialogTitlebarMin.addClass('ui-state-hover');
            }, function() {
                uiDialogTitlebarMin.removeClass('ui-state-hover');
            }).focus(function() {
                uiDialogTitlebarMin.addClass('ui-state-focus');
            }).blur(function() {
                uiDialogTitlebarMin.removeClass('ui-state-focus');
            }).click(function(event) {
                self.minimize(event);
                return false;
            }).appendTo(self.uiDialogTitlebar);

            uiDialogTitlebarMinText = (self.uiDialogTitlebarMinText = $('<span></span>')).addClass('ui-icon ' + 'ui-icon ui-icon-minusthick').text("Min").appendTo(uiDialogTitlebarMin);
        },

        /* Maximize to the whole visible size of the window */
        maximize : function() {

            var self = this, options = self.options;

            self.positionBeforeMinMax = self.uiDialog.position();
            self.heightBeforeMinMax = self.uiDialog.height();
            self.widthBeforeMinMax = self.uiDialog.width();

            /* A different width and height for each browser...wondering why? */
            marginHDialog = 3;
            marginWDialog = 12;
            // if ($.browser.msie && $.browser.version == 8) {
            // marginHDialog = 25;
            // marginWDialog = 52;
            // }
            marginHDialog = $(window).height() - marginHDialog;
            marginWDialog = $('body').width() - marginWDialog;

            self.uiDialog.css({
                position : "absolute",
                bottom : "auto",
                left : 0,
                top : 0
            });
            options.width = marginWDialog;
            options.height = marginHDialog;
            self._size();
            self.uiDialogTitlebarMin.show();
            self.uiDialogTitlebarMaxRestoreText.addClass("ui-icon-newwin").removeClass("ui-icon-extlink").text("Restore");
            self._isMax = true;
            if (options.maxCallback) {
                options.maxCallback(self.uiDialog);
            }
        },

        /* Minimize to a custom position */
        minimize : function() {

            var self = this, options = self.options;

            self.positionBeforeMinMax = self.uiDialog.position();
            self.heightBeforeMinMax = self.uiDialog.height();
            self.widthBeforeMinMax = self.uiDialog.width();

            self.uiDialog.css({
                position : "absolute",
                top : "auto",
                left : 10,
                width : 250,
                height : 30,
                bottom : 0
            });
            self.uiDialog.css('position', 'fixed'); /*
                                                     * sticky the dialog at the
                                                     * page to avoid scrolling
                                                     */
            self.uiDialogTitlebarMin.hide();
            self._isMin = true;
            if (options.minCallback) {
                options.minCallback(self.uiDialog);
            }
        },

        /* Allow restore the dialog */
        restore : function() {
            var self = this, options = self.options;
            self.uiDialog.css({
                position : "absolute",
                bottom : "auto",
                left : self.positionBeforeMinMax.left,
                top : self.positionBeforeMinMax.top
            });
            options.height = self.heightBeforeMinMax;
            options.width = self.widthBeforeMinMax;
            self._size();
            self.uiDialogTitlebarMin.show();
            self.uiDialogTitlebarMaxRestoreText.addClass("ui-icon-extlink").removeClass("ui-icon-newwin").text("Max");
            self._isMax = false;
            self._isMin = false;
            if (options.restoreCallback) {
                options.restoreCallback(self.uiDialog);
            }
        },

        reload : function(parameters) {
            var self = this, options = self.options;
            if (parameters) {
                $.each(parameters, function(name, value) {
                    options.url = AddOrReplaceUrlParameter(options.url, name, value);
                });
            }
            load(options.url);
        }
    });

    $.popupDialog = function(options) {
        $.assertNotBlank(options.url);
        var height = $(window).height() - 20 - 14;
        var width = $('body').width() - 20;
        var resetjqGridWidth = function(dialog) {
            dialog.find("div[id^='gbox_'].ui-jqgrid").each(function() {
                var newW = $(this).parent().width();
                if (newW) {
                    $("#" + $(this).attr("id").substr(5)).setGridWidth(newW - 2);
                }
            });
        };
        var defaultOptions = {
            dialogId : 'editDialog',
            modal : false,
            autoOpen : false,
            width : width,
            height : height,
            heightStyle : 'fill',
            minHeight : 30,
            title : 'Popup Dialog',
            // buttons: {
            // "关闭": function() {
            // $( this ).dialog( "close" );
            // }
            // },
            initOpenMax : false,
            resizeStop : function(event, ui) {
                resetjqGridWidth($("#" + mergeOptions.dialogId));
            },
            beforeClose : function(event, ui) {
                var formChanged = false;
                $("#" + mergeOptions.dialogId).find("form").each(function() {
                    if ($(this).attr("_needTrackChang") == 'true') {
                        if ($(this).attr("_inputChanged") == 'true') {
                            formChanged = true;
                        }
                    }
                });
                if (formChanged) {
                    return confirm("当前窗口有未提交的修改表单数据,是否确认关闭?");
                }
            },
            maxCallback : function(dialog) {
                resetjqGridWidth(dialog);
            },
            restoreCallback : function(dialog) {
                resetjqGridWidth(dialog);
            }
        };
        var mergeOptions = jQuery.extend(defaultOptions, options);
        var dialogId = mergeOptions.dialogId;
        var dialogObj = $("#" + dialogId);
        if (dialogObj.length <= 0) {
            $("body").append("<div id='" + dialogId + "' style='width:100%;overflow-x:hidden;'></div>")
            dialogObj = $("#" + dialogId);
            dialogObj.dialog(mergeOptions);
            dialogObj.dialog("initMinMaxRestore");
        }

        var oldUrl = dialogObj.attr("_url");
        if (oldUrl == undefined || mergeOptions.url != oldUrl) {
            dialogObj.dialog("option", "title", mergeOptions.title);
            if (mergeOptions.width) {
                dialogObj.dialog("option", "width", mergeOptions.width);
            }
            if (mergeOptions.height) {
                dialogObj.dialog("option", "height", mergeOptions.height);
            }
            dialogObj.load(mergeOptions.url, function() {
                if (mergeOptions.callback) {
                    mergeOptions.callback();
                }
            });
        }

        dialogObj.css('overflow-y', 'scroll');
        dialogObj.attr("_url", mergeOptions.url);
        dialogObj.dialog("open");
        if (mergeOptions.initOpenMax) {
            dialogObj.dialog("maximize");
        }
    };

    $.popupViewDialog = function(url) {
        $.popupDialog({
            dialogId : 'viewDialog_' + new Date().getTime(),
            url : url,
            title : '数据查看'
        })
    };

})(jQuery);