package com.ta9.ServerConsumer.config;

import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    @Value("${app.queueName}")
    String QUEUE_NAME;

    @Bean
    Queue queue() {
        return new Queue(QUEUE_NAME, false);
    }
}
