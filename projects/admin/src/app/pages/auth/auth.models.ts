// login request interface
export interface loginRequest {
  email: string;
  password: string;
  role: string;
}

// login response interface
export interface loginResponse {
  token: string;
  userId: string;
}
