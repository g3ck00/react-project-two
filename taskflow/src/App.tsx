import { useState } from 'react'
import './App.css'

import Badge from "./components/Badge";

import.meta.env.VITE_APP_TITLE

import Card from "./components/ui/Card.tsx";
import Button from "./components/ui/Button.tsx";
import Header from "./components/ui/Header.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Input from "./components/ui/Input.tsx";
import Layout from "./components/ui/Layout.tsx";
import SkipToContent from "./components/ui/SkipToContent.tsx";

import {useTaskList} from "./hooks/useTaskList.ts";

import {sampleTasks} from "./data/sampleTasks.ts";

function App(): JSX.Element {
  const [count, setCount] = useState(0)

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
    showCompletedTasks,
    showPendingTasks,
    showAllTasks
  }=useTaskList(sampleTasks);

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if (!title.trim()) return
    onAddTask({
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: new Date()})
  }

  // ############################################################

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

  return (
      <BrowserRouter>
      <Layout userName={"Bryant"}>
      <>
      {/*}
          <Routes>
            <Route path={"/"} element={<Home />}/>
            <Route path={"/tasks"} element={<Tasks />}/>
            <Route path={"/about"} element={<About />}/>
          </Routes>
      {*/}
        <div>
          <Card><p>Este es el contenido de la tarjeta</p></Card>
        </div>

        <div>
          <Button
            type={"submit"}
            disabled
            aria-label={"test"}
            form={"taskForm"}
            onClick={(e)=>e.preventDefault()}
          >Botón de prueba</Button>
        </div>

        <Input></Input>

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
