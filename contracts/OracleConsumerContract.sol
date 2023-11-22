// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./PhatRollupAnchor.sol";
pragma abicoder v2;
// Deployed at 0xEb4F06020D98D4Ee291c9d0ce9557474410d1c05 on mumbai
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract OracleConsumerContract is PhatRollupAnchor {
    event ResponseReceived(
        address walletAddress,
        address asset1,
        uint256 asset1Value,
        address asset2,
        uint256 amountOut
    );
    event ErrorReceived(
        uint256 error,
        address walletAddress,
        address asset1,
        uint256 asset1Value,
        address asset2
    );
    ISwapRouter public immutable swapRouter;

    uint constant TYPE_RESPONSE = 0;
    uint constant TYPE_ERROR = 2;
    address public constant USDC = 0x0FA8781a83E46826621b3BC094Ea2A0212e71B23;
    address public constant WMATIC = 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889;
    // For this example, we will set the pool fee to 0.3%.
    uint24 public constant poolFee = 3000;
    mapping(uint => string) requests;
    uint nextRequest = 1;

    constructor(address phatAttestor) {
        swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }

    function setAttestor(address phatAttestor) public {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }

    //1700499504
    function request(address _walletAddress) public {
        uint id = nextRequest;
        _pushMessage(abi.encode(id,_walletAddress));
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
        (
            uint respType,
            address walletAddress,
            address asset1,
            uint256 asset1Value,
            address asset2
        ) = abi.decode(action, (uint, address, address, uint256, address));
        if (respType == TYPE_RESPONSE) {
            // msg.sender must approve this contract
            // Transfer the specified amount of USDC to this contract.
            TransferHelper.safeTransferFrom(
                USDC,
                walletAddress,
                address(this),
                asset1Value
            );
            // Approve the router to spend USDC.
            TransferHelper.safeApprove(USDC, address(swapRouter), asset1Value);
            ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
                    tokenIn: USDC,
                    tokenOut: WMATIC,
                    fee: poolFee,
                    recipient: walletAddress,
                    deadline: block.timestamp,
                    amountIn: asset1Value,
                    amountOutMinimum: 0,
                    sqrtPriceLimitX96: 0
                });
            uint256 amountOut = swapRouter.exactInputSingle(params);
            emit ResponseReceived(
                walletAddress,
                asset1,
                asset1Value,
                asset2,
                amountOut
            );
        } else if (respType == TYPE_ERROR) {
            emit ErrorReceived(TYPE_ERROR,walletAddress, asset1, asset1Value, asset2);
        }
    }
}
