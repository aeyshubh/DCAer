// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./PhatRollupAnchor.sol";
pragma abicoder v2;
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    function transferFrom(address from, address to, uint256 value) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);
}
contract OracleConsumerContract is PhatRollupAnchor {
    event ResponseReceived(
        address walletAddress,
        address asset1,
        uint256 asset1Value,
        address asset2,
        uint256 amountOut
    );
        event ResponseReceived2(address walletAddress,
        address asset1,
        uint256 asset1Value,
        address asset2,
        uint256 amountOut);
    event test(string message);
    event ErrorReceived(
        uint256 error,
        address walletAddress,
        address asset1,
        uint256 asset1Value,
        address asset2
    );
    ISwapRouter public immutable swapRouter;
IERC20 public USDCTOKEN = IERC20(USDC); 
    uint constant TYPE_RESPONSE = 0;
    uint constant TYPE_ERROR = 2;
    address public constant USDC = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address public constant WMATIC = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;
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
            address _walletAddress,
            address asset1,
            uint256 asset1Value,
            address asset2
        ) = abi.decode(action, (uint, address, address, uint256, address));
        if (respType == TYPE_RESPONSE) {
            // msg.sender must approve this contract
            // Transfer the specified amount of USDC to this contract.
            USDCTOKEN.transferFrom(_walletAddress,address(this), asset1Value);
                emit test("Transfer Done");
            // Approve the router to spend USDC.
            USDCTOKEN.approve(0xE592427A0AEce92De3Edee1F18E0157C05861564, asset1Value);
            emit test("Approve Done");
            ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
                    tokenIn: asset1,
                    tokenOut: asset2,
                    fee: poolFee,
                    recipient: _walletAddress,
                    deadline: block.timestamp,
                    amountIn: asset1Value,
                    amountOutMinimum: 0,
                    sqrtPriceLimitX96: 0
                });
            uint256 amountOut = swapRouter.exactInputSingle(params);
            emit ResponseReceived(
                _walletAddress,
                asset1,
                asset1Value,
                asset2,
                amountOut
            );
        } else if (respType == TYPE_ERROR) {
            emit ErrorReceived(TYPE_ERROR,_walletAddress, asset1, asset1Value, asset2);
        }
    }
}
