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
import { Motif } from "./Motif";
import { Status } from "./enum/Status";

export class Candidate {
	id: number;
	nom: string;
	prenom: string;
	civilite: string = "M";
	adresse: string;
	dateInscription: Date;
	dateNaissance: Date;
	lieuNaissance: string;
	email: string;
	numeroTel: string;
	creePar: Utilisateur = new Utilisateur();
	technologie: Technologie = new Technologie();
	idCv: string;
	codePostal: CodePostal;
	origine: Origine = new Origine();
	entretien: Entretien = new Entretien();
	suivi: Suivi;
	sessionFormation: SessionFormation;
	statut: Status;
	relancech: Relance;
	docConsult: Boolean;
	docRefus: Boolean;
	posteEnCours: Boolean;
	mobiliteSrc: Boolean;
	mobiliteLille: MobiliteSurLille;
	cvSource: CVSource;
	cvAnonyme: Boolean = false;
	age: number;
	nomCV: string;
	diplome: string;
	dateObtentionDiplome: Date;
	motif: Motif = new Motif();
	emailSessionEnvoyer: Boolean=false;
	emailSourceurEnvoyer: Boolean=false;
	emailCandidatEnvoyer: Boolean=false;
	candidatCompetence: Array<any> = new Array();
}

