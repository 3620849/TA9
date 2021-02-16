package com.ta9.ServerConsumer.controller;

import com.ta9.ServerConsumer.dao.InMemoryStorage;
import com.ta9.ServerConsumer.model.MessagesDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
public class MonitoringController {
    @Autowired
    InMemoryStorage inMemoryStorage;

    @GetMapping("/messages")
    public ResponseEntity<MessagesDTO> getMessages(){
        log.info("method: [getMessages] executed");
        MessagesDTO msgs = MessagesDTO.builder().messages(inMemoryStorage.getAll()).build();
        return new ResponseEntity(msgs, HttpStatus.OK);
    }
}
