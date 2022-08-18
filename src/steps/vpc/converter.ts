import {
  createIntegrationEntity,
  parseTimePropertyValue,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { VPCEntities } from './constants';
import { VPC, VPCAttribute } from './types';

export function getVpcKey(vpcId: string) {
  return `alibaba_cloud_vpc:${vpcId}`;
}

export function createVPCEntity(vpc: VPC & VPCAttribute): Entity {
  const cidrV6 = vpc.Ipv6CidrBlock
    ? vpc.Ipv6CidrBlock.split('/')[0]
    : undefined;
  const cidrV6Mask = vpc.Ipv6CidrBlock
    ? Number(vpc.Ipv6CidrBlock.split('/')[1])
    : undefined;

  return createIntegrationEntity({
    entityData: {
      source: vpc,
      assign: {
        _key: getVpcKey(vpc.VpcId),
        _type: VPCEntities.VPC._type,
        _class: VPCEntities.VPC._class,
        CIDR: vpc.CidrBlock,
        // property is being enforced in strictly ipv6 format so mask has to be separated
        CIDRv6: cidrV6,
        'CIDRv6.mask': cidrV6Mask,
        public: false, // replace with derived value
        internal: true, // replace with derived value
        createdOn: parseTimePropertyValue(vpc.CreationTime),
        status: vpc.Status,
        id: vpc.VpcId,
        isDefault: vpc.IsDefault,
        ownerId: String(vpc.OwnerId),
        region: vpc.RegionId,
        name: vpc.VpcName,
        displayName: vpc.VpcName,
        vRouterId: vpc.VRouterId,
        description: vpc.Description,
        cenStatus: vpc.CenStatus,
        vSwitchIds: vpc.VSwitchIds.VSwitchId,
        secondaryCidrBlocks: vpc.SecondaryCidrBlocks.SecondaryCidrBlock,
        userCidrs: vpc.UserCidrs.UserCidr,
        natGatewayIds: vpc.NatGatewayIds.NatGatewayIds,
        routeTableIds: vpc.RouterTableIds.RouterTableIds,
        resourceGroupId: vpc.ResourceGroupId,
        networkAclNum: vpc.NetworkAclNum,
        isAdvancedResource: vpc.AdvancedResource,
        supportIpv4Gateway: vpc.SupportIpv4Gateway,
        ipv4GatewayId: vpc.Ipv4GatewayId,
        vSwitchCount:
          vpc.CloudResources.CloudResourceSetType.find(
            (r) => r.ResourceType === 'VSwitch',
          )?.ResourceCount || 0,
        vRouterCount:
          vpc.CloudResources.CloudResourceSetType.find(
            (r) => r.ResourceType === 'VRouter',
          )?.ResourceCount || 0,
        routeTableCount:
          vpc.CloudResources.CloudResourceSetType.find(
            (r) => r.ResourceType === 'RouteTable',
          )?.ResourceCount || 0,
        'ipv6CidrBlocks.ipv6Isp': vpc.Ipv6CidrBlocks?.Ipv6CidrBlock?.map(
          (v) => v.Ipv6Isp,
        ),
        'ipv6CidrBlocks.ipv6CidrBlock': vpc.Ipv6CidrBlocks?.Ipv6CidrBlock?.map(
          (v) => v.Ipv6CidrBlock,
        ),
      },
    },
  });
}
