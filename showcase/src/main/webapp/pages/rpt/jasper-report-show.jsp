<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/common/page-header.jsp"%>
<%@ include file="/common/index-header.jsp"%>
<script type="text/javascript">
    $(function() {
        $("#jasperReportShowForm").formvalidate({
            submitHandler : function(form) {
                $(form).find("select[size][id^='right'] option").attr("selected", true);
                form.submit();
            }
        });
    });
</script>
</head>
<body>
	<div class="container-fluid data-edit">
		<s2:form cssClass="form-horizontal" method="get" id="jasperReportShowForm"
			action="/rpt/jasper-report!generate" target="_blank">
			<s:hidden name="report" value="%{#parameters.report}" />
			<div class="row-fluid">
				<div class="toolbar">
					<div class="toolbar-inner">
						<button type="button" class="btn btn-submit">
							<i class="icon-ok"></i> 生成报表
						</button>
						<button type="reset" class="btn">
							<i class="icon-repeat"></i> 重置
						</button>
					</div>
				</div>
			</div>
			<div class="well">
				<fieldset>
					<legend>
						<small>报表输入参数</small>
					</legend>
					<s:iterator value="reportParameters" status="s" var="reportParameter">
						<s:set var="iteratorId" value="%{'reportParameter_' + #s.index}" scope="page" />
						<div class="row-fluid">
							<div class="span6">
								<s:if test="type.name()=='DATE'">
									<s:textfield id="%{#attr.iteratorId}" cssClass="edit_text %{fullValidateRules}"
										name="%{'reportParameterMap[\\''+code+'\\']'}" value="%{defaultValue}" maxlength="12" />
									<s:set var="calendarId" value="%{'reportParameter_' + #s.index}" scope="page" />
									<script type="text/javascript">
                                        initCalendar({
                                            el : '<s:property value="#attr.iteratorId"/>',
                                            type : 'date'
                                        });
                                    </script>
								</s:if>
								<s:else>
									<s2:textfield id="%{'reportParameter_' + #s.index}" validator="%{fullValidateRules}"
										name="%{'reportParameters[\\''+code+'\\']'}" value="%{defaultValue}"
										label="%{#reportParameter.title}" />
								</s:else>
							</div>
						</div>
					</s:iterator>
				</fieldset>
				<fieldset>
					<legend>
						<small>报表输出控制参数</small>
					</legend>
					<div class="row-fluid">
						<div class="span6">
							<s2:radio name="format" list="jasperOutputFormatMap" label="输出类型" />
						</div>
					</div>
					<div class="row-fluid">
						<div class="span6">
							<s2:radio name="contentDisposition" label="输出模式"
								list="#{'inline':'浏览器页面直接显示','attachment':'文件下载模式'}" />
						</div>
					</div>
				</fieldset>
			</div>
		</s2:form>
	</div>
	<%@ include file="/common/index-footer.jsp"%>
</body>
</html>