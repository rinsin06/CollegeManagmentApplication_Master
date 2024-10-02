package com.collegedirectory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class CollegeDirectoryManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(CollegeDirectoryManagementSystemApplication.class, args);
	}

}
