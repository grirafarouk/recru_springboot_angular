package com.fr.adaming.rest.controller.administration;

import java.security.NoSuchAlgorithmException;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

	@GetMapping("/all")
	public Collection<Utilisateur> findAll() {
		return utilisateurService.findAll();
	}

	public Utilisateur merge(Utilisateur entity) {
		return utilisateurService.merge(entity);
	}

	@PostMapping("/add")
	public UtilisateurDto create(@RequestBody UtilisateurDto utilisateurDto) throws NoSuchAlgorithmException {
		Utilisateur utilisateur = utilisateurMapper.utilisateurDtoToUtilisateur(utilisateurDto);
		utilisateur.setActif(true);
		utilisateur.setDateCreation(new Date());
		utilisateur.setDateModificationMotPasse(new Date());
		utilisateur.setExpire(false);
		utilisateur.setPassword(Utilitaire.hashMD5Crypt(utilisateur.getPassword()).toString());
		utilisateur = utilisateurService.create(utilisateur);
		return utilisateurMapper.utilisateurToUtilisateurDto(utilisateur);
	}

	@PostMapping("/update")
	public UtilisateurDto update(@RequestBody UtilisateurDto utilisateurDto) {
		Utilisateur utilisateur = utilisateurMapper.utilisateurDtoToUtilisateur(utilisateurDto);
		utilisateur.setDateModificationMotPasse(new Date());
		utilisateur = utilisateurService.update(utilisateur);
		return utilisateurMapper.utilisateurToUtilisateurDto(utilisateur);
	}

	@GetMapping("/{id}")
	public Utilisateur findById(@PathVariable Long id) {
		return utilisateurService.findById(id);
	}

	@DeleteMapping("")
	public void delete(@RequestBody UtilisateurDto utilisateurDto) {
		Utilisateur utilisateur = utilisateurMapper.utilisateurDtoToUtilisateur(utilisateurDto);
		utilisateurService.delete(utilisateur);
	}

	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable Long id) {
		utilisateurService.deleteById(id);
	}

	@GetMapping("/login={login}passw={passw}")
	public Utilisateur findByLoginPass(@PathVariable String login, @PathVariable String passw) {
		return utilisateurService.findByLoginPass(login, passw);
	}

	@GetMapping("/username/{login}")
	public Utilisateur findbyUsernameSpringS(@PathVariable String login) {
		return utilisateurService.findbyUsernameSpringS(login);
	}

	@GetMapping("/login={login}/id={idUser}")
	public Utilisateur findByLoginAndIdUser(@PathVariable String login, @PathVariable Long idUser) {
		return utilisateurService.findByLoginAndIdUser(login, idUser);
	}

	@GetMapping("/login/{login}")
	public Utilisateur findByLogin(@PathVariable String login) {
		return utilisateurService.findByLogin(login);
	}

	@GetMapping("/email/{email}/")
	public Utilisateur findByEmail(@PathVariable String email) {
		return utilisateurService.findByEmail(email);
	}

	@GetMapping("/actif")
	public List<Utilisateur> findAllUserActif() {
		return utilisateurService.findAllUserActif();
	}

	@GetMapping("/usercharge")
	public List<Utilisateur> findAllUserCharge() {
		return utilisateurService.findAllUserCharge();
	}

	@GetMapping("/usersourceur")
	public List<Utilisateur> findAllUserSourceur() {
		return utilisateurService.findAllUserSourceur();
	}

	@GetMapping("/sourceur")
	public List<Utilisateur> findAllSourceurs() {
		return utilisateurService.findAllSourceurs();
	}

	@GetMapping("/charge")
	public List<Utilisateur> findAllCharges() {
		return utilisateurService.findAllCharges();
	}

	@GetMapping("/sourceurpourreporting")
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
