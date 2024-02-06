"use client";
import Navbar from "@/components/navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from 'cookie';
import { generateToken } from '@/lib/auth';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SignUpformSchema = z.object({
  name: z.string().min(6).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInformSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const Auth = () => {
  const SignUpform = useForm<z.infer<typeof SignUpformSchema>>({
    resolver: zodResolver(SignUpformSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const SignInform = useForm<z.infer<typeof SignInformSchema>>({
    resolver: zodResolver(SignInformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmitSignUp = async (values: z.infer<typeof SignUpformSchema>) => {
    try {
      await axios.post("/api/signup", values);

      router.push(`/dashboard`);
      toast.success("Registered sucessfully");
    } catch (error) {
      console.log(error);
      toast.error("Email already exists");
    }
  };

  const onSubmitSignIn = async (values: z.infer<typeof SignInformSchema>) => {
    const router = useRouter();

  try {
    const response = await axios.post("/api/signin", values);

    if (response.status === 200 && response.data.token) {
      // Authentication successful

      // Set the JWT token as a cookie
      const token = response.data.token;
      document.cookie = Cookies.set('token', token, {
        maxAge: 60 * 60, // 1 hour
        path: '/',
      });

      // Display success message
      toast.success("Authorized");

      // Redirect to the dashboard
      router.push("/dashboard");
    } else {
      // Authentication failed
      toast.error("Not Authorized");
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    toast.error("Internal Server Error");
  }
};
  };

  return (
    <div className="flex flex-col mx-auto w-[90%] h-full">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full mt-10">
        <Tabs defaultValue="sign-up" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-up">
            <Card>
              <CardHeader>
                <CardTitle>Sign-up</CardTitle>
                <CardDescription>Get started with GOD.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form {...SignUpform}>
                  <form
                    onSubmit={SignUpform.handleSubmit(onSubmitSignUp)}
                    className="space-y-8"
                  >
                    <FormField
                      control={SignUpform.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={SignUpform.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={SignUpform.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>password</FormLabel>
                          <FormControl>
                            <Input placeholder="password" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sign-in">
            <Card>
              <CardHeader>
                <CardTitle>Sign-in</CardTitle>
                <CardDescription>Welcome back to GOD.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form {...SignInform}>
                  <form
                    onSubmit={SignInform.handleSubmit(onSubmitSignIn)}
                    className="space-y-8"
                  >
                    <FormField
                      control={SignInform.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={SignInform.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>password</FormLabel>
                          <FormControl>
                            <Input placeholder="password" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
