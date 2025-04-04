package com.letslive.letslearnbackend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.letslive.letslearnbackend.dto.*;
import com.letslive.letslearnbackend.entities.*;
import com.letslive.letslearnbackend.exception.CustomException;
import com.letslive.letslearnbackend.mappers.*;
import com.letslive.letslearnbackend.repositories.*;
import com.letslive.letslearnbackend.utils.TimeUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final QuizResponseRepository quizResponseRepository;
    private final AssignmentResponseRepository assignmentResponseRepository;
    private final TopicQuizRepository topicQuizRepository;
    private final ObjectMapper mapper = new ObjectMapper();
    private final TopicAssigmentRepository topicAssigmentRepository;
    private final TopicMeetingRepository topicMeetingRepository;
    private final TopicRepository topicRepository;
    private final EnrollmentDetailRepository enrollmentDetailRepository;
    private final CourseRepository courseRepository;

    public UserDTO findUserById(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));
        return UserMapper.mapToDTO(user);
    }

    public List<QuizResponseDTO> getAllQuizResponsesOfUser(UUID userId) {
        if (!userRepository.existsById(userId)) throw new CustomException("User not found", HttpStatus.NOT_FOUND);
        return quizResponseRepository.findAllByStudentId(userId).stream().map(QuizResponseMapper::toDto).toList();
    }

    public List<AssignmentResponseDTO> getAllAssignmentResponsesOfUser(UUID userId) {
        if (!userRepository.existsById(userId)) throw new CustomException("User not found", HttpStatus.NOT_FOUND);
        return assignmentResponseRepository.findAllByStudentId(userId).stream().map(AssignmentResponseMapper::toDTO).toList();
    }

    public List<TopicDTO> getAllWorksOfUser(UUID userId, String type, LocalDateTime start, LocalDateTime end) {
        if (start != null && end != null && start.isAfter(end)) throw new CustomException("Start time must be after end time", HttpStatus.BAD_REQUEST);
        if (start == null) start = TimeUtils.MIN;
        if (end == null) end = TimeUtils.MAX;

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));
        List<TopicDTO> result = new ArrayList<>();

        List<Course> courses = null;

        if (user.getRole().equals("TEACHER")) {
            courses = courseRepository.findByCreatorId(user.getId());
        } else {
            courses = user.getEnrollmentDetails().stream().map(EnrollmentDetail::getCourse).toList();
        }

        // this should not happen, use enum for UserRole
        if (courses == null) throw new CustomException("User role or something has failed!", HttpStatus.INTERNAL_SERVER_ERROR);

        LocalDateTime finalEnd = end;
        LocalDateTime finalStart = start;
        courses.forEach(course -> {
            course.getSections().forEach(courseSection -> {
                courseSection.getTopics().forEach(topic -> {
                    if (type == null || type.isEmpty() || type.equals(topic.getType())) {
                        switch (topic.getType()) {
                            case "quiz":
                                if (type == null || type.equals("quiz")) {
                                    topicQuizRepository.findByTopicId(topic.getId()).ifPresent(topicQuiz -> {
                                        LocalDateTime openTime = topicQuiz.getOpen() != null ? TimeUtils.convertStringToLocalDateTime(topicQuiz.getOpen()) : null;
                                        LocalDateTime closeTime = topicQuiz.getClose() != null ? TimeUtils.convertStringToLocalDateTime(topicQuiz.getClose()) : null;

                                        if ((openTime == null && closeTime == null) ||
                                                (closeTime == null && openTime.isAfter(finalEnd)) ||
                                                (openTime == null && closeTime.isBefore(finalStart)) ||
                                                (closeTime != null && closeTime.isBefore(finalStart)) ||
                                                (openTime != null && openTime.isAfter(finalEnd))) {
                                            return;
                                        }

                                        try {
                                            String data = mapper.writeValueAsString(topicQuiz);
                                            TopicDTO topicDTO = TopicMapper.toDTO(topic);

                                            List<QuizResponse> res = quizResponseRepository.findByTopicIdAndStudentId(topicQuiz.getTopicId(), userId);
                                            String resData = mapper.writeValueAsString(res);
                                            topicDTO.setResponse(resData);

                                            topicDTO.setData(data);
                                            topicDTO.setCourse(CourseMapper.mapToDTO(course));
                                            result.add(topicDTO);
                                        } catch (JsonProcessingException e) {
                                            throw new CustomException("Something went wrong!", HttpStatus.INTERNAL_SERVER_ERROR);
                                        }
                                    });
                                }
                                break;
                            case "assignment":
                                if (type == null || type.equals("assignment")) {
                                    topicAssigmentRepository.findByTopicId(topic.getId()).ifPresent(topicAssignment -> {
                                        LocalDateTime openTime = topicAssignment.getOpen() != null ? TimeUtils.convertStringToLocalDateTime(topicAssignment.getOpen()) : null;
                                        LocalDateTime closeTime = topicAssignment.getClose() != null ? TimeUtils.convertStringToLocalDateTime(topicAssignment.getClose()) : null;

                                        if ((openTime == null && closeTime == null) ||
                                                (closeTime == null && openTime.isAfter(finalEnd)) ||
                                                (openTime == null && closeTime.isBefore(finalStart)) ||
                                                (closeTime != null && closeTime.isBefore(finalStart)) ||
                                                (openTime != null && openTime.isAfter(finalEnd))) {
                                            return;
                                        }

                                        try {
                                            String data = mapper.writeValueAsString(topicAssignment);
                                            TopicDTO topicDTO = TopicMapper.toDTO(topic);

                                            Optional<AssignmentResponse> res = assignmentResponseRepository.findByTopicIdAndStudentId(topicAssignment.getTopicId(), userId);
                                            if (res.isPresent()) {
                                                String resData = mapper.writeValueAsString(res.get());
                                                topicDTO.setResponse(resData);
                                            }

                                            topicDTO.setData(data);
                                            topicDTO.setCourse(CourseMapper.mapToDTO(course));
                                            result.add(topicDTO);
                                        } catch (JsonProcessingException e) {
                                            throw new CustomException("Something went wrong!", HttpStatus.INTERNAL_SERVER_ERROR);
                                        }
                                    });
                                }
                                break;
                            case "meeting":
                                if (type == null || type.equals("meeting")) {
                                    topicMeetingRepository.findByTopicId(topic.getId()).ifPresent(topicMeeting -> {
                                        LocalDateTime openTime = topicMeeting.getOpen() != null ? TimeUtils.convertStringToLocalDateTime(topicMeeting.getOpen()) : null;

                                        if (openTime == null || openTime.isBefore(finalStart) || openTime.isAfter(finalEnd)) return;

                                        try {
                                            String data = mapper.writeValueAsString(topicMeeting);
                                            TopicDTO topicDTO = TopicMapper.toDTO(topic);
                                            topicDTO.setData(data);
                                            topicDTO.setCourse(CourseMapper.mapToDTO(course));
                                            result.add(topicDTO);
                                        } catch (JsonProcessingException e) {
                                            throw new CustomException("Something went wrong!", HttpStatus.INTERNAL_SERVER_ERROR);
                                        }
                                    });
                                }
                                break;
                            default:
                        }
                    }
                });
            });
        });

        return result;
    }

    public UserDTO updateUserById(UpdateUserDTO body, UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));
        user.setUsername(body.getUsername());
        user.setAvatar(body.getAvatar());
        userRepository.save(user);
        return UserMapper.mapToDTO(user);
    }

    public StudentReportDTO getStudentReport(UUID userId, UUID courseId, LocalDateTime start, LocalDateTime end) {
//        List<Course> courses = enrollmentDetailRepository.findByStudentIdAndJoinDateLessThanEqual(userId, end).stream().map(EnrollmentDetail::getCourse).toList();
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new CustomException("Course not found", HttpStatus.NOT_FOUND));

        List<Topic> topics = topicRepository.findAllBySectionIdIn(course.getSections().stream().map(Section::getId).toList());
        if (start == null) start = TimeUtils.MIN;
        if (end == null) end = TimeUtils.MAX;

        List<TopicQuiz> topicQuizzes = topicQuizRepository.findByTopicsAndOpenClose(topics.stream().filter(t -> t.getType().equals("quiz")).map(Topic::getId).toList(), start.toString(), end.toString());
        List<QuizResponse> quizResponses = quizResponseRepository.findByTopicIdInAndStudentId(topicQuizzes.stream().map(TopicQuiz::getTopicId).toList(), userId);
        List<TopicAssignment> topicAssignments = topicAssigmentRepository.findByTopicsAndOpenClose(topics.stream().filter(t -> t.getType().equals("assignment")).map(Topic::getId).toList(), start.toString(), end.toString());
        List<AssignmentResponse> assignmentResponses = assignmentResponseRepository.findByTopicIdInAndStudentId(topicAssignments.stream().map(TopicAssignment::getTopicId).toList(), userId);

        Map<UUID, Double> quizTopicIdWithMarkBase10 = calculateTopicQuizMarkBase10(quizResponses, topicQuizzes.stream().collect(Collectors.toMap(TopicQuiz::getTopicId, TopicQuiz::getGradingMethod)));
        Map<UUID, Double> assignmentTopicIdWithMark = calculateTopicAssignmentMark(assignmentResponses);

        StudentReportDTO report = new StudentReportDTO();

        report.setTotalQuizCount(topicQuizzes.size());
        report.setTotalAssignmentCount(topicAssignments.size());
        report.setQuizToDoCount(topicQuizzes.size() - quizResponses.stream().map(QuizResponse::getTopicId).distinct().count());
        report.setAssignmentToDoCount(topicAssignments.size() - assignmentResponses.stream().map(AssignmentResponse::getTopicId).distinct().count());
        report.setAvgQuizMark(quizTopicIdWithMarkBase10.values().stream().mapToDouble(Double::doubleValue).average().orElse(0.0));
        report.setAvgAssignmentMark(assignmentResponses.stream().filter(res -> res.getMark() != null).mapToDouble(AssignmentResponse::getMark).average().orElse(0.0));

        report.setTopTopicQuiz(quizTopicIdWithMarkBase10.keySet().stream().map(tId -> {
            QuizResponse latestResponse = quizResponses.stream().filter(q -> q.getTopicId().equals(tId)).max(Comparator.comparing(QuizResponse::getCompletedAt)).orElse(null);
            return new StudentReportDTO.TopicInfo(
                TopicMapper.toDTO(topics.stream().filter(t -> t.getId().equals(tId)).findFirst().orElseThrow(() -> new CustomException("Please god dont bug", HttpStatus.INTERNAL_SERVER_ERROR))),
                latestResponse != null ? latestResponse.getId() : null,
                quizTopicIdWithMarkBase10.get(tId),
                latestResponse != null ? latestResponse.getCompletedAt() : null
            );}
        ).toList());

        report.setTopTopicAssignment(assignmentResponses.stream().map(a -> {
            AssignmentResponse resp = assignmentResponses.stream().filter(res -> res.getTopicId().equals(a.getTopicId())).findFirst().orElseThrow(() -> new CustomException("Please god dont bug part 2", HttpStatus.INTERNAL_SERVER_ERROR));
                return new StudentReportDTO.TopicInfo(
                        TopicMapper.toDTO(topics.stream().filter(t -> t.getId().equals(a.getTopicId())).findFirst().orElseThrow(() -> new CustomException("Please god dont bug", HttpStatus.INTERNAL_SERVER_ERROR))),
                        resp.getId(),
                        assignmentTopicIdWithMark.get(a.getTopicId()),
                        resp.getSubmittedAt()
                );
            }
        ).toList());

        return report;
    }

    private Map<UUID, Double> calculateTopicQuizMarkBase10(List<QuizResponse> quizResponses, Map<UUID, String> topicIdAndGradingMethod) {
        // First group responses by topic ID with their marks
        return quizResponses.stream()
                .flatMap(responseDTO -> responseDTO.getAnswers().stream().map(answer -> {
                    try {
                        Question question = mapper.readValue(answer.getQuestion(), Question.class);
                        double normalizedMark = (answer.getMark() / question.getDefaultMark()) * 10; // Normalize to base 10
                        return new AbstractMap.SimpleEntry<>(responseDTO.getTopicId(), normalizedMark);
                    } catch (JsonProcessingException e) {
                        throw new CustomException("Error parsing question data: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }))
                .collect(Collectors.groupingBy(
                        Map.Entry::getKey, // group by topic id
                        Collectors.mapping(
                                Map.Entry::getValue, // Extract the marks
                                Collectors.toList() // Collect marks into a list
                        )
                ))
                .entrySet()
                .stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey, // Keep the topic id as the key
                        entry -> calculateMark(entry.getValue(), topicIdAndGradingMethod.get(entry.getKey())) // Calculate the grade based on the method
                ));
    }

    private Map<UUID, Double> calculateTopicAssignmentMark(List<AssignmentResponse> assignmentResponses) {
        return assignmentResponses.stream()
                .filter(res -> res.getMark() != null)
                .collect(Collectors.toMap(
                    AssignmentResponse::getTopicId,
                    AssignmentResponse::getMark
        ));
    }

    // Your existing calculateMark method
    private double calculateMark(List<Double> marks, String method) {
        return switch (method) {
            case "Highest Grade" -> marks.stream().max(Double::compare).orElse(0.0);
            case "Average Grade" -> marks.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            case "First Grade" -> marks.isEmpty() ? 0.0 : marks.get(0);
            case "Last Grade" -> marks.isEmpty() ? 0.0 : marks.get(marks.size() - 1);
            default -> throw new IllegalArgumentException("Invalid method: " + method);
        };
    }
    public List<UserDTO> getAllUsers (UUID userId) {
        List<User> res = userRepository.findAll().stream().filter(u -> !u.getId().equals(userId)).toList();
        return res.stream().map(UserMapper::mapToDTO).toList();
    }
}