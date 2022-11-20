import { FormEvent, useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Modal from 'react-modal';
import PacmanLoader from "react-spinners/PacmanLoader";
import { dexieProvider } from "../provider/indexDB/DexieProvider";

function Login() {
  const navigate = useNavigate()
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '350px',
      heigth: '350px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  async function handleAuthentication(e: FormEvent) {
    e.preventDefault()
    const indexDBItems = new dexieProvider('items')
    console.time()
    setIsOpen(true)
    const itens = await axios.get('/api/items')
    await axios.get('/api/users')
    await indexDBItems.addAll(itens.data.items)
    setIsOpen(false)
    return navigate("/home")
  }

  useEffect(() => {
    Modal.setAppElement('body')
  }, [])


  return (
    <>
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <form
          className="h-[450px] w-[450px] rounded bg-white bg-opacity-5 flex flex-col items-center justify-center p-10 gap-10"
          onSubmit={(e) => handleAuthentication(e)}
        >
          <h1 className="text-3xl text-cyan-100 flex gap-2 items-center">
            Autenticar <AiOutlineUser size={30} color="rgb(207 250 254)" />
          </h1>
          <div className="bg-white w-full bg-opacity-5 flex rounded">
            <label htmlFor="user" className="p-1"><AiOutlineUser size={25} color="rgb(207 250 254)" /></label>
            <input id="user" className="w-full bg-transparent outline-none border-2 border-transparent focus:border-cyan-100 text-white px-2" type="text" />
          </div>
          <div className="bg-white w-full bg-opacity-5 flex rounded">
            <label htmlFor="password" className="p-1"><AiOutlineLock size={25} color="rgb(207 250 254)" /></label>
            <input id="password" className="w-full bg-transparent outline-none border-2 border-transparent focus:border-cyan-100 text-white px-2" type="text" />
          </div>

          <button
            className="bg-cyan-100 w-52 p-1 rounded font-bold hover:bg-cyan-200 transition-colors"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="h-[300px] flex items-center justify-center flex-col text-gray-700 text-3xl gap-[80px] text-center">
          Carregando informações...
          <PacmanLoader />
        </div>
      </Modal>
    </>
  )
}

export { Login }
