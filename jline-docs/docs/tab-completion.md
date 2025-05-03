---
sidebar_position: 4
---

# Tab Completion

Tab completion is one of JLine's most powerful features, allowing users to efficiently navigate and use your command-line application.

## Basic Completion

To add completion to your `LineReader`, you need to implement the `Completer` interface:

```java
import org.jline.reader.Completer;
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.reader.impl.completer.StringsCompleter;
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

// Create a simple completer with fixed options
Completer completer = new StringsCompleter("help", "exit", "list", "version");

// Create a line reader with the completer
Terminal terminal = TerminalBuilder.builder().build();
LineReader reader = LineReaderBuilder.builder()
        .terminal(terminal)
        .completer(completer)
        .build();

// Now when the user presses Tab, they'll see the available commands
String line = reader.readLine("prompt> ");
```

## Completer Types

JLine provides several built-in completers:

### StringsCompleter

Completes from a fixed set of strings:

```java
// Complete with fixed strings
Completer stringsCompleter = new StringsCompleter("add", "remove", "list", "help");

// Complete with dynamic strings
Supplier<Collection<String>> dynamicStrings = () -> getCurrentCommands();
Completer dynamicCompleter = new StringsCompleter(dynamicStrings);
```

### FileNameCompleter

Completes file and directory names:

```java
Completer fileCompleter = new FileNameCompleter();
```

### ArgumentCompleter

Handles command-line arguments with different completers for each position:

```java
// First argument is a command, second is a file
Completer commandCompleter = new StringsCompleter("open", "save", "delete");
Completer fileCompleter = new FileNameCompleter();

Completer argCompleter = new ArgumentCompleter(
        commandCompleter,
        fileCompleter
);
```

### TreeCompleter

Creates a tree of completion options:

```java
Completer treeCompleter = new TreeCompleter(
        node("help",
                node("commands"),
                node("syntax")
        ),
        node("set",
                node("color",
                        node("red", "green", "blue")
                ),
                node("size",
                        node("small", "medium", "large")
                )
        )
);
```

### AggregateCompleter

Combines multiple completers:

```java
Completer aggregateCompleter = new AggregateCompleter(
        new StringsCompleter("help", "exit"),
        new ArgumentCompleter(
                new StringsCompleter("open"),
                new FileNameCompleter()
        )
);
```

## Custom Completers

You can create your own completers by implementing the `Completer` interface:

```java
public class CustomCompleter implements Completer {
    @Override
    public void complete(LineReader reader, ParsedLine line, List<Candidate> candidates) {
        // Get the word being completed
        String word = line.word();
        
        // Add completion candidates based on the current word
        if ("he".startsWith(word)) {
            candidates.add(new Candidate("help", "help", null, "Show help", null, null, true));
        }
        if ("ex".startsWith(word)) {
            candidates.add(new Candidate("exit", "exit", null, "Exit application", null, null, true));
        }
        
        // You can add more sophisticated logic here
    }
}
```

## Completion Behavior

You can customize how completion works:

```java
LineReader reader = LineReaderBuilder.builder()
        .terminal(terminal)
        .completer(completer)
        .option(LineReader.Option.AUTO_LIST, true)  // Automatically list options
        .option(LineReader.Option.LIST_PACKED, true)  // Display completions in a compact form
        .option(LineReader.Option.AUTO_MENU, true)  // Show menu automatically
        .option(LineReader.Option.MENU_COMPLETE, true)  // Cycle through completions
        .build();
```

## Advanced Completion Features

### Completion with Descriptions

You can provide descriptions for completion candidates:

```java
List<Candidate> candidates = new ArrayList<>();
candidates.add(new Candidate("help", "help", null, "Display help information", null, null, true));
candidates.add(new Candidate("exit", "exit", null, "Exit the application", null, null, true));

Completer completer = (reader, line, completions) -> {
    completions.addAll(candidates);
};
```

### Context-Aware Completion

Create completers that are aware of the current context:

```java
public class ContextAwareCompleter implements Completer {
    private final Map<String, Completer> contextCompleters = new HashMap<>();
    
    public ContextAwareCompleter() {
        contextCompleters.put("default", new StringsCompleter("help", "context", "exit"));
        contextCompleters.put("file", new FileNameCompleter());
        contextCompleters.put("user", new StringsCompleter("admin", "guest", "user1", "user2"));
    }
    
    @Override
    public void complete(LineReader reader, ParsedLine line, List<Candidate> candidates) {
        // Get current context from reader variables
        String context = (String) reader.getVariable("CONTEXT");
        if (context == null) {
            context = "default";
        }
        
        // Use the appropriate completer for this context
        Completer contextCompleter = contextCompleters.getOrDefault(context, 
                                                                   contextCompleters.get("default"));
        contextCompleter.complete(reader, line, candidates);
    }
}
```

### Completion with Colors

You can colorize completion candidates:

```java
public class ColoredCompleter implements Completer {
    @Override
    public void complete(LineReader reader, ParsedLine line, List<Candidate> candidates) {
        // Command in bold red
        candidates.add(new Candidate("help", "help", null, "Show help", null, 
                                    AttributedStyle.BOLD.foreground(AttributedStyle.RED), true));
        
        // File in blue
        candidates.add(new Candidate("file.txt", "file.txt", null, "A text file", null, 
                                    AttributedStyle.DEFAULT.foreground(AttributedStyle.BLUE), true));
    }
}
```

## Best Practices

- Provide meaningful completions that help users discover functionality
- Include descriptions for non-obvious options
- Group related completions logically
- Consider the context when providing completions
- Use appropriate styling to differentiate types of completions
- Test completion with various input scenarios
- Keep completion fast, especially for large option sets
