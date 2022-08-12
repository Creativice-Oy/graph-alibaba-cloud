import { albSteps } from './alb/index';
import { ecsSteps } from './ecs/index';
import { vpnSteps } from './vpn';
import { vpcSteps } from './vpc';
import { autoScalingSteps } from './auto-scaling';

const integrationSteps = [
  ...ecsSteps,
  ...albSteps,
  ...vpnSteps,
  ...vpcSteps,
  ...autoScalingSteps,
];

export { integrationSteps };
