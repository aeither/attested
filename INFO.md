
## BNB Testnet Network Information

| Parameter          | Value                                           |
| ------------------ | ----------------------------------------------- |
| Network name       | BNB Testnet                                     |
| Network URL        | https://data-seed-prebsc-1-s1.binance.org:8545/ |
| Chain ID           | 97                                              |
| Currency symbol    | BNB                                             |
| Block explorer URL | https://testnet.bscscan.com/                    |
| Verifier URL       | https://api-testnet.bscscan.com/api             |

## Test & Deploy

```bash
forge test
```

```bash
source .env && rm -rf cache out && forge build && forge script --chain 97 script/RestaurantLoyalty.s.sol:DeployScript --rpc-url https://data-seed-prebsc-1-s1.binance.org:8545/ --broadcast --verify --verifier blockscout --verifier-url "https://api-testnet.bscscan.com/api?apikey=${BLOCKSCOUT_API_KEY}" -vvvv --private-key ${PRIVATE_KEY}
```
