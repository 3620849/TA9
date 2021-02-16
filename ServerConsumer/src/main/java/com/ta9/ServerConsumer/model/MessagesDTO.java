package com.ta9.ServerConsumer.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;
@Builder
@Data
public class MessagesDTO {
    List<String> messages;
}
