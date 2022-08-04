import { Bucket } from 'ali-oss';

export interface BucketsResponse extends Response {
  buckets: Bucket[];
}

export interface Response {
  owner: { id: string; displayName: string };
  isTruncated: boolean;
  nextMarker: string;
}

export interface BucketInfo {
  AccessMonitor: string;
  Comment: string;
  CreationDate: string;
  CrossRegionReplication: string;
  DataRedundancyType: string;
  ExtranetEndpoint: string;
  IntranetEndpoint: string;
  Location: string;
  Name: string;
  ResourceGroupId: string;
  StorageClass: string;
  TransferAcceleration: string;
  Owner: { DisplayName: string; ID: string };
  AccessControlList: { Grant: string };
  ServerSideEncryptionRule: { KMSMasterKeyID: string; SSEAlgorithm: string };
  BucketPolicy: { LogBucket: string; LogPrefix: string };
}

export interface BucketInfoResponse extends Response {
  bucket: BucketInfo;
}
