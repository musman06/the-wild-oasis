import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "@/features/authentication/useUser";
import Spinner from "../Spinner/Spinner";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. get the current user
  const { isLoading, user } = useUser();
  const isAuthenticated = user?.role === "authenticated";

  //   console.log(isAuthenticated);

  // 3. navigate to login page if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 2. show the loader while data is being fetched
  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "var(--color-grey-50)",
        }}
      >
        <Spinner />
      </div>
    );
  }

  // 4. if user is authenticated, render the app

  if (isAuthenticated) return <>{children}</>;
};

export default ProtectedRoute;
