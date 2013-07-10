<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<div class="container-fluid data-edit">
	<s2:form cssClass="form-horizontal" method="post"
		action="%{persistentedModel?'/rpt/report-def!doUpdate':'/rpt/report-def!doCreate'}">
		<s:hidden name="id" />
		<s:hidden name="version" />
		<s:hidden name="prepare" value="true" />
		<s:token />
		<div class="row-fluid">
			<div class="toolbar">
				<div class="toolbar-inner">
					<button type="button" class="btn btn-submit" callback-tab="reportDefIndexTabs"
						callback-grid="reportDefListDiv">
						<i class="icon-ok"></i> 保存
					</button>
					<button type="button" class="btn btn-submit submit-post-close"
						callback-tab="reportDefIndexTabs" callback-grid="reportDefListDiv">
						<i class="icon-check"></i> 保存并关闭
					</button>
					<button type="reset" class="btn">
						<i class="icon-repeat"></i> 重置
					</button>
				</div>
			</div>
		</div>
		<div class="well">
			<div class="row-fluid">
				<div class="span6">
					<s2:textfield name="code" label="代码" />
				</div>
			</div>
			<div class="row-fluid">
				<div class="span6">
					<s2:textfield name="title" label="名称" />
				</div>
			</div>
			<div class="row-fluid">
				<div class="span6">
					<s2:textfield name="description" label="描述" />
				</div>
			</div>
			<div class="row-fluid">
				<div class="span6">
					<s2:comboselect name="type" list="#application.reportTypeEnumMap" label="类型" />
				</div>
			</div>
			<div class="row-fluid">
				<div class="span6">
					<s2:combotext name="category" list="categories" label="分类" />
				</div>
			</div>
			<div class="row-fluid">
				<div class="span6">
					<s2:textfield name="orderRank" label="排序号" />
				</div>
			</div>
			<div class="row-fluid">
				<div class="span6">
					<s2:radio name="disabled" list="#application.booleanLabelMap" label="禁用标识" />
				</div>
			</div>
			<div class="row-fluid">
				<div class="span6">
					<div class="control-group">
						<label class="control-label" for="updatePassword<s:property value='#parameters.id'/>">
							已关联附件 </label>
						<div class="controls">
							<ul id="fileLists<s:property value='#parameters.id'/>">
								<li><a href="#" id="fileLink<s:property value='#parameters.id'/>">Home</a></li>
							</ul>
							<label class="checkbox inline"> <input
								id="updatePassword<s:property value='#parameters.id'/>" type="checkbox" value="op"
								name="updatePassword"> 更新附件
							</label>
						</div>
					</div>
				</div>
			</div>
			<div class="row-fluid">
				<div class="span6">
					<div class="control-group">
						<label class="control-label" for="updatePassword<s:property value='#parameters.id'/>">
							附件 </label>
						<div class="controls">
							<div class="input-append">
								<input type="file" id="aaa" name="aaa" style="display: none"> <input id="bbb"
									class="input-fluid ui-autocomplete-input" type="text" required="required"
									name="combobox_015254" autocomplete="off"> <span
									class="ui-helper-hidden-accessible" role="status" aria-live="polite"></span><span
									id="btnSelect_form_PLuznZsAOR_targetXx_xxdm" class="add-on" style="cursor: pointer"
									onclick="$('#aaa').click()"> <i class="icon-file"></i>
								</span>
							</div>

							<input type="file" name="attachments" id="file_upload" />

							<script type="text/javascript">
                                $('#aaa').change(function() {
                                    $("#bbb").val($(this).val());
                                });

                                $(function() {

                                    $("#file_upload").uploadify({
                                        //开启调试
                                        'debug' : false,
                                        //是否自动上传
                                        'auto' : true,
                                        //超时时间
                                        'successTimeout' : 99999,
                                        //flash
                                        'swf' : '${base}/components/jquery.uploadify/3.2/uploadify.swf',
                                        //不执行默认的onSelect事件
                                        //'overrideEvents' : [ 'onDialogClose' ],
                                        //文件选择后的容器ID
                                        //'queueID' : 'uploadfileQueue',
                                        //服务器端脚本使用的文件对象的名称 $_FILES个['upload']
                                        'fileObjName' : 'attachments',
                                        //上传处理程序
                                        'uploader' : '${base}/sys/attachment-file!upload',
                                        'buttonText' : '选取文件',
                                        //浏览按钮的背景图片路径
                                        //'buttonImage' : 'upbutton.gif',
                                        //浏览按钮的宽度
                                        'width' : '100',
                                        //浏览按钮的高度
                                        'height' : '24',
                                        //expressInstall.swf文件的路径。
                                        //'expressInstall' : 'expressInstall.swf',
                                        //在浏览窗口底部的文件类型下拉菜单中显示的文本
                                        'fileTypeDesc' : '支持的格式：',
                                        //允许上传的文件后缀
                                        //'fileTypeExts' : '*.jpg;*.jpge;*.gif;*.png',
                                        //上传文件的大小限制
                                        'fileSizeLimit' : '10MB',
                                        //上传数量
                                        'queueSizeLimit' : 25,
                                        //每次更新上载的文件的进展
                                        'onUploadProgress' : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                                            //有时候上传进度什么想自己个性化控制，可以利用这个方法
                                            //使用方法见官方说明
                                        },
                                        //选择上传文件后调用
                                        'onSelect' : function(file) {

                                        },
                                        //返回一个错误，选择文件的时候触发
                                        'onSelectError' : function(file, errorCode, errorMsg) {
                                            switch (errorCode) {
                                            case -100:
                                                alert("上传的文件数量已经超出系统限制的" + $('#file_upload').uploadify('settings', 'queueSizeLimit') + "个文件！");
                                                break;
                                            case -110:
                                                alert("文件 [" + file.name + "] 大小超出系统限制的" + $('#file_upload').uploadify('settings', 'fileSizeLimit') + "大小！");
                                                break;
                                            case -120:
                                                alert("文件 [" + file.name + "] 大小异常！");
                                                break;
                                            case -130:
                                                alert("文件 [" + file.name + "] 类型不正确！");
                                                break;
                                            }
                                        },
                                        //检测FLASH失败调用
                                        'onFallback' : function() {
                                            alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
                                        },
                                        //上传到服务器，服务器返回相应信息到data里
                                        'onUploadSuccess' : function(file, data, response) {
                                            alert(data);
                                        }
                                    });
                                });
                            </script>
						</div>
					</div>
				</div>
			</div>
		</div>
	</s2:form>
</div>