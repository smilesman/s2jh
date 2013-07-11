(function($) {
	$.widget("ui.combotext", {
		options: {
			delay: 60,
			title: '展开',
			minLength: 1,
			highlight: true,
			autoFocus:false
		},
		_create: function() {
			
			var self = this,
				select = self.element.hide(),
				el_selected = select.children(':selected').eq(0),
				select_text = el_selected[0] && el_selected.text()  || '',
				select_val = el_selected[0] && el_selected.val() || '';

			var targetName=select.attr("name");
			select.attr("name","_replacebycombo_"+targetName);
			select.attr("disabled",true);
			var selectRequired=select.attr("required");
			
			$.each(select.children("option"),function(){
				$(this).attr("pinyin",makePy(this.text));
			});
			
			var divContaner=$('<div class="input-append"/>');
			divContaner.insertBefore(select);
			
			var input = self.input = $('<input name="'+targetName+'" type="text"/>')
				.attr('id', 'combotext_' + (''+Math.random()).slice(-6))
				.val( select_text )
				.addClass(select.attr("class"))
				.appendTo(divContaner)
				.autocomplete({
					source: function(request, response) {
						// var matcher = new RegExp(request.term, "i");	// 当输入如c++的类正则字符时会抛出 invalid quantifier +
						// edit waiting: 使用not过滤掉被禁止项目，实现通过仅用项目来动态屏蔽搜索结果
						response(select.children("option").not(':disabled').map(function() {
							var showText=this.text;
							if(this.text!=this.value){
							    showText=this.value+":"+this.text;
							}
							var pinyin=$(this).attr("pinyin");
							if(this.value==''){
								return {
									label: "&nbsp;",
									value: this.value,
									option: this
								};
							}
							// if (this.value && (!request.term || matcher.test(text)))
							if (this.value && (!request.term || showText.toLowerCase().indexOf(request.term.toLowerCase()) >= 0
									|| pinyin.toLowerCase().indexOf(request.term.toLowerCase()) >= 0)) {
								if(self.options.highlight && request.term!=''){
									showText= showText.replace(
											new RegExp(
													"(?![^&;]+;)(?!<[^<>]*)(" +
													$.ui.autocomplete.escapeRegex(request.term) +
													")(?![^<>]*>)(?![^&;]+;)", "gi"
												), "<strong><font color=red>$1</font></strong>" );
								}
								return {
									label: showText,
									value: this.value,
									option: this
								};
							}
						}));
					},
					// 修正 change事件的滞后性,用于表单当通过按钮选择项目后直接提交会导致select选项未更新从而提交的是错误值 !
					select: function(event, ui) {
						select.val( ui.item.option.text );	// 更新select值
						ui.item.option.selected = true;
						self._trigger("selected", event, {
							item: ui.item.option
						});
						input.attr("title",ui.item.option.text);
						input.closest("form").attr("_inputChanged",'true');
					},
					change: function(event, ui) {
						var input = $(this);
						input.closest("form").attr("_inputChanged",'true');
					},
					delay: self.options.delay,
					minLength: self.options.minLength,
					autoFocus: self.options.autoFocus
				});
		
			if(selectRequired){
			    input.attr("required",selectRequired);
			}
			select.removeAttr("class");
			
			// 非IE下绑定input事件来兼容输入法中文输入
			if (!jQuery.browser.msie) {
				input[0].addEventListener(
						'input', 
						function() {
							var val = this.value;
							if (val) {
								$(this).autocomplete("search", val);
							}
						}, false
				);
			}

			input.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
				return $( "<li></li>" )
					.data( "item.autocomplete", item )
					.append( "<a>" + item.label + "</a>" )
					.appendTo( ul );
			};
			
			this.button = $('<span class="add-on"><i class="icon-arrow-down"></i></span>')
			.attr("tabIndex", -1)
			.attr('title', self.options.title)
			.appendTo(divContaner)
			.click(function() {
				// close if already visible
				if (input.autocomplete("widget").is(":visible")) {
					input.autocomplete("close");
					return false;		
				}
				// work around a bug (likely same cause as #5265)
				$( this ).blur();

				// pass empty string as value to search for, displaying all results
				input.autocomplete("option", "minLength" , 0);
				input.autocomplete("search", "").focus();
				input.autocomplete("option", "minLength" , self.options.minLength);
				//alert(input.autocomplete( "option", "source" ) )
				return false;	// false 和jQueryUI.dialog协作时FF下会提交表单
			});
			el_selected = select_text = select_val=null;
		},
			
		_setOption: function(key, value) {
			var self = this;
			var select = self.element,
				input = select.next();
			if (key == 'size') {
				value = parseInt(value, 10);
				input.attr('size', value);	
			}else if (key == 'disabled'||key=='minLength') {
				this.input.autocomplete("option", key , value);
			}else {
				this.options[key] = value;
			}
		},

		destroy: function() {
			 this.input.remove();
			 this.button.remove();
			 this.element.show();
			 $.Widget.prototype.destroy.call( this );
		}
	});
})(jQuery);
