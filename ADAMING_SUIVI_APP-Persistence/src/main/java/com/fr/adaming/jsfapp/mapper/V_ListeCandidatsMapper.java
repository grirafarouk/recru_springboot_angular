package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.V_ListeCandidatsDto;
import com.fr.adaming.jsfapp.model.V_ListeCandidats;

@Mapper(uses = { V_ListeCandidats.class })
public interface V_ListeCandidatsMapper {

	List<V_ListeCandidatsDto> v_ListeCandidatsToV_ListeCandidatsDtos(List<V_ListeCandidats> v_ListeCandidats);

	List<V_ListeCandidats> v_ListeCandidatsDtoToV_ListeCandidats(List<V_ListeCandidatsDto> v_ListeCandidatsDto);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "nom", target = "nom"),
			@Mapping(source = "prenom", target = "prenom"), @Mapping(source = "numeroTel", target = "numeroTel"),
			@Mapping(source = "email", target = "email"), @Mapping(source = "mobilite", target = "mobilite"),
			@Mapping(source = "mobiliteLille", target = "mobiliteLille"),
			@Mapping(source = "poleEmploi", target = "poleEmploi"),
			@Mapping(source = "cvSource", target = "cvSource"),
			@Mapping(source = "noteTotale", target = "noteTotale"),
			@Mapping(source = "dateInscription", target = "dateInscription"),
			@Mapping(source = "statut", target = "statut"), @Mapping(source = "technologie", target = "technologie"),
			@Mapping(source = "region", target = "region"), @Mapping(source = "nomSourceur", target = "nomSourceur"),
			@Mapping(source = "prenomSourceur", target = "prenomSourceur"),
			@Mapping(source = "disponibilite", target = "disponibilite"),
			@Mapping(source = "relancer", target = "relancer"),
			@Mapping(source = "dateRelance", target = "dateRelance"),
			@Mapping(source = "dateEntretien", target = "dateEntretien"),
			@Mapping(source = "lieuEntretien", target = "lieuEntretien"),
			@Mapping(source = "confirmationRdv", target = "confirmationRdv"),
			@Mapping(source = "nomCharge", target = "nomCharge"),
			@Mapping(source = "prenomCharge", target = "prenomCharge"),
			@Mapping(source = "commentaire", target = "commentaire") })
	V_ListeCandidatsDto v_ListeCandidatsToV_ListeCandidatsDto(V_ListeCandidats v_ListeCandidats);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "nom", target = "nom"),
			@Mapping(source = "prenom", target = "prenom"), @Mapping(source = "numeroTel", target = "numeroTel"),
			@Mapping(source = "email", target = "email"), @Mapping(source = "mobilite", target = "mobilite"),
			@Mapping(source = "mobiliteLille", target = "mobiliteLille"),
			@Mapping(source = "poleEmploi", target = "poleEmploi"),
			@Mapping(source = "cvSource", target = "cvSource"),
			@Mapping(source = "noteTotale", target = "noteTotale"),
			@Mapping(source = "dateInscription", target = "dateInscription"),
			@Mapping(source = "statut", target = "statut"), @Mapping(source = "technologie", target = "technologie"),
			@Mapping(source = "region", target = "region"), @Mapping(source = "nomSourceur", target = "nomSourceur"),
			@Mapping(source = "prenomSourceur", target = "prenomSourceur"),
			@Mapping(source = "disponibilite", target = "disponibilite"),
			@Mapping(source = "relancer", target = "relancer"),
			@Mapping(source = "dateRelance", target = "dateRelance"),
			@Mapping(source = "dateEntretien", target = "dateEntretien"),
			@Mapping(source = "lieuEntretien", target = "lieuEntretien"),
			@Mapping(source = "confirmationRdv", target = "confirmationRdv"),
			@Mapping(source = "nomCharge", target = "nomCharge"),
			@Mapping(source = "prenomCharge", target = "prenomCharge"),
			@Mapping(source = "commentaire", target = "commentaire") })
	V_ListeCandidats V_ListeCandidatsDtoToV_ListeCandidats(V_ListeCandidatsDto v_ListeCandidatsDto);
}
