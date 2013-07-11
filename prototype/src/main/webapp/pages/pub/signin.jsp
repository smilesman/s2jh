<%@page import="org.springframework.security.core.userdetails.*"%>
<%@page import="org.springframework.security.core.*"%>
<%@page import="org.springframework.security.web.*"%>
<%@page import="org.springframework.security.authentication.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/common/page-header.jsp"%>
<%@ include file="/common/index-header.jsp"%>
<title>Admin Console Signin</title>
<script type="text/javascript">
    $().ready(function() {
        $("#loginForm").submit(function() {
            if ($("#login_AclCode").val() != "") {
                $("#j_username").val($("#login_AclCode").val() + "#" + $("#login_Username").val());
            } else {
                $("#j_username").val($("#login_Username").val());
            }
        });

        $("#login_Username").focus();
    });
</script>
</head>
<body>
	<div class="container-fluid">
		<div class="navbar">
			<div class="navbar-inner">
				<a class="brand" href='javascript:void(0)'>&nbsp;S2JH - <small>A Java/JEE
						development framework based on Struts/Spring/JPA/Hibernate and jquery/bootstrap</small></a>
			</div>
		</div>
		<div class="hero-unit">

			<fieldset>
				<legend>系统登录</legend>
				<form id="loginForm" action="${base}/j_spring_security_check" method="post">
					<input type="hidden" name="j_username" id="j_username" />
					<%
					    Exception e = (Exception) session
										.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
								if (e != null) {
									org.slf4j.Logger logger = org.slf4j.LoggerFactory
											.getLogger("lab.s2jh.errors.login");
									if (logger.isDebugEnabled()) {
										logger.debug("login.exception", e);
									}
									String msg = "系统处理错误，请联系管理员";
									if (e instanceof UsernameNotFoundException
											|| (e.getCause() != null && e.getCause() instanceof UsernameNotFoundException)) {
										msg = "账号不存在,请重新输入!";
									} else if (e instanceof DisabledException
											|| (e.getCause() != null && e.getCause() instanceof DisabledException)) {
										msg = "账号已停用,请联系管理员!";
									} else if (e instanceof AccountExpiredException
											|| (e.getCause() != null && e.getCause() instanceof AccountExpiredException)) {
										msg = "账号已过期,请联系管理员!";
									} else if (e instanceof CredentialsExpiredException
											|| (e.getCause() != null && e.getCause() instanceof CredentialsExpiredException)) {
										msg = "密码已过期,请<a href='user!forward?_to_=password-req'>重设密码</a>";
									} else if (e instanceof LockedException
											|| (e.getCause() != null && e.getCause() instanceof LockedException)) {
										msg = "账号已被锁定,请联系管理员!";
									} else if (e instanceof BadCredentialsException) {
										msg = "登录信息错误,请重新输入!";
									}
									session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
					%>
					<div class="control-group">
						<div class="alert alert-error"><%=msg%></div>
					</div>
					<%
					    }
					%>
					<div class="control-group">
						<label class="control-label" for="login_AclCode"><i class="icon-list-alt"></i>机构代码</label>
						<div class="controls">
							<input class="span4" id="login_AclCode" name="login_AclCode"
								value="${sessionScope['login_AclCode']}" type="text"> <span id="login_AclCode_text"></span>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="login_AclCode"><i class="icon-user"></i>登录账号</label>
						<div class="controls">
							<input class="span4" id="login_Username" name="login_Username" type="text"
								value="${sessionScope['SPRING_SECURITY_LAST_USERNAME']}">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="login_AclCode"><i class="icon-lock"></i>登录密码</label>
						<div class="controls">
							<input class="span4" id="j_password" name="j_password" value="" type="password">
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
							<label class="checkbox"><input type="checkbox" name="_spring_security_remember_me"
								checked="true">记住我(两周内自动登录)<a href='user!forward?_to_=password-req'>&nbsp;忘记密码?</a></label>
						</div>
					</div>
					<div class="control-group">
						<button type="submit" class="btn btn-primary">登 录</button>
						<button type="reset" class="btn">重置</button>

					</div>
					<%
					    if (true) {
					%>
					<script type="text/javascript">
                        function setupDevUser(aclCode, user, password) {
                            $("#login_AclCode").val(aclCode);
                            $("#login_Username").val(user);
                            $("#j_password").val(password);
                            $("#j_captcha").val('admin');
                            $("#loginForm").submit();
                        }
                    </script>
					<div class="control-group">
						<small>开发测试登录快速入口:<a href="javascript:void(0)"
							onclick="setupDevUser('','admin','123')">admin</a>
						</small>
					</div>
					<%
					    }
					%>
				</form>
			</fieldset>
		</div>
		<div class="modal-footer">
			<p>
				<span class="pull-left"> <a href="mailto:xautlx@hotmail.com" target="_blank">Contact
						Me</a>
				</span> ©2013 by S2JH
			</p>
		</div>
	</div>
	<%@ include file="/common/index-footer.jsp"%>
</body>
</html>
