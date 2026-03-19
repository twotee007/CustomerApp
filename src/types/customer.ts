export type CustomerStatus = 'active' | 'inactive';
 
export interface Customer {
  id: string;
  name: string;
  email: string;
  status: CustomerStatus;
  phone?: string;
  company?: string;
  address?: string;
  createdAt: string;
}
 
export interface UpdateCustomerPayload {
  name: string;
  email: string;
}