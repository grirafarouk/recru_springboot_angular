package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;
import com.fr.adaming.jsfapp.dao.IvReportingCandidatDao;
import com.fr.adaming.jsfapp.dto.VReportingCandidatDto;
import com.fr.adaming.jsfapp.model.VReportingCandidat;

@Repository("v_ReportingCandidatDao")
public class VReportingCandidatDao extends ManagerDao<VReportingCandidat, Long>
		implements IvReportingCandidatDao, Serializable {
	DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	private static final String LISTE_CANDIDAT_NOM = " AND V_RC.Nom_Candidat LIKE '%";
	private static final String LISTE_CANDIDAT_PRENOM = " AND V_RC.Prenom_Candidat LIKE '%";
	private static final String LISTE_CANDIDAT_DATE = " AND DATE(V_RC.DATE_ENTRETIEN) ='";
	private static final String LISTE_CANDIDAT_LIEU = " AND V_RC.Lieu_Entretien LIKE '%";
	private static final String LISTE_CANDIDAT_NOM_CHARGE = " AND V_RC.Nom_charge LIKE '%";
	private static final String LISTE_CANDIDAT_PRENOM_CHARGE = " AND V_RC.Prenom_charge LIKE '%";
	private static final String LISTE_CANDIDAT_STATUS = " AND V_RC.STATUT LIKE '%";
	private static final String LIMIT_PAGINATION = " LIMIT :page, :size";
	private static final String DATE_BETWEEN = " AND V_RC.DATE_INSCRIPTION BETWEEN'";
	private static final String AND_REQ = "' AND '";
	private static final String AND_DUP = " AND DATE(V_RC.DATE_INSCRIPTION) BETWEEN '";
	private static final String HOUR_START = " 00:00:00' AND '";
	private static final String HOUR_STOP = " 23:59:59'";
	private static final String LISTE_CANDIDAT_PRE_SOUR = " AND V_RC.Prenom_Sourceur LIKE '%";
	private static final String LISTE_CANDIDAT_NOM_SOUR = " AND V_RC.Nom_sourceur LIKE '%";
	private static final String LISTE_CANDIDAT_REGION = " AND V_RC.REGION LIKE '%";
	private static final String LISTE_CANDIDAT_TECH = " AND V_RC.TECHNOLOGIE = '";
	private static final String LISTE_CANDIDAT_DATE_EQUAL = " AND DATE(V_RC.DATE_INSCRIPTION) ='";
	private static final String LISTE_CANDIDAT_EMAIL = " AND V_RC.Email_Candidat LIKE '%";
	private static final String LISTE_CANDIDAT_NUM_TELL = " AND V_RC.NUMERO_TEL_Candidat LIKE '%";

	private static final long serialVersionUID = 6079291315252650409L;

	@Override
	public List<VReportingCandidat> rechercherReportingCandidat(VReportingCandidatDto vReportingcandidatDto, int page,
			int size) {

		String query = "SELECT * FROM V_ReportingCandidat AS V_RC WHERE 1=1 ";
		query = genereteReportingConditionQuery(vReportingcandidatDto, query);
		query += " LIMIT :page, :size";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size",
				size);
		@SuppressWarnings("unchecked")
		List<VReportingCandidat> liste = (List<VReportingCandidat>) st.addEntity(VReportingCandidat.class).list();

		return liste;
	}

	@Override
	public Integer rechercherReportingCandidatNbr(VReportingCandidatDto vReportingcandidatDto) {
		String query = "SELECT count(*) FROM V_ReportingCandidat AS V_RC WHERE 1=1 ";
		query = genereteReportingConditionQuery(vReportingcandidatDto, query);
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	private String genereteReportingConditionQuery(VReportingCandidatDto vReportingcandidatDto, String query) {
		if (vReportingcandidatDto != null) {
			if (isNullOrEmptyString(vReportingcandidatDto.getNom())) {
				query = query + LISTE_CANDIDAT_NOM + vReportingcandidatDto.getNom() + "%'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getPrenom())) {
				query = query + LISTE_CANDIDAT_PRENOM + vReportingcandidatDto.getPrenom() + "%'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getNumeroTel())) {
				query = query + LISTE_CANDIDAT_NUM_TELL + vReportingcandidatDto.getNumeroTel() + "%'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getEmail())) {
				query = query + LISTE_CANDIDAT_EMAIL + vReportingcandidatDto.getEmail() + "%'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getDisponibilite())) {
				query = query + " AND V_RC.DISPONIBLE LIKE '%" + vReportingcandidatDto.getDisponibilite() + "%'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getOrigine())) {
				query = query + " AND V_RC.ORIGINE LIKE '%" + vReportingcandidatDto.getOrigine() + "%'";
			}
			if (isNullOrEmptyTwoString(vReportingcandidatDto.getNomSourceur(),
					vReportingcandidatDto.getPrenomSourceur())) {
				query = query + " AND V_RC.Nom_sourceur = '" + vReportingcandidatDto.getNomSourceur()
						+ "' AND V_RC.Prenom_Sourceur = '" + vReportingcandidatDto.getPrenomSourceur() + "'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getNoteTotale())) {
					query = query + " AND V_RC.NOTE_TOTALE ='" + vReportingcandidatDto.getNoteTotale() + "'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getLieuEntretien())) {
				query = query + " AND V_RC.Lieu_Entretien LIKE '%" + vReportingcandidatDto.getLieuEntretien() + "%'";
			}
			if (vReportingcandidatDto.getPertinence()!=null) {
				query = query + " AND V_RC.Pertinence =" + vReportingcandidatDto.getPertinence() + "";

				
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getTechnologie())) {
				query = query + " AND V_RC.TECHNOLOGIE LIKE '%" + vReportingcandidatDto.getTechnologie() + "%'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getOrigine())) {
				query = query + " AND V_RC.ORIGINE LIKE '%" + vReportingcandidatDto.getOrigine() + "%'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getSource())) {
				query = query + "AND V_RC.SOURCE LIKE '%" + vReportingcandidatDto.getSource() + "%'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getCharge())) {
				query = query + "AND V_RC.CHARGE LIKE '%" + vReportingcandidatDto.getCharge() + "%'";
			}
			if (vReportingcandidatDto.getDateEntretien() != null && vReportingcandidatDto != null) {
				query = query + " AND DATE(V_RC.DATE_ENTRETIEN) ='"
						+ sdf.format(vReportingcandidatDto.getDateEntretien()) + "'";
			}
			
			if (vReportingcandidatDto.getDateInscription() != null && vReportingcandidatDto != null) {
				query = query + " AND DATE(V_RC.DATE_INSCRIPTION) ='"
						+ sdf.format(vReportingcandidatDto.getDateInscription()) + "'";
			}
			if (vReportingcandidatDto.getDateDemarrageFormation() != null && vReportingcandidatDto != null) {
				query = query + " AND DATE(V_RC.DATE_DEMARRAGE_Formation) ='"
						+ sdf.format(vReportingcandidatDto.getDateDemarrageFormation()) + "'";
			}

			if (isNullOrEmptyString(vReportingcandidatDto.getRegion())) {
				query = query + " AND V_RC.REGION LIKE '%" + vReportingcandidatDto.getRegion() + "%'";
			}

			if (isNullOrEmptyBetweenDate(vReportingcandidatDto.getDateDebut(), vReportingcandidatDto.getDateFin())) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(vReportingcandidatDto.getDateDebut().getTime());
				java.sql.Timestamp toDate = new java.sql.Timestamp(vReportingcandidatDto.getDateFin().getTime());
				query = query + " AND V_RC.DATE_INSCRIPTION >= '" + fromDate + "' AND V_RC.DATE_INSCRIPTION <= '"
						+ toDate + "'";
			} else {

				if (vReportingcandidatDto.getDateDebut() != null) {
					java.sql.Timestamp fromDate = new java.sql.Timestamp(
							vReportingcandidatDto.getDateDebut().getTime());

					query = query + " AND V_RC.DATE_INSCRIPTION >= '" + fromDate + "'";
				}
				if (vReportingcandidatDto.getDateFin() != null) {
					java.sql.Timestamp toDate = new java.sql.Timestamp(vReportingcandidatDto.getDateFin().getTime());
					query = query + "' AND V_RC.DATE_INSCRIPTION < '" + toDate + "'";
				}
			}
			if (isNullOrEmptyTwoString(vReportingcandidatDto.getNomCharge(), vReportingcandidatDto.getPrenomCharge())) {
				query = query + " AND V_RC.Nom_charge = '" + vReportingcandidatDto.getNomCharge()
						+ "' AND V_RC.Prenom_charge = '" + vReportingcandidatDto.getPrenomCharge() + "'";
			}
			
			if (vReportingcandidatDto.getDateObtentionDiplome() != null) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(
						vReportingcandidatDto.getDateObtentionDiplome().getTime());
				query = query + " AND V_RC.DATE_OBTENTION_DIPLOME ='" + fromDate + "'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getStatut())) {
				query = query + " AND V_RC.STATUT LIKE '%" + vReportingcandidatDto.getStatut() + "%'";
			}

			if (vReportingcandidatDto.getMobiliteLille() != null) {
				query = query + " AND V_RC.mobilite_Lille = " + vReportingcandidatDto.getMobiliteLille().ordinal() + "";
			}
			if (vReportingcandidatDto.getCvSource() != null) {
				query = query + " AND V_RC.cv_Source = " + vReportingcandidatDto.getCvSource().ordinal() + "";
			}
		}
		return query;
	}

	public boolean isNullOrEmptyString(String var) {
		return var != null && !var.isEmpty();
	}

	public boolean isNullOrEmptyTwoString(String var1, String var2) {
		return var1 != null && !var1.isEmpty() && var2 != null && !var2.isEmpty();
	}

	public boolean isNullOrEmptyBetweenDate(Date d1, Date d2) {
		return d1 != null && d2 != null;
	}
}
