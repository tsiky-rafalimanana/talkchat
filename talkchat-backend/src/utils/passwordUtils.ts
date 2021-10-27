import { MESSAGE } from './../constants/message';
import * as bcrypt from 'bcrypt';

export const verifyPassword = async (
  inputPassword: string,
  userPassword: string,
): Promise<boolean> => {
  if (!(await bcrypt.compare(inputPassword, userPassword))) {
    return false
  }
  return true;
};

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};