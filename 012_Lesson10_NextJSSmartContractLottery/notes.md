# 012_Lesson10_NextJSSmartContractLottery

- basically just taking notes here again, as i pretty much understand react, nextjs, etc

- uses `react-moralis` to actually connect to a wallet, but other than that all the same as a normal nextjs app

    - there are other tools like `ethers` you can use, but many of these rely on the `ethers` library anyways...some just make it easier to use
    
-  kinda a pointless section if you know front-end development basics -- same with the HTML lesson

- you could learn this whole section by just reading the moralis react docs

- uses tailwind to style the app which is super modern -- lowkey this is a great primer on building a modern app (reactjs, nextjs, tailwind, etc) 

    - if you want come back to this later if you need to build a front-end


    ## IPFS (Decentralized Deployment)
    
    - IPFS is a decentralized file storage system that allows you to store and share files on the internet.
    
    - when you add a file to ipfs, it first hashes it (`ipfs://oeijfoswefjisfpsdiafjdpfijadpfijapdofij` for example), basically each hash is like a web address
    
        - with this data, you can pin it to a node (say your node)
        
        - your node is connected to a bunch of other nodes
        
        - when you request a web address (i.e. a hash) you ask the network for it and it looks to find the node with it pinned
        
            - now this basically means each node has it's own data (which isn't really decentralized), however, other nodes can pin your data if they find it useful, making certain (more important) data available to others and decentralized
            
                - essentially it's kinda important to get others to pin your data so if you node goes down you aren't toast
            
    - IPFS nodes are easy to setup and easy to use
    
    - IPFS is like an AWS S3 bucket, but it's decentralized -- use it to host static sites (jamstack really good for this)
    
        <br>
    
        ### fleek.co
    
        - you can also use this site `https://fleek.co` to make this process a little smoother
        
            - basically just pulls from a git repo to update an ipfs site...sorta like `netlify` or `heroku` but for `IPFS`
            
        - BUT it also uploads to IPFS and gives a regular url to link to the IPFS version (even though this is technically through them) and isn't truly decentralized, it's a nice gap closer
        
        - lastly, it helps work with closing hosting deals via filecoin
        
        
        ### FileCoin
        
        - the problem with IPFS is people have to pin your data for it to persist in a decentralized manner
        
        - works close with the IPFS network
        
        