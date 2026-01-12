export interface ApiError {
  code: string;
  message: string;
  status: number;
  timestamp: string;
}

export interface ApiSuccess<T> {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  data: T;
}
