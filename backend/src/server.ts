import Fastify from "fastify";
import cors from "@fastify/cors";
import { usersRoute } from "./routes/usersRoute";

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message });
});

app.get("/", (request, reply) => {
    reply.code(200).send({ message: "Hello world!" });
});

const start = async () => {
    await app.register(cors);
    await app.register(usersRoute);

    try {
        await app.listen({ port: 8080 })
    } catch (err) {
        process.exit(1);
    }
}

start();