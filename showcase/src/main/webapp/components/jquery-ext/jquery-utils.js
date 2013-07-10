/**
 * 传入URL字符串，对指定参数值进行处理：有就替换，没有就追加参数
 * 
 * @param url
 *            URL字符串
 * @param paramname
 *            参数名称
 * @param paramvalue
 *            替换参数值
 * @returns
 */
function AddOrReplaceUrlParameter(url, paramname, paramvalue) {

    var index = url.indexOf("?");
    if (index == -1) {
        url = url + "?" + paramname + "=" + paramvalue;
    } else {
        var s1 = url.split("?");
        var params = s1[1].split("&");
        var pn = "";
        var flag = false;
        for (i = 0; i < params.length; i++) {
            pn = params[i].split("=")[0];
            if (pn == paramname) {
                params[i] = paramname + "=" + paramvalue;
                flag = true;
                break;
            }
        }
        if (!flag) {
            url = url + "&" + paramname + "=" + paramvalue;
        } else {
            url = s1[0] + "?";
            for (i = 0; i < params.length; i++) {
                if (i > 0) {
                    url = url + "&";
                }
                url = url + params[i];
            }
        }

    }
    return url;
}

function toggle_multi_select(field,btn) {
    select = $(field);
    if (select.attr("multiple") == true || select.attr("multiple")=="multiple") {
        select.attr("multiple",false);
        if(btn){
            $(btn).find("i").removeClass("icon-minus-sign");
            $(btn).find("i").toggleClass("icon-plus-sign");
        }
    } else {
        select.attr("multiple",true);
        if(btn){
            $(btn).find("i").removeClass("icon-plus-sign");
            $(btn).find("i").toggleClass("icon-minus-sign");
        }
    }
}

(function($) {

    $.assert = function(condition, message) {
        if (!condition) {
            if (window.console) {
                console.debug(message);
            } else {
                alert(message);
            }
        }
    };

    $.assertNotBlank = function(val, message) {
        if (val == undefined || $.trim(val) == '') {
            $.assert(false, message);
            return;
        }
    };

    $.fn.ajaxGetUrl = function(url) {
        $.assertNotBlank(url);
        var self = $(this);
        $.get(url, null, function(data, textStatus) {
            self.html(data);
            self.attr("url", url);
        });
        return self;
    };

    $.fn.refreshClosest = function(parameters) {
        var tabs = $(this).closest("div.ui-tabs");
        if (tabs.size() == 1) {
            tabs.tabs("reload");
            return;
        }

        var dialog = $(this).closest("div.ui-dialog-content");
        if (dialog.size() == 1) {
            var url = dialog.attr("_url");
            if (parameters) {
                $.each(parameters, function(name, value) {
                    url = AddOrReplaceUrlParameter(url, name, value);
                });
            }
            dialog.load(url);
            dialog.attr("_url", url);
            return;
        }

        self.location.reload();
    };

    $.fn.refreshClosestDialog = function(parameters) {
        var dialog = $(this).closest("div.ui-dialog-content");
        if (dialog.size() == 1) {
            var url = dialog.attr("_url");
            if (parameters) {
                $.each(parameters, function(name, value) {
                    url = AddOrReplaceUrlParameter(url, name, value);
                });
            }
            dialog.load(url);
            dialog.attr("_url", url);
            return;
        }
    };

    $.resetCalculateGridWidth = function() {
        $("div.ui-jqgrid:visible").each(function() {
            var newW = $(this).parent().width();
            if (newW) {
                $("#" + $(this).attr("id").substr(5)).jqGrid("setGridWidth", newW - 2,false);
            }
        });
    }

    $.jAlert = function(msg, options) {
        options = $.extend({
            modal : true,
            title : '提示',
            overlay_opacity : 0.4,
            type : 'warning'
        }, options);
        $.Zebra_Dialog(msg, options);
    }

    /**
     * AJAX Post调用，主要用于URL提交请求
     * 
     * @params url 提交URL
     * @returns
     */
    $.ajaxPostURL = function(options) {
        if (!options.url) {
            alert("[url] option is required.");
        }

        var settings = jQuery.extend({
            data : {},
            publishMessage : true
        }, options);

        if (settings.confirm) {
            if (!confirm(settings.confirm)) {
                return false;
            }
        }
        $.post(encodeURI(settings.url), settings.data, function(response, textStatus) {
            if (!response.type) {
                publishErrorContentPage(response);
                return;
            }
            if (response.type == "success") {
                if (settings.publishMessage) {
                    top.$.publishMessage(response.message);
                }
                if (settings.successCallback) {
                    settings.successCallback(response);
                }
            } else {
                top.$.publishError(response.message);
                if (settings.failureCallback) {
                    settings.failureCallback(response);
                }
            }
        }, "json");
    }

    var stack_bottomright = {
        "dir1" : "up",
        "dir2" : "left",
        "firstpos1" : 25,
        "firstpos2" : 25
    };

    /**
     * JS客户端方式在公共消息区域显示提示消息
     * 
     * @params msg 显示信息
     * @returns
     */
    $.publishMessage = function(msg) {
        $.pnotify({
            title : "操作提示",
            text : msg,
            addclass : "stack-bottomright",
            type : 'info',
            closer_hover : false,
            history : false,
            width : "400px",
            delay : 2000,
            styling : 'jqueryui',
            stack : stack_bottomright
        });
    }

    /**
     * JS客户端方式在公共消息区域以红色显示错误信息
     * 
     * @params msg 显示的错误信息
     * @returns
     */
    $.publishError = function(msg, devMode) {
        var title = "错误提示";
        if (devMode) {
            title = title + "&nbsp;<font size='-2'><a href='javascript:showDetail()'>查看异常明细</a></font>";
        }
        $.pnotify({
            title : title,
            text : msg,
            addclass : "stack-bottomright",
            history : true,
            type : 'error',
            closer_hover : false,
            sticker_hover : false,
            history : false,
            width : "600px",
            delay : 30000,
            styling : 'jqueryui',
            stack : stack_bottomright
        });
    }

    $.toggleAdvanceSearch = function(btn) {
        var target = $(btn);
        var icon = target.find("i");
        if (icon.hasClass("icon-chevron-down")) {
            icon.removeClass("icon-chevron-down");
            icon.addClass("icon-chevron-up");
            target.closest('form').find('div.advanceSearchDiv').show();
        } else {
            icon.removeClass("icon-chevron-up");
            icon.addClass("icon-chevron-down");
            target.closest('form').find('div.advanceSearchDiv').hide();
        }
    }
    
    $.fn.findFormElements = function() {
        return this.find(":input[type='text'], :input[type='password'], :input[type='radio'], :input[type='checkbox'], :input[type='file'], select , textarea");
    };

})(jQuery);
