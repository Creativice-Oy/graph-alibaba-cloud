import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { RAMEntities } from './constants';
import { User, Group, Role, Policy } from './types';

export function getAccountKey(name: string): string {
  return `alibaba_cloud_ram_account:${name}`;
}

export function createAccountEntity(account: { accountAlias: string }): Entity {
  return createIntegrationEntity({
    entityData: {
      source: account,
      assign: {
        _key: getAccountKey(account.accountAlias),
        _type: RAMEntities.ACCOUNT._type,
        _class: RAMEntities.ACCOUNT._class,
        name: account.accountAlias,
      },
    },
  });
}
export function getRAMUserKey(id: string): string {
  return `alibaba_cloud_ram_user:${id}`;
}

export function createRAMUserEntity(user: User): Entity {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _type: RAMEntities.RAM_USER._type,
        _class: RAMEntities.RAM_USER._class,
        _key: getRAMUserKey(user.UserName),
        name: user.UserName,
        displayName: user.DisplayName,
        username: user.UserName,
        active: true,
        userId: user.UserId,
        comments: user.Comments,
        updatedOn: parseTimePropertyValue(user.UpdateDate),
        createdOn: parseTimePropertyValue(user.CreateDate),
      },
    },
  });
}

export function getRAMGroupKey(id: string): string {
  return `alibaba_cloud_ram_group:${id}`;
}

export function createRAMGroupEntity(group: Group): Entity {
  return createIntegrationEntity({
    entityData: {
      source: group,
      assign: {
        _type: RAMEntities.RAM_GROUP._type,
        _class: RAMEntities.RAM_GROUP._class,
        _key: getRAMGroupKey(group.GroupName),
        name: group.GroupName,
        groupId: group.GroupId,
        comments: group.Comments,
        groupName: group.GroupName,
        updatedOn: parseTimePropertyValue(group.UpdateDate),
        createdOn: parseTimePropertyValue(group.CreateDate),
      },
    },
  });
}

export function getRAMRoleKey(id: string): string {
  return `alibaba_cloud_ram_role:${id}`;
}

export function createRAMRoleEntity(role: Role): Entity {
  return createIntegrationEntity({
    entityData: {
      source: role,
      assign: {
        _type: RAMEntities.RAM_ROLE._type,
        _class: RAMEntities.RAM_ROLE._class,
        _key: getRAMRoleKey(role.RoleId),
        name: role.RoleName,
        maxSessionDuration: role.MaxSessionDuration,
        description: role.Description,
        arn: role.Arn,
        roleId: role.RoleId,
        updatedOn: parseTimePropertyValue(role.UpdateDate),
        createdOn: parseTimePropertyValue(role.CreateDate),
      },
    },
  });
}

export function getRAMPolicyKey(id: string): string {
  return `alibaba_cloud_ram_policy:${id}`;
}

export function createRAMPolicyEntity(policy: Policy): Entity {
  return createIntegrationEntity({
    entityData: {
      source: policy,
      assign: {
        _type: RAMEntities.RAM_POLICY._type,
        _class: RAMEntities.RAM_POLICY._class,
        _key: getRAMPolicyKey(policy.PolicyName),
        title: policy.PolicyName,
        summary: policy.Description,
        content: policy.Description,
        name: policy.PolicyName,
        policyType: policy.PolicyType,
        policyName: policy.PolicyName,
        description: policy.Description,
        attachmentCount: policy.AttachmentCount,
        defaultVersion: policy.DefaultVersion,
        updatedOn: parseTimePropertyValue(policy.UpdateDate),
        createdOn: parseTimePropertyValue(policy.CreateDate),
      },
    },
  });
}
