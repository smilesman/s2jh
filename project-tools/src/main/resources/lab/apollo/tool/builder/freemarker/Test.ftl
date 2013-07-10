package ${root_package}.test;

import ${root_package}.service.${entity_name}Service;
import lab.apollo.core.test.SpringTxTestCase;

import org.springframework.beans.factory.annotation.Autowired;


public class ${entity_name}ServiceTest extends SpringTxTestCase {

	@Autowired
	private ${entity_name}Service ${entity_name_uncapitalize}Service;

}