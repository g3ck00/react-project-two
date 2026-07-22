import type {Task} from "./types/task.ts";

export { Button } from './components/ui/Button.tsx'
export { Input } from './components/ui/Input.tsx'
export { Input2 } from './components/ui/Input2.tsx'

//Pick -> escoger tipos específicos
//Omit -> omitir tipos específicos
//Partial -> especificar tipos opcionales
//Record -> ...?

type TaskCardProps = Pick<Task, 'id' | 'title' | 'priority'>;

//Nada, no hay, no existe
//type CreateTaskInput=Omit<Task, 'id'>;
//type UpdateTaskInput=Partial<Task>;

type Record<TaskStatus, number>


