import { Kafka, type Consumer } from "kafkajs";
import { config } from "dotenv";
config();

class take_current_tread_price {
  private kafka: Kafka | undefined;
  private price_data: any = {};
  private consumer: Consumer | undefined;

  constructor() {
    this.init_consumer();
  }
  
  public get_price_data_for_symbol(symbol: string , quantity: number) {
    return quantity * this.price_data[symbol].price ;
  }

  // update user price
  private update_price_data(message: any) {
    const symbol = message.s;
    const price = parseFloat(message.c);
    if (isNaN(price)) return;
    if (this.price_data[symbol]) {
      this.price_data[symbol].price = price;
      this.price_data[symbol].timestamp = Date.now();
    } else {
      this.price_data[symbol] = {
        price: price,
        timestamp: Date.now(),
      };
    }
  }
  // kafka consumer consume binance data and  send all data
  private async init_consumer() {
    try {
      const get_consumer = await this.init_kafka(process.env.KAFKA_GROUP_ID!);
      get_consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const data = JSON.parse(message.value!.toString());
          if (!data) return;
          this.update_price_data(data);
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
