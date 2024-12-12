package com.letslive.letslearnbackend.services;

import com.letslive.letslearnbackend.dto.CourseDTO;
import com.letslive.letslearnbackend.entities.Course;
import com.letslive.letslearnbackend.entities.User;
import com.letslive.letslearnbackend.exception.CustomException;
import com.letslive.letslearnbackend.mappers.CourseMapper;
import com.letslive.letslearnbackend.repositories.CourseRepository;
import com.letslive.letslearnbackend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public List<CourseDTO> getAllCoursesByUserID(UUID userID) {
        userRepository
                .findById(userID)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));

        return courseRepository.findByCreatorId(userID).stream().map((c) -> CourseMapper.mapToDTO(c)).toList();
    }

    public CourseDTO getCourse(UUID id) {
        Course course = courseRepository
                .findById(id)
                .orElseThrow(() -> new CustomException("Course not found", HttpStatus.NOT_FOUND));

        return CourseMapper.mapToDTO(course);
    }

    public CourseDTO createCourse(User creator, CourseDTO courseDTO) {
        Course course = CourseMapper.mapToEntity(courseDTO);
        course.setCreator(creator);

        Course createdCourse = courseRepository.save(course);
        return CourseMapper.mapToDTO(createdCourse);
    }

    public CourseDTO updateCourse(UUID id, CourseDTO courseDTO) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new CustomException("Course not found", HttpStatus.NOT_FOUND));

        course.setTitle(courseDTO.getTitle());
        course.setDescription(courseDTO.getDescription());
        course.setImageUrl(courseDTO.getImageUrl());
        course.setCategory(courseDTO.getCategory());
        course.setLevel(courseDTO.getLevel());
        course.setIsPublished(courseDTO.getIsPublished());

        Course updatedCourse = courseRepository.save(course);
        return CourseMapper.mapToDTO(updatedCourse);
    }

    public void addUserToCourse(UUID id, UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));
        Course course = courseRepository.findById(id).orElseThrow(() -> new CustomException("Course not found", HttpStatus.NOT_FOUND));

        if (course.getStudents().stream().anyMatch((student) -> student.getId().equals(userId))) {
            throw new CustomException("User already has this course", HttpStatus.CONFLICT);
        };

        course.getStudents().add(user);
        courseRepository.save(course);
    }
}
