import { driver } from "neo4j-driver-core";
import dbConnect from "../../db/dbConnect";

export default async function handler(req, res) {
    const { method }=req;
    const db=await dbConnect();
    const session=db.session()

    switch (method) {
        case "GET":
             const servicesData = [];
            const query = `MATCH (servicesProvided:SERVICE_PROVIDED) RETURN servicesProvided`;
            try{
                const rs = await session.readTransaction((tx) => tx.run(query));
                rs.records.forEach((record) => {
                 const services = record.get('servicesProvided');
                servicesData.push({ ...services.properties, id: services.identity.low });
                 });
                 res.status(200).json(servicesData)
            }
            catch{
                res.status(404).json({success:false})
            }
            finally{
                await session.close();
                await db.close();
            }
            break;
    
        default:
            res.status(404).json({success:false})
            break;
    }
  }
  