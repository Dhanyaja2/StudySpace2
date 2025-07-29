import { Brain, LogOut } from "lucide-react";
import React, { useContext } from "react";
import TypewriterAnimation from "./TypewriterAnimation";
import { Button } from "./ui/button";
import { StoreContext } from "./context/StoreContext";
import { useNavigate } from "react-router";

const DashboardHeader = () => {
  const userName = localStorage.getItem("user");
  const { setIsAuthenticated } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    navigate("/", {replace: true})
  };

  return (
    <div className="w-[90%] flex mx-auto items-center justify-between p-5">
      <div className="flex items-center">
        <Brain
          width={40}
          height={40}
          className="text-indigo-500 mr-2 glow-animation "
        />
        <div className="text-xl font-bold text-white">
          <TypewriterAnimation text="StudySpace" typingSpeed={100} />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p>Welcome, {userName}</p>
        <Button variant="animate" onClick={logout}>
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
