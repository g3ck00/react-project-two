    import {useCallback, useState, useEffect} from 'react'
    import type {Task} from '../types/task'

    import {useReducer} from "react";
    import {taskReducer, initialState} from "../components/reducers/taskReducer.ts";

    import api from "../services/api.ts";
    import {create} from "axios";

    import useLoggerReducer from "../hooks/useLoggerReducer.ts"

    export function useTaskList(initialTask: Task[]=[]){

        //Las tasks migran a "state.tasks"
        //const [state, dispatch]=useReducer(taskReducer, initialState);

        //Para usar Reducer con Logger
        const [state, dispatch]=useLoggerReducer(taskReducer, initialState);

        //Old method (antes de Reducer)
        //const [tasks, setTasks]=useState<Task[]>([]);

        const [loading, setLoading]=useState(true);
        const [error, setError]=useState<string | null>(null);

        useEffect(()=>{
            loadTasks();
        }, []);

        async function loadTasks(){
            try {
                setLoading(true);
                const data=await api.get("/tasks");
                dispatch({type: "SET_TASKS", payload: data});
            } catch(error) {
                console.error("Can't load tasks. Is json-server running (npx...)?");
            } finally {
                setLoading(false);
            }
        }

        //Old method (JS array as DB)
        //const [tasks, setTasks]=useState<Task[]>(initialTask)

        //Chantal
        //Para el filtro de tareas
        const [filter, setFilter]=useState<"all" | "completed" | "pending">("all");

        // ############################## ksabando ##############################
        //Funcionalidad de búsqueda

        const [search, setSearch]=useState('');

        //

        const filteredTasks=state.tasks.filter(task=>{

            switch(state.filter) {
                case "pending":
                    return !task.completed;
                case "completed":
                    return task.completed;
                case "all":
                    return true;
            }

            /*
            if (filter==="pending") {
                return !task.completed;
            } else if (filter==="completed") {
                return task.completed;
            } else if (filter==="all") {
                return true;
            } else {
                console.log("Unknown error...");
            }
            */

        }).filter(task=>task.title.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b)=>{ //Para mostrar las pending tasks primero (revisar)
                if (a.completed === b.completed){
                    return 0;
                }

                return a.completed ? 1:-1;
            });

        //Old Method: antes de Reducer
        /*
        const filteredTasks=tasks.filter(task=>{
            if (filter==="pending") {
                return !task.completed;
            } else if (filter==="completed") {
                return task.completed;
            } else if (filter==="all") {
                return true;
            } else {
                console.log("Unknown error...");
            }
            }).filter(task=>task.title.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b)=>{ //Para mostrar las pending tasks primero (revisar)
                if (a.completed === b.completed){
                    return 0;
                }

                return a.completed ? 1:-1;
            });
         */

        // ############################################################

        const total=state.tasks.length;
        const pending=state.tasks.filter(t=>!t.completed).length;
        const completed=state.tasks.filter(t=>t.completed).length;

        const createTask = async(task: Task)=>{
            try{
                const createdTask=await api.post("/tasks", task);

                dispatch({type: "ADD_TASK", payload: task});
            } catch (error) {
                console.error(error);
            }
        };

        //Chantal
        const updateTask= async(task: Task)=>{
            try{
                const updatedTask = await api.put(`/tasks/${task.id}`, task);

                {
                    dispatch({type: "UPDATE_TASK", payload: {
                        //Extrae id y data de task
                        id: task.id,
                            data: updatedTask
                    }});
                }
            } catch (error) {
                console.error(error);
            }
        }

        const toggleTask=async (id : string)=> {

            try {

                const task=state.tasks.find(t=>t.id===id);

                if (!task) return;

                const updatedTask=await api.patch(`/tasks/${id}`, {completed: !task.completed});

                dispatch({type: "TOGGLE_TASK", payload: id});
            } catch (error) {
                console.error(error);
            }
        }

        //Old Method: antes de Reducer
        /*
        const total=tasks.length;
        const pending=tasks.filter(t=>!t.completed).length;
        const completed=tasks.filter(t=>t.completed).length;

        const createTask=(tasks : Task)=>setTasks(prev=>[...prev,tasks])

        const createTask = async(task: Task)=>{
            try{
                const createdTask=await api.post("/tasks", task);

                dispatch(prev=>[...prev, createdTask]);
            } catch (error) {
                console.error(error);
            }
        };

        const toggleTask=(id : string)=>
            dispatch(prev=>
            prev.map(t=>(t.id===id ? {...t, completed : !t.completed} : t))
            )
         */

        //ksabando?
        //Eliminar tarea
        const deleteTask= async (id : string)=> {
            try {
                await api.delete(`/tasks/${id}`);

                dispatch({type: "DELETE_TASK", payload: id});
            } catch (error) {
                console.error(error);
            }
        };

        //Chantal
        //ksabando+Chantal
        //[...tasks] crea una copia superficial del array original
        //De alguna forma el bloque .sort logra hacer sort descendente (tasks más recientes primero)
        const visibleTasks=[...state.tasks].filter(task=>{
            switch (state.filter){
                case "completed":
                    return task.completed;
                case "pending":
                    return !task.completed;
                default:
                    return true;
            }
        }).sort(
            (a,b)=>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )


        //Chantal
        const showCompletedTasks=()=> dispatch({type: "SET_FILTER", payload:"completed"});

        const showPendingTasks=()=> dispatch({type: "SET_FILTER", payload:"pending"});

        //Inspired by Chantal
        const showAllTasks=() =>dispatch({type: "SET_FILTER", payload:"all"})

        const [isEditing, setIsEditing]=useState(false);
        const [editingTask, setEditingTask]=useState<Task | null>(null);

        return {
            tasks: state.tasks,
            createTask,
            toggleTask,
            updateTask,
            deleteTask,
            visibleTasks,
            filteredTasks,
            search, setSearch,
            total, pending, completed,
            isEditing, setIsEditing,
            editingTask, setEditingTask,
            showCompletedTasks,
            showPendingTasks,
            showAllTasks,
            loading,
        }
    }