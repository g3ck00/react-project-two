import {forwardRef, useState} from 'react';
import type {JSX} from 'react';
import './App.css';

import Badge from "./components/Badge";

import.meta.env.VITE_APP_TITLE;

import Card from "./components/ui/Card.tsx";
import Button from "./components/ui/Button.tsx";
import Header from "./components/ui/Header.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Input, {type InputProps} from "./components/ui/Input.tsx";
import Layout from "./components/ui/Layout.tsx";
import SkipToContent from "./components/ui/SkipToContent.tsx";

import {useTaskList} from "./hooks/useTaskList.ts";

import {useTasks} from "./hooks/useTasks.ts";

import Input2 from "./components/ui/Input2.tsx";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type TaskFormData, taskSchema} from "./utils/validations.ts";
import type {Task} from "./types/task.ts";
import Modal from "./components/ui/Modal.tsx";
import TaskForm from "./components/ui/TaskForm.tsx"
import api from "./services/api.ts";

import {lazy, Suspense} from 'react';
//import ProtectedRoute from './components/auth/ProtectedRoute';
import Spinner from './components/ui/Spinner.tsx';

import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login";
import {useDebounce} from "./hooks/useDebounce.ts";

/*
//Páginas
const LoginPage=lazy(()=>import ('./pages/LoginPage'));
const RegisterPage=lazy(()=>import ('./pages/RegisterPage'));
const DashboardPage=lazy(()=>import ('./pages/DashboardPage'));
const TaskDetailPage=lazy(()=>import ('./pages/TaskDetailPage'));
 */
import Home from "./pages/Home.tsx"
import Tasks from "./pages/Tasks.tsx"
import About from "./pages/About.tsx"
import Footer from "./components/ui/Footer.tsx";

function App(): JSX.Element {

  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return <Login/>;
  }

  const {logout} = useAuth();

  const userName = "Bryant";

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



  // ============================================================

  return (
      <BrowserRouter>
        <>

            <Routes>
              <Route path={"/"} element={<Layout/>}>
                <Route index element={<Home />}/>
                <Route path={"tasks"} element={<Tasks />}/>
                <Route path={"about"} element={<About />}/>
              </Route>
            </Routes>

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
          <Routes>
            <Route path={"/"} element={<Home />}/>
            <Route path={"/tasks"} element={<Tasks />}/>
            <Route path={"/about"} element={<About />}/>
          </Routes>
      {*/}
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
                    <Card key={task.id}>
                      {/*} style=textDecoration[...] = hace que el título de la tarea sea
                    tachado si el estado de esta última es "Completada" {*/}
                      <h3 style={{textDecoration: task.completed ? "line-through" : "none"}}>
                        {task.title}
                      </h3>
                      <p>{task.description}</p>
                      <small>{task.createdAt.toString()}</small> {/*}Revisar{*/}
                      <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
                      <p>Tags: {task.tags}</p>

                      <button onClick={async () => await toggleTask(task.id)}
                              style={{
                                backgroundColor: task.completed ? "grey" : "green",
                                color: "white",
                                border: "none",
                                padding: "0.5rem 1rem",
                                borderRadius: "6px",
                                cursor: "pointer",
                              }}
                      >
                        {task.completed ? "Reopen" : "Completed"}
                      </button>

                      <button onClick={() => {
                        setEditingTask(task);

                        reset({
                          title: task.title,
                          description: task.description,
                        });

                        setIsEditing(true);
                      }}
                      >
                        Edit
                      </button>

                      <Modal
                          isOpen={isEditing && editingTask?.id === task.id}
                          title={"Edit task"}
                          onClose={() => setIsEditing(false)}
                      >
                        <form onSubmit={handleSubmit(handleUpdateTask)}>
                          <Input2
                              label={"New title: "}
                              {...register("title")}
                              error={errors.title?.message}
                          >

                          </Input2>
                          <Input2
                              label={"New description: "}
                              {...register("description")}
                              error={errors.description?.message}
                          >
                          </Input2>
                          <Button type={"submit"}>
                            Edit task
                          </Button>
                        </form>
                      </Modal>

                      <button
                          onClick={async () => {
                            const conf = window.confirm("Delete this task?")
                            if (conf) {
                              await deleteTask(task.id);
                            }
                          }}>
                        Delete task
                      </button>

                    </Card>
                ))}

                <br></br><p>{pending} pending tasks of {total} total.</p>

              </>
          )
          }

          <Button onClick={logout}>
            Log out
          </Button>

          {/* ==================== useLocalStorage ==================== */}

          <p>useLocalStorage</p>

          <input value={name}
                 onChange={e => setName(e.target.value)}/>

          {/* ============================================================ */}

          {/* ==================== useDebounced ==================== */}

          <p>useDebounced</p>

          <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write here..."
          />

          <input
              value={debouncedWrite}
              placeholder={"Must be replicated here in 1 second..."}
              readOnly
          />
          {/* ============================================================ */}

          <Footer/>

        </>
      </BrowserRouter>
        )
}

export default App