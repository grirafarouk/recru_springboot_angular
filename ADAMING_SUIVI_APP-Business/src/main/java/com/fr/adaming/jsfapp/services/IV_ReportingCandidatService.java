package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.dto.V_ReportingCandidatDto;
import com.fr.adaming.jsfapp.model.V_ReportingCandidat;

public interface IV_ReportingCandidatService extends IManagerService<V_ReportingCandidat, Long> {
	List<V_ReportingCandidat> rechercherReportingCandidat(V_ReportingCandidatDto reportingCandidatDto, int page,
			int size);
}
