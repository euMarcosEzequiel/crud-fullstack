import { useEffect, useState, useRef, FormEvent } from "react";
import IconTrash from '@mui/icons-material/DeleteForever';
import {api} from "@/api/api";

interface UsersProps{
    id: string,
    name: string,
    email: string,
    status: boolean,
}

export default function Users(){
    
    const [users, setUsers] = useState<UsersProps[]>([]);

    const userNameRef = useRef<HTMLInputElement | null>(null);
    const userEmailRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        const response = await api.get("/users");
        setUsers(response.data);
    }

    async function createUser(nameUser: string, emailUser: string) {
        const response = await api.post("/user", {
            name: nameUser,
            email: emailUser,
        });
        
        return response.data;
    }

    async function handleSubmitForm(event: FormEvent){
        event.preventDefault();
        if(!userNameRef.current?.value || !userEmailRef.current?.value) return;

        const response = await createUser(userNameRef.current?.value, userEmailRef.current?.value);
        setUsers(allUsers => [...allUsers, response]);

        userNameRef.current.value = "";
        userEmailRef.current.value = "";
    }

    async function handleDelete(id: string){
        await api.delete("/user", {
            params:{
                id: id
            }
        });

        const allUsers = users.filter( (user) => user.id !== id );
        setUsers(allUsers);
    }

    return(
        <div className="w-full h-full flex flex-col box-border p-4">
            <h1 className="text-3xl font-bold bg-neutral-800 px-6 py-4 mb-6 rounded-lg">Users</h1>
            <div className="bg-neutral-800">
                <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
                    <input type="text" ref={userNameRef} placeholder="Name"/>
                    <input type="text" ref={userEmailRef} placeholder="Email"/>
                    <input type="submit" value="Add+" className="bg-green-500"/>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.status ? "Ativo" : "Inativo"}</td>
                                <td>
                                    <button onClick={ () => handleDelete(user.id)}>
                                        <IconTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}