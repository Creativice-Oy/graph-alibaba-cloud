import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const OSSSteps = {
  FETCH_OSS_BUCKETS: {
    id: 'fetch-oss-buckets',
    name: 'Fetch OSS Buckets',
  },
  FETCH_OSS_OBJECTS: {
    id: 'fetch-oss-objects',
    name: 'Fetch OSS Objects',
  },
};

export const OSSEntities: Record<
  'OSS_BUCKET' | 'OSS_OBJECT',
  StepEntityMetadata
> = {
  OSS_BUCKET: {
    resourceName: 'OSS Bucket',
    _type: 'alibaba_cloud_oss_bucket',
    _class: ['DataStore'],
  },
  OSS_OBJECT: {
    resourceName: 'OSS Object',
    _type: 'alibaba_cloud_oss_object',
    _class: ['DataObject'],
  },
};

export const OSSRelationships: Record<
  'OSS_BUCKET_HAS_OSS_OBJECT',
  StepRelationshipMetadata
> = {
  OSS_BUCKET_HAS_OSS_OBJECT: {
    _type: 'alibaba_cloud_oss_bucket_has_object',
    _class: RelationshipClass.HAS,
    sourceType: OSSEntities.OSS_BUCKET._type,
    targetType: OSSEntities.OSS_OBJECT._type,
  },
};
