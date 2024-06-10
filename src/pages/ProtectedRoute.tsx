import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenicated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenicated) {
      navigate("/");
    }
  }, [isAuthenicated, navigate]);
  return isAuthenicated ? children : null;
};

export default ProtectedRoute;
