export interface Task {
    id: string,
    title: string,
    description: string,
    completed: boolean,
    createdAt: string, //ISO 8601
    priority?: 'low' | 'medium' | 'high',
    tags?: string[];
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt'>;