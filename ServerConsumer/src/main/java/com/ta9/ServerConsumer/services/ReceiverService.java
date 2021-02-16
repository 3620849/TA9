package com.ta9.ServerConsumer.services;

import com.ta9.ServerConsumer.dao.InMemoryStorage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Slf4j
@Service
public class ReceiverService {
    @Autowired
    InMemoryStorage inMemoryStorage;
    @RabbitListener(queues = "spring-boot")
    public void receiveMessage(String message) {
        log.info("method: receiveMessage executed message received");
        inMemoryStorage.add(message);
    }
}
