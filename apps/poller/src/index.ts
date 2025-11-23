import WebSocket, { WebSocketServer } from "ws";

// Your Binance combined stream
const binanceStreamUrl =
  "wss://stream.binance.com:9443/stream?streams=" +
  [
    "adausdt@ticker",
    "bnbusdt@ticker",
    "btcusdt@ticker",
    "ethusdt@ticker",
    "solusdt@ticker",
    "xrpusdt@ticker",
  ].join("/");

console.log("🚀 Local WS server running on ws://localhost:9000");

// Connect to Binance WebSocket
const binanceWS = new WebSocket(binanceStreamUrl);

binanceWS.on("open", () => {
  console.log("🔗 Connected to Binance WebSocket");
});

// Listen to Binance messages
binanceWS.on("message", (raw) => {
  const msg = JSON.parse(raw.toString());

  // Broadcast to all clients connected to your WS server
  console.log(msg);
});

// Handle Binance disconnects
binanceWS.on("close", () => {
  console.log("❌ Binance WebSocket closed");
});
