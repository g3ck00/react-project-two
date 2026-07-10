//Automatic fixes by IDE (!)

import type {JSX, ReactNode} from "react";

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

    return (
        <div className={"modal-overlay"} onClick={onClose}
             style={{
                 position: "fixed",
                 inset: 0,
                 backgroundColor: "rgba(0, 0, 0, 0.5)",
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 zIndex: 1000,
             }}
             >

            <div className={"modal"}
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
                        aria-label={"Cerrar"}>
                        Cerrar
                    </button>
                </header>

                <div className={"modal-body"}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;