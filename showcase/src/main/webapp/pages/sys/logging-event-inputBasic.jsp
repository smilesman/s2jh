<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<div class="container-fluid data-edit">
    <s2:form cssClass="form-horizontal" method="post" 
          action="%{persistentedModel?'/sys/logging-event!doUpdate':'/sys/logging-event!doCreate'}">
    	<s:hidden name="id" />
    	<s:hidden name="version" />
        <s:token/>
        <div class="row-fluid">
            <div class="toolbar">
                <div class="toolbar-inner">
                    <button type="button" class="btn btn-submit" callback-tab="loggingEventIndexTabs"
                        callback-grid="loggingEventListDiv">
                        <i class="icon-ok"></i> 保存
                    </button>
                    <button type="button" class="btn btn-submit submit-post-close" callback-tab="loggingEventIndexTabs"
                        callback-grid="loggingEventListDiv">
                        <i class="icon-check"></i> 保存并关闭
                    </button>
                    <button type="reset" class="btn">
                        <i class="icon-repeat"></i> 重置
                    </button>
                </div>
            </div>
        </div>
        <div class="well">
        </div>    
	</s2:form>
</div>