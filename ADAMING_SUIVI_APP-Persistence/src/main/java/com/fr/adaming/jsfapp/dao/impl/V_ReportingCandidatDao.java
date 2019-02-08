package com.fr.adaming.jsfapp.dao.impl;

import java.math.BigInteger;
import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;
import com.fr.adaming.jsfapp.dao.IvReportingCandidatDao;
import com.fr.adaming.jsfapp.dto.VReportingCandidatDto;
import com.fr.adaming.jsfapp.model.VReportingCandidat;

@Repository("v_ReportingCandidatDao")
public class V_ReportingCandidatDao extends ManagerDao<VReportingCandidat, Long> implements IvReportingCandidatDao {

	@Override
	public List<VReportingCandidat> rechercherReportingCandidat(VReportingCandidatDto v_ReportingcandidatDto, int page,
			int size) {

		String query = "SELECT * FROM V_ReportingCandidat AS V_RC WHERE 1=1 ";
		query = GenereteReportingConditionQuery(v_ReportingcandidatDto, query);
		query += " LIMIT :page, :size";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size",
				size);
		@SuppressWarnings("unchecked")
		List<VReportingCandidat> liste = (List<VReportingCandidat>) st.addEntity(VReportingCandidat.class).list();

		return liste;
	}

	@Override
	public Integer rechercherReportingCandidatNbr(VReportingCandidatDto v_ReportingcandidatDto) {
		String query = "SELECT count(*) FROM V_ReportingCandidat AS V_RC WHERE 1=1 ";
		query = GenereteReportingConditionQuery(v_ReportingcandidatDto, query);
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}

	private String GenereteReportingConditionQuery(VReportingCandidatDto v_ReportingcandidatDto, String query) {
		if (v_ReportingcandidatDto != null) {
			if (v_ReportingcandidatDto.getNomSourceur() != null && !v_ReportingcandidatDto.getNomSourceur().isEmpty()
					&& v_ReportingcandidatDto.getPrenomSourceur() != null
					&& !v_ReportingcandidatDto.getPrenomSourceur().isEmpty()) {
				query = query + " AND V_RC.Nom_sourceur = '" + v_ReportingcandidatDto.getNomSourceur()
						+ "' AND V_RC.Prenom_Sourceur = '" + v_ReportingcandidatDto.getPrenomSourceur() + "'";
			}
			if (v_ReportingcandidatDto.getLieuEntretien() != null
					&& !v_ReportingcandidatDto.getLieuEntretien().isEmpty()) {
				query = query + " AND V_RC.Lieu_Entretien = '" + v_ReportingcandidatDto.getLieuEntretien() + "'";
			}
			if (v_ReportingcandidatDto.getTechnologie() != null && !v_ReportingcandidatDto.getTechnologie().isEmpty()) {
				query = query + " AND V_RC.TECHNOLOGIE = '" + v_ReportingcandidatDto.getTechnologie() + "'";
			}
			if (v_ReportingcandidatDto.getOrigine() != null && !v_ReportingcandidatDto.getOrigine().isEmpty()) {
				query = query + " AND V_RC.ORIGINE = '" + v_ReportingcandidatDto.getOrigine() + "'";
			}
			if (v_ReportingcandidatDto.getRegion() != null && !v_ReportingcandidatDto.getRegion().isEmpty()) {
				query = query + " AND V_RC.REGION ='" + v_ReportingcandidatDto.getRegion() + "'";
			}
			if (v_ReportingcandidatDto.getDateDebut() != null && v_ReportingcandidatDto.getDateFin() != null) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(v_ReportingcandidatDto.getDateDebut().getTime());
				java.sql.Timestamp toDate = new java.sql.Timestamp(v_ReportingcandidatDto.getDateFin().getTime());
				fromDate.setHours(0);
				fromDate.setMinutes(0);
				fromDate.setSeconds(0);
				toDate.setHours(23);
				toDate.setMinutes(59);
				query = query + " AND V_RC.DATE_INSCRIPTION >= '" + fromDate + "' AND V_RC.DATE_INSCRIPTION <= '"
						+ toDate + "'";
			} else {

				if (v_ReportingcandidatDto.getDateDebut() != null) {
					java.sql.Timestamp fromDate = new java.sql.Timestamp(
							v_ReportingcandidatDto.getDateDebut().getTime());

					query = query + " AND V_RC.DATE_INSCRIPTION >= '" + fromDate + "'";
				}
				if (v_ReportingcandidatDto.getDateFin() != null) {
					java.sql.Timestamp toDate = new java.sql.Timestamp(v_ReportingcandidatDto.getDateFin().getTime());
					query = query + "' AND V_RC.DATE_INSCRIPTION < '" + toDate + "'";
				}
			}
			if (v_ReportingcandidatDto.getNomCharge() != null && !v_ReportingcandidatDto.getNomCharge().isEmpty()
					&& v_ReportingcandidatDto.getPrenomCharge() != null
					&& !v_ReportingcandidatDto.getPrenomCharge().isEmpty()) {
				query = query + " AND V_RC.Nom_charge = '" + v_ReportingcandidatDto.getNomCharge()
						+ "' AND V_RC.Prenom_charge = '" + v_ReportingcandidatDto.getPrenomCharge() + "'";
			}
			if (v_ReportingcandidatDto.getDateEntretien() != null) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(
						v_ReportingcandidatDto.getDateEntretien().getTime());
				query = query + " AND V_RC.DATE_ENTRETIEN ='" + fromDate + "'";
			}
			if (v_ReportingcandidatDto.getDateObtentionDiplome() != null) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(
						v_ReportingcandidatDto.getDateObtentionDiplome().getTime());
				query = query + " AND V_RC.DATE_OBTENTION_DIPLOME ='" + fromDate + "'";
			}
			if (v_ReportingcandidatDto.getStatut() != null) {
				query = query + " AND V_RC.STATUT = " + v_ReportingcandidatDto.getStatut().ordinal() + "";
			}
			if (v_ReportingcandidatDto.getMobiliteLille() != null) {
				query = query + " AND V_RC.mobilite_Lille = " + v_ReportingcandidatDto.getMobiliteLille().ordinal()
						+ "";
			}
			if (v_ReportingcandidatDto.getCvSource() != null) {
				query = query + " AND V_RC.cv_Source = " + v_ReportingcandidatDto.getCvSource().ordinal() + "";
			}
		}
		return query;
	}

}
