import { Kafka, type Consumer } from "kafkajs";
import { config } from "dotenv";
import {set_curent_price }from "../controller/auth.controller.js"
config();

class take_current_tread_price {
  private kafka: Kafka | undefined;
  private price_data: any = {};
  private consumer: Consumer | undefined;

  constructor() {
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
          ////////////////////////////update price //////////////////
          set_curent_price(data.data.s,parseFloat(data.data.c))    
          ///////////////////////////////end/////////////////////////
          get_consumer.commitOffsets([
            {
              topic,
              partition,
              offset: (Number(message.offset) + 1).toString(),
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
}

export { take_current_tread_price };
