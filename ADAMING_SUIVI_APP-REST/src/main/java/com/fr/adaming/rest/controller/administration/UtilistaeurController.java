package com.fr.adaming.rest.controller.administration;

import java.security.NoSuchAlgorithmException;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.UtilisateurDto;
import com.fr.adaming.jsfapp.mapper.UtilisateurMapper;
import com.fr.adaming.jsfapp.model.Origine;
import com.fr.adaming.jsfapp.model.Region;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.model.Utilisateur;
import com.fr.adaming.jsfapp.services.IUtilisateurService;
import com.fr.adaming.jsfapp.utils.Utilitaire;

@RestController
@RequestMapping(value = "/api/utilisateurs")
@CrossOrigin("*")
public class UtilistaeurController {

	@Autowired
	private IUtilisateurService utilisateurService;

	private UtilisateurMapper utilisateurMapper = Mappers.getMapper(UtilisateurMapper.class);

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Utilisateur> findAll() {
		return utilisateurService.findAll();
	}

	public Utilisateur merge(Utilisateur entity) {
		return utilisateurService.merge(entity);
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public UtilisateurDto create(@RequestBody UtilisateurDto utilisateurDto) throws NoSuchAlgorithmException {
		Utilisateur utilisateur = utilisateurMapper.utilisateurDtoToUtilisateur(utilisateurDto);
		utilisateur.setActif(true);
		utilisateur.setDateCreation(new Date());
		utilisateur.setDateModificationMotPasse(new Date());
		utilisateur.setExpire(false);
		utilisateur.setPassword(Utilitaire.hashMD5Crypt(utilisateur.getPassword()));
		utilisateur = utilisateurService.create(utilisateur);
		return utilisateurMapper.utilisateurToUtilisateurDto(utilisateur);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public UtilisateurDto Update(@RequestBody UtilisateurDto utilisateurDto) {
		Utilisateur utilisateur = utilisateurMapper.utilisateurDtoToUtilisateur(utilisateurDto);
		utilisateur.setDateModificationMotPasse(new Date());
		utilisateur = utilisateurService.update(utilisateur);
		return utilisateurMapper.utilisateurToUtilisateurDto(utilisateur);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Utilisateur findById(@PathVariable Long id) {
		return utilisateurService.findById(id);
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody UtilisateurDto utilisateurDto) {
		Utilisateur utilisateur = utilisateurMapper.utilisateurDtoToUtilisateur(utilisateurDto);
		utilisateurService.delete(utilisateur);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		utilisateurService.deleteById(id);
	}

	@RequestMapping(value = "/login={login}passw={passw}", method = RequestMethod.GET)
	public Utilisateur findByLoginPass(@PathVariable String login, @PathVariable String passw) {
		return utilisateurService.findByLoginPass(login, passw);
	}

	@RequestMapping(value = "/username/{login}", method = RequestMethod.GET)
	public Utilisateur findbyUsernameSpringS(@PathVariable String login) {
		return utilisateurService.findbyUsernameSpringS(login);
	}

	@RequestMapping(value = "/login={login}/id={idUser}", method = RequestMethod.GET)
	public Utilisateur findByLoginAndIdUser(@PathVariable String login, @PathVariable Long idUser) {
		return utilisateurService.findByLoginAndIdUser(login, idUser);
	}

	@RequestMapping(value = "/login/{login}", method = RequestMethod.GET)
	public Utilisateur findByLogin(@PathVariable String login) {
		return utilisateurService.findByLogin(login);
	}

	@RequestMapping(value = "/email/{email}/", method = RequestMethod.GET)
	public Utilisateur findByEmail(@PathVariable String email) {
		return utilisateurService.findByEmail(email);
	}

	@RequestMapping(value = "/actif", method = RequestMethod.GET)
	public List<Utilisateur> findAllUserActif() {
		return utilisateurService.findAllUserActif();
	}

	@RequestMapping(value = "/usercharge", method = RequestMethod.GET)
	public List<Utilisateur> findAllUserCharge() {
		return utilisateurService.findAllUserCharge();
	}

	@RequestMapping(value = "/usersourceur", method = RequestMethod.GET)
	public List<Utilisateur> findAllUserSourceur() {
		return utilisateurService.findAllUserSourceur();
	}

	@RequestMapping(value = "/sourceur", method = RequestMethod.GET)
	public List<Utilisateur> findAllSourceurs() {
		return utilisateurService.findAllSourceurs();
	}

	@RequestMapping(value = "/charge", method = RequestMethod.GET)
	public List<Utilisateur> findAllCharges() {
		return utilisateurService.findAllCharges();
	}

	@RequestMapping(value = "/sourceurpourreporting", method = RequestMethod.GET)
	public List<Utilisateur> rechercherSourceurPourReporting() {
		return utilisateurService.rechercherSourceurPourReporting();
	}

	public Integer nbrCVParSourceurParRegion(Utilisateur utilisateur, Region region, Date dateDebut, Date dateFin) {
		return utilisateurService.nbrCVParSourceurParRegion(utilisateur, region, dateDebut, dateFin);
	}

	public Integer nbrCVParOrigineParTechnologie(Origine origine, Technologie technologie, Date dateDebut,
			Date dateFin) {
		return utilisateurService.nbrCVParOrigineParTechnologie(origine, technologie, dateDebut, dateFin);
	}

	public Integer nbrCVParChargeParTechnologie(Utilisateur utilisateur, Technologie technologie, Date dateDebut,
			Date dateFin) {
		return utilisateurService.nbrCVParChargeParTechnologie(utilisateur, technologie, dateDebut, dateFin);
	}

	public Integer nbrCVParSourceurParOrigine(Utilisateur utilisateur, Origine origine, Date dateDebut, Date dateFin,
			boolean horsCible) {
		return utilisateurService.nbrCVParSourceurParOrigine(utilisateur, origine, dateDebut, dateFin, horsCible);
	}

	public Integer nbrCVParSourceur(Utilisateur utilisateur, Date dateDebut, Date dateFin, boolean horsCible,
			boolean disponible) {
		return utilisateurService.nbrCVParSourceur(utilisateur, dateDebut, dateFin, horsCible, disponible);
	}

	public Integer nbrCVParSourceurParTechnologie(Utilisateur utilisateur, Technologie technologie, Date dateDebut,
			Date dateFin) {
		return utilisateurService.nbrCVParSourceurParTechnologie(utilisateur, technologie, dateDebut, dateFin);
	}

}
