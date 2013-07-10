package lab.s2jh.common.service;

import java.io.Serializable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import lab.s2jh.core.service.UtilService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("utilService")
@Transactional
public class UtilServiceImpl implements UtilService {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings({ "unchecked", "rawtypes" })
    @Transactional(readOnly = true)
    public Object findEntity(Class entityClass, Serializable id) {
        return entityManager.find(entityClass, id);
    }

    @Override
    public void detachEntity(Object entity) {
        entityManager.detach(entity);
    }
}
