export type OrderStatus = 'PENDING' | 'READY_FOR_DISPATCH' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELED';

export interface OrderProps {
  companyId: string;
  createdByUserId: string;
  recipientName: string;
  recipientPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  status?: OrderStatus;
  trackingCode?: string;
}

export class Order {
  id?: string;
  companyId: string;
  createdByUserId: string;
  recipientName: string;
  recipientPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: OrderStatus;
  trackingCode: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: OrderProps, id?: string) {
    this.companyId = props.companyId;
    this.createdByUserId = props.createdByUserId;
    this.recipientName = props.recipientName;
    this.recipientPhone = props.recipientPhone;
    this.pickupAddress = props.pickupAddress;
    this.deliveryAddress = props.deliveryAddress;
    
    this.status = props.status ?? 'PENDING';
    this.trackingCode = props.trackingCode ?? this.generateTrackingCode();
  }

  public markAsReady(): void {
    if (this.status !== 'PENDING') {
      throw new Error('Apenas pedidos pendentes podem ser marcados como prontos para despacho.');
    }
    this.status = 'READY_FOR_DISPATCH';
  }

  public cancel(): void {
    if (this.status === 'DELIVERED') {
      throw new Error('Pedidos já entregues não podem ser cancelados.');
    }
    this.status = 'CANCELED';
  }

  private generateTrackingCode(): string {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `RTF-${randomCode}`;
  }
}