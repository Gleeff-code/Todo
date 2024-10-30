import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must have at least one uppercase letter' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must have at least one non-alphanumeric character' }),
});
