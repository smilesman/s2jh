package lab.s2jh.rpt.web.action;

import lab.s2jh.core.annotation.MetaData;
import lab.s2jh.rpt.entity.ReportDef;
import lab.s2jh.rpt.service.ReportDefService;
import lab.s2jh.core.service.BaseService;
import lab.s2jh.core.web.BaseController;
import lab.s2jh.core.web.view.OperationResult;

import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

@MetaData(title = "[TODO控制器名称]")
public class ReportDefController extends BaseController<ReportDef,String> {

    @Autowired
    private ReportDefService reportDefService;

    @Override
    protected BaseService<ReportDef, String> getEntityService() {
        return reportDefService;
    }
    
    @Override
    protected void checkEntityAclPermission(ReportDef entity) {
        // TODO Add acl check code logic
    }

    @MetaData(title = "[TODO方法作用]")
    public HttpHeaders todo() {
        //TODO
        setModel(OperationResult.buildSuccessResult("TODO操作完成"));
        return buildDefaultHttpHeaders();
    }
    
    @Override
    @MetaData(title = "创建")
    public HttpHeaders doCreate() {
        return super.doCreate();
    }

    @Override
    @MetaData(title = "更新")
    public HttpHeaders doUpdate() {
        return super.doUpdate();
    }

    @Override
    @MetaData(title = "删除")
    public HttpHeaders doDelete() {
        return super.doDelete();
    }

    @Override
    @MetaData(title = "查询")
    public HttpHeaders findByPage() {
        return super.findByPage();
    }
}