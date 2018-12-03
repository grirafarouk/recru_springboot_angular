package com.fr.adaming.jsfapp.dao;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import com.fr.adaming.jsfapp.dto.V_ListeCandidatsDto;
import com.fr.adaming.jsfapp.model.V_ListeCandidats;

public interface IV_ListeCandidatsDao extends IManagerDao<V_ListeCandidats, Long> {

	public List<V_ListeCandidats> rechercherCandidatAvecEntretien(V_ListeCandidatsDto v_ListeCandidatsDto, int page, int size,
			Boolean all);

	public Integer rechercherCandidatAvecEntretienNbr(V_ListeCandidatsDto v_ListeCandidatsDto, Boolean all);
	
	public List<V_ListeCandidats> rechercherV_ListeCandidatsARelancer(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size);

	public Integer rechercherV_ListeCandidatsARelancerNbr(@RequestBody V_ListeCandidatsDto NCD);

	public List<V_ListeCandidats> rechercherV_ListeCandidats(V_ListeCandidatsDto v_ListeCandidatsDto, int page, int size);

	public Integer rechercherV_ListeCandidatsNbr(V_ListeCandidatsDto v_ListeCandidatsDto);

	public List<V_ListeCandidats> rechercherV_ListeNouveauxCandidats(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size);

	public Integer rechercherV_ListeNouveauxCandidatsNbr(V_ListeCandidatsDto v_ListeCandidatsDto);

}
