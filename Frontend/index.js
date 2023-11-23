const ethers = require('ethers');
const abi = require("./abi");
const tokens = require("./tokens");
let currentTrade = {};
let currentSelectSide;

async function init() {
    await listAvailableTokens();
}

async function listAvailableTokens() {
    console.log("initializing");
    let response = tokens;
    console.log(response);

    // create token list for modal

    let parent = document.getElementById("token_list");
    for (const i in tokens.tokens) {
        // token row in the modal token list
        //console.log(`Token Image ${tokens[i].logoURI}`)
        let div = document.createElement("div");
        div.className = "token_row";
        let html = `
    <img class="token_list_img" src="${tokens.tokens[i].logoURI}">
      <span class="token_list_text">${tokens.tokens[i].symbol}</span>
      `;
        div.innerHTML = html;
        div.onclick = () => {
            selectToken(tokens.tokens[i]);
        };
        parent.appendChild(div);
    }
}

function selectToken(token) {
    closeModal();
    currentTrade[currentSelectSide] = token;
    console.log("currentTrade:", currentTrade);
    renderInterface();
}

function renderInterface() {
    if (currentTrade.from) {
        console.log(currentTrade.from)
        document.getElementById("from_token_img").src = currentTrade.from.logoURI;
        document.getElementById("from_token_text").innerHTML = currentTrade.from.symbol;
    }
    if (currentTrade.to) {
        document.getElementById("to_token_img").src = currentTrade.to.logoURI;
        document.getElementById("to_token_text").innerHTML = currentTrade.to.symbol;
    }

}

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            console.log("connecting");
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Accounts are : +", accounts);
        } catch (error) {
            console.log(error);
        }
        document.getElementById("login_button").innerHTML = "Connected";
        // const accounts = await ethereum.request({ method: "eth_accounts" });
        document.getElementById("swap_button").disabled = false;
    } else {
        document.getElementById("login_button").innerHTML =
            "Please install MetaMask";
    }
}

function openModal(side) {
    currentSelectSide = side;
    document.getElementById("token_modal").style.display = "block";
}

async function trySwap() {
    console.log("trying swap");
    const contract_address = "0x3B04EFf99792d8d299E798Aa15ead9b8bB77b344";
    const usdc_contract_address ="0x0FA8781a83E46826621b3BC094Ea2A0212e71B23";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractObj = new ethers.Contract(usdc_contract_address, abi, signer);
   
    // Only work if MetaMask is connect
    // Connecting to Ethereum: Metamask

    // The address, if any, of the most recently used account that the caller is permitted to access
    let accounts = await ethereum.request({ method: "eth_accounts" });
    let takerAddress = accounts[0];
    const asset1 = currentTrade.from.address;
    const asset1Value = Number(document.getElementById("from_amount").value) * 1000000;
    const asset2 = currentTrade.to.address;
    //const time = (document.getElementById("time").value);
    const duration = (document.getElementById("selection").value);

    //console.log(`Asset 1 : ${asset1} AssetValue1: ${asset1Value} Asset 2 : ${asset2} Time : ${time} Duration : ${duration * time}`);
    //console.log("setup ERC20TokenContract: ", ERC20TokenContract);

    // Grant the allowance target an allowance to spend our tokens.
    const tx = await contractObj.approve(contract_address, asset1Value);
    console.log(tx.transactionHash);
        const params = JSON.stringify({
            walletAddress: accounts[0],
            asset1: asset1,
            asset1Value: asset1Value,
            asset2: asset2,
            timeDuration: duration
        });
    
    
        // Fetch the swap quote.
          const response = await fetch("https://dcaer-api-production.up.railway.app/api/products/create",{
            method: "POST",
            body: params,
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });
          console.log("Resonse is :"+response);
}

function closeModal() {
    document.getElementById("token_modal").style.display = "none";
}
connect();
init();

document.getElementById("login_button").onclick = connect;
document.getElementById("from_token_select").onclick = () => {
    openModal("from");
};
document.getElementById("to_token_select").onclick = () => {
    openModal("to");
};
document.getElementById("modal_close").onclick = closeModal;
document.getElementById("swap_button").onclick = trySwap;