package com.ta9.ServerProducer.services;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MessagingService {
    @Value("${app.exchangeName}")
    String exchangeName;
    @Value("${app.key}")
    String key;
    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void sendMsg(String m){
        rabbitTemplate.convertAndSend(exchangeName, key,m );
    }
}
