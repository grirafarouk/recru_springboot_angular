package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IvReportingCandidatDao;
import com.fr.adaming.jsfapp.dto.V_ReportingCandidatDto;
import com.fr.adaming.jsfapp.model.VReportingCandidat;
import com.fr.adaming.jsfapp.services.IvReportingCandidatService;

@Service("v_ReportingCandidatService")
public class V_ReportingCandidatService extends ManagerService<VReportingCandidat, Long> implements IvReportingCandidatService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8250035448282687024L;

	@Autowired()
	@Qualifier("v_ReportingCandidatDao")
	private IvReportingCandidatDao v_ReportingCandidatDao;

	@Override
	public List<VReportingCandidat> rechercherReportingCandidat(V_ReportingCandidatDto v_ReportingCandidatDto, int page,
			int size) {
		return v_ReportingCandidatDao.rechercherReportingCandidat(v_ReportingCandidatDto, page, size);
	}

	@Override
	public IManagerDao<VReportingCandidat, Long> getDao() {
		return v_ReportingCandidatDao;
	}

	@Override
	public Integer rechercherReportingCandidatNbr(V_ReportingCandidatDto ReportingCandidatDto) {
		return v_ReportingCandidatDao.rechercherReportingCandidatNbr(ReportingCandidatDto);
	}
}
