import { Channel, ChannelModel, connect } from "amqplib";
import { env } from "../../config/env.config";
import { IMessageQueueProvider } from "./IMessageQueueProvider";

export class RabbitMQProvider implements IMessageQueueProvider {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;

  private url = env.RABBITMQ_URL;

  private async connect(): Promise<void> {
    if (this.connection && this.channel) return;

    this.connection = await connect(this.url);
    this.channel = await this.connection.createChannel();
  }

  async publish<T>(queueName: string, payload: T): Promise<void> {
    await this.connect();

    if (!this.channel) {
      throw new Error("RabbitMQ channel not initialized");
    }

    await this.channel.assertQueue(queueName, { durable: true });
    this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)), {
      persistent: true,
    });
  }
}