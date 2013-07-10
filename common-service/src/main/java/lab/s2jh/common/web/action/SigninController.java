package lab.s2jh.common.web.action;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.rest.RestActionSupport;

/**
 *
 */
@Namespace("/pub")
public class SigninController extends RestActionSupport {

    public String execute() {
        return "/pub/signin";
    }

}
