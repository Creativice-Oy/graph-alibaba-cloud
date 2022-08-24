import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const vpcSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * Action: DescribeVpcs
     * PATTERN: Fetch Entities
     */
    id: 'fetch-vpcs',
    name: 'Fetch VPCs',
    entities: [
      {
        resourceName: 'VPC',
        _type: 'alibaba_cloud_vpc',
        _class: ['Network'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    /**
     * Action: DescribeNatGateways
     * PATTERN: Fetch Entities
     */
    id: 'fetch-nat-gateways',
    name: 'Fetch NAT Gateways',
    entities: [
      {
        resourceName: 'NAT Gateway',
        _type: 'alibaba_cloud_nat_gateway',
        _class: ['Gateway'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    /**
     * Action: DescribeVpnGateways
     * PATTERN: Fetch Entities
     */
    id: 'fetch-vpn-gateways',
    name: 'Fetch VPN Gateways',
    entities: [
      {
        resourceName: 'VPN Gateway',
        _type: 'alibaba_cloud_vpn_gateway',
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
    id: 'build-vpc-has-nat-gateway-relationships',
    name: 'Build VPC has NAT Gateway Relationships',
    entities: [],
    relationships: [
      {
        _type: 'alibaba_cloud_vpc_has_nat_gateway',
        sourceType: 'alibaba_cloud_vpc',
        _class: RelationshipClass.HAS,
        targetType: 'alibaba_cloud_nat_gateway',
      },
    ],
    dependsOn: ['fetch-vpcs', 'fetch-nat-gateways'],
    implemented: true,
  },
  {
    /**
     * PATTERN: Build Child Relationships
     */
    id: 'build-vpc-has-vpn-gateway-relationships',
    name: 'Build VPC has VPN Gateway Relationships',
    entities: [],
    relationships: [
      {
        _type: 'alibaba_cloud_vpc_has_vpn_gateway',
        sourceType: 'alibaba_cloud_vpc',
        _class: RelationshipClass.HAS,
        targetType: 'alibaba_cloud_vpn_gateway',
      },
    ],
    dependsOn: ['fetch-vpcs', 'fetch-vpn-gateways'],
    implemented: true,
  },
];
