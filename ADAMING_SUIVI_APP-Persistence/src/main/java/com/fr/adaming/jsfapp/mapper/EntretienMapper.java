package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.EntretienDto;
import com.fr.adaming.jsfapp.model.Entretien;

@Mapper(uses = UtilisateurMapper.class)
public interface EntretienMapper {

	List<EntretienDto> entretiensToEntretienDtos(List<Entretien> entretien);

	List<Entretien> entretienDtosToEntretiens(List<EntretienDto> entretien);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "charge", target = "charge"),
			@Mapping(source = "disponible", target = "disponible"), @Mapping(source = "date", target = "date"),
			@Mapping(source = "lieu", target = "lieu"), @Mapping(source = "relance", target = "relance"),
			@Mapping(source = "confirmation", target = "confirmation"),
			@Mapping(source = "directEmploi", target = "directEmploi"),
			@Mapping(source = "commentaire", target = "commentaire"),
			@Mapping(source = "pertinence", target = "pertinence"),
			@Mapping(source = "mobilteCharge", target = "mobilteCharge"),
			@Mapping(source = "mobilteTouFrance", target = "mobilteTouFrance"),
			@Mapping(source = "dateRelance", target = "dateRelance") })
	EntretienDto entretienToEntretienDto(Entretien entretien);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "charge", target = "charge"),
			@Mapping(source = "disponible", target = "disponible"), @Mapping(source = "date", target = "date"),
			@Mapping(source = "lieu", target = "lieu"), @Mapping(source = "relance", target = "relance"),
			@Mapping(source = "confirmation", target = "confirmation"),
			@Mapping(source = "directEmploi", target = "directEmploi"),
			@Mapping(source = "commentaire", target = "commentaire"),
			@Mapping(source = "pertinence", target = "pertinence"),
			@Mapping(source = "mobilteCharge", target = "mobilteCharge"),
			@Mapping(source = "mobilteTouFrance", target = "mobilteTouFrance"),
			@Mapping(source = "dateRelance", target = "dateRelance") })
	Entretien entretienDtoToEntretien(EntretienDto entretienDto);

}