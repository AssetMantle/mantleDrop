import {createProtobufRpcClient, QueryClient, setupGovExtension, SigningStargateClient} from "@cosmjs/stargate";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {QueryClientImpl} from "cosmjs-types/cosmos/staking/v1beta1/query";
import Long from "long";
export const restAPI = "https://rest.assetmantle.one/";
export const tendermintRPC = "https://rpc.assetmantle.one/";
export const chainID = "mantle-1";
export const chainName = "AssetMantle";
const websiteURL = "https://explorer.assetmantle.one/";
const coinName = "MNTL";
const coinDenom = "umntl";
export const prefix = "mantle";
export const maxGas = 250000;
const MicroFactor = 1000000;

async function initializeKeplr() {
    await setChain();
    await window.keplr.enable(chainID);
}

async function getQueryClient(rpcEndpoint) {
    const tendermint34Client = await Tendermint34Client.connect(rpcEndpoint);
    const queryClient = QueryClient.withExtensions(
        tendermint34Client,
        setupGovExtension
    );
    return createProtobufRpcClient(queryClient);
}

async function getKeplrWallet() {
    await initializeKeplr().catch(e => console.log(e));
    if (!window.keplr) {
        alert("Please install keplr extension");
    } else {
        try {
            let offlineSigner = window.keplr.getOfflineSigner(chainID);
            let accounts = await offlineSigner.getAccounts();
            return [offlineSigner, accounts[0].address];
        } catch (e) {
            console.log(e)
        }
    }
}

async function getOsmosBalance(wallet,validatorAddress){
    const client = await SigningStargateClient.connect(
        tendermintRPC,
    );
    const balance = await client.getBalance(wallet[1],"umntl");
    let delegatedBalance = await client.getDelegation(wallet[1],validatorAddress);
    (delegatedBalance == null) ? delegatedBalance = 0 : delegatedBalance = delegatedBalance.amount
    return {
        'balance': (balance.amount/MicroFactor),
        'delegatedBalance': (delegatedBalance/MicroFactor)};
}

async function RpcClient() {
    const tendermintClient = await Tendermint34Client.connect(tendermintRPC);
    const queryClient = new QueryClient(tendermintClient);
    return createProtobufRpcClient(queryClient);
}

async function getValidators(){

    const rpcClient = await RpcClient();

    const stakingQueryService = new QueryClientImpl(rpcClient);

    let key = new Uint8Array();
    let validators = [];

    do {
        const response = await stakingQueryService.Validators({
            status: false,
            pagination: {
                key: key,
                offset: Long.fromNumber(0, true),
                limit: Long.fromNumber(0, true),
                countTotal: true
            }
        });
        key = response.pagination.nextKey;
        validators.push(...response.validators);
    } while (key.length !== 0);
    return validators;
}

async function Transaction(wallet, signerAddress, msgs, fee, memo = "") {
    const cosmJS = await SigningStargateClient.connectWithSigner(
        tendermintRPC,
        wallet,
    );
    return await cosmJS.signAndBroadcast(signerAddress, msgs, fee, memo);
}

async function signArbitrary(signer, data) {
    try {
        return await window.keplr.signArbitrary(chainID, signer, data);
    } catch (e) {
        console.log(e)
    }
}

function getTxFee(amount = 0, gas = maxGas) {
    return {amount: [{amount: String(amount), denom: coinDenom}], gas: String(gas)};
}

async function setChain() {
    await window.keplr.experimentalSuggestChain({
        chainId: chainID,
        chainName: chainName,
        rpc: tendermintRPC,
        rest: restAPI,
        bip44: {
            coinType: 118,
        },
        bech32Config: {
            bech32PrefixAccAddr: prefix,
            bech32PrefixAccPub: prefix + "pub",
            bech32PrefixValAddr: prefix + "valoper",
            bech32PrefixValPub: prefix + "valoperpub",
            bech32PrefixConsAddr: prefix + "valcons",
            bech32PrefixConsPub: prefix + "valconspub",
        },
        currencies: [
            {
                coinDenom: coinDenom,
                coinMinimalDenom: coinDenom,
                coinDecimals: 6,
                coinGeckoId: "assetmantle",
            },
        ],
        feeCurrencies: [
            {
                coinDenom: coinDenom,
                coinMinimalDenom: coinDenom,
                coinDecimals: 6,
                coinGeckoId: "assetmantle",
            },
        ],
        stakeCurrency: {
            coinDenom: coinDenom,
            coinMinimalDenom: coinDenom,
            coinDecimals: 6,
            coinGeckoId: "assetmantle",
        },
        coinType: 118,
        gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.03,
        },
    });

}

export {getTxFee, getKeplrWallet, signArbitrary, Transaction, MicroFactor, coinDenom, getQueryClient,getOsmosBalance, getValidators,initializeKeplr}