/* ******************Creation de la table  reportingcandidat****************** */
CREATE TABLE `reportingcandidat` AS 
select `this_`.`ID_CV` AS `ID_CV`, `this_`.`ID` AS `ID_Candidat`, `this_`.`NOM` AS 
`Nom_Candidat`, `this_`.`PRENOM` AS `Prenom_Candidat`, `this_`.`NUMERO_TEL` AS `NUMERO_TEL_Candidat`, `this_`.`EMAIL` AS 
`Email_Candidat`, `this_`.`DATE_INSCRIPTION` AS `DATE_INSCRIPTION`, `this_`.`DIPLOME` AS `DIPLOME`, 
`this_`.`DATE_OBTENTION_DIPLOME` AS `DATE_OBTENTION_DIPLOME`, `utilisateu5_`.`NOM` AS `Nom_charge`, `utilisateu5_`.`PRENOM` 
AS `Prenom_charge`, `entretien4_`.`PERTINENCE` AS `Pertinence`, `entretien4_`.`DISPONIBLE` AS `Disponible`, 
`entretien4_`.`DATE` AS `DATE_ENTRETIEN`, `utilisateu3_`.`NOM` AS `Nom_sourceur`, `utilisateu3_`.`PRENOM` AS 
`Prenom_Sourceur`, `lieu6_`.`libelle` AS `Lieu_Entretien`, `technologie`.`libelle` AS `TECHNOLOGIE`, `code_postal`.`REGION` 
AS `REGION`, `origine`.`libelle` AS `ORIGINE`, round((((((((((`suivi10_`.`NOTE_PRESENTATION` * 0.1) + 
(`suivi10_`.`NOTE_SAVOIR` * 0.1)) + (`suivi10_`.`NOTE_ATTRAIT` * 0.08)) + (`suivi10_`.`NOTE_FIABILITE` * 0.1)) + 
(`suivi10_`.`NOTE_PRET` * 0.12)) + (`suivi10_`.`NOTE_RESULTAT` * 0.03)) + (`suivi10_`.`NOTE_COHERENCE` * 0.15)) + 
(`suivi10_`.`NOTE_PISTES` * 0.1)) + (`suivi10_`.`NOTE_MOBILIOTE` * 0.1)),0) AS `NOTE_TOTALE`, `formation9_`.`NOM` AS 
`Formation`, `sessionfor8_`.`DATE_DEMARRAGE` AS `DATE_DEMARRAGE_Formation`  from ((((((((((`candidat` `this_` join 
`utilisateur` `utilisateu3_` on((`this_`.`CREE_PAR` = `utilisateu3_`.`ID`)))  left join `entretien` `entretien4_` 
on((`this_`.`ENTRETIEN` = `entretien4_`.`ID`)))  left join `utilisateur` `utilisateu5_` on((`entretien4_`.`CHARGE` = 
`utilisateu5_`.`ID`)))  left join `lieu` `lieu6_` on((`entretien4_`.`LIEU` = `lieu6_`.`ID`)))  left join `session_formation` 
`sessionfor8_` on((`this_`.`SESSION_FORMATION` = `sessionfor8_`.`ID`)))  left join `formation` `formation9_` 
on((`sessionfor8_`.`FORMATION` = `formation9_`.`ID`)))  left join `suivi` `suivi10_` on((`this_`.`SUIVI` = 
`suivi10_`.`ID`)))  left join `technologie` ON ((`this_`.`TECHNOLOGIE` = `technologie`.`ID`)))  left join `origine` ON 
((`this_`.`ORIGINE` = `origine`.`ID`)))  left join `code_postal` ON ((`this_`.`CODE_POSTAL` = `code_postal`.`ID`)))
 
 
 /* ******************INdexation Reporting Candidat******************* */
 
 CREATE INDEX IX_reportingcandidat  	on reportingcandidat  (	ID_Candidat	);

 /* ******************Insertion des données  reportingcandidat****************** */

INSERT INTO reportingcandidat
select `this_`.`ID_CV` AS `ID_CV`, `this_`.`ID` AS `ID_Candidat`, `this_`.`NOM` AS 
`Nom_Candidat`, `this_`.`PRENOM` AS `Prenom_Candidat`, `this_`.`NUMERO_TEL` AS `NUMERO_TEL_Candidat`, `this_`.`EMAIL` AS 
`Email_Candidat`, `this_`.`DATE_INSCRIPTION` AS `DATE_INSCRIPTION`, `this_`.`DIPLOME` AS `DIPLOME`, 
`this_`.`DATE_OBTENTION_DIPLOME` AS `DATE_OBTENTION_DIPLOME`, `utilisateu5_`.`NOM` AS `Nom_charge`, `utilisateu5_`.`PRENOM` 
AS `Prenom_charge`, `entretien4_`.`PERTINENCE` AS `Pertinence`, `entretien4_`.`DISPONIBLE` AS `Disponible`, 
`entretien4_`.`DATE` AS `DATE_ENTRETIEN`, `utilisateu3_`.`NOM` AS `Nom_sourceur`, `utilisateu3_`.`PRENOM` AS 
`Prenom_Sourceur`, `lieu6_`.`libelle` AS `Lieu_Entretien`, `technologie`.`libelle` AS `TECHNOLOGIE`, `code_postal`.`REGION` 
AS `REGION`, `origine`.`libelle` AS `ORIGINE`, round((((((((((`suivi10_`.`NOTE_PRESENTATION` * 0.1) + 
(`suivi10_`.`NOTE_SAVOIR` * 0.1)) + (`suivi10_`.`NOTE_ATTRAIT` * 0.08)) + (`suivi10_`.`NOTE_FIABILITE` * 0.1)) + 
(`suivi10_`.`NOTE_PRET` * 0.12)) + (`suivi10_`.`NOTE_RESULTAT` * 0.03)) + (`suivi10_`.`NOTE_COHERENCE` * 0.15)) + 
(`suivi10_`.`NOTE_PISTES` * 0.1)) + (`suivi10_`.`NOTE_MOBILIOTE` * 0.1)),0) AS `NOTE_TOTALE`, `formation9_`.`NOM` AS 
`Formation`, `sessionfor8_`.`DATE_DEMARRAGE` AS `DATE_DEMARRAGE_Formation`  from ((((((((((`candidat` `this_` join 
`utilisateur` `utilisateu3_` on((`this_`.`CREE_PAR` = `utilisateu3_`.`ID`)))  left join `entretien` `entretien4_` 
on((`this_`.`ENTRETIEN` = `entretien4_`.`ID`)))  left join `utilisateur` `utilisateu5_` on((`entretien4_`.`CHARGE` = 
`utilisateu5_`.`ID`)))  left join `lieu` `lieu6_` on((`entretien4_`.`LIEU` = `lieu6_`.`ID`)))  left join `session_formation` 
`sessionfor8_` on((`this_`.`SESSION_FORMATION` = `sessionfor8_`.`ID`)))  left join `formation` `formation9_` 
on((`sessionfor8_`.`FORMATION` = `formation9_`.`ID`)))  left join `suivi` `suivi10_` on((`this_`.`SUIVI` = 
`suivi10_`.`ID`)))  left join `technologie` ON ((`this_`.`TECHNOLOGIE` = `technologie`.`ID`)))  left join `origine` ON 
((`this_`.`ORIGINE` = `origine`.`ID`)))  left join `code_postal` ON ((`this_`.`CODE_POSTAL` = `code_postal`.`ID`)))