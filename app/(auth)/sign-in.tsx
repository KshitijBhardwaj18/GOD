"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField,FormItem, FormLabel } from "@/components/ui/form";

interface SignInFormValues {
    email: string;
    password: string;
}

 
const formSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})


const SignIn = () => {

    const form =  useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: SignInFormValues) => {
        console.log(data)
    }


    return ( 
        <div className="felx items-center justify-between">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} name="email" render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                            </FormControl>
                        </FormItem>
                    )} />
                </form>
            </Form>
        </div>
     );
}
 
export default SignIn;






