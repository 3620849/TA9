package com.ta9.ServerConsumer.services;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class ReceiverService {
    @RabbitListener(queues = "spring-boot")
    public void receiveMessage(String message) {
        System.out.println("Received <" + message + ">");
    }
}
