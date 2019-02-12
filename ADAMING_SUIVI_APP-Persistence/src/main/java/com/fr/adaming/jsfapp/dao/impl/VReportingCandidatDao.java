package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.List;
import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;
import com.fr.adaming.jsfapp.dao.IvReportingCandidatDao;
import com.fr.adaming.jsfapp.dto.VReportingCandidatDto;
import com.fr.adaming.jsfapp.model.VReportingCandidat;

@Repository("v_ReportingCandidatDao")
public class VReportingCandidatDao extends ManagerDao<VReportingCandidat, Long>
		implements IvReportingCandidatDao,Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 6079291315252650409L;


	@Override
	public List<VReportingCandidat> rechercherReportingCandidat(
			VReportingCandidatDto vReportingcandidatDto, int page,
			int size) {

		String query = "SELECT * FROM V_ReportingCandidat AS V_RC WHERE 1=1 ";
		query = GenereteReportingConditionQuery(vReportingcandidatDto, query);
		query += " LIMIT :page, :size";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("page", page).setParameter("size", size);
		@SuppressWarnings("unchecked")
		List<VReportingCandidat> liste = (List<VReportingCandidat>) st.addEntity(
				VReportingCandidat.class).list();

		return liste;
	}


	@Override
	public Integer rechercherReportingCandidatNbr(VReportingCandidatDto vReportingcandidatDto) {
		String query = "SELECT count(*) FROM V_ReportingCandidat AS V_RC WHERE 1=1 ";
		query = GenereteReportingConditionQuery(vReportingcandidatDto, query);
		SQLQuery st = getSession().createSQLQuery(query);
		return ((BigInteger) st.uniqueResult()).intValue();
	}
	
	
	private String GenereteReportingConditionQuery(VReportingCandidatDto vReportingcandidatDto, String query) {
		if (vReportingcandidatDto != null) {
			if (vReportingcandidatDto.getNomSourceur() != null  && !vReportingcandidatDto.getNomSourceur().isEmpty()
					&& vReportingcandidatDto.getPrenomSourceur() != null  && !vReportingcandidatDto.getPrenomSourceur().isEmpty()) {
				query = query + " AND V_RC.Nom_sourceur = '"
						+ vReportingcandidatDto.getNomSourceur()
						+ "' AND V_RC.Prenom_Sourceur = '"
						+ vReportingcandidatDto.getPrenomSourceur() + "'";
			}
			if (vReportingcandidatDto.getLieuEntretien() != null && !vReportingcandidatDto.getLieuEntretien().isEmpty()) {
				query = query + " AND V_RC.Lieu_Entretien = '"
						+ vReportingcandidatDto.getLieuEntretien() + "'";
			}
			if (vReportingcandidatDto.getTechnologie()!= null && !vReportingcandidatDto.getTechnologie().isEmpty()) {
				query = query + " AND V_RC.TECHNOLOGIE = '"
						+ vReportingcandidatDto.getTechnologie() + "'";
			}
			if (vReportingcandidatDto.getOrigine() != null && !vReportingcandidatDto.getOrigine().isEmpty()) {
				query = query + " AND V_RC.ORIGINE = '"
						+ vReportingcandidatDto.getOrigine() + "'";
			}
			if (vReportingcandidatDto.getRegion() != null && !vReportingcandidatDto.getRegion().isEmpty()) {
				query = query + " AND V_RC.REGION ='"
						+ vReportingcandidatDto.getRegion() + "'";
			}
			if (vReportingcandidatDto.getDateDebut() != null
					&& vReportingcandidatDto.getDateFin() != null) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(
						vReportingcandidatDto.getDateDebut().getTime());
				java.sql.Timestamp toDate = new java.sql.Timestamp(
						vReportingcandidatDto.getDateFin().getTime());
				query = query + " AND V_RC.DATE_INSCRIPTION >= '"
						+ fromDate
						+ "' AND V_RC.DATE_INSCRIPTION <= '"
						+ toDate + "'";
			} else {

				if (vReportingcandidatDto.getDateDebut() != null) {
					java.sql.Timestamp fromDate = new java.sql.Timestamp(
							vReportingcandidatDto.getDateDebut().getTime());

					query = query
							+ " AND V_RC.DATE_INSCRIPTION >= '"
							+ fromDate + "'";
				}
				if (vReportingcandidatDto.getDateFin() != null) {
					java.sql.Timestamp toDate = new java.sql.Timestamp(
							vReportingcandidatDto.getDateFin().getTime());
					query = query
							+ "' AND V_RC.DATE_INSCRIPTION < '"
							+ toDate + "'";
				}
			}
			if (vReportingcandidatDto.getNomCharge() != null && !vReportingcandidatDto.getNomCharge().isEmpty()
					&& vReportingcandidatDto.getPrenomCharge() != null && !vReportingcandidatDto.getPrenomCharge().isEmpty()) {
				query = query + " AND V_RC.Nom_charge = '"
						+ vReportingcandidatDto.getNomCharge()
						+ "' AND V_RC.Prenom_charge = '"
						+ vReportingcandidatDto.getPrenomCharge() + "'";
			}
			if (vReportingcandidatDto.getDateEntretien() != null) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(
						vReportingcandidatDto.getDateEntretien().getTime());
				query = query + " AND V_RC.DATE_ENTRETIEN ='"
						+ fromDate + "'";
			}
			if (vReportingcandidatDto.getDateObtentionDiplome() != null) {
				java.sql.Timestamp fromDate = new java.sql.Timestamp(
						vReportingcandidatDto.getDateObtentionDiplome().getTime());
				query = query + " AND V_RC.DATE_OBTENTION_DIPLOME ='"
						+ fromDate + "'";
			}
			if (vReportingcandidatDto.getStatut() != null) {
				query = query + " AND V_RC.STATUT = "
						+ vReportingcandidatDto.getStatut().ordinal() + "";
			}
			if (vReportingcandidatDto.getMobiliteLille() != null) {
				query = query + " AND V_RC.mobilite_Lille = "
						+ vReportingcandidatDto.getMobiliteLille().ordinal() + "";
			}
			if (vReportingcandidatDto.getCvSource() != null) {
				query = query + " AND V_RC.cv_Source = "
						+ vReportingcandidatDto.getCvSource().ordinal() + "";
			}
		}
		return query;
	}

	
}
