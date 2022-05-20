import './Mod.css'

export default function Modal({ handleClose }) {

  const close = (e) => {
    if(e.target.className === ('modal-backdrop'))
      handleClose()
    console.log(e.target.className)
  }

  return (
    <div className="modal-backdrop" onClick={((e) => close(e))}>
      <div className="modal">
		
      </div>
    </div>
  )
}