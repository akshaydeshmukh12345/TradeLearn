
package com.tradelearn.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
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
