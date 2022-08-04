import AlibabaOSSClient, { Bucket, ObjectMeta } from 'ali-oss';

import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import { BucketInfo, BucketInfoResponse, BucketsResponse } from '../types';

export class OSSClient {
  private config: IntegrationConfig;
  private client: AlibabaOSSClient;
  private perPage = 100;

  constructor(config: IntegrationConfig) {
    this.config = config;
    this.client = new AlibabaOSSClient({
      accessKeyId: this.config.accessKeyId,
      accessKeySecret: this.config.accessKeySecret,
    });
  }

  public async iterateBuckets(
    iteratee: ResourceIteratee<Bucket>,
  ): Promise<void> {
    let nextMarker = '';
    do {
      const res: BucketsResponse = (await this.client.listBuckets({
        'max-keys': this.perPage,
        marker: nextMarker,
      })) as any;
      nextMarker = res.nextMarker;

      for (const bucket of res.buckets) {
        await iteratee(bucket);
      }
    } while (nextMarker);
  }

  public async iterateObjects(
    bucket: BucketInfo,
    iteratee: ResourceIteratee<ObjectMeta>,
  ): Promise<void> {
    const client = new AlibabaOSSClient({
      accessKeyId: this.config.accessKeyId,
      accessKeySecret: this.config.accessKeySecret,
      bucket: bucket.Name,
      region: bucket.Location,
    });

    let nextMarker = '';
    do {
      const res = await client.list(
        {
          'max-keys': this.perPage,
          marker: nextMarker,
        },
        {},
      );
      nextMarker = res.nextMarker;

      for (const object of res.objects) {
        await iteratee(object);
      }
    } while (nextMarker);
  }

  public async getBucketInfo(bucketName: string): Promise<BucketInfoResponse> {
    return this.client.getBucketInfo(bucketName);
  }
}

export function createOSSClient(config: IntegrationConfig): OSSClient {
  return new OSSClient(config);
}
