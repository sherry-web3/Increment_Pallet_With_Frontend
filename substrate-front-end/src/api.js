import { ApiPromise, WsProvider } from '@polkadot/api';

export async function connectToSubstrate() {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    console.log("Connected to Substrate");
    return api;
}
