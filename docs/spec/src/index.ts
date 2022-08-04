import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { ecsSpec } from './ecs';
import { ossSpec } from './oss';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [...ecsSpec, ...ossSpec],
};
