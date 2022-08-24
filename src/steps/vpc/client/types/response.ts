import { NATGateway, VPC, VPCAttribute, VPNGateway } from '../../types';
import {
  AlibabaResponse,
  PaginatedResponseWithoutToken,
} from '../../../../client/types/response';

export interface DescribeVPCsResponse extends PaginatedResponseWithoutToken {
  Vpcs: {
    Vpc: VPC[];
  };
}

export type DescribeVPCAttributeResponse = AlibabaResponse & VPCAttribute;

export interface DescribeNATGatewaysResponse
  extends PaginatedResponseWithoutToken {
  NatGateways: {
    NatGateway: NATGateway[];
  };
}

export interface DescribeVPNGatewaysResponse
  extends PaginatedResponseWithoutToken {
  VpnGateways: {
    VpnGateway: VPNGateway[];
  };
}
