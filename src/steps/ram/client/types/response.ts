import { User, Group, Role, Policy } from '../../types';
import { PaginatedResponse } from '../../../../client/types/response';

export interface ListUsersResponse extends PaginatedResponse {
  Users: {
    User: User[];
  };

  Marker?: string;
}

export interface ListGroupsResponse extends PaginatedResponse {
  Groups: {
    Group: Group[];
  };

  Marker?: string;
}

export interface ListRolesResponse extends PaginatedResponse {
  Roles: {
    Role: Role[];
  };

  Marker?: string;
}

export interface ListPoliciesResponse extends PaginatedResponse {
  Policies: {
    Policy: Policy[];
  };

  Marker?: string;
}

export interface GetAliasResponse extends PaginatedResponse {
  AccountAlias: string;
}
