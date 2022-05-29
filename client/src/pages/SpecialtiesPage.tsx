import { Container, Stack } from '@mui/material';
import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import SpecialtyCard from '../components/SpecialtyCard';
import ApplySpecialtyDialog from '../containers/ApplySpecialtyDialog';

const SpecialtiesPage = () => {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <Container maxWidth="md">
      <ApplySpecialtyDialog open={open} onClose={closeDialog} />
      <AppHeader />
      <Stack gap={1}>
        <SpecialtyCard onClick={openDialog} />
        <SpecialtyCard onClick={openDialog} />
        <SpecialtyCard onClick={openDialog} />
        <SpecialtyCard onClick={openDialog} />
        <SpecialtyCard onClick={openDialog} />
      </Stack>
    </Container>
  );
};

export default SpecialtiesPage;
