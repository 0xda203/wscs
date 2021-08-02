import client from './sparql-client';

export async function getStores(limit: number = 0) {
    const query = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX com: <http://www.each.usp.br/ach2098/comercio#>
        PREFIX co: <http://purl.org/ontology/co/core#>

        SELECT ?codigo ?nome ?logo ?url ?atividades WHERE {
            ?loja rdf:type com:Loja ;
                com:codigo ?codigo;
                com:nome ?nome ;
                com:logoUrl ?logo; 
                com:url ?url;
                  com:nela_ocorre ?atividades.
            }${limit > 0 ? `LIMIT ${limit}` : ''}
    `;

    return client.query.select(query).then((res: any) => {
        return res.map((item: any) => {
            for (let key in item) {
                let value = item[key];
                if (value.hasOwnProperty('value')) item[key] = value.value.replace('http://www.each.usp.br/ach2098/comercio#', '');
            }
            return item;
        });
    });
  }

export async function getPath() {
    const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX com: <http://www.each.usp.br/ach2098/comercio#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX co: <http://purl.org/ontology/co/core#>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    
    select distinct ?super ?passar_por ?distancia ?direcao ?destino  { 
      ?super rdf:type com:Entrada.
      ?super com:conecta* ?mid .
      FILTER ( ?super != ?mid )
      ?mid com:conecta+ ?destino .
      ?mid rdf:type ?passar_por .
      ?mid com:distancia ?distancia .
      ?mid com:direcao ?direcao.
      ?mid rdf:type/rdfs:subClassOf* com:Estrutura .
       ?destino rdf:type/rdfs:subClassOf* com:Loja .
    } 
`;

return client.query.select(query).then((res: any) => {
    return res.map((item: any) => {
        for (let key in item) {
            let value = item[key];
            if (value.hasOwnProperty('value')) item[key] = value.value.replace('http://www.each.usp.br/ach2098/comercio#', '');
        }
        return item;
    });
});
}

export async function makeRequest(products: string, date: string, total: string, codigo: string) {
    var codigoproduto = Date.now();
    const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX com: <http://www.each.usp.br/ach2098/comercio#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX co: <http://purl.org/ontology/co/core#>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    
    INSERT DATA { 
        <http://www.each.usp.br/ach2098/comercio#${codigoproduto}> rdf:type owl:NamedIndividual, com:Pedido;
        com:codigo "${codigoproduto}";
         com:inclui ${products};
         com:preco "${total}"^^xsd:double;
         com:data "${date}";
         com:codigoUsuario "${codigo}";
      };
      
`;

console.log(query);

return client.query.update(query);
}


export async function getProducts(limit: number = 0) {
    const query = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX com: <http://www.each.usp.br/ach2098/comercio#>
        PREFIX co: <http://purl.org/ontology/co/core#>
        
        SELECT (?comercializa as ?uri) ?codigo ?nome ?preco ?url ?urlFoto ?quantidade  {
            ?loja rdf:type com:Loja;
                com:vende ?comercializa.
            ?comercializa com:nome ?nome;
                com:codigo ?codigo;
                com:preco ?preco;
                com:urlFoto ?urlFoto;
                com:url ?url;
                com:quantidade ?quantidade;
            }${limit > 0 ? `LIMIT ${limit}` : ''}
    `;

    return client.query.select(query).then((res: any) => {
        return res.map((item: any) => {
            for (let key in item) {
                let value = item[key];
                if (value.hasOwnProperty('value')) item[key] = value.value;
                if (key == "preco") item[key] = parseFloat(value.value);
            }
            return item;
        });
    });
}

export async function login(email: string, password: string) {
    const query = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX com: <http://www.each.usp.br/ach2098/comercio#>
        PREFIX co: <http://purl.org/ontology/co/core#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        
        SELECT ?codigo ?nome ?email WHERE {
            ?usuario rdf:type com:Usuario.
            ?usuario com:email ?email.
            ?usuario com:nome ?nome.
            ?usuario com:codigo ?codigo.
            ?usuario com:senha ?password.
            FILTER (?email = ?iemail).
            FILTER (?password = ?ipassword).
            BIND ("${email}" as ?iemail).
            BIND ("${password}" AS ?ipassword)
        } LIMIT 1
    `;

    return client.query.select(query).then((res: any) => {
        return res.map((item: any) => {
            for (let key in item) {
                let value = item[key];
                if (value.hasOwnProperty('value')) item[key] = value.value;
            }
            return item;
        });
    });
}

