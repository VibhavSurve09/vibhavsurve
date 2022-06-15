
export interface IService {
  icon: string;
  name: string;
  about: string;
}

export interface ISkills{
  name:string,
  level:string,
  icon:string
}

export interface IProjects{
  name:string,
  _id:Object
  description:string,
  image_path:string,
  deployed_url:string,
  github_url:string,
  category:Category[],
  techTags:string[]
}

export type Category= "upcoming"|"python"|"javascript"|"java"|"rust"