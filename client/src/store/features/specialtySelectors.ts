import { RootState } from '../store';

export const selectStudentData = (state: RootState) =>
  state.specialty.studentData;

export const selectActiveSpecialty = (state: RootState) =>
  state.specialty.activeSpecialty;
