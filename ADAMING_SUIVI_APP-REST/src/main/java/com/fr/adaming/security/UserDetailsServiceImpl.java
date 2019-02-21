package com.fr.adaming.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.model.Utilisateur;
import com.fr.adaming.jsfapp.services.impl.UtilisateurService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UtilisateurService accountService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Utilisateur user = accountService.findbyUsernameSpringS(username);
		if (user == null)
			throw new UsernameNotFoundException(username);
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		if (user.getProfil()!=null) {

			authorities.add(new SimpleGrantedAuthority(user.getProfil().getLabel()));

		}
		return new User(user.getLogin(), user.getPassword(), authorities);
	}

}
