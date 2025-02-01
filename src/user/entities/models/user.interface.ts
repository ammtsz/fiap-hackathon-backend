export interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string;
}

export interface IStudent extends IUser {
  student: {
    gradeId: string;
    classId: string;
    yearId: string;
  };
}

export interface ITeacher extends IUser {
  teacherSubjects: {
    subjectId: string;
  }[];
  teacherGrades: {
    gradeId: string;
  }[];
}
