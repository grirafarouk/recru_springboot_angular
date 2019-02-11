package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.TypeFormationDto;
import com.fr.adaming.jsfapp.model.TypeFormation;

@Mapper(uses = { TypeFormation.class })
public interface TypeFormationMapper {
	List<TypeFormationDto> typeFormationsToTypeFormationDtos(List<TypeFormation> typeFormations);

	List<TypeFormation> typeFormationDtosToTypeFormations(List<TypeFormationDto> typeFormationDtos);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	TypeFormationDto typeFormationToTypeFormationDto(TypeFormation typeFormation);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	TypeFormation typeFormationDtoToTypeFormation(TypeFormationDto typeFormationDto);
}
