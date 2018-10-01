package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.CompetenceDto;
import com.fr.adaming.jsfapp.model.Competence;

@Mapper(uses = { Competence.class })
public interface CompetenceMapper {
	
	List<CompetenceDto> competencesToCompetenceDtos(List<Competence> competence);
	
	List<Competence> competencesDtosToCompetences(List<CompetenceDto> competence);
	
	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle")})

CompetenceDto competenceToCompetenceDto(Competence competence);
	
	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle")})
	
	Competence competenceDtoToCandidat(CompetenceDto competenceDto);
}
