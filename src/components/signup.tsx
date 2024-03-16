import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Skills } from "@/lib/config";
import { SignUpSchema } from "@/lib/schema/signup.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

type SignUpSchemaValues = z.infer<typeof SignUpSchema>;

function SignUp() {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
      skills: [],
    },
  });

  function onSubmit(data: SignUpSchemaValues) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary" className="font-bold">
          Get Started
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid gap-4 py-4 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="h-12">
                        <FormControl>
                          <Input
                            placeholder="First Name"
                            className="w-full px-3 py-2 border"
                            type="text"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="h-12">
                        <FormControl>
                          <Input
                            placeholder="Last Name"
                            className="w-full px-3 py-2 border"
                            type="text"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="h-12">
                        <FormControl>
                          <Input
                            placeholder="Email"
                            className="w-full px-3 py-2 border"
                            type="email"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="h-12">
                        <FormControl>
                          <Input
                            placeholder="Password"
                            className="w-full px-3 py-2 border"
                            type="password"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                      <FormItem className="h-12">
                        <FormControl>
                          <Input
                            placeholder="Confirm Password"
                            className="w-full px-3 py-2 border"
                            type="password"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid w-full  items-center gap-3 mb-5">
                <FormField
                  control={form.control}
                  name="skills"
                  render={() => (
                    <FormItem className="h-40">
                      <div className="mb-4">
                        <FormLabel className="">Skills</FormLabel>
                        <FormDescription className="">
                          Select your proficiencies
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-3 gap-3 ">
                        {Skills.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="skills"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 "
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel>{item.label}</FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default SignUp;
