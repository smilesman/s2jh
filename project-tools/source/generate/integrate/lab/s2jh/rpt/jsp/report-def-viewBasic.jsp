<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<div class="container-fluid data-view">
    <div class="well form-horizontal">
                <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label">代码</label>
                    <div class="controls">
                        <s:property value="code" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label">名称</label>
                    <div class="controls">
                        <s:property value="title" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label">描述</label>
                    <div class="controls">
                        <s:property value="description" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label">类型</label>
                    <div class="controls">
                        <s:property value="#application.reportTypeEnumMap[type]" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label">分类</label>
                    <div class="controls">
                        <s:property value="category" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label">排序号</label>
                    <div class="controls">
                        <s:property value="orderRank" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label">禁用标识</label>
                    <div class="controls">
                        <s:property value="#application.booleanLabelMap[disabled]" />
                    </div>
                </div>
            </div>
        </div>
    </div>    
</div>