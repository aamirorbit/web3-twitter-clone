export default function fetchNftMetadata(address) {
  let nfts = []
  const key = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const url = `https://eth-mainnet.alchemyapi.io/nft/v2/${key}/getNFTs/?owner=${address}`

  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.ownedNfts.forEach(element => {
      if (element.media[0].gateway?.length > 0){
        let nft = {address: element.contract.address, name: element.title, url: element.media[0].gateway}
        nfts.push(nft)
      }
    });
  })
  .catch(console.error);
  return nfts;
}
