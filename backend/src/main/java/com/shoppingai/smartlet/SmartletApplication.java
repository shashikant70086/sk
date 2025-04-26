
package com.shoppingai.smartlet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*")
public class SmartletApplication {
    public static void main(String[] args) {
        SpringApplication.run(SmartletApplication.class, args);
    }
}
