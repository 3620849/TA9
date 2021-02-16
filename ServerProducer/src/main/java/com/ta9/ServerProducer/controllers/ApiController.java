package com.ta9.ServerProducer.controllers;

import com.ta9.ServerProducer.model.Msg;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    @Autowired
    private AmqpTemplate rabbitTemplate;
    @GetMapping("/")
    public String hi(){
        System.out.println("hi");
        rabbitTemplate.convertAndSend("dima-boot-exchange", "foo.bar.baz", new Msg("Hello from RabbitMQ!").toString());
        return "hi";
    }
}
