<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<div class="container-fluid data-view">
    <div class="well form-horizontal">
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
                    <label class="control-label">父代码</label>
                    <div class="controls">
                        <s:property value="parentCode" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label">Key1定义</label>
                    <div class="controls">
                        <s:property value="key1Value" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label">Key2定义</label>
                    <div class="controls">
                        <s:property value="key2Value" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label">数据1设定</label>
                    <div class="controls">
                        <s:property value="data1Value" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label">数据2设定</label>
                    <div class="controls">
                        <s:property value="data2Value" />
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
    </div>    
</div>