import { Request } from '../../../../client/types/request';
import {
  NATGatewayStatus,
  NATInstanceChargeType,
  NATNetworkType,
} from '../../types';

export interface DescribeVPCsRequest extends Request<VPCParameters> {
  action: VPCAction;
}

export interface DescribeVPCAttributeRequest
  extends Request<VPCAttributeParameters> {
  action: VPCAttributeAction;
}

export interface DescribeNATGatewaysRequest
  extends Request<NATGatewayParameters> {
  action: NATGatewayAction;
}

export interface DescribeVPNGatewaysRequest extends Request<VPNParameters> {
  action: VPNAction;
}

export type VPCAction = 'DescribeVpcs';
export type VPCAttributeAction = 'DescribeVpcAttribute';
export type NATGatewayAction = 'DescribeNatGateways';
export type VPNAction = 'DescribeVpnGateways';

export type VPCParameters = DescribeVpcsParameters;
export type VPCAttributeParameters = DescribeVpcAttributeParameters;
export type NATGatewayParameters = DescribeNatGatewaysParameters;
export type VPNParameters = DescribeVpnGatewaysParameters;

export interface DescribeVpcsParameters {
  VpcId?: string;
  RegionId: string;
  VpcName?: string;
  IsDefault?: boolean;
  DryRun?: boolean;
  ResourceGroupId?: string;
  VpcOwnerId?: number;
  DhcpOptionsSetId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface DescribeVpcAttributeParameters {
  VpcId: string;
  RegionId: string;
  DryRun?: boolean;
  IsDefault?: boolean;
}

export interface DescribeNatGatewaysParameters {
  RegionId: string;
  NatGatewayId?: string;
  VpcId?: string;
  Name?: string;
  InstanceChargeType?: NATInstanceChargeType;
  Spec?: string;
  NatType?: string;
  ResourceGroupId?: string;
  DryRun?: boolean;
  Status?: NATGatewayStatus;
  NetworkType?: NATNetworkType;
  ZoneId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface DescribeVpnGatewaysParameters {
  RegionId: string;
  VpcId?: string;
  VpnGatewayId?: string;
  Status?: string;
  BusinessStatus?: string;
  PageNumber?: number;
  PageSize?: number;
}
