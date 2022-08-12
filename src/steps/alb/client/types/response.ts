import { LoadBalancer } from '../../types';
import { PaginatedResponse } from '../../../../client/types/response';

export interface ListLoadBalancersResponse extends PaginatedResponse {
  LoadBalancers: LoadBalancer[];
}

export interface DescribeRegionsResponse {
  RequestId?: string;
  Regions: {
    RegionId: string;
    RegionEndpoint: string;
    LocalName: string;
  }[];
}
