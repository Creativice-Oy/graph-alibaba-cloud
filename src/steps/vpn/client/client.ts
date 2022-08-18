import AlibabaClient from '@alicloud/pop-core';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';

import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import { DescribeVpnGatewaysResponse } from './types/response';
import { VPNGateway } from '../types';
import { RegionalServiceClient } from '../../../client/regionalClient';
import { DescribeVpnGatewaysParameters, VPNRequest } from './types/request';
import { VPC_ROOT_ENDPOINT, VPC_API_VERSION } from '../../../client/constants';

export class VPNClient extends RegionalServiceClient {
  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    const rootClientConfig = {
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: VPC_ROOT_ENDPOINT,
      apiVersion: VPC_API_VERSION,
    };

    super({ logger, rootClientConfig });
  }

  public async iterateVPNGateways(
    iteratee: ResourceIteratee<VPNGateway>,
  ): Promise<void> {
    return this.forEachRegion(
      async (client: AlibabaClient, regionId: string) => {
        return this.forEachPage(async (pageNumber: number) => {
          const parameters: DescribeVpnGatewaysParameters = {
            RegionId: regionId,
            PageSize: 50,
            PageNumber: pageNumber,
          };

          const req: VPNRequest = {
            client,
            action: 'DescribeVpnGateways',
            parameters,
            options: {
              timeout: 10000,
            },
          };

          const response = await this.request<DescribeVpnGatewaysResponse>(req);
          const vpnGateways = response.VpnGateways.VpnGateway;
          for (const vpnGateway of vpnGateways) {
            await iteratee(vpnGateway);
          }

          return response;
        });
      },
    );
  }
}

export function createVPNClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): VPNClient {
  return new VPNClient(config, logger);
}
