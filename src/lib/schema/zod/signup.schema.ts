import { z } from "zod";

export const SignUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({
      message: "Email is required",
    }),

    password: z.string().min(8, {
      message: "Password must be atleast 8 characters",
    }),
    confirm: z.string().min(1, {
      message: "Confirm your password",
    }),
    // skills: z.array(z.string()).refine((value) => value.some((item) => item), {
    //   message: "You have to select at least one skill.",
    // }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
