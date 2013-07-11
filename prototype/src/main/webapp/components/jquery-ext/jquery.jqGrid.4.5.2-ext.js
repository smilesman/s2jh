(function($) {

    $.extend($.ui.multiselect, {
        defaults : {
            sortable : true,
            searchable : true,
            animated : 'fast',
            show : 'slideDown',
            hide : 'slideUp',
            dividerLocation : 0.6,
            nodeComparator : function(node1, node2) {
                var text1 = node1.text(), text2 = node2.text();
                return text1 == text2 ? 0 : (text1 < text2 ? -1 : 1);
            }
        },
        locale : {
            addAll : '添加全部',
            removeAll : '移除全部',
            itemsCount : '项已选'
        }
    });

    $.extend($.jgrid.defaults, {
        datatype : "json",
        loadonce : false,
        filterToolbar : true,
        ignoreCase : true,
        prmNames : {
            npage : "npage"
        },
        jsonReader : {
            repeatitems : false,
            root : "content",
            total : "totalPages",
            records : "totalElements"
        },
        treeReader : {
            level_field : "extraAttributes.level",
            parent_id_field : "extraAttributes.parent",
            leaf_field : "extraAttributes.isLeaf",
            expanded_field : "extraAttributes.expanded",
            loaded : "extraAttributes.loaded",
            icon_field : "extraAttributes.icon"
        },
        autowidth : true,
        rowNum : 15,
        page : 1,
        altclass : "evennumber",
        height : "auto",
        viewsortcols : [ true, 'vertical', true ],
        mtype : "POST",
        rowList : [ 5, 10, 15, 20, 50, 100, 200 ],
        viewrecords : true,
        rownumbers : true,
        gridview : true,
        altRows : true,
        sortable : true,
        multiselect : true,
        multiSort : true,
        forceFit : false,
        shrinkToFit : true,
        ajaxSelectOptions : {
            cache : true
        },
        loadError : function(ts, xhr, st, err) {
            alert("表格数据加载处理失败,请尝试刷新或联系管理员!");
            // publishErrorContentPage(st);
        }
    });

    $.extend($.jgrid.search, {
        multipleSearch : true,
        multipleGroup : true,
        width : 700,
        jqModal : false,

        searchOperators : true,
        stringResult : true,
        searchOnEnter : true,
        defaultSearch : 'bw',
        operandTitle : "点击选择查询方式",
        operands : {
            "eq" : "=",
            "ne" : "!",
            "lt" : "<",
            "le" : "<=",
            "gt" : ">",
            "ge" : ">=",
            "bw" : "^",
            "bn" : "!^",
            "in" : "=",
            "ni" : "!=",
            "ew" : "|",
            "en" : "!@",
            "cn" : "~",
            "nc" : "!~",
            "nu" : "#",
            "nn" : "!#"
        }
    });

    var triggerSourceGrid;

    $.fn.grid = function(pin) {

        this.each(function() {

            if (typeof pin === 'string') {
                var fn = $.jgrid.getMethod(pin);
                if (!fn) {
                    throw ("jqGrid - No such method: " + pin);
                }
                var args = $.makeArray(arguments).slice(1);
                return fn.apply(this, args);
            }

            if (pin.url == undefined && pin.queryForm) {
                $(pin.queryForm).find(":text").each(function() {
                    $(this).val($.trim($(this).val()));
                });
                pin.url = $(pin.queryForm).attr("action") + "?" + $(pin.queryForm).serialize();
            }

            var $t = this;
            if (!$t.grid) {
                var grid = $($t);

                pin = $.extend({
                    filterToolbar : true,
                    columnChooser : true
                }, pin);

                if (pin.pager == undefined) {
                    pin.pager = "#" + grid.attr("id") + "Pager";
                }

                if (pin.editRow) {
                    if (!pin.ondblClickRow) {
                        pin.ondblClickRow = function(rowid, iRow, iCol, e) {
                            grid.jqGrid("editRow", rowid);
                        }
                    }
                }

                $.each(pin.colModel, function(i, col) {

                    var colOptions = {
                        fixed : true,
                        searchoptions : {
                            searchhidden : true,
                            sopt : [ 'bw', 'bn', 'eq', 'ne', 'cn', 'nc', 'ew', 'en' ],
                            buildSelect : function(data) {
                                var json = jQuery.parseJSON(data);
                                if (json == null) {
                                    json = data;
                                }

                                var html = "<select>";
                                html += "<option value=''></option>";
                                for ( var key in json) {
                                    key = key + '';
                                    html += ("<option value='" + key + "'>" + json[key] + "</option>");
                                }
                                html += "</select>";
                                return html;
                            }
                        }
                    };

                    if (col.formatter == disabledFormatter || col.formatter == booleanFormatter) {
                        colOptions = $.extend(colOptions, {
                            width : 60,
                            fixed : true,
                            stype : 'select',
                            align : 'center'
                        });
                        colOptions.searchoptions = $.extend(colOptions.searchoptions, {
                            dataUrl : WEB_ROOT + '/sys/util!booleanMapData.json'
                        });
                    }

                    if (!col.width) {
                        colOptions.fixed = false;
                    }

                    if (colOptions.stype == 'select') {
                        colOptions.searchoptions = $.extend(colOptions.searchoptions, {
                            sopt : [ 'eq', 'ne' ]
                        });
                    }

                    if (col.sorttype == 'date') {
                        colOptions = $.extend(colOptions, {
                            width : 120,
                            align : 'center'
                        });
                        colOptions.searchoptions = $.extend(colOptions.searchoptions, {
                            sopt : [ 'eq', 'ne', 'ge', 'le', 'gt', 'lt' ],
                            dataInit : function(elem) {
                                $(elem).datepicker();
                            }
                        });
                    }

                    if (col.sorttype == 'number') {
                        colOptions = $.extend(colOptions, {
                            width : 60,
                            align : 'center'
                        });
                        colOptions.searchoptions = $.extend(colOptions.searchoptions, {
                            sopt : [ 'eq', 'ne', 'ge', 'le', 'gt', 'lt' ]
                        });
                    }

                    col.searchoptions = $.extend(colOptions.searchoptions, col.searchoptions);
                    col = $.extend(colOptions, col);
                    pin.colModel[i] = col;
                });

                grid.jqGrid(pin);

                grid.jqGrid('navGrid', pin.pager,
                // options
                {
                    edit : false,
                    add : false,
                    del : pin.delRow == undefined ? false : true,
                    beforeRefresh : function() {
                        var grid = $(this);
                        grid.jqGrid('setGridParam', {
                            datatype : "json"
                        })
                    }
                },
                // edit options
                {},
                // add options
                {},
                // del options
                {
                    reloadAfterSubmit : true,
                    url : pin.delRow == undefined ? false : pin.delRow.url
                },
                // search options
                {});

                if (pin.addRow) {
                    pin.addRow = $.extend({
                        caption : "",
                        buttonicon : 'ui-icon-plus',
                        position : "first",
                        title : "添加数据",
                        onClickButton : function() {
                            if (pin.addRow.toTab) {
                                $(pin.addRow.toTab).tabs("add", pin.addRow.url, pin.addRow.title);
                            }
                        }
                    }, pin.addRow);

                    grid.jqGrid('navButtonAdd', pin.pager, pin.addRow);
                }

                if (pin.filterToolbar) {
                    grid.jqGrid('filterToolbar');
                }

                if (pin.columnChooser) {
                    grid.jqGrid('navButtonAdd', pin.pager, {
                        caption : "",
                        buttonicon : 'ui-icon-battery-2',
                        position : "last",
                        title : "设定显示列和顺序",
                        onClickButton : function() {
                            var gwdth = grid.jqGrid("getGridParam", "width");
                            grid.jqGrid('columnChooser', {
                                width : 470,
                                done : function(perm) {
                                    if (perm) {
                                        // "OK" button are clicked
                                        this.jqGrid("remapColumns", perm, true);
                                        // the grid width is probably
                                        // changed co we can get new width
                                        // and adjust the width of other
                                        // elements on the page
                                        grid.jqGrid("setGridWidth", gwdth, false);
                                    } else {
                                        // we can do some action in case of
                                        // "Cancel" button clicked
                                    }
                                }
                            });
                        }
                    });
                }
            } else {
                $($t).jqGrid('setGridParam', {
                    url : pin.url,
                    page : 1
                }).trigger("reloadGrid");
            }

        })

    }

    $.extend($.jgrid, {
        buildButtons : function(btns, cellValue, options, rowdata, action) {
            str = "";
            $.each(btns, function() {
                ocl = " onclick=\"" + this.onclick + ";event.stopPropagation();\" onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
                str += "<div title='" + this.title + "' style='float:left;cursor:pointer;' class='ui-pg-div' " + ocl + "><span class='ui-icon " + this.icon + "'></span></div>";
            })
            return str;
        },
        buildLink : function(link, cellValue, options, rowdata, action) {
            return "<a href=\"javascript:void(0)\" onclick=\"" + link.onclick + "\">" + link.text + "</a>";
        }
    })

    $.jgrid.extend({

        /**
         * 刷新Grid组件
         */
        refresh : function() {
            this.each(function() {
                var $t = this;
                if (!$t.grid) {
                    return;
                }
                $($t).jqGrid('setGridParam', {
                    datatype : "json"
                }).trigger("reloadGrid");
            })
        },

        delRow : function(p) {
            this.each(function() {
                var $t = this;
                if (!$t.grid) {
                    return;
                }
                $("#" + $t.p.id + "Pager").find("span.ui-icon-trash:first").parent().click();
            })
        },

        addRow : function(p) {
            this.each(function() {
                var $t = this;
                if (!$t.grid) {
                    return;
                }
                $("#" + $t.p.id + "Pager").find("span.ui-icon-plus:first").parent().click();
            })
        },

        editRow : function(rowid, p) {
            this.each(function() {
                var $t = this;
                if (!$t.grid || !$t.p.editRow) {
                    return;
                }
                var rowdata = $($t).jqGrid("getRowData", rowid);
                var label = rowdata[$t.p.editRow.labelCol];
                var labelText = $(label).text();
                if ($(label).text() != '') {
                    label = labelText
                }
                $($t.p.editRow.toTab).tabs("add", $t.p.editRow.url + "?id=" + rowid, "编辑-" + label);
            })
        },

        advSearch : function(p) {
            this.each(function() {
                var $t = this;
                if (!$t.grid) {
                    return;
                }
                $("#" + $t.p.id + "Pager").find("span.ui-icon-search:first").parent().click();
            })
        },

        search : function(params) {
            this.each(function() {
                var $t = this;
                if (!$t.grid) {
                    return;
                }
                var url = $($t).jqGrid('getGridParam', 'url');
                for ( var key in params) {
                    url = AddOrReplaceUrlParameter(url, key, params[key]);
                }
                $($t).jqGrid('setGridParam', {
                    url : url,
                    page : 1
                }).trigger("reloadGrid");
            })
        },

        /**
         * 更新表格中数组输入组件的下标索引值
         */
        refreshRowIndex : function() {
            var target = $(this);
            $.each($(target).jqGrid('getDataIDs'), function(i, n) {
                $(target).find("#" + n).find("input,select").each(function() {
                    var oldName = $(this).attr("name");
                    $(this).attr("name", oldName.substring(0, oldName.indexOf("[") + 1) + i + oldName.substring(oldName.indexOf("]"), oldName.length));
                });
            });
        },

        /**
         * 获取Grid至少选择一项,如果没有选择则Alert提示
         * 
         * @returns
         */
        getAtLeastOneSelectedItem : function(includeSubGird) {
            var target = $(this);
            var selectedRows = jQuery(target).jqGrid('getGridParam', 'selarrrow');
            var checkedRows = [];
            var selectionLoop = 0;
            for ( var x = 0; x < selectedRows.length; x++) {
                var isDisabled = $("#jqg_" + jQuery(target).attr("id") + "_" + selectedRows[x]).is(':disabled');
                if (!isDisabled) {
                    checkedRows[selectionLoop] = selectedRows[x];
                    selectionLoop++;
                }
            }

            // 处理SubGrid
            if (includeSubGird) {
                jQuery(target).find("table.jqsubgrid").each(function() {
                    var subselectedRows = $(this).jqGrid('getGridParam', 'selarrrow');
                    for ( var x = 0; x < subselectedRows.length; x++) {
                        var isDisabled = $("#jqg_" + jQuery(this).attr("id") + "_" + selectedRows[x]).is(':disabled');
                        if (!isDisabled) {
                            checkedRows[selectionLoop] = subselectedRows[x];
                            selectionLoop++;
                        }
                    }
                });
            }

            if (checkedRows.length == 0) {
                $.jAlert("请至少选择一条行项目！");
                return false;
            } else {
                return checkedRows;
            }
        },

        /**
         * 获取Grid唯一选择行项,如果没有选择或多选则Alert提示
         * 
         * @returns
         */
        getOnlyOneSelectedItem : function() {
            var target = $(this);
            var selectedRows = jQuery(target).jqGrid('getGridParam', 'selarrrow');
            var checkedRows = [];
            var selectionLoop = 0;
            for ( var x = 0; x < selectedRows.length; x++) {
                var isDisabled = $("#jqg_" + jQuery(target).attr("id") + "_" + selectedRows[x]).is(':disabled');
                if (!isDisabled) {
                    checkedRows[selectionLoop] = selectedRows[x];
                    selectionLoop++;
                }
            }
            if (checkedRows.length == 0) {
                $.jAlert("请选取操作项目！");
                return false;
            } else {
                if (checkedRows.length > 1) {
                    $.jAlert("只能选择一条操作项目！");
                    return false;
                }
                return checkedRows.join();
            }
        },

        /**
         * 获取Grid选择行项
         * 
         * @returns
         */
        getSelectedItem : function() {
            var target = $(this);
            var selectedRows = jQuery(target).jqGrid('getGridParam', 'selarrrow');
            return selectedRows.join();
        }
    });

    $.RefreshTriggerSourceGrid = function() {
        $(triggerSourceGrid).jqGrid("refresh");
    }

    $.SetupTriggerSourceGrid = function(sourceGrid) {
        triggerSourceGrid = $(sourceGrid);
    }

})(jQuery);

function disabledFormatter(cellValue, options, rowdata) {
    if (cellValue) {
        return '<span class="label label-warning">禁用</span>';
    } else {
        return "";
    }
}

function booleanFormatter(cellValue, options, rowdata) {
    if (cellValue) {
        return '是';
    } else {
        return '否';
    }
}

function displayIdFormatter(cellValue, options, rowdata) {
    alert("TODO")
}

function eraseCellValueLink(cellValue) {
    var link = $(cellValue);
    if (link.text() != '') {
        return link.text();
    } else {
        return cellValue;
    }
}