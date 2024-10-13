import { 
    FastifyInstance, 
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply,
} from "fastify";
import { UserController } from "../controllers/UserController";
import { request } from "http";

const userController = new UserController();

async function usersRoute(fastify: FastifyInstance, options: FastifyPluginOptions){

    fastify.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.getUsers(request, reply);
    });

    fastify.get("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.getUser(request, reply);
    });

    fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.create(request, reply);
    });

    fastify.put("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.update(request, reply);
    });

    fastify.delete("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.delete(request, reply);
    });
}

export { usersRoute };