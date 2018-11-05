export const BACK_END_URL = "http://192.168.1.205:8090/api"
export const BACK_END_URL_SECURITY = "http://192.168.1.205:8090"
export const NAVIGATION_RULES = {
    login : {url:'login'},
    dashboard :{
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
};
export const PHONE_MASK =[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
export const PHONE_MASK_LABEL ="00-00-00-00";

export const DATE_FORMAT="dd/M/yyyy";

