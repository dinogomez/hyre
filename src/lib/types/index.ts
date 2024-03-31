export interface iObject {
    id: string;
    label: string;
}

export interface iObjectT {
    id: string;
    text: string;
}

export interface Region {
    id: number;
    psgc_code: string;
    region_name: string;
    region_code: string;
}

export interface Barangay {
    brgy_code: string;
    brgy_name: string;
    city_code: string;
    province_code: string;
    region_code: string;
}

export interface City {
    city_code: string;
    city_name: string | null;
    province_code: string;
    psgc_code: string;
    region_code: string;
}

export interface Province {
    province_code: string;
    province_name: string;
    psgc_code: string;
    region_code: string;
}
