export interface IResLogin {
    expiredAt: number;
    token: string;
}
export interface IResAddress {
    address: string;
    city: string;
    city_id: number | any;
    created_at: Date;
    id: number;
    is_default: boolean;
    latitude: string;
    longitude: string;
    name: string;
    postalcode: number | any;
    province: string;
    province_id: number | any;
    store_id: number;
    subdistrict: string;
    subdistrict_id: number | any;
    updated_at: Date;
    user_id: number;
}
export interface IResBank {
    id?:number;
    name: string;
    code: string;
    type: string;
    account_number: string;
    account_name: string;
    user_id: number;
    store_id: number;
    is_default: boolean;
    updated_at: Date;
    created_at: Date;
}
export interface IResDelivery {
    courier: string;
    created_at: Date;
    id: number;
    store_id: number;
    updated_at: Date;
}
export interface IResStore {
    addresses?: IResAddress[];
    banks?: IResBank[];
    deli_services?: IResDelivery[];
    created_at: Date;
    deleted_at: Date;
    delivery_support: boolean;
    desc: string;
    id: number;
    logo: string;
    name: string;
    phone: string;
    rate: number;
    status: string;
    updated_at: Date;
    user_id: number;
    imageBB: string;
    slug: string;
}
export interface IResBankType {
    typname: string;
    value: string;
}

export interface IUser {
    activation_code: string;
    created_at: Date;
    email: string;
    facebook: boolean;
    facebook_id: string;
    google: boolean;
    google_id: string;
    id: number;
    name: string;
    password: string;
    phone: string;
    photo: string;
    status: string;
    updated_at: Date;
}