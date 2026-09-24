export interface IMessageQueueProvider {
  
  publish(queueName: string, payload: any): Promise<void>;
}