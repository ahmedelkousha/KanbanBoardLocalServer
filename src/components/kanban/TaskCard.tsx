import { useState } from "react";
import { Task, Priority } from "@/lib/kanban-types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { EditTaskDialog } from "./EditTaskDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: {
    label: "High",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
  medium: {
    label: "Medium",
    className: "bg-amber-500/15 text-amber-700 border-amber-500/30",
  },
  low: {
    label: "Low",
    className: "bg-[#e7e8ed] text-black/60 border-0",
  },
};

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, data: Partial<Omit<Task, "id" | "createdAt">>) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const p = priorityConfig[task.priority];

  return (
    <>
      <Card
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("taskId", task.id);
          e.dataTransfer.effectAllowed = "move";
        }}
        className="group cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md"
      >
        <CardContent className="p-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-1.5 min-w-0">
              <GripVertical className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-sm font-medium leading-tight">{task.title}</h4>
            </div>
            <Badge variant="outline" className={`shrink-0 text-[10px] px-1.5 py-0 rounded-sm ${p.className}`}>
              {p.label}
            </Badge>
          </div>
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 pl-5">{task.description}</p>
          )}
          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setEditOpen(true)}>
              <Pencil className="h-3 w-3" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete task?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete "{task.title}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(task.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      <EditTaskDialog
        task={task}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={(data) => {
          onUpdate(task.id, data);
          setEditOpen(false);
        }}
      />
    </>
  );
}
