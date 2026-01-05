package com.example.schoolmanagementsystem.service;

import com.example.schoolmanagementsystem.model.Student;
import java.util.List;

public interface StudentService {
    List<Student> getAllStudents();
    Student saveStudent(Student student);
    Student getStudentById(Long id);
    void deleteStudentById(Long id);
}
