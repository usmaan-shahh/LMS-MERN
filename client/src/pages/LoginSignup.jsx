import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "@/apiSlice/authApi";
import { useRegisterUserMutation } from "@/apiSlice/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function LoginSignup() {
  {
    /* If Path is /login the login tab gets active and if path is /signup the signup tab gets active */
  }
  const navigate = useNavigate();
  const [tab, setTab] = useState("signup");
  const location = useLocation();

  useEffect(() => {
    console.log("Current path is:", location.pathname);
    if (location.pathname === "/login") {
      setTab("login");
    } else if (location.pathname === "/signup") {
      setTab("signup");
    }
  }, [location.pathname]);

  const handleTabChange = (value) => {
    setTab(value);
    navigate(`/${value}`);
  };
  {
    /* code ends here */
  }

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [
    loginUser,
    {
      data: loginUserData,
      error: loginUserError,
      isLoading: loginUserIsLoading,
      isSuccess: loginUserIsSuccess,
    },
  ] = useLoginUserMutation();

  const [
    registerUser,
    {
      data: registerUserData,
      error: registerUserError,
      isLoading: registerUserIsLoading,
      isSuccess: registerUserIsSuccess,
    },
  ] = useRegisterUserMutation();

  const inputHandler = (event, type) => {
    const { name, value } = event.target;
    if (type === "sign-up") {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    } else if (type === "login") {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignupTabChange = (event) => {
    inputHandler(event, "sign-up");
  };

  const handleLoginTabChange = (event) => {
    inputHandler(event, "login");
  };

  const buttonHandler = async (X) => {
    //X is either "sign-up" or "login"
    const inputData = X === "sign-up" ? signupData : loginData;
    const action = X === "sign-up" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    console.log(loginUserData);
    if (registerUserData && registerUserIsSuccess) {
      toast.success("User registered successfully");
    }
    if (loginUserIsSuccess && loginUserData) {
      toast.success("User logged in successfully");
      navigate("/");
    }
    if (registerUserError) {
      toast.error(registerUserError.data.message);
    }
    if (loginUserError) {
      toast.error(loginUserError.data.message);
    }
  }, [
    registerUserIsSuccess,
    loginUserIsSuccess,
    loginUserData,
    loginUserError,
    registerUserError,
    registerUserData,
  ]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Tabs value={tab} onValueChange={handleTabChange} className="w-[450px]">
        <TabsList className="grid w-full grid-cols-2 mb-6 shadow-md rounded-lg overflow-hidden border border-gray-200 h-14">
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 font-medium transition-all text-sm"
          >
            Sign Up
          </TabsTrigger>
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 font-medium transition-all text-sm"
          >
            Login
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card className="min-h-[400px] flex flex-col shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Sign Up
              </CardTitle>
              <CardDescription className="text-gray-600">
                Create an account to get started with our learning platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow pt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Full Name</Label>
                <Input
                  name="name"
                  type="text"
                  required={true}
                  value={signupData.name}
                  onChange={handleSignupTabChange}
                  className="h-10"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  required={true}
                  value={signupData.email}
                  onChange={handleSignupTabChange}
                  className="h-10"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Password</Label>
                <Input
                  type="password"
                  name="password"
                  required={true}
                  value={signupData.password}
                  onChange={handleSignupTabChange}
                  className="h-10"
                  placeholder="••••••••"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                disabled={registerUserIsLoading}
                onClick={() => buttonHandler("sign-up")}
                className="w-full h-11 font-medium"
              >
                {registerUserIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card className="min-h-[400px] flex flex-col shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your account to continue learning.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow pt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email Address</Label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  required={true}
                  onChange={handleLoginTabChange}
                  name="email"
                  value={loginData.email}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Password</Label>
                <Input
                  type="password"
                  required={true}
                  onChange={handleLoginTabChange}
                  value={loginData.password}
                  name="password"
                  className="h-10"
                  placeholder="••••••••"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                disabled={loginUserIsLoading}
                onClick={() => buttonHandler("login")}
                className="w-full h-11 font-medium"
              >
                {loginUserIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default LoginSignup;
