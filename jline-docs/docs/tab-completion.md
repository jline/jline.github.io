---
sidebar_position: 4
---

# Tab Completion

Tab completion is one of JLine's most powerful features, allowing users to efficiently navigate and use your command-line application.

## Basic Completion

To add completion to your `LineReader`, you need to implement the `Completer` interface:

```java title="BasicCompletionExample.java" showLineNumbers
import org.jline.reader.Completer;
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.reader.impl.completer.StringsCompleter;
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

import java.io.IOException;

public class BasicCompletionExample {
    public static void main(String[] args) throws IOException {
        // highlight-start
        // Create a simple completer with fixed options
        Completer completer = new StringsCompleter("help", "exit", "list", "version");
        // highlight-end

        // Create a line reader with the completer
        Terminal terminal = TerminalBuilder.builder().build();
        LineReader reader = LineReaderBuilder.builder()
                .terminal(terminal)
                .completer(completer)
                .build();

        System.out.println("Type a command and press Tab to see completions");
        // Now when the user presses Tab, they'll see the available commands
        String line = reader.readLine("prompt> ");
        System.out.println("You entered: " + line);
    }
}
```

## Completer Types

JLine provides several built-in completers:

### StringsCompleter

Completes from a fixed set of strings:

```java title="StringsCompleterExample.java"
import org.jline.reader.Completer;
import org.jline.reader.impl.completer.StringsCompleter;

import java.util.Arrays;
import java.util.Collection;
import java.util.function.Supplier;

public class StringsCompleterExample {
    public void demonstrateStringsCompleter() {
        // Complete with fixed strings
        Completer stringsCompleter = new StringsCompleter("add", "remove", "list", "help");

        // highlight-start
        // Complete with dynamic strings
        Supplier<Collection<String>> dynamicStrings = this::getCurrentCommands;
        Completer dynamicCompleter = new StringsCompleter(dynamicStrings);
        // highlight-end

        System.out.println("Completers created successfully");
    }

    private Collection<String> getCurrentCommands() {
        // In a real application, this might fetch commands from a registry
        return Arrays.asList("connect", "disconnect", "status", "help");
    }
}
```

### FileNameCompleter

Completes file and directory names:

```java title="FileNameCompleterExample.java"
import org.jline.reader.Completer;
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.reader.impl.completer.FileNameCompleter;
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

import java.io.IOException;

public class FileNameCompleterExample {
    public static void main(String[] args) throws IOException {
        // highlight-next-line
        Completer fileCompleter = new FileNameCompleter();

        Terminal terminal = TerminalBuilder.builder().build();
        LineReader reader = LineReaderBuilder.builder()
                .terminal(terminal)
                .completer(fileCompleter)
                .build();

        System.out.println("Type a file path and press Tab to complete it");
        String line = reader.readLine("file> ");
        System.out.println("You selected: " + line);
    }
}
```

### ArgumentCompleter

Handles command-line arguments with different completers for each position:

```java title="ArgumentCompleterExample.java"
import org.jline.reader.Completer;
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.reader.impl.completer.ArgumentCompleter;
import org.jline.reader.impl.completer.FileNameCompleter;
import org.jline.reader.impl.completer.StringsCompleter;
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

import java.io.IOException;

public class ArgumentCompleterExample {
    public static void main(String[] args) throws IOException {
        // First argument is a command, second is a file
        Completer commandCompleter = new StringsCompleter("open", "save", "delete");
        Completer fileCompleter = new FileNameCompleter();

        // highlight-start
        Completer argCompleter = new ArgumentCompleter(
                commandCompleter,
                fileCompleter
        );
        // highlight-end

        Terminal terminal = TerminalBuilder.builder().build();
        LineReader reader = LineReaderBuilder.builder()
                .terminal(terminal)
                .completer(argCompleter)
                .build();

        System.out.println("Type a command followed by a file path and press Tab");
        String line = reader.readLine("cmd> ");
        System.out.println("You entered: " + line);
    }
}
```

### TreeCompleter

Creates a tree of completion options:

```java title="TreeCompleterExample.java" showLineNumbers
import org.jline.reader.Completer;
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.reader.impl.completer.TreeCompleter;
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

import java.io.IOException;

import static org.jline.reader.impl.completer.TreeCompleter.node;

public class TreeCompleterExample {
    public static void main(String[] args) throws IOException {
        // highlight-start
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
        // highlight-end

        Terminal terminal = TerminalBuilder.builder().build();
        LineReader reader = LineReaderBuilder.builder()
                .terminal(terminal)
                .completer(treeCompleter)
                .build();

        System.out.println("Type a command and press Tab to navigate the command tree");
        String line = reader.readLine("tree> ");
        System.out.println("You entered: " + line);
    }
}
```

### AggregateCompleter

Combines multiple completers:

```java title="AggregateCompleterExample.java"
import org.jline.reader.Completer;
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.reader.impl.completer.AggregateCompleter;
import org.jline.reader.impl.completer.ArgumentCompleter;
import org.jline.reader.impl.completer.FileNameCompleter;
import org.jline.reader.impl.completer.StringsCompleter;
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

import java.io.IOException;

public class AggregateCompleterExample {
    public static void main(String[] args) throws IOException {
        // highlight-start
        Completer aggregateCompleter = new AggregateCompleter(
                new StringsCompleter("help", "exit"),
                new ArgumentCompleter(
                        new StringsCompleter("open"),
                        new FileNameCompleter()
                )
        );
        // highlight-end

        Terminal terminal = TerminalBuilder.builder().build();
        LineReader reader = LineReaderBuilder.builder()
                .terminal(terminal)
                .completer(aggregateCompleter)
                .build();

        System.out.println("Type a command and press Tab to see completions");
        String line = reader.readLine("agg> ");
        System.out.println("You entered: " + line);
    }
}
```

## Custom Completers

You can create your own completers by implementing the `Completer` interface:

```java title="CustomCompleter.java" showLineNumbers
import org.jline.reader.Candidate;
import org.jline.reader.Completer;
import org.jline.reader.LineReader;
import org.jline.reader.ParsedLine;

import java.util.List;

public class CustomCompleter implements Completer {
    @Override
    public void complete(LineReader reader, ParsedLine line, List<Candidate> candidates) {
        // Get the word being completed
        String word = line.word();

        // highlight-start
        // Add completion candidates based on the current word
        if ("he".startsWith(word)) {
            candidates.add(new Candidate("help", "help", null, "Show help", null, null, true));
        }
        if ("ex".startsWith(word)) {
            candidates.add(new Candidate("exit", "exit", null, "Exit application", null, null, true));
        }
        // highlight-end

        // You can add more sophisticated logic here
        if ("co".startsWith(word)) {
            candidates.add(new Candidate("connect", "connect", null, "Connect to server", null, null, true));
        }
        if ("di".startsWith(word)) {
            candidates.add(new Candidate("disconnect", "disconnect", null, "Disconnect from server", null, null, true));
        }
    }
}
```

## Completion Behavior

You can customize how completion works:

```java title="CompletionBehaviorExample.java"
import org.jline.reader.Completer;
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.reader.impl.completer.StringsCompleter;
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

import java.io.IOException;

public class CompletionBehaviorExample {
    public static void main(String[] args) throws IOException {
        Terminal terminal = TerminalBuilder.builder().build();
        Completer completer = new StringsCompleter("help", "exit", "list", "connect", "disconnect");

        // highlight-start
        LineReader reader = LineReaderBuilder.builder()
                .terminal(terminal)
                .completer(completer)
                .option(LineReader.Option.AUTO_LIST, true)  // Automatically list options
                .option(LineReader.Option.LIST_PACKED, true)  // Display completions in a compact form
                .option(LineReader.Option.AUTO_MENU, true)  // Show menu automatically
                .option(LineReader.Option.MENU_COMPLETE, true)  // Cycle through completions
                .build();
        // highlight-end

        System.out.println("Type a command and press Tab to see enhanced completion behavior");
        String line = reader.readLine("cmd> ");
        System.out.println("You entered: " + line);
    }
}
```

## Advanced Completion Features

### Completion with Descriptions

You can provide descriptions for completion candidates:

```java title="CandidatesWithDescriptionsExample.java"
import org.jline.reader.Candidate;
import org.jline.reader.Completer;
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CandidatesWithDescriptionsExample {
    public static void main(String[] args) throws IOException {
        // highlight-start
        List<Candidate> candidates = new ArrayList<>();
        candidates.add(new Candidate("help", "help", null, "Display help information", null, null, true));
        candidates.add(new Candidate("exit", "exit", null, "Exit the application", null, null, true));

        Completer completer = (reader, line, completions) -> {
            completions.addAll(candidates);
        };
        // highlight-end

        Terminal terminal = TerminalBuilder.builder().build();
        LineReader reader = LineReaderBuilder.builder()
                .terminal(terminal)
                .completer(completer)
                .option(LineReader.Option.AUTO_LIST, true)
                .build();

        System.out.println("Type a command and press Tab to see completions with descriptions");
        String line = reader.readLine("desc> ");
        System.out.println("You entered: " + line);
    }
}
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
