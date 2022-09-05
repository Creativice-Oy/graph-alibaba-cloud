import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const RAM_REQ_TIMEOUT = 20000;
export const ACCOUNT_ENTITY_KEY = 'entity:account';

export enum RAMSteps {
  FETCH_RAM_USERS = 'fetch-ram-users',
  FETCH_RAM_GROUPS = 'fetch-ram-groups',
  FETCH_RAM_ROLES = 'fetch-ram-roles',
  FETCH_RAM_USERS_POLICIES = 'fetch-ram-users-policies',
  FETCH_RAM_GROUPS_POLICIES = 'fetch-ram-groups-policies',
  FETCH_RAM_ROLES_POLICIES = 'fetch-ram-roles-policies',
  BUILD_GROUP_USER_RELATIONSHIPS = 'build-group-and-user-relationships',
  BUILD_POLICY_USER_RELATIONSHIPS = 'build-policy-and-user-relationships',
  BUILD_POLICY_GROUP_RELATIONSHIPS = 'build-policy-and-group-relationships',
  BUILD_POLICY_ROLE_RELATIONSHIPS = 'build-policy-and-role-relationships',
  FETCH_ACCOUNT = 'fetch-account',
}

export const RAMEntities: Record<
  | 'ECS_INSTANCE'
  | 'RAM_USER'
  | 'RAM_ROLE'
  | 'RAM_GROUP'
  | 'RAM_POLICY'
  | 'ACCOUNT',
  StepEntityMetadata
> = {
  ECS_INSTANCE: {
    resourceName: 'ECS Instance',
    _type: 'alibaba_cloud_ecs_instance',
    _class: ['Host'],
    schema: {
      additionalProperties: true,
      properties: {
        instanceName: { type: 'string' },
        instanceId: { type: 'string' },
        instanceType: { type: 'string' },
        region: { type: 'string' },
      },
      required: ['instanceName', 'instanceId', 'instanceType', 'region'],
    },
  },
  RAM_USER: {
    resourceName: 'RAM User',
    _type: 'alibaba_cloud_ram_user',
    _class: ['User'],
  },
  RAM_GROUP: {
    resourceName: 'RAM Group',
    _type: 'alibaba_cloud_ram_group',
    _class: ['UserGroup'],
  },
  RAM_ROLE: {
    resourceName: 'RAM Role',
    _type: 'alibaba_cloud_ram_role',
    _class: ['AccessRole'],
  },
  RAM_POLICY: {
    resourceName: 'RAM Policy',
    _type: 'alibaba_cloud_ram_policy',
    _class: ['Policy'],
  },
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'alibaba_cloud_account',
    _class: ['Account'],
  },
};

export const RAMRelationships: Record<
  | 'GROUP_HAS_USER'
  | 'POLICY_ASSIGNED_USER'
  | 'POLICY_ASSIGNED_GROUP'
  | 'POLICY_ASSIGNED_ROLE',
  StepRelationshipMetadata
> = {
  GROUP_HAS_USER: {
    _type: 'alibaba_cloud_ram_group_has_user',
    sourceType: RAMEntities.RAM_GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: RAMEntities.RAM_USER._type,
  },
  POLICY_ASSIGNED_USER: {
    _type: 'alibaba_cloud_ram_policy_assigned_user',
    sourceType: RAMEntities.RAM_POLICY._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: RAMEntities.RAM_USER._type,
  },
  POLICY_ASSIGNED_GROUP: {
    _type: 'alibaba_cloud_ram_policy_assigned_group',
    sourceType: RAMEntities.RAM_POLICY._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: RAMEntities.RAM_GROUP._type,
  },
  POLICY_ASSIGNED_ROLE: {
    _type: 'alibaba_cloud_ram_policy_assigned_role',
    sourceType: RAMEntities.RAM_POLICY._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: RAMEntities.RAM_ROLE._type,
  },
};
