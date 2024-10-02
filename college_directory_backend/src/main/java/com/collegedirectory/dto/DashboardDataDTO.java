package com.collegedirectory.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDataDTO {

    private List<EnrollmentTrendDTO> enrollmentTrends;
    private List<FacultyCourseLoadDTO> facultyCourseLoad;
    private List<CourseEnrollmentDTO> courseEnrollments;
}
