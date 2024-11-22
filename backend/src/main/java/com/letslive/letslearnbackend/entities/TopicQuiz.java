package com.letslive.letslearnbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.letslive.letslearnbackend.utils.JsonbConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TopicQuiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @Column(nullable = false, name = "topic_id")
    private UUID topicId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("open")
    private LocalDateTime open;

    @JsonProperty("close")
    private LocalDateTime close;

    @JsonProperty("timeLimit")
    private Number timeLimit;

    @JsonProperty("timeLimitUnit")
    private String timeLimitUnit;

    @JsonProperty("gradeToPass")
    private Number gradeToPass;

    @JsonProperty("gradingMethod")
    private String gradingMethod;

    @JsonProperty("attemptAllowed")
    private String attemptAllowed;

    //@JsonProperty("questions")
    //@Column(columnDefinition = "jsonb")
    //@Convert(converter = JsonbConverter.class)
    //private String questions;
}


