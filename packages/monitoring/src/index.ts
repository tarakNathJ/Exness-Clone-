import type { Request, Response, NextFunction } from "express";

import promClient from "prom-client";

import { config } from "dotenv";
config();

// metrix collect

const req_res_time = new promClient.Histogram({
  name:"http_express_req_res_time",
  help:"this tells how much time is taken by rreq and res",
  labelNames: ["method","route","status_code"],
  buckets: [ 1 ,30,50, 120, 200 ,400, 500, 800 ,1000, 2000]
});



const server_register = new promClient.Registry();
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register: promClient.register });

const metrix_handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.set("Content-Type", promClient.register.contentType);
  return res.send(await promClient.register.metrics());
};

function create_job_metrics(job_name: string) {
  if (!/^[a-zA-Z_:][a-zA-Z0-9_:]*$/.test(job_name)) {
    throw new Error(
      `Invalid job_name "${job_name}". Metric names must match /^[a-zA-Z_:][a-zA-Z0-9_:]*$/`
    );
  }

  const register = new promClient.Registry();

  const gateway = new promClient.Pushgateway(
    process.env.CLIENT_URL!,
    {},
    register
  );

  const job_counter = new promClient.Counter({
    name: `${job_name}_runs_total`,
    help: `total number of runs fro job ${job_name}`,
    registers: [register],
  });
  const job_duration = new promClient.Histogram({
    name: `${job_name}_duration_seconds`,
    help: `duration of job ${job_name}`,
    registers: [register],
    buckets: [0.1, 0.5, 1, 1.5, 2, 5, 10, 30],
  });

  return {
    job_counter,
    job_duration,
    push: async () => {
      try {
        await gateway.pushAdd({ jobName: job_name });
        console.log(` Metrics pushed for job: ${job_name}`);
      } catch (err: any) {
        console.error("Failed to push metrics:", err.message);
      }
    },
  };
}

export {

  metrix_handler,
  create_job_metrics,
  server_register,
  req_res_time
};