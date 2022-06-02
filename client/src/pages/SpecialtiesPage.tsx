import { Stack } from '@mui/material';
import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import SpecialtyCard from '../components/SpecialtyCard';
import ApplySpecialtyDialog from '../containers/ApplySpecialtyDialog';
import { useAppDispatch } from '../hooks/useAppRedux';
import { Specialty } from '../models/Specialty';
import { setActiveSpecialty } from '../store/features/specialtySlice';
import { useGetSpecialtiesQuery } from '../store/services/specialtyApi';

const SpecialtiesPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, isError, data } =
    useGetSpecialtiesQuery();
  const [open, setOpen] = useState(false);

  const openDialog = (specialty: Specialty) => {
    dispatch(setActiveSpecialty(specialty));
    setOpen(true);
  };
  const closeDialog = () => setOpen(false);

  return (
    <PageLayout>
      <>
        <ApplySpecialtyDialog open={open} onClose={closeDialog} />
        {isError && error}
        {isLoading && 'загрузка...'}
        {!isLoading && !isError && (
          <>
            {!data && 'специальности не найдены'}
            {data && (
              <Stack gap={1}>
                {data.map((spec) => (
                  <SpecialtyCard
                    key={spec.specialty_code}
                    specialty={spec}
                    onClick={openDialog}
                  />
                ))}
              </Stack>
            )}
          </>
        )}
      </>
    </PageLayout>
  );
};

export default SpecialtiesPage;
