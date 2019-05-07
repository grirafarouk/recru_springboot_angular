import { Utilisateur } from "../../models/Utilisateur";

export class CandidateDto {
    id: number;
    nom: string;
    prenom: string;
    numeroTel: number;
    email: string;
    mobilite: string;
    mobiliteLille: string;
    poleEmploi: string;
    cvSource: string;
    noteTotale: string;
    dateInscription: Date;
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
    origine: string;
    sourceur:Utilisateur;
    chargeur:Utilisateur;
    source:String;
    charge:String;
    
  }
  
  