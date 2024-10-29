// auth/jwt/jwt.constants.ts
import { config } from 'dotenv';

config(); // Load environment variables from a .env file

export class JwtConstants {
  public static readonly SECRET = process.env.JWT_SECRET || 'your_default_secret_key'; // Fallback for local testing
}
