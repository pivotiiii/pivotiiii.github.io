// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  declare module "*.webp";
  declare module "*.png";
  module "*&as=metadata&imagetools" {
    const outputs: {
      width: string;
      height: string;
      src: string;
    };
    export default outputs;
  }
  declare module "*&imagetools" {
    const outputs: string;
    export default outputs;
  }
  declare const __URL__: string;
  declare const __WORKER_URL__: string;
}

export {};
