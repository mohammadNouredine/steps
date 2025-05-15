type Product = {
  id: number;
  name: string;
};

type ProductVariant = {
  id: number;
  product: Product;
  options: { name: string }[];
};

export type OrderItem = {
  quantity: number;
  price: number;
  discount: number;
  productVariant?: ProductVariant | null;
  product: Product;
};

export enum PaymentMethod {
  CASH = "CASH",
  WHISH = "WHISH",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
}
export const paymentMethods = [
  {
    label: "Cash",
    value: PaymentMethod.CASH,
  },
  {
    label: "Whish",
    value: PaymentMethod.WHISH,
  },
  {
    label: "Cash on Delivery",
    value: PaymentMethod.CASH_ON_DELIVERY,
  },
];
export enum OrderStatus {
  CANCELED = "CANCELED",
  RETURNED = "RETURNED",
  PENDING = "PENDING",
  DONE = "DONE",
  DELIVERY = "DELIVERY",
  VERIFIED = "VERIFIED",
}

export type DashboardOrder = {
  id: number;
  customer_name: string;
  customer_address: string;
  customer_phone: string;
  has_discount: boolean;
  was_printed: boolean;
  notes?: string;
  order_status: OrderStatus;
  is_delivery: boolean;
  delivery_pickup_time: Date | null;
  delivery_deploy_time: Date | null;
  payment_method: PaymentMethod;
  discount_amount: number;
  total_before_discount: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
};

export type CreateDashboardOrder = {
  customer_name: string;
  customer_address: string;
  customer_phone: string;
  has_discount: boolean;
  was_printed: boolean;
  notes?: string;
  order_status: OrderStatus;
  is_delivery: boolean;
  delivery_pickup_time?: Date | null;
  delivery_deploy_time?: Date | null;
  payment_method?: PaymentMethod;
  discount_amount?: number;
  total_before_discount?: number;
  total?: number;
  orderItems?: {
    quantity: number;
  }[];
};
export interface UpdateDashboardOrder extends CreateDashboardOrder {}

export type OrderStatistics = {
  total_number_of_orders: number;
  total_income: number;
  total_costs: number;
  total_profits: number;
  statuses: Record<OrderStatus, number>;
  paymentMethods: Record<PaymentMethod, number>;
};
