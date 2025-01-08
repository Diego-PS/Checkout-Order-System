export type SuccessHttpStatusCode =
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226

export enum SuccessHttpStatusCodeEnum {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NONAUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTISTATUS = 207,
  ALREADY_REPORTED = 208,
  IM_USED = 226,
}
