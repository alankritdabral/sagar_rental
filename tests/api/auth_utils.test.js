import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { verifyAuth } from '../../backend/api/_utils.js';

describe('Auth Utility', () => {
  const mockSecret = 'test-secret';

  beforeEach(() => {
    vi.stubEnv('JWT_SECRET', mockSecret);
  });

  it('should verify a valid token', async () => {
    const payload = { uid: '123', role: 'user' };
    const token = jwt.sign(payload, mockSecret);
    const req = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    const decoded = await verifyAuth(req);
    expect(decoded.uid).toBe('123');
    expect(decoded.role).toBe('user');
  });

  it('should throw error if no token provided', async () => {
    const req = { headers: {} };
    await expect(verifyAuth(req)).rejects.toThrow('Unauthorized');
  });

  it('should throw error if JWT_SECRET is missing', async () => {
    vi.stubEnv('JWT_SECRET', '');
    const req = { headers: { authorization: 'Bearer some-token' } };
    await expect(verifyAuth(req)).rejects.toThrow('Internal Server Error: Security configuration missing');
  });

  it('should throw error for invalid token', async () => {
    const req = { headers: { authorization: 'Bearer invalid-token' } };
    await expect(verifyAuth(req)).rejects.toThrow('Invalid or expired token');
  });
});
