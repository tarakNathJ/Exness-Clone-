import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import { Kafka, type Consumer } from "kafkajs";
import { config } from "dotenv";

config();

interface client {
  socket: WebSocket;
  id: number;
}

class web_socket_server {
  private clients: Map<number, client> = new Map();
  private app = express();
  private WSS;
  private count: number = 0;
  private consumer: Consumer | undefined;

  // init websocket server 
  constructor(port: number) {
    const server = this.app.listen(port, () => {
      console.log(`server start at ${port}`);
    });
    this.WSS = new WebSocketServer({ server: server });
    this.init_consumer();
  }

  // kafka consumer consume binance data and  send all data
  private async init_consumer() {
    try {
      const get_consumer = await this.init_kafka(process.env.KAFKA_GROUP_ID!);
      get_consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const data = JSON.parse(message.value!.toString());
          if (!data) return;
          

          this.clients.forEach((client) => {
            client.socket.send(JSON.stringify(data));
          });

          get_consumer.commitOffsets([
            {
              topic,
              partition,
              offset:(Number(message.offset) + 1).toString() ,
            },
          ]);
        },
      });
    } catch (error: any) {
      console.error("Error initializing consumer:", error.message);
      throw Error(error.message);
    }
  }

  //   init kafka
  private async init_kafka(group_id: string) {
    try {
      if (this.consumer) return this.consumer;

      const kafka_init = new Kafka({
        clientId: process.env.KAFKA_CLIENT_ID!,
        brokers: [process.env.KAFKA_BROKER!],
      });
      this.consumer = kafka_init.consumer({ groupId: group_id });
      await this.consumer.connect();
      await this.consumer.subscribe({
        topic: process.env.KAFKA_TOPIC!,
        fromBeginning: true,
      });

      return this.consumer;
    } catch (error: any) {
      console.error("Error initializing Kafka:", error.message);
      throw error;
    }
  }


  // ws connection 
  public start() {
    this.WSS.on("connection", (ws) => {
      this.count = this.count + 1;
      ws.on("message", (data) => {
        // chack message are exist or  not
        let message;
        try {
          message = JSON.parse(data.toString());
        } catch (error) {
          console.error("Error parsing message:", error);
          ws.send(
            JSON.stringify({
              type: "error",
              error: "Invalid message format",
            })
          );
        }

        // chack message type
        if (!message.type) {
          ws.send(
            JSON.stringify({
              type: "error",
              error: "Invalid message format: type property missing",
            })
          );
          return;
        }

        try {
          switch (message.type) {
            case "join":
              this.clients.set(this.count, {
                id: this.count,
                socket: ws,
              });
              console.log("user join", this.count);
              break;

            default:
              break;
          }
        } catch (error) {
          console.error("Error handling request:", error);
          ws.send(
            JSON.stringify({
              type: "error",
              error: "Internal server error",
            })
          );
        }
      });
      ws.on("close", () => {
        // Remove client when disconnected
        this.clients.forEach((client, id) => {
          if (client.socket === ws) {
            this.clients.delete(id);
            console.log(`Client disconnected ID=${id}`);
          }
        });
      });
    });
  }
}

const port =process.env.PORT
if(!port) throw new Error("port not found")
new web_socket_server(parseInt(port)).start();
