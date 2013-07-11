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

    var triggerSourceGrid;

    $.jgrid.extend({
        /**
         * 构造jqGrid表格
         * 
         * @param target
         *            JQuery对象
         * @param options
         *            定制化参数 组件标准参数：
         *            直接参考jqGrid参数定义：http://www.trirand.com/jqgridwiki/doku.php?id=wiki:jqgriddocs
         *            扩展参数列表： queryForm：以查询表单构造Grid表格
         *            url：如果没有form对象，则直接以url构造Grid表格
         *            ondblClickEnabledRow：双击行项的回调函数
         *            maxHeight：设定Grid显示的最大高度，超过后则出现滚动条
         */
        build : function(options) {
            // alert("_init");
            var target = $(this);
            if (options.queryForm) {
                $(options.queryForm).find(":text").each(function() {
                    $(this).val($.trim($(this).val()));
                });
                url = $(options.queryForm).attr("action") + "?" + $(options.queryForm).serialize();
                // alert(settings.url);
            } else {
                url = options.url;
            }
            if ($(target).getGridParam("url") == undefined) {

 

                options.cmTemplate = jQuery.extend({}, options.cmTemplate);
                options.cmTemplate.searchoptions = jQuery.extend({
                    searchhidden : true,
                    sopt: [ 'bw', 'bn', 'eq', 'ne', 'cn', 'nc', 'ew', 'en' ],
                    buildSelect : function(data) {
                        var json = jQuery.parseJSON(data);
                        if (json == null) {
                            json = data;
                        }
                        var html = $("<select/>");
                        html.append($("<option value=''></option>"));
                        for ( var key in json) {
                            key = key + '';
                            html.append($("<option value='" + key + "'>" + json[key] + "</option>"));
                        }
                        return html;
                    }
                }, options.cmTemplate.searchoptions);
                
                var settings = jQuery.extend({
                    url : url,
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

                    autowidth : true,
                    rowNum : 15,
                    page : 1,
                    height : "auto",
                    sortorder : "desc",
                    sortname : "id",
                    viewsortcols : [ true, 'vertical', true ],
                    mtype : "POST",
                    rowList : [ 5, 10, 15, 20, 50, 100, 200 ],
                    pager : "#" + $(target).attr("id") + "Pager",
                    pagerpos : 'right',
                    recordpos : 'left',
                    viewrecords : true,
                    rownumbers : true,
                    gridview : true,
                    altRows : true,
                    sortable : true,
                    altclass : "evennumber",

                    groupHeaders : false,

                    multiselect : true,
                    forceFit : false,
                    shrinkToFit : true,
                    ajaxSelectOptions : {
                        cache : true
                    },
                    onSelectAll : function(data) {
                        for ( var i = 0; i < data.length; i++) {
                            var rowid = data[i];
                            var row = $("#jqg_" + $(target).attr("id") + "_" + rowid);
                            if (row.attr("disabled")) {
                                row.attr("checked", false);
                                $("#" + rowid).removeClass("ui-state-highlight").attr("aria-selected", "false");
                            }
                        }
                    },
                    beforeSelectRow : function(rowid, e) {
                        if ($("#jqg_" + $(target).attr("id") + "_" + rowid).attr("disabled")) {
                            return false;
                        }
                        return true;
                    },
                    beforeRequest : function(event) {
                        var format = $(target).jqGrid("getGridParam", "_format_");
                        $(target).jqGrid("setGridParam", {
                            "_format_" : 'json'
                        });
                        if (format == 'xls') {
                            var url = AddOrReplaceUrlParameter(this.p.url, "_format_", 'xls');
                            for ( var key in this.p.postData) {
                                url = url + "&" + key + "=" + this.p.postData[key];
                            }
                            top.open(url);
                            return false;
                        }
                    },
                    loadComplete : function(data) {
                        if (options.footerDataColumn) {
                            $.each(options.footerDataColumn, function(i, n) {
                                var sum = $(target).jqGrid('getCol', n, false, 'sum');
                                var ob = [];
                                ob[n] = sum;
                                $(target).footerData('set', ob);
                            });
                        }

                        if (settings.pager) {
                            var numberPagerToolbarId = $(settings.pager).attr("id") + "_numbers";
                            var numberPagerToolbar = $("#" + numberPagerToolbarId);
                            if (numberPagerToolbar.length == 0) {
                                numberPagerToolbar = $("<div />");
                                numberPagerToolbar.attr("id", numberPagerToolbarId);
                                numberPagerToolbar.appendTo($("#" + $(settings.pager).attr("id") + "_center"));
                            }

                            numberPagerToolbar.pagination($("#sp_1_" + $(settings.pager).attr("id")).text(), {
                                prev_show_always : false,
                                next_show_always : false,
                                num_display_entries : 5,
                                num_edge_entries : 2,
                                current_page : $(target).getGridParam('page') - 1,
                                callback : function(new_current_page) {
                                    $(target).trigger("reloadGrid", [ {
                                        page : new_current_page + 1
                                    } ]);
                                },
                                items_per_page : 1
                            // Show only one item per page
                            });
                        }

                        if (data.content) {// loadonce时再次点击为data.content=undefined
                            // 循环每条行项判断是否已选择
                            $.each(data.content, function(i, rowdata) {
                                if (rowdata.extraAttributes && rowdata.extraAttributes.initRowSelected) {
                                    $(target).jqGrid("setSelection", rowdata.id);
                                }
                            })
                        }
                    },
                    gridComplete : function() {
                        var filterToolbarToggleButton = $("#gview_" + $(target).attr("id")).find("div.ui-jqgrid-titlebar").find("a.ui-jqgrid-titlebar-filter");
                        if (filterToolbarToggleButton.length == 0) {
                            filterToolbarToggleButton = $('<a href="javascript:void(0)" role="link" style="right: 20px;" title="快速过滤查询"/>');
                            filterToolbarToggleButton.addClass("ui-jqgrid-titlebar-filter ui-jqgrid-titlebar-close HeaderButton");
                            filterToolbarToggleButton.html('<span class="ui-icon ui-icon-zoomout"></span>');
                            filterToolbarToggleButton.hover(function() {
                                $(this).addClass('ui-state-hover');
                            }, function() {
                                $(this).removeClass('ui-state-hover');
                            })
                            filterToolbarToggleButton.click(function() {
                                $(target).trigger("toggleToolbar");
                            });
                            $("#gview_" + $(target).attr("id")).find("div.ui-jqgrid-titlebar").prepend(filterToolbarToggleButton);
                        }

                        var multisearchToolbarToggleButton = $("#gview_" + $(target).attr("id")).find("div.ui-jqgrid-titlebar").find("a.ui-jqgrid-titlebar-multisearch");
                        if (multisearchToolbarToggleButton.length == 0) {
                            multisearchToolbarToggleButton = $('<a href="javascript:void(0)" role="link" style="right: 40px;" title="高级组合查询"/>');
                            multisearchToolbarToggleButton.addClass("ui-jqgrid-titlebar-multisearch ui-jqgrid-titlebar-close HeaderButton");
                            multisearchToolbarToggleButton.html('<span class="ui-icon ui-icon-search"></span>');
                            multisearchToolbarToggleButton.hover(function() {
                                $(this).addClass('ui-state-hover');
                            }, function() {
                                $(this).removeClass('ui-state-hover');
                            })
                            multisearchToolbarToggleButton.click(function() {
                                $(target).jqGrid('searchGrid', {
                                    multipleSearch : true,
                                    multipleGroup : true,
                                    width : 700,
                                    jqModal : false
                                });
                            });
                            $("#gview_" + $(target).attr("id")).find("div.ui-jqgrid-titlebar").prepend(multisearchToolbarToggleButton);
                        }

                        var refreshToggleButton = $("#gview_" + $(target).attr("id")).find("div.ui-jqgrid-titlebar").find("a.ui-jqgrid-titlebar-refresh");
                        if (refreshToggleButton.length == 0) {
                            refreshToggleButton = $('<a href="javascript:void(0)" role="link" style="right: 60px;" title="刷新表格数据"/>');
                            refreshToggleButton.addClass("ui-jqgrid-titlebar-refresh ui-jqgrid-titlebar-close HeaderButton");
                            refreshToggleButton.html('<span class="ui-icon ui-icon-refresh"></span>');
                            refreshToggleButton.hover(function() {
                                $(this).addClass('ui-state-hover');
                            }, function() {
                                $(this).removeClass('ui-state-hover');
                            })
                            refreshToggleButton.click(function() {
                                $(target).setGridParam({
                                    datatype : "json"
                                });
                                $(target).trigger("clearToolbar");
                                $(target).trigger("reloadGrid");
                            });
                            $("#gview_" + $(target).attr("id")).find("div.ui-jqgrid-titlebar").prepend(refreshToggleButton);
                        }

                        var columnChooserToggleButton = $("#gview_" + $(target).attr("id")).find("div.ui-jqgrid-titlebar").find("a.ui-jqgrid-titlebar-columns");
                        if (columnChooserToggleButton.length == 0) {
                            columnChooserToggleButton = $('<a href="javascript:void(0)" role="link" style="right: 80px;" title="选择显示列"/>');
                            columnChooserToggleButton.addClass("ui-jqgrid-titlebar-columns ui-jqgrid-titlebar-close HeaderButton");
                            columnChooserToggleButton.html('<span class="ui-icon ui-icon-calculator"></span>');
                            columnChooserToggleButton.hover(function() {
                                $(this).addClass('ui-state-hover');
                            }, function() {
                                $(this).removeClass('ui-state-hover');
                            })
                            columnChooserToggleButton.click(function() {
                                var gwdth = $(target).jqGrid("getGridParam", "width");
                                $(target).jqGrid('columnChooser', {
                                    width : 470,
                                    done : function(perm) {
                                        if (perm) {
                                            // "OK" button are clicked
                                            this.jqGrid("remapColumns", perm, true);
                                            // the grid width is probably
                                            // changed co we can get new width
                                            // and adjust the width of other
                                            // elements on the page
                                            $(target).jqGrid("setGridWidth", gwdth, false);
                                        } else {
                                            // we can do some action in case of
                                            // "Cancel" button clicked
                                        }
                                    }
                                });
                            });
                            $("#gview_" + $(target).attr("id")).find("div.ui-jqgrid-titlebar").prepend(columnChooserToggleButton);
                        }

                        if (options.exportXls) {
                            var exportXlsToggleButton = $("#gview_" + $(target).attr("id")).find("div.ui-jqgrid-titlebar").find("a.ui-jqgrid-titlebar-export-xls");
                            if (exportXlsToggleButton.length == 0) {
                                exportXlsToggleButton = $('<a href="javascript:void(0)" role="link" style="right: 100px;" title="下载Excel"/>');
                                exportXlsToggleButton.addClass("ui-jqgrid-titlebar-export-xls ui-jqgrid-titlebar-close HeaderButton");
                                exportXlsToggleButton.html('<span class="ui-icon ui-icon-arrowthickstop-1-s"></span>');
                                exportXlsToggleButton.hover(function() {
                                    $(this).addClass('ui-state-hover');
                                }, function() {
                                    $(this).removeClass('ui-state-hover');
                                })
                                exportXlsToggleButton.click(function() {
                                    var exportRecordLimit = 5000;
                                    var records = $(target).jqGrid('getGridParam', 'records');
                                    if (records > exportRecordLimit) {
                                        alert("当前查询记录数大于导出记录数允许最大限制：" + exportRecordLimit + " ,请添加条件查询减小记录数后再点击执行导出");
                                        return false;
                                    }
                                    $(target).setGridParam({
                                        '_format_' : 'xls'
                                    });
                                    $(target).trigger("reloadGrid");

                                });
                                $("#gview_" + $(target).attr("id")).find("div.ui-jqgrid-titlebar").prepend(exportXlsToggleButton);
                            }
                        }

                        if (options.exportConfiguration) {
                            var exportConfigurationToggleButton = $("#gview_" + $(target).attr("id")).find("div.ui-jqgrid-titlebar").find("a.ui-jqgrid-titlebar-export-xls");
                            if (exportConfigurationToggleButton.length == 0) {
                                exportConfigurationToggleButton = $('<a href="javascript:void(0)" role="link" style="right: 120px;" title="下载Excel"/>');
                                exportConfigurationToggleButton.addClass("ui-jqgrid-titlebar-export-xls ui-jqgrid-titlebar-close HeaderButton");
                                exportConfigurationToggleButton.html('<span class="ui-icon ui-icon-arrowthickstop-1-s"></span>');
                                exportConfigurationToggleButton.hover(function() {
                                    $(this).addClass('ui-state-hover');
                                }, function() {
                                    $(this).removeClass('ui-state-hover');
                                })
                                exportConfigurationToggleButton.click(function() {
                                    var cfg = $(target).jqGrid('jqGridExport', {
                                        exptype : "jsonstring"
                                    });
                                    console.log(window.location.href);
                                    console.log(cfg);
                                });
                                $("#gview_" + $(target).attr("id")).find("div.ui-jqgrid-titlebar").prepend(exportConfigurationToggleButton);
                            }
                        }
                    },

                    ondblClickRow : function(rowid, iRow, iCol, e) {
                        if ($("#jqg_" + $(target).attr("id") + "_" + rowid).attr("disabled")) {
                            return;
                        }
                        triggerSourceGrid = $(target);
                        if (options.ondblClickEnabledRow) {
                            var rowdata = $(target).getRowData(rowid);
                            options.ondblClickEnabledRow.call($(target), rowid, iRow, iCol, e, rowdata);
                            e.stopPropagation();
                        }
                        $(target).setSelection(rowid, false);
                    },
                    afterInsertRow : function(rowid, aData) {
                        if (options.footerDataColumn) {
                            $.each(options.footerDataColumn, function(i, n) {
                                var sum = $(target).jqGrid('getCol', n, false, 'sum');
                                // alert(sum);
                                var ob = [];
                                ob[n] = sum;
                                $(target).footerData('set', ob);
                            });
                        }
                    },
                    loadError : function(ts, xhr, st, err) {
                        alert("表格数据加载处理失败,请尝试刷新或联系管理员!");
                        // publishErrorContentPage(st);
                    }
                }, options);

                jQuery(target).jqGrid(settings);

                if (settings.filterToolbar != false && settings.caption != undefined) {
                    $(target).jqGrid('filterToolbar', {
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
                }

                // if(settings.frozenColumns!=false){
                // $(target).jqGrid('setFrozenColumns');
                // }

                if (settings.groupHeaders != false) {
                    $(target).jqGrid('setGroupHeaders', {
                        useColSpanStyle : true,
                        groupHeaders : settings.groupHeaders
                    });
                }

                // $(target).jqGrid('navGrid',settings.pager,{del:false,add:false,edit:false,search:false})

                return;
            }

            $(target).setGridParam({
                datatype : "json",
                url : url
            });
            $(target).trigger("reloadGrid", [ {
                page : 1
            } ]);

            return $(target);
        },

        /**
         * 刷新Grid组件
         */
        refresh : function() {
            var target = $(this);
            $(target).setGridParam({
                datatype : "json"
            });
            $(target).trigger("clearToolbar");
            $(target).trigger("reloadGrid");
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
                return checkedRows.join();
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

    $.triggerGridRowDblClick = function(trigger) {
        $(trigger).closest("tr.jqgrow").dblclick();
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