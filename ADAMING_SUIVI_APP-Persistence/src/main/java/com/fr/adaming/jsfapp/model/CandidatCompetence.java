package com.fr.adaming.jsfapp.model;

import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "candidat_competence")
@AssociationOverrides({ @AssociationOverride(name = "pk.candidat", joinColumns = @JoinColumn(name = "CANDIDAT_ID")),
		@AssociationOverride(name = "pk.competence", joinColumns = @JoinColumn(name = "COMPETENCE_ID")) })
public class CandidatCompetence implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private CandidatCompetenceId pk = new CandidatCompetenceId();

	@EmbeddedId
	public CandidatCompetenceId getPk() {
		return pk;
	}

	public void setPk(CandidatCompetenceId pk) {
		this.pk = pk;
	}

	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		CandidatCompetence that = (CandidatCompetence) o;

		if (getPk() != null ? !getPk().equals(that.getPk()) : that.getPk() != null)
			return false;

		return true;
	}

	public int hashCode() {
		return (getPk() != null ? getPk().hashCode() : 0);
	}
}
