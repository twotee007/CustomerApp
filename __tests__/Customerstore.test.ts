import { useCustomerStore } from '../src/store/customerStore';

// Reset store state between tests
beforeEach(() => {
  useCustomerStore.setState({
    customers: [],
    isLoading: false,
    isRefreshing: false,
    error: null,
  });
});

describe('customerStore', () => {
  it('fetchCustomers sets customers and clears loading', async () => {
    const store = useCustomerStore.getState();
    await store.fetchCustomers();

    const state = useCustomerStore.getState();
    expect(state.customers.length).toBeGreaterThan(0);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('getCustomerById returns correct customer after fetch', async () => {
    await useCustomerStore.getState().fetchCustomers();
    const customer = useCustomerStore.getState().getCustomerById('1');
    expect(customer).toBeDefined();
    expect(customer?.id).toBe('1');
  });

  it('getCustomerById returns undefined for missing id', async () => {
    await useCustomerStore.getState().fetchCustomers();
    const customer = useCustomerStore.getState().getCustomerById('9999');
    expect(customer).toBeUndefined();
  });

  it('toggleStatus flips customer status', async () => {
    await useCustomerStore.getState().fetchCustomers();
    const before = useCustomerStore.getState().getCustomerById('1');
    const originalStatus = before?.status;

    await useCustomerStore.getState().toggleStatus('1');

    const after = useCustomerStore.getState().getCustomerById('1');
    expect(after?.status).not.toBe(originalStatus);
  });

  it('updateCustomer updates name and email in store', async () => {
    await useCustomerStore.getState().fetchCustomers();
    await useCustomerStore.getState().updateCustomer('1', {
      name: 'Updated Name',
      email: 'updated@email.com',
    });

    const updated = useCustomerStore.getState().getCustomerById('1');
    expect(updated?.name).toBe('Updated Name');
    expect(updated?.email).toBe('updated@email.com');
  });
});