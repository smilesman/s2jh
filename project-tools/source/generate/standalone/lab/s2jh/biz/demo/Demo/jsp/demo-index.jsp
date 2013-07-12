<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/common/index-header.jsp"%>
</head>
<body>
    <div class="container-fluid">
        <s2:tabbedpanel id="demoIndexTabs">
            <ul>
                <li><a href="#demoIndexListTab"><span>列表查询</span></a></li>
            </ul>
            <div id="demoIndexListTab">
                <div class="row-fluid">
                    <div class="toolbar">
                        <div class="toolbar-inner">
                            <button type="button" class="btn" id="demoAddBtn">
                                <i class="icon-plus-sign"></i> 添加
                            </button>
                            <button type="button" class="btn" id="demoDeleteBtn">
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
                    <table id="demoListDiv"></table>
                    <div id="demoListDivPager"></div>
                </div>
            </div>
        </s2:tabbedpanel>
    </div>                    
	<%@ include file="/common/index-footer.jsp"%>
    <script type="text/javascript">
        $(function() {
            $("#demoListDiv").grid({
                url: '${base}/biz/demo/demo!findByPage',
                colNames : [ '操作','代码','标题','创建时间','版本号'],
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
                            onclick : "$.popupViewDialog('${base}/biz/demo/demo!viewTabs?id=" + options.rowId + "')"
                        } ]);
                    }                 
                }, {
                    name : 'code',
                    align : 'left'
                }, {
                    name : 'name',
                    align : 'left'
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
                    url : "${base}/biz/demo/demo!doDelete"
                },
                addRow : {
                    url : "${base}/biz/demo/demo!inputTabs",
                    toTab : "#demoIndexTabs"
                },
                editRow : {
                    url : "${base}/biz/demo/demo!inputTabs",
                    toTab : "#demoIndexTabs",
                    labelCol : 'TODO'
                },                
                caption:"演示实体列表"
            }); 
            
            $("#demoAddBtn").click(function() {
                $("#demoListDiv").jqGrid('addRow');
            });
            
            $("#demoDeleteBtn").click(function() {
                $("#demoListDiv").jqGrid('delRow');
            });                         
         });
    </script>	
</body>
</html>