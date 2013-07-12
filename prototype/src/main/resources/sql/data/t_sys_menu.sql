INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('ff8080813cfa4b4e013cfa4cccb70000', NULL, NULL, 3, NULL, 'M897633', NULL, 0, NULL, 0, 1000, NULL, '基础配置管理', 'RELC', NULL, NULL);
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('402880c53e633b10013e633c3fd30001', NULL, NULL, 2, NULL, 'MFIXRPT', NULL, 0, NULL, 1, 100, NULL, '报表模块', 'RELC', NULL, NULL);
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('402880c53e491ed1013e492034f70000', NULL, NULL, 0, NULL, 'M206909', NULL, 0, NULL, 0, 100, NULL, '监控管理', 'RELC', NULL, 'ff8080813cfa4b4e013cfa4cccb70000');
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('402880c53e491ed1013e4921284d0001', NULL, NULL, 0, NULL, 'M573335', NULL, 0, NULL, 0, 100, NULL, '登录日志', 'RELC', '/auth/user-logon-log', '402880c53e491ed1013e492034f70000');
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('ff8080813cfa4e5e013cfa4f7d250000', NULL, NULL, 1, NULL, 'M243342', NULL, 0, NULL, 1, 10, NULL, '权限配置', 'RELC', NULL, 'ff8080813cfa4b4e013cfa4cccb70000');
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('402880c53cfa5afa013cfa6425820000', NULL, NULL, 0, NULL, 'M483623', NULL, 0, NULL, 0, 10, NULL, '权限管理', 'RELC', '/auth/privilege', 'ff8080813cfa4e5e013cfa4f7d250000');
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('402880c53cfa5afa013cfa6451f30001', NULL, NULL, 0, NULL, 'M444893', NULL, 0, NULL, 0, 10, NULL, '角色管理', 'RELC', '/auth/role', 'ff8080813cfa4e5e013cfa4f7d250000');
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('402880c53cfa5afa013cfa6474970002', NULL, NULL, 0, NULL, 'M435878', NULL, 0, NULL, 0, 10, NULL, '用户管理', 'RELC', '/auth/user', 'ff8080813cfa4e5e013cfa4f7d250000');
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('ff8080813cfa5083013cfa51269b0000', NULL, NULL, 2, NULL, 'M792883', NULL, 0, NULL, 1, 10, '', '系统管理', 'RELC', '', 'ff8080813cfa4b4e013cfa4cccb70000');
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('402880c53f282a06013f282c763b0001', NULL, NULL, 0, NULL, 'M993391', NULL, 0, NULL, 0, 100, '', '辅助管理', 'RELC', '/sys/util', 'ff8080813cfa5083013cfa51269b0000');
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('ff8080813cfa52d5013cfa53bb470000', NULL, NULL, 1, NULL, 'M900054', NULL, 0, NULL, 0, 1000, '', '菜单管理', 'RELC', '/sys/menu', 'ff8080813cfa5083013cfa51269b0000');
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('ff8080813cfa52d5013cfa53bb470033', NULL, NULL, 1, NULL, 'M900055', NULL, 0, NULL, 0, 500, '', '数据字典', 'RELC', '/sys/data-dict', 'ff8080813cfa5083013cfa51269b0000');
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('402880c53cfc2f2f013cfc30cd740001', NULL, NULL, 2, NULL, 'M919159', NULL, 0, NULL, 1, 100, NULL, '主数据管理', 'RELC', NULL, '402880c53cfa5afa013cfa67c4c80003');
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('402880c53e633b10013e633e040a0002', NULL, NULL, 1, NULL, 'M219215', NULL, 0, NULL, 0, 100, NULL, '报表管理', 'RELC', '/rpt/report-def', '402880c53e633b10013e633c3fd30001');

INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('402880c53e633b10013e633ebaf16789', NULL, NULL, 0, NULL, 'M517467', NULL, 0, NULL, 1, 100, NULL, '演示功能', 'RELC', NULL, NULL);
INSERT INTO `t_sys_menu` (`id`, `acl_code`, `acl_type`, `version`, `children_size`, `code`, `description`, `disabled`, `inherit_level`, `init_open`, `order_rank`, `style`, `title`, `type`, `url`, `parent_id`) VALUES ('402880c53e633b10013e633ebaf16889', NULL, NULL, 0, NULL, 'M517568', NULL, 0, NULL, 1, 100, NULL, '基础CURD功能', 'RELC', '/biz/demo/demo', '402880c53e633b10013e633ebaf16789');