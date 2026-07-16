import {useRef, useState} from "react";
import {useDebounce} from "../hooks/useDebounce.ts";
import {useTasks} from "../hooks/useTasks.ts";

import Modal2 from "../components/ui/Modal2.tsx";
import Button from "../components/ui/Button.tsx";

export default function Home() {

    const {
        name, setName,
    } = useTasks();

    const [text, setText]=useState("");

    const debouncedWrite=useDebounce(text, 1000);

    const [isOpenModal2, setIsOpenModal2] = useState(false);

        const inputRef=useRef<HTMLInputElement>(null);

    return (
        <>
            <h1>Lab</h1>

            {/* ==================== useLocalStorage ==================== */}

            <p>useLocalStorage</p>

            <input value={name}
                   onChange={e => setName(e.target.value)}/>

            {/* ============================================================ */}

            {/* ==================== useDebounced ==================== */}

            <p>useDebounced</p>

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write here..."
            />

            <input
                value={debouncedWrite}
                placeholder={"Must be replicated here in 1 second..."}
                readOnly
            />

            {/* ============================================================ */}

            {/* ==================== Modal2 ==================== */}

            <br></br>
            <br></br>
            <Button onClick={()=>setIsOpenModal2(true)}>
                Modal2
            </Button>

            <Modal2
                isOpen={isOpenModal2}
                title={"Dummy Modal"}
                onClose={()=>setIsOpenModal2(false)}>

                This is a Dummy Modal.
            </Modal2>

            {/* ============================================================ */}

            {/* ==================== useRef ==================== */}

            <br/><br/>

            <label onMouseEnter={()=>inputRef.current?.focus()}
                   style={{cursor: "pointer"}}>
                {"useRef "}
            </label>

            <input ref={inputRef}
                   placeholder={"When mouse is over that label, this textbox must be focus..."}
            />

            {/* ============================================================ */}
        </>
    )
}