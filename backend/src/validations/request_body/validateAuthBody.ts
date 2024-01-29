import { z } from "zod";

const authUsername = z.string({
  required_error: "Name cannot be empty.",
  invalid_type_error: "Name must be a string.",
});

const authEmail = z
  .string({
    required_error: "Email cannot be empty.",
    invalid_type_error: "Email must be a string.",
  })
  .email({ message: "Invalid email." });

const authPassword = z.string({
  required_error: "Password cannot be empty.",
  invalid_type_error: "Password must be a string.",
});

const authSignupPassword = authPassword.min(8, {
  message: "Password must be at least 8 characters long!",
});

const authConfirmPassword = z.string({
  required_error: "Confirm password cannot be empty.",
  invalid_type_error: "Confirm password must be a string.",
});

export const validateSignupBody = z.object({
  body: z
    .object({
      name: authUsername,
      email: authEmail,
      password: authSignupPassword,
      confirmPassword: authConfirmPassword,
    })
    .refine((obj) => obj.password === obj.confirmPassword, {
      message: "Passwords do not match!",
    }),
});

export const validateLoginBody = z.object({
  body: z.object({
    email: authEmail,
    password: authPassword,
  }),
});
