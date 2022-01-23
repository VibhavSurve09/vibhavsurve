const dbConnect = async ()=>{
    const neo4j = require('neo4j-driver')

 

    const uri =process.env.URI;
   
    const user = process.env.USER;
   
    const password = process.env.PASSWORD;
   
    
   
    return neo4j.driver(uri, neo4j.auth.basic(user, password))
   
}
export default dbConnect;