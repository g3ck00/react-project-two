    import {useCallback, useState} from 'react'
    import type {Task} from '../types/task'

    export function useTaskList(initialTask: Task[]=[]){
        const [tasks, setTasks]=useState<Task[]>(initialTask)

        //Chantal
        //Para el filtro de tareas
        const [filter, setFilter]=useState<"all" | "completed" | "pending">("all");

        // ############################## ksabando ##############################
        //Funcionalidad de búsqueda

        const [search, setSearch]=useState('');

        const filteredTasks=tasks.filter(task=>{
            if (filter==="pending") return !task.completed;
            if (filter==="completed") return task.completed;

            return true;
    }).filter(task=>task.title.toLowerCase().includes(search.toLowerCase()))

        // ############################################################

        const total=tasks.length;
        const pending=tasks.filter(t=>!t.completed).length;
        const completed=tasks.filter(t=>t.completed).length;

        const addTask=(tasks : Task)=>setTasks(prev=>[...prev,tasks])

        const toggleTask=(id : string)=>
            setTasks(prev=>
            prev.map(t=>(t.id===id ? {...t, completed : !t.completed} : t))
            )

        //Chantal
        const updateTask=useCallback(
            (id: string, updates: Partial<Task>)=>{
                setTasks(prev=>
                prev.map(tasks=>
                tasks.id===id
                ? {...tasks, ...updates}
                : tasks
                )
            );
            },
            []
        )

        //ksabando?
        //Eliminar tarea
        const deleteTask=(id : string)=>
            //setTasks(prev=>prev.filter(t=>t.id!==id))
            setTasks(prevTasks=>prevTasks.filter(task=>task.id!==id))

        //Chantal
        //ksabando+Chantal
        //[...tasks] crea una copia superficial del array original
        //De alguna forma el bloque .sort logra hacer sort descendente (tasks más recientes primero)
        const visibleTasks=[...tasks].filter(task=>{
            switch (filter){
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
        const showCompletedTasks=()=> setFilter("completed");

        const showPendingTasks=()=> setFilter("pending");

        //Inspired by Chantal
        const showAllTasks=() =>setFilter("all")

        //chantal
        const getStats=useCallback(()=>{
            const completed=tasks.filter(task=>task.completed).length;

            const pending=tasks.length - completed;

            return{
                total: tasks.length, completed, pending,
            };
        }, [tasks]);

        return {
            tasks,
            addTask,
            toggleTask,
            updateTask,
            deleteTask,
            visibleTasks,
            filteredTasks,
            search, setSearch,
            total, pending, completed,
            showCompletedTasks,
            showPendingTasks,
            showAllTasks
        }
    }