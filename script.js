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
            { name: "Izumi", logo: "I", description: "Community-driven DEX", url: "https://izumi.finance/trade/swap" }
        ],
        lending: [
            { name: "Shoebill", logo: "Sb", description: "Algorithmic liquidity market", url: "https://manta-manta.shoebill.finance/#/" },
            { name: "Layerbank", logo: "Lb", description: "Liquidity protocol", url: "https://app.layerbank.finance/manta-pacific/bank" }
        ],
        nft: [
            { name: "Element", logo: "E", description: "Multi-chain NFT platform", url: "https://element.market/manta-pacific" },
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
        ]
    },
    swell: {
        dex: [
            { name: "Ambient", logo: "V", description: "Leading Inkchain DEX", url: "https://ambient.finance/trade" },
            { name: "Bubly", logo: "R", description: "Community-driven DEX", url: "https://app.bubbly.finance/" },
            { name: "Nep Finance", logo: "R", description: "Community-driven DEX", url: "https://app.nep.finance/swap" }
        ],
        lending: [
            { name: "Euler", logo: "I", description: "Algorithmic liquidity market", url: "https://app.euler.finance/?chainId=1" }
        ],
        nft: [
            { name: "Element", logo: "E", description: "Multi-chain NFT platform", url: "https://element.market" },
        ]
    },
    cyber: {
        dex: [
            { name: "Owlto", logo: "V", description: "Leading Inkchain DEX", url: "https://owlto.finance/swap" },
            { name: "Izumi", logo: "R", description: "Community-driven DEX", url: "https://izumi.finance/trade/swap" }
        ],
        lending: [
            { name: "Euler", logo: "I", description: "Algorithmic liquidity market", url: "https://app.euler.finance/?chainId=1" }
        ],
        nft: [
            { name: "Element", logo: "E", description: "Multi-chain NFT platform", url: "https://element.market/cyber" },
        ]
    }
};

function populateDapps(chain) {
    const chainData = dapps[chain];

    document.getElementById('dexGrid').innerHTML = '';
    document.getElementById('lendingGrid').innerHTML = '';
    document.getElementById('nftGrid').innerHTML = '';

    chainData.dex.forEach(dapp => {
        const card = createDappCard(dapp);
        document.getElementById('dexGrid').appendChild(card);
    });

    chainData.lending.forEach(dapp => {
        const card = createDappCard(dapp);
        document.getElementById('lendingGrid').appendChild(card);
    });

    chainData.nft.forEach(dapp => {
        const card = createDappCard(dapp);
        document.getElementById('nftGrid').appendChild(card);
    });
}

function createDappCard(dapp) {
    const card = document.createElement('a');
    card.className = 'dapp-card';
    card.href = dapp.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    card.addEventListener('click', function() {
        showStatusMessage(`Redirecting to ${dapp.name}...`);
    });

    const logo = document.createElement('div');
    logo.className = 'dapp-logo';
    logo.textContent = dapp.logo;

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

function showStatusMessage(message) {
    const statusElement = document.getElementById('statusMessage');
    statusElement.textContent = message;
    statusElement.style.display = 'block';
    
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 3000);
}

document.getElementById('chainSelector').addEventListener('change', function() {
    populateDapps(this.value);
});

populateDapps('ethereum');
