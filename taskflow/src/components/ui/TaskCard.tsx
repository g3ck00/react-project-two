import type { Task } from "../../types/task";
import Card from "./Card";
import Button from "./Button";
import {useState} from "react";
import ConfirmDialog from "./ConfirmDialog.tsx";
import Tooltip from "./Tooltip.tsx";
import {ErrorBoundary} from "react-error-boundary";

interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => void;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

export default function TaskCard({
                                     task,
                                     onToggle,
                                     onEdit,
                                     onDelete,
                                 }: TaskCardProps) {

    const [showConfirm, setShowConfirm]=useState(false);

    return (

        <ErrorBoundary fallback={"no cards, dummy!"} onReset={()=>{}}>

        <Card>
            <h3
                style={{
                    textDecoration: task.completed
                        ? "line-through"
                        : "none"
                }}
            >
                {task.title}
            </h3>


            <Tooltip text={task.description}>
                <p>{task.description.length > 40
                ? task.description.slice(0, 40)+"..."
                : task.description}
                </p>
            </Tooltip>

            <br/>

            <small>
                {task.createdAt.toString()}
            </small>


            <p>
                Status:{" "}
                {task.completed
                    ? "Completed"
                    : "Pending"}
            </p>


            <p>
                Tags: {task.tags}
            </p>


            <button
                onClick={() => onToggle(task.id)}
                style={{
                    backgroundColor: task.completed
                        ? "grey"
                        : "green",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                }}
            >
                {
                    task.completed
                        ? "Reopen"
                        : "Completed"
                }
            </button>


            <Button
                onClick={() => onEdit(task)}
            >
                Edit
            </Button>


            <Button
                onClick={() => setShowConfirm(true)}
            >
                Delete
            </Button>

            <ConfirmDialog
                isOpen={showConfirm}
                title="Delete task"
                message={`Delete "${task.title}"?`}
                onCancel={() => setShowConfirm(false)}
                onConfirm={async () => {
                    await onDelete(task);
                    setShowConfirm(false);
                }}
            />

        </Card>

        </ErrorBoundary>
    );
}