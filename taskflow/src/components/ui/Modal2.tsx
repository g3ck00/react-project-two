//Automatic fixes by IDE (!)

import type {JSX, ReactNode} from "react";

import {createPortal} from "react-dom";

interface ModalProps {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onClose: ()=> void;
}

function Modal({
    isOpen,
    title,
    children,
    onClose,
               }: ModalProps): JSX.Element | null{
    if (!isOpen) return null;

    return createPortal(
        <div className={"modal-overlay"}
             onClick={(e)=>e.stopPropagation()}
             style={{
                 position: "fixed",
                 inset: 0,
                 backgroundColor: "rgba(0,0,0,0.5)",
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 zIndex: 1000,
                 background: "black",
                 padding: "1.5rem",
                 borderRadius: "8px",
                 minWidth: "400px"
             }}
        >

            <div className={"modal2"}
                 onClick={(e) => e.stopPropagation()}
            >
                <header className={"modal-header"}>
                    <h2>{title}</h2>

                    {/*}
                    <button>
                        Guardar cambios [DUMMY]
                    </button>
                    {*/}

                    <button
                        type={"button"}
                        onClick={onClose}
                        aria-label={"Cerrar"}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "1.2rem"
                    }}>
                        ✕
                    </button>
                </header>

                <div className={"modal-body"}>
                    {children}
                </div>
            </div>
        </div>,

        document.body
    )
}

export default Modal;