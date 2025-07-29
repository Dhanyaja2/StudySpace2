import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Brain, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios"
import { useNavigate } from "react-router";

const AuthModal = ({ isOpen, onClose }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      console.log("OnLogin executed:", response.data)
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.name);
        localStorage.setItem("userId", response.data.userId);
        navigate('/dashboard')
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
      setIsLoading(false)
    }

  };

  const onRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("onRegister executed");

    try {
      let newUrl = `${url}/api/user/addUser`;
      const response = await axios.post(newUrl, registerData);
      console.log("onRegister executed: ", response.data)
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.name);
        localStorage.setItem("userId", response.data.userId);
        navigate('/dashboard')
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
      setIsLoading(false)
    }
  };

  return (
    <div className="bg-transparent text-white min-h-screen absolute top-0 w-screen z-10 ">
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 relative">
              <Brain className="h-6 w-6 text-indigo-600" />
              Welcome to StudySpace
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={onLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    required
                    placeholder="johndoe@gmail.com"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    required
                    placeholder="Enter password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                </div>
                <Button
                  variant="animate"
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={onRegister} className="space-y-4">
                <div>
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="register-email">Email</Label>
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
                  />
                </div>
                <div>
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    required
                    placeholder="Enter password"
                    minLength={6}
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <Button type="submit" className="w-full" variant="animate">
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthModal;
