package lab.s2jh.rpt.test.service;

import lab.s2jh.rpt.entity.ReportDef;
import lab.s2jh.rpt.service.ReportDefService;
import lab.s2jh.core.test.SpringTransactionalTestCase;
import lab.s2jh.core.test.TestObjectUtils;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

@ContextConfiguration(locations = { "classpath:/context/spring*.xml" })
public class ReportDefServiceTest extends SpringTransactionalTestCase {

	@Autowired
	private ReportDefService reportDefService;

    @Test
    public void findByPage() {
        //Insert mock entity
        ReportDef entity = TestObjectUtils.buildMockObject(ReportDef.class);
        reportDefService.save(entity);
        Assert.assertTrue(entity.getId() != null);

        //JPA/Hibernate query validation
        List<ReportDef> items = reportDefService.findAll(Sets.newHashSet(entity.getId()));
        Assert.assertTrue(items.size() >= 1);
    }
}