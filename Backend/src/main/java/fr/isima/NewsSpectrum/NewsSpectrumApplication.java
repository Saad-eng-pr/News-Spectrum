package fr.isima.NewsSpectrum;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NewsSpectrumApplication {

	private static final Logger log = LoggerFactory.getLogger(NewsSpectrumApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(NewsSpectrumApplication.class, args);
		log.info("http://localhost:8080/swagger-ui/index.html#/");
	}
}
