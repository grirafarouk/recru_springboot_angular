package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.SuiviDto;
import com.fr.adaming.jsfapp.model.Suivi;

@Mapper(uses = UtilisateurMapper.class)
public interface SuiviMapper {

	List<SuiviDto> suivisToSuiviDtos(List<Suivi> suivi);

	List<Suivi> suiviDtosToSuivis(List<SuiviDto> suivi);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "charge", target = "charge"),
			@Mapping(source = "mobilite", target = "mobilite"), @Mapping(source = "relance", target = "relance"),
			@Mapping(source = "dateRelance", target = "dateRelance"),
			@Mapping(source = "notePresentation", target = "notePresentation"),
			@Mapping(source = "noteSavoir", target = "noteSavoir"),
			@Mapping(source = "noteFiabilite", target = "noteFiabilite"),
			@Mapping(source = "noteAttrait", target = "noteAttrait"),
			@Mapping(source = "notePret", target = "notePret"),
			@Mapping(source = "noteMobilite", target = "noteMobilite"),
			@Mapping(source = "noteResultat", target = "noteResultat"),
			@Mapping(source = "noteCoherence", target = "noteCoherence"),
			@Mapping(source = "notePistes", target = "notePistes"),
			@Mapping(source = "commentaire", target = "commentaire"),
			@Mapping(source = "anglais", target = "anglais"),
			@Mapping(source = "regions", target = "regions") })
	SuiviDto suiviToSuiviDto(Suivi suivi);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "charge", target = "charge"),
			@Mapping(source = "mobilite", target = "mobilite"), @Mapping(source = "relance", target = "relance"),
			@Mapping(source = "dateRelance", target = "dateRelance"),
			@Mapping(source = "notePresentation", target = "notePresentation"),
			@Mapping(source = "noteSavoir", target = "noteSavoir"),
			@Mapping(source = "noteFiabilite", target = "noteFiabilite"),
			@Mapping(source = "noteAttrait", target = "noteAttrait"),
			@Mapping(source = "notePret", target = "notePret"),
			@Mapping(source = "noteMobilite", target = "noteMobilite"),
			@Mapping(source = "noteResultat", target = "noteResultat"),
			@Mapping(source = "noteCoherence", target = "noteCoherence"),
			@Mapping(source = "notePistes", target = "notePistes"),
			@Mapping(source = "commentaire", target = "commentaire"),
			@Mapping(source = "anglais", target = "anglais"),
			@Mapping(source = "regions", target = "regions") })
	Suivi suiviDtoToSuivi(SuiviDto suiviDto);

}