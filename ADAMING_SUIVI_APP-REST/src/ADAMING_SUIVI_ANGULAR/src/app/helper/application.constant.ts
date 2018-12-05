export const BACK_END_URL = "http://localhost:9190/ADAMING_SUIVI_APP-REST/api"
export const BACK_END_URL_SECURITY = "http://localhost:9190/ADAMING_SUIVI_APP-REST"
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

