package org.apache.struts2.views.jsp.ui;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.components.AutocompleteTextField;
import org.apache.struts2.components.Component;

import com.opensymphony.xwork2.util.ValueStack;

public class AutocompleteTextFieldTag  extends AbstractUITag {

    protected String maxlength;
    protected String readonly;
    protected String size;
    protected String url;
    protected String options;

    public Component getBean(ValueStack stack, HttpServletRequest req, HttpServletResponse res) {
        return new AutocompleteTextField(stack, req, res);
    }

    protected void populateParams() {
        super.populateParams();

        AutocompleteTextField textField = ((AutocompleteTextField) component);
        textField.setMaxlength(maxlength);
        textField.setReadonly(readonly);
        textField.setSize(size);
        textField.setUrl(url);
        textField.setOptions(options);
    }

    /**
     * @deprecated please use {@link #setMaxlength} instead
     */
    public void setMaxLength(String maxlength) {
        this.maxlength = maxlength;
    }

    public void setMaxlength(String maxlength) {
        this.maxlength = maxlength;
    }

    public void setReadonly(String readonly) {
        this.readonly = readonly;
    }

    public void setSize(String size) {
        this.size = size;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }
    
    public void setOptions(String options) {
        this.options = options;
    }
}