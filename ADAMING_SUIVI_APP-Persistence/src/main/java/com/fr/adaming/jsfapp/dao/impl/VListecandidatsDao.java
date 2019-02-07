package com.fr.adaming.jsfapp.dao.impl;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.IvListeCandidatsDao;
import com.fr.adaming.jsfapp.dto.VListeCandidatsDto;
import com.fr.adaming.jsfapp.model.VListeCandidats;

@Repository("v_ListeCandidatsDao")
public class VListecandidatsDao extends ManagerDao<VListeCandidats, Long> implements IvListeCandidatsDao {
	DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	private static final String candidatNom = " AND V_ListeCandidats.NOM_CANDIDAT LIKE '%";
	private static final String candidatPrenom = " AND V_ListeCandidats.PRENOM_CANDIDAT LIKE '%";
	private static final String candidatEntretient = " AND DATE(V_ListeCandidats.DATE_ENTRETIEN) ='";
	private static final String lieuEntretien = " AND V_ListeCandidats.LIEU_ENTRETIEN LIKE '%";
	private static final String nomCharge = " AND V_ListeCandidats.NOM_CHARGE LIKE '%";
	private static final String prenomCharge = " AND V_ListeCandidats.PRENOM_CHARGE LIKE '%";
	private static final String candidatStatus = " AND V_ListeCandidats.STATUT = ";
	private static final String AND = "' AND '";
	private static final String listeDateInscription = " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'";
	private static final String listeDateInscriptionAvecDate = " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) BETWEEN '";
	private static final String dateFormat = " 23:59:59'";
	private static final String dateFormat2 = " 00:00:00' AND '";
	private static final String candidatNumeroTel = " AND V_ListeCandidats.NUMERO_TEL_CANDIDAT LIKE '%";
	private static final String candidatEmail = " AND V_ListeCandidats.EMAIL_CANDIDAT LIKE '%";
	private static final String vListeCandidatInscri = " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) ='";
	private static final String listeCandidatTechnologie = " AND V_ListeCandidats.TECHNOLOGIE = '";
	private static final String listeCandidatRegion = " AND V_ListeCandidats.REGION LIKE '%";
	private static final String listeCandidatNomSourceur = " AND V_ListeCandidats.NOM_SOURCEUR LIKE '%";
	private static final String listeCandidatPrenomSourceur = " AND V_ListeCandidats.PRENOM_SOURCEUR LIKE '%";
	private static final String listeCandiatConfirmation = " AND V_ListeCandidats.CONFIRMATION_RDV = ";
	private static final String candidatDateRelance = " AND DATE(V_ListeCandidats.DATE_RELANCE) >= '";

	@Override
	public Integer rechercherCandidatAvecEntretienNbr(VListeCandidatsDto v_ListeCandidatsDto, Boolean all) {
		String query = "SELECT count(*) FROM V_ListeCandidats WHERE 1=1 ";
		query = GenerateEntretienConditionQuery(v_ListeCandidatsDto, all, query);
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();

	}

	@Override
	public List<VListeCandidats> rechercherCandidatAvecEntretien(VListeCandidatsDto vListeCandidatsDto, int page,
			int size, Boolean all) {
		String query = "SELECT * FROM V_ListeCandidats WHERE 1=1 ";
		query = GenerateEntretienConditionQuery(vListeCandidatsDto, all, query);
		query += " ORDER BY V_ListeCandidats.DATE_ENTRETIEN DESC  LIMIT :page ,:size";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size",
				size);
		@SuppressWarnings("unchecked")
		List<VListeCandidats> liste = (List<VListeCandidats>) st.addEntity(VListeCandidats.class).list();

		return liste;
	}

	private String GenerateEntretienConditionQuery(VListeCandidatsDto v_ListeCandidatsDto, Boolean all, String query) {
		if (v_ListeCandidatsDto != null) {
			if (v_ListeCandidatsDto.getNom() != null && !v_ListeCandidatsDto.getNom().isEmpty()) {
				query = query + candidatNom + v_ListeCandidatsDto.getNom() + "%'";
			}

			if (v_ListeCandidatsDto.getPrenom() != null && !v_ListeCandidatsDto.getPrenom().isEmpty()) {
				query = query + candidatPrenom + v_ListeCandidatsDto.getPrenom() + "%'";
			}

			if (v_ListeCandidatsDto.getNumeroTel() != null && !v_ListeCandidatsDto.getNumeroTel().isEmpty()) {
				query = query + " AND V_ListeCandidats.NUMERO_TEL_CANDIDAT = '" + v_ListeCandidatsDto.getNumeroTel()
						+ "'";
			}

			if (v_ListeCandidatsDto.getDateEntretien() != null) {
				query = query + candidatEntretient + sdf.format(v_ListeCandidatsDto.getDateEntretien()) + "'";
			}

			if (v_ListeCandidatsDto.getLieuEntretien() != null && !v_ListeCandidatsDto.getLieuEntretien().isEmpty()) {
				query = query + lieuEntretien + v_ListeCandidatsDto.getLieuEntretien() + "%'";
			}
			if (v_ListeCandidatsDto.getNomCharge() != null && !v_ListeCandidatsDto.getNomCharge().isEmpty()) {
				query = query + nomCharge + v_ListeCandidatsDto.getNomCharge() + "%'";
			}
			if (v_ListeCandidatsDto.getPrenomCharge() != null && !v_ListeCandidatsDto.getPrenomCharge().isEmpty()) {
				query = query + prenomCharge + v_ListeCandidatsDto.getPrenomCharge() + "%'";
			}

			if (v_ListeCandidatsDto.getMobilite() != null) {
				query = query + " AND V_ListeCandidats.MOBILITE = " + v_ListeCandidatsDto.getMobilite() + "";
			}

			if (v_ListeCandidatsDto.getStatut() != null) {
				query = query + candidatStatus + v_ListeCandidatsDto.getStatut().ordinal() + "";
			}
		}
		if (all) {
			query = query
					+ " AND V_ListeCandidats.STATUT IN ('1','2','3','4') AND V_ListeCandidats.DATE_ENTRETIEN IS NOT NULL AND  DATE(V_ListeCandidats.DATE_ENTRETIEN) <= CURRENT_DATE() ";
		} else {
			query = query
					+ " AND V_ListeCandidats.STATUT IN ('2','3','4') AND V_ListeCandidats.DATE_ENTRETIEN IS NOT NULL  AND  DATE(V_ListeCandidats.DATE_ENTRETIEN) <= CURRENT_DATE() AND V_ListeCandidats.LIEU_ENTRETIEN IS NOT NULL ";
		}
		return query;
	}

	@Override
	public List<VListeCandidats> rechercherVlisteCandidatsARelancer(VListeCandidatsDto vListeCandidatsDto, int page,
			int size) {

		String query = "SELECT * FROM V_ListeCandidats WHERE V_ListeCandidats.RELANCER=1 ";
		query = GeneretaeARelancerConditionQuery(vListeCandidatsDto, query);
		query += " LIMIT " + page + "," + size;
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<VListeCandidats> liste = (List<VListeCandidats>) st.addEntity(VListeCandidats.class).list();
		return liste;
	}

	@Override
	public Integer rechercherVlisteCandidatsARelancerNbr(VListeCandidatsDto ncd) {
		String query = "SELECT count(*) FROM V_ListeCandidats WHERE V_ListeCandidats.RELANCER=1 ";
		query = GeneretaeARelancerConditionQuery(ncd, query);
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	public String getQueryString(String query, String value) {

		if (value != null) {
			if (value.equals("1")) {
				Calendar calendar = Calendar.getInstance();
				Date date = calendar.getTime();
				calendar.add(Calendar.MONTH, -1);
				Date toDate = calendar.getTime();
				query = query + listeDateInscription + sdf.format(toDate) + AND + sdf.format(date) + "'";
			} else if (value.equals("2")) {
				Calendar calendar = Calendar.getInstance();
				calendar.add(Calendar.MONTH, -1);
				Date date = calendar.getTime();
				calendar.add(Calendar.MONTH, -6);
				Date toDate = calendar.getTime();
				query = query + listeDateInscriptionAvecDate + sdf.format(toDate) + AND + sdf.format(date) + "'";

			} else if (value.equals("3")) {
				Calendar calendar = Calendar.getInstance();
				calendar.add(Calendar.MONTH, -6);
				Date date = calendar.getTime();
				calendar.add(Calendar.YEAR, -3);
				Date toDate = calendar.getTime();
				query = query + listeDateInscription + sdf.format(toDate) + dateFormat2 + sdf.format(date) + dateFormat;
			}
		}

		return query;
	}

	public String getStringRelance(VListeCandidatsDto v_ListeCandidatsDto, String query) {
		if (v_ListeCandidatsDto.getNom() != null && !v_ListeCandidatsDto.getNom().isEmpty()) {
			query = query + candidatNom + v_ListeCandidatsDto.getNom() + "%'";

		}

		if (v_ListeCandidatsDto.getPrenom() != null && !v_ListeCandidatsDto.getPrenom().isEmpty()) {
			query = query + candidatPrenom + v_ListeCandidatsDto.getPrenom() + "%'";
		}

		if (v_ListeCandidatsDto.getNumeroTel() != null && !v_ListeCandidatsDto.getNumeroTel().isEmpty()) {
			query = query + candidatNumeroTel + v_ListeCandidatsDto.getNumeroTel() + "%'";
		}

		if (v_ListeCandidatsDto.getEmail() != null && !v_ListeCandidatsDto.getEmail().isEmpty()) {
			query = query + candidatEmail + v_ListeCandidatsDto.getEmail() + "%'";
		}

		if (v_ListeCandidatsDto.getDateInscription() != null) {
			query = query + vListeCandidatInscri + sdf.format(v_ListeCandidatsDto.getDateInscription()) + "'";
		}

		if (v_ListeCandidatsDto.getStatut() != null) {
			query = query + candidatStatus + v_ListeCandidatsDto.getStatut().ordinal() + "";
		}

		if (v_ListeCandidatsDto.getTechnologie() != null && !v_ListeCandidatsDto.getTechnologie().isEmpty()) {
			query = query + listeCandidatTechnologie + v_ListeCandidatsDto.getTechnologie() + "'";
		}

		if (v_ListeCandidatsDto.getRegion() != null && !v_ListeCandidatsDto.getRegion().isEmpty()) {
			query = query + listeCandidatRegion + v_ListeCandidatsDto.getRegion() + "%'";
		}

		if (v_ListeCandidatsDto.getNomSourceur() != null && !v_ListeCandidatsDto.getNomSourceur().isEmpty()) {
			query = query + listeCandidatNomSourceur + v_ListeCandidatsDto.getNomSourceur() + "%'";
		}

		if (v_ListeCandidatsDto.getPrenomSourceur() != null && !v_ListeCandidatsDto.getPrenomSourceur().isEmpty()) {
			query = query + listeCandidatPrenomSourceur + v_ListeCandidatsDto.getPrenomSourceur() + "%'";
		}

		return query;
	}

	@Override
	public List<VListeCandidats> rechercherVlisteNouveauxCandidats(VListeCandidatsDto vListeCandidatsDto, int page,
			int size) {
		String queryNouveauxCandidats = "SELECT * FROM V_ListeCandidats WHERE V_ListeCandidats.STATUT=2  AND V_ListeCandidats.DISPONIBILITE IS NULL AND V_ListeCandidats.RELANCER IS NULL AND V_ListeCandidats.DATE_RELANCE IS NULL AND V_ListeCandidats.DATE_ENTRETIEN IS NULL AND V_ListeCandidats.LIEU_ENTRETIEN IS NULL AND V_ListeCandidats.COMMENTAIRE IS NULL AND V_ListeCandidats.CONFIRMATION_RDV IS NULL ";
		queryNouveauxCandidats = GenerateConditionQuery(vListeCandidatsDto, queryNouveauxCandidats);
		if (vListeCandidatsDto != null) {
			String q = getQueryString(queryNouveauxCandidats, vListeCandidatsDto.getCritereRecheche());
			queryNouveauxCandidats = q;
		}
		queryNouveauxCandidats += " LIMIT :page, :size";
		SQLQuery stNouveauxCandidats = (SQLQuery) getSession().createSQLQuery(queryNouveauxCandidats)
				.setParameter("page", page).setParameter("size", size);
		@SuppressWarnings("unchecked")
		List<VListeCandidats> listeNouveauxCandidats = (List<VListeCandidats>) stNouveauxCandidats
				.addEntity(VListeCandidats.class).list();

		return listeNouveauxCandidats;
	}

	@Override
	public Integer rechercherVlisteNouveauxCandidatsNbr(VListeCandidatsDto vListeCandidatsDto) {
		String queryNouveauxCandidatsNbr = "SELECT count(*) FROM V_ListeCandidats WHERE V_ListeCandidats.STATUT=2  AND V_ListeCandidats.DISPONIBILITE IS NULL AND V_ListeCandidats.RELANCER IS NULL AND V_ListeCandidats.DATE_RELANCE IS NULL AND V_ListeCandidats.DATE_ENTRETIEN IS NULL AND V_ListeCandidats.LIEU_ENTRETIEN IS NULL AND V_ListeCandidats.COMMENTAIRE IS NULL AND V_ListeCandidats.CONFIRMATION_RDV IS NULL ";
		queryNouveauxCandidatsNbr = GenerateConditionQuery(vListeCandidatsDto, queryNouveauxCandidatsNbr);
		if (vListeCandidatsDto != null) {
			String qNouveauxCandidatsNbr = getQueryString(queryNouveauxCandidatsNbr,
					vListeCandidatsDto.getCritereRecheche());
			queryNouveauxCandidatsNbr = qNouveauxCandidatsNbr;
		}
		SQLQuery stNouveauxCandidatsNbr = getSession().createSQLQuery(queryNouveauxCandidatsNbr);
		return ((BigInteger) stNouveauxCandidatsNbr.uniqueResult()).intValue();
	}

	@Override
	public List<VListeCandidats> rechercherNouveauxCandidats(VListeCandidatsDto vListeCandidatsDto) {
		String query = "SELECT * FROM V_ListeCandidats WHERE V_ListeCandidats.STATUT=2  AND V_ListeCandidats.DISPONIBILITE IS NULL AND V_ListeCandidats.RELANCER IS NULL AND V_ListeCandidats.DATE_RELANCE IS NULL AND V_ListeCandidats.DATE_ENTRETIEN IS NULL AND V_ListeCandidats.LIEU_ENTRETIEN IS NULL AND V_ListeCandidats.COMMENTAIRE IS NULL AND V_ListeCandidats.CONFIRMATION_RDV IS NULL ";
		if (vListeCandidatsDto != null) {
			String qQuery = getStringRelance(vListeCandidatsDto, query);
			query = qQuery;
			if (vListeCandidatsDto.getConfirmationRdv() != null) {
				query = query + listeCandiatConfirmation + vListeCandidatsDto.getConfirmationRdv().booleanValue() + "";
			}

			if (vListeCandidatsDto.getMobiliteLille() != null) {
				query = query + " AND V_ListeCandidats.mobilite_Lille = "
						+ vListeCandidatsDto.getMobiliteLille().ordinal() + "";
			}

			if (vListeCandidatsDto.getCvSource() != null) {
				query = query + " AND V_ListeCandidats.cv_Source = " + vListeCandidatsDto.getCvSource().ordinal() + "";
			}

			else {

				String q = getQueryString(query, vListeCandidatsDto.getCritereRecheche());
				query = q;

			}

		}
		query = query + " ORDER BY V_ListeCandidats.DATE_INSCRIPTION DESC";
		System.out.println(query);
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<VListeCandidats> liste = (List<VListeCandidats>) st.addEntity(VListeCandidats.class).list();

		return liste;
	}

	@Override
	public Integer rechercherVlisteCandidatsNbr(VListeCandidatsDto vListeCandidatsDto) {
		String query = "SELECT count(*) FROM V_ListeCandidats WHERE 1=1 ";
		query = GenerateConditionQuery(vListeCandidatsDto, query);
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	@Override
	public List<VListeCandidats> rechercherVlisteCandidats(VListeCandidatsDto v_ListeCandidatsDto, int page, int size) {

		String query = "SELECT * FROM V_ListeCandidats WHERE 1=1 ";
		query = GenerateConditionQuery(v_ListeCandidatsDto, query);
		// query = query + " ORDER BY V_ListeCandidats.DATE_INSCRIPTION DESC ";
		query += " LIMIT :page, :size";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size",
				size);

		@SuppressWarnings("unchecked")
		List<VListeCandidats> liste = (List<VListeCandidats>) st.addEntity(VListeCandidats.class).list();
		return liste;
	}

	private String GenerateConditionQuery(VListeCandidatsDto v_ListeCandidatsDto, String query) {
		if (v_ListeCandidatsDto != null) {
			String q = getStringRelance(v_ListeCandidatsDto, query);
			query = q;
			if (v_ListeCandidatsDto.getDisponibilite() != null) {
				query = query + " AND V_ListeCandidats.DISPONIBILITE = "
						+ v_ListeCandidatsDto.getDisponibilite().ordinal() + "";
			}

			if (v_ListeCandidatsDto.getRelancer() != null) {
				query = query + " AND V_ListeCandidats.RELANCER = " + v_ListeCandidatsDto.getRelancer() + "";
			}

			if (v_ListeCandidatsDto.getDateRelance() != null) {
				query = query + " AND DATE(V_ListeCandidats.DATE_RELANCE) ='"
						+ sdf.format(v_ListeCandidatsDto.getDateRelance()) + "'";
			}

			if (v_ListeCandidatsDto.getDateEntretien() != null) {
				query = query + candidatEntretient + sdf.format(v_ListeCandidatsDto.getDateEntretien()) + "'";
			}

			if (v_ListeCandidatsDto.getLieuEntretien() != null && !v_ListeCandidatsDto.getLieuEntretien().isEmpty()) {
				query = query + lieuEntretien + v_ListeCandidatsDto.getLieuEntretien() + "%'";
			}

			if (v_ListeCandidatsDto.getConfirmationRdv() != null) {
				query = query + listeCandiatConfirmation + v_ListeCandidatsDto.getConfirmationRdv().booleanValue() + "";
			}

			if (v_ListeCandidatsDto.getMobiliteLille() != null) {
				query = query + " AND V_ListeCandidats.mobilite_Lille = "
						+ v_ListeCandidatsDto.getMobiliteLille().ordinal() + "";
			}

			if (v_ListeCandidatsDto.getCvSource() != null) {
				query = query + " AND V_ListeCandidats.cv_Source = " + v_ListeCandidatsDto.getCvSource().ordinal() + "";
			}

			if (v_ListeCandidatsDto.getNomCharge() != null && !v_ListeCandidatsDto.getNomCharge().isEmpty()) {
				query = query + nomCharge + v_ListeCandidatsDto.getNomCharge() + "%'";
			}

			if (v_ListeCandidatsDto.getPrenomCharge() != null && !v_ListeCandidatsDto.getPrenomCharge().isEmpty()) {
				query = query + prenomCharge + v_ListeCandidatsDto.getPrenomCharge() + "%'";
			}

		}
		return query;
	}

	public boolean testerNullAndEmptyStringObject(String test, Object ob) {
		if (test != null && test.isEmpty() && ob != null) {

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

	public boolean testerNullAndEmptyObjectObject(Object ob, Object test1, Object ob2) {
		if (ob != null && test1 != null && ob2 != null) {

			return true;
		}
		return false;
	}

	private String GeneretaeARelancerConditionQuery(VListeCandidatsDto v_ListeCandidatsDto, String query) {

		if (testerNullAndEmptyStringObject(v_ListeCandidatsDto.getNom(), v_ListeCandidatsDto)) {
			query = query + candidatNom + v_ListeCandidatsDto.getNom() + "%'";
		}

		if (testerNullAndEmptyStringObject(v_ListeCandidatsDto.getPrenom(), v_ListeCandidatsDto)) {
			query = query + candidatPrenom + v_ListeCandidatsDto.getPrenom() + "%'";
		}

		if (testerNullAndEmptyStringObject(v_ListeCandidatsDto.getNumeroTel(), v_ListeCandidatsDto)) {
			query = query + candidatNumeroTel + v_ListeCandidatsDto.getNumeroTel() + "%'";
		}

		if (testerNullAndEmptyStringObject(v_ListeCandidatsDto.getEmail(), v_ListeCandidatsDto)) {
			query = query + candidatEmail + v_ListeCandidatsDto.getEmail() + "%'";
		}

		if (testerNullAndEmptyObject(v_ListeCandidatsDto.getDateInscription(), v_ListeCandidatsDto)) {
			query = query + vListeCandidatInscri + sdf.format(v_ListeCandidatsDto.getDateInscription()) + "'";
		}

		if (testerNullAndEmptyObject(v_ListeCandidatsDto.getStatut(), v_ListeCandidatsDto)) {
			query = query + candidatStatus + v_ListeCandidatsDto.getStatut().ordinal() + "";
		}

		if (testerNullAndEmptyStringObject(v_ListeCandidatsDto.getTechnologie(), v_ListeCandidatsDto)) {
			query = query + listeCandidatTechnologie + v_ListeCandidatsDto.getTechnologie() + "'";
		}

		if (testerNullAndEmptyStringObject(v_ListeCandidatsDto.getRegion(), v_ListeCandidatsDto)) {
			query = query + listeCandidatRegion + v_ListeCandidatsDto.getRegion() + "%'";
		}

		if (testerNullAndEmptyObject(v_ListeCandidatsDto.getNomSourceur(), v_ListeCandidatsDto)) {
			query = query + listeCandidatNomSourceur + v_ListeCandidatsDto.getNomSourceur() + "%'";
		}

		if (testerNullAndEmptyObject(v_ListeCandidatsDto.getPrenomSourceur(), v_ListeCandidatsDto)) {
			query = query + listeCandidatPrenomSourceur + v_ListeCandidatsDto.getPrenomSourceur() + "%'";
		}

		if (testerNullAndEmptyObject(v_ListeCandidatsDto.getDisponibilite(), v_ListeCandidatsDto)) {
			query = query + " AND V_ListeCandidats.DISPONIBILITE = " + v_ListeCandidatsDto.getDisponibilite().ordinal()
					+ "";
		}

		if (testerNullAndEmptyObject(v_ListeCandidatsDto.getRelancer(), v_ListeCandidatsDto)) {
			query = query + " AND V_ListeCandidats.RELANCER = " + v_ListeCandidatsDto.getRelancer() + "";
		}

		if (testerNullAndEmptyObject(v_ListeCandidatsDto.getDateRelance(), v_ListeCandidatsDto)) {

			java.sql.Timestamp fromDate = new java.sql.Timestamp(v_ListeCandidatsDto.getDateRelance().getTime());
			Calendar calendrier = Calendar.getInstance();
			calendrier.set(Calendar.HOUR, 0);
			calendrier.set(Calendar.MINUTE, 0);
			calendrier.set(Calendar.SECOND, 0);
			fromDate = (Timestamp) calendrier.getTime();

			query = query + candidatDateRelance + fromDate + "' AND DATE(V_ListeCandidats.DATE_RELANCE) <= LAST_DAY('"
					+ fromDate + "') ";
		}

		if (testerNullAndEmptyObject(v_ListeCandidatsDto.getDateEntretien(), v_ListeCandidatsDto)) {
			query = query + candidatEntretient + sdf.format(v_ListeCandidatsDto.getDateEntretien()) + "'";
		}

		if (testerNullAndEmptyStringObject(v_ListeCandidatsDto.getLieuEntretien(), v_ListeCandidatsDto)) {
			query = query + lieuEntretien + v_ListeCandidatsDto.getLieuEntretien() + "%'";
		}

		if (testerNullAndEmptyObject(v_ListeCandidatsDto.getConfirmationRdv(), v_ListeCandidatsDto)) {
			query = query + listeCandiatConfirmation + v_ListeCandidatsDto.getConfirmationRdv().booleanValue() + "";
		}

		if (testerNullAndEmptyStringObject(v_ListeCandidatsDto.getNomCharge(), v_ListeCandidatsDto)) {
			query = query + nomCharge + v_ListeCandidatsDto.getNomCharge() + "%'";
		}

		if (testerNullAndEmptyStringObject(v_ListeCandidatsDto.getPrenomCharge(), v_ListeCandidatsDto)) {
			query = query + prenomCharge + v_ListeCandidatsDto.getPrenomCharge() + "%'";
		}
		if (testerNullAndEmptyObjectObject(v_ListeCandidatsDto.getDateDebut(), v_ListeCandidatsDto.getDateFin(),
				v_ListeCandidatsDto)) {
			java.sql.Timestamp fromDate = new java.sql.Timestamp(v_ListeCandidatsDto.getDateDebut().getTime());
			java.sql.Timestamp toDate = new java.sql.Timestamp(v_ListeCandidatsDto.getDateFin().getTime());
			Calendar calendrier = Calendar.getInstance();
			calendrier.set(Calendar.HOUR, 0);
			calendrier.set(Calendar.MINUTE, 0);
			calendrier.set(Calendar.SECOND, 0);
			fromDate = (Timestamp) calendrier.getTime();
			Calendar calendrier2 = Calendar.getInstance();
			calendrier2.set(Calendar.HOUR, 23);
			calendrier2.set(Calendar.MINUTE, 59);
			toDate = (Timestamp) calendrier2.getTime();

			query = query + candidatDateRelance + fromDate + "' AND DATE(V_ListeCandidats.DATE_RELANCE) <= '" + toDate
					+ "'";
		} else {

			if (testerNullAndEmptyObject(v_ListeCandidatsDto.getDateDebut(), v_ListeCandidatsDto)) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(v_ListeCandidatsDto.getDateDebut().getTime());

				query = query + candidatDateRelance + fromDate + "'";
			}
			if (testerNullAndEmptyObject(v_ListeCandidatsDto.getDateFin(), v_ListeCandidatsDto)) {
				java.sql.Timestamp toDate = new java.sql.Timestamp(v_ListeCandidatsDto.getDateFin().getTime());
				query = query + "' AND DATE(V_ListeCandidats.DATE_RELANCE) < '" + toDate + "'";
			}
		}

		return query;
	}

}
