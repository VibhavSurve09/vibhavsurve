// import { NextApiRequest, NextApiResponse } from "next";
// import { useReadCypher } from "use-neo4j";

// export default function handler(req:NextApiRequest, res:NextApiResponse) {
//     const { method }=req
//     switch(method){
//         case "GET":
//             try{
//                 const query=`MATCH (servicesProvided:SERVICE_PROVIDED) return (serviceProvided)`;
//                 const { records }=useReadCypher(query)
//                 const services=first
//                 useReadCypher
//             }catch{
//                 res.status(404).json({"success":false})
//             }

//         break
//     }
//   }
  