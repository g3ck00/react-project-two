import {useForm} from "react-hook-form";
import {zodResolver}  from "@hookform/resolvers/zod";

import {taskSchema, type TaskFormData} from "../.././utils/validations";
import Input from "../ui/Input";
import Button from "../ui/Button"

function TaskForm(){
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
    });

    function onSubmit(data: TaskFormData){
        createTask({
            id: crypto.randomUUID(),
            title: data.title,
            description: data.description ?? "",
            completed: false,
            createdAt: new Date()
        });

        reset();
    }
}

export default TaskForm;