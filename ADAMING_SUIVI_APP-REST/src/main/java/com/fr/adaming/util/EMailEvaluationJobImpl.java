package com.fr.adaming.util;


import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.fr.adaming.jsfapp.model.Candidat;
import com.fr.adaming.jsfapp.model.Utilisateur;
import com.fr.adaming.jsfapp.services.ICandidatService;
import com.fr.adaming.jsfapp.services.IUtilisateurService;


@Component("eMailEvaluationJob")
public class EMailEvaluationJobImpl {

	@Autowired
	@Qualifier("candidatService")
	private ICandidatService candidatService;

	@Autowired
	@Qualifier("utilisateurService")
	private IUtilisateurService utilisateurService;

	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

	private static final String NEW_LINE = "\n";
	private static final String HTML_SNNIPET_1 = "<!DOCTYPE html><html><head><style>table {border-collapse: collapse;}table, td, th {border: 1px solid black;}</style><title>";
	private static final String HTML_SNNIPET_2 = "</title></head><body><table>";
	private static final String HTML_SNNIPET_3 = "</table></body></html>";
	private static final String HTML_TR_S = "<tr>";
	private static final String HTML_TR_E = "</tr>";
	private static final String HTML_TD_S = "<td>";
	private static final String HTML_TD_E = "</td>";
	/**
	 * class logger
	 */
	private Logger logger = LoggerFactory
			.getLogger(EMailEvaluationJobImpl.class);

	public void doBusiness() {
		logger.info("Email reporting started...");
		IEMailApi eMailApi = new JavaMailApi();
		// creation de la liste des destinataires
		List<String> destinataires = new ArrayList<String>();
		List<Candidat> candidatsEnAttentEvaluation = new ArrayList<>();
		candidatsEnAttentEvaluation = candidatService
				.rechercherCandidatEnAttenteEvaluation();
		List<Utilisateur> utilisateurs = utilisateurService.findAllUserCharge();
		for (Utilisateur utilisateur : utilisateurs) {
			destinataires.add(utilisateur.getEmail());
		}

		destinataires.add("moueslati@adaming.fr");
		
		// generer la flux de sortie de la piece jointe
		if (candidatsEnAttentEvaluation != null
				&& candidatsEnAttentEvaluation.size() >= 1) {
			String content = parse(candidatService
					.rechercherCandidatEnAttenteEvaluation());
			List<PieceJointe> pjList = new ArrayList<PieceJointe>();

			// creation de la piece jointe
			// message du mail
			// objet du mail
			String objet = "Candidats en attente d'evaluation";
			eMailApi.envoyerMail(objet, content, destinataires, "","","", pjList);
			logger.info("Email reporting finished.");
		}
	}

	private String parse(List<Candidat> candidats) {
		StringBuilder builder = new StringBuilder();
		builder.append(HTML_SNNIPET_1);
		builder.append(HTML_SNNIPET_2);

		builder.append(NEW_LINE);
		builder.append(HTML_TR_S);

		builder.append(HTML_TD_S);
		builder.append("Nom candidat");
		builder.append(HTML_TD_E);

		builder.append(HTML_TR_E);

		for (Candidat candidat : candidats) {

			builder.append(NEW_LINE);
			builder.append(HTML_TR_S);

			builder.append(HTML_TD_S);
			builder.append(candidat.getNom() + " " + candidat.getPrenom());
			builder.append(HTML_TD_E);

			builder.append(HTML_TR_E);

		}
		builder.append(NEW_LINE);
		builder.append(HTML_SNNIPET_3);
		return builder.toString();
	}

}