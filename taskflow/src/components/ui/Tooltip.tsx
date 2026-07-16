import {
    useState,
    useRef,
    useEffect,
    type ReactNode,
    type JSX,
} from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
    text: string;
    children: ReactNode;
}

function Tooltip({
                     text,
                     children,
                 }: TooltipProps): JSX.Element {

    const [visible, setVisible] = useState(false);

    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    const timeoutRef = useRef<number | null>(null);

    const handleMouseEnter = () => {
        timeoutRef.current = window.setTimeout(() => {
            setVisible(true);
        }, 300);
    };

    const handleMouseLeave = () => {

        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        setVisible(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        setPosition({
            x: e.clientX + 15,
            y: e.clientY + 15,
        });
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{
                    display: "inline-block",
                }}
            >
                {children}
            </span>

            {visible &&
                createPortal(
                    <div
                        style={{
                            position: "fixed",
                            left: position.x,
                            top: position.y,
                            background: "#222",
                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            maxWidth: "250px",
                            zIndex: 9999,
                            pointerEvents: "none",
                            boxShadow: "0 4px 10px rgba(0,0,0,.25)",
                            transition: "opacity .2s",
                        }}
                    >
                        {text}
                    </div>,
                    document.body
                )}
        </>
    );
}

export default Tooltip;