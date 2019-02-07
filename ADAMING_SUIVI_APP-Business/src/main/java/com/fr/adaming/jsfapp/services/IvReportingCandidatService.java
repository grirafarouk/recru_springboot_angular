package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.dto.V_ReportingCandidatDto;
import com.fr.adaming.jsfapp.model.VReportingCandidat;

public interface IvReportingCandidatService extends IManagerService<VReportingCandidat, Long> {
	List<VReportingCandidat> rechercherReportingCandidat(V_ReportingCandidatDto reportingCandidatDto, int page,
			int size);
	public Integer rechercherReportingCandidatNbr(V_ReportingCandidatDto reportingCandidatDto);

}
