package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.UtilisateurDto;
import com.fr.adaming.jsfapp.model.Utilisateur;

@Mapper
public interface UtilisateurMapper {

	List<UtilisateurDto> utilisateursToUtilisateurDtos(List<Utilisateur> utilisateur);

	List<Utilisateur> utilisateursDtoToUtilisateurs(List<UtilisateurDto> utilisateurDto);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "nom", target = "nom"),
			@Mapping(source = "prenom", target = "prenom"), @Mapping(source = "profil", target = "profil"),
			@Mapping(source = "login", target = "login"), @Mapping(source = "email", target = "email"),
			@Mapping(source = "password", target = "password"),
			@Mapping(source = "dateCreation", target = "dateCreation"), @Mapping(source = "actif", target = "actif"),
			@Mapping(source = "token", target = "token"), @Mapping(source = "expire", target = "expire"),
			@Mapping(source = "reporting", target = "reporting"), 
			@Mapping(source = "numeroTelF", target = "numeroTelF"), @Mapping(source = "numeroTelP", target = "numeroTelP") })
	UtilisateurDto utilisateurToUtilisateurDto(Utilisateur utilisateur);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "nom", target = "nom"),
			@Mapping(source = "prenom", target = "prenom"), @Mapping(source = "profil", target = "profil"),
			@Mapping(source = "login", target = "login"), @Mapping(source = "email", target = "email"),
			@Mapping(source = "password", target = "password"),
			@Mapping(source = "dateCreation", target = "dateCreation"), @Mapping(source = "actif", target = "actif"),
			@Mapping(source = "token", target = "token"), @Mapping(source = "expire", target = "expire"),
			@Mapping(source = "reporting", target = "reporting"), 
			@Mapping(source = "numeroTelF", target = "numeroTelF"), @Mapping(source = "numeroTelP", target = "numeroTelP")  })
	Utilisateur utilisateurDtoToUtilisateur(UtilisateurDto utilisateurDto);

}
