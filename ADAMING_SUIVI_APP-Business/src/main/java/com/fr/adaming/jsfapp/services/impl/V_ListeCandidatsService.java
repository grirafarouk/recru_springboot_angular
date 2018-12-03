package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IV_ListeCandidatsDao;
import com.fr.adaming.jsfapp.dto.V_ListeCandidatsDto;
import com.fr.adaming.jsfapp.model.V_ListeCandidats;
import com.fr.adaming.jsfapp.services.IV_ListeCandidatsService;

@Service("v_ListeCandidatsService")
public class V_ListeCandidatsService extends ManagerService<V_ListeCandidats, Long>
		implements IV_ListeCandidatsService {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8566902713418659936L;

	@Autowired()
	@Qualifier("v_ListeCandidatsDao")
	private IV_ListeCandidatsDao v_ListeCandidatsDao;

	public List<V_ListeCandidats> rechercherV_ListeCandidatsARelancer(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size) {
		return v_ListeCandidatsDao.rechercherV_ListeCandidatsARelancer(v_ListeCandidatsDto, page, size);
	}
	
	@Override
	public List<V_ListeCandidats> rechercherV_ListeCandidats(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size) {
		return v_ListeCandidatsDao.rechercherV_ListeCandidats(v_ListeCandidatsDto, page, size);
	}

	@Override
	public List<V_ListeCandidats> rechercherV_ListeNouveauxCandidats(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size) {
		return v_ListeCandidatsDao.rechercherV_ListeNouveauxCandidats(v_ListeCandidatsDto, page, size);
	}
	
	@Override
	public List<V_ListeCandidats> rechercherCandidatAvecEntretien(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size,Boolean all) {
		return v_ListeCandidatsDao.rechercherCandidatAvecEntretien(v_ListeCandidatsDto,page,size, all);
	}
	
	@Override
	public IManagerDao<V_ListeCandidats, Long> getDao() {
		return v_ListeCandidatsDao;
	}

	@Override
	public Integer rechercherV_ListeCandidatsNbr(V_ListeCandidatsDto v_ListeCandidatsDto) {
		return  v_ListeCandidatsDao.rechercherV_ListeCandidatsNbr(v_ListeCandidatsDto);
	}

	@Override
	public Integer rechercherV_ListeNouveauxCandidatsNbr(V_ListeCandidatsDto v_ListeCandidatsDto) {
		return v_ListeCandidatsDao.rechercherV_ListeNouveauxCandidatsNbr(v_ListeCandidatsDto);
	}

	@Override
	public Integer rechercherV_ListeCandidatsARelancerNbr(V_ListeCandidatsDto NCD) {
		return v_ListeCandidatsDao.rechercherV_ListeCandidatsARelancerNbr(NCD);
	}

	@Override
	public Integer rechercherCandidatAvecEntretienNbr(V_ListeCandidatsDto v_ListeCandidatsDto, Boolean all) {
		return v_ListeCandidatsDao.rechercherCandidatAvecEntretienNbr(v_ListeCandidatsDto, all);
	}

	

}
