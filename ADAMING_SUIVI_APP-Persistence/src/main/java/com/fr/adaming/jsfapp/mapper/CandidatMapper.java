package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.CandidatDto;
import com.fr.adaming.jsfapp.model.Candidat;

@Mapper(uses = { UtilisateurMapper.class, EntretienMapper.class,
		SuiviMapper.class, SessionFormationMapper.class })
public interface CandidatMapper {

	List<CandidatDto> candidatsToCandidatDtos(List<Candidat> candidat);
    
	List<Candidat> candidatDtosToCandidats(List<CandidatDto> candidat);

	@Mappings({
			@Mapping(source = "id", target = "id"),
			@Mapping(source = "nom", target = "nom"),
			@Mapping(source = "prenom", target = "prenom"),
			@Mapping(source = "email", target = "email"),
			@Mapping(source = "numeroTel", target = "numeroTel"),
			@Mapping(source = "adresse", target = "adresse"),
			@Mapping(source = "lieuNaissance", target = "lieuNaissance"),
			@Mapping(source = "dateInscription", target = "dateInscription"),
			@Mapping(source = "dateNaissance", target = "dateNaissance"),
			@Mapping(source = "creePar", target = "creePar"),
			@Mapping(source = "technologie", target = "technologie"),
			@Mapping(source = "civilite", target = "civilite"),
			@Mapping(source = "idCv", target = "idCv"),
			@Mapping(source = "codePostal", target = "codePostal"),
			@Mapping(source = "origine", target = "origine"),
			@Mapping(source = "motif", target = "motif"),
			@Mapping(source = "candidatCompetence", target = "candidatCompetence"),
			@Mapping(source = "entretien", target = "entretien"),
			@Mapping(source = "suivi", target = "suivi"),
			@Mapping(source = "sessionFormation", target = "sessionFormation"),
			@Mapping(source = "statut", target = "statut"),
			@Mapping(source = "posteEnCours", target = "posteEnCours"),
			@Mapping(source = "mobiliteSrc", target = "mobiliteSrc"),
			@Mapping(source = "mobiliteLille", target = "mobiliteLille"),
			@Mapping(source = "cvSource", target = "cvSource"),
			@Mapping(source = "docRefus", target = "docRefus"),
			@Mapping(source = "docConsult", target = "docConsult"),
			@Mapping(source = "cvAnonyme", target = "cvAnonyme"),
			@Mapping(source = "age", target = "age"),
			@Mapping(source = "nomCV", target = "nomCV"),
			@Mapping(source = "diplome", target = "diplome"),
			@Mapping(source = "dateObtentionDiplome", target = "dateObtentionDiplome"),
			@Mapping(source = "emailSessionEnvoyer", target = "emailSessionEnvoyer"),
			@Mapping(source = "emailSourceurEnvoyer", target = "emailSourceurEnvoyer"),
			@Mapping(source = "emailCandidatEnvoyer", target = "emailCandidatEnvoyer") })
	CandidatDto candidatToCandidatDto(Candidat candidat);
	
	@Mappings({
			@Mapping(source = "id", target = "id"),
			@Mapping(source = "nom", target = "nom"),
			@Mapping(source = "prenom", target = "prenom"),
			@Mapping(source = "email", target = "email"),
			@Mapping(source = "numeroTel", target = "numeroTel"),
			@Mapping(source = "adresse", target = "adresse"),
			@Mapping(source = "lieuNaissance", target = "lieuNaissance"),
			@Mapping(source = "dateInscription", target = "dateInscription"),
			@Mapping(source = "dateNaissance", target = "dateNaissance"),
			@Mapping(source = "creePar", target = "creePar"),
			@Mapping(source = "technologie", target = "technologie"),
			@Mapping(source = "civilite", target = "civilite"),
			@Mapping(source = "idCv", target = "idCv"),
			@Mapping(source = "codePostal", target = "codePostal"),
			@Mapping(source = "origine", target = "origine"),
			@Mapping(source = "motif", target = "motif"),
			@Mapping(source = "candidatCompetence", target = "candidatCompetence"),
			@Mapping(source = "entretien", target = "entretien"),
			@Mapping(source = "suivi", target = "suivi"),
			@Mapping(source = "sessionFormation", target = "sessionFormation"),
			@Mapping(source = "statut", target = "statut"),
			@Mapping(source = "posteEnCours", target = "posteEnCours"),
			@Mapping(source = "mobiliteSrc", target = "mobiliteSrc"),
			@Mapping(source = "mobiliteLille", target = "mobiliteLille"),
			@Mapping(source = "cvSource", target = "cvSource"),
			@Mapping(source = "docRefus", target = "docRefus"),
			@Mapping(source = "docConsult", target = "docConsult"),
			@Mapping(source = "cvAnonyme", target = "cvAnonyme"),
			@Mapping(source = "age", target = "age"),
			@Mapping(source = "nomCV", target = "nomCV"),
			@Mapping(source = "diplome", target = "diplome"),
			@Mapping(source = "dateObtentionDiplome", target = "dateObtentionDiplome"),
			@Mapping(source = "emailSessionEnvoyer", target = "emailSessionEnvoyer"),
			@Mapping(source = "emailSourceurEnvoyer", target = "emailSourceurEnvoyer"),
			@Mapping(source = "emailCandidatEnvoyer", target = "emailCandidatEnvoyer") })
	Candidat candidatDtoToCandidat(CandidatDto candidatDto);

}