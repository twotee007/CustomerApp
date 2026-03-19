import { Customer, UpdateCustomerPayload } from '../types/customer';
import { MOCK_CUSTOMERS } from '../constants/mockData';
 
// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
 
let localData: Customer[] = [...MOCK_CUSTOMERS];
 
export const customerService = {
  async fetchAll(): Promise<Customer[]> {
    await delay(1500); // simulate pull-to-refresh delay
    return [...localData];
  },
 
  async fetchById(id: string): Promise<Customer | undefined> {
    await delay(300);
    return localData.find(c => c.id === id);
  },
 
  async updateStatus(id: string, status: 'active' | 'inactive'): Promise<Customer> {
    await delay(500);
    localData = localData.map(c =>
      c.id === id ? { ...c, status } : c
    );
    const updated = localData.find(c => c.id === id);
    if (!updated) throw new Error('Customer not found');
    return updated;
  },
 
  async updateCustomer(id: string, payload: UpdateCustomerPayload): Promise<Customer> {
    await delay(600);
    localData = localData.map(c =>
      c.id === id ? { ...c, ...payload } : c
    );
    const updated = localData.find(c => c.id === id);
    if (!updated) throw new Error('Customer not found');
    return updated;
  },
};