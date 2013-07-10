package lab.s2jh.rpt.web.action;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import lab.s2jh.core.annotation.MetaData;
import lab.s2jh.core.exception.WebException;
import lab.s2jh.core.service.BaseService;
import lab.s2jh.core.web.BaseController;
import lab.s2jh.rpt.entity.ReportDef;
import lab.s2jh.rpt.service.ReportDefService;
import net.sf.jasperreports.engine.JasperCompileManager;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.rest.HttpHeaders;
import org.apache.struts2.views.jasperreports.JasperReportConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;

import com.google.common.collect.Maps;

public class JasperReportController extends BaseController<ReportDef, String> {

    private final Logger logger = LoggerFactory.getLogger(JasperReportController.class);

    private static final String JASPER_TEMPLATE_FILE_DIR = File.separator + "template" + File.separator + "jasper";

    @Autowired
    private ReportDefService reportDefService;

    @Autowired
    private DataSource dataSource;

    public Connection getConnection() {
        try {
            return dataSource.getConnection();
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            throw new WebException(e.getMessage(), e);
        }
    }

    @Override
    protected BaseService<ReportDef, String> getEntityService() {
        return reportDefService;
    }

    @Override
    protected void checkEntityAclPermission(ReportDef entity) {
        // Do nothing
    }

    public String generate() {
        return "jasperResult";
    }

    public String getLocation() {
        HttpServletRequest request = ServletActionContext.getRequest();
        String reportId = request.getParameter("report");
        String delta = request.getParameter("delta");
        String rootPath = ServletActionContext.getServletContext().getRealPath("/");
        new File(rootPath + JASPER_TEMPLATE_FILE_DIR).mkdirs();
        String sourceJrxmlFile = JASPER_TEMPLATE_FILE_DIR + File.separator + reportId + ".jrxml";
        String targetJasperFilePath = JASPER_TEMPLATE_FILE_DIR + File.separator + reportId + ".jasper";
        File targetJasperFile = new File(rootPath + targetJasperFilePath);
        if (!targetJasperFile.exists()
                || (StringUtils.isNotBlank(delta) && targetJasperFile.lastModified() < Long.valueOf(delta))) {
            Resource resource = new ClassPathResource(sourceJrxmlFile);
            try {
                File targetJrxmlFile = new File(rootPath + JASPER_TEMPLATE_FILE_DIR + File.separator + reportId
                        + ".jrxml");
                if (!targetJrxmlFile.exists()) {
                    targetJrxmlFile.createNewFile();
                }
                if (!targetJasperFile.exists()) {
                    targetJasperFile.createNewFile();
                }
                FileCopyUtils.copy(FileCopyUtils.copyToByteArray(resource.getInputStream()), targetJrxmlFile);
                JasperCompileManager.compileReportToFile(targetJrxmlFile.getAbsolutePath(),
                        targetJasperFile.getAbsolutePath());
                logger.info("Jasper file path: {}", targetJasperFile.getAbsolutePath());
            } catch (Exception e) {
                logger.error(e.getMessage(), e);
                throw new WebException(e.getMessage(), e);
            }
        }
        return targetJasperFilePath;
    }

    private static Map<String, String> jasperOutputFormatMap;

    public Map<String, String> getJasperOutputFormatMap() {
        if (jasperOutputFormatMap == null) {
            jasperOutputFormatMap = new LinkedHashMap<String, String>();
            jasperOutputFormatMap.put(JasperReportConstants.FORMAT_PDF, "Adobe PDF");
            jasperOutputFormatMap.put(JasperReportConstants.FORMAT_XLS, "Excel");
            jasperOutputFormatMap.put(JasperReportConstants.FORMAT_HTML, "HTML");
        }
        return jasperOutputFormatMap;
    }

    public String getFormat() {
        HttpServletRequest request = ServletActionContext.getRequest();
        String format = request.getParameter("format");
        if (StringUtils.isBlank(format) || !getJasperOutputFormatMap().containsKey(format)) {
            format = JasperReportConstants.FORMAT_PDF;
        }
        return format;
    }

    public String getContentDisposition() {
        HttpServletRequest request = ServletActionContext.getRequest();
        String contentDisposition = request.getParameter("contentDisposition");
        if (StringUtils.isBlank(contentDisposition)) {
            contentDisposition = "inline";
        }
        return contentDisposition;
    }

    public String getDocumentName() {
        try {
            HttpServletRequest request = ServletActionContext.getRequest();
            String reportName = request.getParameter("report");
            return new String(reportName.getBytes("GBK"), "ISO-8859-1");
        } catch (UnsupportedEncodingException e) {
            logger.warn("Chinese file name encoding error", e);
            return "export-data";
        }
    }

    /** JasperReport输入参数Map */
    private Map<String, String> reportParameters = Maps.newHashMap();

    public Map<String, String> getReportParameters() {
        return reportParameters;
    }

    public void setReportParameters(Map<String, String> reportParameters) {
        this.reportParameters = reportParameters;
    }

    public Map<String, Object> getJasperReportParameters() {
        HttpServletRequest request = ServletActionContext.getRequest();
        Map<String, Object> jasperReportParameters = Maps.newHashMap();
        for (Map.Entry<String, String> val : reportParameters.entrySet()) {
            if (val.getValue() == null) {
                continue;
            }
            if (val.getValue() instanceof String && StringUtils.isBlank(String.valueOf(val.getValue()))) {
                continue;
            }
            jasperReportParameters.put(val.getKey(), val.getValue());
        }
        String reportId = request.getParameter("report");
        jasperReportParameters.put("_RPT_ID", reportId);
        jasperReportParameters.put("_RPT_FORMAT", this.getFormat());
        String url = request.getRequestURL().toString();
        logger.debug("Report URL: " + url);
        jasperReportParameters.put("_RPT_URL", url);
        return jasperReportParameters;
    }

    public void prepareShow() {
        String report = this.getRequiredParameter("report");
        ReportDef reportDef = reportDefService.findByCode(report);
        setModel(reportDef);
    }

    @MetaData(title = "报表显示")
    public HttpHeaders show() {
        return buildDefaultHttpHeaders("show");
    }

}
