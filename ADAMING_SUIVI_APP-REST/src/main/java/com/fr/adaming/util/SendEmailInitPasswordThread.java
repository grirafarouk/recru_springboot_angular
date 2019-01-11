package com.fr.adaming.util;

import com.fr.adaming.jsfapp.model.Utilisateur;

public class SendEmailInitPasswordThread extends Thread {

	public Utilisateur utilisateur;
	public String url;

	/**
	 * 
	 * 
	 * @see java.lang.Thread#run()
	 */
	@Override
	public void run() {

		if (utilisateur != null && url != null) {

			EnvoiMailUtil.sendMailInitPassword(utilisateur, url);

		}
	}

	/**
	 * @return the utilisateur
	 */
	public Utilisateur getUtilisateur() {
		return utilisateur;
	}

	/**
	 * @param utilisateur the utilisateur to set
	 */
	public void setUtilisateur(Utilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}
