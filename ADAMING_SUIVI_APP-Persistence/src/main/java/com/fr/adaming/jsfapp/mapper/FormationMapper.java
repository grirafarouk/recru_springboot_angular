package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.FormationDto;
import com.fr.adaming.jsfapp.model.Formation;

@Mapper
public interface FormationMapper {
	
	List<FormationDto> formationsToFormationDtos(
			List<Formation> formation);

	List<Formation> formationDtosToFormations(
			List<FormationDto> formation);

	@Mappings({ @Mapping(source = "id", target = "id"),
			@Mapping(source = "nom", target = "nom"),
			@Mapping(source = "code", target = "code"),
			@Mapping(source = "lieu", target = "lieu"),
			@Mapping(source = "typeFormation", target = "typeFormation"),
			@Mapping(source = "technologie", target = "technologie")
	})
	FormationDto formationToFormationDto(
			Formation formation);

	@Mappings({ @Mapping(source = "id", target = "id"),
			@Mapping(source = "nom", target = "nom"),
			@Mapping(source = "code", target = "code"),
			@Mapping(source = "lieu", target = "lieu"),
			@Mapping(source = "typeFormation", target = "typeFormation"),
			@Mapping(source = "technologie", target = "technologie")
	})
	Formation formationDtoToFormation(
			FormationDto formationDto);

}