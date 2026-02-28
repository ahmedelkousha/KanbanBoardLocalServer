import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/mock-api";
import { Task, Priority, Status } from "@/lib/kanban-types";

const KEY = ["tasks"];

export function useTasks() {
  return useQuery({ queryKey: KEY, queryFn: api.getTasks });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; description: string; priority: Priority; status: Status }) =>
      api.createTask(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<Omit<Task, "id" | "createdAt">>) =>
      api.updateTask(id, data),
    onMutate: async ({ id, ...data }) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueryData<Task[]>(KEY);
      qc.setQueryData<Task[]>(KEY, (old) =>
        old?.map((t) => (t.id === id ? { ...t, ...data } : t))
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteTask(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueryData<Task[]>(KEY);
      qc.setQueryData<Task[]>(KEY, (old) => old?.filter((t) => t.id !== id));
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}
