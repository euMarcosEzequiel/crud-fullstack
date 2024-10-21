import { styled } from "@mui/material";

export const FormUser = styled("form")(() => ({
    display: "flex",
    gap: "20px",
    flexDirection:"column",
    marginBottom: "30px",
}));

export const InputForm = styled("input")(() => ({
    background: "transparent",
    border: "1px solid #000",
    borderRadius: "4px",
    height: "40px",
    fontSize: "1rem",
    padding: "2px 10px",
    color: "#000",
    outline: "none",
}));