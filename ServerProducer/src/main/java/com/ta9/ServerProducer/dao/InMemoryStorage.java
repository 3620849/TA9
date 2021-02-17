package com.ta9.ServerProducer.dao;

import com.ta9.ServerProducer.model.Client;
import com.ta9.ServerProducer.model.Status;
import com.ta9.ServerProducer.services.MessagingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class InMemoryStorage {

    ConcurrentHashMap<String, Client> inMemoryStorage = new ConcurrentHashMap<>();

    @Autowired
    MessagingService messagingService;

    public List<Client> getClients() {
        return new ArrayList<Client>(inMemoryStorage.values());
    }

    public void setOfflineForExpired(long expTime) {
        inMemoryStorage.forEach((k,v)->inMemoryStorage.compute(k,(key,val)->{
            if(val.getStatus()==Status.ONLINE){
                if(val.getUpdateTime()<expTime){
                    val.setStatus(Status.OFFLINE);
                    messagingService.sendMsg("[CLIENT OFFLINE]"+val);
                }
            }
        return val;}));
    }

    public void add(Client client) {
        inMemoryStorage.put(client.getClientId(),client);
    }

    public boolean setStatus(String clientId, Status s) {
        Client client = inMemoryStorage.computeIfPresent(clientId, (k, v) -> {
                    v.setStatus(s);
                    v.setUpdateTime(System.currentTimeMillis());
                    messagingService.sendMsg("[CLIENT ALIVE]"+v);
                    return v;
                }
        );
        return client!=null;
    }
}
