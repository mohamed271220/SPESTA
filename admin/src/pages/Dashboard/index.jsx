import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useNavigate,redirect } from "react-router-dom";

const Dashboard = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth.token) {
      navigate("/auth/login");
     return redirect("/auth/login");
    }
  }, [auth.token, navigate]);
  return <div>Dashboard</div>;
};

export default Dashboard;
