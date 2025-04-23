import React, { ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./AuthContext";
import Loader from "../Student/loader";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const { user, isLoading } = useAuthContext();
    const router = useRouter();

    if (isLoading) {
      <div className="flex items-center justify-center h-screen">
        <Loader/>
      </div>
    }

    if (!user) {
      router.push("/auth");
      return null;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuth;
};

export default withAuth;
