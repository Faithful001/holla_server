import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());

const corsOptions: object = {
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

const server = http.createServer(app);

const io = new Server(server, {
	cors: corsOptions,
});

io.on("connection", (socket) => {
	console.log(socket.id);

	socket.on("join_room", (data) => {
		socket.join(data);
		console.log(data);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected", socket.id);
	});
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
