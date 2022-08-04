import { ecsSteps } from './ecs/index';
import { ossSteps } from './oss';

const integrationSteps = [...ecsSteps, ...ossSteps];

export { integrationSteps };
