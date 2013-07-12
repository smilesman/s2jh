<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/page-header.jsp"%>
<script type="text/javascript">
    $().ready(function() {
        $("#userRelatedRoleListDiv<s:property value='#parameters.id'/>").grid({
            url : "${base}/auth/user!findRelatedRoles?id=<s:property value='#parameters.id'/>",
            colNames : [ '关联状态', '代码', '类别', '名称', '禁用标识', '锁定标识', '关联时间', '创建时间', '版本号' ],
            colModel : [ {
                name : 'extraAttributes.related',
                align : 'center',
                fixed : true,
                width : 60,
                search : false,
                formatter : function(cellValue, options, rowdata, action) {
                    return cellValue ? '<i class="icon-magnet"></i>' : '';
                }
            }, {
                name : 'code',
                align : 'left',
                fixed : true,
                width : 120,
                formatter : function(cellValue, options, rowdata, action) {
                    return $.jgrid.buildLink({
                        text : cellValue,
                        onclick : "$.popupViewDialog('${base}/auth/role!viewTabs?id=" + options.rowId + "')"
                    });
                }
            }, {
                name : 'aclType',
                align : 'center',
                width : 60
            }, {
                name : 'title',
                align : 'left'
            }, {
                name : 'disabled',
                formatter : booleanFormatter
            }, {
                name : 'locked',
                formatter : booleanFormatter
            }, {
                name : 'extraAttributes.r2CreatedDate',
                width : 140,
                fixed : true,
                search : false,
                align : 'center'
            }, {
                name : 'createdDate',
                width : 140,
                fixed : true,
                hidden : true,
                align : 'center'
            }, {
                name : 'version',
                hidden : true,
                hidedlg : true
            } ],
            cmTemplate : {
                sortable : false
            },
            rowNum : -1,
            pager : false,
            caption : "角色列表"
        });

        $("#userRelatedToolbar<s:property value='#parameters.id'/> .r2-operation").click(function() {
            if (rowids = $("#userRelatedRoleListDiv<s:property value='#parameters.id'/>").jqGrid("getAtLeastOneSelectedItem")) {
                $.ajaxPostURL({
                    url : '${base}/auth/user!doUpdateRelatedRoleR2s?op=' + $(this).val(),
                    data : {
                        id : "<s:property value='%{#parameters.id}'/>",
                        r2ids : rowids
                    },
                    successCallback : function(response) {
                        $("#userRelatedRoleListDiv<s:property value='#parameters.id'/>").jqGrid("refresh");
                        $("#userRelatedPrivilegeListDiv<s:property value='#parameters.id'/>").jqGrid("refresh");
                    }
                });
            }
        });
    });
</script>
<div class="container-fluid">
	<div class="toolbar">
		<div class="toolbar-inner" id="userRelatedToolbar<s:property value='#parameters.id'/>">
			<button type="button" class="btn r2-operation" value="add">
				<i class="icon-resize-small"></i> 添加关联
			</button>
			<button type="button" class="btn r2-operation" value="delete">
				<i class="icon-resize-full"></i> 删除关联
			</button>
		</div>
	</div>
	<table id="userRelatedRoleListDiv<s:property value='#parameters.id'/>"></table>
	<div id="userRelatedRoleListDiv<s:property value='#parameters.id'/>Pager"></div>
</div>