import { useRecoilState } from 'recoil'
import { nftModalState, nftUrlState } from '../atom/modalAtom'
import Modal from 'react-modal'
import { useMoralis } from "react-moralis";
import fetchNftMetadata from '../service/fetchNftMetadata';

export default function NftModal() {
  const [nftOpen, setNftOpen] = useRecoilState(nftModalState)
  const [nftUrl, sefNftUrl] = useRecoilState(nftUrlState)
  const { isAuthenticated, user } = useMoralis();
  let nfts = fetchNftMetadata(user.get("ethAddress"));

  return (
    <div>
      {nftOpen && isAuthenticated && (
        <Modal
          isOpen={nftOpen}
          onRequestClose={() => setNftOpen(false)}
        >
          <div className="overflow-x-autoflex flex flex-col space-y-2 m-5">
            {nfts.map((nft)=> (
            <div key={nft.address} >
              <h1>{nft.name}</h1>
              <img src={nft.url} />
            </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  )
}
