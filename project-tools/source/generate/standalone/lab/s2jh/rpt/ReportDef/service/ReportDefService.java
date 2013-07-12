package lab.s2jh.rpt.service;

import lab.s2jh.core.dao.BaseDao;
import lab.s2jh.core.service.BaseService;
import lab.s2jh.rpt.entity.ReportDef;
import lab.s2jh.rpt.dao.ReportDefDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReportDefService extends BaseService<ReportDef,String>{
    
    @Autowired
    private ReportDefDao reportDefDao;

    @Override
    protected BaseDao<ReportDef, String> getEntityDao() {
        return reportDefDao;
    }
}
