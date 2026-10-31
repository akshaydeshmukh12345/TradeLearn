package com.tradelearn.backend;

import jakarta.persistence.*;

@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String duration;
    private int position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private CourseModule module;

    public Lesson() {
    }

    public Lesson(String title, String duration, int position) {
        this.title = title;
        this.duration = duration;
        this.position = position;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDuration() {
        return duration;
    }

    public int getPosition() {
        return position;
    }

    public CourseModule getModule() {
        return module;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public void setModule(CourseModule module) {
        this.module = module;
    }
}