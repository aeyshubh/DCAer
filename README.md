# DCAer ~ A Dapp which Dollor Cost Average Tokens with just one Click and with On-Chain Notifications.
## The Project is Deployed on **Phala and Polygon Mainnet**. 
![DCA Frontend](https://github.com/aeyshubh/DCAer-Ph-1/assets/50445649/39e1a233-255f-44ce-8bb9-c4f418477f29)

- Polygon Consumer COntract : https://polygonscan.com/address/0x17121eB13DFA6B6575e8b4E6b4Eb5b47AE2F5A5F#writeContract
- 
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
  - ![image](https://github.com/aeyshubh/DCAer-Ph-1/assets/50445649/e15e6897-2303-4086-8b57-c87c49a78c6f)
  - **Phat Functions** are used to fetch User's data from the API with a Wallet Address .
  - This **Data** is then sent to **Consumer contract** through **Phala's Phat Function**.
  - The **receiving Side** of the consumer smart contract will **perform the Swap** with the Specified data.
  - After the **swap**, an **On-Chain Push Notification** will be sent to the **user's Wallet ** so that he/she is Notified about the **DCA Action**, after every Swap.
  - ![DCAer Notification](https://github.com/aeyshubh/DCAer-Ph-1/assets/50445649/64de9781-61c0-496d-be87-29c75e95672b)
  - This process will continue till the **Allowance** of Token 1 becomes 0 for the consumer Contract.
  - User can repeat the same process by just **increasing the Allowance** of Token 1.
 

