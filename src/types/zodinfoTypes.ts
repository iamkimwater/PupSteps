import {z} from 'zod';

export const ZPetInfo = z.object({
  id: z.number(),
  petName: z.string(),
  petAge: z.number(),
  petGender: z.number(),
  petBreed: z.number(),
  petImageUrl: z.string(),
});

export const ZWalkInfo = z.object({
  id: z.number(),
  walkArea: z.string(),
  walkTime: z.string(),
});

export const ZOtherInfo = z.object({
  id: z.number(),
  userName: z.string(),
  email: z.string(),
  petInfo: ZPetInfo,
  userType: z.number(),
});

export const ZPostInfo = z.object({
  postId: z.number(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  postWriter: ZOtherInfo,
});

export const ZMeInfo = z.object({
  id: z.number(),
  userName: z.string(),
  email: z.string(),
  petInfo: ZPetInfo,
  userType: z.number(),
  walkInfo: ZWalkInfo,
});

export const ZError = z.object({
  response: z.object({
    data: z.object({
      code: z.number(),
      type: z.string(),
      message: z.string(),
    }),
  }),
});