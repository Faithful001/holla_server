import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST", "PUT", "DELETE"],
	},
});

io.on("connection", (socket) => {
	console.log(socket);

	socket.on("disconnect", () => {
		console.log("User disconnected", socket.id);
	});
});

server.listen(3001, () => {
	console.log("Server running on port 3001");
});
