package com.fr.adaming.security;

import java.io.FileReader;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.chemistry.opencmis.commons.impl.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.maven.model.Model;
import org.apache.maven.model.io.xpp3.MavenXpp3Reader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.model.Utilisateur;
import com.fr.adaming.jsfapp.services.IUtilisateurService;
import com.fr.adaming.util.SendEmailInitPasswordThread;

@RestController
public class PasswordForgotController {

	private static final Logger LOGGER = LoggerFactory.getLogger(PasswordForgotController.class);

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private IUtilisateurService utilisateurService;

	@PostMapping("/forgot-password")
	public JSONObject processForgotPasswordForm(@RequestBody JSONObject email, HttpServletRequest request) {

		MavenXpp3Reader reader = new MavenXpp3Reader();
		Model model = null;
		String projectId = "ADAMING_SUIVI_APP-REST";
		try {
			model = reader.read(new FileReader("pom.xml"));
			projectId = model.getArtifactId();
		} catch (Exception e1) {

		}
		String url = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + "/"
				+ projectId + "/#/";
		JSONObject result = new JSONObject();
		Utilisateur user = utilisateurService.findByEmail(email.get("email").toString());
		if (user == null) {
			result.put("result", "error");
			result.put("errorMsg", "We could not find an account for that e-mail address");
			return result;
		}
		user.setToken(UUID.randomUUID().toString());
		utilisateurService.update(user);
		try {
			url += "resetpwd?token=" + user.getToken();
			SendEmailInitPasswordThread emailInitPasswordThread = new SendEmailInitPasswordThread();
			emailInitPasswordThread.setUtilisateur(user);
			emailInitPasswordThread.setUrl(url);
			emailInitPasswordThread.start();

		} catch (Exception e) {
			LOGGER.info("context", e);
		}
		result.put("result", "success");
		return result;
	}

	@PostMapping("/reset-password")
	public void handlePasswordReset(@RequestBody JSONObject form) {
		Utilisateur user = utilisateurService.findUserByToken(form.get("token").toString());
		String updatedPassword = passwordEncoder.encode(form.get("pwd").toString());
		user.setPassword(updatedPassword);
		user.setToken(null);
		user.setExpire(false);
		utilisateurService.update(user);
	}

	@GetMapping("token-password")
	public JSONObject tokenPWDStatus(@RequestParam String token) {
		JSONObject result = new JSONObject();
		Utilisateur user = utilisateurService.findUserByToken(token);
		if (user == null) {
			result.put("result", "error");
			result.put("errorMsg", "Could not find password reset token.");
		} else {
			result.put("result", "success");
			result.put("token", user.getToken());
		}
		return result;
	}

}
