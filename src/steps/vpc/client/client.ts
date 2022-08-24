import AlibabaClient from '@alicloud/pop-core';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';

import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import {
  DescribeVPCsResponse,
  DescribeVPCAttributeResponse,
  DescribeNATGatewaysResponse,
  DescribeVPNGatewaysResponse,
} from './types/response';
import { NATGateway, VPC, VPCAttribute, VPNGateway } from '../types';
import { RegionalServiceClient } from '../../../client/regionalClient';
import {
  DescribeNATGatewaysRequest,
  DescribeVPCAttributeRequest,
  DescribeVPCsRequest,
  DescribeVpnGatewaysParameters,
  DescribeVPNGatewaysRequest,
  NATGatewayParameters,
  VPCAttributeParameters,
  VPCParameters,
} from './types/request';
import { ECS_REGIONS } from '../../../regions';
import { PAGE_SIZE } from '../../../client/constants';

export class VPCClient extends RegionalServiceClient {
  private client: AlibabaClient;

  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    super({ logger });

    this.client = new AlibabaClient({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: 'https://vpc.aliyuncs.com',
      apiVersion: '2016-04-28',
    });

    // ECS does not have an endpoint for returning all regions that support ECS.
    // Instead, its describeRegions endpoint returns a list of every region.
    this.getRegions = (): Promise<string[]> => Promise.resolve(ECS_REGIONS);
  }

  public async iterateVPCs(
    iteratee: ResourceIteratee<VPC & VPCAttribute>,
  ): Promise<void> {
    return this.forEachRegion(async (region: string) => {
      let pageNumber = 0;
      let totalVpcs = 0;

      do {
        pageNumber++;

        const vpcParameters: VPCParameters = {
          RegionId: region,
          PageSize: PAGE_SIZE,
          PageNumber: pageNumber,
        };

        const vpcReq: DescribeVPCsRequest = {
          client: this.client,
          action: 'DescribeVpcs',
          parameters: vpcParameters,
        };

        const {
          Vpcs: { Vpc },
          TotalCount,
        } = await this.request<DescribeVPCsResponse>(vpcReq);

        for (const vpc of Vpc) {
          const vpcAttributeParameters: VPCAttributeParameters = {
            VpcId: vpc.VpcId,
            RegionId: region,
          };

          const vpcAttributeReq: DescribeVPCAttributeRequest = {
            client: this.client,
            action: 'DescribeVpcAttribute',
            parameters: vpcAttributeParameters,
          };

          const response = await this.request<DescribeVPCAttributeResponse>(
            vpcAttributeReq,
          );
          const { RequestId, ...vpcAttributeResponse } = response;

          await iteratee({ ...vpc, ...(vpcAttributeResponse as VPCAttribute) });
        }

        totalVpcs = TotalCount;
      } while (pageNumber * PAGE_SIZE < totalVpcs);
    });
  }

  public async iterateNATGateways(
    iteratee: ResourceIteratee<NATGateway>,
  ): Promise<void> {
    return this.forEachRegion(async (region: string) => {
      let pageNumber = 0;
      let totalNgws = 0;

      do {
        pageNumber++;

        const parameters: NATGatewayParameters = {
          RegionId: region,
          PageSize: PAGE_SIZE,
          PageNumber: pageNumber,
        };

        const req: DescribeNATGatewaysRequest = {
          client: this.client,
          action: 'DescribeNatGateways',
          parameters,
        };

        const {
          NatGateways: { NatGateway },
          TotalCount,
        } = await this.request<DescribeNATGatewaysResponse>(req);

        for (const ngw of NatGateway) {
          await iteratee(ngw);
        }

        totalNgws = TotalCount;
      } while (pageNumber * PAGE_SIZE < totalNgws);
    });
  }

  public async iterateVPNGateways(
    iteratee: ResourceIteratee<VPNGateway>,
  ): Promise<void> {
    return this.forEachRegion(async (region: string) => {
      let pageNumber = 0;
      let totalVgws = 0;

      do {
        pageNumber++;

        const parameters: DescribeVpnGatewaysParameters = {
          RegionId: region,
          PageSize: PAGE_SIZE,
          PageNumber: pageNumber,
        };

        const req: DescribeVPNGatewaysRequest = {
          client: this.client,
          action: 'DescribeVpnGateways',
          parameters,
        };

        const {
          VpnGateways: { VpnGateway },
          TotalCount,
        } = await this.request<DescribeVPNGatewaysResponse>(req);
        for (const vgw of VpnGateway) {
          await iteratee(vgw);
        }

        totalVgws = TotalCount;
      } while (pageNumber * PAGE_SIZE < totalVgws);
    });
  }
}

export function createVPCClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): VPCClient {
  return new VPCClient(config, logger);
}
