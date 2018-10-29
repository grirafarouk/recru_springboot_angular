package com.fr.adaming.jsfapp.dao.impl;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.IUtilisateurDao;
import com.fr.adaming.jsfapp.dto.ReportingChargeRelanceDto;
import com.fr.adaming.jsfapp.dto.ReportingListSourceurDto;
import com.fr.adaming.jsfapp.dto.ReportingSourceurParDispoDto;
import com.fr.adaming.jsfapp.dto.ReportingSourceurTechnologieDto;
import com.fr.adaming.jsfapp.enums.Profil;
import com.fr.adaming.jsfapp.model.Origine;
import com.fr.adaming.jsfapp.model.Region;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.model.Utilisateur;

/**
 * 
 * @author Elyess Tekaya
 * 
 */
@Repository("utilisateurDao")
public class UtilisateurDao extends ManagerDao<Utilisateur, Long> implements
		IUtilisateurDao {

	/**
	 * 
	 * 
	 * @see com.fr.adaming.jsfapp.dao.IUtilisateurDao#findbyLoginPass(java.lang.String,
	 *      java.lang.String)
	 * @param login
	 * @param passw
	 * @return
	 * 
	 */
	DateFormat df = new SimpleDateFormat("yyyy-MM-dd");

	@Override
	public Utilisateur findbyLoginPass(String login, String passw) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		crit.add(Restrictions.eq("login", login));
		crit.add(Restrictions.eq("password", passw));

		List<Utilisateur> liste = DaoUtils.castList(Utilisateur.class,
				crit.list());

		if (CollectionUtils.isNotEmpty(liste)) {
			return liste.get(0);
		}
		return null;

	}

	/**
	 * 
	 * 
	 * @see com.fr.adaming.jsfapp.dao.IUtilisateurDao#findbyUsernameSpringS(java.lang.String)
	 * @param login
	 * @return
	 * 
	 */
	@Override
	public Utilisateur findbyUsernameSpringS(String login) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);
		DaoUtils.addEqRestrictionIfNotNull(crit, "login", login);
		crit.add(Restrictions.eq("actif", true));

		List<Utilisateur> liste = DaoUtils.castList(Utilisateur.class,
				crit.list());

		if (CollectionUtils.isNotEmpty(liste) && liste.size() == 1) {
			return liste.get(0);
		}
		return null;
	}

	/**
	 * 
	 * 
	 * @see com.fr.adaming.jsfapp.dao.IUtilisateurDao#findByLoginAndIdUser(java.lang.String,
	 *      java.lang.Long)
	 * @param login
	 * @param idUser
	 * @return
	 * 
	 */
	@Override
	public Utilisateur findByLoginAndIdUser(String login, Long idUser) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);
		DaoUtils.addEqRestrictionIfNotNull(crit, "login", login);
		DaoUtils.addEqRestrictionIfNotNull(crit, "idUtilisateur", idUser);

		List<Utilisateur> liste = DaoUtils.castList(Utilisateur.class,
				crit.list());

		if (CollectionUtils.isNotEmpty(liste) && liste.size() == 1) {
			return liste.get(0);
		}
		return null;

	}

	@Override
	public Utilisateur findByLogin(String login) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "login", login);

		List<Utilisateur> liste = DaoUtils.castList(Utilisateur.class,
				crit.list());

		if (CollectionUtils.isNotEmpty(liste) && liste.size() == 1) {
			return liste.get(0);
		}
		return null;

	}

	@Override
	public Utilisateur findUserByToken(String token) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "token", token);

		List<Utilisateur> liste = DaoUtils.castList(Utilisateur.class,
				crit.list());

		if (CollectionUtils.isNotEmpty(liste) && liste.size() == 1) {
			return liste.get(0);
		}
		return null;
	}

	@Override
	public List<Utilisateur> findAllUserActif() {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		crit.add(Restrictions.eq("actif", true));

		return DaoUtils.castList(Utilisateur.class, crit.list());
	}

	@Override
	public Utilisateur findByEmail(String email) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "email", email);

		return (Utilisateur) crit.uniqueResult();
	}

	@Override
	public List<Utilisateur> findAllUserCharge() {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		List<Profil> liste = new ArrayList<>();
		liste.add(Profil.ADMINISTRATEUR);
		liste.add(Profil.CHARGE);
		liste.add(Profil.DIRECTION);
		crit.add(Restrictions.in("profil", liste));

		return DaoUtils.castList(Utilisateur.class, crit.list());
	}

	@Override
	public List<Utilisateur> findAllUserSourceur() {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		List<Profil> liste = new ArrayList<>();
		liste.add(Profil.ADMINISTRATEUR);
		liste.add(Profil.CHARGE);
		liste.add(Profil.COMMERCIAL);
		liste.add(Profil.DIRECTION);
		liste.add(Profil.SOURCEUR);
		crit.add(Restrictions.in("profil", liste));

		return DaoUtils.castList(Utilisateur.class, crit.list());
	}
	

	@Override
	public List<Utilisateur> rechercherSourceurPourReporting() {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		List<Profil> liste = new ArrayList<>();
		liste.add(Profil.ADMINISTRATEUR);
		liste.add(Profil.CHARGE);
		liste.add(Profil.COMMERCIAL);
		liste.add(Profil.DIRECTION);
		liste.add(Profil.SOURCEUR);
		crit.add(Restrictions.in("profil", liste));

		crit.add(Restrictions.eq("reporting", true));

		return DaoUtils.castList(Utilisateur.class, crit.list());
	}

	@Override
	public List<Utilisateur> findAllSourceurs() {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);
		List<Profil> liste = new ArrayList<>();
		liste.add(Profil.ADMINISTRATEUR);
		liste.add(Profil.CHARGE);
		liste.add(Profil.SOURCEUR);
		crit.add(Restrictions.in("profil", liste));
		crit.add(Restrictions.eq("actif", true));

		return DaoUtils.castList(Utilisateur.class, crit.list());
	}

	@Override
	public List<Utilisateur> findAllCharges() {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Utilisateur.class);

		crit.add(Restrictions.eq("profil", Profil.CHARGE));
		crit.add(Restrictions.eq("actif", true));

		return DaoUtils.castList(Utilisateur.class, crit.list());
	}

	@Override
	public Integer nbrCVParSourceurParRegion(Utilisateur utilisateur,
			Region region, Date dateDebut, Date dateFin) {
		int nbr = 0;

		String query = "SELECT Count(c.ID) FROM candidat AS c Inner Join code_postal AS cp ON c.CODE_POSTAL = cp.ID  WHERE c.CREE_PAR = "
				+ utilisateur.getId()
				+ " AND c.DATE_INSCRIPTION BETWEEN '"
				+ df.format(dateDebut)
				+ " 00:00:00' AND '"
				+ df.format(dateFin)
				+ " 23:59:59' AND cp.ID_REGION = "
				+ region.getId() + "";
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParOrigineParTechnologie(Origine origine,
			Technologie technologie, Date dateDebut, Date dateFin) {
		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c  Inner Join utilisateur AS u ON c.CREE_PAR = u.ID WHERE c.ORIGINE = "
				+ origine.getId()
				+ " AND c.DATE_INSCRIPTION BETWEEN '"
				+ df.format(dateDebut)
				+ " 00:00:00' AND '"
				+ df.format(dateFin)
				+ " 23:59:59' AND c.TECHNOLOGIE = "
				+ technologie.getId() + " AND u.PROFIL= 2 AND u.ACTIF=1";
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParChargeParTechnologie(Utilisateur utilisateur,
			Technologie technologie, Date dateDebut, Date dateFin) {
		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c Inner Join entretien AS e ON c.ENTRETIEN = e.ID Inner Join utilisateur AS u ON e.CHARGE = u.ID WHERE u.ID = "
				+ utilisateur.getId()
				+ " AND c.DATE_INSCRIPTION BETWEEN '"
				+ df.format(dateDebut)
				+ " 00:00:00' AND '"
				+ df.format(dateFin)
				+ " 23:59:59' AND c.TECHNOLOGIE = "
				+ technologie.getId() + "";
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParSourceurParOrigine(Utilisateur utilisateur,
			Origine origine, Date dateDebut, Date dateFin, boolean horsCible) {
		int nbr = 0;
		String query;
		if (horsCible) {
			query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c Inner Join entretien AS e ON c.ENTRETIEN = e.ID WHERE  c.CREE_PAR= "
					+ utilisateur.getId()
					+ " AND c.DATE_INSCRIPTION BETWEEN '"
					+ df.format(dateDebut)
					+ " 00:00:00' AND '"
					+ df.format(dateFin)
					+ " 23:59:59' AND c.ORIGINE= "
					+ origine.getId() + "";
			query += " AND (e.DISPONIBLE=8 OR e.PERTINENCE IN ('0','1'))";
		} else {
			query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c WHERE  c.CREE_PAR= "
					+ utilisateur.getId()
					+ " AND c.DATE_INSCRIPTION BETWEEN '"
					+ df.format(dateDebut)
					+ " 00:00:00' AND '"
					+ df.format(dateFin)
					+ " 23:59:59' AND c.ORIGINE= "
					+ origine.getId() + "";
		}
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}

	@Override
	public Integer nbrCVParSourceur(Utilisateur utilisateur, Date dateDebut,
			Date dateFin, boolean horsCible, boolean disponible) {

		int nbr = 0;
		String query;
		if (horsCible) {
			query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c Inner Join entretien AS e ON c.ENTRETIEN = e.ID WHERE  c.CREE_PAR= "
					+ utilisateur.getId();
			if (dateDebut != null && dateFin != null) {
				query += " AND c.DATE_INSCRIPTION BETWEEN '"
						+ df.format(dateDebut) + " 00:00:00' AND '"
						+ df.format(dateFin) + " 23:59:59' ";
			}
			query += " AND (e.DISPONIBLE=8)";
		} else if (disponible) {
			query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c Inner Join entretien AS e ON c.ENTRETIEN = e.ID WHERE  c.CREE_PAR= "
					+ utilisateur.getId();
			if (dateDebut != null && dateFin != null) {
				query += " AND c.DATE_INSCRIPTION BETWEEN '"
						+ df.format(dateDebut) + " 00:00:00' AND '"
						+ df.format(dateFin) + " 23:59:59'";
			}
			query += " AND (e.DISPONIBLE=0)";
		} else {
			query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c WHERE  c.CREE_PAR= "
					+ utilisateur.getId();
			if (dateDebut != null && dateFin != null) {
				query += " AND c.DATE_INSCRIPTION BETWEEN '"
						+ df.format(dateDebut) + " 00:00:00' AND '"
						+ df.format(dateFin) + " 23:59:59' ";
			}
		}
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}
	
	
	@Override
	public Integer nbrCVParSourceurParMainframe(Utilisateur utilisateur) {

		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') FROM candidat Inner Join utilisateur ON candidat.CREE_PAR = utilisateur.ID where candidat.DATE_INSCRIPTION Between CURRENT_DATE-1 and CURRENT_DATE and candidat.TECHNOLOGIE=6  and utilisateur.ID ="
					+ utilisateur.getId();

		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}
	
	@Override
	public Integer nbrCVParSourceurParMainframePlus(Utilisateur utilisateur) {

		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') FROM candidat Inner Join utilisateur ON candidat.CREE_PAR = utilisateur.ID where candidat.DATE_INSCRIPTION Between CURRENT_DATE-1 and CURRENT_DATE and candidat.TECHNOLOGIE=8  and utilisateur.ID ="
					+ utilisateur.getId();

		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}
	
	@Override
	public Integer nbrCVParSourceurParNtic(Utilisateur utilisateur) {

		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') FROM candidat Inner Join utilisateur ON candidat.CREE_PAR = utilisateur.ID where candidat.DATE_INSCRIPTION Between CURRENT_DATE-1 and CURRENT_DATE and candidat.TECHNOLOGIE=7  and utilisateur.ID ="
					+ utilisateur.getId();

		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}
	
	@Override
	public Integer nbrCVParSourceurAutreTechnologie(Utilisateur utilisateur) {

		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') FROM candidat Inner Join utilisateur ON candidat.CREE_PAR = utilisateur.ID where  candidat.DATE_INSCRIPTION Between CURRENT_DATE-1 and CURRENT_DATE and candidat.TECHNOLOGIE <> 6 and candidat.TECHNOLOGIE <> 7 and candidat.TECHNOLOGIE <> 8  and utilisateur.ID ="
					+ utilisateur.getId();

		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}
	
	@Override
	public Integer nbrCVParSourceurParTechnologie(Utilisateur utilisateur,
			Technologie technologie, Date dateDebut, Date dateFin) {

		int nbr = 0;
		String query = "SELECT Count('disticnt(c.ID)') AS nbr FROM candidat AS c Inner Join utilisateur AS u ON c.CREE_PAR = u.ID where u.ID = "
				+ utilisateur.getId() + " ";
		if (dateDebut != null && dateFin != null) {
			query += " AND c.DATE_INSCRIPTION BETWEEN '" + df.format(dateDebut)
					+ " 00:00:00' AND '" + df.format(dateFin) + " 23:59:59'";
		}
		query += " AND c.TECHNOLOGIE = " + technologie.getId() + "";
		SQLQuery st = getSession().createSQLQuery(query);
		nbr = ((BigInteger) st.uniqueResult()).intValue();
		return nbr;
	}
	
	@Override
	public List<ReportingChargeRelanceDto> rechercherChargeParRelance() {
		String query = "(select group_concat(tmp.nom,' ',tmp.PRENOM separator '') as NOM_PRENOM_CHARGE,tmp.NOMBRE_RELANCE AS cv_relancer,tmp.ID "+
						"FROM "+
						"( "+
						"select "+
						"u.ID as ID,u.nom,u.PRENOM,sum(case when (e.RELANCE is not null and e.RELANCE) then 1 else 0 end) AS NOMBRE_RELANCE "+
						"FROM candidat c "+
						"join entretien e on e.ID=c.ENTRETIEN "+
						"join utilisateur u on u.ID=e.CHARGE where u.PROFIL=1 and e.DATE_RELANCE < CURRENT_DATE() "+
						"GROUP BY u.id "+
						") "+
						"as tmp GROUP BY tmp.ID)";

		SQLQuery st = getSession().createSQLQuery(query);
		List<ReportingChargeRelanceDto> data = new  ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = (List<Object[]>) st.list();
		if(!dataObject.isEmpty())
		{
			for(Object [] o : dataObject)
			{
				String nom = (String) o[0];
				BigDecimal nbrRelance = (BigDecimal) o[1]; 
				BigInteger idUser = (BigInteger) o[2]; 

				data.add(new ReportingChargeRelanceDto(nom,nbrRelance,idUser));
				
			}
		}
		
		return data;
	}
	
	@Override
	public List<ReportingSourceurTechnologieDto> rechercherSourceurTechnologies() {
		String query = "(select group_concat(tmp.nom,' ',tmp.PRENOM separator '') as NOM_PRENOM_SOURCEUR,"+
						"tmp.MAINFRAMME,"+
						"tmp.MAINFRAMME_PLUS,"+
						"tmp.NTIC,"+
						"tmp.AUTRE_TECHNO,"+
						"tmp.TOTAL "+
						"FROM "+
						"("+
						"select u.NOM,u.PRENOM, "+
						"SUM( case when (t.libelle = 'MAINFRAME') then 1 else 0  end ) as MAINFRAMME,"+
						"SUM( case when (t.libelle = 'MAINFRAME ++') then 1 else 0  end ) as MAINFRAMME_PLUS,"+
						"SUM(case when (t.libelle = 'NTIC') then 1 else 0 end ) as NTIC,"+
						"SUM( case when (t.libelle <> 'NTIC' and t.libelle <> 'MAINFRAME ++' and t.libelle <> 'MAINFRAME') then 1 else 0 end ) as AUTRE_TECHNO,"+
						"count(*) as TOTAL,u.ID as ID "+
						"FROM candidat c "+ 
						"JOIN utilisateur u on u.ID = c.CREE_PAR "+
						"JOIN technologie t on t.ID = c.TECHNOLOGIE "+
						"WHERE c.DATE_INSCRIPTION < CURRENT_DATE AND c.DATE_INSCRIPTION >= (CURRENT_DATE + INTERVAL -1 DAY) "+
						"group by u.ID ) as tmp group by ID )"+
         	 			" UNION "+ 
	   					"( select case when (u.NOM <> '') then 'TOTAL' end,"+
	   					"SUM(case when (t.libelle = 'MAINFRAME') then 1 else 0 end ) as MAINFRAMME,"+
	   					"SUM(case when (t.libelle = 'MAINFRAME ++') then 1 else 0 end ) as MAINFRAMME_PLUS,"+
	   					"SUM(case when (t.libelle = 'NTIC') then 1 else 0 end ) as NTIC,"+
	   					"SUM(case when (t.libelle <> 'NTIC' and t.libelle <> 'MAINFRAME ++' and t.libelle <> 'MAINFRAME') then 1 else 0 end) as AUTRE_TECHNO,"+
	   					"count(*) as TOTAL "+
	   					"FROM candidat c "+ 
	   					"JOIN utilisateur u on u.ID = c.CREE_PAR "+
	   					"JOIN technologie t on t.ID = c.TECHNOLOGIE WHERE c.DATE_INSCRIPTION < CURRENT_DATE AND c.DATE_INSCRIPTION >= (CURRENT_DATE + INTERVAL -1 DAY)) ";

	
		SQLQuery st = getSession().createSQLQuery(query);
		List<ReportingSourceurTechnologieDto> data = new  ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = (List<Object[]>) st.list();
		if(!dataObject.isEmpty())
		{
			for(Object [] o : dataObject)
			{
				String nom = (String) o[0];
				BigDecimal mainFrame = (BigDecimal) o[1]; 
				BigDecimal mainFramePlus = (BigDecimal) o[2]; 
				BigDecimal nbrNtic = (BigDecimal) o[3]; 
				BigDecimal autreTechno = (BigDecimal) o[4]; 
				BigInteger  total = (BigInteger) o[5];
				data.add(new ReportingSourceurTechnologieDto(nom,mainFrame,mainFramePlus,nbrNtic,autreTechno,total));
				
			}
		}
		
		return data;
	}
	
	@Override
	public List<ReportingListSourceurDto> rechercherReportingListSourceur() {
		String query = "(select "+
						"tmp.ID as id_sourceur, "+
						"group_concat(tmp.nom,' ',tmp.PRENOM separator '') as NOM_PRENOM_SOURCEUR "+
						"FROM "+
						"( "+
								"select u.NOM,u.PRENOM,u.ID as ID "+
								"FROM utilisateur u "+
								"where u.PROFIL <> 5 "+
								"group by u.ID) "+
								"as tmp group by ID )";

		SQLQuery st = getSession().createSQLQuery(query);
		
		List<ReportingListSourceurDto> data = new  ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = (List<Object[]>) st.list();
		if(!dataObject.isEmpty())
		{
			for(Object [] o : dataObject)
			{	
				BigInteger idUser = (BigInteger) o[0];
				String nom = (String) o[1];
				data.add(new ReportingListSourceurDto(idUser,nom));
				
			}
		}
		
		return data;
	}
	
	@Override
	public List<ReportingSourceurParDispoDto> rechercherReportingSourceurParDispo(ReportingListSourceurDto utilisateur, Date dateDebut,
			Date dateFin) {
		String query = "(select "+
						"tmp.ID as id_sourceur, "+
						"group_concat(tmp.nom,' ',tmp.PRENOM separator '') as NOM_PRENOM_SOURCEUR, "+
						"tmp.nombre as nombre_total, "+
						 "IFNULL(tmp.nombre_dipo,0) as nombre_dispo, "+
						 "IFNULL(tmp.nombre_hors,0) as nombre_hors, "+
						 "IFNULL(tmp.autre,0) as autre, "+
						 "IFNULL(tmp.taux_satis,0) as satis, "+
						 "IFNULL(tmp.taux_hors,0) as hors "+
						"FROM "+ 
						"( "+
								"select u.NOM,u.PRENOM,u.ID as ID, "+
								 "SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end ) as nombre, "+
								 "IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=0) ),0) as nombre_dipo, "+
								 "IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=8) ),0) as nombre_hors, "+
								 "IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE<>0)  AND (e.DISPONIBLE<>8)),0) as autre, "+
								 "(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end )- (IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=8)),0)))/(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end ))*100 as taux_satis, "+
								 "(IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=8) ),0)/SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end ))*100 as taux_hors "+
								"FROM candidat c "+
								"LEFT JOIN entretien e on e.ID=c.ENTRETIEN "+
								"JOIN utilisateur u on u.ID = c.CREE_PAR ";
//							if (dateDebut != null && dateFin != null && utilisateur!=null) {
//								query +="WHERE  c.DATE_INSCRIPTION BETWEEN '"+
//								df.format(dateDebut) + " 00:00:00' AND '"+
//								df.format(dateFin) + " 23:59:59' "+
//								" AND c.CREE_PAR = "+ utilisateur.getIdUser();
//							}
//							else 
							if (utilisateur!=null) {
								query +=" WHERE c.CREE_PAR = "+ utilisateur.getIdUser();
							}
								query +=" group by u.ID) "+
								"as tmp group by ID )";

		SQLQuery st = getSession().createSQLQuery(query);
		
		List<ReportingSourceurParDispoDto> data = new  ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = (List<Object[]>) st.list();
		if(!dataObject.isEmpty())
		{
			for(Object [] o : dataObject)
			{
				BigInteger idUser = (BigInteger) o[0];
				String nom = (String) o[1];
				BigDecimal nbrTotal = (BigDecimal) o[2];
				BigDecimal nbrDispo = (BigDecimal) o[3];
				BigDecimal nbrHors = (BigDecimal) o[4]; 
				BigDecimal autre = (BigDecimal) o[5];
				BigDecimal taux_satis = (BigDecimal) o[6]; 
				BigDecimal taux_hors = (BigDecimal) o[7]; 
				taux_satis = taux_satis.setScale(0, RoundingMode.HALF_UP);

			
				data.add(new ReportingSourceurParDispoDto(idUser,nom,nbrTotal,nbrDispo,nbrHors,autre,taux_satis,taux_hors));
				
			}
		}
		
		return data;
	}
	
	@Override
	public List<ReportingSourceurParDispoDto> rechercherReportingSourceur() {
		String query = "(select "+
						"tmp.ID as id_sourceur, "+
						"group_concat(tmp.nom,' ',tmp.PRENOM separator '') as NOM_PRENOM_SOURCEUR, "+
						"tmp.nombre as nombre_total, "+
						 "IFNULL(tmp.nombre_dipo,0) as nombre_dispo, "+
						 "IFNULL(tmp.nombre_hors,0) as nombre_hors, "+
						 "IFNULL(tmp.autre,0) as autre, "+
						 "IFNULL(tmp.taux_satis,0) as satis, "+
						 "IFNULL(tmp.taux_hors,0) as hors "+
						"FROM "+ 
						"( "+
								"select u.NOM,u.PRENOM,u.ID as ID, "+
								 "SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end ) as nombre, "+
								 "IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=0) ),0) as nombre_dipo, "+
								 "IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=8) ),0) as nombre_hors, "+
								 "IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE<>0)  AND (e.DISPONIBLE<>8)),0) as autre, "+
								 "(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end )- (IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=8)),0)))/(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end ))*100 as taux_satis, "+
								 "(IFNULL(SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end AND (e.DISPONIBLE=8) ),0)/SUM(case when (c.CREE_PAR = u.ID) then 1 else 0 end ))*100 as taux_hors "+
								"FROM candidat c "+
								"LEFT JOIN entretien e on e.ID=c.ENTRETIEN "+
								"JOIN utilisateur u on u.ID = c.CREE_PAR ";
								query +=" group by u.ID) "+
								"as tmp group by ID )";

		SQLQuery st = getSession().createSQLQuery(query);
		
		List<ReportingSourceurParDispoDto> data = new  ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = (List<Object[]>) st.list();
		if(!dataObject.isEmpty())
		{
			for(Object [] o : dataObject)
			{
				BigInteger idUser = (BigInteger) o[0];
				String nom = (String) o[1];
				BigDecimal nbrTotal = (BigDecimal) o[2];
				BigDecimal nbrDispo = (BigDecimal) o[3];
				BigDecimal nbrHors = (BigDecimal) o[4]; 
				BigDecimal autre = (BigDecimal) o[5];
				BigDecimal taux_satis = (BigDecimal) o[6]; 
				BigDecimal taux_hors = (BigDecimal) o[7]; 
				taux_satis = taux_satis.setScale(0, RoundingMode.HALF_UP);

			
				data.add(new ReportingSourceurParDispoDto(idUser,nom,nbrTotal,nbrDispo,nbrHors,autre,taux_satis,taux_hors));
				
			}
		}
		
		return data;
	}
	
	@Override
	public HashMap<String, Integer> ReportingCVParTechnologieParSourceur() {
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		String query = "select "+
						"t.libelle AS nom_techno,SUM(case when (c.TECHNOLOGIE = t.ID) then 1 else 0 end ) as nombre "+
						"FROM candidat c "+
						"join technologie t on t.ID=c.TECHNOLOGIE ";
//						if (dateDebut != null && dateFin != null && utilisateur!=null) {
//							query +="WHERE  c.DATE_INSCRIPTION BETWEEN '"+
//							df.format(dateDebut) + " 00:00:00' AND '"+
//							df.format(dateFin) + " 23:59:59' "+
//							" AND c.CREE_PAR = "+ utilisateur.getIdUser();
//						}
//						else if (utilisateur!=null) {
//							query +=" AND c.CREE_PAR = "+ utilisateur.getIdUser();
//						}
						query +=" GROUP BY t.ID ";
						query +="ORDER BY t.ID";

		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = (List<Object[]>) st.list();
		if(!dataObject.isEmpty())
		{
			for(Object [] o : dataObject)
			{
				String nom = (String) o[0];
				BigDecimal nbr = (BigDecimal) o[1]; 
				

				map.put(nom,nbr.intValue());
				
			}
			
		}
		
		return map;
	}
	
	@Override
	public HashMap<String, Integer> rechercherReportingCVParTechnologieParSourceur(ReportingListSourceurDto utilisateur, Date dateDebut,
			Date dateFin) {
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		String query = "select "+
						"t.libelle AS nom_techno,SUM(case when (c.TECHNOLOGIE = t.ID) then 1 else 0 end ) as nombre "+
						"FROM candidat c "+
						"join technologie t on t.ID=c.TECHNOLOGIE ";
//						if (dateDebut != null && dateFin != null && utilisateur!=null) {
//							query +="WHERE  c.DATE_INSCRIPTION BETWEEN '"+
//							df.format(dateDebut) + " 00:00:00' AND '"+
//							df.format(dateFin) + " 23:59:59' "+
//							" AND c.CREE_PAR = "+ utilisateur.getIdUser();
//						}
//						else 
						if (utilisateur!=null) {
							query +=" AND c.CREE_PAR = "+ utilisateur.getIdUser();
						}
						query +=" GROUP BY t.ID ";
						query +="ORDER BY t.ID";

		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		final List<Object[]> dataObject = (List<Object[]>) st.list();
		if(!dataObject.isEmpty())
		{
			for(Object [] o : dataObject)
			{
				String nom = (String) o[0];
				BigDecimal nbr = (BigDecimal) o[1]; 
				

				map.put(nom,nbr.intValue());
				
			}
			
		}
		
		return map;
	}
}
