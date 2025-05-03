---
sidebar_position: 5
---

# History Management

JLine provides sophisticated history management capabilities, allowing users to recall, search, and reuse previous commands.

## Basic History Setup

To set up history in your JLine application:

```java
import org.jline.reader.History;
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.reader.impl.history.DefaultHistory;
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

import java.nio.file.Paths;

// Create a terminal
Terminal terminal = TerminalBuilder.builder().build();

// Create a history instance
History history = new DefaultHistory();

// Create a line reader with history
LineReader reader = LineReaderBuilder.builder()
        .terminal(terminal)
        .history(history)
        .variable(LineReader.HISTORY_FILE, Paths.get("history.txt"))
        .build();

// Now the user can navigate history with up/down arrows
String line = reader.readLine("prompt> ");
```

## Persistent History

JLine can save history to a file and load it when your application restarts:

```java
// Set the history file
reader.setVariable(LineReader.HISTORY_FILE, Paths.get("~/.myapp_history"));

// Save history explicitly (though it's usually done automatically)
((DefaultHistory) reader.getHistory()).save();
```

## History Size

You can control how many entries are kept in history:

```java
// Set maximum history size
reader.setVariable(LineReader.HISTORY_SIZE, 1000);

// Set maximum size of history file
reader.setVariable(LineReader.HISTORY_FILE_SIZE, 2000);
```

## History Filtering

JLine provides options to filter what gets added to history:

```java
// Don't add duplicate entries
reader.setOption(LineReader.Option.HISTORY_IGNORE_DUPS, true);

// Don't add entries that start with space
reader.setOption(LineReader.Option.HISTORY_IGNORE_SPACE, true);

// Beep when trying to navigate past the end of history
reader.setOption(LineReader.Option.HISTORY_BEEP, true);

// Verify history expansion (like !!, !$, etc.)
reader.setOption(LineReader.Option.HISTORY_VERIFY, true);
```

## History Navigation

Users can navigate history using:

- **Up/Down arrows**: Move through history entries
- **Ctrl+R**: Reverse incremental search
- **Ctrl+S**: Forward incremental search (if supported by terminal)
- **Alt+&lt;**: Go to the first history entry
- **Alt+&gt;**: Go to the last history entry

## Programmatic History Access

You can access and manipulate history programmatically:

```java
// Get the history
History history = reader.getHistory();

// Iterate through history entries
for (History.Entry entry : history) {
    System.out.println(entry.index() + ": " + entry.line());
}

// Get a specific entry
String lastCommand = history.get(history.size() - 1);

// Add an entry programmatically
history.add("manually added command");

// Clear history
history.purge();
```

## History Expansion

JLine supports history expansion similar to Bash:

```java
// Enable history expansion
reader.setOption(LineReader.Option.HISTORY_EXPAND, true);

// Now users can use:
// !! - repeat the last command
// !n - repeat command number n
// !-n - repeat nth previous command
// !string - repeat last command starting with string
// !?string - repeat last command containing string
// ^string1^string2 - replace string1 with string2 in the last command
```

## Custom History Implementation

You can create your own history implementation by implementing the `History` interface:

```java
public class CustomHistory implements History {
    private final List<String> entries = new ArrayList<>();

    @Override
    public void add(String line) {
        // Custom logic for adding entries
        entries.add(line);
        // Maybe save to a database or other storage
    }

    @Override
    public String get(int index) {
        return entries.get(index);
    }

    @Override
    public int size() {
        return entries.size();
    }

    @Override
    public int index() {
        return entries.size() - 1;
    }

    // Implement other required methods...
}
```

## Advanced History Features

### Timestamped History

You can create a history implementation that records timestamps:

```java
public class TimestampedHistory extends DefaultHistory {
    private final Map<String, Instant> timestamps = new HashMap<>();

    @Override
    public void add(String line) {
        super.add(line);
        timestamps.put(line, Instant.now());
    }

    public Instant getTimestamp(String line) {
        return timestamps.get(line);
    }
}
```

### Searchable History

Implement custom search functionality:

```java
public List<String> searchHistory(String term) {
    List<String> results = new ArrayList<>();
    History history = reader.getHistory();

    for (History.Entry entry : history) {
        if (entry.line().contains(term)) {
            results.add(entry.line());
        }
    }

    return results;
}
```

### History Event Listeners

You can listen for history events:

```java
// Create a history listener
History.Listener historyListener = new History.Listener() {
    @Override
    public void onAdd(History history, String line) {
        System.out.println("Added to history: " + line);
    }

    @Override
    public void onRemove(History history, String line) {
        System.out.println("Removed from history: " + line);
    }
};

// Add the listener to a DefaultHistory instance
DefaultHistory history = new DefaultHistory();
history.addListener(historyListener);
```

## Best Practices

- Always set a history file for persistent history
- Configure appropriate history size limits
- Consider enabling HISTORY_IGNORE_DUPS to avoid clutter
- Provide clear documentation on history navigation for users
- Consider security implications of storing sensitive commands
- Implement history purging for sensitive operations
- Test history functionality with various input patterns
