package com.kira.title;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/titles")
public class TitleController {

    private final TitleSearchService titleSearchService;

    public TitleController(TitleSearchService titleSearchService){
        this.titleSearchService = titleSearchService;
    }

    @GetMapping("/search")
    public List<TitleSearchResult> search(@RequestParam @NotBlank @Size(max = 100) String query){
        return titleSearchService.search(query);
    }
}
