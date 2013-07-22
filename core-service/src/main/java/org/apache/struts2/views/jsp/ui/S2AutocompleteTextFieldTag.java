package org.apache.struts2.views.jsp.ui;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.components.AutocompleteTextField;
import org.apache.struts2.components.Component;

import com.opensymphony.xwork2.util.ValueStack;

public class S2AutocompleteTextFieldTag extends AbstractUITag {

    protected String maxlength;
    protected String readonly;
    protected String size;
    protected String source;
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
        textField.setSource(source);
        textField.setOptions(options);
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

    public void setSource(String source) {
        this.source = source;
    }

    public void setOptions(String options) {
        this.options = options;
    }
}