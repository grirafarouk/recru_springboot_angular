import { CodePostal } from "./CodePostal";
import { Utilisateur } from "./Utilisateur";
import { Technologie } from "./Technologie";
import { Origine } from "./Origine";
import { Entretien } from "./Entretien";
import { Suivi } from "./Suivi";
import { SessionFormation } from "./SessionFormation";
import { Relance } from "./Relance";
import { MobiliteSurLille } from "./MobiliteSurLille";
import { CVSource } from "./CVSource";

export class Candidate {	
	  id:number;
	  nom:String;
	  prenom:String;
	  civilite:String="M";
	  adresse:String;
	  dateInscription:Date;
	  dateNaissance:Date;
	  lieuNaissance:String;
	  email:String;
	  numeroTel:String;
	  creePar:Utilisateur= new Utilisateur();
	  technologie:Technologie=new Technologie();
	  idCv:String;
	  codePostal:CodePostal ;
	  origine:Origine=new Origine();
	  entretien:Entretien;
	  suivi:Suivi;
	  sessionFormation:SessionFormation;
	  statut:String;
	  relancech:Relance;
	  docConsult:Boolean;
	  docRefus:Boolean;
	  posteEnCours:Boolean;
	  mobiliteSrc:Boolean;
	  mobiliteLille:MobiliteSurLille;
	  cvSource:CVSource;
	  cvAnonyme:Boolean=false;
	  age:String;
	  nomCV:String;
	  diplome:String;
	  dateObtentionDiplome:Date;
	  motif:String;
	  emailSessionEnvoyer:Boolean;
    emailSourceurEnvoyer:Boolean;
    candidatCompetence:Array<any>= new Array();
  }
  
  