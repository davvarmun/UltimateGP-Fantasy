package com.davvarmun.ultimategp.ultimategp.team.dto;

import com.davvarmun.ultimategp.ultimategp.rider.Rider;
import com.davvarmun.ultimategp.ultimategp.team.Team;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class TeamDTO {

    private Integer id;
    private String name;
    private String constructor;
    private Integer points;
    private List<Integer> riderIds;

    public TeamDTO() {
    }

    public TeamDTO(Team team) {
        this.id = team.getId();
        this.name = team.getName();
        this.constructor = team.getConstructor();
        this.points = team.getPoints();
        this.riderIds = team.getRiders().stream()
                .map(Rider::getId)
                .collect(Collectors.toList());
    }
}
