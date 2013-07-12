<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<div class="container-fluid data-edit">
    <s2:form cssClass="form-horizontal" method="post" 
          action="%{persistentedModel?'/rpt/report-param!doUpdate':'/rpt/report-param!doCreate'}">
    	<s:hidden name="id" />
    	<s:hidden name="version" />
        <s:token/>
        <div class="row-fluid">
            <div class="toolbar">
                <div class="toolbar-inner">
                    <button type="button" class="btn btn-submit" callback-tab="reportParamIndexTabs"
                        callback-grid="reportParamListDiv">
                        <i class="icon-ok"></i> 保存
                    </button>
                    <button type="button" class="btn btn-submit submit-post-close" callback-tab="reportParamIndexTabs"
                        callback-grid="reportParamListDiv">
                        <i class="icon-check"></i> 保存并关闭
                    </button>
                    <button type="reset" class="btn">
                        <i class="icon-repeat"></i> 重置
                    </button>
                </div>
            </div>
        </div>
        <div class="well">
            <div class="row-fluid">
                <div class="span6">
                    <s2:textfield name="code" label="代码" />
                </div>
            </div>
            <div class="row-fluid">
                <div class="span6">
                    <s2:textfield name="title" label="名称" />
                </div>
            </div>
            <div class="row-fluid">
                <div class="span6">
                    <s2:radio name="disabled" list="#application.booleanLabelMap" label="禁用标识"/>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span6">
                    <s:select name="type" list="#application.dynamicParameterTypeEnumMap" label="参数类型"/>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span6">
                    <s2:textfield name="validateRules" label="前端UI校验规则" />
                </div>
            </div>
            <div class="row-fluid">
                <div class="span6">
                    <s2:textfield name="defaultValue" label="缺省参数值" />
                </div>
            </div>
            <div class="row-fluid">
                <div class="span6">
                    <s2:radio name="multiSelectFlag" list="#application.booleanLabelMap" label="是否允许多选 "/>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span6">
                    <s2:textfield name="listDataSource" label="集合数据源 " />
                </div>
            </div>
            <div class="row-fluid">
                <div class="span6">
                    <s2:textfield name="orderRank" label="排序号" />
                </div>
            </div>
            <div class="row-fluid">
                <div class="span6">
                    <s2:textfield name="description" label="描述" />
                </div>
            </div>
        </div>    
	</s2:form>
</div>