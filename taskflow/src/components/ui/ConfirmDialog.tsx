import type { JSX } from "react";
import Modal2 from "./Modal2";

interface ConfirmDialogProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
}

function ConfirmDialog({
                           isOpen,
                           onConfirm,
                           onCancel,
                           title,
                           message,
                       }: ConfirmDialogProps): JSX.Element | null {

    return (
        <Modal2
            isOpen={isOpen}
            title={title}
            onClose={onCancel}
        >

            <p>{message}</p>

            <div>
                <button
                    onClick={onConfirm}
                    style={{
                        backgroundColor: "red",
                        color: "white"
                    }}
                >
                    Delete
                </button>

                <button
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>

        </Modal2>
    );
}

export default ConfirmDialog;