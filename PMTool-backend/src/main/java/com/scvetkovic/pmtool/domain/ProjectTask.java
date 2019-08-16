package com.scvetkovic.pmtool.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
public class ProjectTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(updatable = false, unique = true)
    private String projectSequence;

    @NotBlank(message = "Please include a project task summary")
    private String summary;

    private String assignee;

    /*
    TO_DO
    IN_PROGRESS
    COMPOLETED
     */
    private String status;

    /*
    1-HIGH
    2-MEDIUM
    3-LOW
     */
    private Integer priority;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    @Column(updatable = false)
    private String projectIdentifier;

    @CreationTimestamp
    @Column(updatable = false)
    @JsonIgnore
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @JsonIgnore
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="backlog_id", nullable = false)
    @JsonIgnore
    private Backlog backlog;


}
