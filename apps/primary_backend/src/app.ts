import express from "express";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import route from "./routes/index.route.js";
import { PrometheusService } from "@express/monitoring";

config();

export const metrics = new PrometheusService();
class init_express_server {
  private app: express.Application = express();

  constructor() {

   
    this.app.use(express.json({ limit: "10mb" }));

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

    //////////////////// metrics //////////////////////////////
    this.app.use((req, res, next) => {
      const end = metrics.req_res_time.startTimer();
      res.on("finish", () => {
        end({
          method: req.method,
          route: req.route?.path || req.path,
          status_code: res.statusCode,
        });
      });
      next();
    });

    // Health check endpoint - BEFORE routes
    this.app.get("/health", (req, res) => {
      res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
      });
    });

    this.app.use("/api", route);

    this.app.get("/metrics", async (req, res) => {
      try {
        res.set("Content-Type", metrics.registry.contentType);
        const data = await metrics.registry.metrics();
        res.send(data);
      } catch (err: any) {
        res.status(500).send(`Error collecting metrics: ${err.message}`);
      }
    });

  }

  public start_server(PORT: number): any {
    const server = this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
   
    });
    return server;
  }
}
export default init_express_server;

