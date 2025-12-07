package com.zipcode.gyms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GymsApplication {

	// main method that runs when you start the app (mvn spring-boot:run)
    // starts the embedded Tomcat server on port 8080 and loads my controllers/repositories
	public static void main(String[] args) {
		SpringApplication.run(GymsApplication.class, args);
	}
}
