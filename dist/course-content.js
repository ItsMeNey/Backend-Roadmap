window.courseLessons = {
  "Value and reference types": {
    objectives: [
      "Explain what is copied during assignment for value and reference types.",
      "Predict when two variables can observe the same mutation.",
      "Choose entity and response-model types deliberately."
    ],
    sections: [
      {
        title: "The value inside the variable",
        body: "Every variable contains a value. For an int, decimal, DateTime, or other value type, that value is the data itself. For a class, array, or delegate, the value is a reference that identifies an object. Assigning either variable copies its value. The important difference is that copying a reference gives two variables access to the same object.",
        visual: "Value type: variable A [42] -> copy -> variable B [42]\nReference type: variable A [reference] -> object <- [same reference] variable B"
      },
      {
        title: "Assignment does not clone objects",
        body: "Assigning one class variable to another does not create a second object. A mutation through either reference is visible through the other. Reassigning one variable changes only that variable's reference; it does not move or replace the original object.",
        code: "var first = new User { Name = \"Ana\" };\nvar second = first;\n\nsecond.Name = \"Ben\";\nConsole.WriteLine(first.Name); // Ben\n\nsecond = new User { Name = \"Cara\" };\nConsole.WriteLine(first.Name); // Ben"
      },
      {
        title: "Backend design consequence",
        body: "Entities normally need identity and controlled mutation, so classes are common. API responses are snapshots of data, so immutable records are often a better fit. The choice is about semantics, not a rule that classes are always domain models and records are always DTOs."
      }
    ],
    pitfalls: [
      "Saying classes are passed by reference. By default, the reference value is passed by value.",
      "Assuming record means stack allocation. A record class is still a reference type.",
      "Using shallow copies when nested mutable objects must be independent."
    ],
    quiz: [
      { q: "After `var b = a` where `a` is a class instance, what is copied?", a: ["Every field into a new object", "The reference value", "Only value-type properties", "Nothing"], correct: 1, why: "The reference value is copied, so both variables initially identify the same object." },
      { q: "Which is the strongest reason to use a record for an API response?", a: ["Records always use less memory", "Records cannot contain methods", "Value-oriented immutable data is its intended semantic", "Records are stored only on the stack"], correct: 2, why: "Records concisely represent value-oriented data and support value-based equality. Allocation depends on whether it is a record class or record struct." }
    ],
    exercise: {
      title: "Predict two assignments",
      intro: "This example is independent and can be pasted into a console application or a scratch file.",
      code: "var firstNumber = 10;\nvar secondNumber = firstNumber;\nsecondNumber = 20;\n\nvar firstUser = new User { Name = \"Ana\" };\nvar secondUser = firstUser;\nsecondUser.Name = \"Ben\";\n\nConsole.WriteLine(firstNumber);\nConsole.WriteLine(firstUser.Name);\n\npublic sealed class User\n{\n    public string Name { get; set; } = string.Empty;\n}",
      question: "What two values are printed, and why does changing secondUser affect firstUser while changing secondNumber does not?",
      answer: "The program prints 10 and Ben. Assigning the integer copies the number itself, so the two variables become independent. Assigning the User copies a reference, so both variables initially identify the same mutable object.",
      tryNext: "Reassign secondUser to a new User, change its name, and predict whether firstUser changes."
    }
  },
  "Stack, heap, and managed memory": {
    objectives: ["Use stack and heap as a useful model without turning them into rigid rules.", "Explain reachability and object lifetime.", "Identify why returning a local reference is safe."],
    sections: [
      { title: "Storage is an implementation detail", body: "A method call normally has a stack frame containing execution state and local values. Objects commonly live in managed heap memory. However, JIT optimization, registers, escape analysis, ref structs, and captured variables make 'value types are on the stack' an unreliable rule. Reason first about value semantics, references, scope, and reachability." },
      { title: "Lifetime follows reachability", body: "A local variable can go out of scope while an object remains alive because another reference can still reach it. The garbage collector reclaims managed objects only after they become unreachable. Returning a newly created object is safe because the caller receives a reference to that managed object.", visual: "Request method frame -> local reference -> Project object\nReturn reference -> caller now reaches Project object\nNo remaining references -> object becomes eligible for collection" },
      { title: "What the GC does not own", body: "The GC manages managed memory. Database connections, file handles, streams, and similar resources may wrap operating-system resources and require deterministic disposal. Memory management and resource management are related but not interchangeable." }
    ],
    pitfalls: ["Treating stack and heap as synonyms for value and reference semantics.", "Calling GC.Collect to solve ordinary memory pressure.", "Assuming the GC closes external resources at the correct time."],
    quiz: [
      { q: "What primarily determines whether a managed object can be collected?", a: ["The method that created it returned", "No live reference can reach it", "It is older than one request", "Its variable was a local"], correct: 1, why: "Managed collection is based on reachability, not simply scope or age." },
      { q: "Why is returning a newly created class instance safe?", a: ["The object is copied out of the stack", "The caller receives a reference that keeps the object reachable", "The object becomes static", "The GC is disabled"], correct: 1, why: "The managed object remains reachable through the reference returned to the caller." }
    ],
    exercise: {
      title: "Follow a returned object",
      intro: "Use the debugger if available, but first predict what happens after CreateMessage returns.",
      code: "var message = CreateMessage();\nConsole.WriteLine(message.Text);\n\nstatic Message CreateMessage()\n{\n    var local = new Message { Text = \"Still reachable\" };\n    return local;\n}\n\npublic sealed class Message\n{\n    public string Text { get; set; } = string.Empty;\n}",
      question: "Why is the Message object still valid after the local variable inside CreateMessage goes out of scope?",
      answer: "The caller receives a copy of the reference. The local variable is gone, but the object remains reachable through message, so it is not eligible for garbage collection.",
      tryNext: "Place breakpoints inside and after CreateMessage and draw which variable holds the reference at each point."
    }
  },
  "Parameter passing": {
    objectives: ["Explain pass-by-value for both structs and class references.", "Use ref, out, and in only when their semantics are required.", "Predict mutation versus reassignment inside a method."],
    sections: [
      { title: "Arguments are passed by value by default", body: "For a value type, the method receives a copy of the value. For a reference type, it receives a copy of the reference. The copied reference still identifies the same object, so the method can mutate that object. Reassigning the parameter changes only the method's local copy of the reference.", code: "static void Rename(Project project) => project.Title = \"Changed\";\n\nstatic void Replace(Project project)\n{\n    project = new Project { Title = \"Replacement\" };\n}\n\nvar original = new Project { Title = \"Original\" };\nRename(original);  // original.Title is Changed\nReplace(original); // original still refers to the first object" },
      { title: "Explicit by-reference modifiers", body: "`ref` lets the method read and replace the caller's variable. `out` requires the method to assign it. `in` passes a readonly reference and is mainly useful for avoiding copies of larger structs. These modifiers change the contract and should not be used merely to make code look optimized." }
    ],
    pitfalls: ["Saying a class argument is passed by reference without mentioning that the reference is copied.", "Using out parameters instead of returning a meaningful result type.", "Adding in or ref before measurement shows a copying problem."],
    quiz: [
      { q: "A method reassigns an ordinary class parameter. What happens to the caller's variable?", a: ["It points to the new object", "It is unchanged", "It becomes null", "The code cannot compile"], correct: 1, why: "The method reassigns its own copied reference. Use ref to replace the caller's variable." },
      { q: "Which modifier requires the called method to assign a value?", a: ["in", "params", "out", "readonly"], correct: 2, why: "An out parameter must be assigned before the method returns." }
    ],
    exercise: {
      title: "Mutation versus reassignment",
      intro: "Both methods receive a copy of the same reference value, but they use that copy differently.",
      code: "var counter = new Counter { Value = 1 };\nIncrement(counter);\nReplace(counter);\nConsole.WriteLine(counter.Value);\n\nstatic void Increment(Counter value) => value.Value++;\n\nstatic void Replace(Counter value)\n{\n    value = new Counter { Value = 100 };\n}\n\npublic sealed class Counter\n{\n    public int Value { get; set; }\n}",
      question: "Does the program print 1, 2, or 100? Explain both method calls.",
      answer: "It prints 2. Increment follows the copied reference and mutates the shared Counter object. Replace changes only its local parameter, so the caller still references the original object.",
      tryNext: "Add ref to the Replace parameter and call, then observe how the result changes."
    }
  },
  "Mutability and aliasing": {
    objectives: ["Identify shared mutable state.", "Use immutable snapshots or defensive copies at boundaries.", "Protect collections from external mutation."],
    sections: [
      { title: "Aliasing creates distant effects", body: "Aliasing exists when multiple references identify the same mutable object. A change through one reference appears through every alias. This is useful when collaborators intentionally share an entity, but dangerous when callers believe they received an independent snapshot." },
      { title: "Collections are part of the boundary", body: "A readonly property does not make the referenced collection immutable. Returning a mutable List allows callers to change internal state without using domain operations. Expose a readonly view, an immutable collection, or a copied snapshot according to the contract.", code: "private readonly List<string> _skills = [];\npublic IReadOnlyList<string> Skills => _skills;\n\npublic void AddSkill(string skill)\n{\n    if (!_skills.Contains(skill, StringComparer.OrdinalIgnoreCase))\n        _skills.Add(skill);\n}" }
    ],
    pitfalls: ["Assuming a get-only List property is immutable.", "Sharing tracked entities as API responses.", "Using defensive copies everywhere without considering cost or intended ownership."],
    quiz: [
      { q: "What is aliasing?", a: ["Two types have the same name", "Multiple references identify the same object", "A value type is boxed", "A method overload is selected"], correct: 1, why: "Aliases provide multiple paths to the same object, so mutations can be observed through each path." },
      { q: "Does a get-only `List<string>` property prevent callers from adding items?", a: ["Yes", "Only in Release builds", "No, the list itself remains mutable", "Only for records"], correct: 2, why: "The property cannot be reassigned externally, but callers can still mutate the returned List." }
    ],
    exercise: {
      title: "Spot shared mutable state",
      intro: "Two variables can make one object's state look as if it changed from a distance.",
      code: "var first = new Settings { Theme = \"Light\" };\nvar second = first;\nsecond.Theme = \"Dark\";\n\nvar independent = new Settings { Theme = first.Theme };\nindependent.Theme = \"Blue\";\n\nConsole.WriteLine(first.Theme);\nConsole.WriteLine(independent.Theme);\n\npublic sealed class Settings\n{\n    public string Theme { get; set; } = string.Empty;\n}",
      question: "Why does the first assignment share changes while the second object can change independently?",
      answer: "second is an alias because it contains the same reference as first. independent refers to a newly created object whose initial Theme value was copied, so later mutation affects only that object.",
      tryNext: "Remove the new Settings expression and predict how both printed values change."
    }
  },
  "Nullable reference types": {
    objectives: ["Interpret nullable annotations and compiler flow analysis.", "Validate external input at runtime.", "Remove unjustified null-forgiving operators."],
    sections: [
      { title: "Annotations describe intent", body: "With nullable reference types enabled, `string` means the code intends a non-null value and `string?` means null is expected. The compiler tracks possible null states and warns about unsafe dereferences. These annotations do not change the CLR type and do not prevent JSON, databases, reflection, or older code from producing null at runtime." },
      { title: "Validate at system boundaries", body: "Treat incoming requests, configuration, database results, and CMS content as external data. Validate them before creating domain objects. Once a value crosses a validated boundary, internal code can use a stronger non-null contract.", code: "public sealed record CreateProjectRequest(string? Title, string? Summary);\n\nif (string.IsNullOrWhiteSpace(request.Title))\n    return Results.ValidationProblem(new Dictionary<string, string[]>\n    {\n        [nameof(request.Title)] = [\"Title is required.\"]\n    });" }
    ],
    pitfalls: ["Using `!` to silence a warning without proving the invariant.", "Declaring everything nullable instead of modelling required values.", "Assuming model binding guarantees non-null runtime input."],
    quiz: [
      { q: "What does `string?` primarily communicate?", a: ["The CLR creates a different string type", "Null is an expected state in this contract", "The string is optional only in JSON", "The compiler inserts a null check"], correct: 1, why: "The annotation communicates nullable intent to compiler analysis and readers; it does not create a new runtime reference type." },
      { q: "When is the null-forgiving operator appropriate?", a: ["Whenever a warning is inconvenient", "When an invariant is proven but the compiler cannot express it", "On every injected service", "Instead of input validation"], correct: 1, why: "Use `!` only when you can justify the invariant. It suppresses analysis and adds no runtime protection." }
    ],
    exercise: {
      title: "Handle an uncertain name",
      intro: "The annotation warns that input may be null; the runtime check decides what the program should do.",
      code: "Console.WriteLine(FormatName(null));\nConsole.WriteLine(FormatName(\"  Ada  \"));\n\nstatic string FormatName(string? input)\n{\n    if (string.IsNullOrWhiteSpace(input))\n        return \"Anonymous\";\n\n    return input.Trim();\n}",
      question: "What is printed, and why is input.Trim() safe after the if statement?",
      answer: "It prints Anonymous and Ada. IsNullOrWhiteSpace handles null, and returning from that branch lets compiler flow analysis know that input is non-null afterward.",
      tryNext: "Delete the guard and inspect the nullable warning before running the program."
    }
  },
  "Boxing and unboxing": {
    objectives: ["Recognize boxing conversions.", "Explain allocation and type-safety consequences.", "Use generics to preserve value types when appropriate."],
    sections: [
      { title: "Boxing wraps a value", body: "Boxing converts a value type to `object` or to an interface it implements. The runtime creates an object containing a copy of the value. Unboxing extracts the value and requires the exact boxed value type before any further numeric conversion." },
      { title: "Generics usually avoid the old object-shaped API", body: "Generic collections and methods preserve the concrete type and avoid repeated casts. Boxing still appears in some logging, reflection, interface, and formatting paths. It is not automatically a performance bug; measure hot paths before complicating code.", code: "int count = 5;\nobject boxed = count;       // boxing\nint restored = (int)boxed; // unboxing\n\n// Invalid: the boxed runtime type is still Int32.\n// long value = (long)boxed;\nlong converted = (long)(int)boxed;" }
    ],
    pitfalls: ["Assuming a boxed int can be directly unboxed as long.", "Replacing readable interfaces merely to avoid hypothetical boxing.", "Using non-generic collections for new application code."],
    quiz: [
      { q: "What happens when an int is assigned to object?", a: ["The object variable stores the int inline with no conversion", "The int is boxed into a managed object", "The int becomes a string", "The compiler rejects it"], correct: 1, why: "The value is copied into a boxed managed object and the object variable holds its reference." },
      { q: "Why does `(long)boxedInt` fail when `boxedInt` contains a boxed int?", a: ["Unboxing requires the exact boxed value type", "long is a reference type", "object cannot contain numbers", "The value was collected"], correct: 0, why: "First unbox as int, then perform the numeric conversion to long." }
    ],
    exercise: {
      title: "Unbox the exact type",
      intro: "The object variable hides the value's compile-time type, but the boxed object still remembers its exact runtime type.",
      code: "int count = 5;\nobject boxed = count;\n\nint restored = (int)boxed;\nlong converted = (long)restored;\n\nConsole.WriteLine(converted);",
      question: "Why must the value be unboxed as int before it can be converted to long?",
      answer: "Boxing stored an Int32 value. Unboxing requires that exact value type, so a direct cast from the boxed object to long would throw InvalidCastException. Numeric conversion can happen after unboxing.",
      tryNext: "Try long invalid = (long)boxed, observe the exception, then restore the two-step conversion."
    }
  }
};
