import { Formation } from "../views/Sessions-Formations/formation";
import { ClientSession } from "./ClientSession";

export class SessionFormation{
    id:number;
    factif:boolean=false;
    dateDemarrage:Date;
    formation:Formation = new Formation();
    dateFin:Date;
    nombrePlace:number;
    client:ClientSession;
}