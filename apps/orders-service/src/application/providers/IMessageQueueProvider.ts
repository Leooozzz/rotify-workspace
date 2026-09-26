export interface IMessageQueueProvider {
  publish<T>(queueName: string, payload: T): Promise<void>;
}