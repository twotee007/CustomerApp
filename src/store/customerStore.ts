import { create } from 'zustand';
import { Customer, UpdateCustomerPayload } from '../types/customer';
import { customerService } from '../services/customerService';
 
interface CustomerState {
  customers: Customer[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
 
  fetchCustomers: () => Promise<void>;
  refreshCustomers: () => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
  updateCustomer: (id: string, payload: UpdateCustomerPayload) => Promise<void>;
  getCustomerById: (id: string) => Customer | undefined;
}
 
export const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: [],
  isLoading: false,
  isRefreshing: false,
  error: null,
 
  fetchCustomers: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await customerService.fetchAll();
      set({ customers: data });
    } catch (e) {
      set({ error: 'Failed to load customers' });
    } finally {
      set({ isLoading: false });
    }
  },
 
  refreshCustomers: async () => {
    set({ isRefreshing: true, error: null });
    try {
      const data = await customerService.fetchAll();
      set({ customers: data });
    } catch (e) {
      set({ error: 'Failed to refresh customers' });
    } finally {
      set({ isRefreshing: false });
    }
  },
 
  toggleStatus: async (id: string) => {
    const customer = get().customers.find(c => c.id === id);
    if (!customer) return;
    const newStatus = customer.status === 'active' ? 'inactive' : 'active';
    try {
      const updated = await customerService.updateStatus(id, newStatus);
      set(state => ({
        customers: state.customers.map(c => (c.id === id ? updated : c)),
      }));
    } catch (e) {
      set({ error: 'Failed to update status' });
    }
  },
 
  updateCustomer: async (id: string, payload: UpdateCustomerPayload) => {
    const updated = await customerService.updateCustomer(id, payload);
    set(state => ({
      customers: state.customers.map(c => (c.id === id ? updated : c)),
    }));
  },
 
  getCustomerById: (id: string) => {
    return get().customers.find(c => c.id === id);
  },
}));