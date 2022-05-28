import { useState } from 'react'
import './PopupModal.css'

export default function Modal({ handleClose , balance , id}) {

  // 
  const [dep , setDep] = useState(0)

  // close modal
  const close = (e) => {
    if(e.target.className === ('modal-backdrop')){
      handleClose()
    }
  }

  /// deposit
  const deposit = (e) => {
    e.preventDefault()

  }

  return (
    <div className="modal-backdrop" onClick={((e) => close(e))}>
      <div className="modal">
        <div class="w-full">
          <form class="bg-red-50 shadow-md rounded px-8 pt-6 pb-8 m-4" onSubmit={deposit}>
            <div class="mb-6">
              <label class="block text-cyan-900 text-3xl font-bold mb-2">
              (تومان) موجودی
              </label>
              <input value={balance} disabled readonly class="text-center cursor-not-allowed hover:scale-105	focus:scale-105 text-3xl shadow appearance-none border focus:ring-2 focus:ring-cyan-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="oldpassword" />
            </div>
            <div class="mb-6">
              <label class="block text-cyan-900 text-3xl font-bold mb-2" for="number">
              (تومان) افزایش موجودی
              </label>
              <input class="text-center hover:scale-105	focus:scale-105 text-3xl shadow appearance-none border focus:ring-2 focus:ring-cyan-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              onChange={e => setDep(e.target.value)}
              id="increase" type="number" placeholder="100000"/>
            </div>
            <div class="flex items-center justify-center">
              <button class="w-48 duration-300 hover:-translate-y-1 hover:scale-105 text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                واریز
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}