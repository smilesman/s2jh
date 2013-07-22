/**
 */

(function($) {

    $.widget("ui.tabs", $.ui.tabs, {

        options : {
            cache : true,
            heightStyle : 'content',
            beforeLoad : function(event, ui) {
                if (ui.tab.data("loaded")) {
                    event.preventDefault();
                    return;
                }

                ui.jqXHR.success(function() {
                    ui.tab.data("loaded", true);
                });
            },
            activate : function(event, ui) {
                var href = ui.newTab.find("a.ui-tabs-anchor").attr("href");
                var local = href.substring(0, 1) == "#";
                var refreshButton = ui.newTab.parent().find("span.refresh-active");
                if (!local) {
                    refreshButton.show();
                } else {
                    refreshButton.hide();
                }

                // 处理点击顺序，以便关闭时按照顺序合理显示
                var max = ui.oldTab.attr("_activeCounter");
                if (max == undefined) {
                    max = 1;
                }
                // alert(max);
                ui.newTab.attr("_activeCounter", (Number(max) + 1));
            }
        },

        _create : function() {
            var self = this;
            self._super();
            self.element.show();
            // remote类型添加refresh操作图标
            /**
             * this.anchors.each(function(i, anchor) { var local =
             * anchor.hash.length > 1 &&
             * decodeURIComponent(anchor.href.replace(/#.*$/, "")) ===
             * decodeURIComponent(location.href.replace(/#.*$/, "")); // remote
             * tab if (!local) { $(anchor).prepend("<i class='icon-refresh'
             * style='cursor:pointer'></i> "); } });
             */

            var refreshButton = $('<span style="float:right;" class="refresh-active hide"><i class="icon-refresh icon-white" style="cursor:pointer"></i></span>');
            this.tablist.append(refreshButton);
            refreshButton.click(function() {
                self.reload();
            });

            self.element.delegate("ul.ui-tabs-nav > span > i.icon-refresh", "click", function(event) {
                var li = $(this).closest("li");
                if (li.hasClass("ui-tabs-active")) {
                    self.reload();
                }
                event.stopPropagation();
            });
            self.element.delegate("ul.ui-tabs-nav > li.closable", "dblclick", function(event) {
                self.remove();
                event.stopPropagation();
            });
            
            self.element.delegate("ul.ui-tabs-nav > li.closable > a.closable-icon", "click", function(event) {
                var idx=$(this).parent().index('li'); 
                self.remove(idx);
                event.stopPropagation();
            });
            
            if (this.options.disableItemsExcludeFirst == 'true') {
                for (i = 1; i < this.tabs.length; i++) {
                    this.disable(i);
                }
            }
        },

        remove : function(idx) {
            var self = this;
            if (idx == undefined) {
                idx = self.options.active
            }
            var tab = self.element.children(".ui-tabs-nav").find("li:eq(" + idx + ")");
            // Find the id of the associated panel
            var panelId = tab.attr("aria-controls");
            // Remove the tab
            tab.remove();
            // Remove the panel
            $("#" + panelId).remove();

            var max = 0;
            self.element.children(".ui-tabs-nav").find("li").each(function(i, tab) {
                var activeCounter = $(tab).attr("_activeCounter");
                if (activeCounter) {
                    if (Number(activeCounter) > max) {
                        max = Number(activeCounter);
                        idx = i;
                    }
                }
            });
            // Refresh the tabs widget
            self._activate(idx);
            self.refresh();
        },

        add : function(url, title, active) {
            var idx = this._getIndex(url);
            if (idx >= 0) {
                this._activate(idx);
                return;
            }
            $("<li class='closable' title='双击可关闭当前项'><a href='" + url + "'><span>" + title + "</span></a><a href='#' style='padding:1px;cursor:pointer' class='closable-icon'><span class='ui-icon ui-icon-close'></span></a></li>").appendTo(this.element.find(" > ul.ui-tabs-nav"));
            this.refresh();
            this.tablist.find("li.refresh-active").show();
            if (active == undefined || active) {
                this._activate(this.tabs.length - 1);
            }
        },

        reload : function(options, idx) {
            if (options == undefined) {
                options = {};
            }
            if (idx == undefined) {
                idx = this.options.active
            }
            var tab = this.tabs.eq(idx);
            var href = tab.find("a.ui-tabs-anchor");
            var url = href.attr("href");
            tab.data("loaded", false);
            if (options.parameters) {
                $.each(options.parameters, function(name, value) {
                    url = AddOrReplaceUrlParameter(url, name, value);
                });
                href.attr("href", url);
            }
            if (options.title) {
                href.find(" > span").html(options.title);
            }
            this.load(this.options.active);
        }
    });

})(jQuery);