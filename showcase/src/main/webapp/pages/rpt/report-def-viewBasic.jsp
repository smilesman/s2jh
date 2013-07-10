<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/page-header.jsp"%>
<div class="container-fluid data-view">
    <div class="well form-horizontal">
                <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="title">名称</label>
                    <div class="controls">
                        <s:property value="title" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="description">描述</label>
                    <div class="controls">
                        <s:property value="description" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="type">类型</label>
                    <div class="controls">
                        <s:property value="#application.reportTypeEnumMap[type]" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="category">分类</label>
                    <div class="controls">
                        <s:property value="category" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="orderRank">排序号</label>
                    <div class="controls">
                        <s:property value="orderRank" />
                    </div>
                </div> 
            </div>
        </div>
    </div>    
</div>