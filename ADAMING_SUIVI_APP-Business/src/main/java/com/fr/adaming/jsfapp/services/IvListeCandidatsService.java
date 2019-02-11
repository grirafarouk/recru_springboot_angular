package com.fr.adaming.jsfapp.services;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import com.fr.adaming.jsfapp.dto.VListeCandidatsDto;
import com.fr.adaming.jsfapp.model.VListeCandidats;

public interface IvListeCandidatsService extends IManagerService<VListeCandidats, Long> {

	public Integer rechercherCandidatAvecEntretienNbr(VListeCandidatsDto vListeCandidatsDto, Boolean all);

	public Integer rechercherVlisteCandidatsARelancerNbr(@RequestBody VListeCandidatsDto NCD);
	
	public List<VListeCandidats> rechercherCandidatAvecEntretien(VListeCandidatsDto vListeCandidatsDto, int page, int size,
			Boolean all);


	public List<VListeCandidats> rechercherVlisteCandidatsARelancer(VListeCandidatsDto vListeCandidatsDto, int page,
			int size);
	
	List<VListeCandidats> rechercherNouveauxCandidats(VListeCandidatsDto vListeCandidatsDto);


	public List<VListeCandidats> rechercherVlisteCandidats(VListeCandidatsDto vListeCandidatsDto, int page, int size);

	public Integer rechercherVlisteCandidatsNbr(VListeCandidatsDto vListeCandidatsDto);
	
	public List<VListeCandidats> rechercherVlisteNouveauxCandidats(VListeCandidatsDto vListeCandidatsDto, int page,
			int size);
	
	public Integer rechercherVlisteNouveauxCandidatsNbr(VListeCandidatsDto vListeCandidatsDto);

}
