const {parentPort, workerData} = require("worker_threads");
const bip39 = require('bip39');
const bip84 = require('bip84');

function getVanity() {
    while (true) {
        let mnemonic = bip39.generateMnemonic();
        let root = new bip84.fromMnemonic(mnemonic);
        let child0 = root.deriveAccount(0);
        let account0 = new bip84.fromZPrv(child0);
        let address = account0.getAddress(0);
        const len = workerData.prefix.length;
        let index = address.toString().slice(0,len);

        if (index == workerData.prefix) {
            return address + ' ' + mnemonic;
        }
    };
};
parentPort.postMessage(getVanity(workerData.index, workerData.prefix));