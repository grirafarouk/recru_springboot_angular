package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.V_ReportingCandidatDto;
import com.fr.adaming.jsfapp.model.V_ReportingCandidat;

@Mapper(uses = { V_ReportingCandidat.class })
public interface V_ReportingCandidatMapper {
	List<V_ReportingCandidatDto> reportingCandidatsToReportingCandidatDtos(
			List<V_ReportingCandidat> reportingCandidat);

	List<V_ReportingCandidat> reportingCandidatDtoToReportingCandidats(
			List<V_ReportingCandidatDto> reportingCandidatDto);

	@Mappings({
			@Mapping(source = "id", target = "id"),
			@Mapping(source = "nom", target = "nom"),
			@Mapping(source = "prenom", target = "prenom"),
			@Mapping(source = "email", target = "email"),
			@Mapping(source = "numeroTel", target = "numeroTel"),
			@Mapping(source = "dateInscription", target = "dateInscription"),
			@Mapping(source = "statut", target = "statut"),
			@Mapping(source = "mobiliteLille", target = "mobiliteLille"),
			@Mapping(source = "cvSource", target = "cvSource"),
			@Mapping(source = "nomSourceur", target = "nomSourceur"),
			@Mapping(source = "prenomSourceur", target = "prenomSourceur"),
			@Mapping(source = "nomCharge", target = "nomCharge"),
			@Mapping(source = "prenomCharge", target = "prenomCharge"),
			@Mapping(source = "lieuEntretien", target = "lieuEntretien"),
			@Mapping(source = "dateEntretien", target = "dateEntretien"),
			@Mapping(source = "noteTotale", target = "noteTotale"),
			@Mapping(source = "formation", target = "formation"),
			@Mapping(source = "dateDemarrageFormation", target = "dateDemarrageFormation"),
			@Mapping(source = "dateDebut", target = "dateDebut"),
			@Mapping(source = "dateFin", target = "dateFin"),
			@Mapping(source = "idCv", target = "idCv"),
			@Mapping(source = "technologie", target = "technologie"),
			@Mapping(source = "region", target = "region"),
			@Mapping(source = "origine", target = "origine"),
			@Mapping(source = "pertinence", target = "pertinence"),
			@Mapping(source = "disponible", target = "disponible"),
			@Mapping(source = "diplome", target = "diplome"),
			@Mapping(source = "dateObtentionDiplome", target = "dateObtentionDiplome")})
	V_ReportingCandidatDto reportingCandidatToReportingCandidatDto(
			V_ReportingCandidat reportingCandidat);

	@Mappings({
			@Mapping(source = "id", target = "id"),
			@Mapping(source = "nom", target = "nom"),
			@Mapping(source = "prenom", target = "prenom"),
			@Mapping(source = "email", target = "email"),
			@Mapping(source = "numeroTel", target = "numeroTel"),
			@Mapping(source = "dateInscription", target = "dateInscription"),
			@Mapping(source = "statut", target = "statut"),
			@Mapping(source = "mobiliteLille", target = "mobiliteLille"),
			@Mapping(source = "cvSource", target = "cvSource"),
			@Mapping(source = "nomSourceur", target = "nomSourceur"),
			@Mapping(source = "prenomSourceur", target = "prenomSourceur"),
			@Mapping(source = "nomCharge", target = "nomCharge"),
			@Mapping(source = "prenomCharge", target = "prenomCharge"),
			@Mapping(source = "lieuEntretien", target = "lieuEntretien"),
			@Mapping(source = "dateEntretien", target = "dateEntretien"),
			@Mapping(source = "noteTotale", target = "noteTotale"),
			@Mapping(source = "formation", target = "formation"),
			@Mapping(source = "dateDemarrageFormation", target = "dateDemarrageFormation"),
			@Mapping(source = "dateDebut", target = "dateDebut"),
			@Mapping(source = "dateFin", target = "dateFin"),
			@Mapping(source = "idCv", target = "idCv"),
			@Mapping(source = "technologie", target = "technologie"),
			@Mapping(source = "region", target = "region"),
			@Mapping(source = "origine", target = "origine"),
			@Mapping(source = "pertinence", target = "pertinence"),
			@Mapping(source = "disponible", target = "disponible"),
			@Mapping(source = "diplome", target = "diplome"),
			@Mapping(source = "dateObtentionDiplome", target = "dateObtentionDiplome")})
	V_ReportingCandidat reportingCandidatrDtoToUtilisateur(
			V_ReportingCandidatDto reportingCandidatDto);
}
