package lab.s2jh.sys.service;

import lab.s2jh.core.dao.BaseDao;
import lab.s2jh.core.service.BaseService;
import lab.s2jh.sys.entity.DataDict;
import lab.s2jh.sys.dao.DataDictDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DataDictService extends BaseService<DataDict,String>{
    
    @Autowired
    private DataDictDao dataDictDao;

    @Override
    protected BaseDao<DataDict, String> getEntityDao() {
        return dataDictDao;
    }
}
