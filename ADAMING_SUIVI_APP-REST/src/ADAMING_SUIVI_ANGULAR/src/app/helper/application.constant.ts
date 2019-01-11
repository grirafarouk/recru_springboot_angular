import { environment } from "../../environments/environment";

export const BACK_END_URL = environment.BACK_END_URL + "/api"
export const BACK_END_URL_SECURITY = environment.BACK_END_URL 
export const NAVIGATION_RULES = {
    error404: {
        url: '404'
    },
    error500: {
        url: '500'
    },
    restpwd: {
        url: 'resetpwd'
    },
    login: {
        url: 'login'
    },
    forgetpwd:
    {
        url: 'forgetpwd'
    },
    dashboard: {
        ficheCandidatSession:'ficheCandidatSession/:id',
        ficheCvRelance:'ficheCvRelanceComponent/:id',
        url: 'dashboard'
    },
    candidats: {
        url: "candidats",
        newCancidat: 'nouveauxCandidat',
        listeNouveauxCandidats: 'listeNouveauxCandidats',
        listeTousCandidats: 'listeTousCandidats',
        listeCandidatArelancer: 'listeCandidatArelancer',
        details: 'details/:id'
    },
    entretien: {
        url: 'entretien',
        list: 'list',
        details: 'details/:id'
    },
    sessionsFormationsAcceuil: {
        url: 'sessionsFormationsAcceuil',
        listAcceuil: 'listAcceuil',
        details: 'details/:id'
    },
    sessionsFormations: {
        url: 'sessionsFormations',
        enCours: 'enCours',
        clotures: 'clotures',
        details: 'details/:id'
    }
    , reporting: {
        url: 'reporting',
        listeReporting: 'listeReporting',
        reportingSourceur: 'reportingSourceur',
        details: 'details/:id'
    },
    administration : {
        url: 'administration',
        competences:'competences',
        utilisateurs:'utilisateurs',
        lieux:'lieux',
        origineCV:'origineCV',
        technologies:'technologies',
        typeFormation:'typeFormation',
        filiere:'filiere',
        clientSession:'clientSession',
        motifHorsCible:'motifHorsCible',
        region:'region'
    }
};
export const PHONE_MASK = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
export const PHONE_MASK_LABEL = "00-00-00-00-00";

export const DATE_FORMAT = "dd/M/yyyy";

export const DATE_FORMAT_MOMENT = "DD/MM/YYYY"

export const ChartColors : any[]=[
    {
      backgroundColor:["#FF7360","#6FC8CE","#7FFFD4","#FFFCC4","#B9E8E0","#FFABF6","#01FBBA",
                       "#FFD700","#DAA520","#808080","#808080","#008000","#ADFF2F","#F0FFF0","#FF69B4","#CD5C5C","#4B0082",	 	
                       "#FFFFF0","#F0E68C","#E6E6FA","#FFF0F5","#7CFC00","#FFFACD","#ADD8E6","#F08080","#E0FFFF","#FAFAD2",	 	
                       "#D3D3D3","#D3D3D3","#90EE90","#FFB6C1","#FFA07A","#87CEFA","#778899","#778899","#B0C4DE","#FFFFE0",	 	
                       "#00FF00","#32CD32","#FAF0E6","#FF00FF","#800000","#66CDAA","#0000CD","#BA55D3","#9370DB","#3CB371",
                       "#F0F8FF","#FAEBD7","#00FFFF","#7FFFD4","#F0FFFF","#F5F5DC","#FFE4C4","#000000","#FFEBCD","#0000FF",	 	
                       "#8A2BE2","#A52A2A","#DEB887","#5F9EA0","#7FFF00","#D2691E","#FF7F50","#6495ED","#FFF8DC","#DC143C",	 	
                       "#00FFFF","#00008B","#008B8B","#B8860B","#A9A9A9","#006400","#BDB76B","#8B008B","#556B2F","#FF8C00", 	
                       "#9932CC","#8B0000","#E9967A","#8FBC8F","#483D8B","#2F4F4F","#2F4F4F","#00CED1","#9400D3","#FF1493",
                       "#00BFFF","#69696","#696969","#1E90FF","#B22222","#FFFAF0","#228B22","#FF00FF","#DCDCDC","#F8F8FF"]
    }
   ];

