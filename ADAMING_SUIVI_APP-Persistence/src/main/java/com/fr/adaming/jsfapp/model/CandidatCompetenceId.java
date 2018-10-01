package com.fr.adaming.jsfapp.model;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

@Embeddable
public class CandidatCompetenceId implements java.io.Serializable {

/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
private Candidat candidat;
private Competence competence;


@ManyToOne
public Candidat getCandidat() {
	return candidat;
}
public void setCandidat(Candidat candidat) {
	this.candidat = candidat;
}

@ManyToOne
public Competence getCompetence() {
	return competence;
}
public void setCompetence(Competence competence) {
	this.competence = competence;
}

public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    CandidatCompetenceId that = (CandidatCompetenceId) o;

    if (candidat != null ? !candidat.equals(that.candidat) : that.candidat != null) return false;
    if (competence != null ? !competence.equals(that.competence) : that.competence != null)
        return false;

    return true;
}

public int hashCode() {
    int result;
    result = (candidat != null ? candidat.hashCode() : 0);
    result = 31 * result + (competence != null ? competence.hashCode() : 0);
    return result;
}
}
