package app.goldersocial.donationserver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    //return index html
    @RequestMapping("/")
    public String index() {
        return "index.html";
    }

//    @RequestMapping("/error")
//    public String error() {
//        return "error.html";
//    }
}
