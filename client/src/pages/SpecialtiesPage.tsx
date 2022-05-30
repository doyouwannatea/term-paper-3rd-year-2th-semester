import { Stack } from '@mui/material';
import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import SpecialtyCard from '../components/SpecialtyCard';
import ApplySpecialtyDialog from '../containers/ApplySpecialtyDialog';

const SpecialtiesPage = () => {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <PageLayout>
      <ApplySpecialtyDialog open={open} onClose={closeDialog} />
      <Stack gap={1}>
        <SpecialtyCard onClick={openDialog} />
        <SpecialtyCard onClick={openDialog} />
        <SpecialtyCard onClick={openDialog} />
        <SpecialtyCard onClick={openDialog} />
        <SpecialtyCard onClick={openDialog} />
      </Stack>
    </PageLayout>
  );
};

export default SpecialtiesPage;
