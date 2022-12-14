import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";

const io = new Server();

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.emit("hello", "world");
  socket.on("echo", (arg1, callback) => {
    console.log(arg1);
    socket.emit("echo", `server echo to ${arg1}`);
    if (typeof callback === "function") {
      callback({
        status: `ok, got ${arg1}`,
      });
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

await serve(io.handler(), {
  port: 3000,
});
