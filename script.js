document.addEventListener('DOMContentLoaded', function() {
    
    document.body.classList.add('explorer-mode');
    
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
           
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active-section'));
            
            
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active-section');
            
            
            document.body.classList.remove('explorer-mode', 'tasks-mode', 'about-mode');
            if (sectionId === 'explorer') {
                document.body.classList.add('explorer-mode');
                const selectedChain = document.getElementById('chainSelector').value;
                populateDapps(selectedChain);
            } else if (sectionId === 'dailies') {
                document.body.classList.add('tasks-mode');
            } else {
                document.body.classList.add('about-mode');
            }
        });
    });
    
    
    document.querySelectorAll('.task-category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            
            document.querySelectorAll('.task-category-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.task-section').forEach(s => s.classList.remove('active-task'));
            
            
            this.classList.add('active');
            const taskId = this.getAttribute('data-task');
            document.getElementById(taskId).classList.add('active-task');
        });
    });
    
    
    document.getElementById('chainSelector').addEventListener('change', function() {
        if (document.body.classList.contains('explorer-mode')) {
            populateDapps(this.value);
        }
    });
    
    
    
    populateDapps('ethereum');
    populateDailyTasks();
});

const dapps = {
    ethereum: {
        dex: [
            { name: "Unissap",              logo: "dex/uniswap.jpg",            description: "Leading AMM protocol",            url: "https://app.uniswap.org" },
            { name: "SushiSwap",            logo: "dex/sushiswap.jpg",          description: "Multi-chain DEX",                 url: "https://app.sushi.com" },
            { name: "Curve",                logo: "dex/curve.jpg",              description: "Stablecoin-focused DEX",          url: "https://curve.fi" },
            { name: "Balancer",             logo: "dex/balancer.png",           description: "Programmable liquidity",          url: "https://app.balancer.fi" }
        ],
        lending: [
            { name: "Aave",                 logo: "dex/aave.png",               description: "Liquidity protocol",              url: "https://app.aave.com" },
            { name: "Compound",             logo: "dex/compound.png",           description: "Algorithmic lending",             url: "https://app.compound.finance" },
            { name: "MakerDAO",             logo: "dex/makerdao.jpg",           description: "DAI stablecoin creator",          url: "https://oasis.app" }
        ],
        nft: [
            { name: "OpenSea",              logo: "dex/opensea.jpg",            description: "Largest NFT marketplace",         url: "https://opensea.io" },
            { name: "Rarible",              logo: "dex/rarible.jpg",            description: "Creator-focused marketplace",     url: "https://rarible.com" },
            { name: "Foundation",           logo: "dex/foundation.jpg",         description: "Curated NFT platform",            url: "https://foundation.app" },
            { name: "LooksRare",            logo: "dex/looksrare.jpg",          description: "Community-first marketplace",     url: "https://looksrare.org" }
        ],
        bridge: [
            { name: "Jumper",               logo: "dex/jumper.jpg",             description: "Multi-Chain Bridge Agg",          url: "https://jumper.exchange/"}
        ]
    },
    bsc: {
        dex: [
            { name: "PancakeSwap",          logo: "dex/pancake.jpg",            description: "Leading BSC DEX",                 url: "https://pancakeswap.finance" },
            { name: "MDEX",                 logo: "dex/mdex.png",               description: "Multi-chain DEX",                 url: "https://mdex.com" },
            { name: "BakerySwap",           logo: "dex/bakeryswap.jpg",         description: "NFT and DEX platform",            url: "https://www.bakeryswap.org" }
        ],
        lending: [
            { name: "Venus",                logo: "dex/venus.png",              description: "Algorithmic money market",        url: "https://app.venus.io" },
            { name: "Alpaca Finance",       logo: "dex/alpaca.png",             description: "Leveraged yield farming",         url: "https://app.alpacafinance.org" }
        ],
        nft: [
            { name: "BinanceNFT",           logo: "dex/binance.jpg",            description: "Official Binance marketplace",    url: "https://www.binance.com/en/nft/home" }
        ]
    },
    polygon: {
        dex: [
            { name: "QuickSwap",            logo: "dex/quickswap.jpg",          description: "Layer 2 DEX",                     url: "https://quickswap.exchange" },
            { name: "SushiSwap",            logo: "dex/sushiswap.jpg",          description: "Multi-chain DEX",                 url: "https://app.sushi.com/swap?chainId=137" },
            { name: "Dfyn",                 logo: "dex/dfyn.jpg",               description: "Multi-chain router protocol",     url: "https://exchange.dfyn.network" }
        ],
        lending: [
            { name: "Aave",                 logo: "dex/aave.png",               description: "Liquidity protocol",              url: "https://app.aave.com/?marketName=proto_polygon" },
            { name: "Mai Finance",          logo: "dex/maifinance.jpg",         description: "Collateralized stablecoin",       url: "https://app.mai.finance" }
        ],
        nft: [
            { name: "OpenSea",              logo: "dex/opensea.jpg",            description: "Largest NFT marketplace",         url: "https://opensea.io/blockchain/polygon" },
            { name: "Rarible",              logo: "dex/rarible.jpg",            description: "Creator-focused marketplace",     url: "https://rarible.com/polygon" }
        ]
    },
    solana: {
        dex: [
            { name: "Raydium",              logo: "dex/raydium.jpg",            description: "AMM and yield protocol",          url: "https://raydium.io/swap" },
            { name: "Orca",                 logo: "dex/orca.png",               description: "User-friendly DEX",               url: "https://www.orca.so" }
        ],
        lending: [
            { name: "Save Finance",         logo: "dex/savefinance.jpg",        description: "Algorithmic lending",             url: "https://save.finance/" }
        ],
        nft: [
            { name: "Magic Eden",           logo: "dex/magiceden.jpg",          description: "Leading Solana marketplace",      url: "https://magiceden.io" },
            { name: "Solanart",             logo: "dex/solanart.jpg",           description: "First Solana NFT marketplace",    url: "https://solanart.io" },
            { name: "Metaplex",             logo: "dex/metaplex.jpg",           description: "NFT storefront protocol",         url: "https://www.metaplex.com" }
        ]
    },
    avalanche: {
        dex: [
            { name: "LFJ",                  logo: "dex/lfj.jpg",                description: "Leading Avalanche DEX",           url: "https://lfj.gg/" },
            { name: "Pangolin",             logo: "dex/pangolin.jpg",           description: "Community-driven DEX",            url: "https://app.pangolin.exchange" }
        ],
        lending: [
            { name: "Benqi",                logo: "dex/benqi.jpg",              description: "Algorithmic liquidity market",    url: "https://app.benqi.fi" },
            { name: "Aave",                 logo: "dex/aave.png",               description: "Liquidity protocol",              url: "https://app.aave.com/?marketName=proto_avalanche" }
        ],
        nft: [
            { name: "Salvor",               logo: "dex/salvor.jpg",             description: "NFT Marketplace",                 url: "https://salvor.io/"}
        ]
    },
    manta: {
        dex: [
            { name: "GullSwap",             logo: "dex/gullswap.jpg",           description: "Leading Manta DEX",               url: "https://app.gullnetwork.com/swap" },
            { name: "Izumi",                logo: "dex/izumi.jpg",              description: "Community-driven DEX",            url: "https://izumi.finance/trade/swap" },
            { name: "Oku Trade",            logo: "dex/okutrade.jpg",           description: "Community-driven DEX",            url: "https://oku.trade/?inputChain=manta" },
            { name: "Pixelswap",            logo: "dex/pixelswap.jpg",          description: "Community-driven DEX",            url: "https://app.pixelswap.xyz/#/swap" },
            { name: "DoDoEx",               logo: "dex/dodo.jpg",               description: "Community-driven DEX",            url: "https://app.dodoex.io/" },
            { name: "DapDap",               logo: "dex/dapdap.jpg",             description: "Community-driven DEX",            url: "https://app.dapdap.net/super-swap" },
            { name: "Aperture",             logo: "dex/aperture.jpg",           description: "Community-driven DEX",            url: "https://app.aperture.finance/" },
            { name: "Cetoswap",             logo: "dex/cetoswap.jpg",           description: "Community-driven DEX",            url: "https://cetoswap.com/#/" },
            { name: "Impossible Finance",   logo: "dex/impossiblefi.jpg",       description: "Community-driven DEX",            url: "https://impossible.finance/" },
            { name: "Firefly Dex",          logo: "dex/firefly.jpg",            description: "Community-driven DEX",            url: "https://fireflydex.io/#/swap" }            
        ],
        lending: [
            { name: "Shoebill",             logo: "dex/shoebill.png",           description: "Liquidity market",                url: "https://manta-manta.shoebill.finance/#/" },
            { name: "Layerbank",            logo: "dex/layerbank.jpg",          description: "Liquidity protocol",              url: "https://app.layerbank.finance/manta-pacific/bank" },
            { name: "Zerolend",             logo: "dex/zerolend.jpg",           description: "Liquidity protocol",              url: "https://app.zerolend.xyz/markets/?marketName=proto_manta_v3" },
            { name: "Omni",                 logo: "dex/omni.png",               description: "Liquidity protocol",              url: "https://omni.ls/" },
            { name: "Accumulated Finance",  logo: "dex/accumulatedfi.jpg",      description: "Liquidity protocol",              url: "https://accumulated.finance/stake/manta" },
            { name: "MonRoe",               logo: "dex/monroe.png",             description: "Lending",                         url: "https://app.monroeprotocol.com/vaults" }
        ],
        nft: [
            { name: "Element",          logo: "dex/element.jpg",            description: "Multi-chain NFT platform",        url: "https://element.market/manta-pacific" },
        ],
        bridge: [
            { name: "Rubic",            logo: "dex/rubic.jpg",              description: "Bridge",                          url: "https://app.rubic.exchange/" },
            { name: "Layerswap",        logo: "dex/layerswap.jpg",          description: "Bridge",                          url: "https://layerswap.io/" },
            { name: "Magpie",           logo: "dex/magpie.jpg",             description: "Bridge and Dex",                  url: "https://app.magpiefi.xyz/swap" },
            { name: "Symbiosis",        logo: "dex/symbiosis.jpg",          description: "Bridge and Dex",                  url: "https://app.symbiosis.finance/swap" }
        ]
    },
    ink: {
        dex: [
            { name: "Velodrome",        logo: "dex/velodrome.jpg",          description: "Leading Inkchain DEX",            url: "https://velodrome.finance/" },
            { name: "Reservoir",        logo: "dex/reservoir.png",          description: "Community-driven DEX",            url: "https://swap.reservoir.tools/swap#/swap" }
        ],
        lending: [
            { name: "Ionic",            logo: "dex/ionic.jpg",              description: "Algorithmic liquidity market",    url: "https://app.ionic.money/market?chain=57073" }
        ],
        nft: [
            { name: "Element",          logo: "dex/element.jpg",            description: "Multi-chain NFT platform",        url: "https://element.market" },
        ],
        bridge: [
            { name: "Superbridge",      logo: "dex/superbridge.jpg",        description: "Cross-Chain Bridge",              url: "https://www.brid.gg/ink?amount=&originChainId=1&token=ETH"},
            { name: "Relay",            logo: "dex/relay.jpg",              description: "Cross-Chain Bridge",              url: "https://relay.link/bridge/ink?includeChainIds=57073"}
        ]
    },
    superseed: {
        dex: [
            { name: "Bebop",            logo: "dex/bebop.jpg",              description: "Leading Superseed DEX",           url: "https://bebop.xyz/trade?network=superseed&buy" },
            { name: "SeedFi",           logo: "dex/seedfi.jpg",             description: "Community-driven DEX",            url: "https://seedfi.trade" },
            { name: "Velodrome",        logo: "dex/velodrome.jpg",          description: "Leading Superseed DEX",           url: "https://velodrome.finance/" },
            { name: "Bulletx",          logo: "dex/bulletx.jpg",            description: "Dex",                             url: "https://bulletx.io/swap"},
            { name: "ThirdWeb",         logo: "dex/thirdweb.jpg",           description:"Deploy contract",                  url: "https://thirdweb.com/explore"}
        ],
        lending: [
            { name: "Ionic",            logo: "dex/ionic.jpg",              description: "Algorithmic liquidity market",    url: "https://app.ionic.money/market" }
        ],
        nft: [
            { name: "Fractal Visions",  logo: "dex/fractolvision.jpg",      description: "Multi-chain NFT platform",        url: "https://www.fractalvisions.io/" },
            { name: "Mintpad",          logo: "dex/mintpad.jpg",            description: "Mint NFT",                        url: "https://mintpad.co/create/edition/"}
        ],
        bridge: [
            { name: "Official Bridge",  logo: "dex/superseed.jpg",          description: "Official Bridge",                 url: "https://bridge.superseed.xyz/"},
            { name: "Relay",            logo: "dex/relay.jpg",              description: "Cross-Chain Bridge",              url: "https://relay.link/bridge"},
            { name: "Layerswap",        logo: "dex/layerswap.jpg",          description: "Cross-Chain Bridge",              url: "https://layerswap.io/app"}
        ]
    },
    swell: {
        dex: [
            { name: "Ambient",          logo: "dex/ambient.jpg",            description: "Leading Swell DEX",               url: "https://ambient.finance/trade" },
            { name: "Bubbly",           logo: "dex/bubbly.jpg",             description: "Community-driven DEX",            url: "https://app.bubbly.finance/" },
            { name: "Nep Finance",      logo: "dex/neptunefi.jpg",          description: "Community-driven DEX",            url: "https://app.nep.finance/swap" }
        ],
        lending: [
            { name: "Euler",            logo: "dex/euler.png",              description: "Algorithmic liquidity market",    url: "https://app.euler.finance/?chainId=1" },
            { name: "Ion Protocol",     logo: "dex/ion.jpg",                description: "Liquidity Protocol",              url: "https://www.app.ionprotocol.io/"}
        ],
        nft: [
            { name: "Element",          logo: "dex/element.jpg",            description: "Multi-chain NFT platform",        url: "https://element.market" },
        ],
        bridge: [
            { name: "Superbridge",      logo: "dex/superbridge.jpg",        description: "Cross-Chain Bridge",              url: "https://superbridge.swellnetwork.io/"},
            { name: "Gas Zip",          logo: "dex/gaszip.jpg",             description: "Cross-Chain Refuel",              url: "https://gas.zip/"}
        ]
    },
    cyber: {
        dex: [
            { name: "Owlto",            logo: "dex/owlto.jpg",              description: "Leading Cyber DEX",               url: "https://owlto.finance/swap" },
            { name: "Izumi",            logo: "dex/izumi.jpg",              description: "Community-driven DEX",            url: "https://izumi.finance/trade/swap" }
        ],
        lending: [
            { name: "Euler",            logo: "dex/euler.png",              description: "Algorithmic liquidity market",    url: "https://app.euler.finance/?chainId=1" }
        ],
        nft: [
            { name: "Element",          logo: "dex/element.jpg",            description: "Multi-chain NFT platform",        url: "https://element.market/cyber" },
        ],
        bridge: [
            { name: "Official",         logo: "dex/cyber.jpg",              description: "Official Bridge",                 url: "https://cyber.co/bridge"},
            { name: "Relay",            logo: "dex/relay.jpg",              description: "Cross-Chain Bridge",              url: "https://relay.link/bridge/"}
        ]
    },
    bob: {
        dex: [
            { name: "Oku Trade",        logo: "dex/okutrade.jpg",           description: "Leading BOB DEX",                 url: "https://oku.trade/" },
            { name: "Izumi",            logo: "dex/izumi.jpg",              description: "Community-driven DEX",            url: "https://izumi.finance/trade/swap" }
        ],
        lending: [
            { name: "Ionic",            logo: "dex/ionic.jpg",              description: "Algorithmic liquidity market",    url: "https://app.ionic.money/" },
            { name: "Layerbank",        logo: "dex/layerbank.jpg",          description: "Liquidity protocol",              url: "hhttps://layerbank.finance/bank" }
        ],
        nft: [
            { name: "Element",          logo: "dex/element.jpg",            description: "Multi-chain NFT platform",        url: "https://element.market/bob" }
        ],
        bridge: [
            { name: "Official",         logo: "dex/bob.jpg",                description: "Official Bridge",                 url: "https://app.gobob.xyz/en/bridge"},
            { name: "Relay",            logo: "dex/relay.jpg",              description: "Cross-Chain Bridge",              url: "https://relay.link/"}
        ]
    },
    frax: {
        dex: [
            { name: "Balancer",         logo: "dex/balancer.png",           description: "Leading Frax DEX",                url: "https://balancer.fi/" },
            { name: "Curve Finance",    logo: "dex/curve.jpg",              description: "Community-driven DEX",            url: "https://curve.fi/" },
            { name: "Ra Exchange",      logo: "dex/raex.jpg",               description: "Leading Dex",                     url: "https://www.ra.exchange/"},
            { name: "Wombat Exchange",  logo: "dex/wombatex.jpg",           description: "Community Dex",                   url: "https://www.wombat.exchange/"}
        ],
        lending: [
            { name: "Ionic",            logo: "dex/ionic.jpg",              description: "Algorithmic liquidity market",    url: "https://app.ionic.money/" },
            { name: "Gravity Protocol", logo: "dex/gravitaprotocol.jpg",    description: "Liquidity protocol",              url: "https://app.gravitaprotocol.com/" }
        ],
        nft: [
            { name: "Nfts2Me",          logo: "dex/nfts2me.png",            description: "multichain user-friendly",        url: "https://nfts2me.com/" }
        ],
        bridge: [
            { name: "Official",         logo: "dex/frax.jpg",               description: "Official Bridge",                 url: "https://mainnet.frax.com/tools/bridge/deposit"},
            { name: "Gas Zip",          logo: "dex/gaszip.jpg",             description: "Cross-Chain Bridge",              url: "https://www.gas.zip/"}
        ]
    },
    worldchain: {
        dex: [
            { name: "Uniswap",          logo: "dex/uniswap.jpg",        description: "Leading Worldchain DEX",      url: "https://app.uniswap.org/" }
        ],
        lending: [
            { name: "Ionic",            logo: "dex/ionic.jpg",          description: "Algorithmic liquidity market",url: "https://app.ionic.money/" }
        ],
        nft: [
            { name: "Nfts2Me",          logo: "dex/nfts2me.png",        description: "multichain user-friendly",    url: "https://nfts2me.com/" }

        ],
        bridge: [
            { name: "SuperBridge",      logo: "dex/superbridge.jpg",    description: "Cross-Chainn Bridge",         url: "https://superbridge.app/"},
            { name: "Across",           logo: "dex/across.jpg",         description: "Cross-Chain Bridge",          url: "https://app.across.to/bridge"}
        ]
    },
    unichain: {
        dex: [
            { name: "Uniswap",          logo: "dex/uniswap.jpg",        description: "Leading Worldchain DEX",      url: "https://app.uniswap.org/" },
            { name: "Jumper",           logo: "dex/jumper.jpg",         description: "Cross-Chain Swap and Bridge", url: "https://jumper.exchange/"},
            { name: "OpenOcean",        logo: "dex/openocean.jpg",      description: "DEX aggregator",              url: "https://app.openocean.finance/swap/uni/ETH/USDC"}
        ],
        lending: [
            { name: "Venus",            logo: "dex/venus.png",          description: "liquidity market",            url: "https://app.venus.io/" },
            { name: "Compound Finance", logo: "dex/compound.png",       description: "Lending",                     url: "https://app.compound.finance/?market=usdc-unichain"}
        ],
        nft: [
            { name: "Opensea",          logo: "dex/opensea.jpg",        description: "multichain user-friendly",    url: "https://opensea.io/discover/chain/unichain" }

        ],
        bridge: [
            { name: "Official Bridge",  logo: "dex/unichain.jpg",       description: "Official Bridge",         url: "https://app.uniswap.org/swap"},
            { name: "SuperBridge",      logo: "dex/superbridge.jpg",    description: "Cross-Chainn Bridge",     url: "https://superbridge.app/unichain"},
            { name: "Relay",            logo: "dex/relay.jpg",          description: "Cross-Chain Bridge",      url: "https://relay.link/bridge/unichain"},
            { name: "Mach Exchange",    logo: "dex/machex.jpg",         description: "Cross-Chain Bridge",      url: "https://app.mach.exchange/"},
            { name: "Synapse Protocol", logo: "dex/synapse.jpg",        description: "Cross-Chain Bridge",      url: "https://synapseprotocol.com/?toChainId=130"},
            { name: "Bungee Exchange",  logo: "dex/bungee.jpg",         description: "Liquidity Marketplace",   url: "https://www.bungee.exchange/"},
            { name: "Symbiosis",        logo: "dex/symbiosis.jpg",      description: "Cross-Chain Bridge",      url: "https://app.symbiosis.finance/"}
        ]
    },
    monad: {
        dex: [
            { name: "Owlto",            logo: "dex/owlto.jpg",      description: "Deploy Contract",                 url: "https://owlto.finance/deploy/?chain=MonadTestnet" },
            { name: "Izumi",            logo: "dex/izumi.jpg",      description: "Community-driven DEX",            url: "https://alpha.izumi.finance/trade/swap" },
            { name: "Nitro Finance",    logo: "dex/nitrofi.jpg",    description: "Leading Monad DEX",               url: "https://testapp.nitrofinance.xyz/trade" },
            { name: "Bebop",            logo: "dex/bebop.jpg",      description: "Leading Monaad DEX",              url: "https://bebop.xyz/trade?network=monad" },
            { name: "Hashflow",         logo: "dex/hashflow.png",   description: "Leading Inkchain DEX",            url: "https://app.hashflow.com/?b=10143-USDC&q=10143-USDT" },
            { name: "Castora",          logo: "dex/castora.jpg",    description: "Dex",                             url: "https://castora.xyz/pools" },
            { name: "Clober",           logo: "dex/clober.jpg",     description: "Dex",                             url: "https://alpha.clober.io/trade?chain=10143" },
            { name: "Crystal",          logo: "dex/crystal.jpg",    description: "Dex",                             url: "https://app.crystal.exchange/swap" },
            { name: "Fukunad",          logo: "dex/fukunad.jpg",    description: "Raffle",                          url: "https://testnet.fukunad.xyz/raffle" },
            { name: "Nextmate",         logo: "dex/nextmateai.jpg", description: "Voting",                          url: "https://nextmate.ai/predictionMarket?chainType=monad_testnet" },
            { name: "PancakeSwap",      logo: "dex/pancake.jpg",    description: "Dex",                             url: "https://pancakeswap.finance/swap" },
            { name: "PlayGround",       logo: "dex/easynodexyz.jpg",description: "Dex",                             url: "https://playground.easy-node.xyz/" },
            { name: "Ambient Finance",  logo: "dex/ambient.jpg",    description: "Dex",                             url: "https://monad.ambient.finance" },
            { name: "Monorail",         logo: "dex/monorail.png",   description: "Dex",                             url: "https://testnet-preview.monorail.xyz/" },
            { name: "Azar",             logo: "dex/azar.png",       description: "Dex",                             url: "https://app-monad-testnet.azaar.com/swap" },
            { name: "Curvance",         logo: "dex/curvance.png",   description: "Dex",                             url: "https://monad.curvance.com/" },
            { name: "Covenant Finance", logo: "dex/convenant.jpg",  description: "Dex",                             url: "https://fluidtest.covenant.finance/market/4?action=buy" },
            { name: "Narwhal Finance",  logo: "dex/narwhal.jpg",    description: "Dex",                             url: "https://testnet.narwhal.finance/?token=USDT" },
            { name: "Zaros",            logo: "dex/zaros.jpg",      description: "Dex",                             url: "https://testnet.app.zaros.fi/" },
            { name: "Pandara",          logo: "dex/lfj.jpg",        description: "Dex",                             url: "https://pandaria.lfj.gg/monad-testnet/swap" },
            { name: "Nabla Finance",    logo: "dex/nabla.jpg",      description: "Dex",                             url: "https://app.nabla.fi/swap" },
            { name: "Bean Exchange",    logo: "dex/bean.jpg",       description: "Dex",                             url: "https://swap.bean.exchange/swap" },
            { name: "AiCraft Fun",      logo: "dex/aicraft.jpg",    description: "Voting",                          url: "https://aicraft.fun/projects/fizen?ref=97CZF5JCG1" },
            { name: "Dirol Network",    logo: "dex/dirol.jpg",      description: "Dex",                             url: "https://dex.dirol.network/swap" },
            { name: "Octo Exchange",    logo: "dex/octo.jpg",       description: "Dex",                             url: "https://octo.exchange/swap" },
            { name: "Madness Finance",  logo: "dex/madnessfi.png",  description: "Dex",                             url: "https://madness.finance/swap" },
            { name: "Rubic Exchange",   logo: "dex/rubic.jpg",      description: "Dex",                             url: "https://testnet.rubic.exchange/" },
            { name: "Bubble Finance",   logo: "dex/bubblefi.jpg",   description: "Dex",                             url: "https://app.bubblefi.xyz/" },
            { name: "Kuru Trade",       logo: "dex/kuru.jpg",       description: "Dex",                             url: "https://www.kuru.io/trade/" },
            { name: "Dusted",           logo: "dex/dusted.jpg",     description: "Gaming",                          url: "https://www.dusted.app/rewards" },
            { name: "Atlantis Dex",     logo: "dex/atlantis.jpg",   description: "Dex",                             url: "https://app.atlantisdex.xyz/swap/v4/" },
            { name: "ApeBond",          logo: "dex/apebond.jpg",    description: "Dex",                             url: "https://www.ape.bond/bonds" },
            { name: "Encifher",         logo:"dex/encifher.jpg",    description: "Dex",                             url: "https://monad.encifher.io/"},
            { name: "Woofi",            logo: "dex/woofi.jpg",      description: "Perp Dex",                        url: "https://testnet-pro.woofi.com/en/trade/ETH_PERP"},
            { name: "Majhong",          logo: "dex/majhong.jpg",    description: "Gaming",                          url: "https://monad.mahjong123.io/"},
            { name: "KiloEx",           logo: "dex/kiloex.jpg",     description: "Perp Dex",                        url: "https://app.kiloex.io/trade?sCode=default&utm_source=referral&utm_medium=default"},
            { name: "Tadle-odds",       logo: "dex/tadle.png",      description: "Betting",                         url: "https://tadle-odds.netlify.app/markets"},
            { name: "Mace",             logo: "dex/mace.jpg",       description: "Dex",                             url: "https://testnet.swaps.mace.ag/#"},
            { name: "Taya",             logo: "dex/taya.jpg",       description: "Dex",                             url: "https://app.taya.fi/swap"},
            { name: "TheVapeLabs",      logo: "dex/thevapelabs.jpg",description: "Connnect TG and complete social", url: "https://app.thevapelabs.io/app"},
            { name: "Odyssey Gateway",  logo: "dex/gateway.png",    description: "Depo mon and play games",         url: "https://odyssey.gateway.tech/dashboard"},
            { name: "Monda",            logo: "dex/monda.jpg",      description: "Dex",                             url: "https://app.monda.fund/swap"},
            { name: "Zona",             logo: "dex/zona.png",       description: "Betting",                         url: "https://app.zona.finance/trade"},
            { name: "Dyson Finance",    logo: "dex/dyson.png",      description: "Dex",                             url: "https://alpha.dyson.finance/dex"},
            { name: "Hakifi",           logo: "dex/hakifi.png",     description: "Dex" ,                            url: "https://hakifi.xyz/"}
        ],
        lending: [
            { name: "Kinza",            logo: "dex/kinza.jpg",                      description: "Liquidity market",                url: "https://monad-test.kinza.finance/#/details/MON" },
            { name: "Apr",              logo: "dex/apr.jpg",                        description: "Staking",                         url: "https://stake.apr.io/" },
            { name: "Kintsu",           logo: "dex/kintsu.png",                     description: "Staking",                         url: "https://kintsu.xyz/staking" },
            { name: "Shmonad",          logo: "dex/monad.jpg",                      description: "Staking",                         url: "https://shmonad.xyz/" },
            { name: "Nostra Finance",   logo: "dex/nostra.jpg",                     description: "Staking",                         url: "https://monad.nostra.finance/lend-borrow" },
            { name: "Timeswap",         logo: "dex/timeswap.jpg",                   description: "Staking",                         url: "https://app.timeswap.io/markets" },
            { name: "Magma Staking",    logo: "dex/magma.jpg",                      description: "Staking",                         url: "https://www.magmastaking.xyz/" },
            { name: "Summer Money",     logo: "dex/summermoney.jpg",                description: "Lending",                         url: "https://app.sumer.money/?chain=10143"},
            { name: "Talentum",         logo: "dex/talentum.jpg",                   description: "Staking",                         url: "https://monad.talentum.id/projects?page=1"}
        ],
        nft: [
            { name: "Element",              logo: "dex/element.jpg",            description: "Multi-chain NFT platform",    url: "https://element.market/cyber" },
            { name: "Nezro",                logo: "dex/nezro.jpg",              description: "Mint Nft",                    url: "https://nerzo.xyz/senera" },
            { name: "Magic Eden",           logo: "dex/magiceden.jpg",          description: "Mint Nft",                    url: "https://magiceden.io/mint-terminal/monad-testnet" },
            { name: "Nfts2me",              logo: "dex/nfts2me.png",            description: "Mint NFT",                    url: "https://bright-cintos-gaming.testnet.nfts2.me/"},
            { name: "Poply",                logo: "dex/poply.jpg",              description: "Mint NFT",                    url: "https://poply.xyz/launchpad/0xd97bce4518b886a36e345764333d77b5faf6fe2c"},
            { name: "Monadverse",           logo: "dex/monadverse.jpg",         description: "Mint NFT",                    url: "https://monadverse.land/mint"},
            { name: "Morkie",               logo: "dex/morkie.jpg",             description: "Complete social and Mint",    url: "https://morkie.xyz/monarch"},
            { name: "Impossible Finance",   logo: "dex/impossiblefi.jpg",       description: "Complete social and Mint",    url: "https://app.impossible.finance/launchpad/project/160?ref=blog.impossible.finance"},
            { name: "Free Mint",            logo: "dex/freem.jpg",              description: "Mint NFT",                    url: "https://testnet.freee.xyz/collect/monadt:0xAb0bA06c13eC49c0842ef4716CeB1593f2C41779/token/5"}
        ]
    },
    risechain: {
        dex: [
            { name: "For the kingdom",      logo: "dex/forthekingdom.png",               description: "Gaming",                      url: "https://forthekingdom.xyz/" },
            { name: "Gas Pump",             logo: "dex/gaspump.jpg",                     description: "Native DEX",                  url: "https://gaspump.network/swap"},
            { name: "B3X",                  logo: "dex/b3x.png",                         description: "DEX",                         url: "https://testnet.b3x.ai/#/trade"},
            { name: "Inari Finance",        logo: "dex/inarifi.jpg",                     description: "Dex",                         url: "https://www.inarifi.com/"},
            { name: "GTX",                  logo: "dex/gtx.jpg",                         description: "Dex",                         url: "https://gtxdex.xyz/waitlist"},
            { name: "Ultra",                logo: "dex/ultra.jpg",                       description: "Dex",                         url: "https://ultra-fi.xyz/"},
            { name: "Clober",               logo: "dex/clober.jpg",                      description: "Dex",                         url: "https://rise.clober.io/"},
            { name: "Standard",             logo: "dex/standardweb3.png",                description: "Dex",                         url: "https://app.standardweb3.com/"},
            { name: "LeoFi",                logo: "dex/leofi.jpg",                       description: "Dex",                         url: "https://etn.leofi.xyz/"},
            { name: "Chess_Onchain",        logo: "dex/chessoc.jpg",                     description: "Play chess",                  url: "https://play.chessonchain.io/"},
            { name: "Haifu",                logo: "dex/haifu.png",                       description: "AI",                          url: "https://haifu.fun/"},

        ],
        lending: [
            { name: "Coming Soon",          logo: "CS",                     description: "Coming Soon",                 url: ""}
        ],
        nft: [
            { name: "Nfts2me",              logo: "dex/nfts2me.png",        description: "create and mint nft's",       url: "https://nfts2me.com/app/rise-testnet/" },
            { name: "Relic",                logo: "dex/monad.jpg",                      description: "Nfts Marketplace",            url: "https://www.therelic.art/"}

        ],
        bridge: [
            { name: "Gas zip",              logo: "dex/gaszip.jpg",         description: "Faucet and bridge",           url: "https://www.gas.zip/faucet/rise"}
        ]
    }
};



function populateDailyTasks() {
    const dailyTasks = {
        checkins: [
            { name: "Layer3",               logo: "tasks/layer3.jpg",       description: "Daily quests",                url: "https://app.layer3.xyz/quests" },
            { name: "Lootex",               logo: "tasks/lootex.jpg",       description: "Complete tasks",              url: "https://lootex.io/invite/LM7C7N" },
            { name: "Succinct",             logo: "tasks/succinct.jpg",     description: "Generate proofs, earn stars", url: "https://testnet.succinct.xyz/dashboard"},
            { name: "Superboard",           logo: "tasks/superboard.jpg",   description: "Quests and Fun",              url: "https://superboard.xyz/quests"},
            { name: "Alva",                 logo: "tasks/alva.jpg",         description: "AI and Fun",                  url: "https://alva.xyz/Referral/?r=Y5JE78"},
            { name: "Owlto Finance",        logo: "tasks/owlto.jpg",        description: "Daily Check-in",              url: "https://owlto.finance/?ref=0xe88d2D7e13a71eA68A438b9FEdD6363bE48A0373"},
            { name: "Orbiter Finance",      logo: "tasks/orbiter.jpg",      description: "Daily Check-in",              url: "https://orbiter.finance/?channel=0xe88d2d7e13a71ea68a438b9fedd6363be48a0373"},
            { name: "Magic Netwon",         logo: "tasks/magicnewton.jpg",  description: "Daily Roll Dice",             url: "https://magicnewton.com/portal?referral=xe1v65se5r2ebf17"},
            { name: "Vendetta",             logo: "tasks/vendetta.jpg",     description: "Daily Check-In",              url: "http://vendettagame.xyz/quest?refercode=BQIdhqJrf2NA"},
            { name: "OnchainGM",            logo: "tasks/onchaingm.jpg",    description: "Daily GM",                    url: "https://onchaingm.com/"},
            { name: "TheVapeLabs",          logo: "tasks/thevapelabs.jpg",  description: "Daily Check-In",              url: "https://app.thevapelabs.io/app"},
            { name: "0G Puzzle Mania",      logo: "tasks/Oglabs.jpg",       description: "Daily Check-In",              url: "https://puzzlemania.0g.ai/?referral=eDKjVDKysyB5"}
        ],
        swaps: [
            { name: "Mach Exchange",        logo: "tasks/machex.jpg",       description: "Ref Code: HBWDK",             url: "https://app.mach.exchange/" },
            { name: "Concerno",             logo: "tasks/concerno.jpg",     description: "Daily trade",                 url: "https://app.concero.io/rewards" },
            { name: "Infinex",              logo: "tasks/infinex.jpg",      description: "Daily swap",                  url: "https://app.infinex.xyz/earn"}
        ],
        quests: [
            { name: "Linera Galxe",         logo: "tasks/linera.jpg",       description: "Complete quests",             url: "https://app.galxe.com/quest/Linera/GCbMUtpawv" },
            { name: "Dmail",                logo: "tasks/dmail.jpg",        description: "Daily Mail",                  url: "https://mail.dmail.ai/login?icode=118666"}
        ],
        faucets: [
            { name: "Faucet Trade",     logo: "tasks/faucet_trade.jpg",     description: "Holesky ETH",     url: "https://faucet.trade/holesky-eth-faucet"},
            { name: "Automata",         logo: "tasks/automata.png",         description: "Holesky ETH",     url: "https://www.holeskyfaucet.io/"},
            { name: "Stakely",          logo: "tasks/stakely.jpg",          description: "Holesky ETH",     url: "https://stakely.io/faucet/ethereum-holesky-testnet-eth"},
            { name: "FaucetIno",        logo: "tasks/01node.jpg",           description: "Holesky ETH",     url: "https://faucetino.01node.com/holesky"},
            { name: "Quicknode",        logo: "tasks/quicknode.jpg",        description: "Holesky ETH",     url: "https://faucet.quicknode.com/ethereum/holesky"},
            { name: "Learnweb3",        logo: "tasks/learnweb3.jpg",        description: "Holesky ETH",     url: "https://learnweb3.io/faucets/holesky/"},
            { name: "Faucet Bot",       logo: "tasks/eth.jpg",              description: "Holesky ETH",     url: "https://t.me/faucet_trade_bot"},
            { name: "Chainlink",        logo: "tasks/chainlink.jpg",        description: "Holesky ETH",     url: "https://faucets.chain.link/"},
            { name: "BwareLabs",        logo: "tasks/bwarelabs.png",        description: "Holesky ETH",     url: "https://bwarelabs.com/faucets/ethereum-holesky"},
            { name: "Blast",            logo: "tasks/blast.jpg",            description: "Holesky ETH",     url: "https://blastapi.io/faucets/ethereum-holesky"},
            { name: "Alchemy",          logo: "tasks/alchemy/jpg",          description: "Holesky ETH",     url: "https://www.alchemy.com/faucets/ethereum-holesky"},
            { name: "FaucetMe",         logo: "tasks/faucetme.jpg",         description: "Holesky ETH",     url: "https://holesky.faucetme.pro/"},
            { name: "Ethereum Eco",     logo: "tasks/etheco.jpg",           description: "Holesky ETH",     url: "https://www.ethereum-ecosystem.com/faucets/ethereum-holesky"},
            { name: "Thirdweb",         logo: "tasks/thirdweb.jpg",         description: "Holesky ETH",     url: "https://thirdweb.com/holesky"},
            { name: "Google Cloud",     logo: "tasks/googlecloud.jpg",      description: "Holesky ETH",     url: "https://cloud.google.com/application/web3/faucet/ethereum/holesky"},
            { name: "Tatum",            logo: "tasks/tatum.jpg",            description: "Holesky ETH",     url: "https://tatum.io/faucets/holesky"},
            { name: "PowFaucet",        logo: "tasks/eth.jpg",              description: "Holesky ETH",     url: "https://holesky-faucet.pk910.de/"},
            { name: "ChainLink",        logo: "tasks/chainlink.jpg",        description: "Base Sepolia",    url: "https://faucets.chain.link/base-sepolia"},
            { name: "Quicknode",        logo: "tasks/quicknode.jpg",        description: "Base Sepolia",    url: "https://faucet.quicknode.com/base/sepolia"},
            { name: "Stakely",          logo: "tasks/stakely.jpg",          description: "Base Sepolia",    url: "https://stakely.io/faucet/base-eth"},
            { name: "Learweb3",         logo: "tasks/learnweb3.jpg",        description: "Base Sepolia",    url: "https://learnweb3.io/faucets/base_sepolia/"},
            { name: "Automata",         logo: "tasks/automata.png",         description: "Base Sepolia",    url: "https://www.l2faucet.com/base"},
            { name: "Triangle",         logo: "tasks/eth.jpg",              description: "Base Sepolia",    url: "https://faucet.triangleplatform.com/base/sepolia"},
            { name: "Alchemy",          logo: "tasks/alchemy.jpg",          description: "Base Sepolia",    url: "https://www.alchemy.com/faucets/base-sepolia"},
            { name: "Superchain",       logo: "tasks/superchain.jpg",       description: "Base Sepolia",    url: "https://console.optimism.io/faucet"},
            { name: "Ethereum Eco",     logo: "tasks/etheco.jpg",           description: "Base Sepolia",    url: "https://www.ethereum-ecosystem.com/faucets/base-sepolia"},
            { name: "Get Block",        logo: "tasks/getblock.jpg",         description: "Base Sepolia",    url: "https://getblock.io/faucet/base-sepolia/"},
            { name: "BitBond",          logo: "tasks/bitbond.png",          description: "Base Sepolia",    url: "https://tokentool.bitbond.com/faucet/base-sepolia"},
            { name: "ThirdWeb",         logo: "tasks/thirdweb.jpg",         description: "Base Sepolia",    url: "https://thirdweb.com/base-sepolia-testnet"},
            { name: "GasYard",          logo: "tasks/gasyard.jpg",          description: "Base Sepolia",    url: "https://t.me/gasyardbot"},
            { name: "Faucet Trade",     logo: "tasks/faucet_trade.jpg",     description: "Bsc Testnet",     url: "https://faucet.trade/"},
            { name: "Faucet Bot",       logo: "tasks/eth.jpg",              description: "Bsc Testnet",     url: "https://t.me/faucet_trade_bot"},
            { name: "BnbChain",         logo: "tasks/binance.jpg",          description: "Bsc Testnet",     url: "https://www.bnbchain.org/en/testnet-faucet"},
            { name: "ChainStack",       logo: "tasks/chainstack.png",       description: "Bsc Testnet",     url: "https://faucet.chainstack.com/bnb-testnet-faucet"},
            { name: "QuickNode",        logo: "tasks/quicknode.jpg",        description: "Bsc Testnet",     url: "https://faucet.quicknode.com/binance-smart-chain/bnb-testnet"},
            { name: "Automata",         logo: "tasks/automata.png",         description: "Arb Sepolia",     url: "https://www.l2faucet.com/arbitrum"},
            { name: "Quicknode",        logo: "tasks/quicknode.jpg",        description: "Arb Sepolia",     url: "https://faucet.quicknode.com/arbitrum/sepolia"},
            { name: "ChainLink",        logo: "tasks/chainlink.jpg",        description: "Arb Sepolia",     url: "https://faucets.chain.link/arbitrum-sepolia"},
            { name: "Alchemy",          logo: "tasks/alchemy.jpg",          description: "Arb Sepolia",     url: "https://www.alchemy.com/faucets/arbitrum-sepolia"},
            { name: "Get Block",        logo: "tasks/getblock.jpg",         description: "Arb Sepolia",     url: "https://getblock.io/faucet/arb-sepolia/"},
            { name: "Third Web",        logo: "tasks/thirdweb.jpg",         description: "Arb Sepolia",     url: "https://thirdweb.com/arbitrum-sepolia"},
            { name: "Finja Exchange",   logo: "tasks/eth.jpg",              description: "USDC",            url: "https://finja.exchange/usdc-faucet"},
            { name: "Circle",           logo: "tasks/circle.png",           description: "USDC",            url: "https://faucet.circle.com/"},
            { name: "Portal Defi",      logo: "tasks/eth.jpg",              description: "Eth Sepolia",     url: "https://faucet-testnet.portaldefi.com/"},
            { name: "Faucet Bot",       logo: "tasks/eth.jpg",              description: "Eth Sepolia",     url: "https://t.me/faucet_trade_bot"},
            { name: "Faucet Trade",     logo: "tasks/faucet_trade.jpg",     description: "Eth Sepolia",     url: "https://faucet.trade/sepolia-eth-faucet"},
            { name: "LearnWeb3",        logo: "tasks/learnweb3.jpg",        description: "Eth Sepolia",     url: "https://learnweb3.io/faucets/sepolia/"},
            { name: "Get Block",        logo: "tasks/getblock.jpg",         description: "Eth Sepolia",     url: "https://getblock.io/faucet/eth-sepolia/"},
            { name: "Superchain",       logo: "tasks/superchain.jpg",       description: "Eth Sepolia",     url: "https://console.optimism.io/faucet"},
            { name: "Ethereum Eco",     logo: "tasks/etheco.jpg",           description: "Eth Sepolia",     url: "https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia"},
            { name: "Alchemy",          logo: "tasks/alchemy.jpg",          description: "Eth Sepolia",     url: "https://www.alchemy.com/faucets/ethereum-sepolia"},
            { name: "ChainLink",        logo: "tasks/chainlink.jpg",        description: "Eth Sepolia",     url: "https://faucets.chain.link/"},
            { name: "QuickNode",        logo: "tasks/quicknode.jpg",        description: "Eth Sepolia",     url: "https://faucet.quicknode.com/ethereum/sepolia"},
            { name: "BitBond",          logo: "tasks/bitbond.png",          description: "Eth Sepolia",     url: "https://tokentool.bitbond.com/faucet/ethereum-sepolia"},
            { name: "ThirdWeb",         logo: "tasks/thirdweb.jpg",         description: "Eth Sepolia",     url: "https://thirdweb.com/sepolia"},
            { name: "Infura",           logo: "tasks/eth.jpg",              description: "Eth Sepolia",     url: "https://docs.metamask.io/developer-tools/faucet/"},
            { name: "Google Cloud",     logo: "tasks/googlecloud.jpg",      description: "Eth Sepolia",     url: "https://cloud.google.com/application/web3/faucet/ethereum/sepolia"},
            { name: "RockX",            logo: "tasks/rockx.jpg",            description: "Eth Sepolia",     url: "https://access.rockx.com/faucet-sepolia"},
            { name: "Tatum",            logo: "tasks/tatum.jpg",            description: "Eth Sepolia",     url: "https://tatum.io/faucets/sepolia"},
            { name: "PowFaucet",        logo: "tasks/eth.jpg",              description: "Eth Sepolia",     url: "https://sepolia-faucet.pk910.de/"},
            { name: "Coin Faucet",      logo: "tasks/btc.jpeg",             description: "Btc Testnet",     url: "https://coinfaucet.eu/en/btc-testnet/"},
            { name: "Crypto Pump",      logo: "tasks/btc.jpeg",             description: "Btc Testnet",     url: "https://cryptopump.info/send.php"},
            { name: "Btc Faucet",       logo: "tasks/btc.jpeg",             description: "Btc Testnet",     url: "https://bitcoinfaucet.uo1.net/"},
            { name: "Testnet Help",     logo: "tasks/btc.jpeg",             description: "Btc Testnet",     url: "https://testnet.help/en/btcfaucet/testnet"},
            { name: "AltQuick",         logo: "tasks/altquick.jpg",         description: "Btc Testnet",     url: "https://altquick.com/faucet/"},
            { name: "Tatum",            logo: "tasks/tatum.jpg",            description: "Btc Testnet",     url: "https://tatum.io/faucets/bitcoin"},
            { name: "MetaWire",         logo: "tasks/metawire.jpg",         description: "Btc Testnet",     url: "https://faucet-btc-testnet.metawire.cloud/"},
            { name: "BitTaps",          logo: "tasks/bitaps.png",           description: "Btc Testnet",     url: "https://tbtc.bitaps.com/"},
            { name: "Rooch Network",    logo: "tasks/rooch.jpg",            description: "Btc Testnet",     url: "https://rooch.network/build/getting-started/get-test-btc"},
            { name: "The Faucet",       logo: "tasks/thefaucet.jpg",        description: "Btc Testnet",     url: "https://www.thefaucet.org/"},
            { name: "Signet Faucet",    logo: "tasks/btc.jpeg",             description: "Signet Btc",      url: "https://signetfaucet.com/"},
            { name:"Dcorral",           logo: "tasks/btc.jpeg",             description: "Signet Btc",      url: "https://signet.dcorral.com/"},
            { name: "Sahara AI",        logo: "tasks/sahara.jpg",           description: "Faucet",          url: "https://faucet.saharalabs.ai/"},
            { name: "OG Labs",          logo: "tasks/Oglabs.jpg",           description: "Faucet",          url: "https://hub.0g.ai/faucet"},
            { name: "GTE Labs",         logo: "tasks/gte.jpg",              description: "Faucet",          url: "https://testnet.gte.xyz/"},
            { name: "Megaeth",          logo: "tasks/megaeth.jpg",          description: "Faucet",          url: "https://testnet.megaeth.com/#3"},
            { name: "Superbridge",      logo: "tasks/superbridge.jpg",      description: "Bridge",          url: "https://testnets.superbridge.app/"},
            { name: "Brid.gg",          logo: "tasks/bridgg.png",           description: "Bridge",          url: "brid.gg"},
            { name: "Relay",            logo: "tasks/relay.jpg",            description: "Bridge",          url: "https://testnets.relay.link/bridge/sepolia"},
            { name: "Orbiter Fi",       logo: "tasks/orbiter.jpg",          description: "Bridge",          url: "https://rinkeby.orbiter.finance/en"}
        ]
    };
    
    dailyTasks.checkins.forEach(task => {
        const card = createDappCard(task);
        document.getElementById('checkinGrid').appendChild(card);
    });
    
    dailyTasks.swaps.forEach(task => {
        const card = createDappCard(task);
        document.getElementById('swapGrid').appendChild(card);
    });
    
    dailyTasks.quests.forEach(task => {
        const card = createDappCard(task);
        document.getElementById('questGrid').appendChild(card);
    });

    dailyTasks.faucets.forEach(task => {
        const card = createDappCard(task);
        document.getElementById('faucetGrid').appendChild(card);
    });
}

function populateDapps(chain) {
    const chainData = dapps[chain];

    document.getElementById('dexGrid').innerHTML = '';
    document.getElementById('lendingGrid').innerHTML = '';
    document.getElementById('nftGrid').innerHTML = '';
    document.getElementById('bridgeGrid').innerHTML = '';

    if (chainData.dex) {
        chainData.dex.forEach(dapp => {
            const card = createDappCard(dapp);
            document.getElementById('dexGrid').appendChild(card);
        });
    }

    if (chainData.lending) {
        chainData.lending.forEach(dapp => {
            const card = createDappCard(dapp);
            document.getElementById('lendingGrid').appendChild(card);
        });
    }

    if (chainData.nft) {
        chainData.nft.forEach(dapp => {
            const card = createDappCard(dapp);
            document.getElementById('nftGrid').appendChild(card);
        });
    }

    if (chainData.bridge) {
        chainData.bridge.forEach(dapp => {
            const card = createDappCard(dapp);
            document.getElementById('bridgeGrid').appendChild(card);
        });
    }
}


function createDappCard(dapp) {
    const card = document.createElement('a');
    card.className = 'dapp-card';
    card.href = dapp.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    const logoContainer = document.createElement('div');
    logoContainer.className = 'dapp-logo-container';
    
    const logo = document.createElement('img');
    logo.className = 'dapp-logo';
    logo.src = `logos/${dapp.logo}`;
    logo.alt = dapp.name;
    
    
    const fallbackText = document.createElement('div');
    fallbackText.className = 'logo-fallback';
    fallbackText.textContent = dapp.name.charAt(0);
    
    logoContainer.appendChild(logo);
    logoContainer.appendChild(fallbackText);

    const name = document.createElement('div');
    name.className = 'dapp-name';
    name.textContent = dapp.name;

    const description = document.createElement('div');
    description.className = 'dapp-description';
    description.textContent = dapp.description;

    const visitBtn = document.createElement('button');
    visitBtn.className = 'visit-btn';
    visitBtn.textContent = dapp.url.includes('faucet') ? 'Get Funds' : 'Visit';

    card.appendChild(logoContainer);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(visitBtn);

    
    logo.onerror = () => {
        logo.style.display = 'none';
        fallbackText.style.display = 'flex';
    };

    return card;
}