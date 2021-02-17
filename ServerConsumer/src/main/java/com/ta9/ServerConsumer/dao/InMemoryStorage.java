package com.ta9.ServerConsumer.dao;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;

@Service
public class InMemoryStorage {
    BlockingQueue<String> queue =  new LinkedBlockingDeque<>(500);

    public void add(String msg){
        if(queue.size()>499){
            queue.poll();
        }
        queue.add(msg);
    }
    public List<String> getAll(){
        return new ArrayList<>(queue);
    }
}
