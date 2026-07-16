import {useContext, useEffect, useState} from "react";
import {TaskContext} from "../context/TaskContext.tsx";
import useLoggerReducer from "./useLoggerReducer.ts";
import {initialState, taskReducer} from "../components/reducers/taskReducer.ts";
import api from "../services/api.ts";
import type {Task} from "../types/task.ts";
import {useLocalStorage} from "./useLocalStorage.ts";

export function useTasks(){

    //Las tasks migran a "state.tasks"
    //const [state, dispatch]=useReducer(taskReducer, initialState);

    //Para usar Reducer con Logger
    //const [state, dispatch]=useLoggerReducer(taskReducer, initialState);

    const context = useContext(TaskContext);

    if (!context){
        throw new Error("useTasks must be used within a TaskProvider...");
    }

    const {state, dispatch} = context;

    const {tasks, loading, error, filter}=state;

    //const [loadingDummy, setLoading]=useState(true);

    // ==================== Load Tasks ====================

    async function loadTasks(){
        try {
            dispatch({type: "SET_LOADING", payload: true});
            const data=await api.get("/tasks");
            dispatch({type: "SET_TASKS", payload: data});
        } catch(error) {
            console.error("Can't load tasks. Is json-server running (npx...)?");
        } finally {
            dispatch({type: "SET_LOADING", payload: false});
        }
    }

    useEffect(()=>{
        loadTasks();
    }, []);

    // ============================================================

    // ==================== Funcionalidad de búsqueda ====================

    const {search}=state;

    const setSearch=(search: string)=>dispatch({
        type: "SET_SEARCH",
        payload: search,
    });

    // ============================================================

    const filteredTasks=tasks.filter(task=>{

        switch(filter) {
            case "pending":
                return !task.completed;
            case "completed":
                return task.completed;
            case "all":
                return true;
        }
    }).filter(task=>task.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b)=>{ //Para mostrar las pending tasks primero (revisar)
            if (a.completed === b.completed){
                return 0;
            }

            return a.completed ? 1:-1;
        });

    const total=state.tasks.length;
    const pending=state.tasks.filter(t=>!t.completed).length;
    const completed=state.tasks.filter(t=>t.completed).length;

    // ==================== Create Task ====================

    const createTask = async(task: Task)=>{
        try{
            const createdTask=await api.post("/tasks", task);

            dispatch({type: "ADD_TASK", payload: createdTask});
        } catch (error) {
            console.error(error);
        }
    };

    // ============================================================

    // ==================== Update Task ====================

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

    // ============================================================

    // ==================== Delete Task ====================

    const deleteTask= async (id : string)=> {
        try {
            await api.delete(`/tasks/${id}`);

            dispatch({type: "DELETE_TASK", payload: id});
        } catch (error) {
            console.error(error);
        }
    };

    // ============================================================

    // ==================== Toggle Task ====================

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

    // ============================================================

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

    const showCompletedTasks=()=> dispatch({type: "SET_FILTER", payload:"completed"});

    const showPendingTasks=()=> dispatch({type: "SET_FILTER", payload:"pending"});

    const showAllTasks=() =>dispatch({type: "SET_FILTER", payload:"all"});

    const [isEditing, setIsEditing]=useState(false);
    const [editingTask, setEditingTask]=useState<Task | null>(null);

    // ==================== useLocalStorage ====================

    const [name, setName]=useLocalStorage("name", "")

    // ============================================================

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
        filter,
        name, setName,
    }
}