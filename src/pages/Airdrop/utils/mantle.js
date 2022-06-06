const stargate = require('@cosmjs/stargate');
const tm34RPC = require('@cosmjs/tendermint-rpc');
const authQuery = require("cosmjs-types/cosmos/auth/v1beta1/query");
const {tendermintRPC} = require("./keplr");

let stargateClient;
let tmClient;
let queryClient;
let rpcClient;
let authQueryService;

async function initialize() {
    try {
        stargateClient = await stargate.StargateClient.connect(tendermintRPC);
        tmClient = await tm34RPC.Tendermint34Client.connect(tendermintRPC);
        queryClient = new stargate.QueryClient(tmClient);
        rpcClient = stargate.createProtobufRpcClient(queryClient);
        authQueryService = new authQuery.QueryClientImpl(rpcClient);
    } catch (e) {
        console.log("Stargate initializing error")
        console.log(e);
        process.exit(0);
    }
}

async function checkAccountExists(address) {
    try {
        let accountResponse = await authQueryService.Account({address: address});
        return {success: true, exists: true, account: accountResponse};
    } catch (e) {
        // console.log(e.toString());
        let success = false
        if (e.toString() === "Error: Query failed with (22): rpc error: code = NotFound desc = account " + address + " not found: key not found") {
            success = true
        }
        return {success: success, exists: false};
    }
}

export {
    initialize,
    checkAccountExists,
    stargateClient,
}