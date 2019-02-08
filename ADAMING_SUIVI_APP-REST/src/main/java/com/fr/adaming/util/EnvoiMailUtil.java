package com.fr.adaming.util;

import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fr.adaming.jsfapp.model.Utilisateur;

public class EnvoiMailUtil {

	private static final Logger LOGGER = LoggerFactory.getLogger(EnvoiMailUtil.class);

	private EnvoiMailUtil() {
		throw new IllegalStateException("Utility class");
	}

	public static final void sendMailInitPassword(Utilisateur utilisateurExiste, String url) {

		Email email = new SimpleEmail();
		email.setHostName("smtp.gmail.com");
		try {
			email.addTo(utilisateurExiste.getEmail());
			email.setFrom("cra@adaming.fr");
			// authentification de l'emmetteur de l'email
			email.setAuthentication("adaming.rh@gmail.com", "adaming2014");
			email.setTLS(false);
			email.setSSL(true);
			// 465 or 587 which is the port number here
			email.setSmtpPort(25);
			email.setSubject("Réinitialisation de votre mot de passe‏");
			email.setContent(
					"Bonjour " + utilisateurExiste.getPrenom() + " " + utilisateurExiste.getNom() + ","
							+ "Pour réinitialiser votre mot de passe, merci de vous rendre sur:" + "<br />" + url
							+ "<br />" + "Cordialement," + "<br />" + "L'équipe Adaming CRA",
					"text/html; charset=ISO-8859-1");
			email.send();
			LOGGER.info(utilisateurExiste.getEmail());
		} catch (EmailException e) {
			LOGGER.info("context", e);
		}

	}

}
