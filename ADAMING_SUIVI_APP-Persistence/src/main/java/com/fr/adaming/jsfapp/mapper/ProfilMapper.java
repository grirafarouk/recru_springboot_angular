package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.UtilisateurDto;
import com.fr.adaming.jsfapp.model.Utilisateur;

@Mapper
public interface ProfilMapper {

	List<UtilisateurDto> utilisateursToUtilisateurDtos(List<Utilisateur> utilisateur);

	List<Utilisateur> utilisateursDtoToUtilisateurs(List<UtilisateurDto> utilisateurDto);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "nom", target = "nom"),
			@Mapping(source = "prenom", target = "prenom") })
	UtilisateurDto utilisateurToUtilisateurDto(Utilisateur utilisateur);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "nom", target = "nom"),
			@Mapping(source = "prenom", target = "prenom") })
	Utilisateur utilisateurDtoToUtilisateur(UtilisateurDto utilisateurDto);

}