import { derived, writable } from 'svelte/store';
import { ordersStore } from './ordersStore';

export type ReportPeriod = '7days' | '15days' | '30days' | 'thisMonth';

export const selectedPeriod = writable<ReportPeriod>('30days');

export const reportData = derived(
  [ordersStore, selectedPeriod],
  ([$orders, $selectedPeriod]) => {
    const now = new Date();
    let startDate: Date;

    switch ($selectedPeriod) {
      case '7days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '15days':
        startDate = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
        break;
      case '30days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    const filteredOrders = $orders.filter(order => order.createdAt >= startDate);

    // Group by day
    const groupedByDay = new Map<string, {
      date: Date;
      totalOrders: number;
      paidOrders: number;
      revenue: number;
      videosGenerated: number;
    }>();

    filteredOrders.forEach(order => {
      const dateKey = order.createdAt.toISOString().split('T')[0];
      
      if (!groupedByDay.has(dateKey)) {
        groupedByDay.set(dateKey, {
          date: new Date(dateKey),
          totalOrders: 0,
          paidOrders: 0,
          revenue: 0,
          videosGenerated: 0
        });
      }

      const dayData = groupedByDay.get(dateKey)!;
      dayData.totalOrders += 1;
      
      if (order.status === 'paid') {
        dayData.paidOrders += 1;
        dayData.revenue += order.totalAmount;
        dayData.videosGenerated += order.quantity;
      }
    });

    return Array.from(groupedByDay.values()).sort((a, b) => b.date.getTime() - a.date.getTime());
  }
);