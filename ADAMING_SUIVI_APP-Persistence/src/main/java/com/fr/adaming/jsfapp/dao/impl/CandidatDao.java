package com.fr.adaming.jsfapp.dao.impl;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;
import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.ICandidatDao;
import com.fr.adaming.jsfapp.dto.CandidatDto;
import com.fr.adaming.jsfapp.dto.ReportingFicheCVRelance;
import com.fr.adaming.jsfapp.dto.ReportingFicheSourceur;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.dto.SyntheseCandidatDto;
import com.fr.adaming.jsfapp.dto.UtilisateurDto;
import com.fr.adaming.jsfapp.model.Candidat;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.model.Utilisateur;
import com.fr.adaming.jsfapp.utils.DateUtils;

@Repository("candidatDao")
public class CandidatDao extends ManagerDao<Candidat, Long> implements ICandidatDao {
	/**
	 * 
	 */
	private static final long serialVersionUID = 855012502334886128L;
	DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	private static final String dateHeure = " 00:00:00' AND '";
	private static final String dateHeure2 = " 23:59:59'";
	private static final String technologie = "technologie";
	private static final String totalCandidat = "totalCandidat";
	private static final String posRegion = "pos.region";
	private static final String regionR = "region";
	private static final String TEL = "numeroTel";
	private static final String DATE_INSCRIPTION = "dateInscription";
	private static final String CODE_POSTAL = "codePostal";
	private static final String EN_DATE = "en.date";
	private static final String ENTRETIEN = "entretien";

	@Override
	public Candidat rechercherCandidatParEmail(String email) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Candidat.class);
		DaoUtils.addEqRestrictionIfNotNull(crit, "email", email);
		System.out.println(email);
		crit.setMaxResults(1);
		Candidat c = (Candidat) crit.uniqueResult();
		System.out.println(c);
		return c;
	}

	@Override
	public Candidat rechercherCandidatParNumTel(String numero) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Candidat.class);
		DaoUtils.addEqRestrictionIfNotNull(crit, TEL, numero);
		crit.setMaxResults(1);
		return (Candidat) crit.uniqueResult();
	}

	public boolean testerNullAndEmpty(String test) {
		if (test != null && !test.isEmpty()) {

			return true;
		}
		return false;
	}

	public boolean testerNullAndEmptyObject(Object ob, Object test) {
		if (ob != null && test != null) {

			return true;
		}
		return false;
	}

	public boolean testerNullAndEmptyStringObject(String test, Object ob) {
		if (test != null && !test.isEmpty() && ob != null) {

			return true;
		}
		return false;
	}

	public boolean testerNullAndEmptyObjectObject(Object ob, Object test, Object ob2) {
		if (ob != null && test != null && ob2 != null) {

			return true;
		}
		return false;
	}

	public boolean testerNullAndEmptyObjectObjectString(Object ob, String test1, Object test, Object ob2) {
		if (ob != null && !test1.isEmpty() && test != null && ob2 != null) {

			return true;
		}
		return false;
	}

	@Override
	public List<Candidat> rechercherCandidatAvecEntretien(CandidatDto candidatDto, Boolean all) {
		String query = "select * from candidat this_ inner join code_postal codepostal3_ on this_.CODE_POSTAL=codepostal3_.ID inner join utilisateur utilisateu4_ on this_.CREE_PAR=utilisateu4_.ID inner join entretien en1_ on this_.ENTRETIEN=en1_.ID left outer join utilisateur utilisateu6_ on en1_.CHARGE=utilisateu6_.ID left outer join lieu lieu7_ on en1_.LIEU=lieu7_.ID inner join origine origine8_ on this_.ORIGINE=origine8_.ID left outer join session_formation sessionfor9_ on this_.SESSION_FORMATION=sessionfor9_.ID left outer join formation formation10_ on sessionfor9_.FORMATION=formation10_.ID left outer join suivi suivi11_ on this_.SUIVI=suivi11_.ID left outer join utilisateur utilisateu12_ on suivi11_.CHARGE=utilisateu12_.ID inner join technologie technologi13_ on this_.TECHNOLOGIE=technologi13_.ID where 1=1 ";

		if (candidatDto != null) {
			if (testerNullAndEmpty(candidatDto.getNom())) {
				query = query + " AND this_.NOM LIKE '%" + candidatDto.getNom() + "%'";
			}
			if (testerNullAndEmpty(candidatDto.getPrenom())) {
				query = query + " AND this_.PRENOM LIKE '%" + candidatDto.getPrenom() + "%'";
			}
			if (testerNullAndEmpty(candidatDto.getNumeroTel())) {
				query = query + " AND this_.NUMERO_TEL = '" + candidatDto.getNumeroTel() + "'";
			}
			if (all) {
				query = query
						+ " AND this_.STATUT IN ('1','2','3','4') AND en1_.DATE IS NOT NULL AND en1_.DATE <= CURRENT_DATE() ";
			} else {
				query = query
						+ " AND this_.STATUT IN ('2','3','4') AND en1_.DATE IS NOT NULL  AND en1_.DATE <= CURRENT_DATE() AND en1_.LIEU IS NOT NULL AND lieu7_.LIBELLE IS NOT NULL ";
			}

			if (testerNullAndEmptyObject(candidatDto.getEntretien(), candidatDto.getEntretien().getDate())) {
				query = query + " AND en1_.DATE BETWEEN '" + df.format(candidatDto.getEntretien().getDate()) + dateHeure

						+ df.format(candidatDto.getEntretien().getDate()) + dateHeure2;
			}

			if (testerNullAndEmptyObject(candidatDto.getEntretien(), candidatDto.getEntretien().getLieu())) {
				query = query + " AND en1_.LIEU = '" + candidatDto.getEntretien().getLieu().getId() + "'";
			}
			if (testerNullAndEmptyObject(candidatDto.getEntretien(), candidatDto.getEntretien().getCharge())) {
				query = query + " AND en1_.CHARGE = " + candidatDto.getEntretien().getCharge().getId() + "";
			}

			if (testerNullAndEmptyObject(candidatDto.getSuivi(), candidatDto.getSuivi().getMobilite())) {
				query = query + " AND suivi11_.MOBILITE = " + candidatDto.getSuivi().getMobilite() + "";
			}
		}
		query = query + " ORDER BY en1_.DATE DESC ";
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Candidat> liste = (List<Candidat>) st.addEntity(Candidat.class).list();

		return liste;
	}

	@Override
	public List<SyntheseCandidatDto> rechercherSyntheseCandidatParDate(Date date) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Candidat.class);
		if (date != null) {
			Date minDate = DaoUtils.getDateWithoutTime(date);
			Date maxDate = new Date(minDate.getTime() + TimeUnit.DAYS.toMillis(1));
			Conjunction conjunction = Restrictions.conjunction();

			// The order date must be >= 17-04-2011 - 00h00
			conjunction.add(Restrictions.ge(DATE_INSCRIPTION, minDate));
			// And the order date must be < 18-04-2011 - 00h00
			conjunction.add(Restrictions.lt(DATE_INSCRIPTION, maxDate));
			crit.add(conjunction);
		}
		crit.addOrder(Order.asc("creePar.id"));
		crit.createAlias(CODE_POSTAL, "pos");

		crit.setProjection(Projections.projectionList().add(Projections.groupProperty("creePar"), "creePar")
				.add(Projections.groupProperty(DATE_INSCRIPTION), DATE_INSCRIPTION)
				.add(Projections.groupProperty(technologie), technologie)
				.add(Projections.groupProperty(posRegion), regionR).add(Projections.count("id"), totalCandidat)).list();

		crit.setResultTransformer(Transformers.aliasToBean(SyntheseCandidatDto.class));
		return DaoUtils.castList(SyntheseCandidatDto.class, crit.list());
	}

	@Override
	public List<SyntheseCandidatDto> rechercherSyntheseJournee(Date date) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Candidat.class);
		if (date != null) {
			Date minDate = DaoUtils.getDateWithoutTime(date);
			Date maxDate = new Date(minDate.getTime() + TimeUnit.DAYS.toMillis(1));
			Conjunction conjunction = Restrictions.conjunction();

			// The order date must be >= 17-04-2011 - 00h00
			conjunction.add(Restrictions.ge(DATE_INSCRIPTION, minDate));
			// And the order date must be < 18-04-2011 - 00h00
			conjunction.add(Restrictions.lt(DATE_INSCRIPTION, maxDate));
			crit.add(conjunction);
		}
		crit.createAlias(CODE_POSTAL, "pos");

		crit.setProjection(Projections.projectionList().add(Projections.groupProperty(technologie), technologie)
				.add(Projections.groupProperty(posRegion), regionR).add(Projections.count("id"), totalCandidat)).list();
		crit.setResultTransformer(Transformers.aliasToBean(SyntheseCandidatDto.class));
		return DaoUtils.castList(SyntheseCandidatDto.class, crit.list());
	}

	@Override
	public List<SyntheseCandidatDto> rechercherSyntheseSemaine(Date dateDebut, Date dateFin) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Candidat.class);
		if (dateDebut != null && dateFin != null) {
			Conjunction conjunction = Restrictions.conjunction();

			// The order date must be >= 17-04-2011 - 00h00
			conjunction.add(Restrictions.ge(DATE_INSCRIPTION, DaoUtils.getDateWithoutTime(dateDebut)));
			// And the order date must be < 18-04-2011 - 00h00
			conjunction.add(Restrictions.lt(DATE_INSCRIPTION, new Date(dateFin.getTime() + TimeUnit.DAYS.toMillis(1))));
			crit.add(conjunction);
		}
		crit.createAlias(CODE_POSTAL, "pos");

		crit.setProjection(Projections.projectionList().add(Projections.groupProperty(technologie), technologie)
				.add(Projections.groupProperty(posRegion), regionR).add(Projections.count("id"), totalCandidat)).list();
		crit.setResultTransformer(Transformers.aliasToBean(SyntheseCandidatDto.class));
		return DaoUtils.castList(SyntheseCandidatDto.class, crit.list());
	}

	@Override
	public List<Candidat> rechercherCandidatParIdOrigine(Long idOrigine) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Candidat.class);
		DaoUtils.addEqRestrictionIfNotNull(crit, "origine.id", idOrigine);
		return DaoUtils.castList(Candidat.class, crit.list());
	}

	@Override
	public List<Candidat> rechercherCandidatParIdTechnologie(Long idTechnologie) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Candidat.class);
		DaoUtils.addEqRestrictionIfNotNull(crit, "technologie.id", idTechnologie);
		return DaoUtils.castList(Candidat.class, crit.list());
	}

	@Override
	public List<Candidat> rechercherCandidatAvecSessionFormation(SessionFormationDto sessionFormationDto) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Candidat.class);
		if (sessionFormationDto != null) {
			crit.createAlias("sessionFormation", "sf");
			DaoUtils.addEqRestrictionIfNotNull(crit, "sf.id", sessionFormationDto.getId());
		}
		crit.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);

		return DaoUtils.castList(Candidat.class, crit.list());
	}

	@Override
	public List<Candidat> rechercherCandidatAccepterAvecSessionFormation(SessionFormationDto sessionFormationDto) {
		String queryString = "select * from candidat where candidat.DOC_CONSULTATION=1 and candidat.SESSION_FORMATION="
				+ sessionFormationDto.getId();
		SQLQuery st = getSession().createSQLQuery(queryString);

		@SuppressWarnings("unchecked")
		List<Candidat> liste = (List<Candidat>) st.addEntity(Candidat.class).list();

		return liste;

	}

	@Override
	public List<Candidat> rechercherCandidatEnAttenteEvaluation() {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Candidat.class);
		Date date = DateUtils.getYesterday();
		crit.createAlias("entretien", "en");
		if (date != null) {
			Date minDate = DaoUtils.getDateWithoutTime(date);
			Date maxDate = new Date(minDate.getTime() + TimeUnit.DAYS.toMillis(1));
			Conjunction conjunction = Restrictions.conjunction();

			// The order date must be >= 17-04-2011 - 00h00
			conjunction.add(Restrictions.ge(EN_DATE, minDate));
			// And the order date must be < 18-04-2011 - 00h00
			conjunction.add(Restrictions.lt(EN_DATE, maxDate));
			crit.add(conjunction);
		}

		return DaoUtils.castList(Candidat.class, crit.list());
	}

	@Override
	public List<Candidat> rechercherCandidatsSansEtretiens() {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Candidat.class);
		crit.addOrder(Order.desc(DATE_INSCRIPTION));
		crit.add(Restrictions.isNull(ENTRETIEN));
		return DaoUtils.castList(Candidat.class, crit.list());
	}

	@Override
	public List<Candidat> rechercherCandidatAjout(CandidatDto candidatDto) {

		String query = "  SELECT *  FROM candidat  WHERE     ";
		if (candidatDto.getNom() != null) {
			query = query + "  (     candidat.PRENOM = '" + candidatDto.getNom() + "'  AND      candidat.NOM  =  '"
					+ candidatDto.getPrenom() + "') ";
		}
		if (candidatDto.getPrenom() != null) {
			query = query + " or (     candidat.NOM = '" + candidatDto.getNom() + "'  AND      candidat.PRENOM   =  '"
					+ candidatDto.getPrenom() + "'    ) ";
		}
		if (candidatDto.getEmail() != null && !candidatDto.getEmail().isEmpty()) {

			query = query + " or  candidat.EMAIL='" + candidatDto.getEmail() + "'    ";
		}
		if (candidatDto.getNumeroTel() != null && !candidatDto.getNumeroTel().isEmpty()) {
			String telSlipt = candidatDto.getNumeroTel().replace("-", "");
			query = query + " or candidat.NUMERO_TEL='" + candidatDto.getNumeroTel() + "'  or candidat.NUMERO_TEL='"
					+ telSlipt + "'";
		}

		if (candidatDto.getDiplome() != null && !candidatDto.getDiplome().isEmpty()) {
			query = query + " AND candidat.DIPLOME='" + candidatDto.getDiplome() + "'";
		}

		if (candidatDto.getDateObtentionDiplome() != null) {
			query = query + " AND candidat.DATE_OBTENTION_DIPLOME ='" + df.format(candidatDto.getDateObtentionDiplome())
					+ " 00:00:00'";
		}
		SQLQuery st = getSession().createSQLQuery(query);

		@SuppressWarnings("unchecked")
		List<Candidat> liste = (List<Candidat>) st.addEntity(Candidat.class).list();

		return liste;
	}

	public List<String> rechercherNomCv() {
		String query = "SELECT  candidat.NOM_CV FROM  candidat WHERE  candidat.NOM_CV is NOT null ";

		SQLQuery st = getSession().createSQLQuery(query);

		@SuppressWarnings("unchecked")
		List<String> liste = (List<String>) st.list();

		return liste;
	}

	@Override
	public List<Candidat> rechercherCandidatParDate(CandidatDto candidatDto) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Candidat.class);
		crit.addOrder(Order.desc(DATE_INSCRIPTION));
		return DaoUtils.castList(Candidat.class, crit.list());
	}

	@Override
	public List<Candidat> candidatARelancer(Utilisateur charge) {
		String query = "SELECT * FROM candidat AS c Inner Join entretien AS e ON c.ENTRETIEN = e.ID WHERE datediff(e.DATE_RELANCE, CURDATE()) = 1 AND e.CHARGE ="
				+ charge.getId();
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Candidat> liste = (List<Candidat>) st.addEntity(Candidat.class).list();

		return liste;
	}

	@Override
	public List<Candidat> candidatARelancer(CandidatDto candidatDto) {
		String query = "select * from candidat this_ inner join code_postal codepostal2_ on this_.CODE_POSTAL=codepostal2_.ID inner join utilisateur utilisateu3_ on this_.CREE_PAR=utilisateu3_.ID left outer join entretien entretien4_ on this_.ENTRETIEN=entretien4_.ID left outer join utilisateur utilisateu5_ on entretien4_.CHARGE=utilisateu5_.ID left outer join lieu lieu6_ on entretien4_.LIEU=lieu6_.ID inner join origine origine7_ on this_.ORIGINE=origine7_.ID left outer join session_formation sessionfor8_ on this_.SESSION_FORMATION=sessionfor8_.ID left outer join formation formation9_ on sessionfor8_.FORMATION=formation9_.ID left outer join suivi suivi10_ on this_.SUIVI=suivi10_.ID left outer join utilisateur utilisateu11_ on suivi10_.CHARGE=utilisateu11_.ID inner join technologie technologi12_ on this_.TECHNOLOGIE=technologi12_.ID WHERE  entretien4_.RELANCE = 1 ";
		String numerTelTraite = "";

		if (testerNullAndEmptyObject(candidatDto, candidatDto.getId())) {
			query = query + " AND this_.ID =" + candidatDto.getId();
		}
		if (testerNullAndEmptyStringObject(candidatDto.getNom(), candidatDto)) {
			query = query + " AND this_.NOM LIKE '%" + candidatDto.getNom() + "%'";
		}
		if (testerNullAndEmptyStringObject(candidatDto.getPrenom(), candidatDto)) {
			query = query + " AND this_.PRENOM LIKE '%" + candidatDto.getPrenom() + "%'";
		}
		if (testerNullAndEmptyStringObject(candidatDto.getEmail(), candidatDto)) {
			query = query + " AND this_.EMAIL LIKE '%" + candidatDto.getEmail().trim() + "%'";
		}
		if (testerNullAndEmptyStringObject(candidatDto.getNumeroTel(), candidatDto)) {
			/*
			 * Récupérer Numéro de Téléphone sans caractère "-" Gérer le problème de
			 * insertion de donnée mal insert au niveau de base
			 */
			numerTelTraite = candidatDto.getNumeroTel();
			query = query + " AND this_.numero_Tel LIKE '%" + numerTelTraite + "%'";
		}
		if (testerNullAndEmptyObject(candidatDto.getTechnologie(), candidatDto)) {
			query = query + " AND technologi12_.ID= " + candidatDto.getTechnologie().getId();
		}
		if (testerNullAndEmptyObject(candidatDto.getCreePar(), candidatDto)) {
			query = query + " AND this_.CREE_PAR= " + candidatDto.getCreePar().getId() + "";
		}
		if (testerNullAndEmptyObject(candidatDto.getEntretien().getCharge(), candidatDto)) {
			query = query + " AND entretien4_.CHARGE= " + candidatDto.getEntretien().getCharge().getId() + "";
		}
		if (testerNullAndEmptyObject(candidatDto.getEntretien().getDisponible(), candidatDto)) {
			query = query + " AND entretien4_.DISPONIBLE= " + candidatDto.getEntretien().getDisponible().ordinal() + "";
		}

		if (testerNullAndEmptyObjectObject(candidatDto.getEntretien().getDate(), candidatDto.getEntretien(),
				candidatDto)) {
			query = query + " AND entretien4_.DATE BETWEEN '" + df.format(candidatDto.getEntretien().getDate())
					+ dateHeure + df.format(candidatDto.getEntretien().getDate()) + dateHeure2;
		}
		if (testerNullAndEmptyObjectObject(candidatDto.getEntretien().getLieu(), candidatDto.getEntretien(),
				candidatDto)) {
			query = query + " AND entretien4_.LIEU= " + candidatDto.getEntretien().getLieu().getId() + "";
		}
		if (testerNullAndEmptyObjectObject(candidatDto.getEntretien().getConfirmation(), candidatDto.getEntretien(),
				candidatDto)) {
			query = query + " AND entretien4_.CONFIRMATION= "
					+ candidatDto.getEntretien().getConfirmation().booleanValue() + "";
		}
		if (testerNullAndEmptyObjectObject(candidatDto.getCodePostal(), candidatDto.getEntretien(), candidatDto)) {
			query = query + " AND codepostal2_.REGION LIKE '" + candidatDto.getCodePostal().getRegion() + "'";
		}
		if (testerNullAndEmptyObjectObject(candidatDto.getEntretien().getDateRelance(), candidatDto.getEntretien(),
				candidatDto)) {
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(candidatDto.getEntretien().getDateRelance());

			calendar.add(Calendar.MONTH, 1);
			calendar.set(Calendar.DAY_OF_MONTH, 1);
			calendar.add(Calendar.DATE, -1);

			Date lastDayOfMonth = calendar.getTime();
			query = query + " AND entretien4_.DATE_RELANCE BETWEEN '"
					+ df.format(candidatDto.getEntretien().getDateRelance()) + dateHeure
					+ df.format(lastDayOfMonth.getTime()) + dateHeure2;
		}
		if (testerNullAndEmptyObjectObjectString(candidatDto.getStatut(), candidatDto.getStatut().getLabel(),
				candidatDto.getEntretien(), candidatDto)) {
			query = query + " AND this_.STATUT = '" + candidatDto.getStatut().ordinal() + "'";
		}

		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Candidat> liste = (List<Candidat>) st.addEntity(Candidat.class).list();

		return liste;
	}

	@Override
	public Integer nbrCVParTechnologie(Technologie technologie) {
		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)')  from candidat where  candidat.STATUT=2 AND candidat.ENTRETIEN is null and candidat.TECHNOLOGIE= "
				+ technologie.getId() + " ";
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	public Integer cvArelancer(UtilisateurDto charge) {
		int nbr = 1;
		String query = "select Count('disticnt(c.ID)') from candidat left outer join entretien  on candidat.ENTRETIEN=entretien.ID where entretien.RELANCE=1 and entretien.DATE_RELANCE < CURRENT_DATE() and  entretien.CHARGE="
				+ charge.getId();
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public List<Candidat> rechercherCandidatParCharge(UtilisateurDto charge) {
		String query = "select *  from candidat left outer join entretien  on candidat.ENTRETIEN=entretien.ID  inner join technologie  on candidat.TECHNOLOGIE=technologie.ID where entretien.RELANCE=1 and entretien.DATE_RELANCE < CURRENT_DATE() and entretien.CHARGE= "
				+ charge.getId();
		query = query + " ORDER BY entretien.DATE_RELANCE DESC ";
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Candidat> liste = (List<Candidat>) st.addEntity(Candidat.class).list();

		return liste;
	}

	@Override
	public List<Candidat> rechercherCandidatSession(SessionFormationDto session) {
		String query = "select * from candidat inner join session_formation on candidat.SESSION_FORMATION=session_formation.ID where candidat.DOC_CONSULTATION=1 and session_formation.ID= "
				+ session.getId();
		query = query + " ORDER BY candidat.CREE_PAR ";
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Candidat> liste = (List<Candidat>) st.addEntity(Candidat.class).list();

		return liste;
	}

	@Override

	public Map<String, Integer> nbrCVParTechnologie() {
		Map<String, Integer> map = new HashMap<>();
		String query = "select "
				+ "t.libelle AS nom_techno,SUM(case when (c.TECHNOLOGIE = t.ID) then 1 else 0 end ) as nombre "
				+ "FROM candidat c " + "join technologie t on t.ID=c.TECHNOLOGIE "
				+ "WHERE c.ENTRETIEN is NULL and c.STATUT=2 " + "GROUP BY t.ID " + "ORDER BY t.ID";

		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = (List<Object[]>) st.list();
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
	public Integer nombreTechnologieParCandidat() {
		String query = "select count(*) " + "FROM candidat c join technologie t on t.ID=c.TECHNOLOGIE "
				+ "WHERE c.ENTRETIEN is NULL and c.STATUT=2";
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	@Override
	public List<ReportingFicheCVRelance> rechercherCandidatParCharge(int idcharge) {
		String query = "select c.NOM, c.PRENOM, c.NUMERO_TEL,c.EMAIL,DATE_FORMAT(e.DATE_RELANCE,'%d/%m/%Y'),t.libelle "
				+ "from candidat c " + "join entretien e  on e.ID=c.ENTRETIEN " + "join utilisateur u on u.ID=e.CHARGE "
				+ "inner join technologie t  on t.ID=c.TECHNOLOGIE "
				+ "where e.RELANCE=1 and e.DATE_RELANCE < CURRENT_DATE() and e.CHARGE= :idCharge"
				+ " ORDER BY e.DATE_RELANCE DESC ";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("idCharge", idcharge);
		List<ReportingFicheCVRelance> data = new ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = (List<Object[]>) st.list();
		if (!dataObject.isEmpty()) {
			for (Object[] o : dataObject) {
				String nom = (String) o[0];
				String prenom = (String) o[1];
				String numero = (String) o[2];
				String email = (String) o[3];
				String date = (String) o[4];
				String technologie = (String) o[5];

				data.add(new ReportingFicheCVRelance(nom, prenom, numero, email, date, technologie));

			}
		}

		return data;
	}

	@Override
	public List<ReportingFicheSourceur> rechercherCandidatSessionAccueil(int idsession) {
		String query = "select " + "c.NOM as nom_candidat, " + "c.PRENOM as prenom_candidat, " + "c.NUMERO_TEL as num, "
				+ "c.EMAIL as tel, " + "u.NOM as nom_sourceur, " + "u.PRENOM as prenom_sourceur, "
				+ "ue.NOM as nom_charge, " + "ue.PRENOM as prenom_charge " + "from candidat c "
				+ "JOIN entretien e on e.ID=c.ENTRETIEN " + "JOIN utilisateur ue on ue.ID=e.CHARGE "
				+ "join session_formation s on s.ID=c.SESSION_FORMATION " + "JOIN utilisateur u on u.ID=c.CREE_PAR "
				+ "where c.DOC_CONSULTATION=1 and s.ID= :idsession" + " ORDER BY c.CREE_PAR";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("idsession", idsession);
		List<ReportingFicheSourceur> data = new ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = (List<Object[]>) st.list();
		if (!dataObject.isEmpty()) {
			for (Object[] o : dataObject) {
				String nom = (String) o[0];
				String prenom = (String) o[1];
				String numero = (String) o[2];
				String email = (String) o[3];
				String nomsourceur = (String) o[4];
				String prenomsourceur = (String) o[5];
				String nomcharge = (String) o[6];
				String prenomcharge = (String) o[7];

				data.add(new ReportingFicheSourceur(nom, prenom, numero, email, nomsourceur, prenomsourceur, nomcharge,
						prenomcharge));

			}
		}

		return data;
	}

}
