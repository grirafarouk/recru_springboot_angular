package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.CiviliteDto;
import com.fr.adaming.jsfapp.model.Civilite;

@Mapper(uses = { Civilite.class })
public interface CiviliteMapper {
	List<CiviliteDto> civilitesToCiviliteDtos(List<Civilite> civilites);

	List<Civilite> civiliteDtosToCivilites(List<CiviliteDto> civiliteDtos);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	CiviliteDto civiliteToCiviliteDto(Civilite civilite);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	Civilite civiliteDtoToCivilite(CiviliteDto civiliteDto);
}
