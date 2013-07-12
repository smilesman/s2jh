package lab.s2jh.sys.service.test;

import java.util.List;

import lab.s2jh.core.test.SpringTransactionalTestCase;
import lab.s2jh.core.test.TestObjectUtils;
import lab.s2jh.sys.entity.DataDict;
import lab.s2jh.sys.service.DataDictService;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.google.common.collect.Sets;

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

    @Test
    public void findDistinctCategories() {
        //Insert mock entity
        DataDict entity = TestObjectUtils.buildMockObject(DataDict.class);
        entity.setCategory("ABCDEF");
        dataDictService.save(entity);

        DataDict entity2 = TestObjectUtils.buildMockObject(DataDict.class);
        entity2.setCategory("ABCDEF");
        dataDictService.save(entity2);

        List<String> items = dataDictService.findDistinctCategories();
        Assert.assertTrue(items.size() == 1);
        Assert.assertTrue(items.get(0).equals("ABCDEF"));
    }
}