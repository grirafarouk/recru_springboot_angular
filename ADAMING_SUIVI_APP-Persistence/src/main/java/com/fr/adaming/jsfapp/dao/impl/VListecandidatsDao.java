package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.math.BigInteger;
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
public class VListecandidatsDao extends ManagerDao<VListeCandidats, Long> implements IvListeCandidatsDao, Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4881184117785155062L;
	DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	private static final String LISTE_CANDIDAT_NOM = " AND V_ListeCandidats.NOM_CANDIDAT LIKE '%";
	private static final String LISTE_CANDIDAT_PRENOM = " AND V_ListeCandidats.PRENOM_CANDIDAT LIKE '%";
	private static final String LISTE_CANDIDAT_DATE = " AND DATE(V_ListeCandidats.DATE_ENTRETIEN) ='";
	private static final String LISTE_CANDIDAT_LIEU = " AND V_ListeCandidats.LIEU_ENTRETIEN LIKE '%";
	private static final String LISTE_CANDIDAT_NOM_CHARGE = " AND V_ListeCandidats.NOM_CHARGE LIKE '%";
	private static final String LISTE_CANDIDAT_PRENOM_CHARGE = " AND V_ListeCandidats.PRENOM_CHARGE LIKE '%";
	private static final String LISTE_CANDIDAT_STATUS = " AND V_ListeCandidats.STATUT = ";
	private static final String LIMIT_PAGINATION = " LIMIT :page, :size";
	private static final String DATE_BETWEEN = " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'";
	private static final String AND_REQ = "' AND '";
	private static final String AND_DUP = " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) BETWEEN '";
	private static final String HOUR_START = " 00:00:00' AND '";
	private static final String HOUR_STOP = " 23:59:59'";
	private static final String AND_DATE_SUP = " AND DATE(V_ListeCandidats.DATE_RELANCE) >= '";
	private static final String LISTE_CANDIDAT_CONF = " AND V_ListeCandidats.CONFIRMATION_RDV = ";
	private static final String LISTE_CANDIDAT_PRE_SOUR = " AND V_ListeCandidats.PRENOM_SOURCEUR LIKE '%";
	private static final String LISTE_CANDIDAT_NOM_SOUR = " AND V_ListeCandidats.NOM_SOURCEUR LIKE '%";
	private static final String LISTE_CANDIDAT_REGION = " AND V_ListeCandidats.REGION LIKE '%";
	private static final String LISTE_CANDIDAT_TECH = " AND V_ListeCandidats.TECHNOLOGIE = '";
	private static final String LISTE_CANDIDAT_DATE_EQUAL = " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) ='";
	private static final String LISTE_CANDIDAT_EMAIL = " AND V_ListeCandidats.EMAIL_CANDIDAT LIKE '%";
	private static final String LISTE_CANDIDAT_NUM_TELL = " AND V_ListeCandidats.NUMERO_TEL_CANDIDAT LIKE '%";
	@Override
	public Integer rechercherCandidatAvecEntretienNbr(VListeCandidatsDto vListeCandidatsDto, Boolean all) {
		String query = "SELECT count(*) FROM V_ListeCandidats WHERE 1=1 ";
		query = generateEntretienConditionQuery(vListeCandidatsDto, all, query);
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	@Override
	public List<VListeCandidats> rechercherCandidatAvecEntretien(VListeCandidatsDto vListeCandidatsDto, int page,
			int size, Boolean all) {
		String query = "SELECT * FROM V_ListeCandidats WHERE 1=1 ";
		query = generateEntretienConditionQuery(vListeCandidatsDto, all, query);
		query += " ORDER BY V_ListeCandidats.DATE_ENTRETIEN DESC  LIMIT :page ,:size";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size",
				size);
		@SuppressWarnings("unchecked")
		List<VListeCandidats> liste = (List<VListeCandidats>) st.addEntity(VListeCandidats.class).list();

		return liste;
	}

	private String generateEntretienConditionQuery(VListeCandidatsDto vListeCandidatsDto, Boolean all, String query) {
		if (vListeCandidatsDto != null) {
			generateEntretienConditionQueryTesterCandidat(vListeCandidatsDto, query);
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

	private String generateEntretienConditionQueryTesterCandidat(VListeCandidatsDto vListeCandidatsDto, String query) {
		if (isNullOrEmptyString(vListeCandidatsDto.getNom())) {
			query = query + LISTE_CANDIDAT_NOM + vListeCandidatsDto.getNom() + "%'";
		}

		if (isNullOrEmptyString(vListeCandidatsDto.getPrenom())) {
			query = query + LISTE_CANDIDAT_PRENOM + vListeCandidatsDto.getPrenom() + "%'";
		}

		if (isNullOrEmptyString(vListeCandidatsDto.getNumeroTel())) {
			query = query + " AND V_ListeCandidats.NUMERO_TEL_CANDIDAT = '" + vListeCandidatsDto.getNumeroTel() + "'";
		}

		if (vListeCandidatsDto.getDateEntretien() != null) {
			query = query + LISTE_CANDIDAT_DATE + sdf.format(vListeCandidatsDto.getDateEntretien()) + "'";
		}

		if (isNullOrEmptyString(vListeCandidatsDto.getLieuEntretien())) {
			query = query + LISTE_CANDIDAT_LIEU + vListeCandidatsDto.getLieuEntretien() + "%'";
		}
		if (isNullOrEmptyString(vListeCandidatsDto.getNomCharge())) {
			query = query + LISTE_CANDIDAT_NOM_CHARGE + vListeCandidatsDto.getNomCharge() + "%'";
		}
		if (isNullOrEmptyString(vListeCandidatsDto.getPrenomCharge())) {
			query = query + LISTE_CANDIDAT_PRENOM_CHARGE + vListeCandidatsDto.getPrenomCharge() + "%'";
		}

		if (vListeCandidatsDto.getMobilite() != null) {
			query = query + " AND V_ListeCandidats.MOBILITE = " + vListeCandidatsDto.getMobilite() + "";
		}

		if (vListeCandidatsDto.getStatut() != null) {
			query = query + LISTE_CANDIDAT_STATUS + vListeCandidatsDto.getStatut().ordinal() + "";
		}
		return query;
	}

	@Override
	public List<VListeCandidats> rechercherVlisteCandidatsARelancer(VListeCandidatsDto vListeCandidatsDto, int page,
			int size) {

		String query = "SELECT * FROM V_ListeCandidats WHERE V_ListeCandidats.RELANCER=1 ";
		query = generetaeARelancerConditionQuery(vListeCandidatsDto, query);
		query += LIMIT_PAGINATION;
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size",
				size);
		@SuppressWarnings("unchecked")
		List<VListeCandidats> liste = (List<VListeCandidats>) st.addEntity(VListeCandidats.class).list();
		return liste;
	}

	@Override
	public Integer rechercherVlisteCandidatsARelancerNbr(VListeCandidatsDto newCandidat) {
		String query = "SELECT count(*) FROM V_ListeCandidats WHERE V_ListeCandidats.RELANCER=1 ";
		query = generetaeARelancerConditionQuery(newCandidat, query);
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	@Override
	public List<VListeCandidats> rechercherVlisteNouveauxCandidats(VListeCandidatsDto vListeCandidatsDto, int page,
			int size) {
		String query = "SELECT * FROM V_ListeCandidats WHERE V_ListeCandidats.STATUT=2  AND V_ListeCandidats.DISPONIBILITE IS NULL AND V_ListeCandidats.RELANCER IS NULL AND V_ListeCandidats.DATE_RELANCE IS NULL AND V_ListeCandidats.DATE_ENTRETIEN IS NULL AND V_ListeCandidats.LIEU_ENTRETIEN IS NULL AND V_ListeCandidats.COMMENTAIRE IS NULL AND V_ListeCandidats.CONFIRMATION_RDV IS NULL ";
		query = generateConditionQuery(vListeCandidatsDto, query);

		if (vListeCandidatsDto != null) {

			if (vListeCandidatsDto.getCritereRecheche() != null) {
				if (vListeCandidatsDto.getCritereRecheche().equals("1")) {
					Calendar calendar = Calendar.getInstance();
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -1);
					Date toDate = calendar.getTime();
					query = query + DATE_BETWEEN + sdf.format(toDate) + AND_REQ + sdf.format(date) + "'";
				} else if (vListeCandidatsDto.getCritereRecheche().equals("2")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -1);
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -6);
					Date toDate = calendar.getTime();
					query = query + AND_DUP + sdf.format(toDate) + AND_REQ + sdf.format(date) + "'";

				} else if (vListeCandidatsDto.getCritereRecheche().equals("3")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -6);
					Date date = calendar.getTime();
					calendar.add(Calendar.YEAR, -3);
					Date toDate = calendar.getTime();
					query = query + DATE_BETWEEN + sdf.format(toDate) + HOUR_START + sdf.format(date) + HOUR_STOP;
				}

			}

		}
		query += LIMIT_PAGINATION;
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size",
				size);
		@SuppressWarnings("unchecked")
		List<VListeCandidats> liste = (List<VListeCandidats>) st.addEntity(VListeCandidats.class).list();

		return liste;
	}

	@Override
	public Integer rechercherVlisteNouveauxCandidatsNbr(VListeCandidatsDto vListeCandidatsDto) {
		String query = "SELECT count(*) FROM V_ListeCandidats WHERE V_ListeCandidats.STATUT=2  AND V_ListeCandidats.DISPONIBILITE IS NULL AND V_ListeCandidats.RELANCER IS NULL AND V_ListeCandidats.DATE_RELANCE IS NULL AND V_ListeCandidats.DATE_ENTRETIEN IS NULL AND V_ListeCandidats.LIEU_ENTRETIEN IS NULL AND V_ListeCandidats.COMMENTAIRE IS NULL AND V_ListeCandidats.CONFIRMATION_RDV IS NULL ";
		query = generateConditionQuery(vListeCandidatsDto, query);

		if (vListeCandidatsDto != null) {

			if (vListeCandidatsDto.getCritereRecheche() != null) {
				if (vListeCandidatsDto.getCritereRecheche().equals("1")) {
					Calendar calendar = Calendar.getInstance();
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -1);
					Date toDate = calendar.getTime();
					query = query + DATE_BETWEEN + sdf.format(toDate) + AND_REQ + sdf.format(date) + "'";
				} else if (vListeCandidatsDto.getCritereRecheche().equals("2")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -1);
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -6);
					Date toDate = calendar.getTime();
					query = query + AND_DUP + sdf.format(toDate) + AND_REQ + sdf.format(date) + "'";

				} else if (vListeCandidatsDto.getCritereRecheche().equals("3")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -6);
					Date date = calendar.getTime();
					calendar.add(Calendar.YEAR, -3);
					Date toDate = calendar.getTime();
					query = query + DATE_BETWEEN + sdf.format(toDate) + HOUR_START + sdf.format(date) + HOUR_STOP;
				}
			}

		}
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	@Override
	public List<VListeCandidats> rechercherNouveauxCandidats(VListeCandidatsDto vListeCandidatsDto) {
		String query = "SELECT * FROM V_ListeCandidats WHERE V_ListeCandidats.STATUT=2  AND V_ListeCandidats.DISPONIBILITE IS NULL AND V_ListeCandidats.RELANCER IS NULL AND V_ListeCandidats.DATE_RELANCE IS NULL AND V_ListeCandidats.DATE_ENTRETIEN IS NULL AND V_ListeCandidats.LIEU_ENTRETIEN IS NULL AND V_ListeCandidats.COMMENTAIRE IS NULL AND V_ListeCandidats.CONFIRMATION_RDV IS NULL ";
		if (vListeCandidatsDto != null) {
			if (isNullOrEmptyString(vListeCandidatsDto.getNom())) {
				query = query + LISTE_CANDIDAT_NOM + vListeCandidatsDto.getNom() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getPrenom())) {
				query = query + LISTE_CANDIDAT_PRENOM + vListeCandidatsDto.getPrenom() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getNumeroTel())) {
				query = query + LISTE_CANDIDAT_NUM_TELL + vListeCandidatsDto.getNumeroTel()
						+ "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getEmail())) {
				query = query + LISTE_CANDIDAT_EMAIL + vListeCandidatsDto.getEmail() + "%'";
			}

			if (vListeCandidatsDto.getDateInscription() != null) {
				query = query + LISTE_CANDIDAT_DATE_EQUAL
						+ sdf.format(vListeCandidatsDto.getDateInscription()) + "'";
			}

			if (vListeCandidatsDto.getStatut() != null) {
				query = query + LISTE_CANDIDAT_STATUS + vListeCandidatsDto.getStatut().ordinal() + "";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getTechnologie())) {
				query = query + LISTE_CANDIDAT_TECH + vListeCandidatsDto.getTechnologie() + "'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getRegion())) {
				query = query + LISTE_CANDIDAT_REGION + vListeCandidatsDto.getRegion() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getNomSourceur())) {
				query = query + LISTE_CANDIDAT_NOM_SOUR + vListeCandidatsDto.getNomSourceur()
						+ "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getPrenomSourceur())) {
				query = query + LISTE_CANDIDAT_PRE_SOUR + vListeCandidatsDto.getPrenomSourceur()
						+ "%'";
			}

			if (vListeCandidatsDto.getConfirmationRdv() != null) {
				query = query + LISTE_CANDIDAT_CONF
						+ vListeCandidatsDto.getConfirmationRdv().booleanValue() + "";
			}

			if (vListeCandidatsDto.getMobiliteLille() != null) {
				query = query + " AND V_ListeCandidats.mobilite_Lille = "
						+ vListeCandidatsDto.getMobiliteLille().ordinal() + "";
			}

			if (vListeCandidatsDto.getCvSource() != null) {
				query = query + " AND V_ListeCandidats.cv_Source = " + vListeCandidatsDto.getCvSource().ordinal() + "";
			}

			if (vListeCandidatsDto.getCritereRecheche() != null) {
				if (vListeCandidatsDto.getCritereRecheche().equals("1")) {
					Calendar calendar = Calendar.getInstance();
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -1);
					Date toDate = calendar.getTime();
					query = query + DATE_BETWEEN + sdf.format(toDate) + AND_REQ + sdf.format(date) + "'";
				} else if (vListeCandidatsDto.getCritereRecheche().equals("2")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -1);
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -6);
					Date toDate = calendar.getTime();
					query = query + AND_DUP + sdf.format(toDate) + AND_REQ + sdf.format(date) + "'";

				} else if (vListeCandidatsDto.getCritereRecheche().equals("3")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -6);
					Date date = calendar.getTime();
					calendar.add(Calendar.YEAR, -3);
					Date toDate = calendar.getTime();
					query = query + DATE_BETWEEN + sdf.format(toDate) + HOUR_START + sdf.format(date) + HOUR_STOP;
				}

			}

		}
		query = query + " ORDER BY V_ListeCandidats.DATE_INSCRIPTION DESC";
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<VListeCandidats> liste = (List<VListeCandidats>) st.addEntity(VListeCandidats.class).list();

		return liste;
	}

	@Override
	public Integer rechercherVlisteCandidatsNbr(VListeCandidatsDto vListeCandidatsDto) {
		String query = "SELECT count(*) FROM V_ListeCandidats WHERE 1=1 ";
		query = generateConditionQuery(vListeCandidatsDto, query);
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	@Override
	public List<VListeCandidats> rechercherVlisteCandidats(VListeCandidatsDto vListeCandidatsDto, int page, int size) {

		String query = "SELECT * FROM V_ListeCandidats WHERE 1=1 ";
		query = generateConditionQuery(vListeCandidatsDto, query);
		query += LIMIT_PAGINATION;
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size",
				size);

		@SuppressWarnings("unchecked")
		List<VListeCandidats> liste = (List<VListeCandidats>) st.addEntity(VListeCandidats.class).list();
		return liste;
	}

	private String generateConditionQuery(VListeCandidatsDto vListeCandidatsDto, String query) {
		if (vListeCandidatsDto != null) {
			if (isNullOrEmptyString(vListeCandidatsDto.getNom())) {
				query = query + LISTE_CANDIDAT_NOM + vListeCandidatsDto.getNom() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getPrenom())) {
				query = query + LISTE_CANDIDAT_PRENOM + vListeCandidatsDto.getPrenom() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getNumeroTel())) {
				query = query + LISTE_CANDIDAT_NUM_TELL + vListeCandidatsDto.getNumeroTel()
						+ "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getEmail())) {
				query = query + LISTE_CANDIDAT_EMAIL + vListeCandidatsDto.getEmail() + "%'";
			}

			if (vListeCandidatsDto.getDateInscription() != null) {
				query = query + LISTE_CANDIDAT_DATE_EQUAL
						+ sdf.format(vListeCandidatsDto.getDateInscription()) + "'";
			}

			if (vListeCandidatsDto.getStatut() != null) {
				query = query + LISTE_CANDIDAT_STATUS + vListeCandidatsDto.getStatut().ordinal() + "";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getTechnologie())) {
				query = query + LISTE_CANDIDAT_TECH + vListeCandidatsDto.getTechnologie() + "'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getRegion())) {
				query = query + LISTE_CANDIDAT_REGION + vListeCandidatsDto.getRegion() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getNomSourceur())) {
				query = query + LISTE_CANDIDAT_NOM_SOUR + vListeCandidatsDto.getNomSourceur()
						+ "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getPrenomSourceur())) {
				query = query + LISTE_CANDIDAT_PRE_SOUR + vListeCandidatsDto.getPrenomSourceur()
						+ "%'";
			}

			if (vListeCandidatsDto.getDisponibilite() != null) {
				query = query + " AND V_ListeCandidats.DISPONIBILITE = "
						+ vListeCandidatsDto.getDisponibilite().ordinal() + "";
			}

			if (vListeCandidatsDto.getRelancer() != null) {
				query = query + " AND V_ListeCandidats.RELANCER = " + vListeCandidatsDto.getRelancer() + "";
			}

			if (vListeCandidatsDto.getDateRelance() != null) {
				query = query + " AND DATE(V_ListeCandidats.DATE_RELANCE) ='"
						+ sdf.format(vListeCandidatsDto.getDateRelance()) + "'";
			}

			if (vListeCandidatsDto.getDateEntretien() != null) {
				query = query + LISTE_CANDIDAT_DATE + sdf.format(vListeCandidatsDto.getDateEntretien()) + "'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getLieuEntretien())) {
				query = query + LISTE_CANDIDAT_LIEU + vListeCandidatsDto.getLieuEntretien() + "%'";
			}

			if (vListeCandidatsDto.getConfirmationRdv() != null) {
				query = query + LISTE_CANDIDAT_CONF
						+ vListeCandidatsDto.getConfirmationRdv().booleanValue() + "";
			}

			if (vListeCandidatsDto.getMobiliteLille() != null) {
				query = query + " AND V_ListeCandidats.mobilite_Lille = "
						+ vListeCandidatsDto.getMobiliteLille().ordinal() + "";
			}

			if (vListeCandidatsDto.getCvSource() != null) {
				query = query + " AND V_ListeCandidats.cv_Source = " + vListeCandidatsDto.getCvSource().ordinal() + "";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getNomCharge())) {
				query = query + LISTE_CANDIDAT_NOM_CHARGE + vListeCandidatsDto.getNomCharge() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getPrenomCharge())) {
				query = query + LISTE_CANDIDAT_PRENOM_CHARGE + vListeCandidatsDto.getPrenomCharge() + "%'";
			}

		}
		return query;
	}

	private String generetaeARelancerConditionQuery(VListeCandidatsDto vListeCandidatsDto, String query) {
		if (vListeCandidatsDto != null) {
			if (vListeCandidatsDto.getNom() != null && !vListeCandidatsDto.getNom().isEmpty()) {
				query = query + LISTE_CANDIDAT_NOM + vListeCandidatsDto.getNom() + "%'";
			}

			if (vListeCandidatsDto.getPrenom() != null && !vListeCandidatsDto.getPrenom().isEmpty()) {
				query = query + LISTE_CANDIDAT_PRENOM + vListeCandidatsDto.getPrenom() + "%'";
			}

			if (vListeCandidatsDto.getNumeroTel() != null && !vListeCandidatsDto.getNumeroTel().isEmpty()) {
				query = query + LISTE_CANDIDAT_NUM_TELL + vListeCandidatsDto.getNumeroTel()
						+ "%'";
			}

			if (vListeCandidatsDto.getEmail() != null && !vListeCandidatsDto.getEmail().isEmpty()) {
				query = query + LISTE_CANDIDAT_EMAIL + vListeCandidatsDto.getEmail() + "%'";
			}

			if (vListeCandidatsDto.getDateInscription() != null) {
				query = query + LISTE_CANDIDAT_DATE_EQUAL
						+ sdf.format(vListeCandidatsDto.getDateInscription()) + "'";
			}

			if (vListeCandidatsDto.getStatut() != null) {
				query = query + LISTE_CANDIDAT_STATUS + vListeCandidatsDto.getStatut().ordinal() + "";
			}

			if (vListeCandidatsDto.getTechnologie() != null && !vListeCandidatsDto.getTechnologie().isEmpty()) {
				query = query + LISTE_CANDIDAT_TECH + vListeCandidatsDto.getTechnologie() + "'";
			}

			if (vListeCandidatsDto.getRegion() != null && !vListeCandidatsDto.getRegion().isEmpty()) {
				query = query + LISTE_CANDIDAT_REGION + vListeCandidatsDto.getRegion() + "%'";
			}

			if (vListeCandidatsDto.getNomSourceur() != null) {
				query = query + LISTE_CANDIDAT_NOM_SOUR + vListeCandidatsDto.getNomSourceur()
						+ "%'";
			}

			if (vListeCandidatsDto.getPrenomSourceur() != null) {
				query = query + LISTE_CANDIDAT_PRE_SOUR + vListeCandidatsDto.getPrenomSourceur()
						+ "%'";
			}

			if (vListeCandidatsDto.getDisponibilite() != null) {
				query = query + " AND V_ListeCandidats.DISPONIBILITE = "
						+ vListeCandidatsDto.getDisponibilite().ordinal() + "";
			}

			if (vListeCandidatsDto.getRelancer() != null) {
				query = query + " AND V_ListeCandidats.RELANCER = " + vListeCandidatsDto.getRelancer() + "";
			}

			if (vListeCandidatsDto.getDateRelance() != null) {

				java.sql.Timestamp fromDate = new java.sql.Timestamp(vListeCandidatsDto.getDateRelance().getTime());
				fromDate.setHours(0);
				fromDate.setMinutes(0);
				fromDate.setSeconds(0);

				query = query + AND_DATE_SUP + fromDate
						+ "' AND DATE(V_ListeCandidats.DATE_RELANCE) <= LAST_DAY('" + fromDate + "') ";
			}

			if (vListeCandidatsDto.getDateEntretien() != null) {
				query = query + LISTE_CANDIDAT_DATE + sdf.format(vListeCandidatsDto.getDateEntretien()) + "'";
			}

			if (vListeCandidatsDto.getLieuEntretien() != null && !vListeCandidatsDto.getLieuEntretien().isEmpty()) {
				query = query + LISTE_CANDIDAT_LIEU + vListeCandidatsDto.getLieuEntretien() + "%'";
			}

			if (vListeCandidatsDto.getConfirmationRdv() != null) {
				query = query + LISTE_CANDIDAT_CONF
						+ vListeCandidatsDto.getConfirmationRdv().booleanValue() + "";
			}

			if (vListeCandidatsDto.getNomCharge() != null && !vListeCandidatsDto.getNomCharge().isEmpty()) {
				query = query + LISTE_CANDIDAT_NOM_CHARGE + vListeCandidatsDto.getNomCharge() + "%'";
			}

			if (vListeCandidatsDto.getPrenomCharge() != null && !vListeCandidatsDto.getPrenomCharge().isEmpty()) {
				query = query + LISTE_CANDIDAT_PRENOM_CHARGE + vListeCandidatsDto.getPrenomCharge() + "%'";
			}
			if (vListeCandidatsDto.getDateDebut() != null && vListeCandidatsDto.getDateFin() != null) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(vListeCandidatsDto.getDateDebut().getTime());
				java.sql.Timestamp toDate = new java.sql.Timestamp(vListeCandidatsDto.getDateFin().getTime());
				fromDate.setHours(0);
				fromDate.setMinutes(0);
				fromDate.setSeconds(0);
				toDate.setHours(23);
				toDate.setMinutes(59);
				query = query + AND_DATE_SUP + fromDate
						+ "' AND DATE(V_ListeCandidats.DATE_RELANCE) <= '" + toDate + "'";
			} else {

				if (vListeCandidatsDto.getDateDebut() != null) {
					java.sql.Timestamp fromDate = new java.sql.Timestamp(vListeCandidatsDto.getDateDebut().getTime());

					query = query + AND_DATE_SUP + fromDate + "'";
				}
				if (vListeCandidatsDto.getDateFin() != null) {
					java.sql.Timestamp toDate = new java.sql.Timestamp(vListeCandidatsDto.getDateFin().getTime());
					query = query + "' AND DATE(V_ListeCandidats.DATE_RELANCE) < '" + toDate + "'";
				}
			}

		}
		return query;
	}

	public boolean isNullOrEmptyString(String var) {
		return var != null && !var.isEmpty();
	}

	public boolean isNullObject(Object o, Object var) {
		return o != null && var != null;
	}

	public boolean isNullOrEmptyDateAndObject(Object o, Date var) {
		return o != null && var != null;
	}

}
