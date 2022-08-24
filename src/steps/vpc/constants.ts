import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export enum VPCSteps {
  FETCH_VPCS = 'fetch-vpcs',
  FETCH_NAT_GATEWAYS = 'fetch-nat-gateways',
  FETCH_VPN_GATEWAYS = 'fetch-vpn-gateways',
  BUILD_VPC_NAT_GATEWAY_RELATIONSHIPS = 'build-vpc-has-nat-gateway-relationships',
  BUILD_VPC_VPN_GATEWAY_RELATIONSHIPS = 'build-vpc-has-vpn-gateway-relationships',
}

export const VPCEntities: Record<
  'VPC' | 'NAT_GATEWAY' | 'VPN_GATEWAY',
  StepEntityMetadata
> = {
  VPC: {
    resourceName: 'VPC',
    _type: 'alibaba_cloud_vpc',
    _class: ['Network'],
    schema: {
      additionalProperties: true,
      properties: {
        CIDR: { type: 'string' },
        CIDRv6: { type: 'string' },
        'CIDRv6.mask': { type: 'number' },
        public: { type: 'boolean' },
        internal: { type: 'boolean' },
        createdOn: { type: 'number' },
        status: { type: 'string' },
        id: { type: 'string' },
        isDefault: { type: 'boolean' },
        ownerId: { type: 'string' },
        region: { type: 'string' },
        name: { type: 'string' },
        displayName: { type: 'string' },
        vRouterId: { type: 'string' },
        description: { type: 'string' },
        cenStatus: { type: 'string' },
        vSwitchIds: { type: 'array', items: { type: 'string' } },
        secondaryCidrBlocks: { type: 'array', items: { type: 'string' } },
        userCidrs: { type: 'array', items: { type: 'string' } },
        natGatewayIds: { type: 'array', items: { type: 'string' } },
        routeTableIds: { type: 'array', items: { type: 'string' } },
        resourceGroupId: { type: 'string' },
        networkAclNum: { type: 'number' },
        isAdvancedResource: { type: 'boolean' },
        supportIpv4Gateway: { type: 'boolean' },
        ipv4GatewayId: { type: 'string' },
        vSwitchCount: { type: 'number' },
        vRouterCount: { type: 'number' },
        routeTableCount: { type: 'number' },
        'ipv6CidrBlocks.ipv6Isp': { type: 'array', items: { type: 'string' } },
        'ipv6CidrBlocks.ipv6CidrBlock': {
          type: 'array',
          items: { type: 'string' },
        },
      },
      required: ['CIDR', 'public', 'internal', 'region', 'id'],
    },
  },
  NAT_GATEWAY: {
    resourceName: 'NAT Gateway',
    _type: 'alibaba_cloud_nat_gateway',
    _class: ['Gateway'],
    schema: {
      properties: {
        status: { type: 'string' },
        createdOn: { type: 'number' },
        vpcId: { type: 'string' },
        natType: { type: 'string' },
        autoPay: { type: 'boolean' },
        spec: { type: 'string' },
        deletionProtection: { type: 'boolean' },
        networkType: { type: 'string' },
        securityProtectionEnabled: { type: 'boolean' },
        instanceChargeType: { type: 'string' },
        regionId: { type: 'string' },
        ecsMetricEnabled: { type: 'boolean' },
        icmpReplyEnabled: { type: 'boolean' },
        description: { type: 'string' },
        expiresOn: { type: 'number' },
        resourceGroupId: { type: 'string' },
        id: { type: 'string' },
        internetChargeType: { type: 'string' },
        businessStatus: { type: 'string' },
        name: { type: 'string' },
        forwardTableIds: { type: 'array', items: { type: 'string' } },
        snatTableIds: { type: 'array', items: { type: 'string' } },
        fullNatTableIds: { type: 'array', items: { type: 'string' } },
        'natGatewayPrivateInfo.vswitchId': { type: 'string' },
        'natGatewayPrivateInfo.eniInstanceId': { type: 'string' },
        'natGatewayPrivateInfo.maxBandwidth': { type: 'number' },
        'natGatewayPrivateInfo.maxSessionQuota': { type: 'number' },
        'natGatewayPrivateInfo.maxSessionEstablishRate': { type: 'number' },
        'natGatewayPrivateInfo.izNo': { type: 'string' },
        'natGatewayPrivateInfo.eniType': { type: 'string' },
      },
      required: ['category', 'function', 'public', 'id'],
    },
  },
  VPN_GATEWAY: {
    resourceName: 'VPN Gateway',
    _type: 'alibaba_cloud_vpn_gateway',
    _class: ['Gateway'],
  },
};

export const VPCRelationships: Record<
  'VPC_HAS_NAT_GATEWAY' | 'VPC_HAS_VPN_GATEWAY',
  StepRelationshipMetadata
> = {
  VPC_HAS_NAT_GATEWAY: {
    _type: 'alibaba_cloud_vpc_has_nat_gateway',
    sourceType: VPCEntities.VPC._type,
    _class: RelationshipClass.HAS,
    targetType: VPCEntities.NAT_GATEWAY._type,
  },
  VPC_HAS_VPN_GATEWAY: {
    _type: 'alibaba_cloud_vpc_has_vpn_gateway',
    sourceType: VPCEntities.VPC._type,
    _class: RelationshipClass.HAS,
    targetType: VPCEntities.VPN_GATEWAY._type,
  },
};
