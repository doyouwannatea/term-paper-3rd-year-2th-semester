import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Specialty } from '../../models/Specialty';
import { StudentData } from '../../models/StudentData';
import { specialtyApi } from '../services/specialtyApi';

export interface SpecialtyState {
  activeSpecialty?: Specialty;
  studentData?: StudentData;
  loading: boolean;
}

const initialState: SpecialtyState = {
  studentData: undefined,
  activeSpecialty: undefined,
  loading: true,
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
      specialtyApi.endpoints.auth.matchPending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      specialtyApi.endpoints.auth.matchFulfilled,
      (state, { payload }) => {
        state.studentData = payload;
        state.loading = false;
      }
    );
    builder.addMatcher(
      specialtyApi.endpoints.auth.matchRejected,
      (state) => {
        state.loading = false;
      }
    );
  },
});

export const { setActiveSpecialty } = specialtySlice.actions;
export default specialtySlice.reducer;
