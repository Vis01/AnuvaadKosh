package com.cdac.Acts.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.Acts.Services.SentenceService;
import com.cdac.Acts.entities.Sentence;

import java.util.List;

@RestController
@RequestMapping("/api/sentences")
public class SentenceController {

    @Autowired
    private SentenceService sentenceService;

    // Get Sentence by ID
    @GetMapping("/{sentenceId}")
    public ResponseEntity<Sentence> getSentenceById(@PathVariable int sentenceId) {
        return sentenceService.getSentenceById(sentenceId);
    }

    // Create a new sentence
    @PostMapping
    public ResponseEntity<Sentence> createSentence(@RequestBody Sentence sentence) {
        return sentenceService.createSentence(sentence);
    }

    // Edit a sentence
    @PutMapping("/{sentenceId}")
    public ResponseEntity<Sentence> updateSentence(@PathVariable int sentenceId, @RequestBody Sentence sentence) {
        return sentenceService.updateSentence(sentenceId, sentence);
    }

    // Delete a sentence
    @DeleteMapping("/{sentenceId}")
    public ResponseEntity<String> deleteSentence(@PathVariable int sentenceId) {
        return sentenceService.deleteSentence(sentenceId);
    }

    // Get sentences by document ID
    @GetMapping("/document/{documentId}")
    public ResponseEntity<List<Sentence>> getSentencesByDocumentId(@PathVariable int documentId) {
        return sentenceService.getSentencesByDocumentId(documentId);
    }
}
