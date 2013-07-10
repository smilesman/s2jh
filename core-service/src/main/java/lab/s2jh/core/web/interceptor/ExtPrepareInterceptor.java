package lab.s2jh.core.web.interceptor;

import java.lang.reflect.InvocationTargetException;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.Preparable;
import com.opensymphony.xwork2.interceptor.MethodFilterInterceptor;
import com.opensymphony.xwork2.interceptor.PrefixMethodInvocationUtil;

/**
 * 修改标准的PrepareInterceptor: 先执行prepare再执行相关的prepareXXX方法
 * @see com.opensymphony.xwork2.interceptor.PrepareInterceptor
 */
public class ExtPrepareInterceptor extends MethodFilterInterceptor {

    private final static String PREPARE_PREFIX = "prepare";
    private final static String ALT_PREPARE_PREFIX = "prepareDo";

    private boolean alwaysInvokePrepare = true;
    private boolean firstCallPrepareDo = false;

    /**
     * Sets if the <code>preapare</code> method should always be executed.
     * <p/>
     * Default is <tt>true</tt>.
     *
     * @param alwaysInvokePrepare if <code>prepare</code> should always be executed or not.
     */
    public void setAlwaysInvokePrepare(String alwaysInvokePrepare) {
        this.alwaysInvokePrepare = Boolean.parseBoolean(alwaysInvokePrepare);
    }

    /**
     * Sets if the <code>prepareDoXXX</code> method should be called first
     * <p/>
     * Default is <tt>false</tt> for backward compatibility
     *
     * @param firstCallPrepareDo if <code>prepareDoXXX</code> should be called first
     */
    public void setFirstCallPrepareDo(String firstCallPrepareDo) {
        this.firstCallPrepareDo = Boolean.parseBoolean(firstCallPrepareDo);
    }

    @Override
    public String doIntercept(ActionInvocation invocation) throws Exception {
        Object action = invocation.getAction();

        if (action instanceof Preparable) {
            
            if (alwaysInvokePrepare) {
                ((Preparable) action).prepare();
            }
            
            try {
                String[] prefixes;
                if (firstCallPrepareDo) {
                    prefixes = new String[] {ALT_PREPARE_PREFIX, PREPARE_PREFIX};
                } else {
                    prefixes = new String[] {PREPARE_PREFIX, ALT_PREPARE_PREFIX};
                }
                PrefixMethodInvocationUtil.invokePrefixMethod(invocation, prefixes);
            }
            catch (InvocationTargetException e) {
                /*
                 * The invoked method threw an exception and reflection wrapped it
                 * in an InvocationTargetException.
                 * If possible re-throw the original exception so that normal
                 * exception handling will take place.
                 */
                Throwable cause = e.getCause();
                if (cause instanceof Exception) {
                    throw (Exception) cause;
                } else if(cause instanceof Error) {
                    throw (Error) cause;
                } else {
                    /*
                     * The cause is not an Exception or Error (must be Throwable) so
                     * just re-throw the wrapped exception.
                     */
                    throw e;
                }
            }


        }

        return invocation.invoke();
    }

}
