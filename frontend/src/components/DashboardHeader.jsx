// import { Brain, LogOut } from "lucide-react";
// import React, { useContext } from "react";
// import TypewriterAnimation from "./TypewriterAnimation";
// import { Button } from "./ui/button";
// import { StoreContext } from "./context/StoreContext";
// import { useNavigate } from "react-router";

// const DashboardHeader = () => {
//   const userName = localStorage.getItem("user");
//   const { setIsAuthenticated } = useContext(StoreContext);
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("userId");
//     setIsAuthenticated(false);
//     navigate("/", {replace: true})
//   };

//   return (
//     <div className="w-[90%] flex mx-auto items-center justify-between p-5">
//       <div className="flex items-center">
//         <Brain
//           width={40}
//           height={40}
//           className="text-indigo-500 mr-2 glow-animation "
//         />
//         <div className="text-xl font-bold text-white">
//           <TypewriterAnimation text="StudySpace" typingSpeed={100} />
//         </div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <p>Welcome, {userName}</p>
//         <Button variant="animate" onClick={logout}>
//           <LogOut />
//           Logout
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;



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
    navigate("/", { replace: true });
  };

  return (
    <header className="relative w-full">
      <div className="mx-auto flex w-[92%] items-center justify-between py-4 sm:py-5">

        {/* =====================================================
            LOGO
        ====================================================== */}

        <div className="flex items-center">

          {/* Logo glow */}
          <div
            className="
              mr-3
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-violet-500/20
              bg-violet-500/[0.07]
              shadow-[0_0_25px_rgba(124,58,237,0.12)]
            "
          >
            <Brain
              className="
                h-6
                w-6
                text-violet-400
                glow-animation
              "
            />
          </div>

          <div className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            <TypewriterAnimation
              text="StudySpace"
              typingSpeed={100}
            />
          </div>

        </div>


        {/* =====================================================
            USER AREA
        ====================================================== */}

        <div className="flex items-center gap-3 sm:gap-5">

          {/* Welcome text */}

          <div className="hidden text-right sm:block">
            <p className="text-xs text-gray-500">
              Welcome back
            </p>

            <p className="text-sm font-medium text-gray-200">
              {userName}
            </p>
          </div>


          {/* Mobile welcome */}

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/[0.08] sm:hidden">
            <span className="text-sm font-semibold text-violet-300">
              {userName?.charAt(0)?.toUpperCase()}
            </span>
          </div>


          {/* Logout */}

          <Button
            variant="glass"
            onClick={logout}
            className="
              h-9
              gap-2
              border-red-400/10
              px-3
              text-xs
              text-gray-300
              hover:border-red-400/20
              hover:bg-red-500/[0.07]
              hover:text-red-300
              sm:h-10
              sm:px-4
              sm:text-sm
            "
          >
            <LogOut className="h-4 w-4" />

            <span>Logout</span>
          </Button>

        </div>

      </div>
    </header>
  );
};

export default DashboardHeader;