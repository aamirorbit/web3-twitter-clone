import { useRecoilState } from 'recoil'
import { nftModalState, nftUrlState } from '../atom/modalAtom'
import Modal from 'react-modal'

export default function NftModal() {
  const [open, setOpen] = useRecoilState(nftModalState)
  const [nftUrl, sefNftUrl] = useRecoilState(nftUrlState)

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
        >
          <div className="overflow-x-autoflex flex flex-col space-y-2 m-5">
            <div >
              <h1>NFT 1</h1>
              <img on src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop" />
            </div>
            <div >
              <h1>NFT 2</h1>
              <img src="https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop" />
            </div>
            <div >
              <h1>NFT 3</h1>
              <img src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop" />
            </div>
            <div >
              <h1>NFT 4</h1>
              <img src="https://images.unsplash.com/photo-1575424909138-46b05e5919ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop" />
            </div>
            <div >
              <h1>NFT 5</h1>
              <img src="https://images.unsplash.com/photo-1559333086-b0a56225a93c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
