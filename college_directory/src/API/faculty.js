import api from "./Api";
import { FACULTY_API } from "./ApiConstants";


export const getFacultyProfile = async (params) => {
  try {
    const result = await api.get(FACULTY_API.GET_FACULTY_PROFILE);
    return result.data;
  } catch (err) {
    return err.response;
  }
};

export const updateFacultyProfile = async (params) => {
  try {
    const result = await api.put(FACULTY_API.UPDATE_FACULTY_PROFILE, {
      ...params,
    });
    return result.data;
  } catch (err) {
    return err.response;
  }
};

export const getStudentList = async ( ) => {
  try {
    const result = await api.get(FACULTY_API.GET_STUDENT_LIST);
    return result.data;
  } catch (err) {
    return err.response;
  }
};

export const assignAttendance = async (params) => {
  try {
    const result = await api.post(FACULTY_API.ASSIGN_ATTENDANCE, params);
    return result;
  } catch (err) {
    return err;
  }
};

export const assignGrade = async (params) => {
  try {
    const result = await api.post(FACULTY_API.ASSIGN_GRADE, params);
    return result;
  } catch (err) {
    return err;
  }
};

export const getCourseList = async ( ) => {
  try {
    const result = await api.get(FACULTY_API.GET_COURSE_LIST);
    return result.data;
  } catch (err) {
    return err.response;
  }
};

export const getAttendanceAndGrades = async (params) => {
  try{
    const result = await api.get(`${FACULTY_API.GET_ATTENDANCE_GRADE}/${params}`);
    return result;
  }catch (err){
    return err;
  }
}
