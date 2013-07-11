(function($) {
    $.widget("ui.treeinput", {
        options : {

        },
        _create : function() {

            var self = this, el = self.element;

            var divContaner = $('<div class="input-append"/>');
            divContaner.insertBefore(el);

            el.appendTo(divContaner);

            var hiddenElement = null;
            if (self.options.hiddenName && self.options.hiddenName != '') {
                hiddenElement = $('<input name="' + self.options.hiddenName + '" type="hidden"/>');
                hiddenElement.appendTo(divContaner);
            }

            var container = $('<div class="alert alert-info" style="display: none; position: absolute;"/>');

            var closer = $('<button type="button" class="close" data-dismiss="alert">X</button>').appendTo(container);

            closer.click(function() {
                container.fadeOut('fast');
            });

            var tree = $('<ul id="tree_' + ('' + Math.random()).slice(-6) + '" class="ztree" style="margin-top: 0; width: 160px;"></ul>').appendTo(container);

            this.button = $('<span class="add-on"><i class="icon-arrow-down"></i></span>').attr("tabIndex", -1).attr('title', "点击选取").appendTo(divContaner).click(function() {
                var offset = el.offset();
                $(container).css({
                    left : offset.left + "px",
                    top : offset.top + el.outerHeight() + "px"
                }).toggle("fast");
                if ($.trim(tree.html()) == '') {
                    $.getJSON(self.options.url, function(data) {
                        $.fn.zTree.init(tree, {
                            view : {
                                dblClickExpand : false
                            },
                            check : {
                                enable : true,
                                chkStyle : "radio",
                                radioType : "all"
                            },
                            callback : {
                                onCheck : function(event, treeId, treeNode) {
                                    var zTree = $.fn.zTree.getZTreeObj(treeId), nodes = zTree.getCheckedNodes(true);
                                    var v = "";
                                    for ( var i = 0, l = nodes.length; i < l; i++) {
                                        v += nodes[i].name + ",";
                                    }
                                    if (v.length > 0)
                                        v = v.substring(0, v.length - 1);
                                    el.attr("value", v);

                                    if (hiddenElement != null) {
                                        v = "";
                                        for ( var i = 0, l = nodes.length; i < l; i++) {
                                            v += nodes[i].id + ",";
                                        }
                                        if (v.length > 0)
                                            v = v.substring(0, v.length - 1);
                                        hiddenElement.attr("value", v);
                                    }
                                    
                                    container.fadeOut('fast');
                                },
                                onClick : function(event, treeId, treeNode) {
                                    var zTree = $.fn.zTree.getZTreeObj(treeId);
                                    zTree.checkNode(treeNode, !treeNode.checked, null, true);
                                    return false;
                                }
                            }
                        }, data);
                    });
                }
                return false;
            });

            container.appendTo(divContaner);
        }
    });
})(jQuery);
