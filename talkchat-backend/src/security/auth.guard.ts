import { jwtVerify } from './../utils/jwtUtils';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { extractBearerToken } from '../utils/authUtils';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  // --- logic auth
  validateRequest(request: any) {
    const accessToken: string = extractBearerToken (request);
    // ---- no header auth bearer
    if (!accessToken) return false;
    else {
      return jwtVerify(accessToken);
    }
  }
}
