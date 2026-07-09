    import {useCallback, useState} from 'react'
    import type {Task} from '../types/task'

    export function useTaskList(initialTask: Task[]=[]){
        const [tasks, setTasks]=useState<Task[]>(initialTask)

        const addTask=(tasks : Task)=>setTasks(prev=>[...prev,tasks])

        const toggleTask=(id : string)=>
            setTasks(prev=>
            prev.map(t=>(t.id===id ? {...t, completed : !t.completed} : t))
            )

        //chantal
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
        const showCompletedTasks=useCallback(()=>{
            setTasks(prev=>prev.filter(tasks=>tasks.completed));
        },[])

        //Inspired by Chantal
        const showPendingTasks=useCallback(()=>{
            setTasks(prev=>prev.filter(tasks=>!tasks.completed))
        }, [])

        //Inspired by Chantal
        const showAllTasks=useCallback(()=>{
            setTasks()
        }, [])

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
            showCompletedTasks,
            showPendingTasks,
            showAllTasks
        }
    }