package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.math.BigInteger;
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
			if (isNullOrEmptyTwoString(vReportingcandidatDto.getNomSourceur(),
					vReportingcandidatDto.getPrenomSourceur())) {
				query = query + " AND V_RC.Nom_sourceur = '" + vReportingcandidatDto.getNomSourceur()
						+ "' AND V_RC.Prenom_Sourceur = '" + vReportingcandidatDto.getPrenomSourceur() + "'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getLieuEntretien())) {
				query = query + " AND V_RC.Lieu_Entretien = '" + vReportingcandidatDto.getLieuEntretien() + "'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getTechnologie())) {
				query = query + " AND V_RC.TECHNOLOGIE = '" + vReportingcandidatDto.getTechnologie() + "'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getOrigine())) {
				query = query + " AND V_RC.ORIGINE = '" + vReportingcandidatDto.getOrigine() + "'";
			}
			if (isNullOrEmptyString(vReportingcandidatDto.getRegion())) {
				query = query + " AND V_RC.REGION ='" + vReportingcandidatDto.getRegion() + "'";
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
			if (vReportingcandidatDto.getDateEntretien() != null) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(
						vReportingcandidatDto.getDateEntretien().getTime());
				query = query + " AND V_RC.DATE_ENTRETIEN ='" + fromDate + "'";
			}
			if (vReportingcandidatDto.getDateObtentionDiplome() != null) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(
						vReportingcandidatDto.getDateObtentionDiplome().getTime());
				query = query + " AND V_RC.DATE_OBTENTION_DIPLOME ='" + fromDate + "'";
			}
			if (vReportingcandidatDto.getStatut() != null) {
				query = query + " AND V_RC.STATUT = " + vReportingcandidatDto.getStatut().ordinal() + "";
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
