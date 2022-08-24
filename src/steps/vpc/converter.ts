import {
  createIntegrationEntity,
  parseTimePropertyValue,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { VPCEntities } from './constants';
import {
  NATGateway,
  NATNetworkType,
  VPC,
  VPCAttribute,
  VPNGateway,
} from './types';

export function getVpcKey(vpcId: string) {
  return `alibaba_cloud_vpc:${vpcId}`;
}

export function getNatKey(natGatewayId: string) {
  return `alibaba_cloud_nat_gateway:${natGatewayId}`;
}

export function getVpnKey(vpnGatewayId: string) {
  return `alibaba_cloud_vpn_gateway:${vpnGatewayId}`;
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

export function createNATGatewayEntity(natGateway: NATGateway): Entity {
  return createIntegrationEntity({
    entityData: {
      source: natGateway,
      assign: {
        _key: getNatKey(natGateway.NatGatewayId),
        _type: VPCEntities.NAT_GATEWAY._type,
        _class: VPCEntities.NAT_GATEWAY._class,
        category: ['network'],
        function: ['nat'],
        public: natGateway.NetworkType === NATNetworkType.INTERNET,
        status: natGateway.Status,
        createdOn: parseTimePropertyValue(natGateway.CreationTime),
        vpcId: natGateway.VpcId,
        natType: natGateway.NatType,
        autoPay: natGateway.AutoPay,
        spec: natGateway.Spec,
        deletionProtection: natGateway.DeletionProtection,
        networkType: natGateway.NetworkType,
        securityProtectionEnabled: natGateway.SecurityProtectionEnabled,
        instanceChargeType: natGateway.InstanceChargeType,
        regionId: natGateway.RegionId,
        ecsMetricEnabled: natGateway.EcsMetricEnabled,
        icmpReplyEnabled: natGateway.IcmpReplyEnabled,
        description: natGateway.Description,
        expiresOn: parseTimePropertyValue(natGateway.ExpiredTime),
        resourceGroupId: natGateway.ResourceGroupId,
        id: natGateway.NatGatewayId,
        internetChargeType: natGateway.InternetChargeType,
        businessStatus: natGateway.BusinessStatus,
        name: natGateway.Name,
        forwardTableIds: natGateway.ForwardTableIds.ForwardTableId,
        snatTableIds: natGateway.SnatTableIds.SnatTableId,
        fullNatTableIds: natGateway.FullNatTableIds.FullNatTableId,
        'natGatewayPrivateInfo.vswitchId':
          natGateway.NatGatewayPrivateInfo.VswitchId,
        'natGatewayPrivateInfo.eniInstanceId':
          natGateway.NatGatewayPrivateInfo.EniInstanceId,
        'natGatewayPrivateInfo.maxBandwidth':
          natGateway.NatGatewayPrivateInfo.MaxBandwidth,
        'natGatewayPrivateInfo.maxSessionQuota':
          natGateway.NatGatewayPrivateInfo.MaxSessionQuota,
        'natGatewayPrivateInfo.maxSessionEstablishRate':
          natGateway.NatGatewayPrivateInfo.MaxSessionEstablishRate,
        'natGatewayPrivateInfo.izNo': natGateway.NatGatewayPrivateInfo.IzNo,
        'natGatewayPrivateInfo.eniType':
          natGateway.NatGatewayPrivateInfo.EniType,
      },
    },
  });
}

export function createVPNGatewayEntity(vpnGateway: VPNGateway): Entity {
  return createIntegrationEntity({
    entityData: {
      source: vpnGateway,
      assign: {
        _type: VPCEntities.VPN_GATEWAY._type,
        _class: VPCEntities.VPN_GATEWAY._class,
        _key: getVpnKey(vpnGateway.VpnGatewayId),
        status: vpnGateway.Status,
        active: vpnGateway.Status === 'active',
        ipsecVpn: vpnGateway.IpsecVpn,
        sslVpn: vpnGateway.SslVpn,
        vpnType: vpnGateway.VpnType,
        enableBgp: vpnGateway.EnableBgp,
        createdOn: vpnGateway.CreateTime,
        endedOn: vpnGateway.EndTime,
        businessStatus: vpnGateway.BusinessStatus,
        name: vpnGateway.Name,
        vpcId: vpnGateway.VpcId,
        vpnGatewayId: vpnGateway.VpnGatewayId,
        chargeType: vpnGateway.ChargeType,
        networkType: vpnGateway.NetworkType,
        spec: vpnGateway.Spec,
        tag: vpnGateway.Tag,
        category: ['network'],
        function: ['other'],
        public: vpnGateway.NetworkType === 'public',
      },
    },
  });
}
