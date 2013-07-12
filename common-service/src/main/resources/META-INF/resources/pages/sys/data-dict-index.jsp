<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/common/index-header.jsp"%>
</head>
<body>
	<div class="container-fluid">
		<s2:tabbedpanel id="dataDictIndexTabs">
			<ul>
				<li><a href="#dataDictIndexListTab"><span>列表查询</span></a></li>
			</ul>
			<div id="dataDictIndexListTab">
				<div class="row-fluid">
					<div class="toolbar">
						<div class="toolbar-inner">
							<button type="button" class="btn" id="dataDictAddBtn">
								<i class="icon-plus-sign"></i> 添加
							</button>
							<button type="button" class="btn" id="dataDictDeleteBtn">
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
					<table id="dataDictListDiv"></table>
					<div id="dataDictListDivPager"></div>
				</div>
			</div>
		</s2:tabbedpanel>
	</div>
	<%@ include file="/common/index-footer.jsp"%>
	<script type="text/javascript">
        $(function() {
            $("#dataDictListDiv").grid({
                url : "${base}/sys/data-dict!findByPage",
                colNames : [ '操作', '系统标识', '分类', 'Key1定义', 'Key2定义', '数据1设定', '数据2设定', '禁用标识', '排序号', '创建时间', '版本号' ],
                colModel : [ {
                    name : 'operation',
                    align : 'center',
                    fixed : true,
                    sortable : false,
                    hidedlg : true,
                    search : false,
                    width : 25,
                    formatter : function(cellValue, options, rowdata, action) {
                        return $.jgrid.buildButtons([ {
                            title : "编辑",
                            icon : "ui-icon-pencil",
                            onclick : "$('#" + $(this).attr("id") + "').jqGrid('editRow','" + rowdata.id + "')"
                        }, {
                            title : "查看",
                            icon : "ui-icon-folder-open",
                            onclick : "$.popupViewDialog('${base}/auth/privilege!viewTabs?id=" + options.rowId + "')"
                        } ]);
                    }
                }, {
                    name : 'displayId',
                    align : 'center',
                    hidedlg : true,
                    width : 100
                }, {
                    name : 'category',
                    align : 'left'
                }, {
                    name : 'key1Value',
                    align : 'left'
                }, {
                    name : 'key2Value',
                    align : 'left'
                }, {
                    name : 'data1Value',
                    align : 'left'
                }, {
                    name : 'data2Value',
                    align : 'left'
                }, {
                    name : 'disabled',
                    width : 60,
                    fixed : true,
                    formatter : booleanFormatter,
                    align : 'center'
                }, {
                    name : 'orderRank',
                    width : 60,
                    fixed : true,
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
                ondblClickEnabledRow : function(rowid, iRow, iCol, e, rowdata) {
                    $("#dataDictIndexTabs").tabs("add", '${base}/sys/data-dict!inputTabs?id=' + rowid, "编辑-" + eraseCellValueLink(rowdata.displayId));
                },
                caption : "数据字典列表"
            });

            $("#dataDictAddBtn").click(function() {
                $("#dataDictIndexTabs").tabs("add", "${base}/sys/data-dict!inputTabs", "添加-新数据字典");
            });

            $("#dataDictDeleteBtn").click(function() {
                if (rowids = $("#dataDictListDiv").jqGrid("getAtLeastOneSelectedItem")) {
                    $.ajaxPostURL({
                        url : '${base}/sys/data-dict!doDelete',
                        data : {
                            id : rowids
                        },
                        confirm : '确认删除所选行项？',
                        successCallback : function(response) {
                            $("#dataDictListDiv").jqGrid("refresh");
                        }
                    });
                }
            });
        });
    </script>
</body>
</html>