package com.example.demo.dailyentry;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class EntryService {

    private final EntryRepository entryRepository;

    // 查 all
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }
    // 查 by id
    public Entry getEntry(Long entryId) throws EntryNotFoundException {
        Optional<Entry> entry = entryRepository.findById(entryId);
        if(entry.isPresent())
            return entry.get();
        throw new EntryNotFoundException("Could not find any entries with ID: " + entryId);
    }

    // 增
    public void addEntry(Entry entry) {
        entryRepository.save(entry);
    }
    // 改
    public void updateEntry(Entry entry) {
        entryRepository.save(entry);
    }

    // 刪
    public void deleteEntry(Long entryId) {
        entryRepository.deleteById(entryId);
    }
}
