<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/common/index-header.jsp"%>
</head>
<body>
    <div class="container-fluid">
        <s2:tabbedpanel id="${entity_name_uncapitalize}IndexTabs">
            <ul>
                <li><a href="#${entity_name_uncapitalize}IndexListTab"><span>列表查询</span></a></li>
            </ul>
            <div id="${entity_name_uncapitalize}IndexListTab">
                <div class="row-fluid">
                    <div class="toolbar">
                        <div class="toolbar-inner">
                            <button type="button" class="btn" id="${entity_name_uncapitalize}AddBtn">
                                <i class="icon-plus-sign"></i> 添加
                            </button>
                            <button type="button" class="btn" id="${entity_name_uncapitalize}DeleteBtn">
                                <i class="icon-trash"></i> 删除
                            </button>
                            <div class="divider-vertical"></div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <table id="${entity_name_uncapitalize}ListDiv"></table>
                    <div id="${entity_name_uncapitalize}ListDivPager"></div>
                </div>
            </div>
        </s2:tabbedpanel>
    </div>                    
	<%@ include file="/common/index-footer.jsp"%>
    <script type="text/javascript">
        $(function() {

            $("#${entity_name_uncapitalize}ListDiv").jqGrid("build",{
                url: '${model_path}/${entity_name_field}!findByPage',
                colNames : [ '操作','系统标识',<#list entityFields as entityField><#if entityField.list><#if entityField_index != 0>,</#if>'${entityField.title}'</#if></#list>,'创建时间','版本号'],
                colModel : [ {
                    name : 'operation',
                    align : 'center',
                    fixed : true,
                    sortable : false,
                    hidedlg : true,
                    search : false,
                    width : 25,
                    formatter : function(cellValue, options, rowdata, action) {
                        link = '<a class="btn-icon" href="javascript:void(0)" title="编辑" onclick="$.triggerGridRowDblClick(this)"><i class="icon-edit"></i></a>';
                        return link;
                    }
                }, {
                    name : 'displayId',
                    align : 'center',
                    fixed : true,
                    hidedlg : true,
                    width : 100,
                    formatter : function(cellValue, options, rowdata, action) {
                        link = '<a href="javascript:void(0)" title="查看" onclick="$.popupViewDialog(\'${base}${model_path}/${entity_name_field}!viewTabs?id='+options.rowId+'\')">'+cellValue+'</a>';
                        return link;
                    }
                <#list entityFields as entityField> 
                <#if entityField.list>                      
                }, {
                    name : '${entityField.fieldName}',
                <#if entityField.listWidth!=0>  
                    width : ${entityField.listWidth},
                </#if>
                <#if entityField.listFixed>
                    fixed : true,
                </#if>                  
                <#if entityField.listHidden>    
                    hidden : true,
                </#if>  
                <#if entityField.fieldType=='Boolean'>          
                    formatter : booleanFormatter,
                </#if>                                      
                    align : '${entityField.listAlign}'
                </#if>
                </#list>
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
                ondblClickEnabledRow : function(rowid, iRow, iCol, e, rowdata){
                    $("#${entity_name_uncapitalize}IndexTabs").tabs("add", '${base}${model_path}/${entity_name_field}!inputTabs?id=' + rowid, "编辑-" + eraseCellValueLink(rowdata.displayId));
                },
                caption:"${model_title}列表"
            }); 
            
            $("#${entity_name_uncapitalize}AddBtn").click(function() {
                $("#${entity_name_uncapitalize}IndexTabs").tabs("add", "${base}${model_path}/${entity_name_field}!inputTabs", "添加-新${model_title}");
            });
            
            $("#${entity_name_uncapitalize}DeleteBtn").click(function() {
                if (rowids = $("#${entity_name_uncapitalize}ListDiv").jqGrid("getAtLeastOneSelectedItem")) {
                    $.ajaxPostURL({
                        url : '${base}${model_path}/${entity_name_field}!doDelete',
                        data : {
                            ids : rowids
                        },
                        confirm : '确认删除所选行项？',
                        successCallback : function(response) {
                            $("#${entity_name_uncapitalize}ListDiv").jqGrid("refresh");
                        }
                    });
                }
            });                         
         });
    </script>	
</body>
</html>