import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { ALBEntities } from './constants';
import { ALBNetworkType, LoadBalancer } from './types';

export function getAlbLoadBalancerKey(id: string): string {
  return `alibaba_cloud_alb_load_balancer:${id}`;
}

export function createALBLoadBalancerEntity(
  loadBalancer: LoadBalancer,
): Entity {
  const deletionProtectionEnabledTime = loadBalancer.DeletionProtectionConfig
    ?.EnabledTime
    ? parseTimePropertyValue(loadBalancer.DeletionProtectionConfig?.EnabledTime)
    : undefined;

  return createIntegrationEntity({
    entityData: {
      source: loadBalancer,
      assign: {
        _type: ALBEntities.ALB_LOAD_BALANCER._type,
        _class: ALBEntities.ALB_LOAD_BALANCER._class,
        _key: getAlbLoadBalancerKey(loadBalancer.LoadBalancerId),
        id: loadBalancer.LoadBalancerId,
        name: loadBalancer.LoadBalancerName,
        displayName: loadBalancer.LoadBalancerName,
        'accessLogConfig.logProject': loadBalancer.AccessLogConfig?.LogProject,
        'accessLogConfig.logStore': loadBalancer.AccessLogConfig?.LogStore,
        addressAllocatedMode: loadBalancer.AddressAllocatedMode,
        addressType: loadBalancer.AddressType,
        bandwidthPackageId: loadBalancer.BandwidthPackageId,
        createdOn: parseTimePropertyValue(loadBalancer.CreateTime),
        dnsName: loadBalancer.DNSName,
        'deletionProtectionConfig.enabled':
          loadBalancer.DeletionProtectionConfig?.Enabled,
        'deletionProtectionConfig.enabledTime': deletionProtectionEnabledTime,
        'loadBalancerBillingConfig.payType':
          loadBalancer.LoadBalancerBillingConfig?.PayType,
        loadBalancerBussinessStatus: loadBalancer.LoadBalancerBussinessStatus,
        loadBalancerEdition: loadBalancer.LoadBalancerEdition,
        loadBalancerStatus: loadBalancer.LoadBalancerStatus,
        'modificationProtectionConfig.reason':
          loadBalancer.ModificationProtectionConfig?.Reason,
        'modificationProtectionConfig.status':
          loadBalancer.ModificationProtectionConfig?.Status,
        ResourceGroupId: loadBalancer.ResourceGroupId,
        VpcId: loadBalancer.VpcId,
        AddressIpVersion: loadBalancer.AddressIpVersion,
        Ipv6AddressType: loadBalancer.Ipv6AddressType,
        category: ['network'],
        function: ['load-balancing'],
        public: loadBalancer.AddressType === ALBNetworkType.INTERNET,
      },
    },
  });
}
