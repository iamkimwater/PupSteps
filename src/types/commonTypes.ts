import {z} from 'zod';

// compiletime type check
export interface IMe {
  userId: number;
  email: string;
}

// runtime type check
export const meSchema = z.object({
  userId: z.number(),
  email: z.string(),
});
