package com.example.todo.rest;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/todos")
public class TodoController {

    private int lastId = 0;

    private List<Todo> todos = new ArrayList<>();

    public TodoController() {
        todos.add(new Todo(++lastId, "牛乳を買って帰る"));
        todos.add(new Todo(++lastId, "銀行にお金を下ろしに行く"));
        todos.add(new Todo(++lastId, "粗大ゴミを出す"));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_todo:view')")
    public List<Todo> getAll() {
        return todos;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_todo:edit')")
    public ResponseEntity<Todo> add(@RequestBody Todo todo) {
        ++lastId;
        todo.setId(lastId);
        todos.add(todo);
        URI resourceURI = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(lastId)
            .toUri();
        return ResponseEntity.created(resourceURI).body(todo);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_todo:edit')")
    public ResponseEntity<Todo> remove(@PathVariable int id) {
        if (todos.removeIf(todo -> todo.getId() == id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
