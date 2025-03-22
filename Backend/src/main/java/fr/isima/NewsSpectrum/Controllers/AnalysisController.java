package fr.isima.NewsSpectrum.Controllers;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import fr.isima.NewsSpectrum.Services.AnalysisService;
import fr.isima.NewsSpectrum.Models.*;


@RequestMapping("/analyze")
@RestController
public class AnalysisController {
    private final AnalysisService analysisService = new AnalysisService();
    
    @PostMapping
    public AnalysisResponse analyzeArticles(@RequestBody List<Article> articles) {
        return analysisService.analyze(articles);
    }
}