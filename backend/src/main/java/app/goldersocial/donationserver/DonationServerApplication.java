package app.goldersocial.donationserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class DonationServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DonationServerApplication.class, args);
	}

}
