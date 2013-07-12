<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<script type="text/javascript">
    $(function() {

        $("#reportDefParamsForm<s:property value='#parameters.id'/>").formvalidate(
                {
                    initSubmit : true,
                    submitHandler : function(form) {
                        $("#reportParamListDiv<s:property value='#parameters.id'/>").jqGrid(
                                "build",
                                {
                                    queryForm : $(form),
                                    colNames : [ '操作', '代码', '名称', '禁用标识', '参数类型', '前端UI校验规则', '缺省参数值', '是否允许多选 ', '集合数据源 ', '排序号', '创建时间', '版本号' ],
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
                                            } ]);
                                        }
                                    }, {
                                        name : 'code',
                                        align : 'center',
                                        fixed : true,
                                        hidedlg : true,
                                        width : 100
                                    }, {
                                        name : 'title',
                                        align : 'left'
                                    }, {
                                        name : 'disabled',
                                        width : 60,
                                        fixed : true,
                                        formatter : booleanFormatter,
                                        align : 'center'
                                    }, {
                                        name : 'type.title',
                                        index : 'type',
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
                                    ondblClickEnabledRow : function(rowid, iRow, iCol, e, rowdata) {
                                        $(this).closest("div.ui-tabs").tabs("add", "${base}/rpt/report-param!update?reportDefId=<s:property value='%{#parameters.id}'/>&id=" + rowid,
                                                "编辑-" + eraseCellValueLink(rowdata.code));
                                    },
                                    caption : "报表参数列表"
                                });
                    }
                });

        $("#reportParamAddBtn<s:property value='#parameters.id'/>").click(function() {
            $(this).closest("div.ui-tabs").tabs("add", "${base}/rpt/report-param!create?reportDefId=<s:property value='%{#parameters.id}'/>", "添加-新报表参数");
        });

        $("#reportParamDeleteBtn<s:property value='#parameters.id'/>").click(function() {
            if (rowids = $("#reportParamListDiv<s:property value='#parameters.id'/>").jqGrid("getAtLeastOneSelectedItem")) {
                $.ajaxPostURL({
                    url : '${base}/rpt/report-param!doDelete',
                    data : {
                        id : rowids
                    },
                    confirm : '确认删除所选行项？',
                    successCallback : function(response) {
                        $("#reportParamListDiv<s:property value='#parameters.id'/>").jqGrid("refresh");
                    }
                });
            }
        });
    });
</script>

<div class="container-fluid">
	<form id="reportDefParamsForm<s:property value='#parameters.id'/>"
		action="${base}/rpt/report-param!findByPage" class="form-inline" method="get">
		<s:hidden name="search['EQ_reportDef.id']" value="%{#parameters.id}" />
		<div class="row-fluid">
			<div class="toolbar">
				<div class="toolbar-inner">
					<button type="button" class="btn" id="reportParamAddBtn<s:property value='#parameters.id'/>">
						<i class="icon-plus-sign"></i> 添加
					</button>
					<button type="button" class="btn" id="reportParamDeleteBtn<s:property value='#parameters.id'/>">
						<i class="icon-trash"></i> 删除
					</button>
					<div class="divider-vertical"></div>
					<div class="input-prepend">
						<s:textfield name="search['CN_code_OR_title']" cssClass="input-large" title="代码/名称" />
					</div>
					<button type="submit" class="btn">
						<i class="icon-search"></i> 查询
					</button>
					<button type="reset" class="btn">
						<i class="icon-repeat"></i> 重置
					</button>
				</div>
			</div>
		</div>
	</form>
	<div class="row-fluid">
		<table id="reportParamListDiv<s:property value='#parameters.id'/>"></table>
		<div id="reportParamListDiv<s:property value='#parameters.id'/>Pager"></div>
	</div>
</div>

