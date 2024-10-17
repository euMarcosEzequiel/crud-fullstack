import { useEffect, useState, useRef, FormEvent } from "react";
import IconTrash from '@mui/icons-material/DeleteForever';
import { UserServices } from "@/services/UserServices";

const userServices = new UserServices();

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
        const response = await userServices.getUsers();

        setUsers(response);
    }


    async function handleSubmitForm(event: FormEvent){
        event.preventDefault();

        if(!userNameRef.current?.value || !userEmailRef.current?.value) return;

        await userServices.create(userNameRef.current?.value, userEmailRef.current?.value);

        userNameRef.current.value = "";
        userEmailRef.current.value = "";

        getUsers();
    }

    async function handleDelete(id: string){
        await userServices.delete(id);
        
        getUsers();

        // const allUsers = users.filter( (user) => user.id !== id );
        // setUsers(allUsers);
    }

    return(
        <div className="w-full h-full flex flex-col box-border p-4">
            <h1 className="text-3xl font-bold px-6 py-4 mb-6 rounded-lg">Users</h1>
            <div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
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