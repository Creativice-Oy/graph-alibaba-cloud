import AlibabaClient from '@alicloud/pop-core';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';

import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import {
  DescribeVpcsResponse,
  DescribeVpcAttributeResponse,
} from './types/response';
import { VPC, VPCAttribute } from '../types';
import { RegionalServiceClient } from '../../../client/regionalClient';
import {
  DescribeVPCAttributeRequest,
  VPCAttributeParameters,
} from './types/request';
import {
  PAGE_SIZE,
  VPC_API_VERSION,
  VPC_ROOT_ENDPOINT,
} from '../../../client/constants';

export class VPCClient extends RegionalServiceClient {
  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    const rootClientConfig = {
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: VPC_ROOT_ENDPOINT,
      apiVersion: VPC_API_VERSION,
    };

    super({ logger, rootClientConfig });
  }

  public async iterateVPCs(
    iteratee: ResourceIteratee<VPC & VPCAttribute>,
  ): Promise<void> {
    return this.forEachRegion(
      async (client: AlibabaClient, regionId: string) => {
        return this.forEachPage(async (pageNumber: number) => {
          let vpcAttributeParameters: VPCAttributeParameters;
          let vpcAttributeReq: DescribeVPCAttributeRequest;

          const vpcParameters = {
            RegionId: regionId,
            PageSize: PAGE_SIZE,
            PageNumber: pageNumber,
          };

          const vpcReq = {
            client,
            action: 'DescribeVpcs',
            parameters: vpcParameters,
            options: {
              timeout: 20000,
            },
          };

          const vpcResponse = await this.request<DescribeVpcsResponse>(vpcReq);
          const {
            Vpcs: { Vpc },
          } = vpcResponse;

          for (const vpc of Vpc) {
            vpcAttributeParameters = {
              VpcId: vpc.VpcId,
              RegionId: regionId,
            };

            vpcAttributeReq = {
              client,
              action: 'DescribeVpcAttribute',
              parameters: vpcAttributeParameters,
            };

            const response = await this.request<DescribeVpcAttributeResponse>(
              vpcAttributeReq,
            );
            const { RequestId, ...vpcAttributeResponse } = response;

            await iteratee({
              ...vpc,
              ...(vpcAttributeResponse as VPCAttribute),
            });
          }

          return vpcResponse;
        });
      },
    );
  }
}

export function createVPCClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): VPCClient {
  return new VPCClient(config, logger);
}
