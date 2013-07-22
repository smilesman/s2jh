package lab.s2jh.rpt.service.test;

import java.util.List;

import lab.s2jh.rpt.entity.ReportParam;
import lab.s2jh.rpt.service.ReportParamService;
import lab.s2jh.core.test.SpringTransactionalTestCase;
import lab.s2jh.core.test.TestObjectUtils;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

@ContextConfiguration(locations = { "classpath:/context/spring*.xml" })
public class ReportParamServiceTest extends SpringTransactionalTestCase {

	@Autowired
	private ReportParamService reportParamService;

    @Test
    public void findByPage() {
        //Insert mock entity
        ReportParam entity = TestObjectUtils.buildMockObject(ReportParam.class);
        reportParamService.save(entity);
        Assert.assertTrue(entity.getId() != null);

        //JPA/Hibernate query validation
        List<ReportParam> items = reportParamService.findAll(Sets.newHashSet(entity.getId()));
        Assert.assertTrue(items.size() >= 1);
    }
}