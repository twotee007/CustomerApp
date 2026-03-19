import { useState } from 'react';
import { useCustomerStore } from '../store/customerStore';
 
export function useCustomerDetail(id: string) {
  const { getCustomerById, toggleStatus } = useCustomerStore();
  const [isToggling, setIsToggling] = useState(false);
 
  const customer = getCustomerById(id);
 
  const handleToggleStatus = async () => {
    setIsToggling(true);
    try {
      await toggleStatus(id);
    } finally {
      setIsToggling(false);
    }
  };
 
  return {
    customer,
    isToggling,
    handleToggleStatus,
  };
}