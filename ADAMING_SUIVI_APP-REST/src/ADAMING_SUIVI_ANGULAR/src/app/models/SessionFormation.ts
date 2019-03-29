import { Formation } from "../views/Sessions-Formations/formation";
import { ClientSession } from "./ClientSession";

export class SessionFormation{
    id:number;
    fActif:boolean;
    dateDemarrage:Date;
    formation:Formation = new Formation();
    dateFin:Date;
    nombrePlace:number=15;
    client:ClientSession=new ClientSession();
}