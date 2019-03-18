package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.IUtilisateurDao;
import com.fr.adaming.jsfapp.dto.ReportingChargeRelanceDto;
import com.fr.adaming.jsfapp.dto.ReportingListSourceurDto;
import com.fr.adaming.jsfapp.dto.ReportingSourceurParDispoDto;
import com.fr.adaming.jsfapp.dto.ReportingSourceurTechnologieDto;
import com.fr.adaming.jsfapp.model.Origine;
import com.fr.adaming.jsfapp.model.Region;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.model.Utilisateur;

/**
 * 
 * @author Elyess Tekaya
 * 
 */
@Repository("utilisateurDao")
public class UtilisateurDao extends ManagerDao<Utilisateur, Long> implements IUtilisateurDao, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6647205927605972562L;
	/**
	 * 
	 * 
	 * @see com.fr.adaming.jsfapp.dao.IUtilisateurDao#findbyLoginPass(java.lang.String,
	 *      java.lang.String)
	 * @param login
	 * @param passw
	 * @return
	 * 
	 */
	private static final String LOGIN = "login";
	private static final String ACTIF = "actif";
	private static final String INSCRI_DATE = " AND c.DATE_INSCRIPTION BETWEEN '";
	private static final String F_HEURE = " 00:00:00' AND '";
	private static final String SELECT_REQ = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c Inner Join entretien AS e ON c.ENTRETIEN = e.ID WHERE  c.CREE_PAR= ";
	private static final String F_HEURE_FIN = " 23:59:59' ";
	private static final String WHERE_CL = " WHERE c.CREE_PAR = ";
	private static final String D_INS_SUP = " AND c.DATE_INSCRIPTION > '";
	private static final String D_INS_INF = " AND c.DATE_INSCRIPTION < '";
	private static final String F_HEURE_DEB = " 00:00:00' ";
	private static final String FROM = "FROM ";
	private static final String SELECT_ONLY = "select ";
	private static final String FROM_C = "FROM candidat c ";
	private static final String JOIN_UT = "JOIN utilisateur u on u.ID = c.CREE_PAR ";
	private static final String SEL_DEB = "(select ";
	private static final String ID_SOUR = "tmp.ID as id_sourceur, ";
	private static final String TMP_GROUP = "as tmp group by ID )";
	// private static final String PROFILSPECIAL = 5;
	DateFormat df = new SimpleDateFormat("yyyy-MM-dd");

	@Override
	public Utilisateur findbyLoginPass(String login, String passw) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		crit.add(Restrictions.eq(LOGIN, login));
		crit.add(Restrictions.eq("password", passw));

		List<Utilisateur> liste = DaoUtils.castList(Utilisateur.class, crit.list());

		if (CollectionUtils.isNotEmpty(liste)) {
			return liste.get(0);
		}
		return null;

	}

	/**
	 * 
	 * 
	 * @see com.fr.adaming.jsfapp.dao.IUtilisateurDao#findbyUsernameSpringS(java.lang.String)
	 * @param login
	 * @return
	 * 
	 */
	@Override
	public Utilisateur findbyUsernameSpringS(String login) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);
		DaoUtils.addEqRestrictionIfNotNull(crit, LOGIN, login);
		crit.add(Restrictions.eq(ACTIF, true));

		List<Utilisateur> liste = DaoUtils.castList(Utilisateur.class, crit.list());

		if (CollectionUtils.isNotEmpty(liste) && liste.size() == 1) {
			return liste.get(0);
		}
		return null;
	}

	/**
	 * 
	 * 
	 * @see com.fr.adaming.jsfapp.dao.IUtilisateurDao#findByLoginAndIdUser(java.lang.String,
	 *      java.lang.Long)
	 * @param login
	 * @param idUser
	 * @return
	 * 
	 */
	@Override
	public Utilisateur findByLoginAndIdUser(String login, Long idUser) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);
		DaoUtils.addEqRestrictionIfNotNull(crit, LOGIN, login);
		DaoUtils.addEqRestrictionIfNotNull(crit, "idUtilisateur", idUser);

		List<Utilisateur> liste = DaoUtils.castList(Utilisateur.class, crit.list());

		if (CollectionUtils.isNotEmpty(liste) && liste.size() == 1) {
			return liste.get(0);
		}
		return null;

	}

	@Override
	public Utilisateur findByLogin(String login) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, LOGIN, login);

		List<Utilisateur> liste = DaoUtils.castList(Utilisateur.class, crit.list());

		if (CollectionUtils.isNotEmpty(liste) && liste.size() == 1) {
			return liste.get(0);
		}
		return null;

	}

	@Override
	public Utilisateur findUserByToken(String token) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "token", token);

		List<Utilisateur> liste = DaoUtils.castList(Utilisateur.class, crit.list());

		if (CollectionUtils.isNotEmpty(liste) && liste.size() == 1) {
			return liste.get(0);
		}
		return null;
	}

	@Override
	public List<Utilisateur> findAllUserActif() {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		crit.add(Restrictions.eq(ACTIF, true));

		return DaoUtils.castList(Utilisateur.class, crit.list());
	}

	@Override
	public Utilisateur findByEmail(String email) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "email", email);

		List<Utilisateur> liste = DaoUtils.castList(Utilisateur.class, crit.list());

		if (CollectionUtils.isNotEmpty(liste)) {
			return liste.get(0);
		}
		return null;
	}

	@Override
	public List<Utilisateur> findAllUserCharge() {
		String query = "select * from utilisateur where profil in(0,1,4)";
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Utilisateur> liste = (List<Utilisateur>) st.addEntity(Utilisateur.class).list();

		return liste;
	}

	@Override
	public List<Utilisateur> findAllUserSourceur() {

		String query = "select * from utilisateur where profil in(0,1,2,3,4)";
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Utilisateur> liste = (List<Utilisateur>) st.addEntity(Utilisateur.class).list();

		return liste;
	}

	@Override
	public List<Utilisateur> rechercherSourceurPourReporting() {

		String query = "select * from utilisateur where profil in(0,1,2,3,4) and reporting = 1";
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Utilisateur> liste = (List<Utilisateur>) st.addEntity(Utilisateur.class).list();

		return liste;
	}

	@Override
	public List<Utilisateur> findAllSourceurs() {

		String query = "select * from utilisateur where profil in(0,1,2) and actif = 1";
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Utilisateur> liste = (List<Utilisateur>) st.addEntity(Utilisateur.class).list();

		return liste;
	}

	@Override
	public List<Utilisateur> findAllCharges() {

		String query = "select * from utilisateur where profil = 1 and actif = 1";
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Utilisateur> liste = (List<Utilisateur>) st.addEntity(Utilisateur.class).list();

		return liste;
	}

	@Override
	public Integer nbrCVParSourceurParRegion(Utilisateur utilisateur, Region region, Date dateDebut, Date dateFin) {
		int nbr = 0;

		String query = "SELECT Count(c.ID) FROM candidat AS c Inner Join code_postal AS cp ON c.CODE_POSTAL = cp.ID  WHERE c.CREE_PAR = "
				+ utilisateur.getId() + INSCRI_DATE + df.format(dateDebut) + F_HEURE + df.format(dateFin)
				+ " 23:59:59' AND cp.ID_REGION = " + region.getId() + "";
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParOrigineParTechnologie(Origine origine, Technologie technologie, Date dateDebut,
			Date dateFin) {
		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c  Inner Join utilisateur AS u ON c.CREE_PAR = u.ID WHERE c.ORIGINE = "
				+ origine.getId() + INSCRI_DATE + df.format(dateDebut) + F_HEURE + df.format(dateFin)
				+ " 23:59:59' AND c.TECHNOLOGIE = " + technologie.getId() + " AND u.PROFIL= 2 AND u.ACTIF=1";
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParChargeParTechnologie(Utilisateur utilisateur, Technologie technologie, Date dateDebut,
			Date dateFin) {
		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c Inner Join entretien AS e ON c.ENTRETIEN = e.ID Inner Join utilisateur AS u ON e.CHARGE = u.ID WHERE u.ID = "
				+ utilisateur.getId() + INSCRI_DATE + df.format(dateDebut) + F_HEURE + df.format(dateFin)
				+ " 23:59:59' AND c.TECHNOLOGIE = " + technologie.getId() + "";
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParSourceurParOrigine(Utilisateur utilisateur, Origine origine, Date dateDebut, Date dateFin,
			boolean horsCible) {
		int nbr = 0;
		String query;
		if (horsCible) {
			query = SELECT_REQ + utilisateur.getId() + INSCRI_DATE + df.format(dateDebut) + F_HEURE + df.format(dateFin)
					+ " 23:59:59' AND c.ORIGINE= " + origine.getId() + "";
			query += " AND (e.DISPONIBLE=8 OR e.PERTINENCE IN ('0','1'))";
		} else {
			query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c WHERE  c.CREE_PAR= " + utilisateur.getId()
					+ INSCRI_DATE + df.format(dateDebut) + F_HEURE + df.format(dateFin) + " 23:59:59' AND c.ORIGINE= "
					+ origine.getId() + "";
		}
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParSourceur(Utilisateur utilisateur, Date dateDebut, Date dateFin, boolean horsCible,
			boolean disponible) {

		int nbr = 0;
		String query;
		if (horsCible) {
			query = SELECT_REQ + utilisateur.getId();
			if (dateDebut != null && dateFin != null) {
				query += INSCRI_DATE + df.format(dateDebut) + F_HEURE + df.format(dateFin) + F_HEURE_FIN;
			}
			query += " AND (e.DISPONIBLE=8)";
		} else if (disponible) {
			query = SELECT_REQ + utilisateur.getId();
			if (dateDebut != null && dateFin != null) {
				query += INSCRI_DATE + df.format(dateDebut) + F_HEURE + df.format(dateFin) + " 23:59:59'";
			}
			query += " AND (e.DISPONIBLE=0)";
		} else {
			query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c WHERE  c.CREE_PAR= "
					+ utilisateur.getId();
			if (dateDebut != null && dateFin != null) {
				query += INSCRI_DATE + df.format(dateDebut) + F_HEURE + df.format(dateFin) + F_HEURE_FIN;
			}
		}
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParSourceurParMainframe(Utilisateur utilisateur) {

		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') FROM candidat Inner Join utilisateur ON candidat.CREE_PAR = utilisateur.ID where candidat.DATE_INSCRIPTION Between CURRENT_DATE-1 and CURRENT_DATE and candidat.TECHNOLOGIE=6  and utilisateur.ID ="
				+ utilisateur.getId();

		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParSourceurParMainframePlus(Utilisateur utilisateur) {

		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') FROM candidat Inner Join utilisateur ON candidat.CREE_PAR = utilisateur.ID where candidat.DATE_INSCRIPTION Between CURRENT_DATE-1 and CURRENT_DATE and candidat.TECHNOLOGIE=8  and utilisateur.ID ="
				+ utilisateur.getId();

		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParSourceurParNtic(Utilisateur utilisateur) {

		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') FROM candidat Inner Join utilisateur ON candidat.CREE_PAR = utilisateur.ID where candidat.DATE_INSCRIPTION Between CURRENT_DATE-1 and CURRENT_DATE and candidat.TECHNOLOGIE=7  and utilisateur.ID ="
				+ utilisateur.getId();

		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParSourceurAutreTechnologie(Utilisateur utilisateur) {

		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') FROM candidat Inner Join utilisateur ON candidat.CREE_PAR = utilisateur.ID where  candidat.DATE_INSCRIPTION Between CURRENT_DATE-1 and CURRENT_DATE and candidat.TECHNOLOGIE <> 6 and candidat.TECHNOLOGIE <> 7 and candidat.TECHNOLOGIE <> 8  and utilisateur.ID ="
				+ utilisateur.getId();

		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParSourceurParTechnologie(Utilisateur utilisateur, Technologie technologie, Date dateDebut,
			Date dateFin) {

		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c Inner Join utilisateur AS u ON c.CREE_PAR = u.ID where u.ID = "
				+ utilisateur.getId() + " ";
		if (dateDebut != null && dateFin != null) {
			query += INSCRI_DATE + df.format(dateDebut) + F_HEURE + df.format(dateFin) + " 23:59:59'";
		}
		query += " AND c.TECHNOLOGIE = " + technologie.getId() + "";
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nombreCVParCandidat(ReportingListSourceurDto utilisateur2, Date dateDebut2, Date dateFin2) {
		String queryNbrCV = "SELECT Count(*) FROM candidat c LEFT JOIN entretien e on e.ID=c.ENTRETIEN JOIN utilisateur u on u.ID = c.CREE_PAR";
		return addUserAndDateForQuerySQL(utilisateur2, dateDebut2, dateFin2, queryNbrCV);
	}

	@Override
	public Integer nbrTotalTechnologie(ReportingListSourceurDto utilisateur3, Date dateDebut3, Date dateFin3) {
		String queryNbrTotTech = "select count(*) FROM candidat c join technologie t on t.ID=c.TECHNOLOGIE ";
		return addUserAndDateForQuerySQL(utilisateur3, dateDebut3, dateFin3, queryNbrTotTech);
	}

	public Integer addUserAndDateForQuerySQL(ReportingListSourceurDto utilisateur1, Date dateDebut1, Date dateFin1,
			String query1) {
		if (utilisateur1 != null) {
			query1 += WHERE_CL + utilisateur1.getIdUser();
			if (dateDebut1 != null) {
				query1 += D_INS_SUP + df.format(dateDebut1) + F_HEURE_DEB;
			}
			if (dateFin1 != null) {
				query1 += D_INS_INF + df.format(dateFin1) + F_HEURE_FIN;
			}
		}
		SQLQuery st = getSession().createSQLQuery(query1);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	@Override
	public List<ReportingChargeRelanceDto> rechercherChargeParRelance() {
		String query = "(select group_concat(tmp.nom,' ',tmp.PRENOM separator '') as NOM_PRENOM_CHARGE,tmp.NOMBRE_RELANCE AS cv_relancer,tmp.ID "
				+ FROM + "( " + SELECT_ONLY
				+ "u.ID as ID,u.nom,u.PRENOM,sum(case when (e.RELANCE is not null and e.RELANCE) then 1 else 0 end) AS NOMBRE_RELANCE "
				+ FROM_C + "join entretien e on e.ID=c.ENTRETIEN "
				+ "join utilisateur u on u.ID=e.CHARGE where u.PROFIL=1 and e.DATE_RELANCE < CURRENT_DATE() "
				+ "GROUP BY u.id " + ") " + "as tmp GROUP BY tmp.ID)";

		SQLQuery st = getSession().createSQLQuery(query);
		List<ReportingChargeRelanceDto> data = new ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = st.list();
		if (!dataObject.isEmpty()) {
			for (Object[] o : dataObject) {
				String nom = (String) o[0];
				BigDecimal nbrRelance = (BigDecimal) o[1];
				BigInteger idUser = (BigInteger) o[2];

				data.add(new ReportingChargeRelanceDto(nom, nbrRelance, idUser));

			}
		}

		return data;
	}

	@Override
	public List<ReportingSourceurTechnologieDto> rechercherSourceurTechnologies() {
		String query = "(select group_concat(tmp.nom,' ',tmp.PRENOM separator '') as NOM_PRENOM_SOURCEUR,"
				+ "tmp.MAINFRAMME," + "tmp.MAINFRAMME_PLUS," + "tmp.NTIC," + "tmp.AUTRE_TECHNO," + "tmp.TOTAL " + FROM
				+ "(" + "select u.NOM,u.PRENOM, "
				+ "SUM( case when (t.libelle = 'MAINFRAME') then 1 else 0  end ) as MAINFRAMME,"
				+ "SUM( case when (t.libelle = 'MAINFRAME ++') then 1 else 0  end ) as MAINFRAMME_PLUS,"
				+ "SUM(case when (t.libelle = 'NTIC') then 1 else 0 end ) as NTIC,"
				+ "SUM( case when (t.libelle <> 'NTIC' and t.libelle <> 'MAINFRAME ++' and t.libelle <> 'MAINFRAME') then 1 else 0 end ) as AUTRE_TECHNO,"
				+ "count(*) as TOTAL,u.ID as ID " + FROM_C + JOIN_UT + "JOIN technologie t on t.ID = c.TECHNOLOGIE "
				+ "WHERE c.DATE_INSCRIPTION < CURRENT_DATE AND c.DATE_INSCRIPTION >= (CURRENT_DATE + INTERVAL -1 DAY) "
				+ "group by u.ID ) as tmp group by ID )" + " UNION "
				+ "( select case when (u.NOM <> '') then 'TOTAL' end,"
				+ "SUM(case when (t.libelle = 'MAINFRAME') then 1 else 0 end ) as MAINFRAMME,"
				+ "SUM(case when (t.libelle = 'MAINFRAME ++') then 1 else 0 end ) as MAINFRAMME_PLUS,"
				+ "SUM(case when (t.libelle = 'NTIC') then 1 else 0 end ) as NTIC,"
				+ "SUM(case when (t.libelle <> 'NTIC' and t.libelle <> 'MAINFRAME ++' and t.libelle <> 'MAINFRAME') then 1 else 0 end) as AUTRE_TECHNO,"
				+ "count(*) as TOTAL " + FROM_C + JOIN_UT
				+ "JOIN technologie t on t.ID = c.TECHNOLOGIE WHERE c.DATE_INSCRIPTION < CURRENT_DATE AND c.DATE_INSCRIPTION >= (CURRENT_DATE + INTERVAL -1 DAY)) ";

		SQLQuery st = getSession().createSQLQuery(query);
		List<ReportingSourceurTechnologieDto> data = new ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = st.list();
		if (!dataObject.isEmpty()) {
			for (Object[] o : dataObject) {
				String nom = (String) o[0];
				BigDecimal mainFrame = (BigDecimal) o[1];
				BigDecimal mainFramePlus = (BigDecimal) o[2];
				BigDecimal nbrNtic = (BigDecimal) o[3];
				BigDecimal autreTechno = (BigDecimal) o[4];
				BigInteger total = (BigInteger) o[5];
				data.add(new ReportingSourceurTechnologieDto(nom, mainFrame, mainFramePlus, nbrNtic, autreTechno,
						total));

			}
		}

		return data;
	}

	@Override
	public List<ReportingListSourceurDto> rechercherReportingListSourceur() {
		String query = SEL_DEB + ID_SOUR + "group_concat(tmp.nom,' ',tmp.PRENOM separator '') as NOM_PRENOM_SOURCEUR "
				+ FROM + "( " + "select u.NOM,u.PRENOM,u.ID as ID " + "FROM utilisateur u " + "where u.PROFIL <> 5 "
				+ "group by u.ID) " + TMP_GROUP;

		SQLQuery st = getSession().createSQLQuery(query);

		List<ReportingListSourceurDto> data = new ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = st.list();
		if (!dataObject.isEmpty()) {
			for (Object[] o : dataObject) {
				BigInteger idUser = (BigInteger) o[0];
				String nom = (String) o[1];
				data.add(new ReportingListSourceurDto(idUser, nom));

			}
		}

		return data;
	}

	@Override
	public List<ReportingSourceurParDispoDto> rechercherReportingSourceurParDispo(ReportingListSourceurDto utilisateur,
			Date dateDebut, Date dateFin) {
		String query = SEL_DEB + ID_SOUR + "group_concat(tmp.nom,' ',tmp.PRENOM separator '') as NOM_PRENOM_SOURCEUR, "
				+ "tmp.nombre as nombre_total, " + "IFNULL(tmp.nombre_dipo,0) as nombre_dispo, "
				+ "IFNULL(tmp.nombre_hors,0) as nombre_hors, " + "IFNULL(tmp.autre,0) as autre, "
				+ "IFNULL(tmp.taux_satis,0) as satis, " + "IFNULL(tmp.taux_hors,0) as hors " + FROM + "( "
				+ "select u.NOM,u.PRENOM,u.ID as ID, "
				+ "SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end ) as nombre, "
				+ "IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=0) ),0) as nombre_dipo, "
				+ "IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=8) ),0) as nombre_hors, "
				+ "IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE<>0)  AND (e.DISPONIBLE<>8)),0) as autre, "
				+ "(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end )- (IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=8)),0)))/(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end ))*100 as taux_satis, "
				+ "(IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=8) ),0)/SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end ))*100 as taux_hors "
				+ FROM_C + "LEFT JOIN entretien e on e.ID=c.ENTRETIEN " + JOIN_UT;
		if (utilisateur != null) {
			query += WHERE_CL + utilisateur.getIdUser();
			if (dateDebut != null) {
				query += D_INS_SUP + df.format(dateDebut) + F_HEURE_DEB;
			}
			if (dateFin != null) {
				query += D_INS_INF + df.format(dateFin) + F_HEURE_FIN;
			}
		}
		return reportingSourceur(query);
	}

	public List<ReportingSourceurParDispoDto> reportingSourceur(String queryAll) {
		queryAll += " group by u.ID) " + TMP_GROUP;

		SQLQuery st = getSession().createSQLQuery(queryAll);

		List<ReportingSourceurParDispoDto> data = new ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = st.list();
		if (!dataObject.isEmpty()) {
			for (Object[] o : dataObject) {
				BigInteger idUser = (BigInteger) o[0];
				String nom = (String) o[1];
				BigDecimal nbrTotal = (BigDecimal) o[2];
				BigDecimal nbrDispo = (BigDecimal) o[3];
				BigDecimal nbrHors = (BigDecimal) o[4];
				BigDecimal autre = (BigDecimal) o[5];
				BigDecimal tauxSatis = (BigDecimal) o[6];
				BigDecimal tauxHors = (BigDecimal) o[7];
				tauxSatis = tauxSatis.setScale(0, RoundingMode.HALF_UP);

				// data.add(new ReportingSourceurParDispoDto(idUser, nom, nbrTotal, nbrDispo,
				// nbrHors, autre, tauxSatis,
				// tauxHors));
				data.add(new ReportingSourceurParDispoDto.Builder().setIdUser(idUser).setNomSourceur(nom)
						.setNbrTotal(nbrTotal).setNbrDsipo(nbrDispo).setNbrHors(nbrHors).setAutre(autre)
						.setTaux(tauxSatis).setTauxHors(tauxHors).buildReportingSourceurParDispoDto());

			}
		}
		return data;
	}

	@Override
	public List<ReportingSourceurParDispoDto> rechercherReportingSourceur() {
		String query1 = SEL_DEB + ID_SOUR + "group_concat(tmp.nom,' ',tmp.PRENOM separator '') as NOM_PRENOM_SOURCEUR, "
				+ "tmp.nombre as nombre_total, " + "IFNULL(tmp.nombre_dipo,0) as nombre_dispo, "
				+ "IFNULL(tmp.nombre_hors,0) as nombre_hors, " + "IFNULL(tmp.autre,0) as autre, "
				+ "IFNULL(tmp.taux_satis,0) as satis, " + "IFNULL(tmp.taux_hors,0) as hors " + FROM + "( "
				+ "select u.NOM,u.PRENOM,u.ID as ID, "
				+ "SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end ) as nombre, "
				+ "IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=0) ),0) as nombre_dipo, "
				+ "IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=8) ),0) as nombre_hors, "
				+ "IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE<>0)  AND (e.DISPONIBLE<>8)),0) as autre, "
				+ "(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end )- (IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=8)),0)))/(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end ))*100 as taux_satis, "
				+ "(IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=8) ),0)/SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end ))*100 as taux_hors "
				+ FROM_C + "LEFT JOIN entretien e on e.ID=c.ENTRETIEN " + JOIN_UT;
		return reportingSourceur(query1);
	}

	@Override
	public Map<String, Integer> reportingCVParTechnologieParSourceur() {

		String queryCV = SELECT_ONLY
				+ "t.libelle AS nom_techno,SUM(case when (c.TECHNOLOGIE = t.ID) then 1 else 0 end ) as nombre " + FROM_C
				+ "join technologie t on t.ID=c.TECHNOLOGIE ";
		return reportingAll(queryCV);
	}

	public Map<String, Integer> reportingAll(String query) {
		Map<String, Integer> map = new HashMap<>();
		query += " GROUP BY t.ID ";
		query += "ORDER BY t.ID";

		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = st.list();
		if (!dataObject.isEmpty()) {
			for (Object[] o : dataObject) {
				String nom = (String) o[0];
				BigDecimal nbr = (BigDecimal) o[1];

				map.put(nom, nbr.intValue());

			}

		}

		return map;

	}

	@Override
	public Map<String, Integer> rechercherReportingCVParTechnologieParSourceur(ReportingListSourceurDto utilisateur,
			Date dateDebut, Date dateFin) {
		String queryCVTech = SELECT_ONLY
				+ "t.libelle AS nom_techno,SUM(case when (c.TECHNOLOGIE = t.ID) then 1 else 0 end ) as nombre " + FROM_C
				+ "join technologie t on t.ID=c.TECHNOLOGIE ";
		if (utilisateur != null) {
			queryCVTech += WHERE_CL + utilisateur.getIdUser();
			if (dateDebut != null) {
				queryCVTech += D_INS_SUP + df.format(dateDebut) + F_HEURE_DEB;
			}
			if (dateFin != null) {
				queryCVTech += D_INS_INF + df.format(dateFin) + F_HEURE_FIN;
			}
		}

		return reportingAll(queryCVTech);
	}

}
