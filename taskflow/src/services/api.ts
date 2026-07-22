import axios from "axios";

const api=axios.create({
    baseURL: "http://localhost:3001",
    //baseURL: "http://localhost:8080/api", // Backend Spring
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    //Leer token de localStorage
    //Agregar Authorization: Bearer ${token} a toda request
    (config)=>{
        const token=localStorage.getItem("token");

        if (token){
            config.headers.Authorization=`Bearer ${token}`;
        }

        return config;
    },
    (error)=>Promise.reject(error)
);

api.interceptors.response.use(
    (response)=>response.data,
    (error)=>Promise.reject(error)
)

export interface ApiResponse<T>{
    data: T;
    message: string;
    success: boolean;
}

export default api;