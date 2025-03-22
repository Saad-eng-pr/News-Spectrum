// NLPAnalyzer.java
package fr.isima.NewsSpectrum.Services;

import opennlp.tools.stemmer.PorterStemmer;
import opennlp.tools.tokenize.SimpleTokenizer;
import fr.isima.NewsSpectrum.Models.PoliticalContext;

import java.util.*;
import java.util.stream.Collectors;

public class NLPAnalyzer {
    private final PoliticalContext politicalContext;
    
    public NLPAnalyzer(PoliticalContext politicalContext) {
        this.politicalContext = politicalContext;
    }

    public double analyzeBias(String content) {
        SimpleTokenizer tokenizer = SimpleTokenizer.INSTANCE;
        PorterStemmer stemmer = new PorterStemmer();
        
        List<String> tokens = Arrays.stream(tokenizer.tokenize(content.toLowerCase()))
                                    .map(stemmer::stem)
                                    .collect(Collectors.toList());

        Map<String, Double> keywordWeights = politicalContext.getKeywords();
        
        return tokens.stream()
                     .mapToDouble(token -> keywordWeights.getOrDefault(token, 0.0))
                     .average()
                     .orElse(0.0);
    }

    public String generateSummary(String content) {
        // Implémentation basique de summarization
        String[] sentences = content.split("\\.");
        return sentences.length > 3 ? 
            String.join(". ", Arrays.copyOfRange(sentences, 0, 3)) + "." : 
            content;
    }
}