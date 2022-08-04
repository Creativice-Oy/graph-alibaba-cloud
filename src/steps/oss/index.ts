import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createOSSClient } from './client/client';
import { IntegrationConfig } from '../../config';
import { OSSEntities, OSSRelationships, OSSSteps } from './constants';
import { createOSSBucketEntity, createOSSObjectEntity } from './converter';
import { BucketInfo } from './types';

export async function fetchBuckets({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createOSSClient(instance.config);

  await client.iterateBuckets(async (bucket) => {
    const bucketDetailsResp = await client.getBucketInfo(bucket.name);
    await jobState.addEntity(createOSSBucketEntity(bucketDetailsResp.bucket));
  });
}

export async function fetchObjects({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createOSSClient(instance.config);

  await jobState.iterateEntities(
    { _type: OSSEntities.OSS_BUCKET._type },
    async (bucketEntity) => {
      const bucket = getRawData<BucketInfo>(bucketEntity);

      if (!bucket) {
        logger.warn(
          { _key: bucketEntity._key },
          'Could not get raw data for bucket entity',
        );
        return;
      }

      await client.iterateObjects(bucket, async (object) => {
        const objectEntity = await jobState.addEntity(
          createOSSObjectEntity(object),
        );

        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: bucketEntity,
            to: objectEntity,
          }),
        );
      });
    },
  );
}

export const ossSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: OSSSteps.FETCH_OSS_BUCKETS.id,
    name: OSSSteps.FETCH_OSS_BUCKETS.name,
    entities: [OSSEntities.OSS_BUCKET],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchBuckets,
  },
  {
    id: OSSSteps.FETCH_OSS_OBJECTS.id,
    name: OSSSteps.FETCH_OSS_OBJECTS.name,
    entities: [OSSEntities.OSS_OBJECT],
    relationships: [OSSRelationships.OSS_BUCKET_HAS_OSS_OBJECT],
    dependsOn: [OSSSteps.FETCH_OSS_BUCKETS.id],
    executionHandler: fetchObjects,
  },
];
