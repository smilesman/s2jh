(function($) {
    $.widget("ui.treeinput", {
        options : {
            hiddenValue: ''
        },
        _create : function() {

            var self = this, el = self.element;

            var divContaner = $('<div class="input-append"/>');
            divContaner.insertBefore(el);

            el.appendTo(divContaner);

            var hiddenElement = null;
            if (self.options.hiddenName && self.options.hiddenName != '') {
                hiddenElement = $('<input name="' + self.options.hiddenName + '" value="' + self.options.hiddenValue + '"  type="hidden"/>');
                hiddenElement.appendTo(divContaner);
            }

            var container = $('<div class="alert alert-info" style="display: none; position: absolute;margin: 0; padding: 0"/>');

            var closer = $('<button type="button" class="close" data-dismiss="alert" style="right: 5px;top: 5px">X</button>').appendTo(container);

            closer.click(function() {
                container.fadeOut('fast');
            });

            var tree = $('<ul id="tree_' + ('' + Math.random()).slice(-6) + '" class="ztree" style="margin-top: 0; width: 160px;"></ul>').appendTo(container);

            this.button = $('<span class="add-on"><i class="icon-arrow-down"></i></span>').attr("tabIndex", -1).attr('title', "点击选取").appendTo(divContaner).click(function() {
                
                if ($.trim(tree.html()) == '') {
                    var element=el[0];
                    var actualLeft = element.offsetLeft;
                    var actualTop = element.offsetTop;
                    var current = element.offsetParent;
                    while (current !== null){
                                          　　　　　　actualLeft += current.offsetLeft;
                                          　　　　　　current = current.offsetParent;
                                          　　　　}

                    $(container).css({
                        left : actualLeft-1,
                        top : actualTop + el.outerHeight(),
                        width: element.width
                    });
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
                $(container).toggle("fast");
                return false;
            });

            container.appendTo(divContaner);
        }
    });
})(jQuery);
