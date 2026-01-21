import { writable } from 'svelte/store';

export interface Order {
  id: string;
  customerName: string;
  customerWhatsapp: string;
  customerEmail: string;
  customerCpf: string;
  productName: string;
  quantity: number;
  people: Array<{ name: string; message: string }>;
  extras: Array<{ name: string; price: number }>;
  totalAmount: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: Date;
  paidAt?: Date;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: 'ord-001',
    customerName: 'Maria Silva',
    customerWhatsapp: '(11) 99999-9999',
    customerEmail: 'maria@email.com',
    customerCpf: '123.456.789-01',
    productName: '2 pessoas',
    quantity: 2,
    people: [
      { name: 'João', message: 'Feliz Natal!' },
      { name: 'Ana', message: 'Ho ho ho!' }
    ],
    extras: [],
    totalAmount: 24.90,
    status: 'paid',
    createdAt: new Date('2024-12-20'),
    paidAt: new Date('2024-12-20')
  },
  {
    id: 'ord-002',
    customerName: 'Carlos Santos',
    customerWhatsapp: '(21) 88888-8888',
    customerEmail: 'carlos@email.com',
    customerCpf: '987.654.321-10',
    productName: '1 pessoa',
    quantity: 1,
    people: [
      { name: 'Pedro', message: 'Papai Noel chegou!' }
    ],
    extras: [
      { name: 'Entrega super rápida', price: 5.90 }
    ],
    totalAmount: 20.80,
    status: 'pending',
    createdAt: new Date('2024-12-21')
  },
  {
    id: 'ord-003',
    customerName: 'Ana Costa',
    customerWhatsapp: '(31) 77777-7777',
    customerEmail: 'ana@email.com',
    customerCpf: '456.789.123-45',
    productName: '3 pessoas',
    quantity: 3,
    people: [
      { name: 'Sofia', message: 'Natal mágico!' },
      { name: 'Lucas', message: 'Ho ho ho!' },
      { name: 'Emma', message: 'Papai Noel!' }
    ],
    extras: [],
    totalAmount: 34.90,
    status: 'paid',
    createdAt: new Date('2024-12-19'),
    paidAt: new Date('2024-12-19')
  }
];

export const ordersStore = writable<Order[]>(mockOrders);

export const addOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
  const newOrder: Order = {
    ...order,
    id: `ord-${Date.now()}`,
    createdAt: new Date()
  };
  
  ordersStore.update(orders => [newOrder, ...orders]);
  return newOrder.id;
};

export const updateOrderStatus = (orderId: string, status: Order['status']) => {
  ordersStore.update(orders => 
    orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status,
            ...(status === 'paid' ? { paidAt: new Date() } : {})
          }
        : order
    )
  );
};

export const deleteOrder = (orderId: string) => {
  ordersStore.update(orders => orders.filter(order => order.id !== orderId));
};