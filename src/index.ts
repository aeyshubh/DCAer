import "@phala/pink-env";
import { Coders } from "@phala/ethers";
import { StringCoder } from "@phala/ethers/lib.commonjs/abi/coders";
import { METHODS } from "http";
type HexString = `0x${string}`

// eth abi coder
const uintCoder = new Coders.NumberCoder(32, false, "uint256");
const stringCoder = new Coders.StringCoder("string")
const bytesCoder = new Coders.BytesCoder("bytes");

function encodeReply(reply: [number, string, string,number, string]): HexString {
  return Coders.encode([uintCoder, stringCoder, stringCoder,uintCoder, stringCoder], reply) as HexString;
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

function fetchLensApiStats(): any {
 
  let headers = {
    "Content-Type": "application/json",
    "User-Agent": "phat-contract",
  };
  //
  // In Phat Function runtime, we not support async/await, you need use `pink.batchHttpRequest` to
  // send http request. The function will return an array of response.
  //
  let response1 = pink.httpRequest(
      {
        url:`https://dcaer-api-production.up.railway.app/api/products?walletAddress=0x82a7A0828fa8EB902f0508620Ee305b08634318A`,
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
  console.log(`The response body is ${respBody}`);
aa.push(respBody);
  //console.log("The response body is",respBody,"response body 2 is",resBody2);
  //let atack1 = resBody2["data"].attack1
  if (typeof respBody !== "string" && typeof respBody !== "string" ) {
    throw Error.FailedToDecode;
  }
  return aa;
}


export default function main(request: HexString, settings: string): HexString {
 let requestId, encodedProfileId;
  try {
    [requestId] = Coders.decode([uintCoder], request);
  } catch (error) {
    console.info("Malformed request received");
    return encodeReply([TYPE_ERROR,"Mal Value","Mal Value",0,"Mal Value"]);
  }

  try {
    const respData = fetchLensApiStats();
    const resp1 = JSON.parse(respData[0])
    //console.log("The response in the main is::",resp1);
    // let stats = resp1.data.profile.stats.totalCollects+resp1.data.profile.stats.totalFollowers*100+resp1.data.profile.stats.totalFollowing*300+resp1.data.profile.stats.totalPosts*400;
    let walletAddress:string = resp1.data[0].walletAddress;
    let asset1:string = resp1.data[0].asset1;
    let asset1Value:number = resp1.data[0].asset1Value;
    let asset2:string = resp1.data[0].asset2;


    console.log("response:", [TYPE_RESPONSE, walletAddress, asset1,asset1Value,asset2]);
    return encodeReply([TYPE_RESPONSE, walletAddress, asset1,asset1Value,asset2]);
  } catch (error) {
    if (error === Error.FailedToFetchData) {
      throw error;
    } else {
      // otherwise tell client we cannot process it
      console.log("error:", [TYPE_ERROR, requestId, error]);
      return encodeReply([TYPE_ERROR,"Mal Req","Mal Req",0,"Mal req"]);
    }
  }
}