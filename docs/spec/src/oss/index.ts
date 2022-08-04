import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const ossSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-oss-buckets',
    name: 'Fetch OSS Buckets',
    entities: [
      {
        resourceName: 'OSS Bucket',
        _type: 'alibaba_cloud_oss_bucket',
        _class: ['DataStore'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    id: 'fetch-oss-objects',
    name: 'Fetch OSS Objects',
    entities: [
      {
        resourceName: 'OSS Object',
        _type: 'alibaba_cloud_oss_object',
        _class: ['DataObject'],
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        sourceType: 'alibaba_cloud_oss_bucket',
        targetType: 'alibaba_cloud_oss_object',
        _type: 'alibaba_cloud_oss_bucket_has_object',
      },
    ],
    dependsOn: ['fetch-oss-buckets'],
    implemented: true,
  },
];
