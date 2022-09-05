# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added the following entities:

| Resources         | Entity `_type`                    | Entity `_class`       |
| ----------------- | --------------------------------- | --------------------- |
| ALB Load Balancer | `alibaba_cloud_alb_load_balancer` | `Gateway`             |
| Account           | `alibaba_cloud_account`           | `Account`             |
| Autoscaling Group | `alibaba_cloud_autoscaling_group` | `Deployment`, `Group` |
| NAT Gateway       | `alibaba_cloud_nat_gateway`       | `Gateway`             |
| OSS Bucket        | `alibaba_cloud_oss_bucket`        | `DataStore`           |
| OSS Object        | `alibaba_cloud_oss_object`        | `DataObject`          |
| RAM Group         | `alibaba_cloud_ram_group`         | `UserGroup`           |
| RAM Policy        | `alibaba_cloud_ram_policy`        | `Policy`              |
| RAM Role          | `alibaba_cloud_ram_role`          | `AccessRole`          |
| RAM User          | `alibaba_cloud_ram_user`          | `User`                |
| VPC               | `alibaba_cloud_vpc`               | `Network`             |
| VPN Gateway       | `alibaba_cloud_vpn_gateway`       | `Gateway`             |

- Added the following relationships:

| Source Entity `_type`             | Relationship `_class` | Target Entity `_type`             |
| --------------------------------- | --------------------- | --------------------------------- |
| `alibaba_cloud_autoscaling_group` | **USES**              | `alibaba_cloud_vpc`               |
| `alibaba_cloud_oss_bucket`        | **HAS**               | `alibaba_cloud_oss_object`        |
| `alibaba_cloud_ram_group`         | **HAS**               | `alibaba_cloud_ram_user`          |
| `alibaba_cloud_ram_policy`        | **ASSIGNED**          | `alibaba_cloud_ram_group`         |
| `alibaba_cloud_ram_policy`        | **ASSIGNED**          | `alibaba_cloud_ram_role`          |
| `alibaba_cloud_ram_policy`        | **ASSIGNED**          | `alibaba_cloud_ram_user`          |
| `alibaba_cloud_vpc`               | **HAS**               | `alibaba_cloud_alb_load_balancer` |
| `alibaba_cloud_vpc`               | **HAS**               | `alibaba_cloud_ecs_instance`      |
| `alibaba_cloud_vpc`               | **HAS**               | `alibaba_cloud_nat_gateway`       |
| `alibaba_cloud_vpc`               | **HAS**               | `alibaba_cloud_vpn_gateway`       |

## 1.0.0 - 2022-05-05

### Added

- Added the following entities:

| Resources    | Entity `_type`               | Entity `_class` |
| ------------ | ---------------------------- | --------------- |
| ECS Instance | `alibaba_cloud_ecs_instance` | `Host`          |
