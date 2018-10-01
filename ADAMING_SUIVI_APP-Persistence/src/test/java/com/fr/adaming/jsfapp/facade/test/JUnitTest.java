//package com.fr.adaming.jsfapp.facade.test;
//
//import org.hamcrest.core.Is;
//import org.hamcrest.core.IsNot;
//import org.junit.Assert;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.transaction.TransactionConfiguration;
//
//import com.fr.adaming.jsfapp.dao.IUtilisateurDao;
//import com.fr.adaming.jsfapp.model.Utilisateur;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(locations = { "classpath:applicationContextForUnitTest.xml" })
//@TransactionConfiguration(transactionManager = "txManager")
//public class JUnitTest extends AbstractTransactionalJUnit4SpringContextTests {
//	@Autowired
//	IUtilisateurDao utilisateurDao;
//
//	@Test
//	public void Test() {
//		Utilisateur utilisateur = utilisateurDao.findAll(Utilisateur.class,
//				null).get(0);
//		
//		System.out.println(utilisateur);
//		Assert.assertThat(utilisateur,
//				Is.is(utilisateurDao.findAll(Utilisateur.class, null).get(0)));
//		
//		Assert.assertThat(utilisateur, IsNot.not(utilisateurDao.findAll(Utilisateur.class,
//				null).get(2)));
//	}
//}
