<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/common/index-header.jsp"%>
</head>
<body>
    <div class="container-fluid">
        <s2:tabbedpanel id="reportDefIndexTabs">
            <ul>
                <li><a href="#reportDefIndexListTab"><span>列表查询</span></a></li>
            </ul>
            <div id="reportDefIndexListTab">
                <div class="row-fluid">
                    <div class="toolbar">
                        <div class="toolbar-inner">
                            <button type="button" class="btn" id="reportDefAddBtn">
                                <i class="icon-plus-sign"></i> 添加
                            </button>
                            <button type="button" class="btn" id="reportDefDeleteBtn">
                                <i class="icon-trash"></i> 删除
                            </button>
                            <div class="btn-group pull-right">
                                <button type="button" class="btn" title="高级查询"
                                    onclick="$('#userListDiv').jqGrid('advSearch');">
                                    <i class="icon-search"></i>
                                </button>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <table id="reportDefListDiv"></table>
                    <div id="reportDefListDivPager"></div>
                </div>
            </div>
        </s2:tabbedpanel>
    </div>                    
	<%@ include file="/common/index-footer.jsp"%>
    <script type="text/javascript">
        $(function() {
            $("#reportDefListDiv").grid({
                url: '${base}/rpt/report-def!findByPage',
                colNames : [ '操作','代码','名称','类型','分类','排序号','禁用标识','创建时间','版本号'],
                colModel : [ {
                    name : 'operation',
                    align : 'center',
                    fixed : true,
                    sortable : false,
                    hidedlg : true,
                    search : false,
                    width : 40,
                    formatter : function(cellValue, options, rowdata, action) {
                        return $.jgrid.buildButtons([ {
                            title : "编辑",
                            icon : "ui-icon-pencil",
                            onclick : "$('#" + $(this).attr("id") + "').jqGrid('editRow','" + rowdata.id + "')"
                        }, {
                            title : "查看",
                            icon : "ui-icon-folder-open",
                            onclick : "$.popupViewDialog('${base}/rpt/report-def!viewTabs?id=" + options.rowId + "')"
                        } ]);
                    }                 
                }, {
                    name : 'code',
                    align : 'left'
                }, {
                    name : 'title',
                    align : 'left'
                }, {
                    name : 'type',
                    width : 80,
                    fixed : true,
                    align : 'center'
                }, {
                    name : 'category',
                    align : 'left'
                }, {
                    name : 'orderRank',
                    width : 60,
                    fixed : true,
                    align : 'right'
                }, {
                    name : 'disabled',
                    width : 60,
                    fixed : true,
                    formatter : booleanFormatter,
                    align : 'center'
                }, {
                   name : 'createdDate',
                   width : 120,
                   fixed : true,
                   hidden : true,
                   align : 'center'
                }, {
                   name : 'version',
                   hidden : true,
                   hidedlg : true
                } ],
                delRow : {
                    url : "${base}/rpt/report-def!doDelete"
                },
                addRow : {
                    url : "${base}/rpt/report-def!inputTabs",
                    toTab : "#reportDefIndexTabs"
                },
                editRow : {
                    url : "${base}/rpt/report-def!inputTabs",
                    toTab : "#reportDefIndexTabs",
                    labelCol : 'TODO'
                },                
                caption:"报表定义列表"
            }); 
            
            $("#reportDefAddBtn").click(function() {
                $("#reportDefListDiv").jqGrid('addRow');
            });
            
            $("#reportDefDeleteBtn").click(function() {
                $("#reportDefListDiv").jqGrid('delRow');
            });                         
         });
    </script>	
</body>
</html>