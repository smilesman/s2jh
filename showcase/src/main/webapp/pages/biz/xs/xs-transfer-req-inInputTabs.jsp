<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<s2:tabbedpanel disableItemsExcludeFirst="%{isBlank(#parameters.id)}">
	<ul>
	    <li><a href="${base}/biz/xs/xs-transfer-req!<s:property value="%{persistentedModel?'update':'create'}"/>?_to_=inInputBasic&id=<s:property value='#parameters.id'/>">
	    <span>基本信息</span>
	    </a></li>
	    <li><a href="${base}/biz/xs/xs-transfer-req!logs?id=<s:property value='#parameters.id'/>">
	    <span>操作记录</span>
	    </a></li>
	</ul>
</s2:tabbedpanel>