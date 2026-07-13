import {z} from "zod";

export const taskSchema = z.object({
    title: z
        .string()
        .min(3, "Title must have at least 3 characters...")
        .max(100, "Title can't be longer than 100 characters..."),

    description: z
        .string()
        .max(500, "Description can't be longer than 500 characters....")
        .optional()
})

export type TaskFormData=z.infer<typeof taskSchema>;