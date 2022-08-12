import { Request } from '../../../../client/types/request';

export interface ALBRequest extends Request<ALBParameters> {
  action: ALBAction;
}

export type ALBAction = 'ListLoadBalancers';
export type ALBParameters = ListLoadBalancersParameters;

export interface ListLoadBalancersParameters {
  Action: string;
  NextToken?: string;
  MaxResults?: number;
  ZoneId?: string;
  LoadBalancerStatus?: string;
  LoadBalancerBussinessStatus?: string;
  LoadBalancerIds?: string[];
  LoadBalancerNames?: string[];
  VpcIds?: string[];
  Tag?: {
    Key?: string;
    Value?: string;
  }[];
  AddressType?: string;
  PayType?: string;
  ResourceGroupId?: string;
}
