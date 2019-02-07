package com.fr.adaming.jsfapp.dao;

import java.util.List;


import com.fr.adaming.jsfapp.dto.V_ReportingCandidatDto;
import com.fr.adaming.jsfapp.model.VReportingCandidat;


public interface IvReportingCandidatDao extends IManagerDao<VReportingCandidat, Long> {

	List<VReportingCandidat> rechercherReportingCandidat(V_ReportingCandidatDto reportingCandidatDto, int page,
			int size);
	
	public Integer rechercherReportingCandidatNbr(V_ReportingCandidatDto reportingCandidatDto);

}
