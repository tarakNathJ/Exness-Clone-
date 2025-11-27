import init_express_server from "./app.js";
import {create_ws_server} from "./web_socket_server/index.js"
import {config} from "dotenv"
import {kafka_instance } from './utils/curent_stock_price.js'

config()

const server = new init_express_server()

const express_instance =  server.start_server(Number(process.env.PORT  || 3000));
// new create_ws_server(express_instance).start_server()
new kafka_instance( process.env.KAFKA_GROUP_ID!, process.env.KAFKA_TOPIC!).init_consumer();