package com.fr.adaming.jsfapp.services;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import com.fr.adaming.jsfapp.dto.VListeCandidatsDto;
import com.fr.adaming.jsfapp.model.VListeCandidats;

public interface IV_ListeCandidatsService extends IManagerService<VListeCandidats, Long> {

	public Integer rechercherCandidatAvecEntretienNbr(VListeCandidatsDto vListeCandidatsDto, Boolean all);

	public Integer rechercherV_ListeCandidatsARelancerNbr(@RequestBody VListeCandidatsDto NCD);
	
	public List<VListeCandidats> rechercherCandidatAvecEntretien(VListeCandidatsDto v_ListeCandidatsDto, int page, int size,
			Boolean all);


	public List<VListeCandidats> rechercherV_ListeCandidatsARelancer(VListeCandidatsDto v_ListeCandidatsDto, int page,
			int size);
	
	List<VListeCandidats> rechercherNouveauxCandidats(VListeCandidatsDto v_ListeCandidatsDto);


	public List<VListeCandidats> rechercherV_ListeCandidats(VListeCandidatsDto v_ListeCandidatsDto, int page, int size);

	public Integer rechercherV_ListeCandidatsNbr(VListeCandidatsDto v_ListeCandidatsDto);
	
	public List<VListeCandidats> rechercherV_ListeNouveauxCandidats(VListeCandidatsDto v_ListeCandidatsDto, int page,
			int size);
	
	public Integer rechercherV_ListeNouveauxCandidatsNbr(VListeCandidatsDto v_ListeCandidatsDto);

}
