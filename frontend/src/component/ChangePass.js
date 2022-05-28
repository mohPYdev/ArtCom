import './PopupModal.css'
import {useState} from 'react'
import { useAlert } from "react-alert";
import axios from "axios";

export default function Modal({ handleClose }) {

  // states
  const [current_password , setLastPass] = useState()
  const [new_password , setNewPass] = useState()
  const [re_new_password , setNewPassRep] = useState()
  
  // Alert 
  const alert = useAlert();

  // post url
  const url = 'http://localhost:8000/users/set_password/'

  // changePass handler
  const changePass = async (e) => {
    e.preventDefault()
    if(new_password === re_new_password ){
      try{
          const res = await axios.post(url , {new_password , re_new_password , current_password} );
          if(res.status === 204){
            alert.success("رمز شما با موفقیت تغییر کرد")
            handleClose()
          }
      }
      catch(err){
        console.log(err)
      }
    }
    else{
        alert.error("تکرار رمز عبور صحیح نمی باشد ")
    }
  }

  // close modal by clicking outside modal  
  const close = (e) => {
    if(e.target.className === ('modal-backdrop')){
      handleClose()
    }
  }

  return (
    <div className="modal-backdrop" onClick={((e) => close(e))}>
      <div className="modal">
        <div class="w-full">
          <form class="bg-red-50 shadow-md rounded px-8 pt-6 pb-8 m-4" onSubmit={changePass}>
            <div class="mb-6">
              <label class="block text-cyan-900 text-3xl font-bold mb-2" for="password">
                رمزعبور قدیم
              </label>
              <input class="hover:scale-105	focus:scale-105 text-3xl shadow appearance-none border focus:ring-2 focus:ring-cyan-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="oldpassword" type="password"
              onChange={e => setLastPass(e.target.value)} placeholder="******************"/>
            </div>
            <div class="mb-6">
              <label class="block text-cyan-900 text-3xl font-bold mb-2" for="password">
                رمزعبور جدید
              </label>
              <input class="hover:scale-105	focus:scale-105 text-3xl shadow appearance-none border focus:ring-2 focus:ring-cyan-900 rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="newpassword" type="password" 
              onChange={e => setNewPass(e.target.value)}
              placeholder="******************" />
            </div>
            <div class="mb-6">
              <label class="block text-cyan-900	text-3xl font-bold mb-2" for="password">
                تکرار رمزعبور جدید
              </label>
              <input class="hover:scale-105	focus:scale-105 text-3xl shadow appearance-none border focus:ring-2 focus:ring-cyan-900 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirmnewpassword" 
              onChange={e => setNewPassRep(e.target.value)} 
              type="password" placeholder="******************" />
            </div>
            <div class="flex items-center justify-center">
              <button class="w-48 duration-300 hover:-translate-y-1 hover:scale-105 text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                ثبت
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}