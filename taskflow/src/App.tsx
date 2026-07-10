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

import {sampleTasks} from "./data/sampleTasks.ts";
import Input2 from "./components/ui/Input2.tsx";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type TaskFormData, taskSchema} from "./utils/validations.ts";
import type {Task} from "./types/task.ts";
import Modal from "./components/ui/Modal.tsx";

function App(): JSX.Element {

  const userName="Bryant";

  const {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    visibleTasks,
    filteredTasks,
    search, setSearch,
    total, completed, pending,
    editingTask, setEditingTask,
    showCompletedTasks,
    showPendingTasks,
    showAllTasks
  }=useTaskList(sampleTasks);

  const [isEditing, setIsEditing]=useState(false);

  //ksabando
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>){
    setTitle(e.target.value);
  }

  //Chantal
  function handleSearch(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
  }

  //ksabando
  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault(); //Evita recargar la página
    addTask({id: crypto.randomUUID(), title, description, completed:false,createdAt: new Date()});
    setTitle('');
    setDescription('');
  }

  // ############################## ksabando ##############################
  const badgeConfig={
    pending: {label: 'Pending', className: 'badge-danger'},
    inProgress: {label: 'In progress', className: 'badge-warning'},
    completed: {label: 'Completed', className: 'badge-success'},
  } as const

  function TaskBadge({status}:{status: keyof typeof badgeConfig}){
    const config=badgeConfig[status]
    return <span className={config.className}>{config.label}</span>
  }

  // ############################################################

  // ############################## ksabando ##############################
  const [title, setTitle]=useState('');
  const [description, setDescription]=useState('');

  // ############################################################

  const Input=forwardRef<HTMLInputElement, InputProps>(
      ({...props}, ref)=>{
        return (
            <input ref={ref} {...props}/>
        )
      }
  )

  const {
    register,
    formState: {errors},
    reset,
  }=useForm<TaskFormData>({
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

  const [isCreating, setIsCreating]=useState(false);

  return (
      <BrowserRouter>

      <Layout userName={"Bryant"}>

        <>

          <Button onClick={()=>{
            setIsCreating(true);
          }}
          >
            Create new task
          </Button>

          <Modal
              isOpen={isCreating}
              title={"Create new task"}
              onClose={()=>setIsCreating(false)}
          ><form onSubmit={handleSubmit}>
            <button
                onClick={()=>{
                  setIsCreating(false);
                  handleSubmit;
                }}>
              Guardar cambios
            </button>
            <Input2
                label={"Título: "}
                {...register("title")}
                error={errors.title?.message}
                value={title}
                onChange={handleTitleChange}
                placeholder={"Título de la tarea"}
            >

            </Input2>
            <Input2
                label={"Descripción: "}
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

        <div>
          <Button
            type={"submit"}
            disabled
            aria-label={"test"}
            form={"taskForm"}
            onClick={(e)=>e.preventDefault()}
          >Botón de prueba</Button>
        </div>

        {/*}ksabando{*/}
        <input type={"text"}
               value={title}
               onChange={handleTitleChange}
               placeholder={"Título de la tarea"}
               />

        {/*}ksabando{*/}
        <form onSubmit={handleSubmit}>
          <input value={title}
                 onChange={e=>setTitle(e.target.value)}/>
          <button type={"submit"}>Agregar</button>
        </form>

        {/*}Muestra las tareas{*/}
      {tasks.length === 0 ? (
          <p>No hay tareas...</p>
          ) : (
              <>
                <h2>My Tasks</h2>

                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    placeholder={"Buscar..."}/>

                <br></br>

                <button type={"submit"}>
                  All
                </button>

                <button onClick={showPendingTasks}>
                  Pending
                </button>

                <button onClick={showCompletedTasks}>
                  Completed
                </button>

                {filteredTasks.map(task=>(
                  <Card key={task.id}>
                    {/*} style=textDecoration[...] = hace que el título de la tarea sea
                    tachado si el estado de esta última es "Completada" {*/}
                    <h3 style={{textDecoration: task.completed ? "line-through" : "none"}}>
                      {task.title}
                    </h3>
                    <p>{task.description}</p>
                    <small>{task.createdAt.toString()}</small> {/*}Revisar{*/}
                    <p>Estado: {task.completed ? 'Completed': 'Pending'}</p>

                    <button onClick={()=>toggleTask(task.id)}
                            style={{
                              backgroundColor: task.completed ? "grey" : "green",
                              color: "white",
                              border: "none",
                              padding: "0.5rem 1rem",
                              borderRadius:"6px",
                              cursor: "pointer",
                            }}
                    >
                      {task.completed ? "Reopen":"Completed"}
                    </button>

                    <button onClick={()=>{
                      setIsEditing(true);
                    }}
                    >
                      Editar
                    </button>

                    <Modal
                      isOpen={isEditing}
                      title={"Edit task"}
                      onClose={()=>setIsEditing(false)}
                    ><form>
                      <Input2
                          label={"Nuevo título: "}
                          {...register("title")}
                          error={errors.title?.message}
                      >

                      </Input2>
                      <Input2
                          label={"Nueva descripción: "}
                          {...register("description")}
                          error={errors.description?.message}
                      >
                      </Input2>
                    </form>

                    </Modal>

                    <button
                        onClick={()=>{
                            const conf=window.confirm("¿Eliminar esta tarea?")
                            if (conf){
                              deleteTask(task.id);
                            }
                        }}>
                          Eliminar tarea
                    </button>

                  </Card>
                ))}

                <br></br><p>{pending} pending of {total} total.</p>

              </>
              )
      }
    </>
      </Layout>
      </BrowserRouter>
  )
}

export default App
