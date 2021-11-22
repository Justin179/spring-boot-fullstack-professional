package com.example.demo.student;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
//        List<Student> students = Arrays.asList(
//                new Student(
//                        1L,
//                        "Jamila",
//                        "jamila@amigoscode.edu",
//                        Gender.FEMALE),
//                new Student(
//                        2L,
//                        "Alex",
//                        "alex@amigoscode.edu",
//                        Gender.MALE)
//        );
        return studentService.getAllStudents();
    }

    @PostMapping
    public void addStudent(@RequestBody Student student){
        studentService.addStudent(student);
    }

}
