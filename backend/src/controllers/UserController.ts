import { FastifyRequest, FastifyReply } from "fastify";
import { UserServices } from "../services/UserServices";

const userServices = new UserServices();

class UserController{
    
    async getUsers(request: FastifyRequest, reply: FastifyReply){
        const users = await userServices.findAllUsers();
        reply.send(users);
    }

    async getUser(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.query as { id: string };
        const user = await userServices.findUser(id);
        reply.send(user);
    }

    async create(request: FastifyRequest, reply: FastifyReply){
        const data = request.body as { name: string, email: string };
        const user = await userServices.createUser(data);
        reply.send(user);
    }

    async update(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.query as { id: string };
        const data = request.body as { name: string, email: string, status: boolean }
        const user = await userServices.updateUser(id, data);
        reply.send(user);
    }

    async delete(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.query as { id: string };
        const user = await userServices.deleteUser(id);
        reply.send(user);
    }
}

export { UserController };