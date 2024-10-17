import { FastifyRequest, FastifyReply } from "fastify";
import { UserServices } from "../services/UserServices";

const userServices = new UserServices();

class UserController{
    
    async getUsers(request: FastifyRequest, reply: FastifyReply){
        const users = await userServices.findAllUsers();
        reply.send(users);
    }

    // async getUser(request: FastifyRequest, reply: FastifyReply){
    //     const { id } = request.query as { id: string };
    //     const user = await userServices.findUser(id);
    //     reply.send(user);
    // }

    async create(request: FastifyRequest, reply: FastifyReply){
        const data = request.body as { name: string, email: string };

        if(Object.keys(data).length == 0 || (!data.name || !data.email)){
            reply.code(400).send({ message: "Error creating user: fill in all the data!"});
        }
        else{
            const response = await userServices.createUser(data);
            reply.send(response);
        }
    }

    async update(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.query as { id: string };
        const data = request.body as { name: string, email: string, status: boolean };

        if(!id){
            reply.code(400).send({ message: "Error updating user: enter an id!" });
        }
        else if(Object.keys(data).length == 0 || (!data.name || !data.email)){
            reply.code(400).send({ message: "Error updating user: fill in all the data!" })
        }
        else{
            const response = await userServices.updateUser(id, data);
            reply.send(response);
        }
    }

    async delete(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.query as { id: string };

        if(!id){
            reply.code(400).send({ message: "Error when deleting user: enter an id!" });
        }
        else{
            const response = await userServices.deleteUser(id);
            reply.send(response);
        }
    }
}

export { UserController };