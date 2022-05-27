package app.goldersocial.donationserver.controller;

import app.goldersocial.donationserver.service.error.BadRequestException;
import app.goldersocial.donationserver.service.error.TwitterNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ErrorController {
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(TwitterNotFoundException.class)
    public String handleNotFound() {
        log.error("Twitter not found");
        return "twitter not found";
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public String badRequest() {
        log.error("Bad Request");
        return "bad request";
    }
}
