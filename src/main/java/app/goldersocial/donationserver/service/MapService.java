package app.goldersocial.donationserver.service;

import app.goldersocial.donationserver.repository.AuthorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapService {
    @Autowired
    private AuthorsRepository authorsRepository;

    public void addFakeData() {
        authorsRepository.saveAuthor();
    }
}
