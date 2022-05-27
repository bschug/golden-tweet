package app.goldersocial.donationserver.controller.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Getter
@Setter
public class TweetUserIdResponse {
    private Long author;
}
