import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { db } from "../provider/indexDB";
import { dexieProvider } from "../provider/indexDB/DexieProvider";

function Home() {
  const [itens, setItens] = useState<any[]>([])
  const navigate = useNavigate()

  async function getItems() {
    const indexDBItems = new dexieProvider('items')
    const items = await indexDBItems.getAll()
    setItens(items)
  }

  async function handleExit() {
    const indexDBItems = new dexieProvider('items')
    await indexDBItems.deleteAll()
    navigate('/')
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <div className="h-screen bg-zinc-900 flex items-center justify-center">
      <button className="bg-red-600 text-zinc-100 rounded w-24 absolute top-32 left-32 hover:bg-slate-400 transition-colors" onClick={handleExit}>
        Sair
      </button>
      <div className="min-h-[400px] w-[400px] rounded bg-white bg-opacity-5 p-10 gap-10">
        <div className="flex flex-col gap-14 items-center w-full justify-center">
          <h1 className="flex items-center text-3xl text-cyan-100">
            Home <AiOutlineUser size={30} color="rgb(207 250 254)" />
          </h1>

          <div className="h-[400px] bg-zinc-500 rounded text-center p-2 overflow-auto">
            <ul>
              {itens.length > 0 ? (
                itens.map((i, index) => {
                  return (
                    <li key={index}><strong>name:</strong> {i.name} | <strong>test_id:</strong> {i.test_id}</li>
                  )
                })
              ) : <h1>Sem nenhum item por aqui</h1>}
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export { Home }
