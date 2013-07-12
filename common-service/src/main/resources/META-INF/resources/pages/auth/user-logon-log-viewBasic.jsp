<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/page-header.jsp"%>
<div class="container-fluid data-view">
    <div class="well form-horizontal">
                <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="username">登录账号</label>
                    <div class="controls">
                        <s:property value="username" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="userid">账户编号</label>
                    <div class="controls">
                        <s:property value="userid" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="logonTime">登录时间</label>
                    <div class="controls">
                        <s:property value="logonTime" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="logoutTime">登出时间</label>
                    <div class="controls">
                        <s:property value="logoutTime" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="logonTimeLength">登录时长</label>
                    <div class="controls">
                        <s:property value="logonTimeLength" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="logonTimes">登录次数</label>
                    <div class="controls">
                        <s:property value="logonTimes" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="userAgent">userAgent</label>
                    <div class="controls">
                        <s:property value="userAgent" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="xForwardFor">xForwardFor</label>
                    <div class="controls">
                        <s:property value="xForwardFor" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="localAddr">localAddr</label>
                    <div class="controls">
                        <s:property value="localAddr" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="localName">localName</label>
                    <div class="controls">
                        <s:property value="localName" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="localPort">localPort</label>
                    <div class="controls">
                        <s:property value="localPort" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="remoteAddr">remoteAddr</label>
                    <div class="controls">
                        <s:property value="remoteAddr" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="remoteHost">remoteHost</label>
                    <div class="controls">
                        <s:property value="remoteHost" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="remotePort">remotePort</label>
                    <div class="controls">
                        <s:property value="remotePort" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="serverIP">serverIP</label>
                    <div class="controls">
                        <s:property value="serverIP" />
                    </div>
                </div> 
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                 <div class="control-group">
                    <label class="control-label" for="httpSessionId">Session编号</label>
                    <div class="controls">
                        <s:property value="httpSessionId" />
                    </div>
                </div> 
            </div>
        </div>
    </div>    
</div>