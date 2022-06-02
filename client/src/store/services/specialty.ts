import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Priority } from '../../models/Priority';
import { Specialty } from '../../models/Specialty';
import { StudentData } from '../../models/StudentData';

type AuthRequest = {
  password?: string;
  email?: string;
};

type SendSpecialtyApplicationRequest = {
  application_priority: Priority;
  specialty_code: string;
};

export const specialtyApi = createApi({
  reducerPath: 'specialtyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    auth: builder.mutation<StudentData, AuthRequest>({
      query: (userData) => ({
        url: 'auth',
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
    }),
    getSpecialties: builder.query<Specialty[], void>({
      query: () => 'specialties',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSpecialtiesQuery,
  useAuthMutation,
  useSendSpecialtyApplicationMutation,
} = specialtyApi;
