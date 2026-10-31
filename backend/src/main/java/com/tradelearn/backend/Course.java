package com.tradelearn.backend;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String category;
    private String level;
    private double price;
    private String instructor;

    @OneToMany(
            mappedBy = "course",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OrderBy("position ASC")
    @JsonIgnore
    private List<CourseModule> modules = new ArrayList<>();

    public Course() {
    }

    public Course(
            String title,
            String description,
            String category,
            String level,
            double price,
            String instructor) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.level = level;
        this.price = price;
        this.instructor = instructor;
    }

    public void addModule(CourseModule module) {
        modules.add(module);
        module.setCourse(this);
    }

    public void removeModule(CourseModule module) {
        modules.remove(module);
        module.setCourse(null);
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getLevel() {
        return level;
    }

    public double getPrice() {
        return price;
    }

    public String getInstructor() {
        return instructor;
    }

    public List<CourseModule> getModules() {
        return modules;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }
}