import React from "react"
import { getPath } from "./services/api"

interface Props {
  nome: string
  urlFoto: string
  codigo: string
  url: string
}

export default function Store({ nome, urlFoto, url, codigo }: Props) {
  const [showModal, setShowModal] = React.useState(false)
  const [caminhos, setCaminhos] = React.useState<string[]>([])

  React.useEffect(() => {
    async function fetchPath() {
      var z = await getPath()
      var caminhos2 = z.filter((item: any) => item.destino == nome)

      var arr = []

      for (let i = 0; i < caminhos2.length; i++) {
        arr.push(
          `ANDE ${parseInt(caminhos2[i].distancia)} metros a ${caminhos2[i].direcao} PELO ${caminhos2[i].passar_por}`,
        )
      }

      setCaminhos(arr)
      console.log(arr)
    }

    fetchPath()
  }, [])

  async function sayHello() {
    var z = await getPath()
    var caminhos2 = z.filter((item: any) => item.destino == nome)

    var arr = []

    for (let i = 0; i < caminhos2.length; i++) {
      arr.push(
        `ANDE ${caminhos2[i].distancia}m a ${caminhos2[i].direcao} PELO ${caminhos2[i].passar_por}`,
      )
    }

    setCaminhos(arr)

    console.log(arr)
    // if(nome == "Saraiva") console.log(nome);
  }

  const randomColor = Math.floor(Math.random()*16777215).toString(16);

  return (
    <React.Fragment>
      <div>
        <img
          src={urlFoto}
          className="w-full object-cover object-center rounded-lg shadow-md "
          style={{
            height: "300px",
            objectFit: "scale-down",
            padding: 50,
          }}
        />

        <div className="relative px-4 -mt-16  ">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-baseline">
              <a
                href={url}
                className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide"
              >
                site
              </a>
              <button
                onClick={() => setShowModal(true)}
                className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide"
              >
                Navegação
              </button>
            </div>

            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
              <a href={url}>{nome}</a>
            </h4>
          </div>
        </div>
      </div>

      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Rota para {nome}
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative flex-auto">
                    <div className="flex flex-col justify-center m-auto">
                      {caminhos.map((item: any, index: number) => {
                        return (
                          <div  className="flex md:flex-row flex-col bg-teal-200 justify-center md:text-left text-center">
                            <div className="flex flex-col justify-center items-center relative">
                              <div className="w-56 h-2 md:flex hidden justify-center">
                                <div className="h-full border-dashed"></div>
                              </div>
                              <div className="rounded-full w-12 h-12 text-xl text-teal-100 bg-teal-700 font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">
                                {index + 1}
                              </div>
                              <img
                                alt="step1"
                                className="w-20 h-20 rounded-full shadow my-5 object-scale-down"
                                src="https://image.flaticon.com/icons/svg/1330/1330216.svg"
                              />
                              {(index != caminhos.length -1) && (
                              <div className="w-56 h-12 md:flex hidden justify-center">
                                <div className="h-full border-r-4 border-teal-300 border-dashed"></div>
                              </div>)
                              }
                            </div>
                            <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-teal-200">
                              <div className="text-xs uppercase font-bold text-teal-500">
                                Passo {index + 1}
                              </div>
                              <div className="mt-4 text-teal-800">
                                {item}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </React.Fragment>
  )
}
