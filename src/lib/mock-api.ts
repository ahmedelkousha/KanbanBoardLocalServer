import { Task, Priority, Status } from "./kanban-types";

let nextId = 1;
const uid = () => String(nextId++);

const seed: Omit<Task, "id" | "createdAt">[] = [
  {
    title: "Design system tokens",
    description: "Set up color palette, typography, and spacing scales",
    priority: "high",
    status: "done",
  },
  {
    title: "Dark mode support",
    description: "Add theme toggle and CSS variables switching",
    priority: "medium",
    status: "in-review",
  },
  {
    title: "Dashboard layout",
    description: "Build responsive sidebar and main content area",
    priority: "medium",
    status: "in-review",
  },
  {
    title: "Authentication flow",
    description: "Implement login, signup, and password reset screens",
    priority: "high",
    status: "in-progress",
  },
  {
    title: "File upload content",
    description: "Drag and drop file upload with preview",
    priority: "medium",
    status: "in-progress",
  },
  {
    title: "API integration",
    description: "Connect frontend to REST API endpoints",
    priority: "high",
    status: "to-do",
  },
  {
    title: "Unit tests",
    description: "Write tests for utility functions and hooks",
    priority: "low",
    status: "to-do",
  },
  {
    title: "Performance audit",
    description: "Lighthouse scores and bundle analysis",
    priority: "low",
    status: "to-do",
  },
  {
    title: "Notification system",
    description: "Toast notifications and in-app alerts",
    priority: "low",
    status: "to-do",
  },
];

let tasks: Task[] = seed.map((t) => ({ ...t, id: uid(), createdAt: Date.now() }));

const delay = (ms = 100) => new Promise((r) => setTimeout(r, ms));

export const api = {
  getTasks: async (): Promise<Task[]> => {
    await delay();
    return [...tasks];
  },

  createTask: async (data: { title: string; description: string; priority: Priority; status: Status }): Promise<Task> => {
    await delay();
    const task: Task = { ...data, id: uid(), createdAt: Date.now() };
    tasks.push(task);
    return task;
  },

  updateTask: async (id: string, data: Partial<Omit<Task, "id" | "createdAt">>): Promise<Task> => {
    await delay();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Task not found");
    tasks[idx] = { ...tasks[idx], ...data };
    return tasks[idx];
  },

  deleteTask: async (id: string): Promise<void> => {
    await delay();
    tasks = tasks.filter((t) => t.id !== id);
  },
};
