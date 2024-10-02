import api from "./Api";
import { ADMIN_APIS } from "./ApiConstants";

export const getStudentsList = async () => {
  try {
    const result = await api.get(ADMIN_APIS.GET_STUDENTS);
    return result;
  } catch (err) {
    return err;
  }
};
export const getFacultyList = async () => {
  try {
    const result = await api.get(ADMIN_APIS.GET_FACULTIES);
    return result;
  } catch (err) {
    return err;
  }
};
export const enrollStudent = async (params) => {
  try {
    const result = await api.post(ADMIN_APIS.GET_STUDENTS, {
      ...params,
    });
    return result;
  } catch (err) {
    return err;
  }
};
export const updateStudent = async (params, id) => {
  try {
    const result = await api.put(`${ADMIN_APIS.GET_STUDENTS}/${id}`, {
      ...params,
    });
    return result;
  } catch (err) {
    return err;
  }
};
export const removeStudent = async (params) => {
  try {
    const result = await api.delete(`${ADMIN_APIS.GET_STUDENTS}/${params}`);
    return result;
  } catch (err) {
    return err;
  }
};
export const getUserList = async () => {
  try {
    const result = await api.get(ADMIN_APIS.GET_USERLIST);
    return result?.data;
  } catch (err) {
    return err?.response;
  }
};
export const getCourseList = async () => {
  try {
    const result = await api.get(ADMIN_APIS.GET_COURSELIST);
    return result?.data;
  } catch (err) {
    return err?.response;
  }
};
export const enrollFaculty = async (params) => {
  try {
    const result = await api.post(ADMIN_APIS.GET_FACULTIES, {
      ...params,
    });
    return result;
  } catch (err) {
    return err;
  }
};
export const updateFaculty = async (params) => {
  try {
    const result = await api.put(ADMIN_APIS.GET_FACULTIES, {
      ...params,
    });
    return result;
  } catch (err) {
    return err;
  }
};
export const removeFaculty = async (params) => {
  try {
    const result = await api.delete(`${ADMIN_APIS.GET_FACULTIES}/${params}`);
    return result;
  } catch (err) {
    return err;
  }
};
