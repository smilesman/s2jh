package lab.s2jh.auth.security.struts2;

import java.lang.reflect.Method;
import java.util.Set;

import lab.s2jh.core.web.annotation.SecurityControllIgnore;

import org.apache.commons.lang3.ClassUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.config_browser.ConfigurationHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.opensymphony.xwork2.config.entities.ActionConfig;
import com.opensymphony.xwork2.inject.Inject;

public class SecurityMetadataSourceExcluder {
    
    private static final Logger logger = LoggerFactory.getLogger(SecurityMetadataSourceExcluder.class);

    protected ConfigurationHelper configHelper;

    @Inject
    public void setConfigurationHelper(ConfigurationHelper configHelper) {
        this.configHelper = configHelper;
    }

    public SecurityMetadataSourceExcluder() {
        Set<String> namespaces = configHelper.getNamespaces();
        for (String namespace : namespaces) {
            if (StringUtils.isBlank(namespace) || namespace.startsWith("/pub")) {
                continue;
            }
            Set<String> actionNames = configHelper.getActionNames(namespace);
            for (String actionName : actionNames) {
                ActionConfig actionConfig = configHelper.getActionConfig(namespace, actionName);
                String className = actionConfig.getClassName();
                if (!className.startsWith("org.apache.struts")) {
                    logger.debug("Parsing actionConfig={}", actionConfig);
                    try {
                        Class<?> actionClass = ClassUtils.getClass(className);
                        for (Method method : actionClass.getDeclaredMethods()) {
                            SecurityControllIgnore securityControllIgnore = method
                                    .getAnnotation(SecurityControllIgnore.class);
                            if (securityControllIgnore != null) {
                                logger.debug("---------------------------------");
                                continue;
                            }
                            
                        }
                    } catch (ClassNotFoundException e) {
                        logger.error(e.getMessage(), e);
                    }
                }
            }
        }
    }

}
