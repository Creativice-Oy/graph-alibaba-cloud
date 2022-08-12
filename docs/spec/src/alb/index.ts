import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const albSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * Action: DescribeInstances
     * PATTERN: Fetch Entities
     */
    id: 'fetch-alb-load-balancers',
    name: 'Fetch ALB Load Balancers',
    entities: [
      {
        resourceName: 'ALB Load Balancer',
        _type: 'alibaba_cloud_alb_load_balancer',
        _class: ['Gateway'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    /**
     * PATTERN: Build Child Relationships
     */
    id: 'build-vpc-has-alb-load-balancer-relationships',
    name: 'Build VPC has ALB Load Balancer Relationships',
    entities: [],
    relationships: [
      {
        _type: 'alibaba_cloud_vpc_has_alb_load_balancer',
        sourceType: 'alibaba_cloud_vpc',
        _class: RelationshipClass.HAS,
        targetType: 'alibaba_cloud_alb_load_balancer',
      },
    ],
    dependsOn: ['fetch-alb-load-balancers', 'fetch-vpcs'],
    implemented: true,
  },
];
