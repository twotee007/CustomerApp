import { customerService } from '../src/services/customerService';

describe('customerService', () => {
  it('fetchAll returns a list of customers', async () => {
    const customers = await customerService.fetchAll();
    expect(Array.isArray(customers)).toBe(true);
    expect(customers.length).toBeGreaterThan(0);
  });

  it('fetchById returns correct customer', async () => {
    const customer = await customerService.fetchById('1');
    expect(customer).toBeDefined();
    expect(customer?.id).toBe('1');
  });

  it('fetchById returns undefined for unknown id', async () => {
    const customer = await customerService.fetchById('999');
    expect(customer).toBeUndefined();
  });

  it('updateStatus changes customer status', async () => {
    const before = await customerService.fetchById('1');
    const newStatus = before?.status === 'active' ? 'inactive' : 'active';
    const updated = await customerService.updateStatus('1', newStatus);
    expect(updated.status).toBe(newStatus);
  });

  it('updateCustomer updates name and email', async () => {
    const updated = await customerService.updateCustomer('1', {
      name: 'New Name',
      email: 'new@example.com',
    });
    expect(updated.name).toBe('New Name');
    expect(updated.email).toBe('new@example.com');
  });
});