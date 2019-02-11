package com.fr.adaming.jsfapp.dao;

import java.util.List;

import com.fr.adaming.jsfapp.dto.VReportingCandidatDto;
import com.fr.adaming.jsfapp.model.VReportingCandidat;

public interface IvReportingCandidatDao extends IManagerDao<VReportingCandidat, Long> {

	List<VReportingCandidat> rechercherReportingCandidat(VReportingCandidatDto reportingCandidatDto, int page,
			int size);

	public Integer rechercherReportingCandidatNbr(VReportingCandidatDto reportingCandidatDto);

}
