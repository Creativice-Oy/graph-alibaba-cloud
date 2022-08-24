import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { VPCSteps } from './constants';

describe('#vpc', () => {
  let recording: Recording;
  afterEach(async () => {
    await recording.stop();
  });

  test('fetch-vpcs', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-vpcs',
    });

    const stepConfig = buildStepTestConfigForStep(VPCSteps.FETCH_VPCS);
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  }, 20000);

  test('fetch-nat-gateways', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-nat-gateways',
    });

    const stepConfig = buildStepTestConfigForStep(VPCSteps.FETCH_NAT_GATEWAYS);
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  }, 20000);

  test('fetch-vpn-gateways', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-vpn-gateways',
    });

    const stepConfig = buildStepTestConfigForStep(VPCSteps.FETCH_VPN_GATEWAYS);
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  }, 20000);
});
