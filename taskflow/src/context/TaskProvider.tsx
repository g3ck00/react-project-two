// Chantal

import { useReducer } from "react";
import type { ReactNode } from "react";

import { TaskContext } from "./TaskContext";
import { taskReducer, initialState } from "../components/reducers/taskReducer.ts";

interface Props {
    children: ReactNode;
}

export function TaskProvider({ children }: Props) {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    return (
        <TaskContext.Provider
            value={{state, dispatch}}
        >
            {children}
        </TaskContext.Provider>
    );
}