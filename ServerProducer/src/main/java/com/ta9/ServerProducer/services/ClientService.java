package com.ta9.ServerProducer.services;

import com.ta9.ServerProducer.dao.InMemoryStorage;
import com.ta9.ServerProducer.model.Client;
import com.ta9.ServerProducer.model.Status;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {
    @Value("${app.expirationTime}")
    long expirationTime;

    @Autowired
    private InMemoryStorage inMemoryStorage;
    @Autowired
    MessagingService messagingService;

    public List<Client> getClients() {
        List<Client> clients = inMemoryStorage.getClients();
        return clients;
    }
    @Async
    @Scheduled(fixedRateString  = "${app.updateRate}")
    private void updateStatuses(){
        long now = System.currentTimeMillis();
        inMemoryStorage.setOfflineForExpired(now-expirationTime);
    }

    public void addClient(Client client, HttpHeaders headers) {
        client.setStatus(Status.ONLINE);
        client.setUpdateTime(System.currentTimeMillis());
        List<String> userAgent = headers.get("User-Agent");
        client.setAgent(userAgent.stream().collect(Collectors.joining()));
        messagingService.sendMsg("[CLIENT ADDED]"+client);
        inMemoryStorage.add(client);
    }

    public boolean setStatus(String clientId,Status s) {
        return inMemoryStorage.setStatus(clientId,s);
    }
}
