export interface PaginatedResponseWithToken extends AlibabaResponse {
  PageNumber: number;
  PageSize: number;
  TotalCount: number;
  NextToken: string;
}

export interface PaginatedResponse extends AlibabaResponse {
  PageNumber: number;
  PageSize: number;
  TotalCount: number;
}

export interface AlibabaResponse {
  RequestId: string;
}
