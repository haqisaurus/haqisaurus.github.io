import { appConfig } from '../configs/configs';
import { store } from '../redux-storage/configureStore';
import { IResponse } from '../typed/Common';
import { IBankType, IBank } from '../typed/Entity';

export function getBankOptions (): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/bank-type', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: IBankType[] = await res.json();
        return { header: res, data };
    });
}
export function getBank (): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/bank', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: IBank[] = await res.json();
        return { header: res, data };
    });
}
export function createBank (values: IBank): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/bank', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data: IBank = await res.json();
        return { header: res, data };
    });
}
export function updateBank(values: IBank): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/bank/' + values.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data: IBank = await res.json();
        return { header: res, data };
    });
}
export function deleteBank(values: IBank): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/bank/' + values.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: IBank = await res.json();
        return { header: res, data };
    });
}