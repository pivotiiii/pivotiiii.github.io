declare module "*.webp";
declare module "*.png";
declare module "*&as=metadata&imagetools" {
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
