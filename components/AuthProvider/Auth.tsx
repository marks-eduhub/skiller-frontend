import React, { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./AuthContext";
import Loader from "../Student/loader";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const { user, isLoading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push("/auth");
      }
    }, [user, isLoading, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      );
    }

    if (!user) {
      return null; 
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuth;
};

export default withAuth;
