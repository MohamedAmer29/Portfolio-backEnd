export interface AccessTokenPayload {
  sub: string;
  role: string;
  type: 'access';
  tokenVersion: number;
}

export interface RefreshTokenPayload {
  sub: string;
  sessionId: string;
  type: 'refresh';
  tokenVersion: number;
}
