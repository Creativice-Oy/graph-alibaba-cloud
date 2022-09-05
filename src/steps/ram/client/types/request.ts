import { Request } from '../../../../client/types/request';

export interface RAMRequest extends Request<RAMParameters> {
  action: RAMAction;
}

export type RAMAction =
  | 'ListUsers'
  | 'ListGroups'
  | 'ListRoles'
  | 'ListPolicies'
  | 'ListPoliciesForUser'
  | 'ListPoliciesForGroup'
  | 'ListPoliciesForRole'
  | 'ListUsersForGroup'
  | 'ListEntitiesForPolicy'
  | 'GetAccountAlias';
export type RAMParameters =
  | ListUsersParameters
  | ListGroupsParameters
  | ListRolesParameters
  | ListPoliciesParameters;

export interface ListUsersParameters {
  Marker?: string;
  MaxItems?: number;

  GroupName?: string;
  PolicyType?: string;
  PolicyName?: string;
}

export interface ListGroupsParameters {
  Marker?: string;
  MaxItems?: number;

  PolicyType?: string;
  PolicyName?: string;
}
export interface ListRolesParameters {
  Marker?: string;
  MaxItems?: number;

  PolicyType?: string;
  PolicyName?: string;
}

export interface ListPoliciesParameters {
  PageSize?: number;
  NextToken?: string;

  UserName?: string;
  GroupName?: string;
  RoleName?: string;
}
