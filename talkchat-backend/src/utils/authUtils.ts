
export const extractBearerToken = (request: any): string => {
  const authorization =
    request.headers['authorization'] || request.headers['Authorization'];
  const bearer =
    authorization && authorization.startsWith('Bearer ')
      ? authorization
      : null;
  return bearer ? bearer.split('Bearer ')[1] : null;
}