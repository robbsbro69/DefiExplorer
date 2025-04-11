document.addEventListener('DOMContentLoaded', function() {
    // Set initial mode
    document.body.classList.add('explorer-mode');
    
    // Navigation between main sections
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active-section'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active-section');
            
            // Update body class for CSS styling
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
    
    // Navigation between task categories
    document.querySelectorAll('.task-category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and task sections
            document.querySelectorAll('.task-category-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.task-section').forEach(s => s.classList.remove('active-task'));
            
            // Add active class to clicked button and corresponding task section
            this.classList.add('active');
            const taskId = this.getAttribute('data-task');
            document.getElementById(taskId).classList.add('active-task');
        });
    });
    
    // Initialize chain selector
    document.getElementById('chainSelector').addEventListener('change', function() {
        if (document.body.classList.contains('explorer-mode')) {
            populateDapps(this.value);
        }
    });
    
    
    // Initial load
    populateDapps('ethereum');
    populateDailyTasks();
});

const dapps = {
    ethereum: {
        dex: [
            { name: "Uniswap", logo: "U", description: "Leading AMM protocol", url: "https://app.uniswap.org" },
            { name: "SushiSwap", logo: "S", description: "Multi-chain DEX", url: "https://app.sushi.com" },
            { name: "Curve", logo: "C", description: "Stablecoin-focused DEX", url: "https://curve.fi" },
            { name: "Balancer", logo: "B", description: "Programmable liquidity", url: "https://app.balancer.fi" }
        ],
        lending: [
            { name: "Aave", logo: "A", description: "Liquidity protocol", url: "https://app.aave.com" },
            { name: "Compound", logo: "C", description: "Algorithmic lending", url: "https://app.compound.finance" },
            { name: "MakerDAO", logo: "M", description: "DAI stablecoin creator", url: "https://oasis.app" }
        ],
        nft: [
            { name: "OpenSea", logo: "O", description: "Largest NFT marketplace", url: "https://opensea.io" },
            { name: "Rarible", logo: "R", description: "Creator-focused marketplace", url: "https://rarible.com" },
            { name: "Foundation", logo: "F", description: "Curated NFT platform", url: "https://foundation.app" },
            { name: "LooksRare", logo: "L", description: "Community-first marketplace", url: "https://looksrare.org" }
        ],
        bridge: [
            { name: "Jumper", logo: "Jump", description: "Multi-Chain Bridge Agg", url: "https://jumper.exchange/"}
        ]
    },
    bsc: {
        dex: [
            { name: "PancakeSwap", logo: "P", description: "Leading BSC DEX", url: "https://pancakeswap.finance" },
            { name: "MDEX", logo: "M", description: "Multi-chain DEX", url: "https://mdex.com" },
            { name: "BakerySwap", logo: "B", description: "NFT and DEX platform", url: "https://www.bakeryswap.org" }
        ],
        lending: [
            { name: "Venus", logo: "V", description: "Algorithmic money market", url: "https://app.venus.io" },
            { name: "Alpaca Finance", logo: "A", description: "Leveraged yield farming", url: "https://app.alpacafinance.org" }
        ],
        nft: [
            { name: "BinanceNFT", logo: "B", description: "Official Binance marketplace", url: "https://www.binance.com/en/nft/home" },
            { name: "Refinable", logo: "R", description: "Multi-chain NFT marketplace", url: "https://refinable.com" }
        ]
    },
    polygon: {
        dex: [
            { name: "QuickSwap", logo: "Q", description: "Layer 2 DEX", url: "https://quickswap.exchange" },
            { name: "SushiSwap", logo: "S", description: "Multi-chain DEX", url: "https://app.sushi.com/swap?chainId=137" },
            { name: "Dfyn", logo: "D", description: "Multi-chain router protocol", url: "https://exchange.dfyn.network" }
        ],
        lending: [
            { name: "Aave", logo: "A", description: "Liquidity protocol", url: "https://app.aave.com/?marketName=proto_polygon" },
            { name: "Mai Finance", logo: "M", description: "Collateralized stablecoin", url: "https://app.mai.finance" }
        ],
        nft: [
            { name: "OpenSea", logo: "O", description: "Largest NFT marketplace", url: "https://opensea.io/blockchain/polygon" },
            { name: "Rarible", logo: "R", description: "Creator-focused marketplace", url: "https://rarible.com/polygon" }
        ]
    },
    solana: {
        dex: [
            { name: "Raydium", logo: "R", description: "AMM and yield protocol", url: "https://raydium.io/swap" },
            { name: "Serum", logo: "S", description: "CLOB DEX", url: "https://projectserum.com" },
            { name: "Orca", logo: "O", description: "User-friendly DEX", url: "https://www.orca.so" }
        ],
        lending: [
            { name: "Solend", logo: "S", description: "Algorithmic lending", url: "https://solend.fi" },
            { name: "Jet Protocol", logo: "J", description: "Borrowing and lending", url: "https://jetprotocol.io" }
        ],
        nft: [
            { name: "Magic Eden", logo: "M", description: "Leading Solana marketplace", url: "https://magiceden.io" },
            { name: "Solanart", logo: "S", description: "First Solana NFT marketplace", url: "https://solanart.io" },
            { name: "Metaplex", logo: "M", description: "NFT storefront protocol", url: "https://www.metaplex.com" }
        ]
    },
    avalanche: {
        dex: [
            { name: "TraderJoe", logo: "T", description: "Leading Avalanche DEX", url: "https://traderjoexyz.com" },
            { name: "Pangolin", logo: "P", description: "Community-driven DEX", url: "https://app.pangolin.exchange" }
        ],
        lending: [
            { name: "Benqi", logo: "B", description: "Algorithmic liquidity market", url: "https://app.benqi.fi" },
            { name: "Aave", logo: "A", description: "Liquidity protocol", url: "https://app.aave.com/?marketName=proto_avalanche" }
        ],
        nft: [
            { name: "NFTrade", logo: "N", description: "Multi-chain NFT platform", url: "https://nftrade.com" },
            { name: "Kalao", logo: "K", description: "NFT marketplace and metaverse", url: "https://marketplace.kalao.io" }
        ]
    },
    manta: {
        dex: [
            { name: "GullSwap", logo: "G", description: "Leading Manta DEX", url: "https://app.gullnetwork.com/swap" },
            { name: "Izumi", logo: "I", description: "Community-driven DEX", url: "https://izumi.finance/trade/swap" },
            { name: "Oku Trade", logo: "Oku", description: "Community-driven DEX", url: "https://oku.trade/?inputChain=manta" },
            { name: "Pixelswap", logo: "I", description: "Community-driven DEX", url: "https://app.pixelswap.xyz/#/swap" },
            { name: "DoDoEx", logo: "I", description: "Community-driven DEX", url: "https://app.dodoex.io/" },
            { name: "DapDap", logo: "I", description: "Community-driven DEX", url: "https://app.dapdap.net/super-swap" },
            { name: "Aperture", logo: "I", description: "Community-driven DEX", url: "https://app.aperture.finance/" },
            { name: "Cetoswap", logo: "I", description: "Community-driven DEX", url: "https://cetoswap.com/#/" },
            { name: "Impossible Finance", logo: "I", description: "Community-driven DEX", url: "https://impossible.finance/" },
            { name: "Firefly Dex", logo: "I", description: "Community-driven DEX", url: "https://fireflydex.io/#/swap" },
            { name: "Magpie", logo: "I", description: "Bridge and Dex", url: "https://app.magpiefi.xyz/swap" }
            
        ],
        lending: [
            { name: "Shoebill", logo: "Sb", description: "Liquidity market", url: "https://manta-manta.shoebill.finance/#/" },
            { name: "Layerbank", logo: "Lb", description: "Liquidity protocol", url: "https://app.layerbank.finance/manta-pacific/bank" },
            { name: "Zerolend", logo: "ZL", description: "Liquidity protocol", url: "https://app.zerolend.xyz/markets/?marketName=proto_manta_v3" },
            { name: "Omni", logo: "Oi", description: "Liquidity protocol", url: "https://omni.ls/" },
            { name: "Accumulated Finance", logo: "AF", description: "Liquidity protocol", url: "https://accumulated.finance/stake/manta" },
            { name: "Layerbank", logo: "Lb", description: "Liquidity protocol", url: "https://app.layerbank.finance/manta-pacific/bank" },
            { name: "MonRoe", logo: "I", description: "Lending", url: "https://app.monroeprotocol.com/vaults" }
        ],
        nft: [
            { name: "Element", logo: "E", description: "Multi-chain NFT platform", url: "https://element.market/manta-pacific" },
        ],
        bridge: [
            { name: "Rubic", logo: "I", description: "Bridge", url: "https://app.rubic.exchange/" },
            { name: "Layerswap", logo: "I", description: "Bridge", url: "https://layerswap.io/" },
            { name: "Symbiosis", logo: "Symb", description: "Bridge", url: "https://app.symbiosis.finance/liquidity-v2/pools" }
        ]
    },
    ink: {
        dex: [
            { name: "Velodrome", logo: "V", description: "Leading Inkchain DEX", url: "https://velodrome.finance/" },
            { name: "Reservoir", logo: "R", description: "Community-driven DEX", url: "https://swap.reservoir.tools/swap#/swap" }
        ],
        lending: [
            { name: "Ionic", logo: "I", description: "Algorithmic liquidity market", url: "https://app.ionic.money/market?chain=57073" }
        ],
        nft: [
            { name: "Element", logo: "E", description: "Multi-chain NFT platform", url: "https://element.market" },
        ],
        bridge: [
            { name: "Superbridge", logo: "sup", description: "Cross-Chain Bridge", url: "https://www.brid.gg/ink?amount=&originChainId=1&token=ETH"},
            { name: "Relay", logo: "rel", description: "Cross-Chain Bridge", url: "https://relay.link/bridge/ink?includeChainIds=57073"}
        ]
    },
    superseed: {
        dex: [
            { name: "Bebop", logo: "B", description: "Leading Superseed DEX", url: "https://bebop.xyz/trade?network=superseed&buy" },
            { name: "SeedFi", logo: "SF", description: "Community-driven DEX", url: "https://seedfi.trade" },
            { name: "Velodrome", logo: "V", description: "Leading Superseed DEX", url: "https://velodrome.finance/" },
            { name: "Bulletx", logo: "Bx", description: "Dex", url: "https://bulletx.io/swap"},
            { name: "ThirdWeb", logo: "TW", description:"Deploy contract", url: "https://thirdweb.com/explore"}
        ],
        lending: [
            { name: "Ionic", logo: "I", description: "Algorithmic liquidity market", url: "https://app.ionic.money/market" }
        ],
        nft: [
            { name: "Fractal Visions", logo: "FV", description: "Multi-chain NFT platform", url: "https://www.fractalvisions.io/" },
            { name: "Mintpad", logo: "MP", description: "Mint NFT", url: "https://mintpad.co/create/edition/"}
        ],
        bridge: [
            { name: "Official Bridge", logo: "Off", description: "Official Bridge", url: "https://bridge.superseed.xyz/"},
            { name: "Relay", logo: "rel", description: "Cross-Chain Bridge", url: "https://relay.link/bridge"},
            { name: "Layerswap", logo: "LS", description: "Cross-Chain Bridge", url: "https://layerswap.io/app"}
        ]
    },
    swell: {
        dex: [
            { name: "Ambient", logo: "V", description: "Leading Swell DEX", url: "https://ambient.finance/trade" },
            { name: "Bubly", logo: "R", description: "Community-driven DEX", url: "https://app.bubbly.finance/" },
            { name: "Nep Finance", logo: "R", description: "Community-driven DEX", url: "https://app.nep.finance/swap" }
        ],
        lending: [
            { name: "Euler", logo: "I", description: "Algorithmic liquidity market", url: "https://app.euler.finance/?chainId=1" },
            { name: "Ion Protocol", logo: "I", description: "Liquidity Protocol", url: "https://www.app.ionprotocol.io/"}
        ],
        nft: [
            { name: "Element", logo: "E", description: "Multi-chain NFT platform", url: "https://element.market" },
        ],
        bridge: [
            { name: "Superbridge", logo: "sup", description: "Cross-Chain Bridge", url: "https://superbridge.swellnetwork.io/"},
            { name: "Gas Zip", logo: "gz", description: "Cross-Chain Refuel", url: "https://gas.zip/"}
        ]
    },
    cyber: {
        dex: [
            { name: "Owlto", logo: "O", description: "Leading Cyber DEX", url: "https://owlto.finance/swap" },
            { name: "Izumi", logo: "I", description: "Community-driven DEX", url: "https://izumi.finance/trade/swap" }
        ],
        lending: [
            { name: "Euler", logo: "E", description: "Algorithmic liquidity market", url: "https://app.euler.finance/?chainId=1" }
        ],
        nft: [
            { name: "Element", logo: "E", description: "Multi-chain NFT platform", url: "https://element.market/cyber" },
        ],
        bridge: [
            { name: "Official", logo: "off", description: "Official Bridge", url: "https://cyber.co/bridge"},
            { name: "Relay", logo: "rel", description: "Cross-Chain Bridge", url: "https://relay.link/bridge/"}
        ]
    },
    bob: {
        dex: [
            { name: "Oku Trade", logo: "oku", description: "Leading BOB DEX", url: "https://oku.trade/" },
            { name: "Izumi", logo: "Izu", description: "Community-driven DEX", url: "https://izumi.finance/trade/swap" }
        ],
        lending: [
            { name: "Ionic", logo: "I", description: "Algorithmic liquidity market", url: "https://app.ionic.money/" },
            { name: "Layerbank", logo: "LB", description: "Liquidity protocol", url: "hhttps://layerbank.finance/bank" }
        ],
        nft: [
            { name: "Element", logo: "Ele", description: "Multi-chain NFT platform", url: "https://element.market/bob" }
        ],
        bridge: [
            { name: "Official", logo: "Bob", description: "Official Bridge", url: "https://app.gobob.xyz/en/bridge"},
            { name: "Relay", logo: "Re", description: "Cross-Chain Bridge", url: "https://relay.link/"}
        ]
    },
    frax: {
        dex: [
            { name: "Balancer", logo: "B", description: "Leading Frax DEX", url: "https://balancer.fi/" },
            { name: "Curve Finance", logo: "CF", description: "Community-driven DEX", url: "https://curve.fi/" },
            { name: "Ra Exchange", logo: "RE", description: "Leading Dex", url: "https://www.ra.exchange/"},
            { name: "Wombat Exchange", logo: "WE", description: "Community Dex", url: "https://www.wombat.exchange/"}
        ],
        lending: [
            { name: "Ionic", logo: "I", description: "Algorithmic liquidity market", url: "https://app.ionic.money/" },
            { name: "Gravity Protocol", logo: "GP", description: "Liquidity protocol", url: "https://app.gravitaprotocol.com/" }
        ],
        nft: [
            { name: "Nfts2Me", logo: "N2M", description: "multichain user-friendly", url: "https://nfts2me.com/" }
        ],
        bridge: [
            { name: "Official", logo: "Frax", description: "Official Bridge", url: "https://mainnet.frax.com/tools/bridge/deposit"},
            { name: "Gas Zip", logo: "GZ", description: "Cross-Chain Bridge", url: "https://www.gas.zip/"}
        ]
    },
    worldchain: {
        dex: [
            { name: "Uniswap", logo: "Uni", description: "Leading Worldchain DEX", url: "https://app.uniswap.org/" }
        ],
        lending: [
            { name: "Ionic", logo: "I", description: "Algorithmic liquidity market", url: "https://app.ionic.money/" }
        ],
        nft: [
            { name: "Nfts2Me", logo: "N2M", description: "multichain user-friendly", url: "https://nfts2me.com/" }

        ],
        bridge: [
            { name: "SuperBridge", logo: "Sup", description: "Cross-Chainn Bridge", url: "https://superbridge.app/"},
            { name: "Across", logo: "A", description: "Cross-Chain Bridge", url: "https://app.across.to/bridge"}
        ]
    },
    unichain: {
        dex: [
            { name: "Uniswap", logo: "Uni", description: "Leading Worldchain DEX", url: "https://app.uniswap.org/" },
            { name: "Jumper", logo: "Jump", description: "Cross-Chain Swap and Bridge", url: "https://jumper.exchange/"},
            { name: "OpenOcean", logo: "OO", description: "DEX aggregator", url: "https://app.openocean.finance/swap/uni/ETH/USDC"}
        ],
        lending: [
            { name: "Venus", logo: "V", description: "liquidity market", url: "https://app.venus.io/" },
            { name: "Compound Finance", logo: "CF", description: "Lending", url: "https://app.compound.finance/?market=usdc-unichain"}
        ],
        nft: [
            { name: "Opensea", logo: "OS", description: "multichain user-friendly", url: "https://opensea.io/discover/chain/unichain" }

        ],
        bridge: [
            { name: "Official Bridge", logo: "Off", description: "Official Bridge", url: "https://app.uniswap.org/swap"},
            { name: "SuperBridge", logo: "Sup", description: "Cross-Chainn Bridge", url: "https://superbridge.app/unichain"},
            { name: "Relay", logo: "R", description: "Cross-Chain Bridge", url: "https://relay.link/bridge/unichain"},
            { name: "Mach Exchange", logo: "ME", description: "Cross-Chain Bridge", url: "https://app.mach.exchange/"},
            { name: "Synapse Protocol", logo: "SP", description: "Cross-Chain Bridge", url: "https://synapseprotocol.com/?toChainId=130"},
            { name: "Bungee Exchange", logo: "BE", description: "Liquidity Marketplace", url: "https://www.bungee.exchange/"},
            { name: "Symbiosis", logo: "S", description: "Cross-Chain Bridge", url: "https://app.symbiosis.finance/"}
        ]
    },
    monad: {
        dex: [
            { name: "Owlto", logo: "O", description: "Deploy Contract", url: "https://owlto.finance/deploy/?chain=MonadTestnet" },
            { name: "Izumi", logo: "I", description: "Community-driven DEX", url: "https://alpha.izumi.finance/trade/swap" },
            { name: "Nitro Finance", logo: "NF", description: "Leading Monad DEX", url: "https://testapp.nitrofinance.xyz/trade" },
            { name: "Bebop", logo: "B", description: "Leading Monaad DEX", url: "https://bebop.xyz/trade?network=monad" },
            { name: "Hashflow", logo: "HF", description: "Leading Inkchain DEX", url: "https://app.hashflow.com/?b=10143-USDC&q=10143-USDT" },
            { name: "Castora", logo: "C", description: "Dex", url: "https://castora.xyz/pools" },
            { name: "Clober", logo: "Crr", description: "Dex", url: "https://alpha.clober.io/trade?chain=10143" },
            { name: "Crystal", logo: "C", description: "Dex", url: "https://app.crystal.exchange/swap" },
            { name: "Fukunad", logo: "F", description: "Raffle", url: "https://testnet.fukunad.xyz/raffle" },
            { name: "Nextmate", logo: "N", description: "Voting", url: "https://nextmate.ai/predictionMarket?chainType=monad_testnet" },
            { name: "PancakeSwap", logo: "P", description: "Dex", url: "https://pancakeswap.finance/swap" },
            { name: "PlayGround", logo: "P", description: "Dex", url: "https://playground.easy-node.xyz/" },
            { name: "Ambient Finance", logo: "AF", description: "Dex", url: "https://monad.ambient.finance" },
            { name: "Monorail", logo: "M", description: "Dex", url: "https://testnet-preview.monorail.xyz/" },
            { name: "Azar", logo: "A", description: "Dex", url: "https://app-monad-testnet.azaar.com/swap" },
            { name: "Curvance", logo: "C", description: "Dex", url: "https://monad.curvance.com/" },
            { name: "Covenant Finance", logo: "CF", description: "Dex", url: "https://fluidtest.covenant.finance/market/4?action=buy" },
            { name: "Narwhal Finance", logo: "NF", description: "Dex", url: "https://testnet.narwhal.finance/?token=USDT" },
            { name: "Zaros", logo: "Z", description: "Dex", url: "https://testnet.app.zaros.fi/" },
            { name: "Pandara", logo: "P", description: "Dex", url: "https://pandaria.lfj.gg/monad-testnet/swap" },
            { name: "Nabla Finance", logo: "NF", description: "Dex", url: "https://app.nabla.fi/swap" },
            { name: "Bean Exchange", logo: "BE", description: "Dex", url: "https://swap.bean.exchange/swap" },
            { name: "AiCraft Fun", logo: "AF", description: "Voting", url: "https://aicraft.fun/projects/fizen?ref=97CZF5JCG1" },
            { name: "Dirol Network", logo: "DN", description: "Dex", url: "https://dex.dirol.network/swap" },
            { name: "Octo Exchange", logo: "OE", description: "Dex", url: "https://octo.exchange/swap" },
            { name: "Madness Finance", logo: "MF", description: "Dex", url: "https://madness.finance/swap" },
            { name: "Rubic Exchange", logo: "RE", description: "Dex", url: "https://testnet.rubic.exchange/" },
            { name: "Bubble Finance", logo: "BF", description: "Dex", url: "https://app.bubblefi.xyz/" },
            { name: "Kuru Trade", logo: "KT", description: "Dex", url: "https://www.kuru.io/trade/" },
            { name: "Dusted", logo: "D", description: "Gaming", url: "https://www.dusted.app/rewards" },
            { name: "Atlantis Dex", logo: "AD", description: "Dex", url: "https://app.atlantisdex.xyz/swap/v4/" },
            { name: "ApeBond", logo: "AB", description: "Dex", url: "https://www.ape.bond/bonds" },
            { name: "Encifher", logo:"en", description: "Dex", url: "https://monad.encifher.io/"},
            { name: "Woofi", logo: "W", description: "Perp Dex", url: "https://testnet-pro.woofi.com/en/trade/ETH_PERP"},
            { name: "Majhong", logo: "M", description: "Gaming", url: "https://monad.mahjong123.io/"},
            { name: "KiloEx", logo: "KE", description: "Perp Dex", url: "https://app.kiloex.io/trade?sCode=default&utm_source=referral&utm_medium=default"},
            { name: "Tadle-odds", logo: "TO", description: "Betting", url: "https://tadle-odds.netlify.app/markets"},
            { name: "Mace", logo: "M", description: "Dex", url: "https://testnet.swaps.mace.ag/#"},
            { name: "Taya", logo: "T", description: "Dex", url: "https://app.taya.fi/swap"},
            { name: "TheVapeLabs", logo: "TVL", description: "Connnect TG and complete social", url: "https://app.thevapelabs.io/app"},
            { name: "Odyssey Gateway", logo: "OG", description: "Depo mon and play games", url: "https://odyssey.gateway.tech/dashboard"},
            { name: "Monda", logo: "M", description: "Dex", url: "https://app.monda.fund/swap"},
            { name: "Zona", logo: "Z", description: "Betting", url: "https://app.zona.finance/trade"},
            { name: "Dyson Finance", logo: "DF", description: "Dex", url: "https://alpha.dyson.finance/dex"},
            { name: "Hakifi", logo: "HF", description: "Dex" ,url: "https://hakifi.xyz/"}
        ],
        lending: [
            { name: "Kinza", logo: "K", description: "Liquidity market", url: "https://monad-test.kinza.finance/#/details/MON" },
            { name: "Apr", logo: "A", description: "Staking", url: "https://stake.apr.io/" },
            { name: "Kintsu", logo: "Ki", description: "Staking", url: "https://kintsu.xyz/staking" },
            { name: "Shmonad", logo: "Sm", description: "Staking", url: "https://shmonad.xyz/" },
            { name: "Nostra Finance", logo: "NF", description: "Staking", url: "https://shmonad.xyz/" },
            { name: "Timeswap", logo: "TS", description: "Staking", url: "https://app.timeswap.io/markets" },
            { name: "Magma Staking", logo: "MS", description: "Staking", url: "https://www.magmastaking.xyz/" },
            { name: "Summer Money", logo: "SM", description: "Lending", url: "https://app.sumer.money/?chain=10143"},
            { name: "Talentum", logo: "T", description: "Staking", url: "https://monad.talentum.id/projects?page=1"}
        ],
        nft: [
            { name: "Element", logo: "E", description: "Multi-chain NFT platform", url: "https://element.market/cyber" },
            { name: "Nezro", logo: "N", description: "Mint Nft", url: "https://nerzo.xyz/senera" },
            { name: "Magic Eden", logo: "ME", description: "Mint Nft", url: "https://magiceden.io/mint-terminal/monad-testnet" },
            { name: "Nfts2me", logo: "NM", description: "Mint NFT", url: "https://bright-cintos-gaming.testnet.nfts2.me/"},
            { name: "Poply", logo: "PP", description: "Mint NFT", url: "https://poply.xyz/launchpad/0xd97bce4518b886a36e345764333d77b5faf6fe2c"},
            { name: "Monadverse", logo: "MV", description: "Mint NFT", url: "https://monadverse.land/mint"},
            { name: "Morkie", logo: "M", description: "Complete social and Mint", url: "https://morkie.xyz/monarch"},
            { name: "Impossible Finance", logo: "IF", description: "Complete social and Mint", url: "https://app.impossible.finance/launchpad/project/160?ref=blog.impossible.finance"},
            { name: "Free Mint", logo: "FM", description: "Mint NFT", url: "https://testnet.freee.xyz/collect/monadt:0xAb0bA06c13eC49c0842ef4716CeB1593f2C41779/token/5"}
        ]
    },
    risechain: {
        dex: [
            { name: "For the kingdom", logo: "FTK", description: "Gaming", url: "https://forthekingdom.xyz/" },
            { name: "Gas Pump", logo: "GP", description: "Native DEX", url: "https://gaspump.network/swap"},
            { name: "B3X", logo: "B3x", description: "DEX", url: "https://testnet.b3x.ai/#/trade"},
            { name: "Inari Finance", logo: "IF", description: "Dex", url: "https://www.inarifi.com/"},
            { name: "GTX", logo: "G", description: "Dex", url: "https://gtxdex.xyz/waitlist"},
            { name: "Ultra", logo: "U", description: "Dex", url: "https://ultra-fi.xyz/"},
            { name: "Clober", logo: "C", description: "Dex", url: "https://rise.clober.io/"},
            { name: "Standard", logo: "S", description: "Dex", url: "https://app.standardweb3.com/"},
            { name: "LeoFi", logo: "LF", description: "Dex", url: "https://etn.leofi.xyz/"},
            { name: "Chess_Onchain", logo: "CO", description: "Play chess", url: "https://play.chessonchain.io/"},
            { name: "Haifu", logo: "H", description: "AI", url: "https://haifu.fun/"},

        ],
        lending: [
            { name: "Coming Soon", logo: "CS", description: "Coming Soon", url: ""}
        ],
        nft: [
            { name: "Nfts2me", logo: "N2M", description: "create and mint nft's", url: "https://nfts2me.com/app/rise-testnet/" },
            { name: "Relic", logo: "R", description: "Nfts Marketplace", url: "https://www.therelic.art/"}

        ],
        bridge: [
            { name: "Gas zip", logo: "GZ", description: "Faucet and bridge", url: "https://www.gas.zip/faucet/rise"}
        ]
    }
};



function populateDailyTasks() {
    const dailyTasks = {
        checkins: [
            { name: "Layer3", logo: "L", description: "Daily quests", url: "https://app.layer3.xyz/quests" },
            { name: "Succinct", logo: "S", description: "Generate proofs, earn stars", url: "https://testnet.succinct.xyz/dashboard"},
            { name: "Lootex", logo: "LE", description: "Complete tasks", url: "https://lootex.io/invite/LM7C7N" },
            { name: "Superboard", logo: "SB", description: "Quests and Fun", url: "https://superboard.xyz/quests"},
            { name: "Alva", logo: "A", description: "AI and Fun", url: "https://alva.xyz/Referral/?r=Y5JE78"},
            { name: "Owlto Finance", logo: "Owl", description: "Daily Check-in", url: "https://owlto.finance/?ref=0xe88d2D7e13a71eA68A438b9FEdD6363bE48A0373"},
            { name: "Orbiter Finance", logo: "Orb", description: "Daily Check-in", url: "https://orbiter.finance/?channel=0xe88d2d7e13a71ea68a438b9fedd6363be48a0373"},
            { name: "Magic Netwon", logo: "MN", description: "Daily Roll Dice", url: "https://magicnewton.com/portal?referral=xe1v65se5r2ebf17"},
            { name: "Vendetta", logo: "V", description: "Daily Check-In", url: "http://vendettagame.xyz/quest?refercode=BQIdhqJrf2NA"},
            { name: "OnchainGM", logo: "OG", description: "Daily GM", url: "https://onchaingm.com/"},
            { name: "TheVapeLabs", logo: "TVL", description: "Daily Check-In", url: "https://app.thevapelabs.io/app"},
            { name: "0G Puzzle Mania", logo: "OPM", description: "Daily Check-In", url: "https://puzzlemania.0g.ai/?referral=eDKjVDKysyB5"}
        ],
        swaps: [
            { name: "Mach Exchange", logo: "ME", description: "Ref Code: HBWDK", url: "https://app.mach.exchange/" },
            { name: "Concerno", logo: "P", description: "Daily trade", url: "https://app.concero.io/rewards" },
            { name: "Infinex", logo: "In", description: "Daily swap", url: "https://app.infinex.xyz/earn"}
        ],
        quests: [
            { name: "Linera Galxe", logo: "LG", description: "Complete quests", url: "https://app.galxe.com/quest/Linera/GCbMUtpawv" },
            { name: "Dmail", logo: "D", description: "Daily Mail", url: "https://mail.dmail.ai/login?icode=118666"}
        ],
        faucets: [
            { name: "Sepolia Faucet", logo: "Sep", description: "Claim", url: "https://sepoliafaucet.com/"},
            { name: "Sahara AI", logo: "SAH", description: "Faucet", url: "https://faucet.saharalabs.ai/"},
            { name: "OG Labs", logo: "OG", description: "Faucet", url: "https://hub.0g.ai/faucet"},
            { name: "GTE Labs", logo: "GTE", description: "Faucet", url: "https://testnet.gte.xyz/"},
            { name: "Megaeth", logo: "ME", description: "Faucet", url: "https://testnet.megaeth.com/#3"}
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

    

    const logo = document.createElement('div');
    logo.className = 'dapp-logo';
    logo.textContent = dapp.logo || dapp.name.charAt(0);

    const name = document.createElement('div');
    name.className = 'dapp-name';
    name.textContent = dapp.name;

    const description = document.createElement('div');
    description.className = 'dapp-description';
    description.textContent = dapp.description;

    const visitBtn = document.createElement('button');
    visitBtn.className = 'visit-btn';
    visitBtn.textContent = 'Visit DApp';

    card.appendChild(logo);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(visitBtn);

    return card;
}

