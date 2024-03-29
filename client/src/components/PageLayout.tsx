import { Container } from '@mui/material';
import AppHeader from '../containers/AppHeader';

type Props = {
  children: React.ReactNode;
};

const PageLayout: React.FC<Props> = ({ children }) => (
  <Container maxWidth="md">
    <AppHeader />
    {children}
  </Container>
);

export default PageLayout;
