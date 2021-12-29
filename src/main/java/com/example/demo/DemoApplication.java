package com.example.demo;

import com.example.demo.dailyentry.Entry;
import com.example.demo.dailyentry.EntryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

//	CommandLineRunner commandLineRunner(EntryRepository entryRepository){
//		return args -> {
//			Entry entry = new Entry("testC", new Date(),"testC");
//			entryRepository.save(entry);
//		};
//	}

}
