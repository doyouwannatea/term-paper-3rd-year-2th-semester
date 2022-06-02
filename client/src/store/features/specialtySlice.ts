import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Specialty } from '../../models/Specialty';
import { StudentData } from '../../models/StudentData';
import { specialtyApi } from '../services/specialtyApi';

export interface SpecialtyState {
  activeSpecialty?: Specialty;
  studentData?: StudentData;
}

const initialState: SpecialtyState = {
  studentData: undefined,
  activeSpecialty: undefined,
};

export const specialtySlice = createSlice({
  name: 'specialty',
  initialState,
  reducers: {
    setActiveSpecialty: (state, action: PayloadAction<Specialty>) => {
      state.activeSpecialty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      specialtyApi.endpoints.auth.matchFulfilled,
      (state, { payload }) => {
        state.studentData = payload;
      }
    );
  },
});

export const { setActiveSpecialty } = specialtySlice.actions;
export default specialtySlice.reducer;
