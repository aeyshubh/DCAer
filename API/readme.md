Use jsonParser whenever dealing with Post data
use /api/products/whichever route you like
localhost:5000/api/products/create/data to add new user
localhost:5000/api/products to get all the data about swaps
localhost:5000/api/products?walletAddress=gm for getting data bout a wallet address


New Api url https://dcaer-api-production.up.railway.app/api/products?walletAddress=0x82a7A0828fa8EB902f0508620Ee305b08634318A
//////Send raw Json request in form//////////
{
"walletAddress": "0x82a7A0828fa8EB902f0508620Ee305b08634318A",
"asset1": "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
"asset1Value": 30000, //Store it in wei
"asset2": "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
"timeDuration": "1h"
}