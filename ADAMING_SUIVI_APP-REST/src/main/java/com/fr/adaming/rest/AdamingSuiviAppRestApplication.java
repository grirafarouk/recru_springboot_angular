package com.fr.adaming.rest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ImportResource;
import springfox.documentation.swagger2.annotations.EnableSwagger2;



@EnableSwagger2
@SpringBootApplication(scanBasePackages ="com.fr.adaming.jsfapp.model")
@ImportResource("classpath:applicationContext.xml")
public class AdamingSuiviAppRestApplication extends SpringBootServletInitializer{
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(AdamingSuiviAppRestApplication.class);
    }
	public static void main(String[] args) {
		SpringApplication.run(AdamingSuiviAppRestApplication.class, args);
	} 
}
