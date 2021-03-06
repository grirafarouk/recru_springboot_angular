package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IvReportingCandidatDao;
import com.fr.adaming.jsfapp.dto.VReportingCandidatDto;
import com.fr.adaming.jsfapp.model.VReportingCandidat;
import com.fr.adaming.jsfapp.services.IvReportingCandidatService;

@Service("v_ReportingCandidatService")
public class VReportingCandidatService extends ManagerService<VReportingCandidat, Long> implements IvReportingCandidatService {

	private static final long serialVersionUID = 8250035448282687024L;

	@Autowired()
	@Qualifier("v_ReportingCandidatDao")
	private IvReportingCandidatDao vReportingCandidatDao;

	@Override
	public List<VReportingCandidat> rechercherReportingCandidat(VReportingCandidatDto vReportingCandidatDto, int page,

			int size) {
		return vReportingCandidatDao.rechercherReportingCandidat(vReportingCandidatDto, page, size);
	}

	@Override
	public IManagerDao<VReportingCandidat, Long> getDao() {
		return vReportingCandidatDao;
	}

	@Override
	public Integer rechercherReportingCandidatNbr(VReportingCandidatDto reportingCandidatDto) {
		return vReportingCandidatDao.rechercherReportingCandidatNbr(reportingCandidatDto);

	}
}
