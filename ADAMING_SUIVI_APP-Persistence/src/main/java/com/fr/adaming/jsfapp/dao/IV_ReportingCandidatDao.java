package com.fr.adaming.jsfapp.dao;

import java.util.List;

import com.fr.adaming.jsfapp.dto.V_ReportingCandidatDto;
import com.fr.adaming.jsfapp.model.V_ReportingCandidat;


public interface IV_ReportingCandidatDao extends IManagerDao<V_ReportingCandidat, Long> {

	List<V_ReportingCandidat> rechercherReportingCandidat(V_ReportingCandidatDto ReportingCandidatDto, int page,
			int size);
}
