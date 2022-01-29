import dbConnect from "../../db/dbConnect";

export default async function handler(req, res) {
    const { method }=req;
    const db=await dbConnect();
    const session=db.session();
    
    switch (method) {
        case "GET":
            const skills = [];
            const softwares = [];
            const queryForSkills = `MATCH (s:SKILLS)-[k:KNOWS]->(sk:SKILL) RETURN sk,k `;
            const queryForSoftwares = `MATCH (softwares:SOFTWARES)-[k:KNOWS]->(software:SOFTWARE) RETURN software,k`;
            try {
              const readResult = await session.readTransaction((tx) =>
                tx.run(queryForSkills)
              );
              readResult.records.forEach((record) => {
                const skill = record.get('sk');
                const skillLevel = record.get('k');
                skills.push({
                  ...skill.properties,
                  id: skill.identity.low,
                  level: skillLevel.properties.level,
                });
              });
              const readResult2 = await session.readTransaction((tx) =>
                tx.run(queryForSoftwares)
              );
              readResult2.records.forEach((record) => {
                const software = record.get('software');
                const softwareLevel = record.get('k');
                softwares.push({
                  ...software.properties,
                  id: software.identity.low,
                  level: softwareLevel.properties.level,
                });
              });
              res.status(200).json({skills,softwares})
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
  