package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.StatutDto;
import com.fr.adaming.jsfapp.model.Statut;

@Mapper(uses = { Statut.class })
public interface StatutMapper {
	List<StatutDto> StatusToStatusDtos(List<Statut> status);

	List<Statut> StatusDtosToStatus(List<StatutDto> StatusDtos);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	StatutDto StatusToStatusDto(Statut status);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	Statut StatusDtoToStatus(StatutDto StatusDto);

}
