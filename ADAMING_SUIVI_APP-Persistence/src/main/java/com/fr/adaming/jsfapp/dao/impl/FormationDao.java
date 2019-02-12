package com.fr.adaming.jsfapp.dao.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dto.FormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.IFormationDao;
import com.fr.adaming.jsfapp.model.Formation;

@Repository("formationDao")
public class FormationDao extends ManagerDao<Formation, Long> implements IFormationDao {

	private static final long serialVersionUID = 1L;

	private static final String FORMAT_DATE = "yyyy-MM-dd";
	private static final String FORMATION_NOM_LIKE = " and formation.NOM LIKE '%";
	private static final String FORMATION_CODE_LIKE = " and formation.CODE LIKE '%";
	private static final String TECH_LIB_LIKE = " and technologie.libelle LIKE '%";
	private static final String LIEU_LIB_LIKE = " and lieu.libelle LIKE '%";
	private static final String TFORM_LIB_LIKE = " and type_formation.libelle LIKE '%";
	private static final String AND_CLAUSE = " and '";
	private static final String GROUPE_BY = " group by formation.ID ";

	@Override
	public Formation rechercherSessionsFormationParCode(String code) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Formation.class);
		DaoUtils.addLikeRestrictionIfNotNull(crit, "code", code);

		return (Formation) crit.uniqueResult();
	}

	@Override
	public Formation rechercherSessionsFormationParCode(FormationDto formation) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Formation.class);
		DaoUtils.addLikeRestrictionIfNotNull(crit, "code", formation.getCode());
		DaoUtils.addEqRestrictionIfNotNull(crit, "id", formation.getId());

		return (Formation) crit.uniqueResult();
	}

	@Override
	public List<Formation> rechercherFormations(SessionFormationDto searchDto) {
		String queryString = "select * from formation ";
		queryString += "left outer join lieu  on formation.LIEU=lieu.ID left outer join technologie  on formation.TECHNOLOGIE=technologie.ID left outer join type_formation  on formation.TYPE_FORMATION=type_formation.ID ";
		if (searchDto.getId() != null || searchDto.getDateDem() != null || searchDto.getDateFin() != null) {
			queryString += " Inner Join session_formation ON formation.ID = session_formation.FORMATION where session_formation.ID IS NOT NULL ";
			queryString += " and (select count(*) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '1' )>0";
		} else {
			queryString += " where 1=1";

		}
		queryString = critereRechercheFormationEnCours(searchDto, queryString);
		queryString = queryString + GROUPE_BY;
		SQLQuery st = getSession().createSQLQuery(queryString);
		@SuppressWarnings("unchecked")
		List<Formation> liste = (List<Formation>) st.addEntity(Formation.class).list();

		return liste;
	}

	public boolean testerNullAndEmptyStringObject(String test, Object ob) {

		return ((test != null) && (!test.isEmpty()) && (ob != null));
	}

	public boolean testerNullAndEmptyObjectObject(Object ob, Object test, Object ob2) {

		return ((ob != null) && (test != null) && (ob2 != null));
	}

	public boolean testerNullAndEmptyObject(Object ob, Object test) {

		return ((ob != null) && (test != null));
	}

	@Override
	public List<Formation> rechercherFormationsEnCours(SessionFormationDto searchDtoEnCours) {
		String queryStringEnCours = "select * from formation Inner Join session_formation ON formation.ID = session_formation.FORMATION left outer join lieu  on formation.LIEU=lieu.ID left outer join technologie  on formation.TECHNOLOGIE=technologie.ID left outer join type_formation  on formation.TYPE_FORMATION=type_formation.ID where session_formation.ID IS NOT NULL  ";
		queryStringEnCours += " and (select count(*) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '1' )>0";
		if (searchDtoEnCours != null) {
			queryStringEnCours = critereRechercheFormationEnCours(searchDtoEnCours, queryStringEnCours);
		}
		queryStringEnCours = queryStringEnCours + GROUPE_BY;
		SQLQuery st = getSession().createSQLQuery(queryStringEnCours);
		@SuppressWarnings("unchecked")
		List<Formation> liste = (List<Formation>) st.addEntity(Formation.class).list();

		return liste;
	}

	@Override
	public List<Formation> rechercherFormationsClotures(SessionFormationDto searchDtoClotures) {
		String queryStringClotures = "select * from formation Inner Join session_formation ON formation.ID = session_formation.FORMATION left outer join lieu  on formation.LIEU=lieu.ID left outer join technologie  on formation.TECHNOLOGIE=technologie.ID left outer join type_formation  on formation.TYPE_FORMATION=type_formation.ID where session_formation.ID IS NOT NULL  ";
		queryStringClotures += " and (select count(*) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '0' )>0";
		if (searchDtoClotures != null) {

			queryStringClotures = critereRechercheFormationCloture(searchDtoClotures, queryStringClotures);
		}
		queryStringClotures = queryStringClotures + GROUPE_BY;
		SQLQuery st = getSession().createSQLQuery(queryStringClotures);

		@SuppressWarnings("unchecked")
		List<Formation> liste = (List<Formation>) st.addEntity(Formation.class).list();

		return liste;
	}

	public List<Formation> rechercherFormationParSessionFormation(FormationDto formationDto,
			SessionFormationDto sessionFormationDto) {
		DateFormat df = new SimpleDateFormat(FORMAT_DATE);
		String queryString = "select * from formation left outer join session_formation ON formation.ID = session_formation.FORMATION left outer join lieu  on formation.LIEU=lieu.ID left outer join technologie  on formation.TECHNOLOGIE=technologie.ID left outer join type_formation  on formation.TYPE_FORMATION=type_formation.ID where 1=1";

		if (formationDto != null) {
			if (isNullOrEmptyString(formationDto.getCode())) {

				queryString += FORMATION_CODE_LIKE + formationDto.getCode() + "%'";
			}
			if (isNullOrEmptyString(formationDto.getNom())) {
				queryString += FORMATION_NOM_LIKE + formationDto.getNom() + "%'";
			}
			if (formationDto.getTechnologie() != null) {
				queryString += TECH_LIB_LIKE + formationDto.getTechnologie().getLibelle() + "'";
			}
			if (formationDto.getLieu() != null) {
				queryString += LIEU_LIB_LIKE + formationDto.getLieu().getLibelle() + "'";
			}
			if (formationDto.getTypeFormation() != null) {
				queryString += TFORM_LIB_LIKE + formationDto.getTypeFormation().getLibelle() + "'";
			}
			if (isNullObjectAndString(sessionFormationDto, sessionFormationDto.getDateDem())) {
				queryString += " AND DATE(session_formation.DATE_DEMARRAGE) = '"
						+ df.format(sessionFormationDto.getDateDemarrage()) + "'";
			}
			if (isNullOrEmptyDateAndObject(sessionFormationDto, sessionFormationDto.getDateFin())) {
				queryString += " AND DATE(session_formation.DATE_FIN) = '" + df.format(sessionFormationDto.getDateFin())
						+ "'";
			}
		}
		queryString = queryString + GROUPE_BY;
		SQLQuery st = getSession().createSQLQuery(queryString);

		@SuppressWarnings("unchecked")
		List<Formation> liste = (List<Formation>) st.addEntity(Formation.class).list();

		return liste;
	}

	public List<Formation> findAllFormationsEnCours() {
		String queryString = "SELECT formation.ID, formation.CODE, formation.NOM, formation.LIEU, formation.TECHNOLOGIE, formation.TYPE_FORMATION FROM formation Inner Join session_formation ON formation.ID = session_formation.FORMATION WHERE session_formation.ID IS NOT NULL AND session_formation.F_Actif =  '1' group by formation.ID";

		SQLQuery st = getSession().createSQLQuery(queryString);
		@SuppressWarnings("unchecked")
		List<Formation> liste = (List<Formation>) st.addEntity(Formation.class).list();

		return liste;
	}

	public List<Formation> findAllFormationsClotures() {
		String queryString = "SELECT formation.ID, formation.CODE, formation.NOM, formation.LIEU, formation.TECHNOLOGIE, formation.TYPE_FORMATION FROM formation Inner Join session_formation ON formation.ID = session_formation.FORMATION WHERE session_formation.ID IS NOT NULL AND session_formation.F_Actif =  '0' group by formation.ID";

		SQLQuery st = getSession().createSQLQuery(queryString);
		@SuppressWarnings("unchecked")
		List<Formation> liste = (List<Formation>) st.addEntity(Formation.class).list();

		return liste;
	}

	public boolean isNullOrEmptyString(String var) {
		return var != null && !var.isEmpty();
	}

	public boolean isNullObject(Object o, Object var) {
		return o != null && var != null;
	}

	public boolean isNullObjectAndString(Object o, String var) {
		return o != null && var != null;
	}

	public boolean isNullOrEmptyDateAndObject(Object o, Date var) {
		return o != null && var != null;
	}

	public String critereRechercheFormationCloture(SessionFormationDto searchDtoCR, String queryStringCR) {
		DateFormat df = new SimpleDateFormat(FORMAT_DATE);

		if (isNullOrEmptyString(searchDtoCR.getFormation().getCode()))
			queryStringCR += FORMATION_CODE_LIKE + searchDtoCR.getFormation().getCode() + "%'";
		if (isNullOrEmptyString(searchDtoCR.getFormation().getNom()))
			queryStringCR += FORMATION_NOM_LIKE + searchDtoCR.getFormation().getNom() + "%'";

		if (isNullObject(searchDtoCR.getFormation().getTechnologie(),
				searchDtoCR.getFormation().getTechnologie().getLibelle())) {
			queryStringCR += TECH_LIB_LIKE + searchDtoCR.getFormation().getTechnologie().getLibelle() + "'";
		}
		if (searchDtoCR.getFormation().getLieu() != null && searchDtoCR.getFormation().getLieu().getLibelle() != null) {
			queryStringCR += LIEU_LIB_LIKE + searchDtoCR.getFormation().getLieu().getLibelle() + "'";
		}
		if (isNullObject(searchDtoCR.getFormation().getTypeFormation(),
				searchDtoCR.getFormation().getTypeFormation().getLibelle())) {
			queryStringCR += TFORM_LIB_LIKE + searchDtoCR.getFormation().getTypeFormation().getLibelle() + "'";
		}
		if (searchDtoCR.getDateDem() != null) {
			queryStringCR += AND_CLAUSE + df.format(searchDtoCR.getDateDemarrage())
					+ "'  in (select DATE(DATE_DEMARRAGE ) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '0') ";
		}
		if (searchDtoCR.getDateFin() != null) {
			queryStringCR += AND_CLAUSE + df.format(searchDtoCR.getDateDemarrage())
					+ "'  in (select DATE(DATE_FIN ) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '0') ";
		}

		return queryStringCR;

	}

	public String critereRechercheFormationEnCours(SessionFormationDto searchDtoCR, String queryStringCR) {
		DateFormat df = new SimpleDateFormat(FORMAT_DATE);

		if (isNullOrEmptyString(searchDtoCR.getFormation().getCode()))
			queryStringCR += FORMATION_CODE_LIKE + searchDtoCR.getFormation().getCode() + "%'";
		if (isNullOrEmptyString(searchDtoCR.getFormation().getNom()))
			queryStringCR += FORMATION_NOM_LIKE + searchDtoCR.getFormation().getNom() + "%'";

		if (isNullObject(searchDtoCR.getFormation().getTechnologie(),
				searchDtoCR.getFormation().getTechnologie().getLibelle())) {
			queryStringCR += TECH_LIB_LIKE + searchDtoCR.getFormation().getTechnologie().getLibelle() + "'";
		}
		if (searchDtoCR.getFormation().getLieu() != null && searchDtoCR.getFormation().getLieu().getLibelle() != null) {
			queryStringCR += LIEU_LIB_LIKE + searchDtoCR.getFormation().getLieu().getLibelle() + "'";
		}
		if (isNullObject(searchDtoCR.getFormation().getTypeFormation(),
				searchDtoCR.getFormation().getTypeFormation().getLibelle())) {
			queryStringCR += TFORM_LIB_LIKE + searchDtoCR.getFormation().getTypeFormation().getLibelle() + "'";
		}
		if (searchDtoCR.getDateDem() != null) {
			queryStringCR += AND_CLAUSE + df.format(searchDtoCR.getDateDemarrage())
					+ "'  in (select DATE(DATE_DEMARRAGE ) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '1') ";
		}
		if (searchDtoCR.getDateFin() != null) {
			queryStringCR += AND_CLAUSE + df.format(searchDtoCR.getDateDemarrage())
					+ "'  in (select DATE(DATE_FIN ) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '1') ";
		}

		return queryStringCR;

	}

}
