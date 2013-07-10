package org.apache.struts2.views.jsp.ui;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.struts2.components.UIBean;

/**
 * 标准的form标签的id属性：如果没有提供id属性值则取action属性定义值
 * 这样如果同一个AJAX页面重复多次显示相同JSP页面，则会出现id冲突问题
 * 
 * 因此提供一个扩展form标签，如果没有提供id属性值则以随机生成id值从而避免相同id冲突问题
 */
public class S2FormTag extends FormTag {
    
    protected void populateParams() {
        super.populateParams();
        UIBean uiBean = ((UIBean) component);

        if (id == null) {
            uiBean.setId("form_" + RandomStringUtils.randomAlphabetic(10));
        }
    }
}
