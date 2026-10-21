package com.kira.backend;

import org.springframework.boot.SpringApplication;

public class TestCinelogApplication {

    public static void main(String[] args) {
        SpringApplication.from(CinelogApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
