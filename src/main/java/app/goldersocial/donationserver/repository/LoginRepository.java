package app.goldersocial.donationserver.repository;

import java.net.http.HttpRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginRepository {
    @PostMapping
    public void Login(HttpRequest request) {

    }
}
