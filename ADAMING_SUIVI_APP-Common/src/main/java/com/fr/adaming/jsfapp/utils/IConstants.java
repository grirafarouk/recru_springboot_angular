package com.fr.adaming.jsfapp.utils;

import java.util.ResourceBundle;

public interface IConstants {
	ResourceBundle messageBundle = ResourceBundle.getBundle("MessageResource");

	

	public static final String Profil_Ap = "Profil_Ap";
	public static final String Profil_FR = "Profil_FR";
	public static final String resourcesPath = "resources/img/default_avatar.png";
	public static final String imagePng = "image/png";
	public static final String URL_APP = messageBundle
			.getString("url.application");

	public interface projectName {
		public static final String conseil = "adaming-conseil";
		public static final String ingenierie = "adaming-ing";
		public static final String tunisie = "adaming-tunisie";
		public static final String service ="adaming-service";
	}

	public static final String png = ".png";
	public static final String jpeg = ".jpeg";
	public static final String jpg = ".jpg";
	public static final String gif = ".gif";
	public static final String PNG = ".PNG";
	public static final String JPEG = ".JPEG";
	public static final String JPG = ".JPG";
	public static final String GIF = ".GIF";

	public static final String AD = "AD";
	public static final String AP = "AP";

	public interface typeJour {
		public static final int TRAVAIL = 1;
		public static final int FORMATION = 2;
		public static final int FERIER = 3;
		public static final int ABSENT = 4;
		public static final int CONGE = 5;
		public static final int MALADIE = 6;
		public static final int INTER = 7;
	}

	public interface typeFacture {
		public static final String AVOIR = "Avoir";
		public static final String FACTURE = "Facture";
		public static final String FACTURE_EXTERNE = "Facture Externe";
	}

	public interface periodeEssai {
		public static final String NULL = "...";
		public static final String UNMOIS = "Un mois";
		public static final String DEUXMOIS = "Deux mois";
		public static final String TROISMOIS = "Trois mois";
		public static final String QUATREMOIS = "Quatre mois";
		public static final String SIXMOIS = "Six mois";
		public static final String UNAN = "Un an";

	}
	
	public interface statutCollaborateur {
		
		public static final String CADRE="Cadre";
		public static final String ETAM="Etam";
		
	}

	public interface GROUPE_CLIENT {
		public static final String SOPRA = "SOPRA STERIA";
		public static final String INFOTEL = "INFOTEL";
		public static final String AUTRES = "Autres";
	}

	public interface ALERTE {
		public static final int ALERTE_CONTRAT = 1;
		public static final int ALERTE_INSCRIPTION_COL = 2;
		public static final int CRA_MODIF = 3;
		public static final int CHIFF_AFFAIR = 4;
		public static final int CRA_NEW = 5;
		public static final int CONGE = 6;

	}

	public interface PARAM_FACTURE {
		public static final Float TVA = new Float(20);
		public static final int DUREE_ECHEANCE = 45;
		public static final String LIBELLE_GRATUIT = "Nombre de jour gratuit";

	}

	public interface PARAM {
		public static final String RIB = "RIB";
		public static final String DOMICILLIATION = "DOMICILLIATION";
		public static final String TITULAIRE = "TITULAIRE";
		public static final String TAUX_PENALITE = "TAUX_PENALITE";
		public static final String INDEMNITE_RETARD_PAIEMENT = "INDEMNITE_RETARD_PAIEMENT";
	}

	public interface PORFIL {
		public static final String PROFIL_RH = "PROFIL_RH";
		public static final String PROFIL_COLL = "PROFIL_COLL";
		public static final String PROFIL_CLIENT = "PROFIL_CLIENT";
		public static final String Profil_SUP_ADMIN = "Profil_SUP_ADMIN";
		public static final String Profil_COMMERCIAL = "PROFIL_CM";
		public static final String Profil_AGENT = "PROFIL_AGENT";
		public static final String Profil_COMPTABLE ="PROFIL_COMPTABLE";
	}

	public interface TYPE_SEANCE {
		public static final String TRAVAIL = "P";
		public static final String FORMATION = "F";
		public static final String FERIER = "Fe";
		public static final String ABSENT = "A";
		public static final String CONGE = "C";
		public static final String MALADIE = "M";
		public static final String INTER = "I-C";

	}

	public interface TYPE_CONGE{
		
		public static final String CONGEPAYE="CP";
		public static final String CONGESANSSOLDE="CSS";
		public static final String CONGEDECES="DC";
		public static final String CONGEMARIAGE="CM";
		public static final String AUTRE="Autre";

		
	}
	
	public interface COMPETENCE_COLLAB {
		public static final String JAVA = "JAVA";
		public static final String MAINFRAME = "Mainframe";
		public static final String TEST_RECETTE = "Test/Recette";
		public static final String C_SHARP = "C#.net";
		public static final String INFRA = "Infra";
		public static final String SUPPORT = "Support";
		public static final String SAP = "SAP";
		public static final String BI = "BI";
		public static final String AMOA = "AMOA";
		public static final String WINDEV = "WINDEV";

	}

	public interface TYPE {
		public static final String Matin = "Séance matin";
		public static final String APREM = "Séance après-midi";
		public static final String TOUTE = "Toute la journée";
	}

	public interface LIBELLE {
		public static final String NBR_JR_TRAVAIL = "Les jours travaillés";
		public static final String NBR_JR_SAMEDI = "Les samedis travaillés";
		public static final String NBR_JR_DIMANCHE = "Les dimanches travaillés";
		public static final String NBR_JR_FERIE = "Les jours fériés traivaillés";
		public static final String NBR_JR_GRATUIT = "Les jours gratuits";
		public static final String NBR_SOIR = "Les soirs travaillés";
		public static final String NBR_ASP = "Les jours astreintes sans présence";
		public static final String NBR_AUTRE = "Autres";
	}

	public interface TYPE_ETABLISSEMENT {
		public static final String ADA_ING = "Adaming Ingénierie";
		public static final String ADA_SER = "Adaming Service";
		public static final String GR_ADA = "Groupe Adaming";
		public static final String GR_ADA_TUN = "Groupe Adaming Tunisie";
		public static final String INTI = "INTI";

	}

	public interface LIEN_APP {
		public static final String path = "http://188.165.118.132:8083/AdamingCras";
	}

	public class ContextParams {
		// JSF context params
		public static final String INTERPRET_EMPTY_STRING_AS_NULL = "javax.faces.INTERPRET_EMPTY_STRING_SUBMITTED_VALUES_AS_NULL";

		// PF context params
		public static final String THEME = "primefaces.THEME";
		public static final String AUTO_UPDATE = "primefaces.AUTO_UPDATE";
		public static final String PUSH_SERVER_URL = "primefaces.PUSH_SERVER_URL";
		public static final String SUBMIT = "primefaces.SUBMIT";
		public static final String DIRECTION = "primefaces.DIR";
		public static final String RESET_VALUES = "primefaces.RESET_VALUES";
		public static final String SECRET_KEY = "primefaces.SECRET";
		public static final String PFV_KEY = "primefaces.CLIENT_SIDE_VALIDATION";
		public static final String UPLOADER = "primefaces.UPLOADER";
	}

	public class RequestParams {
		// JSF request params
		public static final String PARTIAL_REQUEST_PARAM = "javax.faces.partial.ajax";
		public static final String PARTIAL_UPDATE_PARAM = "javax.faces.partial.render";
		public static final String PARTIAL_PROCESS_PARAM = "javax.faces.partial.execute";
		public static final String PARTIAL_SOURCE_PARAM = "javax.faces.source";
		public static final String PARTIAL_BEHAVIOR_EVENT_PARAM = "javax.faces.behavior.event";

		// PF request params
		public static final String RESET_VALUES_PARAM = "primefaces.resetvalues";
		public static final String IGNORE_AUTO_UPDATE_PARAM = "primefaces.ignoreautoupdate";
	}
	
	
	public class TypeMessage{
		
		public static final String DEMANDE_DOCUMENT="Demande de document";
		public static final String DEMANDE_INFORMATION ="Demande d’information";
		public static final String DEMANDE_PRISE_RENDEZ_VOUS="Demande de rendez-vous";
		public static final String AUTRES_DEMANDES="Autres Demandes";
		public static final String BUGUE="Bugue";
	}

	public class EtatDemande{
		
		public static final String ETAT_ENCOURS="En Cours";
		public static final String ETAT_IMPORTANT ="Important";
		public static final String ETAT_TRAITEE="Traitée";
		public static final String ETAT_CLOTUREE="Clôturée";
	}
	public static final String DOWNLOAD_COOKIE = "primefaces.download";

	public final static String LIBRARY = "primefaces";

	public final static String CUSTOM_EVENT = "CUSTOM_EVENT";

	public final static String PUSH_PATH = "/primepush";

	public static final String DYNAMIC_CONTENT_PARAM = "pfdrid";
	public static final String DYNAMIC_CONTENT_CACHE_PARAM = "pfdrid_c";

	public final static String FRAGMENT_ID = "primefaces.fragment";
	public final static String FRAGMENT_AUTO_RENDERED = "primefaces.fragment.autorendered";

	public final static String DIALOG_OUTCOME = "dialog.outcome";
	public final static String DIALOG_OPTIONS = "dialog.options";
	public final static String DIALOG_PARAMS = "dialog.params";
	public final static String DIALOG_SOURCE_COMPONENT = "dialog.source.component";
	public final static String DIALOG_SOURCE_WIDGET = "dialog.source.widget";
	public final static String DIALOG_CONVERSATION_PARAM = "pfdlgcid";
	public final static String ADRESSE_MAIL_DEMANDE_CRA ="mfrikha@adaming.fr";
	public final static String ADRESSE_MAIL_COMPTABLE="mohamedanowar.frikha@gmail.com";

}
