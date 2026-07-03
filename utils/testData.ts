import { ObjectPayload } from './apiClient';

/**
 * Builds a unique payload for object creation. A timestamp suffix is used
 * so repeated test runs never collide on the same "name" value.
 */
export function buildNewObjectPayload(): ObjectPayload {
  return {
    name: `Test Device ${Date.now()}`,
    data: {
      year: 2024,
      price: 999.99,
      color: 'Space Gray',
      capacity: '512 GB',
    },
  };
}

/**
 * Builds a payload used to update an existing object with a distinct
 * set of values so update assertions can confirm data actually changed.
 */
export function buildUpdatedObjectPayload(): ObjectPayload {
  return {
    name: `Updated Device ${Date.now()}`,
    data: {
      year: 2025,
      price: 1299.99,
      color: 'Midnight Blue',
      capacity: '1 TB',
    },
  };
}
