import AlibabaClient from '@alicloud/pop-core';
import { ResourceIteratee, ServiceClient } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import {
  ListUsersResponse,
  ListGroupsResponse,
  ListRolesResponse,
  ListPoliciesResponse,
  GetAliasResponse,
} from './types/response';
import { User, Group, Role, Policy } from '../types';
import {
  ListUsersParameters,
  ListGroupsParameters,
  ListRolesParameters,
  ListPoliciesParameters,
  RAMRequest,
} from './types/request';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';
import { RAM_REQ_TIMEOUT } from '../constants';

export class RAMClient extends ServiceClient {
  private client: AlibabaClient;
  private perPage = 100;
  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    super({ logger });

    this.client = new AlibabaClient({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: 'https://ram.aliyuncs.com',
      apiVersion: '2015-05-01',
      opts: {
        timeout: RAM_REQ_TIMEOUT,
      },
    });
  }

  public async iterateUsers(iteratee: ResourceIteratee<User>): Promise<void> {
    return this.forEachPage(async (nextToken?: string) => {
      let parameters: ListUsersParameters = {
        MaxItems: this.perPage,
      };

      if (nextToken) parameters = { ...parameters, Marker: nextToken };

      const req: RAMRequest = {
        client: this.client,
        action: 'ListUsers',
        parameters,
      };

      const response = await this.request<ListUsersResponse>(req);
      const users = response.Users.User;

      for (const user of users) {
        await iteratee(user);
      }

      return response.Marker || '';
    });
  }

  public async iterateGroups(iteratee: ResourceIteratee<Group>): Promise<void> {
    return this.forEachPage(async (nextToken?: string) => {
      let parameters: ListUsersParameters = {
        MaxItems: this.perPage,
      };

      if (nextToken) parameters = { ...parameters, Marker: nextToken };

      const req: RAMRequest = {
        client: this.client,
        action: 'ListGroups',
        parameters,
      };

      const response = await this.request<ListGroupsResponse>(req);
      const groups = response.Groups.Group;

      for (const group of groups) {
        await iteratee(group);
      }

      return response.Marker || '';
    });
  }

  public async iterateRoles(iteratee: ResourceIteratee<Role>): Promise<void> {
    return this.forEachPage(async (nextToken?: string) => {
      let parameters: ListUsersParameters = {
        MaxItems: this.perPage,
      };

      if (nextToken) parameters = { ...parameters, Marker: nextToken };

      const req: RAMRequest = {
        client: this.client,
        action: 'ListRoles',
        parameters,
      };

      const response = await this.request<ListRolesResponse>(req);
      const roles = response.Roles.Role;

      for (const role of roles) {
        await iteratee(role);
      }

      return response.Marker || '';
    });
  }

  public async iteratePoliciesOfUser(
    userName: string,
    iteratee: ResourceIteratee<Policy>,
  ): Promise<void> {
    const parameters: ListPoliciesParameters = {
      UserName: userName,
    };

    const req: RAMRequest = {
      client: this.client,
      action: 'ListPoliciesForUser',
      parameters,
    };

    const response = await this.request<ListPoliciesResponse>(req);
    const policies = response.Policies.Policy;
    for (const policy of policies) {
      await iteratee(policy);
    }
  }

  public async iteratePoliciesOfGroup(
    groupName: string,
    iteratee: ResourceIteratee<Policy>,
  ): Promise<void> {
    const parameters: ListPoliciesParameters = {
      GroupName: groupName,
    };

    const req: RAMRequest = {
      client: this.client,
      action: 'ListPoliciesForGroup',
      parameters,
    };

    const response = await this.request<ListPoliciesResponse>(req);
    const policies = response.Policies.Policy;
    for (const policy of policies) {
      await iteratee(policy);
    }
  }

  public async iteratePoliciesOfRole(
    roleName: string,
    iteratee: ResourceIteratee<Policy>,
  ): Promise<void> {
    const parameters: ListPoliciesParameters = {
      RoleName: roleName,
    };

    const req: RAMRequest = {
      client: this.client,
      action: 'ListPoliciesForRole',
      parameters,
    };

    const response = await this.request<ListPoliciesResponse>(req);
    const policies = response.Policies.Policy;
    for (const policy of policies) {
      await iteratee(policy);
    }
  }

  public async iterateUsersOfGroups(
    groupName: string,
    iteratee: ResourceIteratee<User>,
  ): Promise<void> {
    return this.forEachPage(async (nextToken?: string) => {
      let parameters: ListUsersParameters = {
        MaxItems: this.perPage,
        GroupName: groupName,
      };

      if (nextToken) parameters = { ...parameters, Marker: nextToken };

      const req: RAMRequest = {
        client: this.client,
        action: 'ListUsersForGroup',
        parameters,
      };

      const response = await this.request<ListUsersResponse>(req);
      const users = response.Users.User;

      for (const user of users) {
        await iteratee(user);
      }

      return response.Marker || '';
    });
  }

  public async iterateUsersOfPolicy(
    policyType: string,
    policyName: string,
    iteratee: ResourceIteratee<User>,
  ): Promise<void> {
    const parameters: ListUsersParameters = {
      PolicyType: policyType,
      PolicyName: policyName,
    };

    const req: RAMRequest = {
      client: this.client,
      action: 'ListEntitiesForPolicy',
      parameters,
    };

    const response = await this.request<ListUsersResponse>(req);
    const users = response.Users.User;
    for (const user of users) {
      await iteratee(user);
    }
  }

  public async iterateGroupsOfPolicy(
    policyType: string,
    policyName: string,
    iteratee: ResourceIteratee<Group>,
  ): Promise<void> {
    const parameters: ListGroupsParameters = {
      PolicyType: policyType,
      PolicyName: policyName,
    };

    const req: RAMRequest = {
      client: this.client,
      action: 'ListEntitiesForPolicy',
      parameters,
    };

    const response = await this.request<ListGroupsResponse>(req);
    const groups = response.Groups.Group;
    for (const group of groups) {
      await iteratee(group);
    }
  }

  public async iterateRolesOfPolicy(
    policyType: string,
    policyName: string,
    iteratee: ResourceIteratee<Role>,
  ): Promise<void> {
    const parameters: ListRolesParameters = {
      PolicyType: policyType,
      PolicyName: policyName,
    };

    const req: RAMRequest = {
      client: this.client,
      action: 'ListEntitiesForPolicy',
      parameters,
    };

    const response = await this.request<ListRolesResponse>(req);
    const roles = response.Roles.Role;
    for (const role of roles) {
      await iteratee(role);
    }
  }

  public async getEnterpriseAlias() {
    const parameters = {};
    const req: RAMRequest = {
      client: this.client,
      action: 'GetAccountAlias',
      parameters,
    };

    const response = await this.request<GetAliasResponse>(req);
    return response.AccountAlias;
  }
}

export function createRAMClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): RAMClient {
  return new RAMClient(config, logger);
}
