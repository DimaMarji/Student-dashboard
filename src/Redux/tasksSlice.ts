import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {addStudent, deleteStudent, fetchStudents, editStudent, IStudent} from '../api/fakeApi';


interface IStudentsState {
  students: IStudent[];
}

const initialState: IStudentsState = {
  students: [],
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudentAction: (state, action: PayloadAction<IStudent>) => {
      state.students.push(action.payload);
    },
    deleteStudentAction: (state, action: PayloadAction<number | string | undefined>) => {
      const studentId = action.payload;
      state.students = state.students.filter(student => student.id !== studentId);
    },
    updateStudentAction: (state, action: PayloadAction<IStudent>) => {
      const updatedStudent = action.payload;
      const studentIndex = state.students.findIndex(student => student.id === updatedStudent.id);
      if (studentIndex !== -1) {
        state.students[studentIndex] = updatedStudent;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          [
            fetchStudents.pending.type,
            addStudent.pending.type,
            deleteStudent.pending.type,
            editStudent.pending.type,
          ].includes(action.type),
        (state:any) => {
          state.status = 'isLoading';
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          [
            fetchStudents.fulfilled.type,
          ].includes(action.type),
        (state:any, action:any) => {
          state.status = 'succeeded';
          state.students = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          [
            fetchStudents.rejected.type,
            addStudent.rejected.type,
            deleteStudent.rejected.type,
            editStudent.rejected.type,
          ].includes(action.type),
        (state:any, action:any) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  }
});

export const { addStudentAction,deleteStudentAction,updateStudentAction  } = studentsSlice.actions;
export default studentsSlice.reducer;