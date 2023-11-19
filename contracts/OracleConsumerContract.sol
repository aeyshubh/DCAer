// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./PhatRollupAnchor.sol";

contract OracleConsumerContract is PhatRollupAnchor {
    event ResponseReceived(address walletAddress,address asset1,uint256 asset1Value,address asset2);
    event ErrorReceived(address walletAddress,address asset1,uint256 asset1Value,address asset2);

    uint constant TYPE_RESPONSE = 0;
    uint constant TYPE_ERROR = 2;

    mapping(uint => string) requests;
    uint nextRequest = 1;

    constructor(address phatAttestor) {
        
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }

    function setAttestor(address phatAttestor) public {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }

    function request() public {
        // assemble the request
        uint id = nextRequest;
        _pushMessage(abi.encode(id));
        nextRequest += 1;
    }

    // For test
    function malformedRequest(bytes calldata malformedData) public {
        uint id = nextRequest;
        requests[id] = "malformed_req";
        _pushMessage(malformedData);
        nextRequest += 1;
    }

    function _onMessageReceived(bytes calldata action) internal override {
      
        (uint respType,address walletAddress,address asset1,uint256 asset1Value,address asset2) = abi.decode(
            action,
            (uint,address ,address ,uint256 ,address)
        );
        if (respType == TYPE_RESPONSE) {
            emit ResponseReceived(walletAddress,asset1 ,asset1Value ,asset2);
        } else if (respType == TYPE_ERROR) {
            emit ErrorReceived(walletAddress,asset1 ,asset1Value ,asset2);
        }
    }
}