import { WebSocketServer } from "ws";
import { db, tread_history } from "@database/main/dist/index.js";


class create_ws_server {
  private WSS: WebSocketServer;

  constructor(server_instance: any) {
    this.WSS = new WebSocketServer({ server: server_instance });
  }
  public start_server() {
    this.WSS.on("connection", (ws) => {
      ws.on("message", async(data) => {        
        ws.send(JSON.stringify(data));
      })
    });
  }
}


export {create_ws_server}