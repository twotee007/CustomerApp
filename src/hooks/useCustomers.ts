import { useEffect, useState } from 'react';
import { useCustomerStore } from '../store/customerStore';
import { Customer } from '../types/customer';
 
export function useCustomers() {
  const {
    customers,
    isLoading,
    isRefreshing,
    error,
    fetchCustomers,
    refreshCustomers,
  } = useCustomerStore();
 
  const [searchQuery, setSearchQuery] = useState('');
 
  useEffect(() => {
    if (customers.length === 0) {
      fetchCustomers();
    }
  }, [customers.length, fetchCustomers]);
 
  const filteredCustomers: Customer[] = customers.filter(c => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });
 
  return {
    customers: filteredCustomers,
    isLoading,
    isRefreshing,
    error,
    searchQuery,
    setSearchQuery,
    refresh: refreshCustomers,
  };
}