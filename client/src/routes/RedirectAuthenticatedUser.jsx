import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const RedirectAuthenticatedUser = ({ children }) => {
  const { user } = useAuth();

  if (user?.token) {
    return <Navigate to='/' replace={true} />;
  }

  return children;
};

RedirectAuthenticatedUser.propTypes = {
  children: PropTypes.node
};

export default RedirectAuthenticatedUser;
