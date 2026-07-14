import type {Task} from "../../types/task";

export const initialState: TaskState={
    tasks: [],
    loading: false,
    error: null,
    filter: 'all',
}

export interface TaskState {
    tasks: Task[],
    loading: boolean,
    error: string | null,
    filter: "all" | "completed" | "pending";
}

export type TaskAction =
    | {type: "SET_TASKS"; payload: Task[]}
    | {type: "ADD_TASK"; payload: Task}
    | {type: "SET_ERROR"; payload: string | null}
    | {type: "SET_LOADING"; payload: boolean}
    | {type: "UPDATE_TASK"; payload: {id:string; data:Partial<Task>}}
    | {type: "DELETE_TASK"; payload: string}
    | {type: "SET_FILTER"; payload: "all" | "completed" | "pending"}
    | {type: "TOGGLE_TASK"; payload: string}

export function taskReducer(state: TaskState, action: TaskAction): TaskState{
    switch(action.type){
        case 'SET_TASKS':
            return {...state,tasks:action.payload, loading: false};

            case 'ADD_TASK':
            return {...state, tasks: [...state.tasks, action.payload]};

            case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(t=>
                t.id===action.payload.id ? {...t, ...action.payload.data} : t
                )}

        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(t=>t.id!==action.payload)
            };

        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks:state.tasks.map(task=>
                task.id===action.payload
                    ? {...task, completed: !task.completed}
                : task
                ),
            };

        case 'SET_LOADING':
            return {...state, loading:action.payload};

        case 'SET_ERROR':
            return {...state, error: action.payload, loading: false};

        case 'SET_FILTER':
            return {...state, filter:action.payload};

        default:
            return state;

    }
}
