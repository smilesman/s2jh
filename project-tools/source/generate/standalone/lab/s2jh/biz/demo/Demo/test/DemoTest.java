package lab.s2jh.biz.demo.test;

import lab.s2jh.biz.demo.service.DemoService;
import lab.apollo.core.test.SpringTxTestCase;

import org.springframework.beans.factory.annotation.Autowired;


public class DemoServiceTest extends SpringTxTestCase {

	@Autowired
	private DemoService demoService;

}