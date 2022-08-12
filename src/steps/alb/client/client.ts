import AlibabaClient from '@alicloud/pop-core';
import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import {
  DescribeRegionsResponse,
  ListLoadBalancersResponse,
} from './types/response';
import { LoadBalancer } from '../types';
import { RegionalServiceClient } from '../../../client/regionalClient';
import {
  ListLoadBalancersParameters as ListLoadBalancersParameters,
  ALBRequest,
} from './types/request';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';
import { API_VERSION, DEFAULT_REGION, REQ_TIMEOUT } from '../constants';

export class ALBClient extends RegionalServiceClient {
  constructor(readonly config: IntegrationConfig, logger: IntegrationLogger) {
    super({ logger });

    this.getRegions = (): Promise<string[]> => this.describeRegions();
  }

  private async describeRegions(): Promise<string[]> {
    const client: AlibabaClient = new AlibabaClient({
      accessKeyId: this.config.accessKeyId,
      accessKeySecret: this.config.accessKeySecret,
      endpoint: DEFAULT_REGION,
      apiVersion: API_VERSION,
    });

    const req = {
      client: client,
      action: 'DescribeRegions',
      parameters: {},
      options: {
        timeout: REQ_TIMEOUT,
      },
    };

    const res: DescribeRegionsResponse = await this.request(req);

    return res.Regions.map((r) => r.RegionEndpoint);
  }

  public async iterateLoadBalancers(
    iteratee: ResourceIteratee<LoadBalancer>,
  ): Promise<void> {
    return this.forEachRegion(async (region: string) => {
      const client: AlibabaClient = new AlibabaClient({
        accessKeyId: this.config.accessKeyId,
        accessKeySecret: this.config.accessKeySecret,
        endpoint: `https://${region}`,
        apiVersion: '2020-06-16',
      });

      return this.forEachPage(async (nextToken?: string) => {
        const parameters: ListLoadBalancersParameters = {
          Action: 'ListLoadBalancers',
          MaxResults: 50,
          ...(nextToken && { NextToken: nextToken }),
        };

        const req: ALBRequest = {
          client,
          action: 'ListLoadBalancers',
          parameters,
          options: {
            method: 'POST',
            formatParams: false,
            timeout: REQ_TIMEOUT,
          },
        };

        const response = await this.request<ListLoadBalancersResponse>(req);
        const loadBalancers = response.LoadBalancers;
        for (const loadBalancer of loadBalancers) {
          await iteratee(loadBalancer);
        }

        return response;
      });
    });
  }
}

export function createALBClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): ALBClient {
  return new ALBClient(config, logger);
}
