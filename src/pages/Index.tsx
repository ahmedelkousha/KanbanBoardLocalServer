import { useState } from "react";
import { COLUMNS } from "@/lib/kanban-types";
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from "@/hooks/use-tasks";
import { KanbanColumn } from "@/components/kanban/KanbanColumn";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  const [search, setSearch] = useState("");
  const { data: tasks = [], isLoading } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const filtered = search
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase())
      )
    : tasks;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b px-4 py-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <img
              width="60"
              height="60"
              src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-kanban-agile-flaticons-flat-flat-icons-2.png"
              alt="external-kanban-agile-flaticons-flat-flat-icons-2"
            />
            <div className="flex flex-col items-start">
              <h1 className="font-mono text-lg font-bold tracking-wider">
                KANBAN BOARD
              </h1>
              <span className="text-xs text-muted-foreground bg-muted rounded-full px-2.5 py-0.5 border font-mono">
                {tasks.length} tasks
              </span>
            </div>
          </div>
          <div className="relative sm:ml-auto sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>
        </div>
      </header>

      {/* Board */}
      <main className="flex-1 overflow-x-auto p-4 md:p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Loading…
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COLUMNS.map((col) => (
              <KanbanColumn
                key={col.id}
                status={col.id}
                tasks={filtered.filter((t) => t.status === col.id)}
                onUpdate={(id, data) => updateTask.mutate({ id, ...data })}
                onDelete={(id) => deleteTask.mutate(id)}
                onAdd={(data) => createTask.mutate(data)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
