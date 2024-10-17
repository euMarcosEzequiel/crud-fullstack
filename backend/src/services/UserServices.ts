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
            throw new Error("Error finding all users! " + error);
        }
    }

    private async findUser(idUser: string){
        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    id: idUser,
                }
            });
            return user;

        } catch (error: any) {
            throw new Error("Error finding user! " + error);
        }
    }

    async createUser({name, email} : UserServicesProps){
        try {
            await prismaClient.user.create({
                data: {
                    name, 
                    email, 
                    status: true,
                }
            });
            return { message: "User registered successfully!"};

        } catch (error: any) {
            throw Error("Error creating user! " + error);
        }
    }

    async updateUser(idUser: string, {name, email, status} : UserServicesProps){
        try {
            const user = await this.findUser(idUser);
            await prismaClient.user.update({
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
            return { message: "User updated successfully! "};

        } catch (error: any) {
            throw Error("Error updating user!" + error);
        }
    }

    async deleteUser(idUser: string){
        try {
            const user = await this.findUser(idUser);
                
            await prismaClient.user.delete({
                where: {
                    id: user?.id,
                }
            });
            return { message: "User deleted successfully!" };
            
        } catch (error: any) {
            throw Error("Error when deleting user! " + error);
        }
    }
}

export { UserServices };