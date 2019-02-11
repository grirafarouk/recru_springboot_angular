package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IvListeCandidatsDao;
import com.fr.adaming.jsfapp.dto.VListeCandidatsDto;
import com.fr.adaming.jsfapp.model.VListeCandidats;
import com.fr.adaming.jsfapp.services.IvListeCandidatsService;

@Service("v_ListeCandidatsService")
public class VListeCandidatsService extends ManagerService<VListeCandidats, Long>
		implements IvListeCandidatsService {


	/**
	 * 
	 */
	private static final long serialVersionUID = -8566902713418659936L;

	@Autowired()
	@Qualifier("v_ListeCandidatsDao")
	private IvListeCandidatsDao vListeCandidatsDao;

	public List<VListeCandidats> rechercherVlisteCandidatsARelancer(VListeCandidatsDto vListeCandidatsDto, int page,
			int size) {
		return vListeCandidatsDao.rechercherVlisteCandidatsARelancer(vListeCandidatsDto, page, size);
	}
	
	@Override
	public List<VListeCandidats> rechercherVlisteCandidats(VListeCandidatsDto vListeCandidatsDto, int page,
			int size) {
		return vListeCandidatsDao.rechercherVlisteCandidats(vListeCandidatsDto, page, size);
	}

	@Override
	public List<VListeCandidats> rechercherVlisteNouveauxCandidats(VListeCandidatsDto vListeCandidatsDto, int page,
			int size) {
		return vListeCandidatsDao.rechercherVlisteNouveauxCandidats(vListeCandidatsDto, page, size);
	}
	
	@Override
	public List<VListeCandidats> rechercherNouveauxCandidats(VListeCandidatsDto vListeCandidatsDto) {
		return vListeCandidatsDao.rechercherNouveauxCandidats(vListeCandidatsDto);
	}
	
	@Override
	public List<VListeCandidats> rechercherCandidatAvecEntretien(VListeCandidatsDto vListeCandidatsDto, int page,
			int size,Boolean all) {
		return vListeCandidatsDao.rechercherCandidatAvecEntretien(vListeCandidatsDto,page,size, all);
	}
	
	@Override
	public IManagerDao<VListeCandidats, Long> getDao() {
		return vListeCandidatsDao;
	}

	@Override
	public Integer rechercherVlisteCandidatsNbr(VListeCandidatsDto vListeCandidatsDto) {
		return  vListeCandidatsDao.rechercherVlisteCandidatsNbr(vListeCandidatsDto);
	}

	@Override
	public Integer rechercherVlisteNouveauxCandidatsNbr(VListeCandidatsDto vListeCandidatsDto) {
		return vListeCandidatsDao.rechercherVlisteNouveauxCandidatsNbr(vListeCandidatsDto);
	}

	@Override
	public Integer rechercherVlisteCandidatsARelancerNbr(VListeCandidatsDto NCD) {
		return vListeCandidatsDao.rechercherVlisteCandidatsARelancerNbr(NCD);
	}

	@Override
	public Integer rechercherCandidatAvecEntretienNbr(VListeCandidatsDto vListeCandidatsDto, Boolean all) {
		return vListeCandidatsDao.rechercherCandidatAvecEntretienNbr(vListeCandidatsDto, all);
	}

	

}
