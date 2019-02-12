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
			if (isNullOrEmptyString(vListeCandidatsDto.getNom())) {
				query = query + " AND V_ListeCandidats.NOM_CANDIDAT LIKE '%" + vListeCandidatsDto.getNom() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getPrenom())) {
				query = query + " AND V_ListeCandidats.PRENOM_CANDIDAT LIKE '%" + vListeCandidatsDto.getPrenom() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getNumeroTel())) {
				query = query + " AND V_ListeCandidats.NUMERO_TEL_CANDIDAT = '" + vListeCandidatsDto.getNumeroTel()
						+ "'";
			}

			if (vListeCandidatsDto.getDateEntretien() != null) {
				query = query + " AND DATE(V_ListeCandidats.DATE_ENTRETIEN) ='"
						+ sdf.format(vListeCandidatsDto.getDateEntretien()) + "'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getLieuEntretien())) {
				query = query + " AND V_ListeCandidats.LIEU_ENTRETIEN LIKE '%" + vListeCandidatsDto.getLieuEntretien()
						+ "%'";
			}
			if (isNullOrEmptyString(vListeCandidatsDto.getNomCharge())) {
				query = query + " AND V_ListeCandidats.NOM_CHARGE LIKE '%" + vListeCandidatsDto.getNomCharge() + "%'";
			}
			if (isNullOrEmptyString(vListeCandidatsDto.getPrenomCharge())) {
				query = query + " AND V_ListeCandidats.PRENOM_CHARGE LIKE '%" + vListeCandidatsDto.getPrenomCharge()
						+ "%'";
			}

			if (vListeCandidatsDto.getMobilite() != null) {
				query = query + " AND V_ListeCandidats.MOBILITE = " + vListeCandidatsDto.getMobilite() + "";
			}

			if (vListeCandidatsDto.getStatut() != null) {
				query = query + " AND V_ListeCandidats.STATUT = " + vListeCandidatsDto.getStatut().ordinal() + "";
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
		query = generetaeARelancerConditionQuery(vListeCandidatsDto, query);
		query += " LIMIT :page, :size";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size",
				size);
		@SuppressWarnings("unchecked")
		List<VListeCandidats> liste = (List<VListeCandidats>) st.addEntity(VListeCandidats.class).list();
		return liste;
	}

	@Override
	public Integer rechercherVlisteCandidatsARelancerNbr(VListeCandidatsDto NCD) {
		String query = "SELECT count(*) FROM V_ListeCandidats WHERE V_ListeCandidats.RELANCER=1 ";
		query = generetaeARelancerConditionQuery(NCD, query);
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
					query = query + " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'" + sdf.format(toDate) + "' AND '"
							+ sdf.format(date) + "'";
				} else if (vListeCandidatsDto.getCritereRecheche().equals("2")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -1);
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -6);
					Date toDate = calendar.getTime();
					query = query + " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) BETWEEN '" + sdf.format(toDate)
							+ "' AND '" + sdf.format(date) + "'";

				} else if (vListeCandidatsDto.getCritereRecheche().equals("3")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -6);
					Date date = calendar.getTime();
					calendar.add(Calendar.YEAR, -3);
					Date toDate = calendar.getTime();
					query = query + " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'" + sdf.format(toDate)
							+ " 00:00:00' AND '" + sdf.format(date) + " 23:59:59'";
				}

			}

		}
		query += " LIMIT :page, :size";
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
					query = query + " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'" + sdf.format(toDate) + "' AND '"
							+ sdf.format(date) + "'";
				} else if (vListeCandidatsDto.getCritereRecheche().equals("2")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -1);
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -6);
					Date toDate = calendar.getTime();
					query = query + " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) BETWEEN '" + sdf.format(toDate)
							+ "' AND '" + sdf.format(date) + "'";

				} else if (vListeCandidatsDto.getCritereRecheche().equals("3")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -6);
					Date date = calendar.getTime();
					calendar.add(Calendar.YEAR, -3);
					Date toDate = calendar.getTime();
					query = query + " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'" + sdf.format(toDate)
							+ " 00:00:00' AND '" + sdf.format(date) + " 23:59:59'";
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
				query = query + " AND V_ListeCandidats.NOM_CANDIDAT LIKE '%" + vListeCandidatsDto.getNom() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getPrenom())) {
				query = query + " AND V_ListeCandidats.PRENOM_CANDIDAT LIKE '%" + vListeCandidatsDto.getPrenom() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getNumeroTel())) {
				query = query + " AND V_ListeCandidats.NUMERO_TEL_CANDIDAT LIKE '%" + vListeCandidatsDto.getNumeroTel()
						+ "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getEmail())) {
				query = query + " AND V_ListeCandidats.EMAIL_CANDIDAT LIKE '%" + vListeCandidatsDto.getEmail() + "%'";
			}

			if (vListeCandidatsDto.getDateInscription() != null) {
				query = query + " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) ='"
						+ sdf.format(vListeCandidatsDto.getDateInscription()) + "'";
			}

			if (vListeCandidatsDto.getStatut() != null) {
				query = query + " AND V_ListeCandidats.STATUT = " + vListeCandidatsDto.getStatut().ordinal() + "";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getTechnologie())) {
				query = query + " AND V_ListeCandidats.TECHNOLOGIE = '" + vListeCandidatsDto.getTechnologie() + "'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getRegion())) {
				query = query + " AND V_ListeCandidats.REGION LIKE '%" + vListeCandidatsDto.getRegion() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getNomSourceur())) {
				query = query + " AND V_ListeCandidats.NOM_SOURCEUR LIKE '%" + vListeCandidatsDto.getNomSourceur()
						+ "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getPrenomSourceur())) {
				query = query + " AND V_ListeCandidats.PRENOM_SOURCEUR LIKE '%" + vListeCandidatsDto.getPrenomSourceur()
						+ "%'";
			}

			if (vListeCandidatsDto.getConfirmationRdv() != null) {
				query = query + " AND V_ListeCandidats.CONFIRMATION_RDV = "
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
					query = query + " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'" + sdf.format(toDate) + "' AND '"
							+ sdf.format(date) + "'";
				} else if (vListeCandidatsDto.getCritereRecheche().equals("2")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -1);
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -6);
					Date toDate = calendar.getTime();
					query = query + " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) BETWEEN '" + sdf.format(toDate)
							+ "' AND '" + sdf.format(date) + "'";

				} else if (vListeCandidatsDto.getCritereRecheche().equals("3")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -6);
					Date date = calendar.getTime();
					calendar.add(Calendar.YEAR, -3);
					Date toDate = calendar.getTime();
					query = query + " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'" + sdf.format(toDate)
							+ " 00:00:00' AND '" + sdf.format(date) + " 23:59:59'";
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
		query += " LIMIT :page, :size";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size",
				size);

		@SuppressWarnings("unchecked")
		List<VListeCandidats> liste = (List<VListeCandidats>) st.addEntity(VListeCandidats.class).list();
		return liste;
	}

	private String generateConditionQuery(VListeCandidatsDto vListeCandidatsDto, String query) {
		if (vListeCandidatsDto != null) {
			if (isNullOrEmptyString(vListeCandidatsDto.getNom())) {
				query = query + " AND V_ListeCandidats.NOM_CANDIDAT LIKE '%" + vListeCandidatsDto.getNom() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getPrenom())) {
				query = query + " AND V_ListeCandidats.PRENOM_CANDIDAT LIKE '%" + vListeCandidatsDto.getPrenom() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getNumeroTel())) {
				query = query + " AND V_ListeCandidats.NUMERO_TEL_CANDIDAT LIKE '%" + vListeCandidatsDto.getNumeroTel()
						+ "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getEmail())) {
				query = query + " AND V_ListeCandidats.EMAIL_CANDIDAT LIKE '%" + vListeCandidatsDto.getEmail() + "%'";
			}

			if (vListeCandidatsDto.getDateInscription() != null) {
				query = query + " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) ='"
						+ sdf.format(vListeCandidatsDto.getDateInscription()) + "'";
			}

			if (vListeCandidatsDto.getStatut() != null) {
				query = query + " AND V_ListeCandidats.STATUT = " + vListeCandidatsDto.getStatut().ordinal() + "";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getTechnologie())) {
				query = query + " AND V_ListeCandidats.TECHNOLOGIE = '" + vListeCandidatsDto.getTechnologie() + "'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getRegion())) {
				query = query + " AND V_ListeCandidats.REGION LIKE '%" + vListeCandidatsDto.getRegion() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getNomSourceur())) {
				query = query + " AND V_ListeCandidats.NOM_SOURCEUR LIKE '%" + vListeCandidatsDto.getNomSourceur()
						+ "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getPrenomSourceur())) {
				query = query + " AND V_ListeCandidats.PRENOM_SOURCEUR LIKE '%" + vListeCandidatsDto.getPrenomSourceur()
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
				query = query + " AND DATE(V_ListeCandidats.DATE_ENTRETIEN) ='"
						+ sdf.format(vListeCandidatsDto.getDateEntretien()) + "'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getLieuEntretien())) {
				query = query + " AND V_ListeCandidats.LIEU_ENTRETIEN LIKE '%" + vListeCandidatsDto.getLieuEntretien()
						+ "%'";
			}

			if (vListeCandidatsDto.getConfirmationRdv() != null) {
				query = query + " AND V_ListeCandidats.CONFIRMATION_RDV = "
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
				query = query + " AND V_ListeCandidats.NOM_CHARGE LIKE '%" + vListeCandidatsDto.getNomCharge() + "%'";
			}

			if (isNullOrEmptyString(vListeCandidatsDto.getPrenomCharge())) {
				query = query + " AND V_ListeCandidats.PRENOM_CHARGE LIKE '%" + vListeCandidatsDto.getPrenomCharge()
						+ "%'";
			}

		}
		return query;
	}

	private String generetaeARelancerConditionQuery(VListeCandidatsDto vListeCandidatsDto, String query) {
		if (vListeCandidatsDto != null) {
			if (vListeCandidatsDto.getNom() != null && !vListeCandidatsDto.getNom().isEmpty()) {
				query = query + " AND V_ListeCandidats.NOM_CANDIDAT LIKE '%" + vListeCandidatsDto.getNom() + "%'";
			}

			if (vListeCandidatsDto.getPrenom() != null && !vListeCandidatsDto.getPrenom().isEmpty()) {
				query = query + " AND V_ListeCandidats.PRENOM_CANDIDAT LIKE '%" + vListeCandidatsDto.getPrenom() + "%'";
			}

			if (vListeCandidatsDto.getNumeroTel() != null && !vListeCandidatsDto.getNumeroTel().isEmpty()) {
				query = query + " AND V_ListeCandidats.NUMERO_TEL_CANDIDAT LIKE '%" + vListeCandidatsDto.getNumeroTel()
						+ "%'";
			}

			if (vListeCandidatsDto.getEmail() != null && !vListeCandidatsDto.getEmail().isEmpty()) {
				query = query + " AND V_ListeCandidats.EMAIL_CANDIDAT LIKE '%" + vListeCandidatsDto.getEmail() + "%'";
			}

			if (vListeCandidatsDto.getDateInscription() != null) {
				query = query + " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) ='"
						+ sdf.format(vListeCandidatsDto.getDateInscription()) + "'";
			}

			if (vListeCandidatsDto.getStatut() != null) {
				query = query + " AND V_ListeCandidats.STATUT = " + vListeCandidatsDto.getStatut().ordinal() + "";
			}

			if (vListeCandidatsDto.getTechnologie() != null && !vListeCandidatsDto.getTechnologie().isEmpty()) {
				query = query + " AND V_ListeCandidats.TECHNOLOGIE = '" + vListeCandidatsDto.getTechnologie() + "'";
			}

			if (vListeCandidatsDto.getRegion() != null && !vListeCandidatsDto.getRegion().isEmpty()) {
				query = query + " AND V_ListeCandidats.REGION LIKE '%" + vListeCandidatsDto.getRegion() + "%'";
			}

			if (vListeCandidatsDto.getNomSourceur() != null) {
				query = query + " AND V_ListeCandidats.NOM_SOURCEUR LIKE '%" + vListeCandidatsDto.getNomSourceur()
						+ "%'";
			}

			if (vListeCandidatsDto.getPrenomSourceur() != null) {
				query = query + " AND V_ListeCandidats.PRENOM_SOURCEUR LIKE '%" + vListeCandidatsDto.getPrenomSourceur()
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

				query = query + " AND DATE(V_ListeCandidats.DATE_RELANCE) >= '" + fromDate
						+ "' AND DATE(V_ListeCandidats.DATE_RELANCE) <= LAST_DAY('" + fromDate + "') ";
			}

			if (vListeCandidatsDto.getDateEntretien() != null) {
				query = query + " AND DATE(V_ListeCandidats.DATE_ENTRETIEN) ='"
						+ sdf.format(vListeCandidatsDto.getDateEntretien()) + "'";
			}

			if (vListeCandidatsDto.getLieuEntretien() != null && !vListeCandidatsDto.getLieuEntretien().isEmpty()) {
				query = query + " AND V_ListeCandidats.LIEU_ENTRETIEN LIKE '%" + vListeCandidatsDto.getLieuEntretien()
						+ "%'";
			}

			if (vListeCandidatsDto.getConfirmationRdv() != null) {
				query = query + " AND V_ListeCandidats.CONFIRMATION_RDV = "
						+ vListeCandidatsDto.getConfirmationRdv().booleanValue() + "";
			}

			if (vListeCandidatsDto.getNomCharge() != null && !vListeCandidatsDto.getNomCharge().isEmpty()) {
				query = query + " AND V_ListeCandidats.NOM_CHARGE LIKE '%" + vListeCandidatsDto.getNomCharge() + "%'";
			}

			if (vListeCandidatsDto.getPrenomCharge() != null && !vListeCandidatsDto.getPrenomCharge().isEmpty()) {
				query = query + " AND V_ListeCandidats.PRENOM_CHARGE LIKE '%" + vListeCandidatsDto.getPrenomCharge()
						+ "%'";
			}
			if (vListeCandidatsDto.getDateDebut() != null && vListeCandidatsDto.getDateFin() != null) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(vListeCandidatsDto.getDateDebut().getTime());
				java.sql.Timestamp toDate = new java.sql.Timestamp(vListeCandidatsDto.getDateFin().getTime());
				fromDate.setHours(0);
				fromDate.setMinutes(0);
				fromDate.setSeconds(0);
				toDate.setHours(23);
				toDate.setMinutes(59);
				query = query + " AND DATE(V_ListeCandidats.DATE_RELANCE) >= '" + fromDate
						+ "' AND DATE(V_ListeCandidats.DATE_RELANCE) <= '" + toDate + "'";
			} else {

				if (vListeCandidatsDto.getDateDebut() != null) {
					java.sql.Timestamp fromDate = new java.sql.Timestamp(vListeCandidatsDto.getDateDebut().getTime());

					query = query + " AND DATE(V_ListeCandidats.DATE_RELANCE) >= '" + fromDate + "'";
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
		if (var != null && !var.isEmpty()) {
			return true;
		}
		return false;
	}

	public boolean isNullObject(Object o, Object var) {
		if (o != null && var != null) {
			return true;
		}
		return false;
	}

	public boolean isNullOrEmptyDateAndObject(Object o, Date var) {
		if (o != null && var != null) {
			return true;
		}
		return false;
	}

}
