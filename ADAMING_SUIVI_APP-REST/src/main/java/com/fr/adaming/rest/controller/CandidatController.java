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
import java.util.Base64;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.mail.MessagingException;
import javax.persistence.PostPersist;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;

import org.apache.chemistry.opencmis.client.api.Document;
import org.apache.chemistry.opencmis.commons.impl.IOUtils;
import org.apache.chemistry.opencmis.commons.impl.json.JSONArray;
import org.apache.chemistry.opencmis.commons.impl.json.JSONObject;
import org.apache.commons.collections4.CollectionUtils;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fr.adaming.jsfapp.dto.CandidatDto;
import com.fr.adaming.jsfapp.dto.V_ListeCandidatsDto;
import com.fr.adaming.jsfapp.dto.V_ReportingCandidatDto;
import com.fr.adaming.jsfapp.mapper.V_ListeCandidatsMapper;
import com.fr.adaming.jsfapp.mapper.V_ReportingCandidatMapper;
import com.fr.adaming.jsfapp.model.Candidat;
import com.fr.adaming.jsfapp.model.CandidatCompetence;
import com.fr.adaming.jsfapp.model.CandidatCompetenceId;
import com.fr.adaming.jsfapp.model.CodePostal;
import com.fr.adaming.jsfapp.model.Competence;
import com.fr.adaming.jsfapp.model.Utilisateur;
import com.fr.adaming.jsfapp.model.V_ListeCandidats;
import com.fr.adaming.jsfapp.model.V_ReportingCandidat;
import com.fr.adaming.jsfapp.services.ICandidatCompetenceService;
import com.fr.adaming.jsfapp.services.ICandidatService;
import com.fr.adaming.jsfapp.services.ICompetenceService;
import com.fr.adaming.jsfapp.services.IUtilisateurService;
import com.fr.adaming.jsfapp.services.IV_ListeCandidatsService;
import com.fr.adaming.jsfapp.services.IV_ReportingCandidatService;
import com.fr.adaming.jsfapp.services.impl.AlfrescoOpenCmis;
import com.fr.adaming.jsfapp.services.impl.CandidatCompetenceService;
import com.fr.adaming.jsfapp.services.impl.CandidatService;
import com.fr.adaming.jsfapp.services.impl.CodePostalService;
import com.fr.adaming.jsfapp.services.impl.UtilisateurService;
import com.fr.adaming.util.ConvocationMail;
import com.fr.adaming.util.EntretienMail;
import com.fr.adaming.util.IConvocationMail;
import com.fr.adaming.util.JavaMailApi;
import com.fr.adaming.util.PieceJointe;
import com.fr.adaming.jsfapp.enums.Disponibilite;

@RestController
@CrossOrigin("*")
@Controller
public class CandidatController {

	@Autowired
	private ICandidatService candidatService;

	@Autowired
	private IUtilisateurService utilisateurService;

	@Autowired
	private ICandidatCompetenceService candidatCompetenceService;

	@Autowired
	private ICompetenceService competenceService;

	@Autowired
	StorageService storageService;

	List<String> files = new ArrayList<String>();

	private Disponibilite[] refDisponibilite = Disponibilite.values();

	@Autowired
	private IV_ListeCandidatsService v_ListeCandidatsService;

	@Autowired
	private IV_ReportingCandidatService v_ReportingCandidatService;

	private V_ListeCandidatsDto v_ListeCandidatsDto;
	private V_ReportingCandidatDto v_ReportingCandidatDto;
	private V_ListeCandidatsMapper v_ListeCandidatsMapper;// = Mappers.getMapper(V_ListeCandidatsMapper.class);
	private V_ReportingCandidatMapper v_ReportingCandidatMapper;// = Mappers.getMapper(V_ReportingCandidatMapper.class);
	private List<V_ListeCandidatsDto> listeCandidats;
	private List<V_ReportingCandidatDto> listeReportingCandidats;

	@Autowired
	private CodePostalService cps;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Candidat> all() {
		return candidatService.findAll();
	}

	public List<Candidat> rechercherCandidats(CandidatDto candidatDto, Boolean all) {
		return candidatService.rechercherCandidats(candidatDto, all);
	}

//	@RequestMapping(value = "/candidats", method = RequestMethod.GET)
//	public List<V_ListeCandidatsDto> findAll() {
//
//		v_ListeCandidatsDto = new V_ListeCandidatsDto();
//		List<V_ListeCandidats> v_listeCandidats = new ArrayList<>(
//		 v_ListeCandidatsService.rechercherV_ListeCandidats(v_ListeCandidatsDto));
//		listeCandidats = v_ListeCandidatsMapper.v_ListeCandidatsToV_ListeCandidatsDtos(v_listeCandidats);
//		return listeCandidats;
//	}

	@RequestMapping(value = "/nouveauxcandidats/{page}/{size}", method = RequestMethod.GET)
	public List<V_ListeCandidatsDto> findAllNouveauxCandidats(@PathVariable int page, @PathVariable int size) {

		v_ListeCandidatsDto = new V_ListeCandidatsDto();
		List<V_ListeCandidats> v_listeCandidats = new ArrayList<>(
				v_ListeCandidatsService.rechercherV_ListeNouveauxCandidats(v_ListeCandidatsDto, page, size));
		listeCandidats = v_ListeCandidatsMapper.v_ListeCandidatsToV_ListeCandidatsDtos(v_listeCandidats);
		return listeCandidats;
	}

	@RequestMapping(value = "/RechercheNouveauxcandidats", method = RequestMethod.POST)
	public List<V_ListeCandidats> rechercherNouveauxCandidats(@RequestBody V_ListeCandidatsDto NCD) {

		List<V_ListeCandidats> v_listeCandidats = new ArrayList<>(
				v_ListeCandidatsService.rechercherNouveauxCandidats(NCD));
		return v_listeCandidats;
	}

	@RequestMapping(value = "/candidats/{page}/{size}", method = RequestMethod.GET)
	public List<V_ListeCandidatsDto> findAllCandidats(@PathVariable int page, @PathVariable int size) {

		v_ListeCandidatsDto = new V_ListeCandidatsDto();
		List<V_ListeCandidats> v_listeCandidats = new ArrayList<>(
				v_ListeCandidatsService.rechercherV_ListeCandidats(v_ListeCandidatsDto, page, size));
		listeCandidats = v_ListeCandidatsMapper.v_ListeCandidatsToV_ListeCandidatsDtos(v_listeCandidats);
		return listeCandidats;
	}

	@RequestMapping(value = "/RechercheTouscandidats", method = RequestMethod.POST)
	public List<V_ListeCandidats> rechercherTousCandidats(@RequestBody V_ListeCandidatsDto NCD) {

		List<V_ListeCandidats> v_listeCandidats = new ArrayList<>(v_ListeCandidatsService.rechercherTousCandidats(NCD));
		return v_listeCandidats;
	}

//	@RequestMapping(value = "/RechercheNouveauxcandidats", method = RequestMethod.POST)
//	public List<V_ListeCandidats> findNouveauCandidats(@RequestBody V_ListeCandidatsDto NCD) {
//
//		List<V_ListeCandidats> v_listeCandidats = new ArrayList<>(
//				v_ListeCandidatsService.rechercherV_ListeNouveauxCandidats(NCD));
//		return v_listeCandidats;
//	}

	@RequestMapping(value = "/candidatsarelancer/{page}/{size}", method = RequestMethod.GET)
	public List<V_ListeCandidatsDto> findAllARelancer(@PathVariable int page, @PathVariable int size) {
		v_ListeCandidatsDto = new V_ListeCandidatsDto();
		List<V_ListeCandidats> v_listeCandidats = new ArrayList<>(
				v_ListeCandidatsService.rechercherV_ListeCandidatsARelancer(v_ListeCandidatsDto, page, size));
		listeCandidats = v_ListeCandidatsMapper.v_ListeCandidatsToV_ListeCandidatsDtos(v_listeCandidats);
		return listeCandidats;
	}

	@RequestMapping(value = "/RechercheCandidatsaRelancer", method = RequestMethod.POST)
	public List<V_ListeCandidats> findCandidatsaRelancer(@RequestBody V_ListeCandidatsDto NCD) {

		List<V_ListeCandidats> v_listeCandidats = new ArrayList<>(
				v_ListeCandidatsService.rechercherCandidatsARelancer(NCD));
		return v_listeCandidats;
	}

	@RequestMapping(value = "/candidatavecentretien/{page}/{size}", method = RequestMethod.GET)
	public List<V_ListeCandidats> rechercherCandidatAvecEntretien(@PathVariable int page, @PathVariable int size,
			Boolean all) {
		return v_ListeCandidatsService.rechercherCandidatAvecEntretien(v_ListeCandidatsDto, page, size, false);
	}

	@RequestMapping(value = "/reporting/{page}/{size}", method = RequestMethod.GET)
	public List<V_ReportingCandidatDto> findReportingCandidats(@PathVariable int page, @PathVariable int size) {

		v_ReportingCandidatDto = new V_ReportingCandidatDto();
		List<V_ReportingCandidat> v_listeCandidats = new ArrayList<>(
				v_ReportingCandidatService.rechercherReportingCandidat(v_ReportingCandidatDto, page, size));
		listeReportingCandidats = v_ReportingCandidatMapper.reportingCandidatsToReportingCandidatDtos(v_listeCandidats);
		return listeReportingCandidats;
	}

//	@RequestMapping(value = "candidat/{id}", method = RequestMethod.GET)
//	public Candidat findById(@PathVariable Long id) {
//		return candidatService.findById(id);
//	}

	@GetMapping(value = "/getcandidatById/{id}", produces = "application/json")
	public Candidat findById(@PathVariable Long id) {
		Candidat candidat = new Candidat();
		candidat = candidatService.findById(id);
		return candidat;
	}

//	@RequestMapping(value = "/downloadNouveauxCandidats", method = RequestMethod.POST)
//	public Model downloadNouveauxCandidats(Model model, @RequestBody V_ListeCandidatsDto NCD) {
//
//		List<V_ListeCandidats> v_listeCandidats = new ArrayList<>(
//				v_ListeCandidatsService.rechercherV_ListeNouveauxCandidats(NCD));
//
//		model.addAttribute("candidats", v_listeCandidats);
//		return model;
//	}

	@RequestMapping(value = "/downloadCandidatsaRelance", method = RequestMethod.POST)
	public Model downloadCandidatsaRelance(Model model, @RequestBody V_ListeCandidatsDto NCD) {

		List<V_ListeCandidats> v_listeCandidats = new ArrayList<>(
				v_ListeCandidatsService.rechercherV_ListeCandidatsARelancer(NCD));

		model.addAttribute("candidats", v_listeCandidats);
		return model;
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Number NbreCandidataRelance() {
		return v_ListeCandidatsService.nberCandidatsARelancer();
	}

	@RequestMapping(value = "/nberCandidats", method = RequestMethod.GET)
	public Number NbreCandidat() {
		return v_ListeCandidatsService.nberCandidats();
	}

	@RequestMapping(value = "/nberNouveauxCandidats", method = RequestMethod.GET)
	public Number NbreNouveauxCandidat() {
		return v_ListeCandidatsService.nberNouveauxCandidats();
	}

	@RequestMapping(value = "/refDisponibilite", method = RequestMethod.GET)
	public List<JSONObject> refDisponibilite() {
		List<JSONObject> result = new ArrayList<JSONObject>();

		for (int i = 0; i < refDisponibilite.length; i++) {
			Disponibilite dis = refDisponibilite[i];
			JSONObject j = new JSONObject();
			j.put("label", dis.getLabel());
			j.put("value", dis);
			result.add(j);
		}
		return result;
	}

	@RequestMapping(value = "CVPDF", method = RequestMethod.POST)
	public void getDownload(HttpServletResponse response, @RequestBody V_ListeCandidatsDto NCD) throws IOException {

		Candidat can = candidatService.findById(NCD.getId());
		// Get your file stream from wherever.
		InputStream myStream = AlfrescoOpenCmis.findDocument(can.getIdCv()).getContentStream().getStream();

		String FileName = AlfrescoOpenCmis.findDocument(can.getIdCv()).getName();

		// Set the content type and attachment header.
		response.addHeader("Content-disposition", "attachment;" + FileName);
		response.setContentType("pdf/plain");

		// Copy the stream to the response's output stream.
		IOUtils.copy(myStream, response.getOutputStream());
		System.out.println(response);
		response.flushBuffer();
	}

	public Disponibilite[] getRefDisponibilite() {
		return refDisponibilite;
	}

	public void setRefDisponibilite(Disponibilite[] refDisponibilite) {
		this.refDisponibilite = refDisponibilite;
	}

	@RequestMapping(value = "/ajoutCandidat", method = RequestMethod.POST)
	public Candidat ajoutCandidat(@RequestBody Candidat entity, @RequestParam String login, @RequestParam String mime) {
		try {
			creerCv(entity, login, mime);
			Candidat candidat = candidatService.createOrUpdate(entity);
			for (CandidatCompetence candidatCompetence : candidat.getCandidatCompetence()) {
				candidatCompetence.getPk().setCandidat(candidat);
				candidatCompetenceService.create(candidatCompetence);
			}
			return candidat;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}

	@RequestMapping(value = "/updateCandidat", method = RequestMethod.PUT)
	public Candidat updateCandidat(@RequestBody Candidat entity) {

		Candidat candidat = candidatService.createOrUpdate(entity);
		List<Competence> listCompetencesCandidat = competenceService.rechercherCandidatCompetences(entity.getId());

		for (Competence competence : listCompetencesCandidat) {
			CandidatCompetence cc = new CandidatCompetence();
			CandidatCompetenceId pk = new CandidatCompetenceId();
			pk.setCandidat(entity);
			pk.setCompetence(competence);
			cc.setPk(pk);
			candidatCompetenceService.delete(cc);
		}

		for (CandidatCompetence candidatCompetence : candidat.getCandidatCompetence()) {
			candidatCompetence.getPk().setCandidat(candidat);
			candidatCompetenceService.create(candidatCompetence);
		}
		return candidat;
	}

	@RequestMapping(value = "convertWordToPdf", method = RequestMethod.POST)
	public JSONObject convertWordToPdf(@RequestBody JSONObject fileJson) {
		String mime = fileJson.get("filetype").toString();
		String nameFile = fileJson.get("filename").toString();
		String value64 = fileJson.get("value").toString();
		String loginUser = fileJson.get("loginUser").toString();

		String realPath = File.separator + "opt" + File.separator + "apache-tomcat8097" + File.separator + "reporting"
				+ File.separator + loginUser;
		byte[] data = Base64.getDecoder().decode(value64);
		InputStream inStream = new ByteArrayInputStream(data);

		Path path = Paths.get(realPath);
		if (!Files.exists(path)) {

			try {
				Files.createDirectories(path);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		String name;
		if (mime.equals("application/msword")) {
			name = nameFile.replace(".doc", ".pdf");
		} else if (mime.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
			name = nameFile.replace(".docx", ".pdf");
		} else if (mime.equals("application/octet-stream")) {
			name = nameFile.replace(".PDF", ".pdf");
		} else
			name = nameFile;
		try {

			if (mime.equals("application/msword")
					|| mime.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {

				com.aspose.words.License license = new com.aspose.words.License();
				license.setLicense("Aspose.Words.Java.lic");
				com.aspose.words.Document doc = new com.aspose.words.Document(inStream);
				doc.save(realPath + File.separator + name);
			} else {
				byte[] buffer = new byte[inStream.available()];
				inStream.read(buffer);

				File targetFile = new File(realPath + File.separator + name);
				OutputStream outStream = new FileOutputStream(targetFile);
				outStream.write(buffer);
			}

			File file = new File(realPath + File.separator + name);
			inStream = new FileInputStream(file);
			byte[] imageBytes = new byte[(int) file.length()];
			inStream.read(imageBytes, 0, imageBytes.length);
			JSONObject j = new JSONObject();
			j.put("realPath", realPath + File.separator + name);
			j.put("value", imageBytes);
			inStream.close();
			return j;

		} catch (Exception e) {
			try {
				inStream.close();
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
				return null;
			}
			System.out.println(e.getMessage());
			return null;
		}
	}

	private void creerCv(Candidat candidat, String login, String mime) throws Exception {
		String realPath = File.separator + "opt" + File.separator + "apache-tomcat8097" + File.separator + "reporting"
				+ File.separator + login + File.separator;
		FileInputStream fileInputStream = new FileInputStream(realPath
				+ candidat.getNomCV().replace(".docx", ".pdf").replace(".doc", ".pdf").replace(".PDF", ".pdf"));
		Document cvAlfresco = AlfrescoOpenCmis.createCv(fileInputStream, genererNomPDF(candidat),
				fileInputStream.getChannel().size(), mime);
		candidat.setIdCv(cvAlfresco.getId());
	}

	private String genererNomPDF(Candidat candidat) {
		DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		int dotPosition = candidat.getNomCV().lastIndexOf(".");
		String extension = "";
		if (dotPosition != -1) {
			extension = candidat.getNomCV().substring(dotPosition);
		}
		return "CV " + candidat.getNom() + " " + candidat.getPrenom() + " - " + df.format(new Date()) + extension;
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

	@PostMapping("/envoyerEmailHorsCibleCandidats")
	public void envoyerEmailHorsCibleCandidats(@RequestBody Candidat candidat, @RequestParam String login,
			@RequestParam String comMotif) {
		JavaMailApi eMailApi = new JavaMailApi();
		List<String> dst = new ArrayList<>();
		Utilisateur connectedUser = utilisateurService.findByLogin(login);
		dst.add(candidat.getCreePar().getEmail());
		String objet = "Candidat  Hors cible " + candidat.getNom() + " " + candidat.getPrenom();
		String content = creeContentEmail(candidat, connectedUser, comMotif);
		List<PieceJointe> pjList = new ArrayList<PieceJointe>();
		eMailApi.setEmailEntretienHorsCible(true);
		eMailApi.envoyerMail(objet, content, dst, connectedUser.getEmail(), "", "", pjList);
		eMailApi.setEmailEntretienHorsCible(false);
	}

	@PostMapping("/envoyerEmailDispoCandidats")
	public void envoyerEmailDispoCandidats(@RequestBody EntretienMail entretienMail, @RequestParam String login) {

		
		Candidat candidat =entretienMail.getCandidat();

		System.out.println(candidat);

		ConvocationMail convocationMail = new ConvocationMail();
		List<String> dst = new ArrayList<>();
		Utilisateur connectedUser = utilisateurService.findByLogin(login);
		List<String> dest =  entretienMail.getDistCopie();
		dst.add(candidat.getEmail());
		try {
			String objet = "Convocation entretien candidat pour ADAMING";
			String content;
			content = creerEmailEntretien(candidat, connectedUser);
			List<PieceJointe> pjList = new ArrayList<PieceJointe>();
			List<JSONObject> files = entretienMail.getPieceJoites();
		//	candidat.setEmailCandidatEnvoyer(true);
			convocationMail.setEmailEntretien(true);
			// convert upload file to PieceJointe
			System.out.println(files);
		if (CollectionUtils.isNotEmpty(files)) {
			for (JSONObject file : files) {
				if (file != null) {
					PieceJointe pieceJointe = new PieceJointe();
					pieceJointe.setFileName(file.get("fileName").toString());
					ByteArrayOutputStream contentFile = new ByteArrayOutputStream((int) file.get("size"));
					byte[] data = Base64.getDecoder().decode(file.get("value").toString());
					contentFile.write(data);
					pieceJointe.setContent(contentFile);
					pieceJointe.setMimeType(file.get("type").toString());
					pjList.add(pieceJointe);
				}
			}
		}
		System.out.println(pjList);
//		convocationMail.envoyerMail(objet, content, dst, "drh@adaming.fr",destinataireEnCci,destinataireEnCcitwo, pjList);
			convocationMail.envoyerMail(objet, content, dst, "achref.cherif@hotmail.com", dest.get(0), dest.get(1),
					pjList);
			convocationMail.setEmailEntretien(false);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		FacesContext.getCurrentInstance().addMessage(null,
//				new FacesMessage(FacesMessage.SEVERITY_INFO, "Mail envoyé avec success", null));
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

		for (CandidatCompetence item : candidat.getCandidatCompetence()) {

			emailContent.append(OPEN_TABLE_COLONE);
			emailContent.append(item.getPk().getCompetence().getLibelle());
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
