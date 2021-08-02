import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { getStores } from "./services/api";
import Store from "./Store";

interface Props {
  max?: number;
}

export default function StoreList({max = 0}: Props) {
  const [selected, setSelected] = useState("");
  const [stores, setStores] = useState([])
  const [atividades, setAtividades] = useState<any>([])
  const [original, setOriginal] = useState<any>([]);

  useEffect(() => {
    async function fetchStores() {
      let stores = await getStores(max);
      const atividades = [...new Set(stores.map((item: any) => item['atividades']))];
      setOriginal([...stores]);
      setAtividades(atividades);
      setStores(stores);
    }
    fetchStores()
  }, [])

  const select = function (option: any) {
    if (option == selected) {setStores(original); setSelected('');}
    else {setStores(original.filter((item:any) => item["atividades"] === option));
    setSelected(option);}
  }
 
  const sort = function() {
    var aux = [...stores];
    aux.sort(function(a: any, b:any){
        if(a.nome < b.nome) { return -1; }
        if(a.nome > b.nome) { return 1; }
        return 0;
    });
    setStores(aux);
  }
  
    return (
        <React.Fragment>

<div className={`md:flex flex-col md:flex-row ${max == 0? 'md:min-h-screen': ''} w-full`}>
 {max == 0 && (
  <div  className="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ open: false }">
    <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
      <a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Atividades</a>
      <button className="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline">

      </button>
    </div>
    <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
     <a onClick={() => {setStores(original); setSelected('');} } className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Todos</a>

    {atividades.map((item: any) => {
        return (<a onClick={() => select(item) } className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">{item}</a>
        )
    })}

    <br/>
<a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Ordenar</a>

<a onClick={() => sort() } className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Ordenar A-Z</a>

               </nav>
          
  </div>)} 


<div style={{marginTop: '40px'}}>
           <p style={{textAlign: 'center'}}><span style={{fontWeight: 'bold', fontSize: '2em', textAlign: 'center'}}>
               {max != 0 ? 'Principais ' : ''}Lojas</span>
               {max != 0 ? 
          (<Link to={'/stores'} style={{float: 'right', fontWeight: 'lighter', fontSize: '1em', marginRight: '20px'}} className="bg-red-400 text-gray-50 rounded-md px-2">ver todas</Link>)
           : ''}</p>

              <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    
          {stores.map((store: any) => {
            return <Store key={store.codigo} url={store.url} nome={store.nome} codigo={store.codigo} urlFoto={store.logo} />
          })}
    
</div>
        </div>
        </div>
        </React.Fragment>
        
    );

}