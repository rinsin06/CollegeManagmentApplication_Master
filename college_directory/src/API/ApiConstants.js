export const USER_APIS = {
  USER_LOGIN: "/auth/login",
  USER_SIGNUP: "/auth/signup",
};
export const SEARCH_API = {
  STUDENT_SEARCH: "/students/search",
};
export const STUDENT_APIS = {
  GET_STUDENT_PROFILE: "/students/profile",
  GET_STUDENT_FACULTY: "/students/faculty",
  UPDATE_PROFILE : "/students/profile/update",
  GET_GRADES:"/students/academic/grades",
  GET_ATTENDANCE: "/students/academic/attendance",
  GET_DEPARTMENTS: "/students/departments",
};

export const FACULTY_API ={
  GET_FACULTY_PROFILE:"/faculty/profile",
  UPDATE_FACULTY_PROFILE:"/faculty/profile",
  GET_STUDENT_LIST:"/faculty/classlist",
  ASSIGN_ATTENDANCE:"/faculty/assign-attendance",
  ASSIGN_GRADE:"/faculty/assign-grade",
  GET_COURSE_LIST:"/faculty/courselist",
  GET_ATTENDANCE_GRADE : "/faculty/attendanceAndGrade"
}
export const ADMIN_APIS = {
  GET_STUDENTS: "/admin/students",
  GET_FACULTIES: "/admin/faculty",
  GET_USERLIST: "/admin/userlist",
  GET_COURSELIST: "/admin/courselist"
};
