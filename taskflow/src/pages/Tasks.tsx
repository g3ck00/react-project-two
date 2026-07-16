import {globalIgnores} from "eslint/config";

import Button from "../components/ui/Button.tsx";
import Modal from "../components/ui/Modal.tsx";
import Input2 from "../components/ui/Input2.tsx";
import Spinner from "../components/ui/Spinner.tsx";
import Card from "../components/ui/Card.tsx";

import {type JSX, forwardRef, useState} from 'react';

import Badge from "../components/Badge.tsx";

import.meta.env.VITE_APP_TITLE;

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "../components/ui/Layout.tsx";
import SkipToContent from "../components/ui/SkipToContent.tsx";

import {useTaskList} from "../hooks/useTaskList.ts";

import {useTasks} from "../hooks/useTasks.ts";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type TaskFormData, taskSchema} from "../utils/validations.ts";
import type {Task} from "../types/task.ts";
import TaskForm from "../components/ui/TaskForm.tsx"
import api from "../services/api.ts";

import {lazy, Suspense} from 'react';
//import ProtectedRoute from './components/auth/ProtectedRoute';

import { useAuth } from "../hooks/useAuth";
import Login from "../components/Login";
import {useDebounce} from "../hooks/useDebounce.ts";

/*
//Páginas
const LoginPage=lazy(()=>import ('./pages/LoginPage'));
const RegisterPage=lazy(()=>import ('./pages/RegisterPage'));
const DashboardPage=lazy(()=>import ('./pages/DashboardPage'));
const TaskDetailPage=lazy(()=>import ('./pages/TaskDetailPage'));
 */
import Home from "../pages/Home.tsx"
import About from "../pages/About.tsx"
import Header from "../components/ui/Header.tsx";
import Modal2 from "../components/ui/Modal2.tsx";
import TaskCard from "../components/ui/TaskCard.tsx";
import type {InputProps} from "../components/ui/Input.tsx";

export default function Tasks() {

    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Login/>;
    }

    const {logout} = useAuth();

    const [isConfirmDialogOpen, setIsConfirmDialogOpen]=useState(false);

    const [taskToDelete, setTaskToDelete]=useState<Task | null>(null);

    const {
        tasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTask,
        visibleTasks,
        filteredTasks,
        search, setSearch,
        total, completed, pending,
        editingTask, setEditingTask,
        showCompletedTasks,
        showPendingTasks,
        showAllTasks,
        loading,
        name, setName,
    } = useTasks();
    // }=useTaskList(...); // Algo iba allí, de la old method (JS array as DB)

    const [isEditing, setIsEditing] = useState(false);

    //ksabando
    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    //Chantal
    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    const handleCreateTask = async (data: TaskFormData) => {
        await createTask({
            id: crypto.randomUUID(),
            title: data.title,
            description: data.description ?? "",
            completed: false,
            createdAt: new Date().toISOString()
        });

        /*
        //ksabando
        // Old method (using JS array as DB)
        const handleCreateTask = (data: TaskFormData) => {
          createTask({
            id: crypto.randomUUID(),
            title: data.title,
            description: data.description,
            completed: false,
            createdAt: new Date().toISOString(),
          });
         */

        reset();
        setIsCreating(false);
    };

    const handleUpdateTask = async (data: TaskFormData) => {

        if (!editingTask) {
            console.error("No task selected? Gosh!");
            return;
        }

        await updateTask({
            ...editingTask,
            title: data.title,
            description: data.description ?? "",
        });

        reset();
        setEditingTask(null);
        setIsEditing(false);
    };

    const badgeConfig = {
        pending: {label: 'Pending', className: 'badge-danger'},
        inProgress: {label: 'In progress', className: 'badge-warning'},
        completed: {label: 'Completed', className: 'badge-success'},
    } as const

    function TaskBadge({status}: { status: keyof typeof badgeConfig }) {
        const config = badgeConfig[status]
        return <span className={config.className}>{config.label}</span>
    }

    // ############################################################

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const Input = forwardRef<HTMLInputElement, InputProps>(
        ({...props}, ref) => {
            return (
                <input ref={ref} {...props}/>
            )
        }
    )

    const {
        register,
        formState: {errors},
        reset,
        handleSubmit,
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema)
    });

    /*
    function Home(){
      return <h2>Inicio</h2>;
    }

    function Tasks(){
      return <h2>Tareas</h2>;
    }

    function About(){
      return <h2>Acerca de</h2>;
    }
    */

    const [isCreating, setIsCreating] = useState(false);

    // ==================== Update Task ====================

    const [text, setText]=useState("");

    const debouncedWrite=useDebounce(text, 1000);

    return (

        <>

        <h1>Tasks</h1>

    {/* Para crear una nueva tarea */}
    <Button onClick={() => {
        setIsCreating(true);
    }}
    >
        Create new task
    </Button>

    <Modal
        isOpen={isCreating}
        title={"Create new task"}
        onClose={() => setIsCreating(false)}
    >
        <form onSubmit={handleSubmit(handleCreateTask)}>
            <Button
                type={"submit"}
            >
                Create new task
            </Button>
            <Input2
                label={"Title: "}
                {...register("title")}
                error={errors.title?.message}
                value={title}
                onChange={handleTitleChange}
                placeholder={"Title of task"}
            >

            </Input2>
            <Input2
                label={"Description: "}
                {...register("description")}
                error={errors.description?.message}
            >
            </Input2>
        </form>
    </Modal>

    {/*}
        <div>
          <Card><p>Este es el contenido de la tarjeta</p></Card>
        </div>
        {*/}

    {/* ##############################}Muestra las tareas{############################## */}

    {loading && <Spinner/>}

    {tasks.length === 0 ? (
        <p>No tasks...</p>
    ) : (
        <>
            <h2>My Tasks</h2>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={"Search..."}/>

            <br></br>

            <button onClick={showAllTasks}>
                All
            </button>

            <button onClick={showPendingTasks}>
                Pending
            </button>

            <button onClick={showCompletedTasks}>
                Completed
            </button>

            {filteredTasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onEdit={(task)=>{
                        setEditingTask(task);
                        setIsEditing(true);
                    }}
                    onDelete={async (task)=>{
                        await deleteTask(task.id);
                    }}
                />
            ))}

            <Modal
                isOpen={isEditing}
                title={"Edit task"}
                onClose={() => {
                    setIsEditing(false);
                    setEditingTask(null);
                    reset();
                }}
            >
                <form onSubmit={handleSubmit(handleUpdateTask)}>
                    <Input2
                        label={"Title: "}
                        {...register("title")}
                        error={errors.title?.message}
                        defaultValue={editingTask?.title}
                    />
                    <Input2
                        label={"Description: "}
                        {...register("description")}
                        error={errors.description?.message}
                        defaultValue={editingTask?.description}
                    />
                    <Button type={"submit"}>Save changes</Button>
                </form>
            </Modal>

            <Modal2
                isOpen={taskToDelete!==null}
                onClose={()=>setTaskToDelete(null)}
                title={"Delete task"}
            >
                Delete this task?

                <br/>

                <button onClick={async ()=>{

                    if (!taskToDelete) return;
                    await deleteTask(taskToDelete.id);
                    setTaskToDelete(null);

                }}
                        style={{backgroundColor: "red"}}>
                    Delete
                </button>

                <button onClick={()=>setTaskToDelete(null)}>
                    Cancel
                </button>
            </Modal2>

            <br></br><p>{pending} pending tasks of {total} total.</p>

            <Button onClick={logout}>
                Log out
            </Button>

        </>
    )}
            </>
    );
}