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

export function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [
    loginUser,
    {
      data: logindata,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
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
    if (registerData && registerIsSuccess) {
      toast.success("User registered successfully");
    }
    if (loginIsSuccess && logindata) {
      toast.success("User logged in successfully");
    }
    if (registerError) {
      toast.error(registerError.data.message);
    }
    if (loginError) {
      toast.error(loginError.data.message);
    }
  }, [registerIsSuccess, loginIsSuccess, logindata, loginError, registerError]);

  return (
    <div className="flex  items-center justify-center h-screen bg-gray-100">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 border b-2 border-b-slate-200">
          <TabsTrigger value="signup">SignUp</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Enter the detail's below to create an account and click signup
                to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input
                  name="name"
                  type="text"
                  required={true}
                  value={signupData.name}
                  onChange={handleSignupTabChange}
                />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  required={true}
                  value={signupData.email}
                  onChange={handleSignupTabChange}
                />
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  required={true}
                  value={signupData.password}
                  onChange={handleSignupTabChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => buttonHandler("sign-up")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                    please wait...
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login to your account and click login to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>email</Label>
                <Input
                  type="email"
                  placeholder="Ex. usman@gmail.com"
                  required={true}
                  onChange={handleLoginTabChange}
                  name="email"
                  value={loginData.email}
                />
              </div>

              <div className="space-y-1">
                <Label>Password</Label>
                <Input
                  type="password"
                  required={true}
                  onChange={handleLoginTabChange}
                  value={loginData.password}
                  name="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => buttonHandler("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                    please wait...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default Login;
