import QRCode from 'qrcode';
import crypto from 'crypto';
import fs from 'fs';

brrr({
    adminId: 'ad63aaa1900e427c9425d414880669e6',
    readKey: 'edc0aa15d5b9429ab9e2da0dd3a82d69',
    lnBitsUrl: 'https://legend.lnbits.com',
    name: 'LGND',
    numberOfWallets: 3,
}).then(() => console.log('Printing done!'));

async function brrr(config) {
    const {name, numberOfWallets} = config;
    console.log('brrr....');

    const walletsHtml = [];
    const wallets = [];
    for (let i = 0; i < numberOfWallets; i++) {
        const walletName = `${name}${(i + 1 + '').padStart(3, '0')}`;
        console.log(`Creating wallet: ${walletName}`);
        const wallet = await createWallet(walletName, crypto.randomUUID(), config);
        const adminUrlLnBitsQR = await QRCode.toDataURL(wallet.adminUrlLnBits);
        const adminUrlLndHubQR = await QRCode.toDataURL(wallet.adminUrlLndHub);
        const lnUrlWQR = await QRCode.toDataURL(wallet.lnUrlW);

        // await toQrFile(`${walletName}-adminUrlLnBits`, wallet.adminUrlLnBits);
        // await toQrFile(`${walletName}-adminUrlLndHub`, wallet.adminUrlLndHub);
        // await toQrFile(`${walletName}-lnUrlW`, wallet.lnUrlW);

        wallets.push({...wallet, walletName});
        walletsHtml.push({...wallet, adminUrlLnBitsQR, adminUrlLndHubQR, lnUrlWQR, walletName});
    }

    fs.writeFile(`output/${name}0-${numberOfWallets}.html`, print(walletsHtml), e => {
        if (e) {
            console.error(e);
        }
    });

    fs.writeFile(`output/${name}0-${numberOfWallets}.json`, JSON.stringify(wallets, null, 2), e => {
        if (e) {
            console.error(e);
        }
    });
}

async function createWallet(walletName, userName, config) {
    try {
        const {adminId, readKey, lnBitsUrl} = config;

        const walletData = await (await post(`${lnBitsUrl}/usermanager/api/v1/users`, {
            admin_id: adminId,
            wallet_name: walletName,
            user_name: userName,
            email: '',
            password: ''
        }, readKey)).json();

        // extract generated wallet info
        const userId = walletData.id;
        const walletId = walletData.wallets[0].id;
        const adminKey = walletData.wallets[0].adminkey;
        const inKey = walletData.wallets[0].inkey;
        const adminUrlLnBits = `${lnBitsUrl}/wallet?usr=${userId}&wal=${walletId}`;

        // enable lnurlw
        await post(`${lnBitsUrl}/usermanager/api/v1/extensions`, {
            userid: userId, extension: 'withdraw', active: true
        }, inKey);
        const lnUrlW = (await (await post(`${lnBitsUrl}/withdraw/api/v1/links`, {
            'title': inKey,
            'min_withdrawable': 10,
            'max_withdrawable': 200000,
            'uses': 250,
            'wait_time': 10,
            'is_unique': false
        }, adminKey)).json()).lnurl;

        // enable bluewallet import
        await post(`${lnBitsUrl}/usermanager/api/v1/extensions`, {
            userid: userId, extension: 'lndhub', active: true
        }, inKey);

        const adminUrlLndHub = `lndhub://admin:${adminKey}@${lnBitsUrl}/lndhub/ext/`;

        return {adminUrlLnBits, adminUrlLndHub, lnUrlW};
    } catch (e) {
        console.log(e);
    }
}

async function post(url, body, xApiKey) {
    try {
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': xApiKey
            },
            method: 'POST',
            body: JSON.stringify(body)
        });
    } catch (e) {
        console.log(e);
    }
}

async function toQrFile(fileName, text) {
    return new Promise((res, rej) => {
        QRCode.toFile(
            `output/${fileName}.png`,
            text,
            {type: 'png'},
            (e) => {
                if (e) {
                    console.error(e);
                    rej(e);
                } else {
                    res();
                }
            }
        )
    });
}

function print(wallets) {
    return `<!DOCTYPE html>
<html lang="en">
<style>
.columns {
  display: flex;
  flex-wrap: wrap;
}

.column {
  flex: 0 0 27mm;
  margin: 1mm;
  height: 30mm;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
}

.box img {
  width: 25mm;
  height: 25mm;
}

p {
  position: absolute;
  font-size: 8px;
  font-family: Consolas,serif;
  top: 25mm;
}

html,
body {
  height: 297mm;
  width: 210mm;
}
</style>
<body>
<div class="columns">
${wallets.map(w => `
    <div class="column"><div class="box"><img src="${w.adminUrlLnBitsQR}"><p>${w.walletName} LNBits</p></div></div>
    <div class="column"><div class="box"><img src="${w.adminUrlLndHubQR}"><p>${w.walletName} LNDHub</p></div></div>
    <div class="column"><div class="box"><img src="${w.lnUrlWQR}"><p>${w.walletName} LNURLW</p></div></div>
`).join('')}
</div>
</body>
</html>`;
}
