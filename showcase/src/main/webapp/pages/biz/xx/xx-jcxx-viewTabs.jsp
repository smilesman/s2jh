<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<s2:tabbedpanel>
    <ul>
        <li><a href="${base}/biz/xx/xx-jcxx!view?id=<s:property value='#parameters.id'/>&xxdm=<s:property value='#parameters.xxdm'/>">
        <span>基本信息</span>
        </a></li>
        <li><a href="${base}/biz/xx/xx-jcxx!forward?_to_=TODO&id=<s:property value='#parameters.id'/>">
        <span>TODO关联</span>
        </a></li>
    </ul>
</s2:tabbedpanel>