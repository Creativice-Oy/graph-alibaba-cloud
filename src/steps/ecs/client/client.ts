import AlibabaClient from '@alicloud/pop-core';
import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import { DescribeInstancesResponse } from './types/response';
import { Instance } from '../types';
import { RegionalServiceClient } from '../../../client/regionalClient';
import { DescribeInstancesParameters, ECSRequest } from './types/request';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';
import {
  ECS_API_VERSION,
  ECS_ROOT_ENDPOINT,
  PAGE_SIZE,
} from '../../../client/constants';

export class ECSClient extends RegionalServiceClient {
  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    const rootClientConfig = {
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: ECS_ROOT_ENDPOINT,
      apiVersion: ECS_API_VERSION,
    };

    super({ logger, rootClientConfig });
  }

  public async iterateInstances(
    iteratee: ResourceIteratee<Instance>,
  ): Promise<void> {
    return this.forEachRegion(
      async (client: AlibabaClient, regionId: string) => {
        return this.forEachPageWithToken(async (nextToken?: string) => {
          const parameters: DescribeInstancesParameters = {
            RegionId: regionId,
            PageSize: PAGE_SIZE,
            NextToken: nextToken,
          };

          const req: ECSRequest = {
            client,
            action: 'DescribeInstances',
            parameters,
            options: {
              timeout: 10000,
            },
          };

          const response = await this.request<DescribeInstancesResponse>(req);
          const instances = response.Instances.Instance;
          for (const instance of instances) {
            await iteratee(instance);
          }

          return response;
        });
      },
    );
  }
}

export function createECSClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): ECSClient {
  return new ECSClient(config, logger);
}
