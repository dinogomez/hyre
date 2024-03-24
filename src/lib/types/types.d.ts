declare module "select-philippines-address" {
    export function regions(): Promise<any>;
    export function regionByCode(code: string): Promise<any>;
    export function provinces(code: string): Promise<any>;
    export function provincesByCode(code: string): Promise<any>;
    export function provinceByName(name: string): Promise<any>;
    export function cities(code: string): Promise<any>;
    export function barangays(code: string): Promise<any>;
}
