# 016_Lesson14_UltimateNFTTutorial

-   NFT is a non-fungible token

-   a dollar is fungible because it could be swapped for any other dollar and the value is equal...an equity is fungible because it could be swapped for any other equity and the value is equal...a pokemon card is unique (serial number, pokemon, rarity, etc) and is a good example of a Non-Fungible Item, an NFT is just a digitized version of this

-   the first standard for these NFT's was created by `ERC-721` on the Ethereum blockchain

-   you can put the art on chain, but it's reallllllly expensive...and so MOST of the NFT's are not on chain directly

    -   to fix this issue, the standard implemented a `Token URI` which is basically an API call to wherever...including centralized servers

    -   a typical URI will return something like this:

        ```json
        {
        	"name": "ABC-XYZ",
        	"description": "1 of 1 ABC-XYZ NFT and the only one that will ever be issued",
        	"image": "uri/to/image",
        	"attributes": ["cool", "awesome", "unique"]
        }
        ```

        -   major discussion over on-chain metadata and off-chain metadata

            -   many use `IPFS` to store the metadata, which minimizes centrality but is a little less reliable

            -   others use a centralized API, but if this goes down, so does the image and NFT data is unavailable

        -   the problem with off-chain metadata, is you can't really do anything super unique or c
