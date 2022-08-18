import { StepEntityMetadata } from '@jupiterone/integration-sdk-core';

export const VPCSteps = {
  FETCH_VPCs: {
    id: 'fetch-vpcs',
    name: 'Fetch VPCs',
  },
};

export const VPCEntities: Record<'VPC', StepEntityMetadata> = {
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
        creationTime: { type: 'number' },
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
};
