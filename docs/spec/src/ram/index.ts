import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';
import { RAMSteps } from '../../../../src/steps/ram/constants';

export const ramSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * Action: ListUsers
     * PATTERN: Fetch Entities
     */
    id: 'fetch-ram-users',
    name: 'Fetch RAM Users',
    entities: [
      {
        resourceName: 'RAM User',
        _type: 'alibaba_cloud_ram_user',
        _class: ['User'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    /**
     * Action: ListGroups
     * PATTERN: Fetch Entities
     */
    id: 'fetch-ram-groups',
    name: 'Fetch RAM Groups',
    entities: [
      {
        resourceName: 'RAM Group',
        _type: 'alibaba_cloud_ram_group',
        _class: ['UserGroup'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    /**
     * Action: ListRoles
     * PATTERN: Fetch Entities
     */
    id: 'fetch-ram-roles',
    name: 'Fetch RAM Roles',
    entities: [
      {
        resourceName: 'RAM Role',
        _type: 'alibaba_cloud_ram_role',
        _class: ['AccessRole'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    /**
     * Action: ListPoliciesForUser
     * PATTERN: Fetch Entities
     */
    id: 'fetch-ram-users-policies',
    name: "Fetch RAM Users' Policies",
    entities: [
      {
        resourceName: 'RAM Policy',
        _type: 'alibaba_cloud_ram_policy',
        _class: ['Policy'],
      },
    ],
    relationships: [],
    dependsOn: [RAMSteps.FETCH_RAM_USERS],
    implemented: true,
  },
  {
    /**
     * Action: ListPoliciesForGroup
     * PATTERN: Fetch Entities
     */
    id: 'fetch-ram-groups-policies',
    name: "Fetch RAM Groups' Policies",
    entities: [
      {
        resourceName: 'RAM Policy',
        _type: 'alibaba_cloud_ram_policy',
        _class: ['Policy'],
      },
    ],
    relationships: [],
    dependsOn: [RAMSteps.FETCH_RAM_GROUPS],
    implemented: true,
  },
  {
    /**
     * Action: ListPoliciesForRole
     * PATTERN: Fetch Entities
     */
    id: 'fetch-ram-roles-policies',
    name: "Fetch RAM Roles' Policies",
    entities: [
      {
        resourceName: 'RAM Policy',
        _type: 'alibaba_cloud_ram_policy',
        _class: ['Policy'],
      },
    ],
    relationships: [],
    dependsOn: [RAMSteps.FETCH_RAM_ROLES],
    implemented: true,
  },
  {
    /**
     * Action: ListUsersForGroup,
     * PATTERN: Fetch Entities
     */
    id: 'build-group-and-user-relationships',
    name: 'Build Group and User Relationships',
    entities: [],
    relationships: [
      {
        _type: 'alibaba_cloud_ram_group_has_user',
        sourceType: 'alibaba_cloud_ram_group',
        _class: RelationshipClass.HAS,
        targetType: 'alibaba_cloud_ram_user',
      },
    ],
    dependsOn: [RAMSteps.FETCH_RAM_USERS, RAMSteps.FETCH_RAM_GROUPS],
    implemented: true,
  },
  {
    /**
     * Action: ListPoliciesForUser,
     * PATTERN: Fetch Relationships
     */
    id: 'build-policy-and-user-relationships',
    name: 'Build Policy and User Relationships',
    entities: [],
    relationships: [
      {
        _type: 'alibaba_cloud_ram_policy_assigned_user',
        sourceType: 'alibaba_cloud_ram_policy',
        _class: RelationshipClass.ASSIGNED,
        targetType: 'alibaba_cloud_ram_user',
      },
    ],
    dependsOn: [RAMSteps.FETCH_RAM_USERS_POLICIES],
    implemented: true,
  },
  {
    /**
     * Action: ListPoliciesForGroup,
     * PATTERN: Fetch Relationships
     */
    id: 'build-policy-and-group-relationships',
    name: 'Build Policy and Group Relationships',
    entities: [],
    relationships: [
      {
        _type: 'alibaba_cloud_ram_policy_assigned_group',
        sourceType: 'alibaba_cloud_ram_policy',
        _class: RelationshipClass.ASSIGNED,
        targetType: 'alibaba_cloud_ram_group',
      },
    ],
    dependsOn: [RAMSteps.FETCH_RAM_GROUPS_POLICIES],
    implemented: true,
  },
  {
    /**
     * Action: ListPoliciesForRole,
     * PATTERN: Fetch Relationships
     */
    id: 'build-policy-and-role-relationships',
    name: 'Build Policy and Role Relationships',
    entities: [],
    relationships: [
      {
        _type: 'alibaba_cloud_ram_policy_assigned_role',
        sourceType: 'alibaba_cloud_ram_policy',
        _class: RelationshipClass.ASSIGNED,
        targetType: 'alibaba_cloud_ram_role',
      },
    ],
    dependsOn: [RAMSteps.FETCH_RAM_ROLES_POLICIES],
    implemented: true,
  },
  {
    /**
     * Action: GetAccountAlias,
     * PATTERN: Fetch Entity
     */
    id: 'fetch-account',
    name: 'Fetch Account',
    entities: [
      {
        resourceName: 'Account',
        _type: 'alibaba_cloud_account',
        _class: ['Account'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
