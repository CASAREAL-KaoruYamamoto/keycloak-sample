package com.example.todo.rest;

public class Todo {
    
    private Integer id;

    private String title;

    public Todo() {
        // need no argument constructor
    }

    public Todo(Integer id, String title) {
        this.id = id;
        this.title = title;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
