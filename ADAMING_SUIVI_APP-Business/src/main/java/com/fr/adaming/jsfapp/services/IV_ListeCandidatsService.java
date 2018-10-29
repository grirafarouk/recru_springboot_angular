package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.dto.V_ListeCandidatsDto;
import com.fr.adaming.jsfapp.model.V_ListeCandidats;

public interface IV_ListeCandidatsService extends IManagerService<V_ListeCandidats, Long> {

	//List<V_ListeCandidats> rechercherV_ListeCandidats(V_ListeCandidatsDto V_ListeCandidatsDto);

	List<V_ListeCandidats> rechercherV_ListeNouveauxCandidats(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size);
	
	List<V_ListeCandidats> rechercherNouveauxCandidats(V_ListeCandidatsDto v_ListeCandidatsDto);

	List<V_ListeCandidats> rechercherV_ListeCandidatsARelancer(V_ListeCandidatsDto v_ListeCandidatsDto);

	List<V_ListeCandidats> rechercherCandidatAvecEntretien(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size, Boolean all);
    List<V_ListeCandidats> findCandidatAvecEntretien(V_ListeCandidatsDto v_ListeCandidatsDto, Boolean all);

	public List<V_ListeCandidats> rechercherV_ListeCandidatsARelancer(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size);
	
	public List<V_ListeCandidats> rechercherCandidatsARelancer(V_ListeCandidatsDto v_ListeCandidatsDto);

	Number nberCandidatsARelancer();

	List<V_ListeCandidats> rechercherV_ListeCandidats(V_ListeCandidatsDto v_ListeCandidatsDto, int page,
			int size);
	List<V_ListeCandidats> rechercherTousCandidats(V_ListeCandidatsDto v_ListeCandidatsDto);

	Number nberCandidats();
	
	Number nberNouveauxCandidats();
}
