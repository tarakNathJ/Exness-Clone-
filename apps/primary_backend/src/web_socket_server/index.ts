import { WebSocketServer } from "ws";

class create_ws_server {
  private WSS: WebSocketServer;

  constructor(server_instance: any) {
    this.WSS = new WebSocketServer({ server: server_instance });
  }
  public start_server() {
    this.WSS.on("connection", (ws) => {
      ws.on("message", (data) => {
        ws.send( JSON.stringify(JSON.parse(data.toString())))
      })
    });
  }
}


export {create_ws_server}