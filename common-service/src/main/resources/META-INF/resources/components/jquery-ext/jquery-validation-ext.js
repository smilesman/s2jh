(function($) {

    /**
     * 表单数据校验组件封装 补充说明：
     * 1，除了标准的rules语法定义校验规则，一种比较简便的方法是直接以元素属性的方法定义校验规则，如以下class属性中的{date:true,dateISO:true}：
     * <s:textfield name="expectedFinishDate" cssClass="edit_text
     * {date:true,dateISO:true}" value="%{expectedFinishDateFormat}"/>
     * 2，对于提示信息的一个特殊处理：默认组件给出的校验错误提示信息是追加在相关元素之后，如果对于radio组或有日历选取图标之类的表单元素，
     * 会导致提示信息错位比较难看，因此对于此类元素可以在form表单补充追加一个错误提示信息显示span元素，
     * 其name属性规则是=校验元素的name属性+'ErrorPlacement'后缀
     * 3，对于Remote校验，最常用的就是校验输入值是否已经存在，此需求可直接用封装的远程Action校验逻辑checkDuplicate
     * 参考样例：remote :
     * "${base}/demo/po/purchase-order!checkDuplicate.action?name=sn&sid=<s:property
     * value='sid'/>" 为了提示友好性，一般remote校验会对应提供定制化的错误提示信息，如：订单已存在，请重新输入！
     * 
     * @param targetForm
     *            目标校验form的JQuery对象
     * @param options
     *            参数 组件标准参数： 直接参考JQuery
     *            Validate插件参数定义：http://docs.jquery.com/Plugins/Validation
     *            常用参数列表：
     *            trackFormChange：true/false，标识是否追踪表单数据变更，主要用于编辑表单如果用户没有修改表单数据，则submit时提示用户没有修改提交无效
     *            submitHandler：校验通过回调的提交处理方法，一般在此方法中追加额外标准方法无法校验的补充校验逻辑，
     *            并一般再调用封装的公共提交处理方法globalSubmitHandler（此方法用法请直接搜索本文件）
     */
    $.extend($.fn, {
        formvalidate : function(options) {
            $.metadata.setType("attr", "validator");
            targetForm = $(this);
            var settings = jQuery.extend({
                trackFormChange : false,
                initSubmit : false,
                meta : false,
                onkeyup : false,
                errorPlacement : function(label, element) {
                    if (element.is(":checkbox") || element.is("input[type='radio']") || element.next().is("img.ui-datapick-img")) {
                        label.appendTo(element.parent().parent());
                    } else if (element.parent().is(".input-append")) {
                        label.insertAfter(element.parent());
                    } else {
                        label.insertAfter(element);
                    }

                },
                highlight : function(label) {
                    $(label).closest('.control-group').addClass('error');
                },
                unhighlight : function(label) {
                    $(label).closest('.control-group').removeClass('error');
                },
                onfocusout : function(element, event) {
                    if (element.tagName === "TEXTAREA" || (element.tagName === "INPUT" && element.type !== "password" && element.type !== "file")) {
                        element.value = $.trim(element.value);
                    }
                    return $.validator.defaults.onfocusout.call(this, element, event);
                },
                submitHandler : function(form, event) {
                    var submitButton = $(this.submitButton);
                    submitButton.attr("disabled", true);
                    $(form).attr("disabled", true);
                    $(form).ajaxSubmit({
                        dataType : "json",
                        success : function(response) {
                            $.unblockUI();
                            submitButton.attr("disabled", false);
                            $(form).attr("disabled", false);
                            if (response.type == "success") {
                                top.$.publishMessage(response.message);
                                var callbackTab = submitButton.attr("callback-tab");
                                var tab;
                                if (callbackTab) {
                                    tab = $("#" + callbackTab);
                                    if (submitButton.hasClass("submit-post-close")) {
                                        tab.tabs("remove");
                                    } else {
                                        if (response.userdata.version == 0) {
                                            tab.tabs("reload", {
                                                parameters : {
                                                    id : response.userdata.id
                                                }
                                            });
                                        } else {
                                            tab.tabs("reload");
                                        }
                                    }
                                }                                 

                                var callbackGrid = submitButton.attr("callback-grid");
                                if (callbackGrid) {
                                    $("#" + callbackGrid).jqGrid("refresh");
                                }

                                if (options.successCallback) {
                                    options.successCallback.call(form, response, submitButton);
                                }
                            } else if (response.type == "failure") {
                                if (options.failureCallback) {
                                    options.failureCallback.call(form, response);
                                } else {
                                    top.$.publishError(response.message);
                                }
                            } else {
                                top.$.publishError("表单处理异常，请联系管理员");
                            }
                        },
                        error : function(xhr) {
                            submitButton.attr("disabled", false);
                            var response = jQuery.parseJSON(xhr.responseText);
                            if (response.type == "error") {
                                top.$.publishError(response.message);
                                if (options.errorCallback) {
                                    options.errorCallback.call(form, response);
                                }
                            } else {
                                top.$.publishError("表单处理异常，请联系管理员");
                            }
                        }
                    });
                    return false;
                }
            }, options);
            var validator = $(this).validate(settings);

            this.delegate("button.btn-submit", "click", function(ev) {
                if (validator.settings.submitHandler) {
                    validator.submitButton = ev.target;
                }
                // allow suppressing validation by adding a cancel class to the
                // submit button
                if ($(ev.target).hasClass('cancel')) {
                    validator.cancelSubmit = true;
                }

                $(this).closest('form').submit();
            });

            if (settings.trackFormChange == true) {
                targetForm.attr("_needTrackChang", 'true');
                targetForm.attr("_inputChanged", 'false');
                targetForm.find(":input[type='text'], :input[type='password'], :input[type='radio'], :input[type='checkbox'], :input[type='file'], select , textarea").change(function() {
                    targetForm.attr("_inputChanged", 'true');
                });
                // to handle back button
                targetForm.find("textarea").keyup(function() {
                    targetForm.attr("_inputChanged", 'true');
                });
            }
            if (settings.initSubmit == true) {
                targetForm.submit();
            }

        }
    });

})(jQuery);

/**
 * 校验输入值需要满足时间格式
 */
jQuery.validator.addMethod("unique", function(value, element) {
    var form = $(element).closest("form");
    var url = form.attr("action").split("!")[0] + "!checkUnique?element=" + $(element).attr("name");
    var id = form.find("input[name='id']");
    if (id.size() > 0) {
        url = url + "&id=" + id.val();
    }
    return $.validator.methods.remote.call(this, value, element, url)
}, "数据已存在");

/**
 * 校验输入值需要满足时间格式
 */
jQuery.validator.addMethod("timestamp", function(value, element) {
    if (value == "") {
        return this.optional(element);
    }
    var regex = /^(?:[0-9]{4})-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
    if (!regex.test(value)) {
        return false;
    }
    return true;
}, "请输入合法的日期时间格式（如2011-08-15 13:40:00）");

/**
 * 校验输入值满足年月格式
 */
jQuery.validator.addMethod("yearMonth", function(value, element) {
    if (value == "") {
        return this.optional(element);
    }
    var regex = /^(?:[0-9]{4})(?:(?:0[1-9])|(?:1[0-2]))$/;
    if (!regex.test(value)) {
        return false;
    }
    return true;
}, "请输入合法的年月格式（如201201）");

jQuery.validator.addMethod("startWith", function(value, element, param) {
    if (this.optional(element)) {
        return true;
    }
    if (param.length > value.length) {
        return false;
    }
    if (value.substr(0, param.length) == param) {
        return true;
    } else {
        return false;
    }
}, "请输入以{0}开头字符串");

/**
 * 校验当前输入日期值应该小于目标元素日期值， 如果目标元素没有输入值，校验认为通过 主要用于两个日期区间段输入校验彼此日期先后合理性
 */
jQuery.validator.addMethod("dateLT", function(value, element, param) {
    if (value == "") {
        return this.optional(element);
    }

    var endDate = $(param).val();
    if (endDate == "") {
        return true;
    }

    var startDate = eval("new Date(" + value.replace(/[\-\s:]/g, ",") + ")");
    endDate = eval("new Date(" + endDate.replace(/[\-\s:]/g, ",") + ")");

    if (startDate > endDate) {
        return false;
    } else {

        return true;
    }
}, "输入的日期数据必须小于结束日期");

/**
 * 校验当前输入日期值应该大于目标元素日期值， 如果目标元素没有输入值，校验认为通过 主要用于两个日期区间段输入校验彼此日期先后合理性
 */
jQuery.validator.addMethod("dateGT", function(value, element, param) {
    if (value == "") {
        return this.optional(element);
    }

    var startDate = $(param).val();
    if (startDate == "") {
        return true;
    }

    var endDate = eval("new Date(" + value.replace(/[\-\s:]/g, ",") + ")");
    startDate = eval("new Date(" + startDate.replace(/[\-\s:]/g, ",") + ")");

    if (startDate > endDate) {

        return false;
    } else {

        return true;
    }
}, "输入的日期数据必须大于开始日期");

var idCardNoUtil = {

    /* 省,直辖市代码表 */
    provinceAndCitys : {
        11 : "北京",
        12 : "天津",
        13 : "河北",
        14 : "山西",
        15 : "内蒙古",
        21 : "辽宁",
        22 : "吉林",
        23 : "黑龙江",
        31 : "上海",
        32 : "江苏",
        33 : "浙江",
        34 : "安徽",
        35 : "福建",
        36 : "江西",
        37 : "山东",
        41 : "河南",
        42 : "湖北",
        43 : "湖南",
        44 : "广东",
        45 : "广西",
        46 : "海南",
        50 : "重庆",
        51 : "四川",
        52 : "贵州",
        53 : "云南",
        54 : "西藏",
        61 : "陕西",
        62 : "甘肃",
        63 : "青海",
        64 : "宁夏",
        65 : "新疆",
        71 : "台湾",
        81 : "香港",
        82 : "澳门",
        99 : "其他"
    },

    /* 每位加权因子 */
    powers : [ "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2" ],

    /* 第18位校检码 */
    parityBit : [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ],

    /* 性别 */
    genders : {
        male : "男",
        female : "女"
    },

    /* 校验地址码 */
    checkAddressCode : function(addressCode) {
        var check = /^[1-9]\d{5}$/.test(addressCode);
        if (!check)
            return false;
        if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
            return true;
        } else {
            return false;
        }
    },

    /* 校验日期码 */
    checkBirthDayCode : function(birDayCode) {
        var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
        if (!check)
            return false;
        var yyyy = parseInt(birDayCode.substring(0, 4), 10);
        var mm = parseInt(birDayCode.substring(4, 6), 10);
        var dd = parseInt(birDayCode.substring(6), 10);
        var xdata = new Date(yyyy, mm - 1, dd);
        if (xdata > new Date()) {
            return false;// 生日不能大于当前日期
        } else if ((xdata.getFullYear() == yyyy) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd)) {
            return true;
        } else {
            return false;
        }
    },

    /* 计算校检码 */
    getParityBit : function(idCardNo) {
        var id17 = idCardNo.substring(0, 17);
        /* 加权 */
        var power = 0;
        for ( var i = 0; i < 17; i++) {
            power += parseInt(id17.charAt(i), 10) * parseInt(idCardNoUtil.powers[i]);
        }
        /* 取模 */
        var mod = power % 11;
        return idCardNoUtil.parityBit[mod];
    },

    /* 验证校检码 */
    checkParityBit : function(idCardNo) {
        var parityBit = idCardNo.charAt(17).toUpperCase();
        if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
            return true;
        } else {
            return false;
        }
    },

    /* 校验15位或18位的身份证号码 */
    checkIdCardNo : function(idCardNo) {
        // 99开头的不校验
        if (idCardNo.startWith("99")) {
            return true;
        }
        // 15位和18位身份证号码的基本校验
        var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
        if (!check)
            return false;
        // 判断长度为15位或18位
        if (idCardNo.length == 15) {
            return idCardNoUtil.check15IdCardNo(idCardNo);
        } else if (idCardNo.length == 18) {
            return idCardNoUtil.check18IdCardNo(idCardNo);
        } else {
            return false;
        }
    },

    // 校验15位的身份证号码
    check15IdCardNo : function(idCardNo) {
        // 15位身份证号码的基本校验
        var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
        if (!check)
            return false;
        // 校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check)
            return false;
        var birDayCode = '19' + idCardNo.substring(6, 12);
        // 校验日期码
        return idCardNoUtil.checkBirthDayCode(birDayCode);
    },

    // 校验18位的身份证号码
    check18IdCardNo : function(idCardNo) {
        // 18位身份证号码的基本格式校验
        var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
        if (!check)
            return false;
        // 校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check)
            return false;
        // 校验日期码
        var birDayCode = idCardNo.substring(6, 14);
        check = idCardNoUtil.checkBirthDayCode(birDayCode);
        if (!check)
            return false;
        // 验证校检码
        // return idCardNoUtil.checkParityBit(idCardNo);
        return check;
    },

    formateDateCN : function(day) {
        if (idCardNoUtil.checkBirthDayCode(day)) {
            var yyyy = day.substring(0, 4);
            var mm = day.substring(4, 6);
            var dd = day.substring(6);
            // alert(yyyy + '-' + mm +'-' + dd);
            return yyyy + '-' + mm + '-' + dd;
        }
        return "";
    },

    // 获取信息
    getIdCardInfo : function(idCardNo) {
        var idCardInfo = {
            gender : "", // 性别
            birthday : "" // 出生日期(yyyy-mm-dd)
        };
        if (idCardNo.length == 15) {
            var aday = '19' + idCardNo.substring(6, 12);
            idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
            if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
                idCardInfo.gender = idCardNoUtil.genders.female;
            } else {
                idCardInfo.gender = idCardNoUtil.genders.male;
            }
        } else if (idCardNo.length == 18) {
            var aday = idCardNo.substring(6, 14);
            idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
            if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
                idCardInfo.gender = idCardNoUtil.genders.female;
            } else {
                idCardInfo.gender = idCardNoUtil.genders.male;
            }

        }
        return idCardInfo;
    },

    // 18位转15位
    getId15 : function(idCardNo) {
        if (idCardNo.length == 15) {
            return idCardNo;
        } else if (idCardNo.length == 18) {
            return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
        } else {
            return null;
        }
    },

    // 15位转18位
    getId18 : function(idCardNo) {
        if (idCardNo.length == 15) {
            var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
            var parityBit = idCardNoUtil.getParityBit(id17);
            return id17 + parityBit;
        } else if (idCardNo.length == 18) {
            return idCardNo;
        } else {
            return null;
        }
    }
};

/**
 * 身份证号码验证 目前去掉了尾数码校验，如果需要启用可在本文件搜索idCardNoUtil.checkParityBit(idCardNo); 取消注释即可
 */
jQuery.validator.addMethod("idCardNo", function(value, element, param) {
    return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
}, "请输入有效的身份证件号");

// 联系电话(手机/电话皆可)验证
jQuery.validator.addMethod("phone", function(value, element) {
    var phone = /^\d|-$/;
    return this.optional(element) || (phone.test(value));
}, "请输入有效的电话号码：数字或'-'");

// 邮政编码验证
jQuery.validator.addMethod("zipCode", function(value, element) {
    var tel = /^[0-9]{6}$/;
    return this.optional(element) || (tel.test(value));
}, "请输入有效的6位数字邮政编码");

// 如果带小数，则必须以.5或.0结尾
jQuery.validator.addMethod("numberEndWithPointFive", function(value, element) {
    var reg = /^(0|[1-9]\d*)([.][05])?$/;
    return this.optional(element) || (reg.test(value));
}, "必须以.0或.5作为小数结尾");

jQuery.validator.addMethod("equalToByName", function(value, element, param) {
    var target = $(element).closest("form").find("input[name='"+param+"']");
    if (this.settings.onfocusout) {
        target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
            $(element).valid();
        });
    }
    return value === target.val();
}, "请输入前后相等数据");
