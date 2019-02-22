package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.CriteriaSpecification;
import org.springframework.stereotype.Repository;

import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.ISessionFormationDao;
import com.fr.adaming.jsfapp.dto.FormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationReportingDto;
import com.fr.adaming.jsfapp.model.SessionFormation;

@Repository("sessionFormationDao")
public class SessionFormationDao extends ManagerDao<SessionFormation, Long>
		implements ISessionFormationDao, Serializable {

	private static final long serialVersionUID = -6891843417767030009L;
	private static final String DATE_FORMAT = "yyyy-MM-dd";
	private static final String DATE_DEMMARAGE = " and session_formation.DATE_DEMARRAGE BETWEEN '";
	private static final String DATE_EXPRESSION = " 00:00:00' AND '";
	private static final String DATE_EXPRESSION2 = " 23:59:59'";
	private static final String DATE_FIN = " and session_formation.DATE_FIN BETWEEN '";
	public static final String QUERRY_FORMATION = "select " + "f.NOM as NOM_FORMATION, " + "l.libelle as LIEU, "
			+ "tf.libelle as TYPE_FORMATION, " + "DATE_FORMAT(sf.DATE_DEMARRAGE,'%d/%m/%Y') as DATE_DEMARAGE, "
			+ "sum(case when c.SESSION_FORMATION is null then 0 else 1 end) as TOTAL_CANDIDAT_Affecter, "
			+ "sum(case when (c.DOC_CONSULTATION is not null and c.DOC_CONSULTATION) then 1 else 0 end) as TOTAL_CANDIDAT_ACCEPTER, "
			+ "sf.Nombre_Place AS NB_PLACE, "
			+ "((sum(case when (c.DOC_CONSULTATION is not null and c.DOC_CONSULTATION) then 1 else 0 end)*100)/(sum(case when (c.SESSION_FORMATION is null )then 0 else 1 end )))as TAUX_ACCEPTATION, "
			+ "(sum(case when (c.DOC_CONSULTATION is not null and c.DOC_CONSULTATION) then 1 else 0 end) * 100/ sf.Nombre_Place)  as TAUX_REMPLISSAGE, "
			+ "sf.ID " + "from candidat c " + "join session_formation sf on sf.ID=c.SESSION_FORMATION "
			+ "join formation f on f.ID = sf.FORMATION " + "JOIN type_formation tf on tf.ID = f.TYPE_FORMATION "
			+ "JOIN lieu l on l.ID = f.LIEU " + "where sf.F_Actif group by sf.ID ORDER BY sf.DATE_DEMARRAGE ASC;";
	private static final String REQ_SELECT = "select * from session_formation inner join formation  on session_formation.FORMATION=formation.ID where session_formation.F_Actif=1";

	@Override
	public List<SessionFormation> rechercherSessionsFormationParFormation(FormationDto formationDto) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(SessionFormation.class);
		if (formationDto != null) {
			DaoUtils.addEqRestrictionIfNotNull(crit, "formation.id", formationDto.getId());

		}
		crit.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
		return DaoUtils.castList(SessionFormation.class, crit.list());
	}

	@Override
	public List<SessionFormation> rechercherSessionsFormation(SessionFormationDto sessionFormationDto) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(SessionFormation.class);
		if (isNullObject(sessionFormationDto, sessionFormationDto.getFormation())) {
			crit.createAlias("formation", "f");
			DaoUtils.addLikeRestrictionIfNotNull(crit, "f.code", sessionFormationDto.getFormation().getCode());
			DaoUtils.addEqRestrictionIfNotNull(crit, "f.id", sessionFormationDto.getFormation().getId());
			DaoUtils.addLikeRestrictionIfNotNull(crit, "f.nom", sessionFormationDto.getFormation().getNom());
			if (sessionFormationDto.getFormation().getTechnologie() != null) {
				DaoUtils.addEqRestrictionIfNotNull(crit, "f.technologie.id",
						sessionFormationDto.getFormation().getTechnologie().getId());
			}
			if (sessionFormationDto.getFormation().getLieu() != null) {
				DaoUtils.addEqRestrictionIfNotNull(crit, "f.lieu.id",
						sessionFormationDto.getFormation().getLieu().getId());
			}
			if (sessionFormationDto.getFormation().getTypeFormation() != null) {
				DaoUtils.addEqRestrictionIfNotNull(crit, "f.typeFormation.id",
						sessionFormationDto.getFormation().getTypeFormation().getId());

			}
		}
		if (isNullObject(sessionFormationDto, sessionFormationDto.getDateDemarrage())) {
			DaoUtils.addEqRestrictionIfNotNull(crit, "dateDemarrage", sessionFormationDto.getDateDemarrage());
		}

		if (isNullObject(sessionFormationDto, sessionFormationDto.getFormation().getId())) {
			DaoUtils.addEqRestrictionIfNotNull(crit, "formation", sessionFormationDto.getFormation().getId());
		}

		return DaoUtils.castList(SessionFormation.class, crit.list());
	}

	public SQLQuery validateQuerryString(SessionFormationDto dto, Date date, Date date2, String query,
			DateFormat format) {
		if (dto != null) {
			if (date != null) {
				query += DATE_DEMMARAGE + format.format(date) + DATE_EXPRESSION + format.format(date)
						+ DATE_EXPRESSION2;
			}
			if (date2 != null) {
				query += DATE_FIN + format.format(date2) + DATE_EXPRESSION + format.format(date2) + DATE_EXPRESSION2;

			}
		}

		return getSession().createSQLQuery(query);
	}

	@Override

	public List<SessionFormation> rechercherSessionsFormationEnCours(SessionFormationDto sessionFormationDtoEnCours) {
		DateFormat dFormatEnCours = new SimpleDateFormat(DATE_FORMAT);
		String queryStringEnCours = REQ_SELECT;
		SQLQuery sEnCours = validateQuerryString(sessionFormationDtoEnCours,
				sessionFormationDtoEnCours.getDateDemarrage(), sessionFormationDtoEnCours.getDateFin(),
				queryStringEnCours, dFormatEnCours);
		@SuppressWarnings("unchecked")
		List<SessionFormation> listeEnCours = sEnCours.addEntity(SessionFormation.class).list();

		return listeEnCours;
	}

	@Override
	public List<SessionFormation> rechercherSessionFormation(SessionFormationDto sessionFormationDto) {
		DateFormat dFormatFormation = new SimpleDateFormat(DATE_FORMAT);
		String queryStringFormation = "select * from session_formation inner join formation  on session_formation.FORMATION=formation.ID where 1=1";
		SQLQuery sFormation = validateQuerryString(sessionFormationDto, sessionFormationDto.getDateDemarrage(),
				sessionFormationDto.getDateFin(), queryStringFormation, dFormatFormation);

		@SuppressWarnings("unchecked")
		List<SessionFormation> listeFormation = sFormation.addEntity(SessionFormation.class).list();

		return listeFormation;
	}

	@Override
	public List<SessionFormation> rechercherFormationEnCours(SessionFormationDto sessionFormationDto) {
		return rechercherSessionsFormationEnCours(sessionFormationDto);

	}

	@Override
	public List<SessionFormation> rechercherSession() {
		String queryString = REQ_SELECT;

		SQLQuery st = getSession().createSQLQuery(queryString);
		@SuppressWarnings("unchecked")
		List<SessionFormation> liste = st.addEntity(SessionFormation.class).list();

		return liste;
	}

	@Override
	public List<SessionFormation> rechercherSessionsFormationCloture(SessionFormationDto sessionFormationDtoCloture) {
		DateFormat dFormatFormationCloture = new SimpleDateFormat(DATE_FORMAT);
		String queryStringFormationCloture = "select * from session_formation inner join formation  on session_formation.FORMATION=formation.ID where session_formation.F_Actif=0";

		SQLQuery sFormationEncours = validateQuerryString(sessionFormationDtoCloture,
				sessionFormationDtoCloture.getDateDemarrage(), sessionFormationDtoCloture.getDateFin(),
				queryStringFormationCloture, dFormatFormationCloture);

		@SuppressWarnings("unchecked")
		List<SessionFormation> listeFormationcloture = sFormationEncours.addEntity(SessionFormation.class).list();

		return listeFormationcloture;

	}

	@Override
	public List<SessionFormation> rechercherSessionsFormationClotureParFormation(FormationDto formationDto) {

		String queryString = "SELECT *  FROM  session_formation   WHERE session_formation.FORMATION= "
				+ formationDto.getId() + " and session_formation.F_Actif=0";

		SQLQuery st = getSession().createSQLQuery(queryString);

		@SuppressWarnings("unchecked")
		List<SessionFormation> liste = st.addEntity(SessionFormation.class).list();

		return liste;
	}

	@Override
	public List<SessionFormation> rechercherSessionsFormationEnCourParFormation(FormationDto formationDto) {

		String queryString = "SELECT *  FROM  session_formation   WHERE session_formation.FORMATION= "
				+ formationDto.getId() + " and session_formation.F_Actif=1";

		SQLQuery st = getSession().createSQLQuery(queryString);

		@SuppressWarnings("unchecked")
		List<SessionFormation> liste = st.addEntity(SessionFormation.class).list();

		return liste;
	}

	public SessionFormationReportingDto getAllFormation(Object[] o) {

		String nom = (String) o[0];
		String lieu = (String) o[1];
		String type = (String) o[2];
		String date = (String) o[3];
		BigDecimal affectaion = (BigDecimal) o[4];
		BigDecimal acceptation = (BigDecimal) o[5];
		Integer nombrePlace = (Integer) o[6];
		BigDecimal tauxAccep = (BigDecimal) o[7];
		BigDecimal taux = (BigDecimal) o[8];
		BigInteger idSession = (BigInteger) o[9];
		return new SessionFormationReportingDto.Builder().setNomFormation(nom).setLieuFormation(lieu).setTypeFormation(type).
				setDateDemarrage(date).setCandidatAffectation(affectaion).setCandidatAcceptation(acceptation).setNombrePlace(nombrePlace).
				setTauxAcceptation(tauxAccep).setTauxRemplissage(taux).setIdSession(idSession).buildSessionFormationReportingDto();

	}

	@Override
	public List<SessionFormationReportingDto> rechercherSessionreorting() {
		String queryReporting = QUERRY_FORMATION;
		SQLQuery stReporting = getSession().createSQLQuery(queryReporting);
		List<SessionFormationReportingDto> dataReporting = new ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObjectReporting = stReporting.list();
		if (!dataObjectReporting.isEmpty()) {
			for (Object[] oReporting : dataObjectReporting) {
				SessionFormationReportingDto sessionReporting = getAllFormation(oReporting);
				BigDecimal tauxAccep = sessionReporting.getTauxAcceptation().setScale(2, RoundingMode.HALF_UP);
				BigDecimal taux = sessionReporting.getTauxRemplissage().setScale(2, RoundingMode.HALF_UP);
				sessionReporting.setTauxAcceptation(tauxAccep);
				sessionReporting.setTauxRemplissage(taux);
				dataReporting.add(sessionReporting);

			}
		}

		return dataReporting;

	}

	@Override
	public List<SessionFormationReportingDto> rechercherAllSession() {
		String queryAllSession = "select " + "f.NOM as NOM_FORMATION, " + "l.libelle as LIEU, "
				+ "tf.libelle as TYPE_FORMATION, " + "DATE_FORMAT(sf.DATE_DEMARRAGE,'%d/%m/%Y') as DATE_DEMARAGE, "
				+ "sum(case when c.SESSION_FORMATION is null then 0 else 1 end) as TOTAL_CANDIDAT_Affecter, "
				+ "sum(case when (c.DOC_CONSULTATION is not null and c.DOC_CONSULTATION) then 1 else 0 end) as TOTAL_CANDIDAT_ACCEPTER, "
				+ "sf.Nombre_Place AS NB_PLACE, "
				+ "((sum(case when (c.DOC_CONSULTATION is not null and c.DOC_CONSULTATION) then 1 else 0 end)*100)/(sum(case when (c.SESSION_FORMATION is null )then 0 else 1 end )))as TAUX_ACCEPTATION, "
				+ "(sum(case when (c.DOC_CONSULTATION is not null and c.DOC_CONSULTATION) then 1 else 0 end) * 100/ sf.Nombre_Place)  as TAUX_REMPLISSAGE, "
				+ "sf.ID " + "from candidat c " + "join session_formation sf on sf.ID=c.SESSION_FORMATION "
				+ "join formation f on f.ID = sf.FORMATION " + "JOIN type_formation tf on tf.ID = f.TYPE_FORMATION "
				+ "JOIN lieu l on l.ID = f.LIEU " + "where 1=1 group by sf.ID";
		SQLQuery stAllSession = getSession().createSQLQuery(queryAllSession);

		List<SessionFormationReportingDto> dataAllSession = new ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObjectAllSession = stAllSession.list();
		if (!dataObjectAllSession.isEmpty()) {
			for (Object[] oAllSession : dataObjectAllSession) {
				SessionFormationReportingDto sessionReportingAllSession = getAllFormation(oAllSession);
				dataAllSession.add(sessionReportingAllSession);
			}
		}
		return dataAllSession;
	}

	public boolean isNullObject(Object o, Object var) {
		return o != null && var != null;
	}

}
