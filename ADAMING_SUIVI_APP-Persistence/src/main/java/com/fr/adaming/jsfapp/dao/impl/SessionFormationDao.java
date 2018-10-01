package com.fr.adaming.jsfapp.dao.impl;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.ISessionFormationDao;
import com.fr.adaming.jsfapp.dto.FormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationReportingDto;
import com.fr.adaming.jsfapp.model.SessionFormation;

@Repository("sessionFormationDao")
public class SessionFormationDao extends ManagerDao<SessionFormation, Long>
		implements ISessionFormationDao {

	@Override
	public List<SessionFormation> rechercherSessionsFormationParFormation(
			FormationDto formationDto) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(SessionFormation.class);
		if (formationDto != null) {
			DaoUtils.addEqRestrictionIfNotNull(crit, "formation.id",
					formationDto.getId());

		}

		return DaoUtils.castList(SessionFormation.class, crit.list());
	}

	@Override
	public List<SessionFormation> rechercherSessionsFormation(
			SessionFormationDto sessionFormationDto) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(SessionFormation.class);
		if (sessionFormationDto != null) {
			if (sessionFormationDto.getFormation() != null) {

				crit.createAlias("formation", "f");
				DaoUtils.addLikeRestrictionIfNotNull(crit, "f.code",
						sessionFormationDto.getFormation().getCode());
				DaoUtils.addEqRestrictionIfNotNull(crit, "f.id",
						sessionFormationDto.getFormation().getId());
				DaoUtils.addLikeRestrictionIfNotNull(crit, "f.nom",
						sessionFormationDto.getFormation().getNom());
				if (sessionFormationDto.getFormation().getTechnologie() != null) {
					DaoUtils.addEqRestrictionIfNotNull(crit,
							"f.technologie.id", sessionFormationDto
									.getFormation().getTechnologie().getId());
				}
				if (sessionFormationDto.getFormation().getLieu() != null) {
					DaoUtils.addEqRestrictionIfNotNull(crit, "f.lieu.id",
							sessionFormationDto.getFormation().getLieu()
									.getId());
				}
				if (sessionFormationDto.getFormation().getTypeFormation() != null) {
					DaoUtils.addEqRestrictionIfNotNull(crit,
							"f.typeFormation.id", sessionFormationDto
									.getFormation().getTypeFormation().getId());

				}
			}
			if (sessionFormationDto.getDateDemarrage() != null) {
				DaoUtils.addEqRestrictionIfNotNull(crit, "dateDemarrage",
						sessionFormationDto.getDateDemarrage());
			}

			if (sessionFormationDto.getFormation().getId() != null) {
				DaoUtils.addEqRestrictionIfNotNull(crit, "formation",
						sessionFormationDto.getFormation().getId());
			}

		}

		return DaoUtils.castList(SessionFormation.class, crit.list());
	}

	@Override
	public List<SessionFormation> rechercherSessionsFormationEnCours(
			SessionFormationDto sessionFormationDto) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String queryString = "select * from session_formation inner join formation  on session_formation.FORMATION=formation.ID where session_formation.F_Actif=1";

		if (sessionFormationDto != null) {
			if (sessionFormationDto.getDateDemarrage() != null) {
				queryString += " and session_formation.DATE_DEMARRAGE BETWEEN '"
						+ df.format(sessionFormationDto.getDateDemarrage())
						+ " 00:00:00' AND '"
						+ df.format(sessionFormationDto.getDateDemarrage())
						+ " 23:59:59'";
			}
		}

		SQLQuery st = getSession().createSQLQuery(queryString);

		@SuppressWarnings("unchecked")
		List<SessionFormation> liste = (List<SessionFormation>) st.addEntity(
				SessionFormation.class).list();

		return liste;
	}
	
	@Override
	public List<SessionFormation> rechercherFormationEnCours(
			SessionFormationDto sessionFormationDto) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String queryString = "select * from session_formation inner join formation  on session_formation.FORMATION=formation.ID where session_formation.F_Actif=1";

		if (sessionFormationDto != null) {
			if (sessionFormationDto.getDateDemarrage() != null) {
				queryString += " and session_formation.DATE_DEMARRAGE BETWEEN '"
						+ df.format(sessionFormationDto.getDateDemarrage())
						+ " 00:00:00' AND '"
						+ df.format(sessionFormationDto.getDateDemarrage())
						+ " 23:59:59'";
			}
		}

		SQLQuery st = getSession().createSQLQuery(queryString);

		@SuppressWarnings("unchecked")
		List<SessionFormation> liste = (List<SessionFormation>) st.addEntity(
				SessionFormation.class).list();

		return liste;
	}
	
	@Override
	public List<SessionFormation> rechercherSession() {
		
		String queryString = "select * from session_formation inner join formation  on session_formation.FORMATION=formation.ID where session_formation.F_Actif=1";


		SQLQuery st = getSession().createSQLQuery(queryString);

		@SuppressWarnings("unchecked")
		List<SessionFormation> liste = (List<SessionFormation>) st.addEntity(
				SessionFormation.class).list();

		return liste;
	}

	@Override
	public List<SessionFormation> rechercherSessionsFormationCloture(
			SessionFormationDto sessionFormationDto) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String queryString = "select * from session_formation inner join formation  on session_formation.FORMATION=formation.ID where session_formation.F_Actif=0";

		if (sessionFormationDto != null) {
			if (sessionFormationDto.getDateDemarrage() != null) {
				queryString += " and session_formation.DATE_DEMARRAGE BETWEEN '"
						+ df.format(sessionFormationDto.getDateDemarrage())
						+ " 00:00:00' AND '"
						+ df.format(sessionFormationDto.getDateDemarrage())
						+ " 23:59:59'";
			}
		}

		SQLQuery st = getSession().createSQLQuery(queryString);

		@SuppressWarnings("unchecked")
		List<SessionFormation> liste = (List<SessionFormation>) st.addEntity(
				SessionFormation.class).list();

		return liste;
	}

	@Override
	public List<SessionFormation> rechercherSessionsFormationClotureParFormation(
			FormationDto formationDto) {

		String queryString = "SELECT *  FROM  session_formation   WHERE session_formation.FORMATION= "
				+ formationDto.getId() + " and session_formation.F_Actif=0";

		SQLQuery st = getSession().createSQLQuery(queryString);

		@SuppressWarnings("unchecked")
		List<SessionFormation> liste = (List<SessionFormation>) st.addEntity(
				SessionFormation.class).list();

		return liste;
	}

	@Override
	public List<SessionFormation> rechercherSessionsFormationEnCourParFormation(
			FormationDto formationDto) {

		String queryString = "SELECT *  FROM  session_formation   WHERE session_formation.FORMATION= "
				+ formationDto.getId() + " and session_formation.F_Actif=1";

		SQLQuery st = getSession().createSQLQuery(queryString);

		@SuppressWarnings("unchecked")
		List<SessionFormation> liste = (List<SessionFormation>) st.addEntity(
				SessionFormation.class).list();

		return liste;
	}
	
	@Override
	public List<SessionFormationReportingDto> rechercherSessionreorting() {
		String query = "select "+
						"f.NOM as NOM_FORMATION, "+
						"l.libelle as LIEU, "+
						"tf.libelle as TYPE_FORMATION, "+
						"DATE_FORMAT(sf.DATE_DEMARRAGE,'%d/%m/%Y') as DATE_DEMARAGE, "+
						"sum(case when c.SESSION_FORMATION is null then 0 else 1 end) as TOTAL_CANDIDAT_Affecter, "+
						"sum(case when (c.DOC_CONSULTATION is not null and c.DOC_CONSULTATION) then 1 else 0 end) as TOTAL_CANDIDAT_ACCEPTER, "+
						"sf.Nombre_Place AS NB_PLACE, "+
						"((sum(case when (c.DOC_CONSULTATION is not null and c.DOC_CONSULTATION) then 1 else 0 end)*100)/(sum(case when (c.SESSION_FORMATION is null )then 0 else 1 end )))as TAUX_ACCEPTATION, "+
						"(sum(case when (c.DOC_CONSULTATION is not null and c.DOC_CONSULTATION) then 1 else 0 end) * 100/ sf.Nombre_Place)  as TAUX_REMPLISSAGE, "+
						"sf.ID "+
						"from candidat c "+
						"join session_formation sf on sf.ID=c.SESSION_FORMATION "+
						"join formation f on f.ID = sf.FORMATION "+
						"JOIN type_formation tf on tf.ID = f.TYPE_FORMATION "+
						"JOIN lieu l on l.ID = f.LIEU "+
						"where sf.F_Actif group by sf.ID ORDER BY sf.DATE_DEMARRAGE ASC;";

		SQLQuery st = getSession().createSQLQuery(query);
		
		List<SessionFormationReportingDto> data = new  ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = (List<Object[]>) st.list();
		if(!dataObject.isEmpty())
		{
			for(Object [] o : dataObject)
			{
				String nom = (String) o[0];
				String lieu = (String) o[1];
				String type = (String) o[2];
				String date = (String) o[3];
				BigDecimal  affectaion = (BigDecimal) o[4];
				BigDecimal  acceptation = (BigDecimal) o[5];
				Integer  nombrePlace = (Integer) o[6];
				BigDecimal  tauxAccep = (BigDecimal) o[7];
				BigDecimal  taux = (BigDecimal) o[8];
				BigInteger idSession = (BigInteger) o[9]; 
				data.add(new SessionFormationReportingDto(nom,lieu,type,date,affectaion,acceptation,nombrePlace,tauxAccep,taux,idSession));
				
			}
		}
		
		return data;
	}
	
	@Override
	public List<SessionFormationReportingDto> rechercherAllSession() {
		String query = "select "+
						"f.NOM as NOM_FORMATION, "+
						"l.libelle as LIEU, "+
						"tf.libelle as TYPE_FORMATION, "+
						"DATE_FORMAT(sf.DATE_DEMARRAGE,'%d/%m/%Y') as DATE_DEMARAGE, "+
						"sum(case when c.SESSION_FORMATION is null then 0 else 1 end) as TOTAL_CANDIDAT_Affecter, "+
						"sum(case when (c.DOC_CONSULTATION is not null and c.DOC_CONSULTATION) then 1 else 0 end) as TOTAL_CANDIDAT_ACCEPTER, "+
						"sf.Nombre_Place AS NB_PLACE, "+
						"((sum(case when (c.DOC_CONSULTATION is not null and c.DOC_CONSULTATION) then 1 else 0 end)*100)/(sum(case when (c.SESSION_FORMATION is null )then 0 else 1 end )))as TAUX_ACCEPTATION, "+
						"(sum(case when (c.DOC_CONSULTATION is not null and c.DOC_CONSULTATION) then 1 else 0 end) * 100/ sf.Nombre_Place)  as TAUX_REMPLISSAGE, "+
						"sf.ID "+
						"from candidat c "+
						"join session_formation sf on sf.ID=c.SESSION_FORMATION "+
						"join formation f on f.ID = sf.FORMATION "+
						"JOIN type_formation tf on tf.ID = f.TYPE_FORMATION "+
						"JOIN lieu l on l.ID = f.LIEU "+
						"where 1=1 group by sf.ID";

		SQLQuery st = getSession().createSQLQuery(query);
		
		List<SessionFormationReportingDto> data = new  ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = (List<Object[]>) st.list();
		if(!dataObject.isEmpty())
		{
			for(Object [] o : dataObject)
			{
				String nom = (String) o[0];
				String lieu = (String) o[1];
				String type = (String) o[2];
				String date = (String) o[3];
				BigDecimal  affectaion = (BigDecimal) o[4];
				BigDecimal  acceptation = (BigDecimal) o[5];
				Integer  nombrePlace = (Integer) o[6];
				BigDecimal  tauxAccep = (BigDecimal) o[7];
				BigDecimal  taux = (BigDecimal) o[8];
				BigInteger idSession = (BigInteger) o[9]; 
				data.add(new SessionFormationReportingDto(nom,lieu,type,date,affectaion,acceptation,nombrePlace,tauxAccep,taux,idSession));
				
			}
		}
		
		return data;
	}

}
