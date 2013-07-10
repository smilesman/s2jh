package lab.s2jh.core.service;

import java.io.Serializable;

public interface UtilService {

    void detachEntity(Object entity);

    Object findEntity(Class entityClass, Serializable id);
}
