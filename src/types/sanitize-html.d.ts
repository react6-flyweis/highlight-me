declare module "sanitize-html" {
  function sanitize(dirty: string, options?: unknown): string;
  export default sanitize;
}
