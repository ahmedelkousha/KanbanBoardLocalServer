export type Priority = "high" | "medium" | "low";
export type Status = "to-do" | "in-progress" | "in-review" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: number;
}

export const COLUMNS: { id: Status; label: string; color: string }[] = [
  { id: "to-do", label: "TO DO", color: "	hsl(224, 65%, 54%)" },
  { id: "in-progress", label: "IN PROGRESS", color: "	hsl(31, 71%, 52%)" },
  { id: "in-review", label: "IN REVIEW", color: "	hsl(276, 47%, 52%)" },
  { id: "done", label: "DONE", color: "	hsl(154, 38%, 43%)" },
];
