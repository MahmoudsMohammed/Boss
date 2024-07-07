export interface loginRequest {
  email: string;
  password: string;
  role: string;
}

export interface registerRequest {
  email: string;
  password: string;
  username: string;
  role: string;
}

export interface registerResponse {
  userId: string;
  token: string;
}
