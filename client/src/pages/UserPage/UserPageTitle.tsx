import { Typography } from '@mui/material';

type Props = { children: React.ReactNode };

const UserPageTitle: React.FC<Props> = ({ children }) => (
  <Typography
    variant="h5"
    component="h2"
    mt={4}
    mb={2}
    fontWeight="600"
  >
    {children}
  </Typography>
);

export default UserPageTitle;
