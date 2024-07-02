import { z } from "zod";

export const clickSchema = z.object({
  name: z.literal("click"),
  description: z
    .literal("Click on an element with the label on the annotation.")
    .optional(),
  args: z.object({
    label: z.string(),
  }),
});

export const setValueSchema = z.object({
  name: z.literal("setValue"),
  description: z
    .literal(
      "Focus on and set the value of an input element with the label on the annotation.",
    )
    .optional(),
  args: z.object({
    label: z.string(),
    value: z.string(),
  }),
});

export const setValueAndEnterSchema = z.object({
  name: z.literal("setValueAndEnter"),
  description: z
    .literal(
      'Like "setValue", except then it presses ENTER. Use this tool can submit the form when there\'s no "submit" button.',
    )
    .optional(),
  args: z.object({
    label: z.string(),
    value: z.string(),
  }),
});

export const navigateSchema = z.object({
  name: z.literal("navigate"),
  description: z
    .literal(
      "Navigate to a new page. The value should be a URL. Use this tool only when the current task requires navigating to a new page.",
    )
    .optional(),
  args: z.object({
    url: z.string(),
  }),
});

export const scrollSchema = z.object({
  name: z.literal("scroll"),
  description: z
    .literal(
      'Scroll the page to see the other parts. Use "up" or "down" to scroll 2/3 of height of the window. Use "top" or "bottom" to quickly scroll to the top or bottom of the page.',
    )
    .optional(),
  args: z.object({
    value: z.string(),
  }),
});

export const waitSchema = z.object({
  name: z.literal("wait"),
  description: z
    .literal(
      "Wait for 3 seconds before the next action. Useful when the page is loading.",
    )
    .optional(),
  args: z.object({}).optional(),
});

export const finishSchema = z.object({
  name: z.literal("finish"),
  description: z.literal("Indicate the task is finished").optional(),
  args: z.object({}).optional(),
});

export const failSchema = z.object({
  name: z.literal("fail"),
  description: z
    .literal("Indicate that you are unable to complete the task")
    .optional(),
  args: z.object({}).optional(),
});

