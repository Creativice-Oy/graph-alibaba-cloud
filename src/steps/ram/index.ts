import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
  getRawData,
  createDirectRelationship,
} from '@jupiterone/integration-sdk-core';

import { createRAMClient } from './client/client';
import { User, Group, Role, Policy } from './types';
import { IntegrationConfig } from '../../config';
import {
  RAMEntities,
  RAMSteps,
  RAMRelationships,
  ACCOUNT_ENTITY_KEY,
} from './constants';
import {
  createRAMUserEntity,
  createRAMGroupEntity,
  createRAMRoleEntity,
  createRAMPolicyEntity,
  createAccountEntity,
  getRAMUserKey,
  getRAMGroupKey,
  getRAMRoleKey,
  getRAMPolicyKey,
} from './converter';

export async function fetchUsers({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createRAMClient(instance.config, logger);

  await client.iterateUsers(async (user) => {
    await jobState.addEntity(createRAMUserEntity(user));
  });
}

export async function fetchGroups({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createRAMClient(instance.config, logger);

  await client.iterateGroups(async (group) => {
    await jobState.addEntity(createRAMGroupEntity(group));
  });
}

export async function fetchRoles({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createRAMClient(instance.config, logger);

  await client.iterateRoles(async (role) => {
    await jobState.addEntity(createRAMRoleEntity(role));
  });
}

export async function fetchUsersPolicies({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createRAMClient(instance.config, logger);

  await jobState.iterateEntities(
    { _type: RAMEntities.RAM_USER._type },
    async (userEntity) => {
      const user = getRawData<User>(userEntity);
      if (!user) {
        logger.warn(
          { _key: userEntity._key },
          'Could not get raw data for user entity',
        );
        return;
      }

      await client.iteratePoliciesOfUser(user.UserName, async (policy) => {
        const foundPolicyEntity = await jobState.findEntity(
          getRAMPolicyKey(policy.PolicyName),
        );

        if (!foundPolicyEntity) {
          await jobState.addEntity(createRAMPolicyEntity(policy));
        }
      });
    },
  );
}

export async function fetchGroupsPolicies({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createRAMClient(instance.config, logger);

  await jobState.iterateEntities(
    { _type: RAMEntities.RAM_GROUP._type },
    async (groupEntity) => {
      const group = getRawData<Group>(groupEntity);
      if (!group) {
        logger.warn(
          { _key: groupEntity._key },
          'Could not get raw data for group entity',
        );
        return;
      }

      await client.iteratePoliciesOfGroup(group.GroupName, async (policy) => {
        const foundPolicyEntity = await jobState.findEntity(
          getRAMPolicyKey(policy.PolicyName),
        );

        if (!foundPolicyEntity) {
          await jobState.addEntity(createRAMPolicyEntity(policy));
        }
      });
    },
  );
}

export async function fetchRolesPolicies({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createRAMClient(instance.config, logger);

  await jobState.iterateEntities(
    { _type: RAMEntities.RAM_ROLE._type },
    async (roleEntity) => {
      const role = getRawData<Role>(roleEntity);
      if (!role) {
        logger.warn(
          { _key: roleEntity._key },
          'Could not get raw data for role entity',
        );
        return;
      }

      await client.iteratePoliciesOfRole(role.RoleName, async (policy) => {
        const foundPolicyEntity = await jobState.findEntity(
          getRAMPolicyKey(policy.PolicyName),
        );
        if (!foundPolicyEntity) {
          await jobState.addEntity(createRAMPolicyEntity(policy));
        }
      });
    },
  );
}

export async function buildGroupAndUserRelationships({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createRAMClient(instance.config, logger);
  await jobState.iterateEntities(
    { _type: RAMEntities.RAM_GROUP._type },
    async (groupEntity) => {
      const group = getRawData<Group>(groupEntity);
      if (!group) {
        logger.warn(
          { _key: groupEntity._key },
          'Could not get raw data for group entity',
        );
        return;
      }

      await client.iterateUsersOfGroups(group.GroupName, async (user) => {
        const foundUserEntity = await jobState.findEntity(
          getRAMUserKey(user.UserName),
        );

        if (foundUserEntity)
          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.HAS,
              from: groupEntity,
              to: foundUserEntity,
            }),
          );
      });
    },
  );
}

export async function buildPolicyAndUserRelationships({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createRAMClient(instance.config, logger);
  await jobState.iterateEntities(
    { _type: RAMEntities.RAM_POLICY._type },
    async (policyEntity) => {
      const policy = getRawData<Policy>(policyEntity);
      if (!policy) {
        logger.warn(
          { _key: policyEntity._key },
          'Could not get raw data for policy entity',
        );
        return;
      }

      await client.iterateUsersOfPolicy(
        policy.PolicyType,
        policy.PolicyName,
        async (user) => {
          const foundUserEntity = await jobState.findEntity(
            getRAMUserKey(user.UserName),
          );
          if (foundUserEntity) {
            await jobState.addRelationship(
              createDirectRelationship({
                _class: RelationshipClass.ASSIGNED,
                from: policyEntity,
                to: foundUserEntity,
              }),
            );
          }
        },
      );
    },
  );
}

export async function buildPolicyAndGroupRelationships({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createRAMClient(instance.config, logger);

  await jobState.iterateEntities(
    { _type: RAMEntities.RAM_POLICY._type },
    async (policyEntity) => {
      const policy = getRawData<Policy>(policyEntity);
      if (!policy) {
        logger.warn(
          { _key: policyEntity._key },
          'Could not get raw data for policy entity',
        );
        return;
      }

      await client.iterateGroupsOfPolicy(
        policy.PolicyType,
        policy.PolicyName,
        async (group) => {
          const foundGroupEntity = await jobState.findEntity(
            getRAMGroupKey(group.GroupName),
          );
          if (foundGroupEntity) {
            await jobState.addRelationship(
              createDirectRelationship({
                _class: RelationshipClass.ASSIGNED,
                from: policyEntity,
                to: foundGroupEntity,
              }),
            );
          }
        },
      );
    },
  );
}

export async function buildPolicyAndRoleRelationships({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createRAMClient(instance.config, logger);
  await jobState.iterateEntities(
    { _type: RAMEntities.RAM_POLICY._type },
    async (policyEntity) => {
      const policy = getRawData<Policy>(policyEntity);
      if (!policy) {
        logger.warn(
          { _key: policyEntity._key },
          'Could not get raw data for policy entity',
        );
        return;
      }

      await client.iterateRolesOfPolicy(
        policy.PolicyType,
        policy.PolicyName,
        async (role) => {
          const foundRoleEntity = await jobState.findEntity(
            getRAMRoleKey(role.RoleId),
          );
          if (foundRoleEntity) {
            await jobState.addRelationship(
              createDirectRelationship({
                _class: RelationshipClass.ASSIGNED,
                from: policyEntity,
                to: foundRoleEntity,
              }),
            );
          }
        },
      );
    },
  );
}

export async function fetchAccount({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createRAMClient(instance.config, logger);

  const enterpriseAlias = await client.getEnterpriseAlias();

  const accountEntity = createAccountEntity({
    accountAlias: enterpriseAlias,
  });

  await jobState.addEntity(accountEntity);
  await jobState.setData(ACCOUNT_ENTITY_KEY, accountEntity);
}

export const ramSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: RAMSteps.FETCH_RAM_USERS,
    name: 'Fetch RAM Users',
    entities: [RAMEntities.RAM_USER],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchUsers,
  },
  {
    id: RAMSteps.FETCH_RAM_GROUPS,
    name: 'Fetch RAM Groups',
    entities: [RAMEntities.RAM_GROUP],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchGroups,
  },
  {
    id: RAMSteps.FETCH_RAM_ROLES,
    name: 'Fetch RAM Roles',
    entities: [RAMEntities.RAM_ROLE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchRoles,
  },
  {
    id: RAMSteps.FETCH_RAM_USERS_POLICIES,
    name: "Fetch RAM Users' Policies",
    entities: [RAMEntities.RAM_POLICY],
    relationships: [],
    dependsOn: [RAMSteps.FETCH_RAM_USERS],
    executionHandler: fetchUsersPolicies,
  },
  {
    id: RAMSteps.FETCH_RAM_GROUPS_POLICIES,
    name: "Fetch RAM Groups' Policies",
    entities: [RAMEntities.RAM_POLICY],
    relationships: [],
    dependsOn: [RAMSteps.FETCH_RAM_GROUPS],
    executionHandler: fetchGroupsPolicies,
  },
  {
    id: RAMSteps.FETCH_RAM_ROLES_POLICIES,
    name: "Fetch RAM Roles' Policies",
    entities: [RAMEntities.RAM_POLICY],
    relationships: [],
    dependsOn: [RAMSteps.FETCH_RAM_ROLES],
    executionHandler: fetchRolesPolicies,
  },
  {
    id: RAMSteps.BUILD_GROUP_USER_RELATIONSHIPS,
    name: 'Build Group and User Relationships',
    entities: [],
    relationships: [RAMRelationships.GROUP_HAS_USER],
    dependsOn: [RAMSteps.FETCH_RAM_USERS, RAMSteps.FETCH_RAM_GROUPS],
    executionHandler: buildGroupAndUserRelationships,
  },
  {
    id: RAMSteps.BUILD_POLICY_USER_RELATIONSHIPS,
    name: 'Build Policy and User Relationships',
    entities: [],
    relationships: [RAMRelationships.POLICY_ASSIGNED_USER],
    dependsOn: [RAMSteps.FETCH_RAM_USERS_POLICIES],
    executionHandler: buildPolicyAndUserRelationships,
  },
  {
    id: RAMSteps.BUILD_POLICY_GROUP_RELATIONSHIPS,
    name: 'Build Policy and Group Relationships',
    entities: [],
    relationships: [RAMRelationships.POLICY_ASSIGNED_GROUP],
    dependsOn: [RAMSteps.FETCH_RAM_GROUPS_POLICIES],
    executionHandler: buildPolicyAndGroupRelationships,
  },
  {
    id: RAMSteps.BUILD_POLICY_ROLE_RELATIONSHIPS,
    name: 'Build Policy and Role Relationships',
    entities: [],
    relationships: [RAMRelationships.POLICY_ASSIGNED_ROLE],
    dependsOn: [RAMSteps.FETCH_RAM_ROLES_POLICIES],
    executionHandler: buildPolicyAndRoleRelationships,
  },
  {
    id: RAMSteps.FETCH_ACCOUNT,
    name: 'Fetch Account',
    entities: [RAMEntities.ACCOUNT],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchAccount,
  },
];
