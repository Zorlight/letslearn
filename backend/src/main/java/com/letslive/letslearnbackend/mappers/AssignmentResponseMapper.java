package com.letslive.letslearnbackend.mappers;

import com.letslive.letslearnbackend.dto.AssignmentResponseDTO;
import com.letslive.letslearnbackend.entities.AssignmentResponse;

public class AssignmentResponseMapper {
    public static AssignmentResponseDTO toDTO(AssignmentResponse assignmentResponse) {
        AssignmentResponseDTO.AssignmentResponseDTOBuilder builder = AssignmentResponseDTO.builder();
        builder
                .id(assignmentResponse.getId())
                .topicId(assignmentResponse.getTopicId())
                .student(UserMapper.mapToDTO(assignmentResponse.getStudent()))
                .submittedAt(assignmentResponse.getSubmittedAt())
                .note(assignmentResponse.getNote())
                .mark(assignmentResponse.getMark())
                .gradedAt(assignmentResponse.getGradedAt())
                .gradedBy(UserMapper.mapToDTO(assignmentResponse.getGradedBy()))
                .cloudinaryFiles(assignmentResponse.getCloudinaryFiles());

        return builder.build();
    }

    public static AssignmentResponse toEntity(AssignmentResponseDTO assignmentResponseDTO) {
        AssignmentResponse.AssignmentResponseBuilder builder = AssignmentResponse.builder();
        builder
                .id(assignmentResponseDTO.getId())
                .topicId(assignmentResponseDTO.getTopicId())
                .student(UserMapper.mapToEntity(assignmentResponseDTO.getStudent()))
                .submittedAt(assignmentResponseDTO.getSubmittedAt())
                .note(assignmentResponseDTO.getNote())
                .mark(assignmentResponseDTO.getMark())
                .gradedAt(assignmentResponseDTO.getGradedAt())
                .cloudinaryFiles(assignmentResponseDTO.getCloudinaryFiles());

        if (assignmentResponseDTO.getGradedBy() != null) {
            builder.gradedBy(UserMapper.mapToEntity(assignmentResponseDTO.getGradedBy()));
        }

        return builder.build();
    }
}