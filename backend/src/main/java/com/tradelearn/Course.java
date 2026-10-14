
package com.tradelearn.backend;

public class Course {

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
            Long id,
            String title,
            String description,
            String category,
            String level,
            double price,
            String instructor) {
        this.id = id;
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
}
