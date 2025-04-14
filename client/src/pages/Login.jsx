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
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeInputHandler = (event, type) => {
    const { name, value } = event.target;
    if (type === "sign-up") {
      setSignupInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const registerHandler = (type) => {
    const inputData = type === "sign-up" ? signupInput : loginInput;
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
                  value={signupInput.name}
                  onChange={(event) => changeInputHandler(event, "sign-up")}
                />
              </div>
              <div className="space-y-1">
                <Label>electronic mail</Label>
                <Input
                  type="email"
                  name="email"
                  required={true}
                  value={signupInput.email}
                  onChange={(event) => changeInputHandler(event, "sign-up")}
                />
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  required={true}
                  value={signupInput.password}
                  onChange={(event) => changeInputHandler(event, "sign-up")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => registerHandler("sign-up")}>Signup</Button>
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
                <Label>electronic mail</Label>
                <Input
                  type="email"
                  placeholder="Ex. usman@gmail.com"
                  required={true}
                  onChange={(event) => changeInputHandler(event, "login")}
                  name="email"
                  value={loginInput.email}
                />
              </div>

              <div className="space-y-1">
                <Label>Password</Label>
                <Input
                  type="password"
                  required={true}
                  onChange={(event) => changeInputHandler(event, "login")}
                  value={loginInput.password}
                  name="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => registerHandler("login")}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;
