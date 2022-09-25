type Resolve = (value: any | PromiseLike<any>) => void;
type Reject = (reason?: any) => void;

const numCallback =
  (resolve: Resolve, reject: Reject) => (err: Error | null, num: number) =>
    err ? reject(err) : resolve(num);
const singleCallback =
  (resolve: Resolve, reject: Reject) => (err: Error | null, result: any) =>
    err || !result ? reject(err) : resolve(result);
const arrCallback =
  (resolve: Resolve, reject: Reject) => (err: Error | null, result: any[]) =>
    err ? reject(err) : resolve(result);

export { numCallback, arrCallback, singleCallback };
