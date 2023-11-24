# DCAer ~ A Dapp which Dollor Cost Average Tokens with just one Click and with On-Chain Notifications.
## The Project is Deployed on **Phala and Polygon Mainnet**. 
![D1](https://github.com/aeyshubh/DCAer/assets/50445649/e6324549-3be0-4db5-b68a-29353d0955aa)

- Polygon Consumer COntract : https://polygonscan.com/address/0x9a3cf3A5Bc231cC7Ba66fE9827fAa2ea099b8fCc#writeContract
- Push Staging Channel : https://staging.push.org/channels?channel=0x82a7A0828fa8EB902f0508620Ee305b08634318A
## DCAer :
- ### User Story : **I want to invest 10$ daily in x token but I don't have time to perform swaps daily as it's Boring....**
- Don't Worry,i Got you....
- ### My solition :
  - Give how much Total amount you want to swap into a token.
  - Give Duration at which these swaps needs to be performed Eg : Every Hour in a day or Every 5 minutes.
  - Sign a Approval Request of Total Amount of tokens.
  - That's It.
    
- ### Tech Stacks/ Process :
  - At Entry the User's data about DCA is Stored in An API .
  - Following Data is sotred :
    - Token 1(USDC) and Token 2(PHALA) to Swap
    - Total Value of Token 1 to swap in multiple x Durations .
    - Duration at which DCA Action needs to be take.
  - ![D2](https://github.com/aeyshubh/DCAer/assets/50445649/42606f85-2a8b-4caf-9b05-841104f02d43)
  - **Phat Functions** are used to fetch User's data from the API with a Wallet Address .
  - This **Data** is then sent to **Consumer contract** through **Phala's Phat Function**.
  - ![D3](https://github.com/aeyshubh/DCAer/assets/50445649/0f862546-2905-4e2c-bb64-b1de1384f24f)
  - The **receiving Side** of the consumer smart contract will **perform the Swap** with the Specified data.
  - After the **swap**, an **On-Chain Push Notification** will be sent to the **user's Wallet ** so that he/she is Notified about the **DCA Action**, after every Swap.
  - ![D4](https://github.com/aeyshubh/DCAer/assets/50445649/19c1340d-28e4-4c0d-ba1d-5c18cb24cbf7)
  - This process will continue till the **Allowance** of Token 1 becomes 0 for the consumer Contract.
  - User can repeat the same process by just **increasing the Allowance** of Token 1.
 
- ### To Run:
  - Git clone and cd to Frontend.
  - run npm install there
  - Run index.html with Linve Server.
  - Subscribe to the Push Channel mentioned at the start.     
 

