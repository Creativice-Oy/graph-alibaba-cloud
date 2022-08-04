import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { ObjectMeta } from 'ali-oss';

import { BucketInfo } from './types';
import { OSSEntities } from './constants';

export function createOSSBucketEntity(bucket: BucketInfo): Entity {
  return createIntegrationEntity({
    entityData: {
      source: bucket,
      assign: {
        _type: OSSEntities.OSS_BUCKET._type,
        _class: OSSEntities.OSS_BUCKET._class,
        _key: `alibaba_cloud_oss_bucket:${bucket.Name}`,
        name: bucket.Name,
        location: bucket.Location,
        creationDate: parseTimePropertyValue(bucket.CreationDate),
        classification: 'public',
        encrypted: bucket.ServerSideEncryptionRule.SSEAlgorithm !== 'None',
        accessMonitor: bucket.AccessMonitor !== 'Disabled',
        comment: bucket.Comment,
        crossRegionReplication: bucket.CrossRegionReplication,
        dataRedundancyType: bucket.DataRedundancyType,
        extranetEndpoint: bucket.ExtranetEndpoint,
        intranetEndpoint: bucket.IntranetEndpoint,
        resourceGroupId: bucket.ResourceGroupId,
        storageClass: bucket.StorageClass,
        transferAcceleration: bucket.TransferAcceleration !== 'Disabled',
        'owner.displayName': bucket.Owner.DisplayName,
        'owner.id': bucket.Owner.ID,
        'accessControlList.grant': bucket.AccessControlList.Grant,
        'serverSideEncryptionRule.kmsMasterKeyId':
          bucket.ServerSideEncryptionRule.KMSMasterKeyID,
        'serverSideEncryptionRule.sseAlgorithm':
          bucket.ServerSideEncryptionRule.SSEAlgorithm,
        'bucketPolicy.logBucket': bucket.BucketPolicy.LogBucket,
        'bucketPolicy.logPrefix': bucket.BucketPolicy.LogPrefix,
      },
    },
  });
}

export function createOSSObjectEntity(object: ObjectMeta): Entity {
  return createIntegrationEntity({
    entityData: {
      source: object,
      assign: {
        _type: OSSEntities.OSS_OBJECT._type,
        _class: OSSEntities.OSS_OBJECT._class,
        _key: `alibaba_cloud_oss_object:${object.name}`,
        name: object.name,
        classification: 'public',
        webLink: object.url,
        modifiedOn: parseTimePropertyValue(object.lastModified),
        etag: object.etag,
        type: object.type,
        size: object.size,
        storageClass: object.storageClass,
        'owner.id': object.owner?.id,
        'owner.displayName': object.owner?.displayName,
      },
    },
  });
}
