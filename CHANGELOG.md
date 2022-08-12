# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added the following entities:

| Resources             | Entity `_type`                    | Entity `_class`       |
| --------------------- | --------------------------------- | --------------------- |
| VPN Gateway           | `alibaba_cloud_vpn_gateway`       | `Gateway`             |
| NAT Gateway           | `alibaba_cloud_nat_gateway`       | `Gateway`             |
| Virtual Private Cloud | `alibaba_cloud_vpc`               | `Network`             |
| Autoscaling Group     | `alibaba_cloud_autoscaling_group` | `Deployment`, `Group` |
| ALB Load Balancer     | `alibaba_cloud_alb_load_balancer` | `Gateway`             |

- Added the following relationships:

| Source Entity `_type`             | Relationship `_class` | Target Entity `_type`             |
| --------------------------------- | --------------------- | --------------------------------- |
| `alibaba_cloud_autoscaling_group` | **USES**              | `alibaba_cloud_vpc`               |
| `alibaba_cloud_vpc`               | **HAS**               | `alibaba_cloud_ecs_instance`      |
| `alibaba_cloud_vpc`               | **HAS**               | `alibaba_cloud_alb_load_balancer` |

## 1.0.0 - 2022-05-05

### Added

- Added the following entities:

| Resources    | Entity `_type`               | Entity `_class` |
| ------------ | ---------------------------- | --------------- |
| ECS Instance | `alibaba_cloud_ecs_instance` | `Host`          |
