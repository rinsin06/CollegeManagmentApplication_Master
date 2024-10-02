import api from "./Api";
import { STUDENT_APIS, SEARCH_API } from "./ApiConstants";

export const getStudentProfile = async (params) => {
  try {
    const result = await api.get(STUDENT_APIS.GET_STUDENT_PROFILE);
    return result.data;
  } catch (err) {
    return err.response;
  }
};

export const getStudentFaculty = async () => {
  try {
    const result = await api.get(STUDENT_APIS.GET_STUDENT_FACULTY);
    return result?.data;
  } catch (err) {
    return err?.response;
  }
};

export const getStudentSearch = async (params) => {
  try {
    const { name, year, departmentId } = params;
    let queryString = '';
    if (name) queryString += `name=${name}`;
    if (year) queryString += `${queryString ? '&' : ''}year=${year}`;
    if (departmentId) queryString += `${queryString ? '&' : ''}departmentId=${departmentId}`;

    const result = await api.get(`${SEARCH_API.STUDENT_SEARCH}?${queryString}`);
    return result;
  } catch (err) {
    return err?.response;
  }
};

export const updateStudentProfile = async (params) => {
  try {
    const result = await api.put(STUDENT_APIS.UPDATE_PROFILE, {
      ...params,
    });
    return result?.data;
  } catch (err) {
    return err?.response;
  }
};


export const getStudentGrades = async (params) => {
  try {
    const result = await api.get(`${STUDENT_APIS.GET_GRADES}/${params}`);
    return result.data;
  } catch (err) {
    return err?.response;
  }
};

export const getStudentAttendance = async (params) => {
  try {
    const result = await api.get(`${STUDENT_APIS.GET_ATTENDANCE}/${params}`);
    return result?.data;
  } catch (err) {
    return err?.response;
  }
};

export const getDepartments = async (file) => {
  try {
    const { data } = await api.get(STUDENT_APIS.GET_DEPARTMENTS);
    return data;
  } catch(err) {
    return err;
  }
}
