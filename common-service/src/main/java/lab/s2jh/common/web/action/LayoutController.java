package lab.s2jh.common.web.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import lab.s2jh.auth.entity.User;
import lab.s2jh.auth.service.UserService;
import lab.s2jh.core.security.AuthContextHolder;
import lab.s2jh.core.security.AuthUserDetails;
import lab.s2jh.core.web.view.OperationResult;
import lab.s2jh.sys.service.MenuService;
import lab.s2jh.sys.vo.NavMenuVO;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.apache.struts2.rest.RestActionSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opensymphony.xwork2.ModelDriven;

/**
 *
 */
public class LayoutController extends RestActionSupport implements ModelDriven<Object> {

    @Autowired
    private MenuService menuService;

    @Autowired
    private UserService userService;

    private ObjectMapper mapper = new ObjectMapper();

    private Object model;

    public AuthUserDetails getAuthUserDetails() {
        return AuthContextHolder.getAuthUserDetails();
    }

    public HttpHeaders index() {
        return new DefaultHttpHeaders("/layout/index").disableCaching();
    }

    public HttpHeaders menu() throws JsonProcessingException {
        HttpServletRequest request = ServletActionContext.getRequest();
        List<NavMenuVO> menus = menuService.authUserMenu(AuthContextHolder.getAuthUserDetails().getAuthorities(),
                request.getContextPath());
        request.setAttribute("rootMenus", menus);
        request.setAttribute("menuJsonData", mapper.writeValueAsString(menus));
        return new DefaultHttpHeaders("/layout/menu").disableCaching();
    }

    public HttpHeaders welcome() {
        return new DefaultHttpHeaders("/layout/welcome").disableCaching();
    }

    public HttpHeaders passwd() {
        return new DefaultHttpHeaders("/layout/passwd").disableCaching();
    }

    public HttpHeaders doPasswd() {
        AuthUserDetails authUserDetails = AuthContextHolder.getAuthUserDetails();
        Assert.notNull(authUserDetails);
        HttpServletRequest request = ServletActionContext.getRequest();
        String oldpasswd = request.getParameter("oldpasswd");
        String newpasswd = request.getParameter("newpasswd");
        Assert.isTrue(StringUtils.isNotBlank(oldpasswd));
        Assert.isTrue(StringUtils.isNotBlank(newpasswd));

        User user = userService.findByUid(authUserDetails.getUid());
        String encodedPasswd = userService.encodeUserPasswd(user, oldpasswd);
        if (!encodedPasswd.equals(user.getPassword())) {
            model = OperationResult.buildFailureResult("原密码不正确,请重新输入");
        }else{
            userService.save(user, newpasswd);
            model = OperationResult.buildSuccessResult("密码修改成功,请在下次登录使用新密码");
        }
        return new DefaultHttpHeaders().disableCaching();
    }

    @Override
    public Object getModel() {
        return model;
    }
}
