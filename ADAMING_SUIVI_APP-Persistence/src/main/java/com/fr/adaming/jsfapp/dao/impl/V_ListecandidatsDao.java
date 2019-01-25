package com.fr.adaming.jsfapp.dao.impl;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.IV_ListeCandidatsDao;
import com.fr.adaming.jsfapp.dto.V_ListeCandidatsDto;
import com.fr.adaming.jsfapp.model.V_ListeCandidats;

@Repository("v_ListeCandidatsDao")
public class V_ListecandidatsDao extends ManagerDao<V_ListeCandidats, Long> implements IV_ListeCandidatsDao {
	DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	@Override
	public Integer rechercherCandidatAvecEntretienNbr(V_ListeCandidatsDto v_ListeCandidatsDto, Boolean all) {
		String query = "SELECT count(*) FROM V_ListeCandidats WHERE 1=1 ";
		query = GenerateEntretienConditionQuery(v_ListeCandidatsDto, all, query);
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	@Override
	public List<V_ListeCandidats> rechercherCandidatAvecEntretien(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size, Boolean all) {
		String query = "SELECT * FROM V_ListeCandidats WHERE 1=1 ";
		query = GenerateEntretienConditionQuery(v_ListeCandidatsDto, all, query);
		query += " ORDER BY V_ListeCandidats.DATE_ENTRETIEN DESC  LIMIT :page ,:size";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size", size);
		@SuppressWarnings("unchecked")
		List<V_ListeCandidats> liste = (List<V_ListeCandidats>) st.addEntity(V_ListeCandidats.class).list();

		return liste;
	}

	private String GenerateEntretienConditionQuery(V_ListeCandidatsDto v_ListeCandidatsDto, Boolean all, String query) {
		if (v_ListeCandidatsDto != null) {
			if (v_ListeCandidatsDto.getNom() != null && !v_ListeCandidatsDto.getNom().isEmpty()) {
				query = query + " AND V_ListeCandidats.NOM_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getNom() + "%'";
			}

			if (v_ListeCandidatsDto.getPrenom() != null && !v_ListeCandidatsDto.getPrenom().isEmpty()) {
				query = query + " AND V_ListeCandidats.PRENOM_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getPrenom()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getNumeroTel() != null && !v_ListeCandidatsDto.getNumeroTel().isEmpty()) {
				query = query + " AND V_ListeCandidats.NUMERO_TEL_CANDIDAT = '" + v_ListeCandidatsDto.getNumeroTel()
						+ "'";
			}

			if (v_ListeCandidatsDto.getDateEntretien() != null) {
				query = query + " AND DATE(V_ListeCandidats.DATE_ENTRETIEN) ='"
						+ sdf.format(v_ListeCandidatsDto.getDateEntretien()) + "'";
			}

			if (v_ListeCandidatsDto.getLieuEntretien() != null && !v_ListeCandidatsDto.getLieuEntretien().isEmpty()) {
				query = query + " AND V_ListeCandidats.LIEU_ENTRETIEN LIKE '%" + v_ListeCandidatsDto.getLieuEntretien()
						+ "%'";
			}
			if (v_ListeCandidatsDto.getNomCharge() != null && !v_ListeCandidatsDto.getNomCharge().isEmpty()) {
				query = query + " AND V_ListeCandidats.NOM_CHARGE LIKE '%" + v_ListeCandidatsDto.getNomCharge() + "%'";
			}
			if (v_ListeCandidatsDto.getPrenomCharge() != null && !v_ListeCandidatsDto.getPrenomCharge().isEmpty()) {
				query = query + " AND V_ListeCandidats.PRENOM_CHARGE LIKE '%" + v_ListeCandidatsDto.getPrenomCharge()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getMobilite() != null) {
				query = query + " AND V_ListeCandidats.MOBILITE = " + v_ListeCandidatsDto.getMobilite() + "";
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
	public List<V_ListeCandidats> rechercherV_ListeCandidatsARelancer(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size) {

		String query = "SELECT * FROM V_ListeCandidats WHERE V_ListeCandidats.RELANCER=1 ";
		query = GeneretaeARelancerConditionQuery(v_ListeCandidatsDto, query);
		query += " LIMIT " + page + "," + size;
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<V_ListeCandidats> liste = (List<V_ListeCandidats>) st.addEntity(V_ListeCandidats.class).list();
		return liste;
	}

	@Override
	public Integer rechercherV_ListeCandidatsARelancerNbr(V_ListeCandidatsDto NCD) {
		String query = "SELECT count(*) FROM V_ListeCandidats WHERE V_ListeCandidats.RELANCER=1 ";
		query = GeneretaeARelancerConditionQuery(NCD, query);
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	@Override
	public List<V_ListeCandidats> rechercherV_ListeNouveauxCandidats(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size) {
		String query = "SELECT * FROM V_ListeCandidats WHERE V_ListeCandidats.STATUT=2  AND V_ListeCandidats.DISPONIBILITE IS NULL AND V_ListeCandidats.RELANCER IS NULL AND V_ListeCandidats.DATE_RELANCE IS NULL AND V_ListeCandidats.DATE_ENTRETIEN IS NULL AND V_ListeCandidats.LIEU_ENTRETIEN IS NULL AND V_ListeCandidats.COMMENTAIRE IS NULL AND V_ListeCandidats.CONFIRMATION_RDV IS NULL ";
		query = GenerateConditionQuery(v_ListeCandidatsDto, query);

		if (v_ListeCandidatsDto != null) {

			if (v_ListeCandidatsDto.getCritereRecheche() != null) {
				if (v_ListeCandidatsDto.getCritereRecheche().equals("1")) {
					Calendar calendar = Calendar.getInstance();
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -1);
					Date toDate = calendar.getTime();
					query = query + " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'" + sdf.format(toDate) + "' AND '"
							+ sdf.format(date) + "'";
				} else if (v_ListeCandidatsDto.getCritereRecheche().equals("2")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -1);
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -6);
					Date toDate = calendar.getTime();
					query = query + " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) BETWEEN '" + sdf.format(toDate)
							+ "' AND '" + sdf.format(date) + "'";

				} else if (v_ListeCandidatsDto.getCritereRecheche().equals("3")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -6);
					Date date = calendar.getTime();
					calendar.add(Calendar.YEAR, -3);
					Date toDate = calendar.getTime();
					query = query + " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'" + sdf.format(toDate)
							+ " 00:00:00' AND '" + sdf.format(date) + " 23:59:59'";
				} else {

				}

			}

		}
		query += " LIMIT :page, :size";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size", size);		
		@SuppressWarnings("unchecked")
		List<V_ListeCandidats> liste = (List<V_ListeCandidats>) st.addEntity(V_ListeCandidats.class).list();

		return liste;
	}

	@Override
	public Integer rechercherV_ListeNouveauxCandidatsNbr(V_ListeCandidatsDto v_ListeCandidatsDto) {
		String query = "SELECT count(*) FROM V_ListeCandidats WHERE V_ListeCandidats.STATUT=2  AND V_ListeCandidats.DISPONIBILITE IS NULL AND V_ListeCandidats.RELANCER IS NULL AND V_ListeCandidats.DATE_RELANCE IS NULL AND V_ListeCandidats.DATE_ENTRETIEN IS NULL AND V_ListeCandidats.LIEU_ENTRETIEN IS NULL AND V_ListeCandidats.COMMENTAIRE IS NULL AND V_ListeCandidats.CONFIRMATION_RDV IS NULL ";
		query = GenerateConditionQuery(v_ListeCandidatsDto, query);

		if (v_ListeCandidatsDto != null) {

			if (v_ListeCandidatsDto.getCritereRecheche() != null) {
				if (v_ListeCandidatsDto.getCritereRecheche().equals("1")) {
					Calendar calendar = Calendar.getInstance();
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -1);
					Date toDate = calendar.getTime();
					query = query + " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'" + sdf.format(toDate) + "' AND '"
							+ sdf.format(date) + "'";
				} else if (v_ListeCandidatsDto.getCritereRecheche().equals("2")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -1);
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -6);
					Date toDate = calendar.getTime();
					query = query + " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) BETWEEN '" + sdf.format(toDate)
							+ "' AND '" + sdf.format(date) + "'";

				} else if (v_ListeCandidatsDto.getCritereRecheche().equals("3")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -6);
					Date date = calendar.getTime();
					calendar.add(Calendar.YEAR, -3);
					Date toDate = calendar.getTime();
					query = query + " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'" + sdf.format(toDate)
							+ " 00:00:00' AND '" + sdf.format(date) + " 23:59:59'";
				} else {

				}

			}

		}
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}
	
	@Override
	public List<V_ListeCandidats> rechercherNouveauxCandidats(V_ListeCandidatsDto v_ListeCandidatsDto) {
		String query = "SELECT * FROM V_ListeCandidats WHERE V_ListeCandidats.STATUT=2  AND V_ListeCandidats.DISPONIBILITE IS NULL AND V_ListeCandidats.RELANCER IS NULL AND V_ListeCandidats.DATE_RELANCE IS NULL AND V_ListeCandidats.DATE_ENTRETIEN IS NULL AND V_ListeCandidats.LIEU_ENTRETIEN IS NULL AND V_ListeCandidats.COMMENTAIRE IS NULL AND V_ListeCandidats.CONFIRMATION_RDV IS NULL ";
		if (v_ListeCandidatsDto != null) {
			if (v_ListeCandidatsDto.getNom() != null && !v_ListeCandidatsDto.getNom().isEmpty()) {
				query = query + " AND V_ListeCandidats.NOM_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getNom() + "%'";
			}

			if (v_ListeCandidatsDto.getPrenom() != null && !v_ListeCandidatsDto.getPrenom().isEmpty()) {
				query = query + " AND V_ListeCandidats.PRENOM_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getPrenom()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getNumeroTel() != null && !v_ListeCandidatsDto.getNumeroTel().isEmpty()) {
				query = query + " AND V_ListeCandidats.NUMERO_TEL_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getNumeroTel()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getEmail() != null && !v_ListeCandidatsDto.getEmail().isEmpty()) {
				query = query + " AND V_ListeCandidats.EMAIL_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getEmail() + "%'";
			}

			if (v_ListeCandidatsDto.getDateInscription() != null) {
				query = query + " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) ='"
						+ sdf.format(v_ListeCandidatsDto.getDateInscription()) + "'";
			}

			if (v_ListeCandidatsDto.getStatut() != null) {
				query = query + " AND V_ListeCandidats.STATUT = " + v_ListeCandidatsDto.getStatut().ordinal() + "";
			}

			if (v_ListeCandidatsDto.getTechnologie() != null && !v_ListeCandidatsDto.getTechnologie().isEmpty()) {
				query = query + " AND V_ListeCandidats.TECHNOLOGIE = '" + v_ListeCandidatsDto.getTechnologie() + "'";
			}

			if (v_ListeCandidatsDto.getRegion() != null && !v_ListeCandidatsDto.getRegion().isEmpty()) {
				query = query + " AND V_ListeCandidats.REGION LIKE '%" + v_ListeCandidatsDto.getRegion() + "%'";
			}

			if (v_ListeCandidatsDto.getNomSourceur() != null && !v_ListeCandidatsDto.getNomSourceur().isEmpty()) {
				query = query + " AND V_ListeCandidats.NOM_SOURCEUR LIKE '%" + v_ListeCandidatsDto.getNomSourceur()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getPrenomSourceur() != null && !v_ListeCandidatsDto.getPrenomSourceur().isEmpty()) {
				query = query + " AND V_ListeCandidats.PRENOM_SOURCEUR LIKE '%"
						+ v_ListeCandidatsDto.getPrenomSourceur() + "%'";
			}

			if (v_ListeCandidatsDto.getConfirmationRdv() != null) {
				query = query + " AND V_ListeCandidats.CONFIRMATION_RDV = "
						+ v_ListeCandidatsDto.getConfirmationRdv().booleanValue() + "";
			}

			if (v_ListeCandidatsDto.getMobiliteLille() != null) {
				query = query + " AND V_ListeCandidats.mobilite_Lille = "
						+ v_ListeCandidatsDto.getMobiliteLille().ordinal() + "";
			}

			if (v_ListeCandidatsDto.getCvSource() != null) {
				query = query + " AND V_ListeCandidats.cv_Source = "
						+ v_ListeCandidatsDto.getCvSource().ordinal() + "";
			}
			
			if (v_ListeCandidatsDto.getCritereRecheche() != null) {
				if (v_ListeCandidatsDto.getCritereRecheche().equals("1")) {
					Calendar calendar = Calendar.getInstance();
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -1);
					Date toDate = calendar.getTime();
					query = query + " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'" + sdf.format(toDate) + "' AND '"
							+ sdf.format(date) + "'";
				} else if (v_ListeCandidatsDto.getCritereRecheche().equals("2")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -1);
					Date date = calendar.getTime();
					calendar.add(Calendar.MONTH, -6);
					Date toDate = calendar.getTime();
					query = query + " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) BETWEEN '" + sdf.format(toDate)
							+ "' AND '" + sdf.format(date) + "'";

				} else if (v_ListeCandidatsDto.getCritereRecheche().equals("3")) {
					Calendar calendar = Calendar.getInstance();
					calendar.add(Calendar.MONTH, -6);
					Date date = calendar.getTime();
					calendar.add(Calendar.YEAR, -3);
					Date toDate = calendar.getTime();
					query = query + " AND V_ListeCandidats.DATE_INSCRIPTION BETWEEN'" + sdf.format(toDate)
							+ " 00:00:00' AND '" + sdf.format(date) + " 23:59:59'";
				} else {

				}

			}

		}
		query = query + " ORDER BY V_ListeCandidats.DATE_INSCRIPTION DESC";
		System.out.println(query);
		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<V_ListeCandidats> liste = (List<V_ListeCandidats>) st.addEntity(V_ListeCandidats.class).list();

		return liste;
	}

	@Override
	public Integer rechercherV_ListeCandidatsNbr(V_ListeCandidatsDto v_ListeCandidatsDto) {
		String query = "SELECT count(*) FROM V_ListeCandidats WHERE 1=1 ";
		query = GenerateConditionQuery(v_ListeCandidatsDto, query);
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	@Override
	public List<V_ListeCandidats> rechercherV_ListeCandidats(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size) {

		String query = "SELECT * FROM V_ListeCandidats WHERE 1=1 ";
		query = GenerateConditionQuery(v_ListeCandidatsDto, query);
//		query = query + " ORDER BY V_ListeCandidats.DATE_INSCRIPTION DESC ";
		query += " LIMIT :page, :size";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size", size);
		
		@SuppressWarnings("unchecked")
		List<V_ListeCandidats> liste = (List<V_ListeCandidats>) st.addEntity(V_ListeCandidats.class).list();
		return liste;
	}

	private String GenerateConditionQuery(V_ListeCandidatsDto v_ListeCandidatsDto, String query) {
		if (v_ListeCandidatsDto != null) {
			if (v_ListeCandidatsDto.getNom() != null && !v_ListeCandidatsDto.getNom().isEmpty()) {
				query = query + " AND V_ListeCandidats.NOM_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getNom() + "%'";
			}

			if (v_ListeCandidatsDto.getPrenom() != null && !v_ListeCandidatsDto.getPrenom().isEmpty()) {
				query = query + " AND V_ListeCandidats.PRENOM_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getPrenom()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getNumeroTel() != null && !v_ListeCandidatsDto.getNumeroTel().isEmpty()) {
				query = query + " AND V_ListeCandidats.NUMERO_TEL_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getNumeroTel()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getEmail() != null && !v_ListeCandidatsDto.getEmail().isEmpty()) {
				query = query + " AND V_ListeCandidats.EMAIL_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getEmail() + "%'";
			}

			if (v_ListeCandidatsDto.getDateInscription() != null) {
				query = query + " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) ='"
						+ sdf.format(v_ListeCandidatsDto.getDateInscription()) + "'";
			}

			if (v_ListeCandidatsDto.getStatut() != null) {
				query = query + " AND V_ListeCandidats.STATUT = " + v_ListeCandidatsDto.getStatut().ordinal() + "";
			}

			if (v_ListeCandidatsDto.getTechnologie() != null && !v_ListeCandidatsDto.getTechnologie().isEmpty()) {
				query = query + " AND V_ListeCandidats.TECHNOLOGIE = '" + v_ListeCandidatsDto.getTechnologie() + "'";
			}

			if (v_ListeCandidatsDto.getRegion() != null && !v_ListeCandidatsDto.getRegion().isEmpty()) {
				query = query + " AND V_ListeCandidats.REGION LIKE '%" + v_ListeCandidatsDto.getRegion() + "%'";
			}

			if (v_ListeCandidatsDto.getNomSourceur() != null && !v_ListeCandidatsDto.getNomSourceur().isEmpty()) {
				query = query + " AND V_ListeCandidats.NOM_SOURCEUR LIKE '%" + v_ListeCandidatsDto.getNomSourceur()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getPrenomSourceur() != null && !v_ListeCandidatsDto.getPrenomSourceur().isEmpty()) {
				query = query + " AND V_ListeCandidats.PRENOM_SOURCEUR LIKE '%"
						+ v_ListeCandidatsDto.getPrenomSourceur() + "%'";
			}

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
				query = query + " AND DATE(V_ListeCandidats.DATE_ENTRETIEN) ='"
						+ sdf.format(v_ListeCandidatsDto.getDateEntretien()) + "'";
			}

			if (v_ListeCandidatsDto.getLieuEntretien() != null && !v_ListeCandidatsDto.getLieuEntretien().isEmpty()) {
				query = query + " AND V_ListeCandidats.LIEU_ENTRETIEN LIKE '%" + v_ListeCandidatsDto.getLieuEntretien()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getConfirmationRdv() != null) {
				query = query + " AND V_ListeCandidats.CONFIRMATION_RDV = "
						+ v_ListeCandidatsDto.getConfirmationRdv().booleanValue() + "";
			}

			if (v_ListeCandidatsDto.getMobiliteLille() != null) {
				query = query + " AND V_ListeCandidats.mobilite_Lille = "
						+ v_ListeCandidatsDto.getMobiliteLille().ordinal() + "";
			}

			if (v_ListeCandidatsDto.getCvSource() != null) {
				query = query + " AND V_ListeCandidats.cv_Source = " + v_ListeCandidatsDto.getCvSource().ordinal() + "";
			}

			if (v_ListeCandidatsDto.getNomCharge() != null && !v_ListeCandidatsDto.getNomCharge().isEmpty()) {
				query = query + " AND V_ListeCandidats.NOM_CHARGE LIKE '%" + v_ListeCandidatsDto.getNomCharge() + "%'";
			}

			if (v_ListeCandidatsDto.getPrenomCharge() != null && !v_ListeCandidatsDto.getPrenomCharge().isEmpty()) {
				query = query + " AND V_ListeCandidats.PRENOM_CHARGE LIKE '%" + v_ListeCandidatsDto.getPrenomCharge()
						+ "%'";
			}

		}
		return query;
	}

	private String GeneretaeARelancerConditionQuery(V_ListeCandidatsDto v_ListeCandidatsDto, String query) {
		if (v_ListeCandidatsDto != null) {
			if (v_ListeCandidatsDto.getNom() != null && !v_ListeCandidatsDto.getNom().isEmpty()) {
				query = query + " AND V_ListeCandidats.NOM_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getNom() + "%'";
			}

			if (v_ListeCandidatsDto.getPrenom() != null && !v_ListeCandidatsDto.getPrenom().isEmpty()) {
				query = query + " AND V_ListeCandidats.PRENOM_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getPrenom()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getNumeroTel() != null && !v_ListeCandidatsDto.getNumeroTel().isEmpty()) {
				query = query + " AND V_ListeCandidats.NUMERO_TEL_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getNumeroTel()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getEmail() != null && !v_ListeCandidatsDto.getEmail().isEmpty()) {
				query = query + " AND V_ListeCandidats.EMAIL_CANDIDAT LIKE '%" + v_ListeCandidatsDto.getEmail() + "%'";
			}

			if (v_ListeCandidatsDto.getDateInscription() != null) {
				query = query + " AND DATE(V_ListeCandidats.DATE_INSCRIPTION) ='"
						+ sdf.format(v_ListeCandidatsDto.getDateInscription()) + "'";
			}

			if (v_ListeCandidatsDto.getStatut() != null) {
				query = query + " AND V_ListeCandidats.STATUT = " + v_ListeCandidatsDto.getStatut().ordinal() + "";
			}

			if (v_ListeCandidatsDto.getTechnologie() != null && !v_ListeCandidatsDto.getTechnologie().isEmpty()) {
				query = query + " AND V_ListeCandidats.TECHNOLOGIE = '" + v_ListeCandidatsDto.getTechnologie() + "'";
			}

			if (v_ListeCandidatsDto.getRegion() != null && !v_ListeCandidatsDto.getRegion().isEmpty()) {
				query = query + " AND V_ListeCandidats.REGION LIKE '%" + v_ListeCandidatsDto.getRegion() + "%'";
			}

			if (v_ListeCandidatsDto.getNomSourceur() != null) {
				query = query + " AND V_ListeCandidats.NOM_SOURCEUR LIKE '%" + v_ListeCandidatsDto.getNomSourceur()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getPrenomSourceur() != null) {
				query = query + " AND V_ListeCandidats.PRENOM_SOURCEUR LIKE '%"
						+ v_ListeCandidatsDto.getPrenomSourceur() + "%'";
			}

			if (v_ListeCandidatsDto.getDisponibilite() != null) {
				query = query + " AND V_ListeCandidats.DISPONIBILITE = "
						+ v_ListeCandidatsDto.getDisponibilite().ordinal() + "";
			}

			if (v_ListeCandidatsDto.getRelancer() != null) {
				query = query + " AND V_ListeCandidats.RELANCER = " + v_ListeCandidatsDto.getRelancer() + "";
			}

			if (v_ListeCandidatsDto.getDateRelance() != null) {

				java.sql.Timestamp fromDate = new java.sql.Timestamp(v_ListeCandidatsDto.getDateRelance().getTime());
				fromDate.setHours(0);
				fromDate.setMinutes(0);
				fromDate.setSeconds(0);

				query = query + " AND DATE(V_ListeCandidats.DATE_RELANCE) >= '" + fromDate
						+ "' AND DATE(V_ListeCandidats.DATE_RELANCE) <= LAST_DAY('" + fromDate + "') ";
			}

			if (v_ListeCandidatsDto.getDateEntretien() != null) {
				query = query + " AND DATE(V_ListeCandidats.DATE_ENTRETIEN) ='"
						+ sdf.format(v_ListeCandidatsDto.getDateEntretien()) + "'";
			}

			if (v_ListeCandidatsDto.getLieuEntretien() != null && !v_ListeCandidatsDto.getLieuEntretien().isEmpty()) {
				query = query + " AND V_ListeCandidats.LIEU_ENTRETIEN LIKE '%" + v_ListeCandidatsDto.getLieuEntretien()
						+ "%'";
			}

			if (v_ListeCandidatsDto.getConfirmationRdv() != null) {
				query = query + " AND V_ListeCandidats.CONFIRMATION_RDV = "
						+ v_ListeCandidatsDto.getConfirmationRdv().booleanValue() + "";
			}

			if (v_ListeCandidatsDto.getNomCharge() != null && !v_ListeCandidatsDto.getNomCharge().isEmpty()) {
				query = query + " AND V_ListeCandidats.NOM_CHARGE LIKE '%" + v_ListeCandidatsDto.getNomCharge() + "%'";
			}

			if (v_ListeCandidatsDto.getPrenomCharge() != null && !v_ListeCandidatsDto.getPrenomCharge().isEmpty()) {
				query = query + " AND V_ListeCandidats.PRENOM_CHARGE LIKE '%" + v_ListeCandidatsDto.getPrenomCharge()
						+ "%'";
			}
			if (v_ListeCandidatsDto.getDateDebut() != null && v_ListeCandidatsDto.getDateFin() != null) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(v_ListeCandidatsDto.getDateDebut().getTime());
				java.sql.Timestamp toDate = new java.sql.Timestamp(v_ListeCandidatsDto.getDateFin().getTime());
				fromDate.setHours(0);
				fromDate.setMinutes(0);
				fromDate.setSeconds(0);
				toDate.setHours(23);
				toDate.setMinutes(59);
				query = query + " AND DATE(V_ListeCandidats.DATE_RELANCE) >= '" + fromDate
						+ "' AND DATE(V_ListeCandidats.DATE_RELANCE) <= '" + toDate + "'";
			} else {

				if (v_ListeCandidatsDto.getDateDebut() != null) {
					java.sql.Timestamp fromDate = new java.sql.Timestamp(v_ListeCandidatsDto.getDateDebut().getTime());

					query = query + " AND DATE(V_ListeCandidats.DATE_RELANCE) >= '" + fromDate + "'";
				}
				if (v_ListeCandidatsDto.getDateFin() != null) {
					java.sql.Timestamp toDate = new java.sql.Timestamp(v_ListeCandidatsDto.getDateFin().getTime());
					query = query + "' AND DATE(V_ListeCandidats.DATE_RELANCE) < '" + toDate + "'";
				}
			}

		}
		return query;
	}

}
