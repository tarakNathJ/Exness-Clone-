import { Kafka } from "kafkajs";
import { config } from "dotenv";
config();

class engine {

  private kafka: Kafka;
  public save_data : any = {};

  constructor() {
    this.kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID!,
      brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
    });
  }

  public async kafka_start() {
    const consumer = this.kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID! });
    await consumer.connect();
    await consumer.subscribe({ topic:process.env.KAFKA_TOPIC!, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value?.toString(),
        });


        consumer.commitOffsets([
          {
            topic,
            partition,
            offset: (Number(message.offset) + 1).toString(),
          },
        ]);
      },


    });
  }

 

}

const engine_start = new engine();

engine_start.kafka_start();


