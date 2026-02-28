import { useState } from "react";
import { Task, Status } from "@/lib/kanban-types";
import { COLUMNS } from "@/lib/kanban-types";
import { TaskCard } from "./TaskCard";
import { AddTaskDialog } from "./AddTaskDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface KanbanColumnProps {
  status: Status;
  tasks: Task[];
  onUpdate: (id: string, data: Partial<Omit<Task, "id" | "createdAt">>) => void;
  onDelete: (id: string) => void;
  onAdd: (data: { title: string; description: string; priority: "high" | "medium" | "low"; status: Status }) => void;
}

export function KanbanColumn({ status, tasks, onUpdate, onDelete, onAdd }: KanbanColumnProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const col = COLUMNS.find((c) => c.id === status)!;

  return (
    <div
      className={`flex flex-col min-w-[280px] w-full rounded-lg border bg-muted/50 transition-colors ${
        dragOver ? "ring-2 ring-primary/40 bg-muted" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const taskId = e.dataTransfer.getData("taskId");
        if (taskId) onUpdate(taskId, { status });
      }}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 px-3 py-3 border-b">
        <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: col.color }} />
        <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground">
          {col.label}
        </span>
        <span className="ml-auto font-mono text-xs text-muted-foreground bg-background rounded-full px-2 py-0.5 border">
          {tasks.length}
        </span>
      </div>

      {/* Task list */}
      <ScrollArea className="flex-1 max-h-[calc(100vh-220px)]">
        <div className="flex flex-col gap-2 p-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </div>
      </ScrollArea>

      {/* Add task button */}
      <div className="p-2 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground text-xs gap-1"
          onClick={() => setAddOpen(true)}
        >
          <Plus className="h-3.5 w-3.5" /> Add task
        </Button>
      </div>

      <AddTaskDialog status={status} open={addOpen} onOpenChange={setAddOpen} onAdd={onAdd} />
    </div>
  );
}
