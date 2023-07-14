import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useNavigate,redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const token=useSelector((state)=>state.auth.token)
  
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    redirect("/auth/login");
    }
  }, [token, navigate]);
  return <div>Dashboard</div>;
};

export default Dashboard;
