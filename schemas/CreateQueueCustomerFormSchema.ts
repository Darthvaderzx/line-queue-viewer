import { z } from "zod";

/**
 * Define the Zod validation schema for create customer form for queue
 */
export const CreateQueueCustomerFormSchema = z.object({
    name: z.string().nonempty({message: "Customer name is required"}).max(20, {message:"Maximum 20 characters"})
})

/**
 * Obtain typing from schema
 */
export type CreateQueueCustomerFormType = z.infer<typeof CreateQueueCustomerFormSchema>;