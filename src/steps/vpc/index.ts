import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createVPCClient } from './client/client';
import { IntegrationConfig } from '../../config';
import { VPCEntities, VPCRelationships, VPCSteps } from './constants';
import {
  createNATGatewayEntity,
  createVPCEntity,
  createVPNGatewayEntity,
  getVpcKey,
} from './converter';
import { NATGateway, VPNGateway } from './types';

export async function fetchVPCs({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createVPCClient(instance.config, logger);

  await client.iterateVPCs(async (vpc) => {
    await jobState.addEntity(createVPCEntity(vpc));
  });
}

export async function fetchNATGateways({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createVPCClient(instance.config, logger);

  await client.iterateNATGateways(async (natGateway) => {
    await jobState.addEntity(createNATGatewayEntity(natGateway));
  });
}

export async function fetchVPNGateways({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createVPCClient(instance.config, logger);

  await client.iterateVPNGateways(async (vpnGateway) => {
    await jobState.addEntity(createVPNGatewayEntity(vpnGateway));
  });
}

export async function buildVPCHasNATGatewayRelationship({
  logger,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: VPCEntities.NAT_GATEWAY._type },
    async (natGatewayEntity) => {
      const natGateway = getRawData<NATGateway>(natGatewayEntity);
      if (!natGateway) {
        logger.warn(
          { _key: natGatewayEntity._key },
          'Could not get raw data for NAT Gateway entity',
        );
        return;
      }

      const vpcId = natGateway.VpcId;
      if (!vpcId) {
        return;
      }

      const vpcEntity = await jobState.findEntity(getVpcKey(vpcId));
      if (vpcEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: vpcEntity,
            to: natGatewayEntity,
          }),
        );
      }
    },
  );
}

export async function buildVPCHasVPNGatewayRelationship({
  logger,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: VPCEntities.VPN_GATEWAY._type },
    async (vpnGatewayEntity) => {
      const vpnGateway = getRawData<VPNGateway>(vpnGatewayEntity);
      if (!vpnGateway) {
        logger.warn(
          { _key: vpnGatewayEntity._key },
          'Could not get raw data for VPN Gateway entity',
        );
        return;
      }

      const vpcId = vpnGateway.VpcId;
      if (!vpcId) {
        return;
      }

      const vpcEntity = await jobState.findEntity(getVpcKey(vpcId));
      if (vpcEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: vpcEntity,
            to: vpnGatewayEntity,
          }),
        );
      }
    },
  );
}

export const vpcSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: VPCSteps.FETCH_VPCS,
    name: 'Fetch VPCs',
    entities: [VPCEntities.VPC],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchVPCs,
  },
  {
    id: VPCSteps.FETCH_NAT_GATEWAYS,
    name: 'Fetch NAT Gateways',
    entities: [VPCEntities.NAT_GATEWAY],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchNATGateways,
  },
  {
    id: VPCSteps.FETCH_VPN_GATEWAYS,
    name: 'Fetch VPN Gateways',
    entities: [VPCEntities.VPN_GATEWAY],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchVPNGateways,
  },
  {
    id: VPCSteps.BUILD_VPC_NAT_GATEWAY_RELATIONSHIPS,
    name: 'Build VPC has NAT Gateway Relationships',
    entities: [],
    relationships: [VPCRelationships.VPC_HAS_NAT_GATEWAY],
    dependsOn: [VPCSteps.FETCH_VPCS, VPCSteps.FETCH_NAT_GATEWAYS],
    executionHandler: buildVPCHasNATGatewayRelationship,
  },
  {
    id: VPCSteps.BUILD_VPC_VPN_GATEWAY_RELATIONSHIPS,
    name: 'Build VPC has VPN Gateway Relationships',
    entities: [],
    relationships: [VPCRelationships.VPC_HAS_VPN_GATEWAY],
    dependsOn: [VPCSteps.FETCH_VPCS, VPCSteps.FETCH_VPN_GATEWAYS],
    executionHandler: buildVPCHasVPNGatewayRelationship,
  },
];
