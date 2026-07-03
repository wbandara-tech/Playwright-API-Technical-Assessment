import { test, expect } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';
import { buildNewObjectPayload, buildUpdatedObjectPayload } from '../utils/testData';

/**
 * End-to-end CRUD flow against the restful-api.dev /objects resource.
 * Tests run serially because steps 3-5 depend on the object ID created
 * in step 2 - this mirrors a realistic create -> read -> update -> delete
 * lifecycle instead of testing each operation in isolation.
 */
test.describe.serial('Objects API - CRUD flow', () => {
  const newObjectPayload = buildNewObjectPayload();
  const updatedObjectPayload = buildUpdatedObjectPayload();
  let createdObjectId: string;

  test('1. GET /objects - should return the list of all objects', async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.getAllObjects();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const objects = await response.json();
    expect(Array.isArray(objects)).toBe(true);
    expect(objects.length).toBeGreaterThan(0);
    expect(objects[0]).toHaveProperty('id');
    expect(objects[0]).toHaveProperty('name');
  });

  test('2. POST /objects - should create a new object', async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.createObject(newObjectPayload);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const createdObject = await response.json();
    expect(createdObject).toHaveProperty('id');
    expect(createdObject.name).toBe(newObjectPayload.name);
    expect(createdObject.data).toMatchObject(newObjectPayload.data as Record<string, unknown>);
    expect(createdObject).toHaveProperty('createdAt');

    // Reused by the subsequent Get/Update/Delete tests.
    createdObjectId = createdObject.id;
  });

  test('3. GET /objects/{id} - should retrieve the created object', async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.getObjectById(createdObjectId);

    expect(response.status()).toBe(200);

    const object = await response.json();
    expect(object.id).toBe(createdObjectId);
    expect(object.name).toBe(newObjectPayload.name);
    expect(object.data).toMatchObject(newObjectPayload.data as Record<string, unknown>);
  });

  test('4. PUT /objects/{id} - should update the created object', async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.updateObject(createdObjectId, updatedObjectPayload);

    expect(response.status()).toBe(200);

    const updatedObject = await response.json();
    expect(updatedObject.id).toBe(createdObjectId);
    expect(updatedObject.name).toBe(updatedObjectPayload.name);
    expect(updatedObject.data).toMatchObject(updatedObjectPayload.data as Record<string, unknown>);
    expect(updatedObject).toHaveProperty('updatedAt');
  });

  test('5. DELETE /objects/{id} - should delete the created object', async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.deleteObject(createdObjectId);

    expect(response.status()).toBe(200);

    const deleteResult = await response.json();
    expect(deleteResult).toHaveProperty('message');
    expect(deleteResult.message).toContain(createdObjectId);
  });

  test('6. GET /objects/{id} - should return 404 after the object has been deleted', async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.getObjectById(createdObjectId);

    expect(response.status()).toBe(404);
  });

  test('7. GET /objects/{id} - should return 404 for a non-existent object id', async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.getObjectById('invalid-object-id-000000');

    expect(response.status()).toBe(404);
  });
});
