# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added the following entities:

| Resources  | Entity `_type`             | Entity `_class` |
| ---------- | -------------------------- | --------------- |
| OSS Bucket | `alibaba_cloud_oss_bucket` | `DataStore`     |
| OSS Object | `alibaba_cloud_oss_object` | `DataObject`    |

- Added the following Relationships:

| Source Entity `_type`      | Relationship `_class` | Target Entity `_type`      |
| -------------------------- | --------------------- | -------------------------- |
| `alibaba_cloud_oss_bucket` | **HAS**               | `alibaba_cloud_oss_object` |

## 1.0.0 - 2022-05-05

### Added

- Added the following entities:

| Resources    | Entity `_type`               | Entity `_class` |
| ------------ | ---------------------------- | --------------- |
| ECS Instance | `alibaba_cloud_ecs_instance` | `Host`          |
