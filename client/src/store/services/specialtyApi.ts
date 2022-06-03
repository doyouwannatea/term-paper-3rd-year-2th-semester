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

type Status = {
  status: string;
};

export const specialtyApi = createApi({
  reducerPath: 'specialtyApi',
  tagTypes: ['getStudentSpecialties'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    // <QUERIES>
    // get specialties
    getSpecialties: builder.query<Specialty[], void>({
      query: () => 'specialties',
    }),

    // get student specialties
    getStudentSpecialties: builder.query<StudentSpecialty[], void>({
      query: () => 'student/specialties',
      providesTags: ['getStudentSpecialties'],
    }),
    // </QUERIES>

    // <MUTATIONS>
    // auth
    auth: builder.mutation<StudentData, Partial<AuthRequest>>({
      query: (body) => ({
        url: 'auth',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['getStudentSpecialties'],
    }),

    // logout
    logout: builder.mutation<Status, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),

    // register
    register: builder.mutation<Status, Required<AuthRequest>>({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
    }),

    // send specialty application
    sendSpecialtyApplication: builder.mutation<
      Status,
      SendSpecialtyApplicationRequest
    >({
      query: (body) => ({
        url: 'specialties',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['getStudentSpecialties'],
    }),

    // delete specialty application
    deleteSpecialtyApplication: builder.mutation<
      Status,
      DeleteSpecialtyApplicationRequest
    >({
      query: (body) => ({
        url: 'specialties',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['getStudentSpecialties'],
    }),
    // </MUTATIONS>
  }),
});

export const {
  useGetSpecialtiesQuery,
  useAuthMutation,
  useSendSpecialtyApplicationMutation,
  useGetStudentSpecialtiesQuery,
  useDeleteSpecialtyApplicationMutation,
  useRegisterMutation,
  useLogoutMutation,
} = specialtyApi;
