import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createALBClient } from './client/client';
import { LoadBalancer } from './types';
import { IntegrationConfig } from '../../config';
import { ALBEntities, ALBRelationships, ALBSteps } from './constants';
import { createALBLoadBalancerEntity } from './converter';
import { VPCSteps } from '../vpc/constants';
import { getVpcKey } from '../vpc/converter';

export async function fetchAlbLoadBalancers({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createALBClient(instance.config, logger);

  await client.iterateLoadBalancers(async (loadBalancer) => {
    await jobState.addEntity(createALBLoadBalancerEntity(loadBalancer));
  });
}

export async function buildVpcHasAlbLoadBalancerRelationship({
  logger,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    {
      _type: ALBEntities.ALB_LOAD_BALANCER._type,
    },
    async (albLoadBalancerEntity) => {
      const albLoadBalancer = getRawData<LoadBalancer>(albLoadBalancerEntity);
      if (!albLoadBalancer) {
        logger.warn(
          { _key: albLoadBalancerEntity._key },
          'Could not get raw data for ALB Load Balancer entity',
        );
        return;
      }

      const vpcEntity = await jobState.findEntity(
        getVpcKey(albLoadBalancer.VpcId),
      );
      if (!vpcEntity) {
        return;
      }

      if (vpcEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: vpcEntity,
            to: albLoadBalancerEntity,
          }),
        );
      }
    },
  );
}

export const albSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: ALBSteps.FETCH_ALB_LOAD_BALANCERS.id,
    name: ALBSteps.FETCH_ALB_LOAD_BALANCERS.name,
    entities: [ALBEntities.ALB_LOAD_BALANCER],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchAlbLoadBalancers,
  },
  {
    id: ALBSteps.BUILD_VPC_ALB_LOAD_BALANCER_RELATIONSHIPS.id,
    name: ALBSteps.BUILD_VPC_ALB_LOAD_BALANCER_RELATIONSHIPS.name,
    entities: [],
    relationships: [ALBRelationships.VPC_HAS_ALB_LOAD_BALANCER],
    dependsOn: [ALBSteps.FETCH_ALB_LOAD_BALANCERS.id, VPCSteps.FETCH_VPCS],
    executionHandler: buildVpcHasAlbLoadBalancerRelationship,
  },
];
