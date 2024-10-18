import { api } from "../api/api";
import { toast } from "react-toastify";

class UserServices{
    async getUsers(){
        try {
            const response = await api.get("/users");
            return response.data;

        } catch (error) {
            console.log(error);
            toast.error("Error finding all users!");
        }
    }

    async create(name: string, email: string){
        try {
            const response = await api.post("/user", {
                name: name,
                email: email,
            });

            toast.success(response.data.message);
            return response.data.user;

        } catch (error) {
            console.log(error);
            toast.error("Error creating user!");
        }
    }

    async delete(id: string){
        try {
            const response = await api.delete("/user", {
                params:{
                    id: id,
                }
            });
            toast.success(response.data.message);
            
        } catch (error) {
            console.log(error);
            toast.error("Error deleting user!");
        }
    }
}

export { UserServices };