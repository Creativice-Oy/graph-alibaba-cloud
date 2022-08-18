import { VPC, VPCAttribute } from '../../types';
import {
  AlibabaResponse,
  PaginatedResponse,
} from '../../../../client/types/response';

export interface DescribeVpcsResponse extends PaginatedResponse {
  Vpcs: {
    Vpc: VPC[];
  };
}

export type DescribeVpcAttributeResponse = AlibabaResponse & VPCAttribute;
