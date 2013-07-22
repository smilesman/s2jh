<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/common/index-header.jsp"%>
</head>
<body>
    <div class="container-fluid">
        <s2:tabbedpanel id="reportParamIndexTabs">
            <ul>
                <li><a href="#reportParamIndexListTab"><span>列表查询</span></a></li>
            </ul>
            <div id="reportParamIndexListTab">
                <div class="row-fluid">
                    <div class="toolbar">
                        <div class="toolbar-inner">
                            <button type="button" class="btn" id="reportParamAddBtn">
                                <i class="icon-plus-sign"></i> 添加
                            </button>
                            <button type="button" class="btn" id="reportParamDeleteBtn">
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
                    <table id="reportParamListDiv"></table>
                    <div id="reportParamListDivPager"></div>
                </div>
            </div>
        </s2:tabbedpanel>
    </div>                    
	<%@ include file="/common/index-footer.jsp"%>
    <script type="text/javascript">
        $(function() {
            $("#reportParamListDiv").grid({
                url: '${base}/rpt/report-param!findByPage',
                colNames : [ '操作','代码','名称','必填标识','禁用标识','参数类型','前端UI校验规则','缺省参数值','是否允许多选 ','集合数据源 ','排序号','创建时间','版本号'],
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
                            onclick : "$.popupViewDialog('${base}/rpt/report-param!viewTabs?id=" + options.rowId + "')"
                        } ]);
                    }                 
                }, {
                    name : 'code',
                    align : 'left'
                }, {
                    name : 'title',
                    align : 'left'
                }, {
                    name : 'required',
                    width : 60,
                    fixed : true,
                    formatter : booleanFormatter,
                    align : 'center'
                }, {
                    name : 'disabled',
                    width : 60,
                    fixed : true,
                    formatter : booleanFormatter,
                    align : 'center'
                }, {
                    name : 'type',
                    width : 80,
                    fixed : true,
                    align : 'center'
                }, {
                    name : 'validateRules',
                    align : 'left'
                }, {
                    name : 'defaultValue',
                    align : 'left'
                }, {
                    name : 'multiSelectFlag',
                    width : 60,
                    fixed : true,
                    formatter : booleanFormatter,
                    align : 'center'
                }, {
                    name : 'listDataSource',
                    align : 'left'
                }, {
                    name : 'orderRank',
                    width : 60,
                    fixed : true,
                    align : 'right'
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
                    url : "${base}/rpt/report-param!doDelete"
                },
                addRow : {
                    url : "${base}/rpt/report-param!inputTabs"
                },
                editRow : {
                    url : "${base}/rpt/report-param!inputTabs",
                    labelCol : 'TODO'
                },                
                caption:"报表参数列表"
            }); 
            
            $("#reportParamAddBtn").click(function() {
                $("#reportParamListDiv").jqGrid('addRow');
            });
            
            $("#reportParamDeleteBtn").click(function() {
                $("#reportParamListDiv").jqGrid('delRow');
            });                         
         });
    </script>	
</body>
</html>