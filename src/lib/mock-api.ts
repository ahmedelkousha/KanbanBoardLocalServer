import axios from "axios";
import { Task, Priority, Status } from "./kanban-types";

const API_URL = import.meta.env.VITE_MOCK_API_URL || "http://localhost:4000";

const client = axios.create({ baseURL: API_URL, headers: { "Content-Type": "application/json" } });

export const api = {
  getTasks: async (): Promise<Task[]> => {
    const resp = await client.get<Task[]>("/tasks");
    return resp.data;
  },

  createTask: async (data: { title: string; description: string; priority: Priority; status: Status }): Promise<Task> => {
    const resp = await client.post<Task>("/tasks", data);
    return resp.data;
  },

  updateTask: async (id: string, data: Partial<Omit<Task, "id" | "createdAt">>): Promise<Task> => {
    const resp = await client.patch<Task>(`/tasks/${id}`, data);
    return resp.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await client.delete(`/tasks/${id}`);
  },
};
