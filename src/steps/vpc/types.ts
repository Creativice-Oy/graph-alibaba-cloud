interface Tag {
  key: string;
  value: string;
}

interface Ipv6CidrBlock {
  Ipv6Isp: string;
  Ipv6CidrBlock: string;
}

export enum VPCStatus {
  AVAILABLE = 'Available',
  PENDING = 'Pending',
}

export interface VPC {
  CreationTime: string;
  Status: VPCStatus;
  VpcId: string;
  IsDefault: boolean;
  OwnerId: string;
  RegionId: string;
  VpcName: string;
  VRouterId: string;
  DhcpOptionsSetStatus?: string;
  CidrBlock: string;
  Description: string;
  Ipv6CidrBlock: string;
  CenStatus: string;
  Tags?: Tag[];
  Ipv6CidrBlocks?: { Ipv6CidrBlock: Ipv6CidrBlock[] };
  VSwitchIds: { VSwitchId: string[] };
  SecondaryCidrBlocks: { SecondaryCidrBlock: string[] };
  UserCidrs: { UserCidr: string[] };
  NatGatewayIds: { NatGatewayIds: string[] };
  RouterTableIds: { RouterTableIds: string[] };
  ResourceGroupId: string;
  NetworkAclNum: number;
  AdvancedResource: boolean;
}

interface CloudResource {
  ResourceCount: number;
  ResourceType: string;
}

export interface VPCAttribute {
  CreationTime: string;
  Status: VPCStatus;
  VpcId: string;
  IsDefault: boolean;
  ClassicLinkEnabled?: boolean;
  OwnerId: string;
  RegionId: string;
  VpcName: string;
  VRouterId: string;
  DhcpOptionsSetStatus?: string;
  CidrBlock: string;
  Description: string;
  ResourceGroupId: string;
  DhcpOptionsSetId?: string;
  Ipv6CidrBlock: string;
  VSwitchIds: { VSwitchId: string[] };
  UserCidrs: { UserCidr: string[] };
  SecondaryCidrBlocks: { SecondaryCidrBlock: string[] };
  CloudResources: { CloudResourceSetType: CloudResource[] };
  Ipv6CidrBlocks?: { Ipv6CidrBlock: Ipv6CidrBlock[] };
  SupportIpv4Gateway: boolean;
  Ipv4GatewayId: string;
  NetworkAclNum: number;
}

export enum NATInstanceChargeType {
  POSTPAID = 'PostPaid',
  PREPAID = 'PrePaid',
}

export enum NATGatewayStatus {
  CREATING = 'Creating',
  AVAILABLE = 'Available',
  MODIFYING = 'Modifying',
  DELETING = 'Deleting',
  CONVERTING = 'Converting',
}

export enum NATNetworkType {
  INTERNET = 'internet',
  INTRANET = 'intranet',
}

export interface NATIP {
  UsingStatus: string;
  IpAddress: string;
  AllocationId: string;
  PrivateIpAddress: string;
  SnatEntryEnabled?: boolean;
}

export interface NATGateway {
  Status: NATGatewayStatus;
  CreationTime: string;
  VpcId: string;
  NatType: string;
  AutoPay: boolean;
  Spec: string;
  DeletionProtection: boolean;
  NetworkType: NATNetworkType;
  SecurityProtectionEnabled: boolean;
  InstanceChargeType: NATInstanceChargeType;
  RegionId: string;
  EcsMetricEnabled: boolean;
  IcmpReplyEnabled: boolean;
  Description: string;
  ExpiredTime: string;
  ResourceGroupId: string;
  NatGatewayId: string;
  InternetChargeType: string;
  BusinessStatus: string;
  Name: string;
  IpLists: { IpList: NATIP[] };
  ForwardTableIds: { ForwardTableId: string[] };
  SnatTableIds: { SnatTableId: string[] };
  FullNatTableIds: { FullNatTableId: string[] };
  BandwidthPackageIds?: { BandwidthPackageId: string[] };
  NatGatewayPrivateInfo: {
    VswitchId: string;
    EniInstanceId: string;
    MaxBandwidth: number;
    MaxSessionQuota: number;
    MaxSessionEstablishRate: number;
    IzNo: string;
    EniType: string;
  };
  PrivateLinkEnabled?: boolean;
  PrivateLinkMode?: string;
}

export interface VPNGateway {
  Status?: string;
  IpsecVpn?: string;
  SslVpn?: string;
  VpnType?: string;
  EnableBgp?: boolean;
  CreateTime?: number;
  EndTime?: number;
  BusinessStatus?: string;
  Name?: string;
  VpcId?: string;
  VpnGatewayId: string;
  ChargeType?: string;
  NetworkType?: string;
  Spec?: string;
  Tag?: string;
}
