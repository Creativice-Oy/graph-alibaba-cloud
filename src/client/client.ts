import {
  IntegrationLogger,
  IntegrationProviderAPIError,
  IntegrationProviderAuthorizationError,
} from '@jupiterone/integration-sdk-core';
import { Request } from './types/request';
import {
  PaginatedResponse,
  PaginatedResponseWithToken,
} from './types/response';

export type ResourceIteratee<T> = (resource: T) => Promise<void> | void;

export class ServiceClient {
  protected logger: IntegrationLogger;

  constructor(options: { logger: IntegrationLogger }) {
    this.logger = options.logger;
  }

  protected async request<T = unknown>(
    req: Request<Record<string, any>>,
  ): Promise<T> {
    return this.withErrorHandling(() =>
      req.client.request(req.action, req.parameters, req.options),
    );
  }

  protected async forEachPageWithToken<T extends PaginatedResponseWithToken>(
    cb: (nextToken?: string) => Promise<T>,
  ) {
    let nextToken: string | undefined;
    do {
      const response = await cb(nextToken);
      nextToken = response.NextToken;
    } while (nextToken);
  }

  protected async forEachPage<T extends PaginatedResponse>(
    cb: (pageNumber: number) => Promise<T>,
  ) {
    let pageNumber = 0;
    let totalCount: number;
    let pageSize: number;

    do {
      pageNumber += 1;
      const response = await cb(pageNumber);
      const { TotalCount, PageSize } = response;

      totalCount = TotalCount;
      pageSize = PageSize;
    } while (pageNumber * pageSize < totalCount);
  }

  protected async withErrorHandling<T>(cb: () => Promise<T>): Promise<T> {
    try {
      return await cb();
    } catch (error) {
      const statusCode = error.entry?.response?.statusCode;
      if (statusCode === 403) {
        throw new IntegrationProviderAuthorizationError({
          endpoint: error.url,
          cause: error,
          status: statusCode,
          statusText: error.message,
        });
      }
      throw new IntegrationProviderAPIError({
        endpoint: error.url,
        cause: error,
        code: error.code,
        status: statusCode,
        statusText: error.message,
        message: error.message,
      });
    }
  }
}
