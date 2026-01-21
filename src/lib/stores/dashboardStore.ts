import { derived } from 'svelte/store';
import { ordersStore } from './ordersStore';

export const dashboardStats = derived(ordersStore, ($orders) => {
  const totalOrders = $orders.length;
  const paidOrders = $orders.filter(order => order.status === 'paid');
  const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const videosGenerated = paidOrders.reduce((sum, order) => sum + order.quantity, 0);
  const averageTicket = totalOrders > 0 ? $orders.reduce((sum, order) => sum + order.totalAmount, 0) / totalOrders : 0;
  const paidAverageTicket = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

  return {
    totalOrders,
    totalRevenue,
    averageTicket,
    paidOrdersCount: paidOrders.length,
    paidAverageTicket,
    videosGenerated
  };
});