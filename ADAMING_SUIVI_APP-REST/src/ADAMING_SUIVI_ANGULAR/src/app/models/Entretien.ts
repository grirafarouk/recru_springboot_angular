import { Disponibilite } from './Disponibilite';
import { Lieu } from "./Lieu";
import { Utilisateur } from "./Utilisateur";

export class Entretien{
    id:number;
    disponible: Disponibilite = new Disponibilite();;
    relance:boolean;
    date:Date;
    dateRelance:Date;
    confirmation:boolean;
    pertinence;
    lieu:Lieu;
    charge:Utilisateur;
    commentaire:string;
}