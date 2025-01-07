import React, { ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../Context/AuthContext";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const { user, isLoading } = useAuthContext();
    const router = useRouter();

    if (isLoading) {
      return null;
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
