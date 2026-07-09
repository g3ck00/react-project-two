import {forwardRef} from "react";

import {useId} from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label?: string
    error?: string
}

const Input=forwardRef<HTMLInputElement, InputProps>(
    ({label, error, className='',...props},ref)=>{

        const inputId=useId();

        const errorId=`${inputId}-error`;

        return(
            <div className={"input-group"}>

                <label
                    htmlFor={inputId}>Label de prueba
                </label>

                {/*} {label && <label htmlFor={inputId}>{label}</label>} {*/}

                    <input
                        id={inputId}
                        ref={ref}
                        className={'input ${className}'}
                        {...props}
                        aria-invalid={!!error}
                        aria-describedby={error?errorId:undefined}
                    />

                {error &&
                    <span
                        id={errorId}
                        className="input-error"
                    >
                        {error}
                    </span>}
            </div>
        )
    }
)

Input.displayName='Input'

export default Input