/*
 * $Id: SelectTag.java 651946 2008-04-27 13:41:38Z apetrelli $
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.apache.struts2.views.jsp.ui;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.components.UIBean;

/**
 * 扩展标准的select标签，提供自动化数据校验处理支持
 * 并以Combo组件风格样式呈现下拉框，支持根据输入(拼音)自动提示选择option项目
 * 从而使用户可以更高效便捷的定位选取下拉行项
 * 示例： <s2:comboselect name="mzm" label="民族" list="%{findEnumValuesByType('ZD_GB_MZM')}"/>
 */
public class S2TreeInputTag extends TextFieldTag {

    /** 
     * 如果在元素中未定义此属性，则按照属性的类型、JSR303 Validator注解、Hibernate Entity注解等自动组合生成JQuery Validator校验语法字符串
     * 如果在元素中定义此属性则以直接定义属性值作为JQuery Validator校验语法字符串，不再进行自动校验逻辑计算处理 
     */
    protected String validator;

    protected String treeDataUrl;

    protected String hiddenName;

    protected String hiddenValue;

    protected void populateParams() {
        //此段落必须放在super.populateParams()之前
        try {
            if (StringUtils.isNotBlank(treeDataUrl)) {
                this.setDynamicAttribute(null, "treeDataUrl", treeDataUrl);
            }
            if (StringUtils.isNotBlank(hiddenName)) {
                this.setDynamicAttribute(null, "hiddenName", hiddenName);
            }

            Object realHiddenValue = null;
            if (hiddenValue != null) {
                realHiddenValue = findValue(hiddenValue);
            } else if (hiddenName != null) {
                realHiddenValue = findValue(hiddenName);
            }
            if (realHiddenValue != null) {
                this.setDynamicAttribute(null, "hiddenValue", realHiddenValue);
            }
        } catch (JspException e) {
            e.printStackTrace();
        }

        super.populateParams();

        UIBean uiBean = ((UIBean) component);
        uiBean.setTemplate("treeinput");
        if (id == null) {
            //设置ID随机
            uiBean.setId("treeinput_" + RandomStringUtils.randomAlphabetic(10));
        }

        if (this.cssClass == null) {
            uiBean.setCssClass("input-fluid");
        }

        TagValidatorAttributeBuilder.buildValidatorAttribute(validator, this, this.getStack(),
                (HttpServletRequest) this.pageContext.getRequest(), uiBean);
    }

    public void setValidator(String validator) {
        this.validator = validator;
    }

    public void setTreeDataUrl(String treeDataUrl) {
        this.treeDataUrl = treeDataUrl;
    }

    public void setHiddenName(String hiddenName) {
        this.hiddenName = hiddenName;
    }

    public void setHiddenValue(String hiddenValue) {
        this.hiddenValue = hiddenValue;
    }
}
