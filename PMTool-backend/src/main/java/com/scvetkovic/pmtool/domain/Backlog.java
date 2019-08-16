package com.scvetkovic.pmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Backlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer PTSequence = 0;

    private String projectIdentifier;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="project_id", nullable = false)
    @JsonIgnore
    private Project project;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "backlog")
    private List<ProjectTask> projectTasks = new ArrayList<>();

}
