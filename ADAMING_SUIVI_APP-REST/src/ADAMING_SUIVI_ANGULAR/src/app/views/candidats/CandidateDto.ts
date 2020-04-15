import { Utilisateur } from "../../models/Utilisateur";

export class CandidateDto {
    id: number;
    nom: string;
    prenom: string;
    numeroTel: string;
    email: string;
    pertinence:number;
    mobilite: string;
    mobiliteLille: string;
    poleEmploi: string;
    cvSource: string;
    noteTotale: string;
    dateInscription:Date;
    statut: string;
    technologie: string;
    region: string;
    nomSourceur: string;
    prenomSourceur: string;
    disponibilite: string;
    relancer: boolean;
    dateRelance: Date;
    dateDebut: Date;
    dateFin: Date;
    dateEntretien: Date;
    lieuEntretien: string;
    confirmationRdv: boolean;
    nomCharge: string;
    prenomCharge: string;
    commentaire: string;
    critereRecheche: string;
    dateDemarrageFormation:Date;
     origine: string;
    sourceur:Utilisateur=new Utilisateur();
    chargeur:Utilisateur=new Utilisateur();
    source:String;
    charge:String;
    
  }
  
  