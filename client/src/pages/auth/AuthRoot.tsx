import React from 'react';
import AuthMain from '../../features/auth/main/AuthMain';

interface AuthRootProps { }

const AuthRoot: React.FC<AuthRootProps> = ({}) => {
  return (
    <div>
      <AuthMain />
    </div>
  );
};

export default AuthRoot;