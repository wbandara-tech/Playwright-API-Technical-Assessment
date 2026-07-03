import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Payload shape accepted by the restful-api.dev /objects endpoint.
 */
export interface ObjectPayload {
  name: string;
  data?: Record<string, unknown>;
}

/**
 * Thin wrapper around Playwright's APIRequestContext that centralizes all
 * HTTP calls to the /objects resource. Keeping requests here avoids
 * duplicating endpoint paths across test files.
 */
export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  /** Retrieves every object in the collection. */
  async getAllObjects(): Promise<APIResponse> {
    return this.request.get('/objects');
  }

  /** Retrieves a single object by its ID. */
  async getObjectById(id: string): Promise<APIResponse> {
    return this.request.get(`/objects/${id}`);
  }

  /** Creates a new object. */
  async createObject(payload: ObjectPayload): Promise<APIResponse> {
    return this.request.post('/objects', { data: payload });
  }

  /** Fully replaces an existing object. */
  async updateObject(id: string, payload: ObjectPayload): Promise<APIResponse> {
    return this.request.put(`/objects/${id}`, { data: payload });
  }

  /** Deletes an object by its ID. */
  async deleteObject(id: string): Promise<APIResponse> {
    return this.request.delete(`/objects/${id}`);
  }
}
