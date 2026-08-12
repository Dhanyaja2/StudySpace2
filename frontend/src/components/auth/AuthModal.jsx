import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Brain, Eye, EyeOff, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthModal = ({ isOpen, onClose }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const {
    setIsAuthenticated,
    setUserName,
    setUserId,
    isLoading,
    setIsLoading,
    url,
  } = useContext(StoreContext);

  const onLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("onLogin execured");

    try {
      let newUrl = `${url}/api/user/loginUser`;
      const response = await axios.post(newUrl, loginData);

      console.log("OnLogin executed:", response.data);

      if (response.data.success) {
        setToken(response.data.token);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.name);
        localStorage.setItem("userId", response.data.userId);

        navigate("/dashboard");
        onClose();

        setIsAuthenticated(true);
        setUserName(localStorage.getItem("user"));
        setUserId(localStorage.getItem("userId"));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("onRegister executed");

    try {
      let newUrl = `${url}/api/user/addUser`;
      const response = await axios.post(newUrl, registerData);

      console.log("onRegister executed: ", response.data);

      if (response.data.success) {
        setToken(response.data.token);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.name);
        localStorage.setItem("userId", response.data.userId);

        navigate("/dashboard");
        onClose();

        setIsAuthenticated(true);
        setUserName(localStorage.getItem("user"));
        setUserId(localStorage.getItem("userId"));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error, "in catch block of onregister");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-transparent text-white">
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent
          className="
            w-[calc(100%-2rem)]
            max-w-md
            overflow-hidden
            rounded-2xl
            border
            border-violet-500/20
            bg-[#0B0B12]/98
            p-0
            text-white
            shadow-[0_25px_80px_rgba(0,0,0,0.65)]
            backdrop-blur-xl
            sm:rounded-3xl
          "
        >
          {/* Ambient glow inside modal */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-600/10 blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-56 w-56 rounded-full bg-indigo-600/[0.07] blur-[90px]" />

          <div className="relative z-10 p-6 sm:p-7">

            {/* =====================================================
                HEADER
            ====================================================== */}

            <DialogHeader className="mb-6 text-left">

              <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-white">

                {/* Icon */}
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-violet-500/25
                    bg-violet-500/[0.08]
                    shadow-[0_0_20px_rgba(124,58,237,0.12)]
                  "
                >
                  <Brain className="h-5 w-5 text-violet-400" />
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    Welcome to StudySpace
                  </p>

                  <p className="mt-1 text-xs font-normal text-gray-500">
                    Continue your learning journey
                  </p>
                </div>

              </DialogTitle>

            </DialogHeader>


            {/* =====================================================
                AUTH TABS
            ====================================================== */}

            <Tabs defaultValue="login" className="w-full">

              <TabsList
                className="
                  mb-6
                  grid
                  h-11
                  w-full
                  grid-cols-2
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.035]
                  p-1
                "
              >

                <TabsTrigger
                  value="login"
                  className="
                    rounded-lg
                    text-sm
                    text-gray-500
                    transition-all
                    duration-300
                    data-[state=active]:bg-violet-500/15
                    data-[state=active]:text-violet-300
                    data-[state=active]:shadow-[0_0_15px_rgba(124,58,237,0.08)]
                  "
                >
                  Sign In
                </TabsTrigger>

                <TabsTrigger
                  value="register"
                  className="
                    rounded-lg
                    text-sm
                    text-gray-500
                    transition-all
                    duration-300
                    data-[state=active]:bg-violet-500/15
                    data-[state=active]:text-violet-300
                    data-[state=active]:shadow-[0_0_15px_rgba(124,58,237,0.08)]
                  "
                >
                  Sign Up
                </TabsTrigger>

              </TabsList>


              {/* =====================================================
                  LOGIN
              ====================================================== */}

              <TabsContent value="login" className="mt-0">

                <form onSubmit={onLogin} className="space-y-5">

                  {/* Email */}

                  <div className="space-y-2">

                    <Label
                      htmlFor="login-email"
                      className="text-sm font-medium text-gray-300"
                    >
                      Email
                    </Label>

                    <Input
                      id="login-email"
                      type="email"
                      required
                      placeholder="johndoe@gmail.com"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: e.target.value,
                        })
                      }
                      className="
                        h-11
                        rounded-xl
                        border-white/[0.10]
                        bg-white/[0.035]
                        text-sm
                        text-white
                        placeholder:text-gray-600
                        transition-all
                        duration-300
                        focus:border-violet-500/50
                        focus:bg-violet-500/[0.04]
                        focus:ring-2
                        focus:ring-violet-500/10
                      "
                    />

                  </div>


                  {/* Password */}

                  {/* <div className="space-y-2">

                    <Label
                      htmlFor="login-password"
                      className="text-sm font-medium text-gray-300"
                    >
                      Password
                    </Label>

                    <Input
                      id="login-password"
                      type="password"
                      required
                      placeholder="Enter password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                      className="
                        h-11
                        rounded-xl
                        border-white/[0.10]
                        bg-white/[0.035]
                        text-sm
                        text-white
                        placeholder:text-gray-600
                        transition-all
                        duration-300
                        focus:border-violet-500/50
                        focus:bg-violet-500/[0.04]
                        focus:ring-2
                        focus:ring-violet-500/10
                      "
                    />

                  </div> */}

                  <div className="space-y-2">
                    <Label
                      htmlFor="login-password"
                      className="text-sm font-medium text-gray-300"
                    >
                      Password
                    </Label>

                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showLoginPassword ? "text" : "password"}
                        required
                        placeholder="Enter password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className="
        h-11
        rounded-xl
        border-white/[0.10]
        bg-white/[0.035]
        pr-11
        text-sm
        text-white
        placeholder:text-gray-600
        transition-all
        duration-300
        focus:border-violet-500/50
        focus:bg-violet-500/[0.04]
        focus:ring-2
        focus:ring-violet-500/10
      "
                      />

                      <button
                        type="button"
                        onClick={() => setShowLoginPassword((prev) => !prev)}
                        className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        text-gray-500
        transition-colors
        hover:text-violet-400
      "
                        aria-label={showLoginPassword ? "Hide password" : "Show password"}
                      >
                        {showLoginPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Login button */}

                  <div className="flex justify-center pt-2">

                    <Button
                      variant="animate"
                      type="submit"
                      className="h-11 min-w-[130px] rounded-xl px-6"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>

                  </div>

                </form>

              </TabsContent>


              {/* =====================================================
                  REGISTER
              ====================================================== */}

              <TabsContent value="register" className="mt-0">

                <form onSubmit={onRegister} className="space-y-5">

                  {/* Full name */}

                  <div className="space-y-2">

                    <Label
                      htmlFor="register-name"
                      className="text-sm font-medium text-gray-300"
                    >
                      Full Name
                    </Label>

                    <Input
                      id="register-name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: e.target.value,
                        })
                      }
                      className="
                        h-11
                        rounded-xl
                        border-white/[0.10]
                        bg-white/[0.035]
                        text-sm
                        text-white
                        placeholder:text-gray-600
                        transition-all
                        duration-300
                        focus:border-violet-500/50
                        focus:bg-violet-500/[0.04]
                        focus:ring-2
                        focus:ring-violet-500/10
                      "
                    />

                  </div>


                  {/* Email */}

                  <div className="space-y-2">

                    <Label
                      htmlFor="register-email"
                      className="text-sm font-medium text-gray-300"
                    >
                      Email
                    </Label>

                    <Input
                      id="register-email"
                      type="email"
                      required
                      placeholder="johndoe@gmail.com"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      className="
                        h-11
                        rounded-xl
                        border-white/[0.10]
                        bg-white/[0.035]
                        text-sm
                        text-white
                        placeholder:text-gray-600
                        transition-all
                        duration-300
                        focus:border-violet-500/50
                        focus:bg-violet-500/[0.04]
                        focus:ring-2
                        focus:ring-violet-500/10
                      "
                    />

                  </div>


                  {/* Password */}

                  {/* <div className="space-y-2">

                    <Label
                      htmlFor="register-password"
                      className="text-sm font-medium text-gray-300"
                    >
                      Password
                    </Label>

                    <Input
                      id="register-password"
                      type="password"
                      required
                      minLength={6}
                      placeholder="Enter password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      className="
                        h-11
                        rounded-xl
                        border-white/[0.10]
                        bg-white/[0.035]
                        text-sm
                        text-white
                        placeholder:text-gray-600
                        transition-all
                        duration-300
                        focus:border-violet-500/50
                        focus:bg-violet-500/[0.04]
                        focus:ring-2
                        focus:ring-violet-500/10
                      "
                    />

                  </div> */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="register-password"
                      className="text-sm font-medium text-gray-300"
                    >
                      Password
                    </Label>

                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showRegisterPassword ? "text" : "password"}
                        required
                        minLength={6}
                        placeholder="Enter password"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                        className="
        h-11
        rounded-xl
        border-white/[0.10]
        bg-white/[0.035]
        pr-11
        text-sm
        text-white
        placeholder:text-gray-600
        transition-all
        duration-300
        focus:border-violet-500/50
        focus:bg-violet-500/[0.04]
        focus:ring-2
        focus:ring-violet-500/10
      "
                      />

                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword((prev) => !prev)}
                        className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        text-gray-500
        transition-colors
        hover:text-violet-400
      "
                        aria-label={
                          showRegisterPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showRegisterPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>


                  {/* Register button */}

                  <Button
                    type="submit"
                    className="h-11 w-full rounded-xl"
                    variant="animate"
                  >
                    {isLoading
                      ? "Creating account..."
                      : "Create Account"}
                  </Button>

                </form>

              </TabsContent>

            </Tabs>


            {/* Bottom subtle text */}

            <p className="mt-6 text-center text-xs text-gray-600">
              Learn smarter. Remember longer.
            </p>

          </div>

        </DialogContent>

      </Dialog>
    </div>
  );
};

export default AuthModal;