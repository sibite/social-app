import type { RootState } from '.';

const prepareAuthHeader = (
  headers: Headers,
  { getState }: { getState: Function }
) => {
  const { token } = (getState() as RootState).auth;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
export default prepareAuthHeader;
