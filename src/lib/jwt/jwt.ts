import { JWTPayload, SignJWT, jwtVerify } from 'jose';

export class JwtService {
  private readonly secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');

  async encode(payload: JWTPayload): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(this.secret);
  }

  async decode<T = unknown>(token: string): Promise<T> {
    const { payload } = await jwtVerify(token, this.secret);
    return payload as T;
  }
}

export const jwtService = new JwtService();
export default jwtService;
