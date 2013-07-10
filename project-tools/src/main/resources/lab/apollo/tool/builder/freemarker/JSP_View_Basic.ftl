<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<div class="container-fluid data-view">
    <div class="well form-horizontal">
        <#list entityFields as entityField>
        <#if entityField.edit>        
        <div class="row-fluid">
            <div class="span6">
                <#if entityField.fieldType=='Boolean'>
                 <div class="control-group">
                    <label class="control-label">${entityField.title}</label>
                    <div class="controls">
                        <s:property value="#application.booleanLabelMap[${entityField.fieldName}]" />
                    </div>
                </div>
                <#elseif entityField.enumField>
                 <div class="control-group">
                    <label class="control-label">${entityField.title}</label>
                    <div class="controls">
                        <s:property value="#application.${entityField.uncapitalizeFieldType}Map[${entityField.fieldName}]" />
                    </div>
                </div>
                <#elseif entityField.fieldType=='LocalDate'>
                 <div class="control-group">
                    <label class="control-label">${entityField.title}</label>
                    <div class="controls">
                        <s2:date name="${entityField.fieldName}" format="yyyy-MM-dd"/>
                    </div>
                </div>                
                <#elseif entityField.fieldType=='LocalDateTime'>
                 <div class="control-group">
                    <label class="control-label">${entityField.title}</label>
                    <div class="controls">
                        <s2:date name="${entityField.fieldName}" format="yyyy-MM-dd HH:mm:ss"/>
                    </div>
                </div>                        
                <#else>
                 <div class="control-group">
                    <label class="control-label">${entityField.title}</label>
                    <div class="controls">
                        <s:property value="${entityField.fieldName}" />
                    </div>
                </div> 
                </#if>
            </div>
        </div>
        </#if>
        </#list>            
    </div>    
</div>