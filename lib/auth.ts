import { compare } from 'bcryptjs';

// In production, these would be environment variables
const USERNAME = 'admin';
// Replace this with your newly generated hash
const PASSWORD_HASH = '$2b$10$jPq5HdSi5LMv5662qLf.deu3u1fikmtN9FZTSRVdPGIVYMKj3Cxiy';

export async function authenticate(username: string, password: string) {
  if (username !== USERNAME) {
    return false;
  }
  
  return await compare(password, PASSWORD_HASH);
} 