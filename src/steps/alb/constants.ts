import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

import { VPCEntities } from '../vpc/constants';

export const REQ_TIMEOUT = 20000;
export const DEFAULT_REGION = 'https://alb.cn-qingdao.aliyuncs.com';
export const API_VERSION = '2020-06-16';

export const ALBSteps = {
  FETCH_ALB_LOAD_BALANCERS: {
    id: 'fetch-alb-load-balancers',
    name: 'Fetch ALB Load Balancers',
  },
  BUILD_VPC_ALB_LOAD_BALANCER_RELATIONSHIPS: {
    id: 'build-vpc-has-alb-load-balancer-relationships',
    name: 'Build VPC has ALB Load Balancer Relationships',
  },
};

export const ALBEntities: Record<'ALB_LOAD_BALANCER', StepEntityMetadata> = {
  ALB_LOAD_BALANCER: {
    resourceName: 'ALB Load Balancer',
    _type: 'alibaba_cloud_alb_load_balancer',
    _class: ['Gateway'],
  },
};

export const ALBRelationships: Record<
  'VPC_HAS_ALB_LOAD_BALANCER',
  StepRelationshipMetadata
> = {
  VPC_HAS_ALB_LOAD_BALANCER: {
    _type: 'alibaba_cloud_vpc_has_alb_load_balancer',
    sourceType: VPCEntities.VPC._type,
    _class: RelationshipClass.HAS,
    targetType: ALBEntities.ALB_LOAD_BALANCER._type,
  },
};
