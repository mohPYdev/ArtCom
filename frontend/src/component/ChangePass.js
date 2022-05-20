import './ChangePass.css'

export default function Modal({ handleClose }) {

  const close = (e) => {
    if(e.target.className === ('modal-backdrop'))
      handleClose()
    console.log(e.target.className)
  }

  return (
    <div className="modal-backdrop" onClick={((e) => close(e))}>
      <div className="modal">
        <form id='change_pass'>
          <input type="password" placeholder='رمزعبور قبلی'></input><br />
          <input type="password" placeholder='رمزعبور جدید'></input><br />
          <input type="password" placeholder='تکرار رمزعبور جدید'></input>
        </form>
      </div>
    </div>
  )
}