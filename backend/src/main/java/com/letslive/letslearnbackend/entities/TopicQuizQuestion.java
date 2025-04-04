package com.letslive.letslearnbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class TopicQuizQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonProperty("id")
    private UUID id;

    @Column(name = "topic_quiz_id")
    @JsonProperty("topicQuizId")
    private UUID topicQuizId;

    @JsonProperty("questionName")
    private String questionName;

    @JsonProperty("questionText")
    private String questionText;

    @JsonProperty("status")
    private String status;

    @JsonProperty("type")
    private String type;

    @JsonProperty("defaultMark")
    private Double defaultMark;

    @JsonProperty("feedbackOfTrue")
    private String feedbackOfTrue;

    @JsonProperty("feedbackOfFalse")
    private String feedbackOfFalse;

    @JsonProperty("correctAnswer")
    private boolean correctAnswer; // for true false question

    @JsonProperty("multiple")
    private boolean multiple; // for multiple choices questions

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "quiz_question_id", referencedColumnName = "id" )
    @JsonProperty("choices")
    private List<TopicQuizQuestionChoice> choices; // for choices and short answer question
}