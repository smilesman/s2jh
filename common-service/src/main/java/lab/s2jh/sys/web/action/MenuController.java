package lab.s2jh.sys.web.action;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

import lab.s2jh.core.annotation.MetaData;
import lab.s2jh.core.cons.TreeNodeConstant;
import lab.s2jh.core.service.BaseService;
import lab.s2jh.core.web.BaseController;
import lab.s2jh.core.web.view.OperationResult;
import lab.s2jh.sys.entity.Menu;
import lab.s2jh.sys.service.MenuService;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;

public class MenuController extends BaseController<Menu, String> {

    @Autowired
    private MenuService menuService;

    @Override
    protected BaseService<Menu, String> getEntityService() {
        return menuService;
    }

    @Override
    protected void checkEntityAclPermission(Menu entity) {
        //Do nothing check
    }

    @MetaData(title = "树形表格数据")
    public HttpHeaders treeGridData() {
        List<Menu> menuList = Lists.newArrayList();
        Iterable<Menu> menus = menuService.findRoots();
        for (Menu menu : menus) {
            loopTreeGridData(menuList, menu);
        }
        setModel(menuList);
        return buildDefaultHttpHeaders();
    }

    private void loopTreeGridData(List<Menu> menuList, Menu menu) {
        menuList.add(menu);
        List<Menu> children = menuService.findChildren(menu);
        menu.addExtraAttribute("level", menu.getLevel());
        menu.addExtraAttribute("parent", menu.getParent() == null ? "" : menu.getParent().getId());
        menu.addExtraAttribute("isLeaf", CollectionUtils.isEmpty(children) ? true : false);
        menu.addExtraAttribute("expanded", false);
        menu.addExtraAttribute("loaded", true);
        if (!CollectionUtils.isEmpty(children)) {
            for (Menu child : children) {
                loopTreeGridData(menuList, child);
            }
        }
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

    public void prepareCreate() {
        super.prepareCreate();
        String parentId = this.getParameter("parentId");
        if (StringUtils.isNotBlank(parentId) && !"NULL".equalsIgnoreCase(parentId)) {
            bindingEntity.setParent(menuService.findOne(parentId));
        }
        bindingEntity.setCode("M" + RandomStringUtils.randomNumeric(6));
    }

    @MetaData(title = "创建")
    public HttpHeaders doCreate() {
        String parentId = this.getParameter("parentId");
        if (StringUtils.isNotBlank(parentId)) {
            bindingEntity.setParent(menuService.findOne(parentId));
        }
        return super.doCreate();
    }

    @MetaData(title = "列表")
    public HttpHeaders list() {
        List<Map<String, Object>> menuList = Lists.newArrayList();
        Iterable<Menu> menus = menuService.findRoots();
        for (Menu menu : menus) {
            loopMenu(menuList, menu);
        }
        setModel(menuList);
        return buildDefaultHttpHeaders();
    }

    private void loopMenu(List<Map<String, Object>> menuList, Menu menu) {
        Map<String, Object> row = Maps.newHashMap();
        menuList.add(row);
        row.put("id", menu.getId());
        row.put("name", menu.getTitle());
        row.put("open", false);
        row.put("disabled", menu.getDisabled());
        List<Menu> children = menu.getChildren();
        if (!CollectionUtils.isEmpty(children)) {
            List<Map<String, Object>> childrenList = Lists.newArrayList();
            row.put("children", childrenList);
            for (Menu child : children) {
                loopMenu(childrenList, child);
            }
        }
    }

    @MetaData(title = "移动/复制")
    public HttpHeaders doDrag() {
        Set<Menu> operationEntities = Sets.newHashSet();
        Menu target = null;
        String targetId = this.getParameter("targetId");
        if (StringUtils.isNotBlank(targetId)) {
            target = getEntityService().findOne(targetId);
        }

        Collection<Menu> entities = this.getEntitiesByParameterIds();
        String moveType = this.getParameter("moveType");
        String copy = this.getParameter("copy", "false");
        if (BooleanUtils.toBoolean(copy)) {
            Collection<Menu> copyEntities = Lists.newArrayList();
            for (Menu menu : entities) {
                copyEntities.add(cloneNewEntity(menu, "children", "parent"));
            }
            entities = copyEntities;
        }
        if (TreeNodeConstant.TreeNodeDragType.prev.name().equals(moveType)
                || TreeNodeConstant.TreeNodeDragType.next.name().equals(moveType)) {
            int max = 0;
            for (Menu menu : entities) {
                if (menu.getOrderRank() > max) {
                    max = menu.getOrderRank();
                }
            }
            Iterable<Menu> children = null;
            Menu targetParent = target.getParent();
            if (targetParent == null) {
                children = menuService.findRoots();
            } else {
                children = target.getParent().getChildren();
            }
            if (TreeNodeConstant.TreeNodeDragType.prev.name().equals(moveType)) {
                List<Menu> childrenPrev = Lists.newArrayList();
                for (Menu menu : children) {
                    if (menu.getOrderRank() >= target.getOrderRank()) {
                        menu.setOrderRank(menu.getOrderRank() + max);
                        operationEntities.add(menu);
                    } else {
                        childrenPrev.add(menu);
                    }
                }
                int maxPrev = 0;
                for (Menu menu : childrenPrev) {
                    if (menu.getOrderRank() > maxPrev) {
                        maxPrev = menu.getOrderRank();
                    }
                }
                for (Menu menu : entities) {
                    menu.setOrderRank(menu.getOrderRank() + maxPrev);
                    operationEntities.add(menu);
                }
            } else if (TreeNodeConstant.TreeNodeDragType.next.name().equals(moveType)) {
                for (Menu menu : children) {
                    if (menu.getOrderRank() > target.getOrderRank()) {
                        menu.setOrderRank(menu.getOrderRank() + max);
                        operationEntities.add(menu);
                    }
                }
                for (Menu menu : entities) {
                    menu.setOrderRank(menu.getOrderRank() + target.getOrderRank());
                    operationEntities.add(menu);
                }
            }
        } else if (TreeNodeConstant.TreeNodeDragType.inner.name().equals(moveType)) {
            Iterable<Menu> children = null;
            if (target == null) {
                children = menuService.findRoots();
            } else {
                children = target.getChildren();
            }
            int max = 0;
            for (Menu menu : children) {
                if (menu.getOrderRank() > max) {
                    max = menu.getOrderRank();
                }
            }
            for (Menu menu : entities) {
                menu.setOrderRank(menu.getOrderRank() + max);
                menu.setParent(target);
                operationEntities.add(menu);
            }
        } else {
            throw new IllegalArgumentException("moveType=" + moveType);
        }
        getEntityService().save(operationEntities);
        setModel(OperationResult.buildSuccessResult("更新菜单所属上级节点操作完成"));
        return buildDefaultHttpHeaders();
    }
}
