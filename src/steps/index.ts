import { albSteps } from './alb/index';
import { ecsSteps } from './ecs/index';
import { vpcSteps } from './vpc';
import { autoScalingSteps } from './auto-scaling';

const integrationSteps = [
  ...ecsSteps,
  ...albSteps,
  ...vpcSteps,
  ...autoScalingSteps,
];

export { integrationSteps };
