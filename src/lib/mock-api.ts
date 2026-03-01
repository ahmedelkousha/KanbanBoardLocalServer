import { Task, Priority, Status } from "./kanban-types";

// simple wrapper around json-server REST endpoints
const API_URL = import.meta.env.VITE_MOCK_API_URL || "http://localhost:4000";

function handleResponse(res: Response) {
  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text || res.statusText);
    });
  }
  return res.json();
}

export const api = {
  getTasks: async (): Promise<Task[]> => {
    const res = await fetch(`${API_URL}/tasks`);
    return handleResponse(res);
  },

  createTask: async (data: {
    title: string;
    description: string;
    priority: Priority;
    status: Status;
  }): Promise<Task> => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  updateTask: async (
    id: string,
    data: Partial<Omit<Task, "id" | "createdAt">>,
  ): Promise<Task> => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  deleteTask: async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) {
      throw new Error("Failed to delete task");
    }
  },
};
