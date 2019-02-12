package com.fr.adaming.util;
import java.io.IOException;
import java.util.List;
import java.util.Properties;
import java.util.ResourceBundle;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.commons.lang.StringUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component("convocationMail")
public class ConvocationMail implements IConvocationMail {
	private static final Logger LOGGER = LoggerFactory.getLogger(ConvocationMail.class);
	ResourceBundle bundle=ResourceBundle.getBundle("properties.email");
	private Properties properties;
	private Session session;
	private boolean emailEntretien;
	private boolean emailEntretienHorsCible;

	public ConvocationMail() {
		properties = new Properties();
		properties.setProperty("mail.transport.protocol", "smtps");
		properties.setProperty("mail.smtp.host", bundle.getString("SMTP_HOST1"));
		properties.setProperty("mail.smtp.user", bundle.getString("LOGIN_SMTP1"));
		properties.setProperty("mail.smtp.starttls.enable", "true");
		properties.setProperty("mail.from", bundle.getString("IMAP_ACCOUNT1"));
		session = Session.getInstance(properties);
	}

	public void envoyerMail(String objet, String message, List<String> destinataires, String destCc, String destCcTwo,
			String destCcThree, List<PieceJointe> pjList) {
		MimeMessage msg = new MimeMessage(session);

		try {
			msg.setSubject(objet);
			msg.setContent(getPjsMimeMultiPart(message, pjList));

			if (StringUtils.isNotEmpty(destCc)) {
				msg.addRecipients(Message.RecipientType.CC, destCc);
			}
			if (StringUtils.isNotEmpty(destCcTwo)) {
				msg.addRecipients(Message.RecipientType.CC, destCcTwo);
			}
			if (StringUtils.isNotEmpty(destCcThree)) {
				msg.addRecipients(Message.RecipientType.CC, destCcThree);
			}
			Transport transport = session.getTransport("smtp");
			transport.connect(bundle.getString("LOGIN_SMTP1"),bundle.getString("PASSWORD_SMTP1"));
			for (String dest : destinataires) {
				msg.addRecipients(Message.RecipientType.TO, dest);
			}
			transport.sendMessage(msg, msg.getAllRecipients());

		} catch (Exception e) {
			LOGGER.info("context",e);
		}
	}

	private Multipart getPjsMimeMultiPart(String message, List<PieceJointe> pjList) throws MessagingException {
		MimeMultipart multiPartMsg = new MimeMultipart();
		MimeBodyPart mdp;
		MimeBodyPart content = new MimeBodyPart();
		content.setContent(message, "text/html");
		multiPartMsg.addBodyPart(content);
		if (pjList != null) {
			for (PieceJointe pj : pjList) {
				mdp = getMimeBodyPart(pj);
				multiPartMsg.addBodyPart(mdp);
			}
		}
		if (emailEntretien || emailEntretienHorsCible) {
			content = new MimeBodyPart();
			try {

				DataSource fds = new FileDataSource(new ClassPathResource("/images/imageADM.png").getFile());

				content.setDataHandler(new DataHandler(fds));
				content.setHeader("Content-ID", "<image>");

				// add image to the multipart
				multiPartMsg.addBodyPart(content);
				content = new MimeBodyPart();
				DataSource fds1 = new FileDataSource(new ClassPathResource("/images/facebook-icon.png").getFile());

				content.setDataHandler(new DataHandler(fds1));
				content.setHeader("Content-ID", "<imageFacebook>");

				// add image to the multipart
				multiPartMsg.addBodyPart(content);
				content = new MimeBodyPart();
				DataSource fds2 = new FileDataSource(new ClassPathResource("/images/linkedin-icon.png").getFile());

				content.setDataHandler(new DataHandler(fds2));
				content.setHeader("Content-ID", "<imageLinkedin>");

				// add image to the multipart
				multiPartMsg.addBodyPart(content);
				content = new MimeBodyPart();
				DataSource fds3 = new FileDataSource(new ClassPathResource("/images/twitter-icon.png").getFile());

				content.setDataHandler(new DataHandler(fds3));
				content.setHeader("Content-ID", "<imagetwitter>");

				// add image to the multipart
				multiPartMsg.addBodyPart(content);
			} catch (IOException e) {
				LOGGER.info("contextgetPjsMimeMultiPart",e);
			}
		}
		return multiPartMsg;
	}

	private MimeBodyPart getMimeBodyPart(PieceJointe pj) {

		DataSource datasource = new ByteArrayDataSource(pj.getContent().toByteArray(), pj.getMimeType());
		DataHandler dataHandler = new DataHandler(datasource);
		MimeBodyPart pjMimeBodyPart = null;
		if (pj.getContent() != null) {
			try {
				pjMimeBodyPart = new MimeBodyPart();
				pjMimeBodyPart.setDataHandler(dataHandler);
				pjMimeBodyPart.setFileName(StringUtils.isNotEmpty(pj.getFileName()) ? pj.getFileName() : "pj");
			} catch (MessagingException e) {
				LOGGER.info("contextgetMimeBodyPart",e);
			}
		}
		return pjMimeBodyPart;
	}



	public boolean isEmailEntretien() {
		return emailEntretien;
	}

	public void setEmailEntretien(boolean emailEntretien) {
		this.emailEntretien = emailEntretien;
	}

	public boolean isEmailEntretienHorsCible() {
		return emailEntretienHorsCible;
	}

	public void setEmailEntretienHorsCible(boolean emailEntretienHorsCible) {
		this.emailEntretienHorsCible = emailEntretienHorsCible;
	}

}
