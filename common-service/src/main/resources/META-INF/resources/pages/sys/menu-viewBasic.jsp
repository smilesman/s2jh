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
			<div class="span6">

				<div class="control-group">
					<label class="control-label" for="type">类型</label>
					<div class="controls">
						<s:property value="#application.menuTypeMap[type]" />
					</div>
				</div>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span12">
				<div class="control-group">
					<label class="control-label" for="url">菜单URL</label>
					<div class="controls">
						<s:property value="url" />
					</div>
				</div>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span6">

				<div class="control-group">
					<label class="control-label" for="initOpen">展开标识</label>
					<div class="controls">
						<s:property value="#application.booleanLabelMap[initOpen]" />
					</div>
				</div>
			</div>
			<div class="span6">

				<div class="control-group">
					<label class="control-label" for="disabled">禁用标识</label>
					<div class="controls">
						<s:property value="#application.booleanLabelMap[disabled]" />
					</div>
				</div>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span6">

				<div class="control-group">
					<label class="control-label" for="style">图标样式</label>
					<div class="controls">
						<s:property value="style" />
					</div>
				</div>
			</div>
			<div class="span6">

				<div class="control-group">
					<label class="control-label" for="orderRank">排序号</label>
					<div class="controls">
						<s:property value="orderRank" />
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
	</div>
</div>