import { Instance } from '../../types';
import { PaginatedResponseWithToken } from '../../../../client/types/response';

export interface DescribeInstancesResponse extends PaginatedResponseWithToken {
  Instances: {
    Instance: Instance[];
  };
}
