import { JWTPayload, SignJWT, jwtVerify } from 'jose';

export class JwtService {
  private readonly secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');

  async encode(payload: JWTPayload): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(this.secret);
  }

  async decode(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, this.secret);
    return payload;
  }
}

export const jwtService = new JwtService();
export default jwtService;
