package com.fr.adaming.rest.controller;

import java.io.ByteArrayInputStream;
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
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.chemistry.opencmis.client.api.Document;
import org.apache.chemistry.opencmis.commons.impl.IOUtils;
import org.apache.chemistry.opencmis.commons.impl.json.JSONObject;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.CandidatDto;
import com.fr.adaming.jsfapp.dto.V_ListeCandidatsDto;
import com.fr.adaming.jsfapp.dto.V_ReportingCandidatDto;
import com.fr.adaming.jsfapp.mapper.V_ListeCandidatsMapper;
import com.fr.adaming.jsfapp.mapper.V_ReportingCandidatMapper;
import com.fr.adaming.jsfapp.model.Candidat;
import com.fr.adaming.jsfapp.model.CandidatCompetence;
import com.fr.adaming.jsfapp.model.CodePostal;
import com.fr.adaming.jsfapp.model.V_ListeCandidats;
import com.fr.adaming.jsfapp.model.V_ReportingCandidat;
import com.fr.adaming.jsfapp.services.IV_ListeCandidatsService;
import com.fr.adaming.jsfapp.services.IV_ReportingCandidatService;
import com.fr.adaming.jsfapp.services.impl.AlfrescoOpenCmis;
import com.fr.adaming.jsfapp.services.impl.CandidatCompetenceService;
import com.fr.adaming.jsfapp.services.impl.CandidatService;
import com.fr.adaming.jsfapp.services.impl.CodePostalService;
import com.fr.adaming.jsfapp.enums.Disponibilite;
@RestController
@CrossOrigin("*")
@Controller
public class CandidatController {

	@Autowired
	private CandidatService candidatService;
	@Autowired
	private CandidatCompetenceService candidatCompetenceService;
	
	
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
	private V_ListeCandidatsMapper v_ListeCandidatsMapper = Mappers.getMapper(V_ListeCandidatsMapper.class);
	private V_ReportingCandidatMapper v_ReportingCandidatMapper = Mappers.getMapper(V_ReportingCandidatMapper.class);
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
				v_ListeCandidatsService.rechercherV_ListeNouveauxCandidats(v_ListeCandidatsDto,page, size));
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
				v_ListeCandidatsService.rechercherV_ListeCandidats(v_ListeCandidatsDto,page, size));
		listeCandidats = v_ListeCandidatsMapper.v_ListeCandidatsToV_ListeCandidatsDtos(v_listeCandidats);
		return listeCandidats;
	}
	
	@RequestMapping(value = "/RechercheTouscandidats", method = RequestMethod.POST)
	public List<V_ListeCandidats> rechercherTousCandidats(@RequestBody V_ListeCandidatsDto NCD) {

		List<V_ListeCandidats> v_listeCandidats = new ArrayList<>(
				v_ListeCandidatsService.rechercherTousCandidats(NCD));
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
				v_ListeCandidatsService.rechercherV_ListeCandidatsARelancer(v_ListeCandidatsDto,page, size));
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
	public List<V_ListeCandidats> rechercherCandidatAvecEntretien(@PathVariable int page, @PathVariable int size, Boolean all) {
		return v_ListeCandidatsService.rechercherCandidatAvecEntretien(v_ListeCandidatsDto,page, size, false);
	}
	
	
	@RequestMapping(value = "/reporting/{page}/{size}", method = RequestMethod.GET)
	public List<V_ReportingCandidatDto> findReportingCandidats(@PathVariable int page, @PathVariable int size) {

		v_ReportingCandidatDto = new V_ReportingCandidatDto();
		List<V_ReportingCandidat> v_listeCandidats = new ArrayList<>(
				v_ReportingCandidatService.rechercherReportingCandidat(v_ReportingCandidatDto,page, size));
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
		candidat= candidatService.findById(id);
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
	public Disponibilite[] refDisponibilite() {
		return refDisponibilite;
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
	public Candidat createOrUpdate(@RequestBody Candidat entity, @RequestParam String login,
			@RequestParam String mime) {
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
		FileInputStream fileInputStream = new FileInputStream(realPath + candidat.getNomCV().replace(".docx", ".pdf").replace(".doc", ".pdf").replace(".PDF", ".pdf"));
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

}
