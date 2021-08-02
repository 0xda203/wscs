const ParsingClient = require('sparql-http-client/ParsingClient')
const client = new ParsingClient({ endpointUrl: 'http://localhost:3030/com', updateUrl: 'http://localhost:3030/com', storeUrl: 'http://localhost:3030/com' })
export default client;