import { Lieu } from "./Lieu";
import { Utilisateur } from "./Utilisateur";

export class Entretien{
    id:number;
    disponible:string;
    relance:boolean;
    date:Date;
    dateRelance:Date;
    confirmation:boolean;
    pertinence;
    lieu:Lieu;
    charge:Utilisateur;
    commentaire:string;
}