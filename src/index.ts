import "@phala/pink-env";
import { Coders } from "@phala/ethers";


type HexString = `0x${string}`
// eth abi coder
const uintCoder = new Coders.NumberCoder(32, false, "uint256");
const addressCoder = new Coders.AddressCoder("AddressCoder")

function encodeReply(reply: [number, string, string,number, string]): HexString {
  return Coders.encode([uintCoder, addressCoder, addressCoder,uintCoder, addressCoder], reply) as HexString;
}

// Defined in TestLensOracle.sol
const TYPE_RESPONSE = 0;
const TYPE_ERROR = 2;

enum Error {
  BadLensProfileId = "BadLensProfileId",
  FailedToFetchData = "FailedToFetchData",
  FailedToDecode = "FailedToDecode",
  MalformedRequest = "MalformedRequest",
  dataError ="DataError",
}

function errorToCode(error: Error): number {
  switch (error) {
    case Error.BadLensProfileId:
      return 1;
    case Error.FailedToFetchData:
      return 2;
    case Error.FailedToDecode:
      return 3;
    case Error.MalformedRequest:
      return 4;
    case Error.dataError:
      return 5
    default:
      return 0;
  }
}
function fetchLensApiStats(wallettAddress:string): any {
 
  let headers = {
    "Content-Type": "application/json",
    "User-Agent": "phat-contract",
  };
      let response1 = pink.httpRequest(
        {
          url:`https://dcaer-api-production.up.railway.app/api/products?walletAddress=${wallettAddress}`,
          method:"GET",
          headers,
          returnTextBody:true
        }
    );
   
    if (response1.statusCode !== 200) {
      console.log(
        `Fail to read Lens api with status code: ${response1.statusCode}, error: ${
          response1
        }}`
      );
      throw Error.FailedToFetchData;
    }
    let respBody = response1.body;
    let aa = [];
    aa.push(respBody)
    console.log(`The response body is ${aa}`);
    if (typeof respBody !== "string" && typeof respBody !== "string" ) {
      throw Error.FailedToDecode;
    }
    return aa;
    }
// Duration : 1h:3600 Timestamp unit 

export default function main(request: HexString): HexString {
 let requestId;
 let _walletAddress;
// let time;
  try {
    [requestId,_walletAddress] = Coders.decode([uintCoder,addressCoder], request);
  } catch (error) {
    console.info("Malformed request received");
    return encodeReply([TYPE_ERROR,"Mal Value","Mal Value",0,"Mal Value"]);
  }
      try {
      const respData = fetchLensApiStats(_walletAddress);
      const resp1 = JSON.parse(respData[0])
      console.log(`For ID ${requestId}, Data fetched is ${JSON.stringify(resp1.data[0])}`);
      console.log("Trial-2")
      let walletAddress:string = resp1.data[0].walletAddress;
      let asset1:string = resp1.data[0].asset1;
      let asset1Value:number = resp1.data[0].asset1Value;
      let asset2:string = resp1.data[0].asset2;
  
      //For last iteration
  //if(valuesFinished ==1){
    console.log("response:", [TYPE_RESPONSE, walletAddress, asset1,asset1Value,asset2]);
    return encodeReply([TYPE_RESPONSE, walletAddress, asset1,asset1Value,asset2]);
  }
 catch (error) {
      if (error === Error.FailedToFetchData) {
        throw error;
      } else {
        // otherwise tell client we cannot process it
        console.log("error at 106 :", [TYPE_ERROR, requestId, error]);
        return encodeReply([TYPE_ERROR,"Mal Req","Mal Req",0,"Mal req"]);
      }
    }
    }
