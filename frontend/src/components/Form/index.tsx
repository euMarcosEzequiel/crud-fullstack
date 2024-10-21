import React, { useState } from "react";
import { UserServices } from "../../services/UserServices";
import { newUser } from "../../slices/User/user-slice";
import { dispatch } from "../../store";
import { FormEvent, useRef } from "react";
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { FormUser, InputForm } from "./styles";

const userServices = new UserServices();

export function Form() {
    const [formIsOpen, setFormIsOpen] = useState(true);

    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault();

        if(!nameRef.current?.value || !emailRef.current?.value) return;

        const response = await userServices.create(nameRef.current?.value, emailRef.current?.value);
        dispatch(newUser(response));

        nameRef.current.value = "";
        emailRef.current.value = "";
    }

    const handleForm = () => {
        setFormIsOpen(!formIsOpen);
    }

    return(
        <Box sx={{ background: "white", borderRadius: "4px", padding: "2rem"}}>
            <Box sx={{ display: formIsOpen ? "block" : "none"}}>
                <FormUser onSubmit={handleSubmitForm}>
                    <InputForm type="text" ref={nameRef} placeholder="Name" />
                    <InputForm type="text" ref={emailRef} placeholder="Email" />
                    <Button type="submit" variant="contained" color="success">
                        Cadastrar
                    </Button>
                </FormUser>
            </Box>
            <Box>
                <Button onClick={handleForm} variant={ formIsOpen ? "outlined" : "contained" } color={ formIsOpen ? "error" : "success"}>
                    {formIsOpen ? "Cancel" : "Add+"}
                </Button>
            </Box>
        </Box>
    );
}