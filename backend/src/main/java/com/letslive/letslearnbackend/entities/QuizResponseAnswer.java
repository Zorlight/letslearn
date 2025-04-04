package com.letslive.letslearnbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizResponseAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JoinColumn(name = "quiz_response_id", referencedColumnName = "id")
    private UUID quizResponseId;

    @Column(length = 1500)
    private String question; // hold the question data as JSON

    private String answer;

    private Double mark;
}
