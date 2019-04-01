package com.fr.adaming.rest;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ImportResource;

import com.google.common.collect.Lists;
import com.google.common.net.HttpHeaders;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.Contact;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.ApiKeyVehicle;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import springfox.documentation.service.*;
import springfox.documentation.spi.service.contexts.SecurityContext;

import springfox.documentation.swagger.web.SecurityConfiguration;

import java.util.Arrays;


import static org.hibernate.validator.internal.util.CollectionHelper.newArrayList;

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
//	@Bean
//    public Docket commonApi() {
//        return new Docket(DocumentationType.SWAGGER_2).select()
//        		.apis(RequestHandlerSelectors.any())
//                .paths(PathSelectors.any()).build().apiInfo(apiInfo()).securitySchemes(Lists.newArrayList(apiKey()));
//    }
//    
//      private ApiInfo apiInfo() {
//        ApiInfo apiInfo = new ApiInfo("Your REST API", "Your REST API for web app", "1.0", "Terms of service",
//                new Contact("Tharsan", "http://techie-mixture.blogspot.com/", ""));
//        return apiInfo;
//    }
//
//    @SuppressWarnings("deprecation")
//	@Bean
//    public SecurityConfiguration securityInfo() {
//        return new SecurityConfiguration(null, null, null, null, "", ApiKeyVehicle.HEADER, "Authorization", "");
//    }
//
//    private ApiKey apiKey() {
//        return new ApiKey("Authorization", "Authorization", "header");
//    }
//	 
//	  
}
