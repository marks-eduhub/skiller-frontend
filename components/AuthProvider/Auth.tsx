import React, { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../Context/AuthContext';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuth: React.FC<P > = (props) => {
    const { user, isLoading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push('/auth'); 
      }
    }, [user, isLoading, router]);

    if (isLoading || user) {
      return <WrappedComponent {...props as P} />;
    }

    return null; 
  };

  return WithAuth;
};

export default withAuth;
