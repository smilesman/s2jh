<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/page-header.jsp"%>
<div class="container-fluid data-view">
    <div class="well form-horizontal">
                <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="signinid">登录账号</label>
                    <div class="controls">
                        <s:property value="signinid" />
                    </div>
                </div> 
            </div>
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="nick">昵称</label>
                    <div class="controls">
                        <s:property value="nick" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="email">电子邮件</label>
                    <div class="controls">
                        <s:property value="email"/>
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="disabled">禁用标识</label>
                    <div class="controls">
                        <s:property value="#application.booleanLabelMap[disabled]" />
                    </div>
                </div>
            </div>
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="accountNonLocked">账户未锁定标志</label>
                    <div class="controls">
                        <s:property value="#application.booleanLabelMap[accountNonLocked]" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="accountExpireTime">账号失效日期</label>
                    <div class="controls">
                        <s:date name="accountExpireTime" format="yyyy-MM-dd"/>
                    </div>
                </div>                
            </div>
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="credentialsExpireTime">密码失效日期</label>
                    <div class="controls">
                        <s:date name="credentialsExpireTime" format="yyyy-MM-dd"/>
                    </div>
                </div>                
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="email">注册时间</label>
                    <div class="controls">
                        <s:date name="signupTime" format="yyyy-MM-dd HH:mm:ss"/>
                    </div>
                </div> 
            </div>
        </div>        
    </div>    
</div>