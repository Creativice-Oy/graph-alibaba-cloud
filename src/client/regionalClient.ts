import AlibabaClient from '@alicloud/pop-core';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';
import { ServiceClient } from './client';
import { AlibabaResponse } from './types/response';

export type RegionalResourceIteratee<T> = (each: {
  resource: T;
  region: string;
}) => Promise<void> | void;

interface AlibabaClientConfig {
  accessKeyId: string;
  accessKeySecret: string;
  endpoint: string;
  apiVersion: string;
}

interface Region {
  RegionId: string;
  RegionEndpoint: string;
  LocalName: string;
}

interface DescribeRegionsResponse extends AlibabaResponse {
  Regions: {
    Region: Region[];
  };
}

export abstract class RegionalServiceClient extends ServiceClient {
  private config: AlibabaClientConfig;
  private rootClient: AlibabaClient;
  private regionalClients: AlibabaClient[];
  private regionIds: string[];

  constructor(options: {
    logger: IntegrationLogger;
    rootClientConfig: AlibabaClientConfig;
  }) {
    super(options);
    this.config = options.rootClientConfig;
    this.rootClient = new AlibabaClient(options.rootClientConfig);
    this.regionalClients = [];
    this.regionIds = [];
  }

  private async getRegionalClients() {
    if (this.regionalClients.length) return;
    const {
      Regions: { Region: regionList },
    } = await this.request<DescribeRegionsResponse>({
      client: this.rootClient,
      action: 'DescribeRegions',
      parameters: {},
    });

    this.regionalClients = regionList.map(
      (region) =>
        new AlibabaClient({
          ...this.config,
          endpoint: 'https://' + region.RegionEndpoint,
        }),
    );
    this.regionIds = regionList.map((region) => region.RegionId);
  }

  protected async forEachRegion(
    cb: (regionalClient: AlibabaClient, regionId: string) => Promise<void>,
  ) {
    await this.getRegionalClients();

    const cbRoutines = this.regionalClients.map((client, idx) =>
      cb(client, this.regionIds[idx]),
    );
    const results = await Promise.allSettled(cbRoutines);
    let errorCount = 0;

    results.forEach((res) => {
      if (res.status === 'rejected') errorCount++;
    });

    if (errorCount > 0) {
      throw new Error(`Failing regions: ${errorCount}`);
    }
  }
}
