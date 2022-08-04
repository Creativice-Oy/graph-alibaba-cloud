import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { OSSSteps } from './constants';

describe('#oss', () => {
  let recording: Recording;
  afterEach(async () => {
    await recording.stop();
  });

  test('fetch-oss-buckets', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-oss-buckets',
    });

    const stepConfig = buildStepTestConfigForStep(
      OSSSteps.FETCH_OSS_BUCKETS.id,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  }, 20000);

  test('fetch-oss-objects', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-oss-objects',
    });

    const stepConfig = buildStepTestConfigForStep(
      OSSSteps.FETCH_OSS_OBJECTS.id,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  }, 20000);
});
