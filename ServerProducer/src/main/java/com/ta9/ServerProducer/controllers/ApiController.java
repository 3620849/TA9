package com.ta9.ServerProducer.controllers;

import com.ta9.ServerProducer.model.Client;
import com.ta9.ServerProducer.model.Status;
import com.ta9.ServerProducer.services.ClientService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class ApiController {
    @Autowired
    private ClientService clientService;

    @PatchMapping("/clients/{clientId}/keepAlive")
    public ResponseEntity<HttpStatus> keepAlive(@PathVariable("clientId")String clientId){
        log.info(" method: keepAlive executed");
        boolean isUpdated = clientService.setStatus(clientId, Status.ONLINE);
        if(!isUpdated){
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
    @PostMapping ("/clients")
    public ResponseEntity addNewClient(@RequestBody Client client,@RequestHeader HttpHeaders headers){
        log.info(" method: keepAlive executed");
        clientService.addClient(client,headers);
        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping("/clients")
    public ResponseEntity<List<Client>>getClientList(){
        log.info(" method: getUsersList executed");
        List<Client> clients = clientService.getClients();
        return new ResponseEntity<List<Client>>(clients, HttpStatus.OK);
    }
}
