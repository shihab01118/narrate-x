import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { lookInSession } from '../common/Session';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userInSession = lookInSession('user');

    userInSession
      ? setUser(JSON.parse(userInSession))
      : setUser({ token: null });
  }, []);

  const value = { user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export default AuthProvider;
