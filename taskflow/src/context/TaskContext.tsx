import {createContext} from "react";
import type {Task} from "../types/task";
import type {TaskAction, TaskState} from "../components/reducers/taskReducer.ts";

interface TaskContextType {
    state: TaskState;
    dispatch: React.Dispatch<TaskAction>;
    /*
    tasks: Task[];
    addTask: (task: Omit<Task, "id" | "createdAt">) => void;
    deleteTask: (id: string) => void;
    toggleTask: (id: string) => void;
     */
}

export const TaskContext = createContext<TaskContextType | null>(null);