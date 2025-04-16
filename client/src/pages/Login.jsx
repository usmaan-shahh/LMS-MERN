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
import { useState } from "react";
export function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

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

  const buttonHandler = (X) => {
    //X is either "sign-up" or "login"
    const inputData = X === "sign-up" ? signupData : loginData;
    console.log(inputData);
  };
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
              <Button onClick={() => buttonHandler("sign-up")}>Signup</Button>
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
              <Button onClick={() => buttonHandler("login")}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default Login;
