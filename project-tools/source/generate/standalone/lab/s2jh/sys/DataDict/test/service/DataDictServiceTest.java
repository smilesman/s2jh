package lab.s2jh.sys.test.service;

import lab.s2jh.sys.entity.DataDict;
import lab.s2jh.sys.service.DataDictService;
import lab.s2jh.core.test.SpringTransactionalTestCase;
import lab.s2jh.core.test.TestObjectUtils;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

@ContextConfiguration(locations = { "classpath:/context/spring*.xml" })
public class DataDictServiceTest extends SpringTransactionalTestCase {

	@Autowired
	private DataDictService dataDictService;

    @Test
    public void findByPage() {
        //Insert mock entity
        DataDict entity = TestObjectUtils.buildMockObject(DataDict.class);
        dataDictService.save(entity);
        Assert.assertTrue(entity.getId() != null);

        //JPA/Hibernate query validation
        List<DataDict> items = dataDictService.findAll(Sets.newHashSet(entity.getId()));
        Assert.assertTrue(items.size() >= 1);
    }
}