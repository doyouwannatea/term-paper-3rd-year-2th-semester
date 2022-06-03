import { Button } from '@mui/material';
import { To, NavLink } from 'react-router-dom';

const isActiveStyle: (props: {
  isActive: boolean;
}) => React.CSSProperties = ({ isActive }) => ({
  textDecoration: isActive ? 'underline' : 'none',
  color: 'inherit',
  padding: '6px 8px',
});

type Props = { children: React.ReactNode; to: To };

const NavButton: React.FC<Props> = ({ children, to }) => (
  <Button
    variant="text"
    sx={{
      color: (theme) => theme.palette.common.white,
      padding: 0,
    }}
    component="span"
  >
    <NavLink style={isActiveStyle} to={to}>
      {children}
    </NavLink>
  </Button>
);

export default NavButton;
