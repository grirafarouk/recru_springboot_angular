package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;




import com.fr.adaming.jsfapp.model.Region;
import com.fr.adaming.jsfapp.model.Utilisateur;

public class SuiviDto implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long id;
	private Utilisateur charge;
	private Boolean mobilite;
	private Boolean relance;
	private Integer anglais ;
	private Date dateRelance;
	private Integer notePresentation  ;
	private Integer noteSavoir ;
	private Integer noteFiabilite ;
	private Integer noteAttrait ;
	private Integer notePret ;
	private Integer noteMobilite ;
	private Integer noteResultat ;
	private Integer noteCoherence;
	private Integer notePistes ;
	private String commentaire;
	private Double noteTotal;
	private List<Region> regions;
	private List<Long> idsRegions;

	public SuiviDto() {
	}

	public Double calculerNoteTotal() {
		
		noteTotal = notePresentation * 0.1 +
				noteSavoir * 0.1 + 
				noteAttrait * 0.08 + 
				noteFiabilite * 0.1
				+ notePret * 0.12 + 
				noteResultat * 0.0168 + 
				noteCoherence * 0.15 + 
				notePistes * 0.1 + 
				noteMobilite * 0.1;
		return noteTotal;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Utilisateur getCharge() {
		return charge;
	}

	public void setCharge(Utilisateur charge) {
		this.charge = charge;
	}

	public Boolean getMobilite() {
		return mobilite;
	}

	public void setMobilite(Boolean mobilite) {
		this.mobilite = mobilite;
	}

	public Boolean getRelance() {
		return relance;
	}

	public void setRelance(Boolean relance) {
		this.relance = relance;
	}

	public Date getDateRelance() {
		return dateRelance;
	}

	public void setDateRelance(Date dateRelance) {
		this.dateRelance = dateRelance;
	}

	public Integer getNotePresentation() {
		if (notePresentation !=null) {
			return notePresentation.intValue();
		}
		return notePresentation;
	}

	public void setNotePresentation(Integer notePresentation) {
		this.notePresentation = (int) notePresentation.doubleValue();
	}

	public Integer getNoteSavoir() {
		if (noteSavoir !=null) {
			return noteSavoir.intValue();
		}
		return noteSavoir;
	}

	public void setNoteSavoir(Integer noteSavoir) {
		this.noteSavoir = (int) noteSavoir.doubleValue();
	}

	public Integer getNoteFiabilite() {
		if (noteFiabilite !=null) {
			return noteFiabilite.intValue();
		}
		return noteFiabilite;
	}

	public void setNoteFiabilite(Integer noteFiabilite) {
		this.noteFiabilite = (int) noteFiabilite.doubleValue();
	}

	public Integer getNoteAttrait() {
		if (noteAttrait !=null) {
			return noteAttrait.intValue();
		}
		return noteAttrait;
	}

	public void setNoteAttrait(Integer noteAttrait) {
		this.noteAttrait = (int) noteAttrait.doubleValue();
	}

	public Integer getNotePret() {
		if (notePret !=null) {
			return notePret.intValue();
		}
		return notePret;
	}

	public void setNotePret(Integer notePret) {
		this.notePret = notePret;
	}

	public Integer getNoteMobilite() {
		if (noteMobilite !=null) {
			return noteMobilite.intValue();
		}
		return noteMobilite;
	}

	public void setNoteMobilite(Integer noteMobilite) {
		this.noteMobilite = (int) noteMobilite.doubleValue();
	}

	public Integer getNoteResultat() {
		return noteResultat;
	}

	public void setNoteResultat(Integer noteResultat) {
		this.noteResultat = (int) noteResultat.doubleValue();
	}

	public Integer getNoteCoherence() {
		if (noteCoherence !=null) {
			return noteCoherence.intValue();
		}
		return noteCoherence;
	}

	public void setNoteCoherence(Integer noteCoherence) {
		this.noteCoherence = (int) noteCoherence.doubleValue();
	}

	public Integer getNotePistes() {
		if (notePistes !=null) {
			return notePistes.intValue();
		}
		return notePistes;
	}

	public void setNotePistes(Integer notePistes) {
		this.notePistes = (int) notePistes.doubleValue();
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public Double getNoteTotal() {
		return noteTotal;
	}

	public List<Region> getRegions() {
		return regions;
	}

	public void setRegions(List<Region> regions) {
		this.regions = regions;
	}

	public Integer getAnglais() {
		return anglais;
	}

	public void setAnglais(Integer anglais) {
		this.anglais = anglais;
	}
	
	public List<Long> getIdsRegions() {
		idsRegions = new ArrayList<>();
		if (regions != null) {
			for (Region r : regions) {
				idsRegions.add(r.getId());
			}
		}
		return idsRegions;
	}

	public void setIdsRegions(List<Long> idsRegions) {
		this.idsRegions = idsRegions;
	}

}
