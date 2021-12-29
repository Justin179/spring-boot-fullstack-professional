package com.example.demo.dailyentry;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/entries")
@AllArgsConstructor
public class EntryController {
    private final EntryService entryService;

    @GetMapping
    public List<Entry> getAllEntries() {
//        throw new IllegalStateException("oops error");
        return entryService.getAllEntries();

//        SimpleDateFormat sdFormat = new SimpleDateFormat("yy/MM/dd HH:mm");
//        Date current = new Date();
//        String strDate = sdFormat.format(current);
//
//        List<Entry> entries = Arrays.asList(
//                new Entry(1L, "test", strDate, "test"),
//                new Entry(2L, "test", strDate, "test")
//        );
//        return entries;
    }

    @GetMapping(path = "{entryId}")
    public Entry getEntry(@PathVariable("entryId") Long entryId) throws EntryNotFoundException {
        Entry entry = entryService.getEntry(entryId);
        return entry;
    }

    @PostMapping
    public void addEntry(@Valid @RequestBody Entry entry) {
        entryService.addEntry(entry);
    }

    @DeleteMapping(path = "{entryId}")
    public void deleteEntry(
            @PathVariable("entryId") Long entryId) {
        entryService.deleteEntry(entryId);
    }


}
