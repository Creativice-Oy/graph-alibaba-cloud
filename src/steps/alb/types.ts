export interface LoadBalancer {
  AccessLogConfig?: {
    LogProject?: string;
    LogStore?: string;
  };
  AddressAllocatedMode?: string;
  AddressType?: string;
  BandwidthPackageId?: string;
  CreateTime?: string;
  DNSName?: string;
  DeletionProtectionConfig?: {
    Enabled?: string;
    EnabledTime?: string;
  };
  LoadBalancerBillingConfig?: {
    PayType?: string;
  };
  LoadBalancerBussinessStatus?: string;
  LoadBalancerEdition: string;
  LoadBalancerId: string;
  LoadBalancerName: string;
  LoadBalancerOperationLocks?: {
    LockReason?: string;
    LockType?: string;
  }[];
  LoadBalancerStatus?: string;
  ModificationProtectionConfig?: {
    Reason?: string;
    Status?: string;
  };
  ResourceGroupId?: string;
  Tags?: {
    Key?: string;
    Value?: string;
  }[];
  VpcId: string;
  AddressIpVersion?: string;
  Ipv6AddressType?: string;
}

export enum ALBNetworkType {
  INTERNET = 'internet',
  INTRANET = 'intranet',
}
