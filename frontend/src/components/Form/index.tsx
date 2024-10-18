import React from "react";
import { UserServices } from "../../services/UserServices";
import { newUser } from "../../slices/User/user-slice";
import { dispatch } from "../../store";
import { FormEvent, useRef } from "react";

const userServices = new UserServices();

export function Form() {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);

    async function handleSubmitForm(event: FormEvent){
        event.preventDefault();

        if(!nameRef.current?.value || !emailRef.current?.value) return;

        const response = await userServices.create(nameRef.current?.value, emailRef.current?.value);
        dispatch(newUser(response));
    }

    return(
        <form onSubmit={handleSubmitForm}>
            <input type="text" ref={nameRef} placeholder="Name" />
            <input type="text" ref={emailRef} placeholder="Email" />
            
            <button className="bg-green-700 text-white">Cadastrar</button>
        </form>
    );
}