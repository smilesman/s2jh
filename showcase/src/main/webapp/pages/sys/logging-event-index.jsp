<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/common/index-header.jsp"%>
</head>
<body>
    <div class="container-fluid">
        <s2:tabbedpanel id="loggingEventIndexTabs">
            <ul>
                <li><a href="#loggingEventIndexListTab"><span>列表查询</span></a></li>
            </ul>
            <div id="loggingEventIndexListTab">
                <div class="row-fluid">
                    <div class="toolbar">
                        <div class="toolbar-inner">
                            <button type="button" class="btn" id="loggingEventAddBtn">
                                <i class="icon-plus-sign"></i> 添加
                            </button>
                            <button type="button" class="btn" id="loggingEventDeleteBtn">
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
                    <table id="loggingEventListDiv"></table>
                    <div id="loggingEventListDivPager"></div>
                </div>
            </div>
        </s2:tabbedpanel>
    </div>                    
	<%@ include file="/common/index-footer.jsp"%>
    <script type="text/javascript">
        $(function() {
            $("#loggingEventListDiv").grid({
                url: '${base}/sys/logging-event!findByPage',
                colNames : [ '操作',,'创建时间','版本号'],
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
                            onclick : "$.popupViewDialog('${base}/sys/logging-event!viewTabs?id=" + options.rowId + "')"
                        } ]);
                    }                 
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
                    url : "${base}/sys/logging-event!doDelete"
                },
                addRow : {
                    url : "${base}/sys/logging-event!inputTabs"
                },
                editRow : {
                    url : "${base}/sys/logging-event!inputTabs",
                    labelCol : 'TODO'
                },                
                caption:"日志事件列表"
            }); 
            
            $("#loggingEventAddBtn").click(function() {
                $("#loggingEventListDiv").jqGrid('addRow');
            });
            
            $("#loggingEventDeleteBtn").click(function() {
                $("#loggingEventListDiv").jqGrid('delRow');
            });                         
         });
    </script>	
</body>
</html>