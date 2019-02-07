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
public class V_ListeCandidatsService extends ManagerService<VListeCandidats, Long>
		implements IvListeCandidatsService {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8566902713418659936L;

	@Autowired()
	@Qualifier("v_ListeCandidatsDao")
	private IvListeCandidatsDao v_ListeCandidatsDao;

	public List<VListeCandidats> rechercherVlisteCandidatsARelancer(VListeCandidatsDto v_ListeCandidatsDto, int page,
			int size) {
		return v_ListeCandidatsDao.rechercherVlisteCandidatsARelancer(v_ListeCandidatsDto, page, size);
	}
	
	@Override
	public List<VListeCandidats> rechercherVlisteCandidats(VListeCandidatsDto v_ListeCandidatsDto, int page,
			int size) {
		return v_ListeCandidatsDao.rechercherVlisteCandidats(v_ListeCandidatsDto, page, size);
	}

	@Override
	public List<VListeCandidats> rechercherVlisteNouveauxCandidats(VListeCandidatsDto v_ListeCandidatsDto, int page,
			int size) {
		return v_ListeCandidatsDao.rechercherVlisteNouveauxCandidats(v_ListeCandidatsDto, page, size);
	}
	
	@Override
	public List<VListeCandidats> rechercherNouveauxCandidats(VListeCandidatsDto v_ListeCandidatsDto) {
		return v_ListeCandidatsDao.rechercherNouveauxCandidats(v_ListeCandidatsDto);
	}
	
	@Override
	public List<VListeCandidats> rechercherCandidatAvecEntretien(VListeCandidatsDto v_ListeCandidatsDto, int page,
			int size,Boolean all) {
		return v_ListeCandidatsDao.rechercherCandidatAvecEntretien(v_ListeCandidatsDto,page,size, all);
	}
	
	@Override
	public IManagerDao<VListeCandidats, Long> getDao() {
		return v_ListeCandidatsDao;
	}

	@Override
	public Integer rechercherVlisteCandidatsNbr(VListeCandidatsDto v_ListeCandidatsDto) {
		return  v_ListeCandidatsDao.rechercherVlisteCandidatsNbr(v_ListeCandidatsDto);
	}

	@Override
	public Integer rechercherVlisteNouveauxCandidatsNbr(VListeCandidatsDto v_ListeCandidatsDto) {
		return v_ListeCandidatsDao.rechercherVlisteNouveauxCandidatsNbr(v_ListeCandidatsDto);
	}

	@Override
	public Integer rechercherVlisteCandidatsARelancerNbr(VListeCandidatsDto NCD) {
		return v_ListeCandidatsDao.rechercherVlisteCandidatsARelancerNbr(NCD);
	}

	@Override
	public Integer rechercherCandidatAvecEntretienNbr(VListeCandidatsDto v_ListeCandidatsDto, Boolean all) {
		return v_ListeCandidatsDao.rechercherCandidatAvecEntretienNbr(v_ListeCandidatsDto, all);
	}

	

}
