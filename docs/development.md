# Development

This integration uses custom service clients - which leverage the RPC client
provided via `@alicloud/pop-core` - in order to interact with Alibaba Cloud's
API. Documentation of the `@alicloud/pop-core` module can be found
[here](https://github.com/aliyun/openapi-core-nodejs-sdk). Documentation for
Alibaba Cloud's API can be found for each respective service. For example,
documentation on the ECS service's API can be found
[here](https://www.alibabacloud.com/help/en/elastic-compute-service/latest/introduction).

For Object Storage Service, this integration uses the package `ali-oss`. The
documentation for this package can be found
[here](https://github.com/ali-sdk/ali-oss).

## Alibaba Cloud account setup

You can create a free Alibaba Cloud account by following the steps outlined in
their documentation,
[here](https://www.alibabacloud.com/help/en/account-management/latest/sign-up-with-alibaba-cloud).

## Authentication

An Access Key ID and Access Key Secret must be used in order to setup an RPC
client from `@alicloud/pop-core` and interact with Alibaba Cloud's API. In order
to obtain an Access Key ID/Secret combination for developmental purposes, an
administrator of the Alibaba Cloud account must create a RAM user the
integration will use. To do so, the administrator can navigate to the RAM page
in the Alibaba Cloud console and create a new user, checking the
`Open API Access` option when doing so. Additionally, the administrator will
need to add the `ReadOnlyAccess` permission to the new user. Note: If the
`Open API Access` option is not checked when the new user is created, the
administrator (or new user themselves if they were given console access) will
have to edit the user and select `Create AccessKey`.

Copy the .env.example to a new .env file and fill in the variables using the
Access Key ID/Secret combination generated from instructions above. The mapping
is as follows:

ACCESS_KEY_ID=${accessKeyId}
ACCESS_KEY_SECRET=${accessKeySecret}
