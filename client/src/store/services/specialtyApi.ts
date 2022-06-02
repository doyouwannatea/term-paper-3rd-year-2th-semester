import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Priority } from '../../models/Priority';
import { Specialty, StudentSpecialty } from '../../models/Specialty';
import { StudentData } from '../../models/StudentData';

type AuthRequest = {
  password: string;
  email: string;
};

type SendSpecialtyApplicationRequest = {
  application_priority: Priority;
  specialty_code: string;
};

type DeleteSpecialtyApplicationRequest = {
  specialty_code: string;
};

export const specialtyApi = createApi({
  reducerPath: 'specialtyApi',
  tagTypes: ['getStudentSpecialties'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    auth: builder.mutation<StudentData, Partial<AuthRequest>>({
      query: (userData) => ({
        url: 'auth',
        body: userData,
        method: 'POST',
      }),
      invalidatesTags: ['getStudentSpecialties'],
    }),
    register: builder.mutation<
      { status: string },
      Required<AuthRequest>
    >({
      query: (userData) => ({
        url: 'register',
        body: userData,
        method: 'POST',
      }),
    }),
    sendSpecialtyApplication: builder.mutation<
      { status: string },
      SendSpecialtyApplicationRequest
    >({
      query: (data) => ({
        url: 'specialties',
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['getStudentSpecialties'],
    }),
    getSpecialties: builder.query<Specialty[], void>({
      query: () => 'specialties',
    }),
    getStudentSpecialties: builder.query<StudentSpecialty[], void>({
      query: () => 'student/specialties',
      providesTags: ['getStudentSpecialties'],
    }),
    deleteSpecialtyApplication: builder.mutation<
      { status: string },
      DeleteSpecialtyApplicationRequest
    >({
      query: (data) => ({
        url: 'specialties',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['getStudentSpecialties'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSpecialtiesQuery,
  useAuthMutation,
  useSendSpecialtyApplicationMutation,
  useGetStudentSpecialtiesQuery,
  useDeleteSpecialtyApplicationMutation,
  useRegisterMutation,
} = specialtyApi;
