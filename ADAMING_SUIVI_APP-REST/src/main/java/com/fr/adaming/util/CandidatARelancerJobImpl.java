package com.fr.adaming.util;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.fr.adaming.jsfapp.dto.CandidatDto;
import com.fr.adaming.jsfapp.model.Candidat;
import com.fr.adaming.jsfapp.model.Utilisateur;
import com.fr.adaming.jsfapp.services.ICandidatService;
import com.fr.adaming.jsfapp.services.IUtilisateurService;


@Component("candidatARelancerJob")
public class CandidatARelancerJobImpl {

	@Autowired
	@Qualifier("utilisateurService")
	private IUtilisateurService utilisateurService;

	@Autowired(required = true)
	@Qualifier("candidatService")
	private ICandidatService candidatService;

	CandidatDto searchDto;
	List<Utilisateur> charges;

	DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
	/**
	 * class logger
	 */
	private Logger logger = LoggerFactory
			.getLogger(CandidatARelancerJobImpl.class);

	private static final String NEW_LINE = "\n";
	private static final String HTML_SNNIPET_1 = "<!DOCTYPE html><html><head><style>table, td, th {border: 1px solid black;}</style><title>";
	private static final String HTML_SNNIPET_2 = "</title></head><body>";
	private static final String HTML_SNNIPET_3 = "<table>";
	private static final String HTML_SNNIPET_4 = "</table>";
	private static final String HTML_SNNIPET_5 = "</body></html>";
	private static final String HTML_TH_S = "<th>";
	private static final String HTML_TH_E = "</th>";
	private static final String HTML_TR_S = "<tr>";
	private static final String HTML_TR_E = "</tr>";
	private static final String HTML_TD_S = "<td>";
	private static final String HTML_TD_E = "</td>";
	private static final String CORDIALEMENT = "Cordialement,";
	private static final String SENDER = "<b>Adaming suivi recrutement</b>";
	StringBuilder builder = new StringBuilder();

	public void doBusiness() throws Exception {
		logger.info("Email reporting started...");

		// Liste de chargés recrutement
		charges = utilisateurService.findAllCharges();
		List<String> destinataires;
		Date dt = new Date();
		Calendar c = Calendar.getInstance();
		c.setTime(dt);
		c.add(Calendar.DATE, 1);
		dt = c.getTime();

		for (Utilisateur charge : charges) {
			builder = new StringBuilder();
			List<Candidat> candidatsARelancer = new ArrayList<>();
			destinataires = new ArrayList<String>();
			candidatsARelancer = candidatService.candidatARelancer(charge);
			// creation de la liste de candidats à relancer
			if (candidatsARelancer != null && candidatsARelancer.size() >= 1) {
				// creation de la liste des destinataires
				destinataires.add(charge.getEmail());
				IEMailApi eMailApi = new JavaMailApi();
				// objet du mail
				String objet = "Rappel de candidats à relancer";
				// contenu du mail
				String content = "Bonjour "
						+ charge.getNom()
						+ " "
						+ charge.getPrenom()
						+builder.append("<br>")
						+ "Ci-dessous la liste des candidats à relancer pour demain le "
						+ df.format(dt) + ":" + parse(candidatsARelancer);
				List<PieceJointe> pjList = new ArrayList<PieceJointe>();
				eMailApi.envoyerMail(objet, content, destinataires, "","","", pjList);
				logger.info("Email reporting finished.");
			}
		}
	}

	private String parse(List<Candidat> candidats) {
		builder.append(HTML_SNNIPET_1);
		builder.append(HTML_SNNIPET_2);
		builder.append(HTML_SNNIPET_3);
		builder.append(NEW_LINE);
		builder.append(NEW_LINE);
		builder.append(NEW_LINE);
		builder.append(HTML_TH_S);
		builder.append("Candidat");
		builder.append(HTML_TH_E);

		builder.append(HTML_TH_S);
		builder.append("Numéro de téléphone");
		builder.append(HTML_TH_E);

		builder.append(HTML_TH_S);
		builder.append("Email");
		builder.append(HTML_TH_E);

		builder.append(HTML_TH_S);
		builder.append("Profil");
		builder.append(HTML_TH_E);

		for (Candidat candidat : candidats) {

			builder.append(NEW_LINE);
			builder.append(HTML_TR_S);

			builder.append(HTML_TD_S);
			builder.append(candidat.getNom() + " " + candidat.getPrenom());
			builder.append(HTML_TD_E);

			builder.append(HTML_TD_S);
			builder.append(candidat.getNumeroTel());
			builder.append(HTML_TD_E);

			builder.append(HTML_TD_S);
			builder.append(candidat.getEmail());
			builder.append(HTML_TD_E);

			builder.append(HTML_TD_S);
			builder.append(candidat.getTechnologie().getLibelle());
			builder.append(HTML_TD_E);

			builder.append(HTML_TR_E);

		}
		builder.append(HTML_SNNIPET_4);
		builder.append(NEW_LINE);
		builder.append(CORDIALEMENT);
		builder.append(SENDER);
		builder.append(HTML_SNNIPET_5);
		return builder.toString();
	}
}
