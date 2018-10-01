package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IV_ReportingCandidatDao;
import com.fr.adaming.jsfapp.dto.V_ReportingCandidatDto;
import com.fr.adaming.jsfapp.model.V_ReportingCandidat;
import com.fr.adaming.jsfapp.services.IV_ReportingCandidatService;

@Service("v_ReportingCandidatService")
public class V_ReportingCandidatService extends ManagerService<V_ReportingCandidat, Long> implements IV_ReportingCandidatService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8250035448282687024L;

	@Autowired()
	@Qualifier("v_ReportingCandidatDao")
	private IV_ReportingCandidatDao v_ReportingCandidatDao;

	@Override
	public List<V_ReportingCandidat> rechercherReportingCandidat(V_ReportingCandidatDto v_ReportingCandidatDto, int page,
			int size) {
		return v_ReportingCandidatDao.rechercherReportingCandidat(v_ReportingCandidatDto, page, size);
	}

	@Override
	public IManagerDao<V_ReportingCandidat, Long> getDao() {
		return v_ReportingCandidatDao;
	}
}
