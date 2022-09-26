type Resolve = (value: any | PromiseLike<any>) => void;
type Reject = (reason?: any) => void;

const numCallback =
  (resolve: Resolve, reject: Reject) => (err: Error | null, num: number) =>
    err ? reject(500) : resolve(num);
const singleCallback =
  (resolve: Resolve, reject: Reject) => (err: Error | null, result: any) => {
    if (err) return reject(500);
    if (!result) return reject(404);
    return resolve(result);
  };
const arrCallback =
  (resolve: Resolve, reject: Reject) => (err: Error | null, result: any[]) =>
    err ? reject(500) : resolve(result);
const updateCallback =
  (resolve: Resolve, reject: Reject) =>
  (err: Error | null, num: number, affected: any, upsert: boolean) =>
    err ? reject(500) : resolve({ num, affected, upsert });

export { numCallback, arrCallback, singleCallback, updateCallback };
