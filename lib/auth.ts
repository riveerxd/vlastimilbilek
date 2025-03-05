import { compare } from 'bcryptjs';

// In production, these would be environment variables
const USERNAME = 'admin';
// Replace this with your newly generated hash
const PASSWORD_HASH = '$2b$10$MSx3dmsHiU7/o2ocxCHwE.HEestv8D0INMEuXbx9VdUSNspEW1qs6';

export async function authenticate(username: string, password: string) {
  if (username !== USERNAME) {
    return false;
  }
  
  return await compare(password, PASSWORD_HASH);
} 