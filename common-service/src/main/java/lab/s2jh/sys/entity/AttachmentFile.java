package lab.s2jh.sys.entity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Transient;

import lab.s2jh.core.annotation.MetaData;
import lab.s2jh.core.entity.BaseEntity;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "T_SYS_ATTACHMENT_FILE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@MetaData(title = "附件文件数据")
public class AttachmentFile extends BaseEntity<String> {

    /** 文件存储的ID，为了避免中文乱码问题，如果文件内容需要存储到文件系统，一般取fileId+fileExtension作为物理存储名称 */
    private String fileId;

    /** 附件上传文件名称 */
    private String fileRealName;

    /** 文件描述 */
    private String fileDescription;

    /** 附件扩展名 */
    private String fileExtension;

    /** 附件大小 */
    private int fileLength;

    /** 附件MIME类型 */
    private String fileType;

    /** 文件数据 */
    private byte[] fileContent;
    
    private String entityClassName;
    
    private String entityId;

    private String id;

    @Id
    @Column(length = 40)
    @GeneratedValue(generator = "hibernate-uuid")
    @GenericGenerator(name = "hibernate-uuid", strategy = "uuid")
    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    @Column(length = 128, nullable = false, unique = true)
    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    @Column(length = 500, nullable = false)
    public String getFileRealName() {
        return fileRealName;
    }

    public void setFileRealName(String fileRealName) {
        this.fileRealName = fileRealName;
    }

    @Column(nullable = false)
    public int getFileLength() {
        return fileLength;
    }

    public void setFileLength(int fileLength) {
        this.fileLength = fileLength;
    }

    @Column(length = 32, nullable = false)
    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @JsonIgnore
    public byte[] getFileContent() {
        return fileContent;
    }

    public void setFileContent(byte[] fileContent) {
        this.fileContent = fileContent;
    }

    @Column(length = 8)
    public String getFileExtension() {
        return fileExtension;
    }

    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }

    @Column(length = 200, nullable = true)
    @JsonIgnore
    public String getFileDescription() {
        return fileDescription;
    }

    public void setFileDescription(String fileDescription) {
        this.fileDescription = fileDescription;
    }

    @Override
    @Transient
    public String getDisplayLabel() {
        return fileRealName;
    }

    @Column(length = 512, nullable = true)
    public String getEntityClassName() {
        return entityClassName;
    }

    public void setEntityClassName(String entityClassName) {
        this.entityClassName = entityClassName;
    }

    @Column(length = 200, nullable = true)
    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

}
