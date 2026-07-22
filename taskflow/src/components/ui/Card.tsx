import {forwardRef, Suspense} from "react";
import CardSkeleton from "./CardSkeleton.tsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string
    as?: React.ElementType;s
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            as: Component = "div",
            children,
            className = "",
            ...rest
        },
        ref
    ) => {
        return (
            <>

            <Component
                ref={ref}
                className={`card ${className}`}
                {...rest}
            >
                {children}
            </Component>

            </>
        );
    }
);

export default Card