<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/page-header.jsp"%>
<div class="container-fluid data-view">
	<div class="well form-horizontal">
		<div class="row-fluid">
			<div class="span6">
				<div class="control-group">
					<label class="control-label" for="code">代码</label>
					<div class="controls">
						<s:property value="code" />
					</div>
				</div>
			</div>
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
					<label class="control-label" for="disabled">禁用标识</label>
					<div class="controls">
						<s:property value="#application.booleanLabelMap[disabled]" />
					</div>
				</div>
			</div>
			<div class="span6">

				<div class="control-group">
					<label class="control-label" for="locked">锁定标识</label>
					<div class="controls">
						<s:property value="#application.booleanLabelMap[locked]" />
					</div>
				</div>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span12">

				<div class="control-group">
					<label class="control-label" for="description">描述</label>
					<div class="controls">
						<s:property value="description" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>