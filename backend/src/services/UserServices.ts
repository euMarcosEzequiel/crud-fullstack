import prismaClient from "../prisma";

interface UserServicesProps{
    id?: string,
    name: string,
    email: string,
    status?: boolean,
    created_at?: Date,
    updated_at?: Date,
}

class UserServices {
    
    async findAllUsers(){
        try {
            const users = await prismaClient.user.findMany();
            return users;   
        } catch (error) {
            throw new Error("Error finding all users! \n" + error);
        }
    }

    async findUser(idUser: string){
        try {
            if(idUser){
                const user = await prismaClient.user.findFirst({
                    where: {
                        id: idUser,
                    }
                });

                return user;
            }
            else{
                throw new Error("Error finding user, enter an ID!");
            }
        } catch (error: any) {
            throw Error(error);
        }
    }

    async createUser({name, email} : UserServicesProps){
        try {
            if(name && email){
                const user = await prismaClient.user.create({
                    data: {
                        name, 
                        email, 
                        status: true,
                    }
                });
    
                return user;
            }
            else{
                throw new Error("Error registering new user!, fill in all fields!");
            }
        } catch (error: any) {
            throw Error(error);
        }
    }

    async updateUser(idUser: string, {name, email, status} : UserServicesProps){
        try {
            if(idUser){
                const user = await this.findUser(idUser);

                if(name && email && status){
                    const userUpdate = await prismaClient.user.update({
                        where: {
                            id: user?.id,
                        },
                        data: {
                            name: name,
                            email: email,
                            status: status,
                            updated_at: new Date()
                        }
                    });
    
                    return userUpdate;
                }
                else{
                    throw new Error("Error updating new user!, fill in all fields!");
                }
            }
            else{
                throw new Error("Error updating user, enter an ID!");
            }
        } catch (error: any) {
            throw Error(error);
        }
    }

    async deleteUser(idUser: string){
        try {
            if(idUser){
                const user = await this.findUser(idUser);
                
                await prismaClient.user.delete({
                    where: {
                        id: user?.id,
                    }
                });

                return { message: "User successfully deleted" };
            }
            else{
                throw new Error("Error deleting user, enter an ID!");
            }
        } catch (error: any) {
            throw Error(error)
        }
    }
}

export { UserServices };