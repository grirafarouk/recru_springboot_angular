package com.fr.adaming.jsfapp.dao;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import com.fr.adaming.jsfapp.dto.VListeCandidatsDto;
import com.fr.adaming.jsfapp.model.VListeCandidats;

public interface IvListeCandidatsDao extends IManagerDao<VListeCandidats, Long> {

	public List<VListeCandidats> rechercherCandidatAvecEntretien(VListeCandidatsDto vListeCandidatsDto, int page, int size,
			Boolean all);

	public Integer rechercherCandidatAvecEntretienNbr(VListeCandidatsDto vListeCandidatsDto, Boolean all);
	
	public List<VListeCandidats> rechercherVlisteCandidatsARelancer(VListeCandidatsDto vListeCandidatsDto, int page,
			int size);

	public Integer rechercherVlisteCandidatsARelancerNbr(@RequestBody VListeCandidatsDto NCD);

	public List<VListeCandidats> rechercherVlisteCandidats(VListeCandidatsDto vListeCandidatsDto, int page, int size);

	public Integer rechercherVlisteCandidatsNbr(VListeCandidatsDto vListeCandidatsDto);

	public List<VListeCandidats> rechercherVlisteNouveauxCandidats(VListeCandidatsDto vListeCandidatsDto, int page,
			int size);
	List<VListeCandidats> rechercherNouveauxCandidats(VListeCandidatsDto vListeCandidatsDto);

	public Integer rechercherVlisteNouveauxCandidatsNbr(VListeCandidatsDto vListeCandidatsDto);

}
