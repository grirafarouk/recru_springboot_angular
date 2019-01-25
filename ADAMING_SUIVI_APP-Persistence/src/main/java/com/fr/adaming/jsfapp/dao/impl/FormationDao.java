package com.fr.adaming.jsfapp.dao.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
import com.fr.adaming.jsfapp.model.SessionFormation;

@Repository("formationDao")
public class FormationDao extends ManagerDao<Formation, Long> implements
		IFormationDao {

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
	public List<Formation> rechercherFormations(
			SessionFormationDto searchDto) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String queryString = "select * from formation ";
		queryString+= "left outer join lieu  on formation.LIEU=lieu.ID left outer join technologie  on formation.TECHNOLOGIE=technologie.ID left outer join type_formation  on formation.TYPE_FORMATION=type_formation.ID ";
		if (searchDto.getId() != null ||searchDto.getDatedemarrage() != null||searchDto.getDateFin() != null)
		{
		queryString+= " Inner Join session_formation ON formation.ID = session_formation.FORMATION where session_formation.ID IS NOT NULL ";
		queryString+= " and (select count(*) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '1' )>0";
		}else {
			queryString+= " where 1=1";

		}
			if (searchDto.getFormation().getCode() != null
					&& !searchDto.getFormation().getCode().isEmpty())
				queryString += " and formation.CODE LIKE '%"
						+ searchDto.getFormation().getCode() + "%'";
			if (searchDto.getFormation().getNom() != null
					&& !searchDto.getFormation().getNom().isEmpty())
				queryString += " and formation.NOM LIKE '%"
						+ searchDto.getFormation().getNom() + "%'";

			if (searchDto.getFormation().getTechnologie() != null && searchDto.getFormation().getTechnologie().getLibelle() !=null) {
				queryString += " and technologie.libelle LIKE '%"
						+ searchDto.getFormation().getTechnologie().getLibelle() + "'";
			}
			if (searchDto.getFormation().getLieu() != null && searchDto.getFormation().getLieu().getLibelle() !=null) {
				queryString += " and lieu.libelle LIKE '%"
						+ searchDto.getFormation().getLieu().getLibelle() + "'";
			}
			if (searchDto.getFormation().getTypeFormation() != null && searchDto.getFormation().getTypeFormation().getLibelle() !=null) {
				queryString += " and type_formation.libelle LIKE '%"
						+ searchDto.getFormation().getTypeFormation().getLibelle() + "'";
			}
			
			if (searchDto.getDatedemarrage() != null) {
				queryString += " and '"
						+ df.format(searchDto.getDateDemarrage()) + "'  in (select DATE(DATE_DEMARRAGE ) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '1') " ;
			}
			if (searchDto.getDateFin() != null) {
				queryString += " and '"
						+ df.format(searchDto.getDateFin()) + "'  in (select DATE(DATE_FIN ) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '1') " ;
			}
		
		queryString = queryString + " group by formation.ID ";
		SQLQuery st = getSession().createSQLQuery(queryString);
		@SuppressWarnings("unchecked")
		List<Formation> liste = (List<Formation>) st.addEntity(Formation.class)
				.list();

		return liste;
	}

	@Override
	public List<Formation> rechercherFormationsEnCours(
			SessionFormationDto searchDto) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String queryString = "select * from formation Inner Join session_formation ON formation.ID = session_formation.FORMATION left outer join lieu  on formation.LIEU=lieu.ID left outer join technologie  on formation.TECHNOLOGIE=technologie.ID left outer join type_formation  on formation.TYPE_FORMATION=type_formation.ID where session_formation.ID IS NOT NULL  ";
		queryString+= " and (select count(*) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '1' )>0";
		if (searchDto != null) {
			if (searchDto.getFormation().getCode() != null
					&& !searchDto.getFormation().getCode().isEmpty())
				queryString += " and formation.CODE LIKE '%"
						+ searchDto.getFormation().getCode() + "%'";
			if (searchDto.getFormation().getNom() != null
					&& !searchDto.getFormation().getNom().isEmpty())
				queryString += " and formation.NOM LIKE '%"
						+ searchDto.getFormation().getNom() + "%'";

			if (searchDto.getFormation().getTechnologie() != null && searchDto.getFormation().getTechnologie().getLibelle() !=null) {
				queryString += " and technologie.libelle LIKE '%"
						+ searchDto.getFormation().getTechnologie().getLibelle() + "'";
			}
			if (searchDto.getFormation().getLieu() != null && searchDto.getFormation().getLieu().getLibelle() !=null) {
				queryString += " and lieu.libelle LIKE '%"
						+ searchDto.getFormation().getLieu().getLibelle() + "'";
			}
			if (searchDto.getFormation().getTypeFormation() != null && searchDto.getFormation().getTypeFormation().getLibelle() !=null) {
				queryString += " and type_formation.libelle LIKE '%"
						+ searchDto.getFormation().getTypeFormation().getLibelle() + "'";
			}
			if (searchDto.getDatedemarrage() != null) {
				queryString += " and '"
						+ df.format(searchDto.getDateDemarrage()) + "'  in (select DATE(DATE_DEMARRAGE ) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '1') " ;
			}
			if (searchDto.getDateFin() != null) {
				queryString += " and '"
						+ df.format(searchDto.getDateFin()) + "'  in (select DATE(DATE_FIN ) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '1') " ;
			}
		}
		queryString = queryString + " group by formation.ID ";
		SQLQuery st = getSession().createSQLQuery(queryString);
		@SuppressWarnings("unchecked")
		List<Formation> liste = (List<Formation>) st.addEntity(Formation.class)
				.list();

		return liste;
	}

	@Override
	public List<Formation> rechercherFormationsClotures(
			SessionFormationDto searchDto) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String queryString = "select * from formation Inner Join session_formation ON formation.ID = session_formation.FORMATION left outer join lieu  on formation.LIEU=lieu.ID left outer join technologie  on formation.TECHNOLOGIE=technologie.ID left outer join type_formation  on formation.TYPE_FORMATION=type_formation.ID where session_formation.ID IS NOT NULL  ";
		queryString+= " and (select count(*) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '0' )>0";

		if (searchDto != null) {
			if (searchDto.getFormation().getCode() != null
					&& !searchDto.getFormation().getCode().isEmpty())
				queryString += " and formation.CODE LIKE '%"
						+ searchDto.getFormation().getCode() + "%'";
			if (searchDto.getFormation().getNom() != null
					&& !searchDto.getFormation().getNom().isEmpty())
				queryString += " and formation.NOM LIKE '%"
						+ searchDto.getFormation().getNom() + "%'";

			if (searchDto.getFormation().getTechnologie() != null && searchDto.getFormation().getTechnologie().getLibelle() !=null) {
				queryString += " and technologie.libelle LIKE '%"
						+ searchDto.getFormation().getTechnologie().getLibelle() + "'";
			}
			if (searchDto.getFormation().getLieu() != null && searchDto.getFormation().getLieu().getLibelle() !=null) {
				queryString += " and lieu.libelle LIKE '%"
						+ searchDto.getFormation().getLieu().getLibelle() + "'";
			}
			if (searchDto.getFormation().getTypeFormation() != null && searchDto.getFormation().getTypeFormation().getLibelle() !=null) {
				queryString += " and type_formation.libelle LIKE '%"
						+ searchDto.getFormation().getTypeFormation().getLibelle() + "'";
			}
			if (searchDto.getDatedemarrage() != null) {
				queryString += " and '"
						+ df.format(searchDto.getDateDemarrage()) + "'  in (select DATE(DATE_DEMARRAGE ) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '0') " ;
			}
			if (searchDto.getDateFin() != null) {
				queryString += " and '"
						+ df.format(searchDto.getDateDemarrage()) + "'  in (select DATE(DATE_FIN ) from session_formation where session_formation.FORMATION=formation.ID AND session_formation.F_Actif =  '0') " ;
			}
		}
		queryString = queryString + " group by formation.ID ";
		SQLQuery st = getSession().createSQLQuery(queryString);

		@SuppressWarnings("unchecked")
		List<Formation> liste = (List<Formation>) st.addEntity(Formation.class)
				.list();

		return liste;
	}
	
	public List<Formation> rechercherFormationParSessionFormation(
			FormationDto formationDto, SessionFormationDto sessionFormationDto) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String queryString = "select * from formation left outer join session_formation ON formation.ID = session_formation.FORMATION left outer join lieu  on formation.LIEU=lieu.ID left outer join technologie  on formation.TECHNOLOGIE=technologie.ID left outer join type_formation  on formation.TYPE_FORMATION=type_formation.ID where 1=1";

		if (formationDto != null) {
			if (formationDto.getCode() != null
					&& !formationDto.getCode().isEmpty()) {
				
				queryString += " and formation.CODE LIKE '%"
						+ formationDto.getCode() + "%'";
			}
			if (formationDto.getNom() != null
					&& !formationDto.getNom().isEmpty()) {
				queryString += " and formation.NOM LIKE '%"
						+ formationDto.getNom() + "%'";
			}
			if (formationDto.getTechnologie() != null) {
				queryString += " and technologie.libelle LIKE '%"
						+ formationDto.getTechnologie().getLibelle() + "'";
			}
			if (formationDto.getLieu() != null) {
				queryString += " and lieu.libelle LIKE '%"
						+ formationDto.getLieu().getLibelle() + "'";
			}
			if (formationDto.getTypeFormation() != null) {
				queryString += " and type_formation.libelle LIKE '%"
						+ formationDto.getTypeFormation().getLibelle() + "'";
			}
			if (sessionFormationDto != null && sessionFormationDto.getDatedemarrage() != null) {
				queryString += " AND DATE(session_formation.DATE_DEMARRAGE) = '"
						+ df.format(sessionFormationDto.getDateDemarrage()) + "'";
			}
			if (sessionFormationDto != null && sessionFormationDto.getDateFin() != null) {
				queryString += " AND DATE(session_formation.DATE_FIN) = '"
						+ df.format(sessionFormationDto.getDateFin()) + "'";
			}
		}
		queryString = queryString + " group by formation.ID ";
		SQLQuery st = getSession().createSQLQuery(queryString);

		@SuppressWarnings("unchecked")
		List<Formation> liste = (List<Formation>) st.addEntity(Formation.class)
				.list();

		return liste;
	}

	public List<Formation> findAllFormationsEnCours() {
		String queryString = //"SELECT formation.ID, formation.CODE, formation.NOM, formation.LIEU, formation.TECHNOLOGIE, formation.TYPE_FORMATION FROM formation Inner Join session_formation ON formation.ID = session_formation.FORMATION WHERE session_formation.F_Actif =  1 ";
				"SELECT formation.ID, formation.CODE, formation.NOM, formation.LIEU, formation.TECHNOLOGIE, formation.TYPE_FORMATION FROM formation Inner Join session_formation ON formation.ID = session_formation.FORMATION WHERE session_formation.ID IS NOT NULL AND session_formation.F_Actif =  '1' group by formation.ID";

		SQLQuery st = getSession().createSQLQuery(queryString);
		@SuppressWarnings("unchecked")
		List<Formation> liste = (List<Formation>) st.addEntity(Formation.class)
				.list();

		return liste;
	}

	public List<Formation> findAllFormationsClotures() {
		String queryString = "SELECT formation.ID, formation.CODE, formation.NOM, formation.LIEU, formation.TECHNOLOGIE, formation.TYPE_FORMATION FROM formation Inner Join session_formation ON formation.ID = session_formation.FORMATION WHERE session_formation.ID IS NOT NULL AND session_formation.F_Actif =  '0' group by formation.ID";

		SQLQuery st = getSession().createSQLQuery(queryString);
		@SuppressWarnings("unchecked")
		List<Formation> liste = (List<Formation>) st.addEntity(Formation.class)
				.list();

		return liste;
	}
	
}
