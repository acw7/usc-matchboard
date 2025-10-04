import { z } from "zod";

export const StudyPostCreate = z.object({
  courseId: z.string().min(1),
  preferredDays: z.array(z.enum(["Mon","Tue","Wed","Thu","Fri","Sat","Sun"])).default([]),
  timeBlocks: z.array(z.number().int().min(0).max(335)).max(336),
  goals: z.array(z.string()).max(12).default([]),
  modality: z.enum(["in-person","online","either"]),
  skillLevel: z.number().int().min(1).max(5)
});

export const StudyPostPatch = z.object({
  status: z.enum(["OPEN","MATCHED","CLOSED"]).optional(),
  preferredDays: z.array(z.enum(["Mon","Tue","Wed","Thu","Fri","Sat","Sun"])).optional(),
  timeBlocks: z.array(z.number().int().min(0).max(335)).max(336).optional(),
  goals: z.array(z.string()).max(12).optional(),
  modality: z.enum(["in-person","online","either"]).optional(),
  skillLevel: z.number().int().min(1).max(5).optional(),
});
