# 014_Lesson12_HardhatERC20

-   in this section we basically create our own token

    ## EIP

    -   many popular blockchains have whats known as "Improvement Proposals"

    -   Ethereum's version of this is called an `EIP` which stands for "Ethereum Improvement Proposals"

        -   in other blockchains you might see `<chainname>IP`...i.e. in Polygon, you might see PEP for Polygon Improvement Proposal

    -   these `EIP` can be anything from a new standard to major protocol enhancements

        -   you can see them at [this link](https://eips.ethereum.org/)

    -   `EIP`'s that are approved by the community eventually become `ERC`'s which are `"Ethereum Request for Comments"`

    -   `ERC`'s are technical documents written for/by developers for adopting a standard for doing something moving forward

    ## ERC-20

    -   `ERC-20` is a standard for token creation and is called a "Token Standard"

        -   you can read more about it [here](https://eips.ethereum.org/EIPS/eip-20) if you want

    -   some of the things you can do with `ERC-20`:

        1. governance Tokens
        2. secure an underlying network
        3. create a synthetic asset
        4. etc

    -   to use `ERC-20`, all you need to do is build a smart contract with the principals outlined in that ERC's documetation

---

-   going to use `js` instead of `ts` for this just to make it easier to focus on the actual solution

    ## ./Contracts/ManualToken.sol

    -   we are going to do this the hard way first

    -   to start: we throw in this:

        -   `mapping(address => uint256) public balanceOf;`

        -   this basically is a mapping of every address on the blockchain that has this token

    -   next we need our transfer function:

        ```ts
        function _transfer(
            address from,
            address to,
            uint256 amount
        ) public {
            balanceOf[from] = balanceOf[from] - amount;
            balanceOf[to] = balanceOf[to] + amount;
        }
        ```

        -   pretty straighforward... you take in the sender, who its going to and the amount and you just subtract the balance of the `from` and add the same value to the `to`

    -   next we need to make sure that the person that received the tokens from you has the ability to use them:

        -   `mapping(address => mapping(address => uint256)) public allowance;`

        -   seems a little odd, but it's just mapping your address to another address and the amount

    -   next we need a function that allows someone with allowance to transfer tokens:

        ```ts
        function transferFrom(
            address _from,
            address _to,
            uint256 _value
        ) public returns (bool success) {
            require(_value <= allowance[_from][msg.sender]);
            allowance[_from][msg.sender] -= _value;
            _transfer(_from, _to, _value);
            return true;
        }
        ```

    -   so these are some of the major parts of a contract like this...but building this line by line is kind of tedious...

        -   so lets just use a library and inherit it so we can just override functions...

    ## OpenZepplin

    -   open source library for smart contracts

    -   you can see much of their work by looking at their [Github](https://github.com/OpenZeppelin/openzeppelin-contracts)

    -   you can see the ERC-20 contract [here](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20)

    ## ./Contracts/OurToken.sol

    -   so now we can just do this in our new contract with OpenZepplin:

        ```ts
        // SPDX-License-Identifier: UNLICENSED

        pragma solidity ^0.8.8;

        import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

        contract OurToken is ERC20 {
            constructor() ERC20("OurToken", "DM") {}
        }
        ```

        -   as you can see, we are just inheriting the ERC20 contract and overriding the constructor for that contract with our token name and symbol

---

-   thats pretty much it other than deploying in this section, kinda weak but all good
