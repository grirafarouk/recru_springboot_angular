package com.fr.adaming.rest.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import org.apache.chemistry.opencmis.client.api.Document;
import org.apache.chemistry.opencmis.commons.impl.IOUtils;
import org.apache.chemistry.opencmis.commons.impl.json.JSONObject;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.poi.xwpf.converter.pdf.PdfConverter;
import org.apache.poi.xwpf.converter.pdf.PdfOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.mapstruct.factory.Mappers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.fr.adaming.jsfapp.dto.CandidatDto;
import com.fr.adaming.jsfapp.dto.VListeCandidatsDto;
import com.fr.adaming.jsfapp.dto.VReportingCandidatDto;
import com.fr.adaming.jsfapp.mapper.CandidatMapper;
import com.fr.adaming.jsfapp.mapper.VListeCandidatsMapper;
import com.fr.adaming.jsfapp.mapper.VReportingCandidatMapper;
import com.fr.adaming.jsfapp.model.Candidat;
import com.fr.adaming.jsfapp.model.Competence;
import com.fr.adaming.jsfapp.model.Utilisateur;
import com.fr.adaming.jsfapp.model.VListeCandidats;
import com.fr.adaming.jsfapp.model.VReportingCandidat;
import com.fr.adaming.jsfapp.services.ICandidatService;
import com.fr.adaming.jsfapp.services.IUtilisateurService;
import com.fr.adaming.jsfapp.services.IvListeCandidatsService;
import com.fr.adaming.jsfapp.services.IvReportingCandidatService;
import com.fr.adaming.jsfapp.services.impl.AlfrescoOpenCmis;
import com.fr.adaming.util.ConvocationMail;
import com.fr.adaming.util.EntretienMail;
import com.fr.adaming.util.JavaMailApi;
import com.fr.adaming.util.PieceJointe;

@RestController
@RequestMapping(value = "/api/")

public class CandidatController {
	private static final Logger LOGGER = LoggerFactory.getLogger(CandidatController.class);
	private static final String VALUE = "value";
	private static final String NAME = "mounir";
	private static final String REPORTING = "reporting";
	private static final String CONTEXT = "context";

	@Autowired
	private ICandidatService candidatService;

	@Autowired
	private IUtilisateurService utilisateurService;

	List<String> files = new ArrayList<>();

	@Autowired
	private IvListeCandidatsService vListeCandidatsService;
	private VListeCandidatsDto vListeCandidatsDto;
	private VListeCandidatsMapper vListeCandidatsMapper = Mappers.getMapper(VListeCandidatsMapper.class);
	private VReportingCandidatMapper vReportingCandidatMapper = Mappers.getMapper(VReportingCandidatMapper.class);
	private CandidatMapper candidatMapper = Mappers.getMapper(CandidatMapper.class);

	@Autowired
	private IvReportingCandidatService vReportingCandidatService;

	@GetMapping(path = "")
	public Collection<Candidat> all() {
		return candidatService.findAll();
	}

	@PostMapping(path = "/rechercheNouveauxcandidats")
	public JSONObject rechercherAjoutNouveauxCandidats(@RequestBody VListeCandidatsDto nouveauCandidat,
			@RequestParam int page, @RequestParam int size) {
		List<VListeCandidats> list = new ArrayList<>(

				vListeCandidatsService.rechercherNouveauxCandidats(nouveauCandidat));
		JSONObject object = new JSONObject();
		object.put("total", list.size());
		if (size == 0)
			object.put("results", vListeCandidatsMapper.vListeCandidatsToVListeCandidatsDtos(list));
		else
			object.put("results", vListeCandidatsMapper.vListeCandidatsToVListeCandidatsDtos(
					list.subList(page, list.size() < size + page ? list.size() : page + size)));
		return object;
	}

	@PostMapping(path = "/RechercheNouveauxcandidats")
	public List<VListeCandidatsDto> rechercherNouveauxCandidats(@RequestBody VListeCandidatsDto nouveauCandidat,
			@RequestParam int page, @RequestParam int size) {
		List<VListeCandidats> list = new ArrayList<>(
				vListeCandidatsService.rechercherVlisteNouveauxCandidats(nouveauCandidat, page, size));
		List<VListeCandidatsDto> listes = vListeCandidatsMapper.vListeCandidatsToVListeCandidatsDtos(list);
		return listes;

	}

	@PostMapping(path = "/RechercheNouveauxcandidatsNbr")
	public Integer rechercheNouveauxcandidatsNbr(@RequestBody VListeCandidatsDto nouveauCandidat) {	
		return vListeCandidatsService.rechercherVlisteNouveauxCandidatsNbr(nouveauCandidat);
	}

	@PostMapping(path = "/RechercheTouscandidats")
	public List<VListeCandidatsDto> rechercherTousCandidats(@RequestBody VListeCandidatsDto nouveauCandidat,

			@RequestParam int page, @RequestParam int size) {
		List<VListeCandidats> list = new ArrayList<>(
				vListeCandidatsService.rechercherVlisteCandidats(nouveauCandidat, page, size));
		return vListeCandidatsMapper.vListeCandidatsToVListeCandidatsDtos(list);

	}

	@PostMapping(path = "/RechercheTouscandidatsNbr")
	public Integer rechercheTouscandidatsNbr(@RequestBody VListeCandidatsDto nouveauCandidat) {
		return vListeCandidatsService.rechercherVlisteCandidatsNbr(nouveauCandidat);
	}

	@PostMapping(path = "/RechercheCandidatARelancer")
	public List<VListeCandidatsDto> rechercheCandidatARelancer(@RequestBody VListeCandidatsDto nouveauCandidat,
			@RequestParam int page, @RequestParam int size) {
		List<VListeCandidats> list = new ArrayList<>(
				vListeCandidatsService.rechercherVlisteCandidatsARelancer(nouveauCandidat, page, size));
		return vListeCandidatsMapper.vListeCandidatsToVListeCandidatsDtos(list);

	}

	@PostMapping(path = "/RechercheCandidatARelancerNbr")
	public Integer rechercheCandidatARelancerNbr(@RequestBody VListeCandidatsDto nouveauCandidat) {
		return vListeCandidatsService.rechercherVlisteCandidatsARelancerNbr(nouveauCandidat);
	}

	@PostMapping(path = "/candidatavecentretien/{page}/{size}")
	public List<VListeCandidats> rechercherCandidatAvecEntretien(@PathVariable int page, @PathVariable int size,
			Boolean all) {
		return vListeCandidatsService.rechercherCandidatAvecEntretien(vListeCandidatsDto, page, size, false);
	}

	@PostMapping(path = "/RechercheCandidatavecentretien")

	public List<VListeCandidatsDto> findCandidatavecentretien(@RequestBody VListeCandidatsDto nouveauCandidat,
			@RequestParam int page, @RequestParam int size, @RequestParam boolean allValue) {
		List<VListeCandidats> list = new ArrayList<>(
				vListeCandidatsService.rechercherCandidatAvecEntretien(nouveauCandidat, page, size, allValue));
		return vListeCandidatsMapper.vListeCandidatsToVListeCandidatsDtos(list);

	}

	@PostMapping(path = "/RechercheCandidatAvecEntretienNbr")
	public Integer rechercheCandidatAvecEntretienNbr(@RequestBody VListeCandidatsDto nouveauCandidat,
			@RequestParam boolean allValue) {
		return vListeCandidatsService.rechercherCandidatAvecEntretienNbr(nouveauCandidat, allValue);
	}

	@PostMapping(path = "/RechercheReporting")
	public List<VReportingCandidatDto> rechercherReportingCandidat(@RequestBody VReportingCandidatDto nouveauCandidat,
			@RequestParam int page, @RequestParam int size) {
		List<VReportingCandidat> list = new ArrayList<>(
				vReportingCandidatService.rechercherReportingCandidat(nouveauCandidat, page, size));
		return vReportingCandidatMapper.reportingCandidatsToReportingCandidatDtos(list);
	}

	@PostMapping(path = "/RechercheReportingNbr")
	public Integer rechercheReportingNbr(@RequestBody VReportingCandidatDto newCandidat) {
		return vReportingCandidatService.rechercherReportingCandidatNbr(newCandidat);
	}

	@GetMapping(path = "/getcandidatById/{id}", produces = "application/json")
	public Candidat findById(@PathVariable Long id) {
		return candidatService.findById(id);
	}

	@PostMapping(path = "CVPDF")
	public void getDownload(HttpServletResponse response, @RequestBody VListeCandidatsDto nouveauCandidat)
			throws IOException {
		Candidat can = candidatService.findById(nouveauCandidat.getId());
		InputStream myStream = AlfrescoOpenCmis.findDocument(can.getIdCv()).getContentStream().getStream();
		String fileName = AlfrescoOpenCmis.findDocument(can.getIdCv()).getName();
		response.addHeader("Content-disposition", "attachment;" + fileName);
		response.setContentType("pdf/plain");
		IOUtils.copy(myStream, response.getOutputStream());
		response.flushBuffer();
	}

	@PostMapping(path = "/ajoutCandidat")
	public Candidat ajoutCandidat(@RequestBody CandidatDto candidatDto, @RequestParam String login,
			@RequestParam String mime) {
		Candidat candidat = candidatMapper.candidatDtoToCandidat(candidatDto);
		if (creerCv(candidat, login, mime)) {
			candidat = candidatService.createOrUpdate(candidat);
		}

		return candidat;
	}

	private Boolean creerCv(Candidat candidat, String login, String mime) {
		String realPath = File.separator + "opt" + File.separator + NAME + File.separator + REPORTING + File.separator
				+ login + File.separator;
		FileInputStream fileInputStream = null;
		try {
			if (mime.equals("application/msword")) {
				fileInputStream = new FileInputStream(realPath + candidat.getNomCV().replace(".doc", ".pdf"));
			candidat.setNomCV(candidat.getNomCV().replace(".doc", ".pdf"));	
			} else if (mime.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
				fileInputStream = new FileInputStream(realPath + candidat.getNomCV().replace(".docx", ".pdf"));
				candidat.setNomCV(candidat.getNomCV().replace(".docx", ".pdf"));	
			} else {
				fileInputStream = new FileInputStream(realPath + candidat.getNomCV().replace(".PDF", ".pdf"));
				candidat.setNomCV(candidat.getNomCV().replace(".PDF", ".pdf"));	

			}
			Document cvAlfresco = AlfrescoOpenCmis.createCv(fileInputStream, genererNomPDF(candidat),
					fileInputStream.getChannel().size(), mime);
			candidat.setIdCv(cvAlfresco.getId());
			return true;
		} catch (IOException e) {
			LOGGER.info(CONTEXT, e);
			return false;
		} finally {
			if (fileInputStream != null)
				try {
					fileInputStream.close();
				} catch (IOException e) {
					LOGGER.info(CONTEXT, e);
				}
		}

	}

	private String genererNomPDF(Candidat candidat) {
		DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		int dotPosition = candidat.getNomCV().lastIndexOf('.');
		String extension = "";
		if (dotPosition != -1) {
			extension = candidat.getNomCV().substring(dotPosition);
		}
		return "CV " + candidat.getNom() + " " + candidat.getPrenom() + " - " + df.format(new Date()) + extension;
	}

	@PutMapping(path = "/updateCandidat")
	public CandidatDto updateCandidat(@RequestBody CandidatDto candidatDTO) {
		Candidat candidat = candidatMapper.candidatDtoToCandidat(candidatDTO);
		candidat = candidatService.createOrUpdate(candidat);
		return candidatMapper.candidatToCandidatDto(candidat);
	}

	@PostMapping(path = "deletefile")
	public void deleteFilePdf(@RequestBody JSONObject fileJson) {
		String mime = fileJson.get("filetype").toString();
		String nameFile = fileJson.get("filename").toString();
		String loginUser = fileJson.get("loginUser").toString();
		String realPath = File.separator + "opt" + File.separator + NAME + File.separator + REPORTING + File.separator
				+ loginUser;
		String name = "";
		if (mime.equals("application/msword")) {
			name = nameFile.replace(".doc", ".pdf");
		} else if (mime.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
			name = nameFile.replace(".docx", ".pdf");
		} else {

			name = nameFile;
		}
		File file = new File(realPath + File.separator + name);
		file.delete();
	}

	@PostMapping(path = "convertWordToPdf")
	public JSONObject convertWordToPdf(@RequestBody JSONObject fileJson) {
		String mime = fileJson.get("filetype").toString();
		String nameFile = fileJson.get("filename").toString();
		String value64 = fileJson.get(VALUE).toString();
		String loginUser = fileJson.get("loginUser").toString();
		String realPath = File.separator + "opt" + File.separator + NAME + File.separator + REPORTING + File.separator
				+ loginUser;
		byte[] data = DatatypeConverter.parseBase64Binary(value64);
		InputStream inStream = new ByteArrayInputStream(data);
		OutputStream outStream = null;
		Path path = Paths.get(realPath);
		if (!Files.exists(path)) {
			try {
				Files.createDirectories(path);
			} catch (IOException e) {
				LOGGER.info(CONTEXT, e);
			}
		}
		String name;
		if (mime.equals("application/msword")) {
			name = nameFile.replace(".doc", ".pdf");
		} else if (mime.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
			name = nameFile.replace(".docx", ".pdf");
		} else if (mime.equals("application/octet-stream")) {
			name = nameFile.replace(".PDF", ".pdf");
		} else {
			name = nameFile;
		}
		try {

			if (mime.equals("application/msword")) {
				com.aspose.words.License license = new com.aspose.words.License();
				license.setLicense("Aspose.Words.Java.lic");
				com.aspose.words.Document doc = new com.aspose.words.Document(inStream);
				doc.save(realPath + File.separator + name);
			} else if (mime.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
				try (OutputStream out = new FileOutputStream(new File(realPath + File.separator + name));) {
					byte[] data1 = DatatypeConverter.parseBase64Binary(value64);
					InputStream inStream1 = new ByteArrayInputStream(data1);
					XWPFDocument document = new XWPFDocument(inStream1);
					PdfOptions options = PdfOptions.create();
					PdfConverter.getInstance().convert(document, out, options);
				} catch (Throwable e) {
					e.printStackTrace();
				}
			} else {
				byte[] buffer = new byte[inStream.available()];
				while (inStream.read(buffer) > 0) {
					File targetFile = new File(realPath + File.separator + name);
					outStream = new FileOutputStream(targetFile);
					outStream.write(buffer);
				}
			}

			File file = new File(realPath + File.separator + name);
			inStream = new FileInputStream(file);
			byte[] imageBytes = new byte[(int) file.length()];
			inStream.read(imageBytes, 0, imageBytes.length);
			JSONObject j = new JSONObject();
			j.put("realPath", realPath + File.separator + name);
			j.put(VALUE, imageBytes);
			inStream.close();
			return j;

		} catch (Exception e) {
			LOGGER.info(CONTEXT, e);
			return null;
		} finally {
			try {
				if (inStream != null)
					inStream.close();
				if (outStream != null)
					outStream.close();
			} catch (IOException e1) {
				LOGGER.info(CONTEXT, e1);
			}
		}
	}

	@GetMapping("/getCandidatByEmail/{email}/")
	public Candidat getCandidatByEmail(@PathVariable String email) {
		return candidatService.rechercherCandidatParEmail(email);
	}

	@GetMapping("/getCandidatByNumTel/{numTe}")
	public Candidat getCandidatByNumTel(@PathVariable String numTe) {
		return candidatService.rechercherCandidatParNumTel(numTe);
	}

	@GetMapping("/getListNomCvs")
	public List<String> getListNomCvs() {
		return candidatService.rechercherNomCv();
	}

	@PutMapping(path = "/updateficheCandidat")
	public CandidatDto updateficheCandidat(@RequestBody CandidatDto candidatDTO) {
		//
		// if
		// (candidatDTO.getEntretien().getDisponible().getLibelle().equals("Disponible"))
		// {
		// Statut s = new Statut(3, "En attente d’évaluation");
		// candidatDTO.setStatut(s);
		// } else {
		// Statut s = new Statut(2, "Vide");
		// candidatDTO.setStatut(s);
		// System.out.println(candidatDTO.getStatut());
		// }
		Candidat candidat = candidatService.createOrUpdate(candidatMapper.candidatDtoToCandidat(candidatDTO));
		return candidatMapper.candidatToCandidatDto(candidat);
	}

	@PostMapping("/envoyerEmailHorsCibleCandidats")
	public void envoyerEmailHorsCibleCandidats(@RequestBody CandidatDto candidatDto, @RequestParam String login,
			@RequestParam String comMotif) {
		JavaMailApi eMailApi = new JavaMailApi();
		List<String> dst = new ArrayList<>();
		Utilisateur connectedUser = utilisateurService.findByLogin(login);
		Candidat candidat = candidatMapper.candidatDtoToCandidat(candidatDto);
		dst.add(candidat.getCreePar().getEmail());
		String objet = "Candidat  Hors cible " + candidat.getNom() + " " + candidat.getPrenom();
		String content = creeContentEmail(candidat, connectedUser, comMotif);
		List<PieceJointe> pjList = new ArrayList<>();
		eMailApi.setEmailEntretienHorsCible(true);
		eMailApi.envoyerMail(objet, content, dst, connectedUser.getEmail(), "", "", pjList);
		eMailApi.setEmailEntretienHorsCible(false);
	}

	@PutMapping(path = "/updateficheEntretien")
	public CandidatDto updateficheEntretien(@RequestBody CandidatDto candidatDTO) {
		// if (candidatDTO.getStatut().getLibelle().equals("En attente d’évaluation")) {
		// Statut s = new Statut(4, "En attente d’affectation");
		// candidatDTO.setStatut(s);
		// }
		Candidat candidat = candidatMapper.candidatDtoToCandidat(candidatDTO);

		candidat = candidatService.createOrUpdate(candidat);
		return candidatMapper.candidatToCandidatDto(candidat);
	}

	@PostMapping("/envoyerEmailDispoCandidats")
	public void envoyerEmailDispoCandidats(@RequestBody EntretienMail entretienMail, @RequestParam String login) {
		Candidat candidat = entretienMail.getCandidat();
		ConvocationMail convocationMail = new ConvocationMail();
		List<String> dst = new ArrayList<>();
		Utilisateur connectedUser = utilisateurService.findByLogin(login);
		List<String> dest = entretienMail.getDistCopie();
		dst.add(candidat.getEmail());
		try {
			String objet = "Convocation entretien candidat pour ADAMING";
			String content;
			content = creerEmailEntretien(candidat, connectedUser);
			List<PieceJointe> pjList = new ArrayList<>();
			List<JSONObject> filesConv = entretienMail.getPieceJoites();
			convocationMail.setEmailEntretien(true);
			// convert upload file to PieceJointe
			if (CollectionUtils.isNotEmpty(files)) {
				for (JSONObject file : filesConv) {
					if (file != null) {
						PieceJointe pieceJointe = new PieceJointe();
						pieceJointe.setFileName(file.get("fileName").toString());
						ByteArrayOutputStream contentFile = new ByteArrayOutputStream((int) file.get("size"));
						byte[] data = DatatypeConverter.parseBase64Binary(file.get(VALUE).toString());
						contentFile.write(data);
						pieceJointe.setContent(contentFile);
						pieceJointe.setMimeType(file.get("type").toString());
						pjList.add(pieceJointe);
					}
				}
			}
			convocationMail.envoyerMail(objet, content, dst, "moueslati@adaming.fr", dest.get(0), dest.get(1), pjList);
			convocationMail.setEmailEntretien(false);
		} catch (IOException | MessagingException e) {
			LOGGER.info(CONTEXT, e);
		}
	}

	public String creerEmailEntretien(Candidat candidatDto, Utilisateur connectedUser)
			throws IOException, MessagingException {
		StringBuilder emailContent = new StringBuilder();
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat dfTime = new SimpleDateFormat("HH:mm");
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		cal.setTime(candidatDto.getEntretien().getDate());
		Date testTime = cal.getTime();
		cal.add(Calendar.HOUR_OF_DAY, 1);
		Date presentationTime = cal.getTime();
		cal.add(Calendar.HOUR_OF_DAY, 1);
		Date entretienTime = cal.getTime();
		String messageEntretien = "<p><span style=\"font-size: 12.0pt; font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; mso-fareast-language: FR\">Bonjour "
				+ candidatDto.getCivilite() + ". " + candidatDto.getNom().toUpperCase() + " "
				+ candidatDto.getPrenom().toUpperCase()
				+ ", </span></p><p><span style=\"font-size: 12.0pt; font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; mso-fareast-language: FR\">Suite &agrave; notre entretien t&eacute;l&eacute;phonique : </span></p><p><span style=\"font-size: 12.0pt; font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; mso-fareast-language: FR\">Je vous confirme donc votre entretien le <b>"
				+ sdf.format(candidatDto.getEntretien().getDate()) + " &agrave; "
				+ dfTime.format(candidatDto.getEntretien().getDate()) + " </b>dans nos locaux situ&eacute;s:</p> <b>"
				+ candidatDto.getEntretien().getLieu().getAdresseAdaming()
				+ "</b></span><p><span style=\"font-size: 12.0pt; font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; mso-fareast-language: FR\">Le d&eacute;roulement sera le suivant: </span></p><ul><li><span style=\"font-size: 12.0pt; font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; mso-fareast-language: FR\">"
				+ dfTime.format(testTime)
				+ ": Test de logique </span></li><li><span style=\"font-size: 12.0pt; font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; mso-fareast-language: FR\">"
				+ dfTime.format(presentationTime)
				+ ": Pr&eacute;sentation de notre soci&eacute;t&eacute; et opportunit&eacute;s de carri&eacute;re <span></li><li><span style=\"font-size: 12.0pt; font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; mso-fareast-language: FR\">"
				+ dfTime.format(entretienTime)
				+ ": Entretien individuel</span></li></ul><p><u><span style=\"font-size: 12.0pt; font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; mso-fareast-language: FR\">Merci de bien vouloir me confirmer votre pr&eacute;sence par retour de mail.</span></u></p><p><b><u><span style=\"font-size: 12.0pt; font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; mso-fareast-language: FR\">Ce rendez-vous a pour but d'int&eacute;grer notre soci&eacute;t&eacute; en contrat &agrave; dur&eacute;e ind&eacute;termin&eacute;e dans l'hypoth&eacute;se o&ugrave; vos tests et entretien sont concluants.</span></u></b></p><p><span style=\"font-size: 12.0pt; font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; mso-fareast-language: FR\">Cordialement,</span></p><p/><p/><table border=\"0\" cellpadding=\"0\" width=\"520\" style=\"width: 390.0pt\"><tbody><tr><td width=\"200\" style=\"width: 150.0pt; padding: .75pt .75pt .75pt .75pt\"><p><img border=\"0\" width=\"200\" src=\"cid:image\"></p></td><td width=\"200\" style=\"width: 150.0pt; padding: .75pt .75pt .75pt .75pt\"><p><span style=\"font-size: 9.0pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; color: #E10026; mso-fareast-language: FR\"><b>"
				+ connectedUser.getNom() + " " + connectedUser.getPrenom()
				+ "</b></span><b><span style=\"font-size: 9.0pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; color: black; mso-fareast-language: FR\"><br></span><span style=\"font-size: 9.0pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; color: #646464; mso-fareast-language: FR\"> Charg&eacute;e de recrutement</span></b><span style=\"font-size: 9.0pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; color: black; mso-fareast-language: FR\"><br><br></span><span style=\"font-size: 9.0pt; color: #646464;\"><a href=\"mailto:"
				+ connectedUser.getEmail() + "\" onclick=\"return rcmail.command('compose','" + connectedUser.getEmail()
				+ "',this)\" rel=\"noreferrer\">" + connectedUser.getEmail()
				+ "</a> - <a href=\"http://www.adaming.fr/\" target=\"_blank\" rel=\"noreferrer\"><span style=\"color: #646464\">www.adaming.fr</span></a>"
				+ "<br>"
				+ "<span style=\"font-size: 9.0pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; color: #000000; mso-fareast-language: FR\"><b>"
				+ "T: " + connectedUser.getNumeroTelF() + " " + "P: " + connectedUser.getNumeroTelP() + "</b></span>"
				+ "<br>"

				+ "<br></span></p><p><a href=\"https://www.facebook.com/Groupe-Adaming-665214133627038/\" target=\"_blank\" rel=\"noreferrer\"><b><span style=\"font-size: 9.0pt; color: blue;\">"

				+ "<img border=\"0\" width=\"22\" height=\"22\" id=\"Image_x0020_3\" src=\"cid:imageFacebook\"; ./?_task=mail&amp;_action=get&amp;></span></b></a><a href=\"https://www.linkedin.com/company/groupe-adaming?trk=company_logo\" target=\"_blank\" rel=\"noreferrer\"><b><span style=\"font-size: 9.0pt; color: blue;\"><img border=\"0\" width=\"22\" height=\"22\" id=\"Image_x0020_2\" src=\"cid:imageLinkedin\"; ./?_task=mail&amp;_action=get&amp;></span></b></a><a href=\"https://twitter.com/Adaming_ESN\" target=\"_blank\" rel=\"noreferrer\"><b><span style=\"font-size: 9.0pt; color: blue;\"><img border=\"0\" width=\"22\" height=\"22\" id=\"Image_x0020_4\" src=\"cid:imagetwitter\"; ./?_task=mail&amp;_action=get&amp;></span></b></a><span style=\"color: #1F497D\"></span></p>";
		final String HEADER_AND_OPEN_BODY_HTML = "<!DOCTYPE html><html><head><style>table {border-collapse: collapse;}table, td, th {border: none;}</style><title> </title></head><body>";
		final String CLOSE_BODY_AND_HTML = "</body></html>";
		emailContent.append(HEADER_AND_OPEN_BODY_HTML);
		// append commentaire chargé recrutement
		emailContent.append(messageEntretien);
		emailContent.append(CLOSE_BODY_AND_HTML);
		return emailContent.toString();
	}

	public String creeContentEmail(Candidat candidat, Utilisateur connectedUser, String commentaireMotif) {
		StringBuilder emailContent = new StringBuilder();
		String commentaireChargeRecrutement = "<p><span style=\"font-size: 12.0pt; font-family: &quot;Times New Roman&quot;,&quot;serif&quot;; mso-fareast-language: FR\">Bonjour "
				+ candidat.getCreePar().getNom().toUpperCase() + " " + candidat.getCreePar().getPrenom().toUpperCase()
				+ ", </span></p><p>" + commentaireMotif.replaceAll("(\r\n|\n)", "<br />") + "</p>";
		final String OPEN_TABLE = "<table>";
		final String CLOSE_TABLE = "</table>";
		final String CLOSE_BODY_AND_HTML = "<table border=\"0\" cellpadding=\"0\" width=\"520\" style=\"width: 390.0pt\"><tbody><tr><td width=\"200\" style=\"width: 150.0pt; padding: .75pt .75pt .75pt .75pt\"><p><img border=\"0\" width=\"200\" src=\"cid:image\"></p></td><td width=\"200\" style=\"width: 150.0pt; padding: .75pt .75pt .75pt .75pt\"><p><span style=\"font-size: 9.0pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; color: #E10026; mso-fareast-language: FR\"><b>"
				+ connectedUser.getNom() + " " + connectedUser.getPrenom()
				+ "</b></span><b><span style=\"font-size: 9.0pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; color: black; mso-fareast-language: FR\"><br></span><span style=\"font-size: 9.0pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; color: #646464; mso-fareast-language: FR\"> Chargé de recrutement</span></b><span style=\"font-size: 9.0pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; color: black; mso-fareast-language: FR\"><br><br></span><span style=\"font-size: 9.0pt; color: #646464;\"><a href=\"mailto:"
				+ connectedUser.getEmail() + "\" onclick=\"return rcmail.command('compose','" + connectedUser.getEmail()
				+ "',this)\" rel=\"noreferrer\">" + connectedUser.getEmail()
				+ "</a> - <a href=\"http://www.adaming.fr/\" target=\"_blank\" rel=\"noreferrer\"><span style=\"color: #646464\">www.adaming.fr</span></a><br></span></p><p><a href=\"https://www.facebook.com/Groupe-Adaming-665214133627038/\" target=\"_blank\" rel=\"noreferrer\"><b><span style=\"font-size: 9.0pt; color: blue;\"><img border=\"0\" width=\"22\" height=\"22\" id=\"Image_x0020_3\" src=\"cid:imageFacebook\"; ./?_task=mail&amp;_action=get&amp;></span></b></a><a href=\"https://www.linkedin.com/company/groupe-adaming?trk=company_logo\" target=\"_blank\" rel=\"noreferrer\"><b><span style=\"font-size: 9.0pt; color: blue;\"><img border=\"0\" width=\"22\" height=\"22\" id=\"Image_x0020_2\" src=\"cid:imageLinkedin\"; ./?_task=mail&amp;_action=get&amp;></span></b></a><a href=\"https://twitter.com/Adaming_ESN\" target=\"_blank\" rel=\"noreferrer\"><b><span style=\"font-size: 9.0pt; color: blue;\"><img border=\"0\" width=\"22\" height=\"22\" id=\"Image_x0020_4\" src=\"cid:imagetwitter\"; ./?_task=mail&amp;_action=get&amp;></span></b></a><span style=\"color: #1F497D\"></span></p></body></html>";

		final String OPEN_TABLE_ROW = "<tr>";
		final String CLOSE_TABLE_ROW = "</tr>";
		final String OPEN_TABLE_COLONE = "<td>";
		final String CLOSE_TABLE_COLONE = "</td>";
		final String HEADER_AND_OPEN_BODY_HTML = "<!DOCTYPE html><html><head><style>table {border-collapse: collapse;}table, td, th {border: none;}</style><title> </title></head><body>";
		// append head html and open body
		emailContent.append(HEADER_AND_OPEN_BODY_HTML);

		// ****table row closed ***//

		// append commentaire chargé recrutement
		emailContent.append(commentaireChargeRecrutement);

		emailContent.append(OPEN_TABLE);

		emailContent.append(OPEN_TABLE_ROW);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append("Motif :");
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append(candidat.getMotif().getLibelle());
		emailContent.append(CLOSE_TABLE_COLONE);

		// **** Open Table row ***//
		emailContent.append(OPEN_TABLE_ROW);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append("Nom candidat :");
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append(candidat.getNom());
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(CLOSE_TABLE_ROW);

		// ****table row closed ***//

		// **** Open Table row ***//
		emailContent.append(OPEN_TABLE_ROW);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append("Prenom candidat :");
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append(candidat.getPrenom());
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(CLOSE_TABLE_ROW);
		// ****table row closed ***//
		// **** Open Table row ***//
		emailContent.append(OPEN_TABLE_ROW);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append("Email :");
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append(candidat.getEmail());
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(CLOSE_TABLE_ROW);
		// ****table row closed ***//

		// **** Open Table row ***//
		emailContent.append(OPEN_TABLE_ROW);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append("Address :");
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append(candidat.getAdresse());
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(CLOSE_TABLE_ROW);
		// ****table row closed ***//

		// **** Open Table row ***//
		emailContent.append(OPEN_TABLE_ROW);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append("Numéro téléphone  :");
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append(candidat.getNumeroTel());
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(CLOSE_TABLE_ROW);
		// ****table row closed ***//

		// **** Open Table row ***//
		emailContent.append(OPEN_TABLE_ROW);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append("Profil  :");
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append(candidat.getTechnologie().getLibelle());
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(CLOSE_TABLE_ROW);
		// ****table row closed ***//

		// **** Open Table row ***//
		emailContent.append(OPEN_TABLE_ROW);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append("Origine cv  :");
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append(candidat.getOrigine().getLibelle());
		emailContent.append(CLOSE_TABLE_COLONE);

		emailContent.append(CLOSE_TABLE_ROW);
		// ****table row closed ***//

		// **** Open Table row ***//
		emailContent.append(OPEN_TABLE_ROW);

		emailContent.append(OPEN_TABLE_COLONE);
		emailContent.append("Compétence  :");
		emailContent.append(CLOSE_TABLE_COLONE);

		for (Competence item : candidat.getCandidatCompetence()) {

			emailContent.append(OPEN_TABLE_COLONE);
			emailContent.append(item.getLibelle());
			emailContent.append(CLOSE_TABLE_COLONE);

		}

		emailContent.append(CLOSE_TABLE_ROW);
		// ****table row closed ***//

		emailContent.append(CLOSE_TABLE);
		emailContent.append("<br />Cordialement.<br />");
		emailContent.append(CLOSE_BODY_AND_HTML);
		return emailContent.toString();
	}

}
