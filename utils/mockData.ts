/**
 * Mock responses for demonstration and testing when the real API is rate-limited.
 * These responses represent what the actual API returns.
 */

export const mockObjects = [
  {
    id: 'mock-001',
    name: 'Apple MacBook Pro 16',
    data: {
      year: 2019,
      price: 1849.99,
      'CPU model': 'Intel Core i9',
      'Hard disk size': '1 TB',
    },
    createdAt: 1683001234567,
  },
  {
    id: 'mock-002',
    name: 'Samsung Galaxy S24',
    data: {
      year: 2024,
      price: 999.99,
      color: 'Phantom Black',
      storage: '256GB',
    },
    createdAt: 1683001334567,
  },
];

export const mockCreatedObject = {
  id: 'mock-new-' + Date.now(),
  name: `Test Device ${Date.now()}`,
  data: {
    year: 2024,
    price: 999.99,
    color: 'Space Gray',
    capacity: '512 GB',
  },
  createdAt: Date.now(),
};

export const mockUpdatedObject = {
  ...mockCreatedObject,
  name: `Updated Device ${Date.now()}`,
  data: {
    year: 2025,
    price: 1299.99,
    color: 'Midnight Blue',
    capacity: '1 TB',
  },
  updatedAt: Date.now(),
};

export const mockDeleteResponse = {
  message: `Object with id = ${mockCreatedObject.id} has been deleted.`,
};
