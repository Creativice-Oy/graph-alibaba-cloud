import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { ALBSteps } from './constants';

jest.setTimeout(50000000);

describe('#alb', () => {
  let recording: Recording;
  afterEach(async () => {
    await recording.stop();
  });

  test('fetch-alb-load-balancers', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-alb-load-balancers',
    });

    const stepConfig = buildStepTestConfigForStep(
      ALBSteps.FETCH_ALB_LOAD_BALANCERS.id,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });

  test('build-vpc-alb-load-balancer-relationships', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'build-vpc-alb-load-balancer-relationships',
    });

    const stepConfig = buildStepTestConfigForStep(
      ALBSteps.BUILD_VPC_ALB_LOAD_BALANCER_RELATIONSHIPS.id,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });
});
