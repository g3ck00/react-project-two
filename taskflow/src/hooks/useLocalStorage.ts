import {useState} from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T)=> void]{
    const [value, setValue]=useState<T>(()=>{
        const storedValue=localStorage.getItem(key);

        if (storedValue){
            return JSON.parse(storedValue);
        }

        return initialValue;
    });

    const setStoredValue=(newValue: T)=>{
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
        console.log(localStorage);
    };

    return [value, setStoredValue];
}