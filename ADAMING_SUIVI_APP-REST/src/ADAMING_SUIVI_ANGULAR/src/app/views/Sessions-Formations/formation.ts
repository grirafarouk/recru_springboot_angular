import { Technologie } from "../../models/Technologie";
import { Lieu } from "../../models/Lieu";
import { TypeFormation } from "../../models/TypeFormation";

export class Formation {
    code: string;
    nom: string;
    lieu :  Lieu=new Lieu();
    technologie: Technologie = new Technologie();
    typeFormation: TypeFormation = new TypeFormation();

  }
  
  