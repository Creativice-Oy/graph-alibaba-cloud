import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { RAMSteps } from './constants';

jest.setTimeout(50000000);

describe('#ram', () => {
  let recording: Recording;
  afterEach(async () => {
    await recording.stop();
  });

  test('fetch-ram-users', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-ram-users',
    });

    const stepConfig = buildStepTestConfigForStep(RAMSteps.FETCH_RAM_USERS);
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });

  test('fetch-ram-groups', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-ram-groups',
    });

    const stepConfig = buildStepTestConfigForStep(RAMSteps.FETCH_RAM_GROUPS);
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });

  test('fetch-ram-roles', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-ram-roles',
    });

    const stepConfig = buildStepTestConfigForStep(RAMSteps.FETCH_RAM_ROLES);
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });

  test('fetch-ram-users-policies', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-ram-users-policies',
    });

    const stepConfig = buildStepTestConfigForStep(
      RAMSteps.FETCH_RAM_USERS_POLICIES,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });

  test('fetch-ram-groups-policies', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-ram-groups-policies',
    });

    const stepConfig = buildStepTestConfigForStep(
      RAMSteps.FETCH_RAM_GROUPS_POLICIES,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });

  test('fetch-ram-roles-policies', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-ram-roles-policies',
    });

    const stepConfig = buildStepTestConfigForStep(
      RAMSteps.FETCH_RAM_ROLES_POLICIES,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });

  test('build-group-and-user-relationships', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'build-group-and-user-relationships',
    });

    const stepConfig = buildStepTestConfigForStep(
      RAMSteps.BUILD_GROUP_USER_RELATIONSHIPS,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });

  test('build-policy-and-user-relationships', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'build-policy-and-user-relationships',
    });

    const stepConfig = buildStepTestConfigForStep(
      RAMSteps.BUILD_POLICY_USER_RELATIONSHIPS,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });

  test('build-policy-and-group-relationships', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'build-policy-and-group-relationships',
    });

    const stepConfig = buildStepTestConfigForStep(
      RAMSteps.BUILD_POLICY_GROUP_RELATIONSHIPS,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });

  test('build-policy-and-role-relationships', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'build-policy-and-role-relationships',
    });

    const stepConfig = buildStepTestConfigForStep(
      RAMSteps.BUILD_POLICY_ROLE_RELATIONSHIPS,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });

  test('fetch-account', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-account',
    });

    const stepConfig = buildStepTestConfigForStep(RAMSteps.FETCH_ACCOUNT);
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });
});
