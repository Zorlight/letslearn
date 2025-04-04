package com.letslive.letslearnbackend.mappers;

import com.letslive.letslearnbackend.dto.SectionDTO;
import com.letslive.letslearnbackend.entities.Section;

import java.util.ArrayList;

public class SectionMapper {
    public static Section mapToEntity(SectionDTO sectionDTO) {
        Section.SectionBuilder builder = Section
                .builder()
                .id(sectionDTO.getId())
                .title(sectionDTO.getTitle())
                .description(sectionDTO.getDescription())
                .courseId(sectionDTO.getCourseId())
                .position(sectionDTO.getPosition());

        if (sectionDTO.getTopics() != null) {
            builder.topics(sectionDTO.getTopics().stream().map(topicDTO -> TopicMapper.toEntity(topicDTO)).toList());
        } else builder.topics(new ArrayList<>());

        return builder.build();
    }

    public static SectionDTO mapToDTO(Section section) {
        SectionDTO.SectionDTOBuilder builder = SectionDTO
                .builder()
                .id(section.getId())
                .title(section.getTitle())
                .description(section.getDescription())
                .courseId(section.getCourseId())
                .position(section.getPosition());

        if (section.getTopics() != null) {
            builder.topics(section.getTopics().stream().map(topicEntity -> TopicMapper.toDTO(topicEntity)).toList());
        } else builder.topics(new ArrayList<>());

        return builder.build();
    }
}
