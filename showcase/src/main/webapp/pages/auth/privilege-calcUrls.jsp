<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<script type="text/javascript">
    $(function() {

        $("#privilegeCalcUrlListDiv").grid({
            url : '${base}/auth/privilege!calcUrls',
            colNames : [ '操作', '代码', '名称', '代码', '名称', '代码', '名称', 'URL', '受控', '关联权限' ],
            colModel : [ {
                name : 'operation',
                align : 'center',
                fixed : true,
                sortable : false,
                search: false,
                hidedlg : true,
                width : 25,
                formatter : function(cellValue, options, rowdata, action) {
                    return $.jgrid.buildButtons([ {
                        title : "编辑",
                        icon : "ui-icon-pencil",
                        onclick : "$('#" + $(this).attr("id") + "').jqGrid('editRow','" + rowdata.id + "')"
                    } ]);
                }
            }, {
                name : 'namespace',
                align : 'left',
                width : 80,
                fixed : true
            }, {
                name : 'namespaceLabel',
                align : 'left',
                width : 80,
                fixed : true
            }, {
                name : 'actionName',
                align : 'left',
                width : 80,
                fixed : true
            }, {
                name : 'actionNameLabel',
                align : 'left',
                width : 100,
                fixed : true
            }, {
                name : 'methodName',
                align : 'left',
                width : 80,
                fixed : true
            }, {
                name : 'methodNameLabel',
                align : 'left',
                width : 150,
                fixed : true
            }, {
                name : 'url',
                align : 'left'
            }, {
                name : 'controlled',
                align : 'center',
                width : 50,
                formatter : booleanFormatter,
                stype : 'select',
                searchoptions : {
                    dataUrl : '${base}/sys/util!booleanMapData.json',
                    sopt : [ 'eq', 'ne' ]
                },                
                fixed : true
            }, {
                name : 'controllPrivileges',
                align : 'left',
                fixed : true
            } ],
            ondblClickEnabledRow : function(rowid, iRow, iCol, e) {
                var rowdata = $(this).getRowData(rowid);
                var url = '${base}/auth/privilege!create?';
                url += ("&category=" + rowdata.namespaceLabel);
                url += ("&title=" + rowdata.actionNameLabel+"-"+rowdata.methodNameLabel);
                url += ("&url=" + rowdata.url);
                $("#privilegeIndexTabs").tabs("add", url, "创建-权限");
            },
            groupHeaders : [{
                startColumnName : 'namespace',
                numberOfColumns : 2,
                titleText : '模块'
            }, {
                startColumnName : 'actionName',
                numberOfColumns : 2,
                titleText : '对象'
            }, {
                startColumnName : 'methodName',
                numberOfColumns : 2,
                titleText : '方法'
            } ],
            loadonce: true,
            caption : "URL列表"
        });

        $("#privilegeAddBatchBtn").click(function() {
            if (rowids = $("#privilegeCalcUrlListDiv").jqGrid("getAtLeastOneSelectedItem")) {
                $.ajaxPostURL({
                    url : '${base}/auth/privilege!doAddBatch',
                    data : {
                        id : rowids
                    },
                    confirm : '确认批量将所选URL添加到权限列表中？',
                    successCallback : function(response) {
                        $("#privilegeCalcUrlListDiv").jqGrid("refresh");
                    }
                });
            }
        });
    });
</script>
<div class="container-fluid">
	<div class="row-fluid">
		<div class="toolbar">
			<div class="toolbar-inner">
				<button type="button" class="btn" id="privilegeAddBatchBtn">
					<i class="icon-plus-sign"></i> 批量创建权限
				</button>
			</div>
		</div>
	</div>
	<div class="row-fluid">
		<table id="privilegeCalcUrlListDiv"></table>
		<div id="privilegeCalcUrlListDivPager"></div>
	</div>
</div>