import type { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    width?: string | number;
    height?: string | number;
    className?: string;
}

export default function Skeleton({
                                     width = "100%",
                                     height = "1rem",
                                     className = "",
                                     style,
                                     ...props
                                 }: SkeletonProps) {
    return (
        <>
            <style>
                {`
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
                `}
            </style>

            <div
                {...props}
                className={className}
                style={{
                    width,
                    height,
                    borderRadius: "8px",
                    background:
                        "linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite linear",
                    ...style,
                }}
            />
        </>
    );
}