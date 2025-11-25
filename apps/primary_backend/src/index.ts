import init_express_server from "./app.js";
import {create_ws_server} from "./web_socket_server/index.js"
import {config} from "dotenv"

config()

const server = new init_express_server()

const express_instance =  server.start_server(Number(process.env.PORT  || 3000));
new create_ws_server(express_instance).start_server()

