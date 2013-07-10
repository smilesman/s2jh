package lab.s2jh.core.web.util;

import java.util.Enumeration;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.ServletRequest;

import org.springframework.util.Assert;

public class ServletUtils {

    public static Map<String, String[]> getParametersStartingWith(ServletRequest request, String prefix, String suffix) {
        Assert.notNull(request, "Request must not be null");
        @SuppressWarnings("rawtypes")
        Enumeration paramNames = request.getParameterNames();
        Map<String, String[]> params = new TreeMap<String, String[]>();
        if (prefix == null) {
            prefix = "";
        }
        if (suffix == null) {
            suffix = "";
        }
        while (paramNames != null && paramNames.hasMoreElements()) {
            String paramName = (String) paramNames.nextElement();
            if (("".equals(prefix) || paramName.startsWith(prefix))
                    && ("".equals(suffix) || paramName.endsWith(suffix))) {
                String unprefixed = paramName.substring(prefix.length(), paramName.length() - suffix.length());
                String[] values = request.getParameterValues(paramName);
                if (values == null || values.length == 0) {
                    // Do nothing, no values found at all.
                } else if (values.length > 1) {
                    params.put(unprefixed, values);
                } else {
                    params.put(unprefixed, new String[] { values[0] });
                }
            }
        }
        return params;
    }
}
