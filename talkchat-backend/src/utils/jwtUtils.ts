import { MESSAGE } from './../constants/message';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import configuration from '../config/configuration';

// ------ generate JWT

export const jwtEncode = (payload: any): string => {
  const signedToken = jwt.sign(payload, configuration.jwt.secret, {
    algorithm: 'HS256',
    expiresIn: configuration.jwt.expiration,
    // expiresIn : Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count.
    // If you use a string be sure you provide the time units (days, hours, etc),
    // otherwise milliseconds unit is used by default ("120" is equal to "120ms").
  });
  return signedToken;
};

// ------ verify JWT Signature and expiration
export const jwtVerify = (token: string): boolean => {
  try {
    const result = jwt.verify(token, configuration.jwt.secret);
    return !!result;
  } catch (error) {
    throw new HttpException(MESSAGE.AUTH_ERROR, HttpStatus.UNAUTHORIZED);
  }
};

// ---- decode jwt to extract payload
export const jwtDecode = (token: string): any => {
  try {
    const result = jwt.verify(token, configuration.jwt.secret);
    return result;
  } catch (error) {
    throw new HttpException(MESSAGE.AUTH_ERROR, HttpStatus.UNAUTHORIZED);
  }
};
