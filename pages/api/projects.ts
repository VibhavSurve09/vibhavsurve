import dbConnect from "../../db/dbConnect";

export default async function handler(req, res) {
   const { method }=req
   const db=await dbConnect()
   const session=db.session()
   switch(method)
   {
       case "GET":
        const allProjects = [];
        const queryForProjects =
          'MATCH (projects:PROJECT)-[using:USING]->(skill:SKILL) RETURN projects,skill,using';
        try {
          const readResult = await session.readTransaction((tx) =>
            tx.run(queryForProjects)
          );
      
          readResult.records.forEach((record) => {
            const project = record.get('projects');
            const skill = record.get('skill');
            const tags = record.get('using');
            allProjects.push({
              ...project.properties,
              id: project.identity.low,
              category: skill.properties.name,
              techTags: tags.properties.tags.split(','),
            });
          });
          res.status(200).json(allProjects)
        } catch {
            res.status(404).json({success:false})
        }
        finally{
            await session.close()
            await db.close()
        }
           break;
        default:
            res.status(404).json({success:false})
            break;
   }
  }
  