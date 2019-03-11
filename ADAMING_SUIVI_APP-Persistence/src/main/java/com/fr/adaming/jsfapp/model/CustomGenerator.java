/**
 * 
 */
package com.fr.adaming.jsfapp.model;

import java.io.Serializable;
import java.util.Properties;

import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.dialect.Dialect;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.exception.spi.Configurable;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.id.IdentityGenerator;
import org.hibernate.id.factory.internal.DefaultIdentifierGeneratorFactory;
import org.hibernate.type.Type;

/**
 * @author fgrira
 *
 */
public class CustomGenerator extends IdentityGenerator implements Configurable {

    private IdentifierGenerator defaultGenerator;

    public Serializable generate(SessionImplementor session, Object object) throws HibernateException {
        Long idValue = (Long)defaultGenerator.generate(session, object);
        //idValue will be assigned your entity id
        return idValue;
    }

    public void configure(Type type, Properties params, Dialect d) throws MappingException {
        DefaultIdentifierGeneratorFactory dd = new DefaultIdentifierGeneratorFactory();
        dd.setDialect(d);
        defaultGenerator = dd.createIdentifierGenerator("sequence", type, params);
    }

	@Override
	public void configure(Properties properties) throws HibernateException {
		// TODO Auto-generated method stub
		
	}
}
