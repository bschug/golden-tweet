package app.goldersocial.donationserver.controller;

import app.goldersocial.donationserver.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorsController {
    @Autowired
    private MapService mapService;

    @PostMapping("/addAuthor")
    public void addFakeData() {
        mapService.addFakeData();
    }
}
