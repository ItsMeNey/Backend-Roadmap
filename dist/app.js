const c = (title, summary) => ({ title, summary });
const m = (title, conclusion, mission, concepts) => ({ title, conclusion, mission, concepts });

const subjectStages = [
  {
    title: "Rebuild your learning system",
    description: "Stop outsourcing the reasoning",
    category: "foundation",
    modules: [
      m("AI discipline and deliberate practice", "AI is valuable when it challenges or reviews your reasoning; it weakens learning when it replaces the first attempt.", "Solve a small defect with AI restricted to questions and one hint at a time. Record your original hypothesis and the verified cause.", [
        c("Attempt before assistance", "Write your understanding, hypothesis, edge cases, and first attempt before requesting help."),
        c("Ask for hints and review", "Use AI to expose gaps, compare options, and review work rather than generate the first solution."),
        c("Verify generated claims", "Confirm framework behaviour with execution, tests, debugger evidence, or primary documentation."),
        c("Retrieval practice", "Reproduce an explanation or solution later without reopening the conversation."),
        c("Own every retained line", "Do not keep code that you cannot explain, test, modify, and debug independently.")
      ]),
      m("Visual Studio, debugger, and source navigation", "A debugger reveals the program that is actually executing; reading and AI only suggest what might execute.", "Trace one request using breakpoints, call stacks, watches, conditional breakpoints, and exception settings. Draw the observed call flow.", [
        c("Breakpoints and stepping", "Pause execution and distinguish stepping into, over, and out of calls."),
        c("Call stack", "Read the chain of method calls that produced the current execution point."),
        c("Locals, watches, and evaluation", "Inspect runtime values without changing behaviour accidentally."),
        c("Exception settings", "Break where an exception is thrown instead of only where it is eventually handled."),
        c("Navigate and find references", "Follow definitions, implementations, callers, and usages efficiently across a solution.")
      ]),
      m("CLI, Git, and the build model", "Visual Studio orchestrates the SDK, MSBuild, launch profiles, and debugger; understanding those parts makes builds portable and diagnosable.", "Restore, build, test, run, and publish the same solution from the CLI, then inspect what Visual Studio adds through the selected launch profile.", [
        c("Projects and solutions", "A project defines a buildable unit; a solution groups projects for development and orchestration."),
        c("Restore, build, run, test, publish", "Know the distinct purpose and output of each .NET SDK command."),
        c("MSBuild properties and targets", "Understand that project files are executable build definitions rather than passive metadata."),
        c("Launch profiles and environments", "Recognize how URLs, environment names, and process settings reach an application."),
        c("Git graph and safe collaboration", "Understand commits, branches, merges, rebases, remotes, and conflict resolution beneath SourceTree.")
      ])
    ]
  },
  {
    title: "C# mental model",
    description: "Know what the code means in memory",
    category: "foundation",
    modules: [
      m("Types, variables, and memory", "A variable stores a value; for reference types that value is a reference to an object, which explains aliasing and mutation.", "Predict ten assignment and method-call examples, then prove each answer in the debugger.", [
        c("Value and reference types", "Distinguish values copied directly from references copied to the same object."),
        c("Stack, heap, and managed memory", "Use the model to reason about lifetime without treating it as a rigid storage rule."),
        c("Parameter passing", "C# passes arguments by value unless ref-like modifiers explicitly change that behaviour."),
        c("Mutability and aliasing", "Multiple references can observe mutations to the same object."),
        c("Nullable reference types", "Compiler null-state analysis expresses intent but does not make runtime null impossible."),
        c("Boxing and unboxing", "Converting value types to object or interfaces can allocate and requires correct unboxing.")
      ]),
      m("Classes, records, structs, and equality", "Choose a type according to identity, value semantics, size, mutability, and ownership, not fashion.", "Compare a small Customer class, Address record, and Coordinate struct, then explain why each type fits its meaning.", [
        c("Classes and identity", "Classes suit objects whose identity and lifecycle matter independently of their property values."),
        c("Records and value semantics", "Records make immutable-style data and value-based equality concise."),
        c("Structs and copying", "Structs are values copied on assignment and work best when small and conceptually atomic."),
        c("Equality contracts", "Reference, value, and custom equality must agree with hashing when objects enter sets or dictionaries."),
        c("Immutability", "Restricting state changes reduces accidental coupling and makes concurrent reasoning easier.")
      ]),
      m("Encapsulation and object relationships", "Good object design protects valid state and models truthful relationships instead of exposing bags of setters.", "Refactor an anemic model so invalid status transitions cannot be performed from arbitrary callers.", [
        c("Encapsulation", "Keep invariants with the data and expose meaningful operations instead of unrestricted mutation."),
        c("Abstraction", "Expose the capability a caller needs while hiding volatile implementation details."),
        c("Composition", "Build behaviour from collaborating objects when one object uses another."),
        c("Inheritance and polymorphism", "Use substitution for genuine is-a relationships, not merely to reuse code."),
        c("Interfaces and contracts", "An interface defines a replaceable capability, but unnecessary interfaces add indirection without value.")
      ]),
      m("Collections, generics, and LINQ", "Collection choice and enumeration behaviour affect correctness and cost even when the code looks concise.", "Process a project catalogue three ways, measure enumeration counts, and explain which collection and query shape fits each requirement.", [
        c("Generic types and constraints", "Generics preserve type safety while constraints express operations a type parameter must support."),
        c("List, dictionary, set, and queue", "Choose collections according to ordering, uniqueness, lookup, and insertion requirements."),
        c("IEnumerable and enumeration", "An enumerable describes how to produce a sequence; it does not promise stored results."),
        c("Deferred LINQ execution", "Many LINQ queries run during enumeration and can observe later source changes."),
        c("Projection, filtering, grouping, joins", "Shape data intentionally and recognize when a query belongs in memory or in the database."),
        c("Complexity basics", "Understand the practical cost of repeated scans, nested loops, hashing, sorting, and lookup.")
      ]),
      m("Delegates, events, exceptions, and resources", "Callbacks model behaviour; exceptions model exceptional failure; disposal models deterministic resource cleanup.", "Implement a file-processing operation that reports progress, handles expected failures, and always releases resources.", [
        c("Delegates, Action, and Func", "Delegates are type-safe references to executable behaviour."),
        c("Lambdas and closures", "Lambdas can capture surrounding variables, extending lifetime and sometimes causing surprising state."),
        c("Events", "Events let publishers notify subscribers while retaining control over invocation."),
        c("Exception flow", "Catch only failures you can meaningfully handle and preserve diagnostic context."),
        c("IDisposable and await using", "Dispose external resources deterministically even when execution fails."),
        c("Result versus exception", "Expected business outcomes usually deserve explicit results; unexpected failures may justify exceptions.")
      ])
    ]
  },
  {
    title: "Async, concurrency, and the runtime",
    description: "Efficient waiting is not serialized execution",
    category: "foundation",
    modules: [
      m("Task-based asynchronous programming", "Async frees a thread while I/O is pending; it does not automatically create a thread or make operations sequential.", "Trace an HTTP-to-database async call, add cancellation, and identify every place sync-over-async could block it.", [
        c("Task and Task<T>", "A task represents an operation that may already be complete, still running, or failed."),
        c("async and await control flow", "Execution runs synchronously until awaiting an incomplete task, then resumes through a continuation."),
        c("I/O-bound versus CPU-bound", "Await I/O; deliberately schedule or parallelize expensive CPU work only when justified."),
        c("Task.WhenAll and bounded concurrency", "Concurrent independent work can reduce latency but must respect downstream capacity."),
        c("CancellationToken", "Cancellation is a cooperative request that should flow through every cancellable layer."),
        c("Async failure and timeout", "Await tasks so failures remain observable and enforce time limits at appropriate boundaries.")
      ]),
      m("Concurrency and thread safety", "Concurrent requests can interleave around awaits and shared resources; correctness requires explicit protection.", "Reproduce a race condition that creates duplicate visitor events, then fix it at the correct boundary.", [
        c("Race conditions", "A result depends on unpredictable operation ordering when shared state lacks coordination."),
        c("Atomic operations and locks", "Protect small in-process critical sections without holding locks across arbitrary asynchronous work."),
        c("Concurrent collections", "Thread-safe collections protect their operations, not multi-step business invariants."),
        c("Optimistic concurrency", "Detect that stored data changed since it was read and resolve the conflict explicitly."),
        c("Idempotency", "Repeating the same logical request should not repeat an unsafe side effect."),
        c("Parallelism limits", "Unbounded parallel work can exhaust threads, connections, memory, or external quotas.")
      ]),
      m("Runtime, allocation, and disposal", "The GC manages memory, not every external resource; allocation patterns still affect latency and throughput.", "Use a profiler or allocation tool on a small endpoint and remove one measurable source of unnecessary allocation.", [
        c("Garbage-collection generations", "Short-lived objects are collected differently from objects that survive multiple collections."),
        c("Managed versus unmanaged resources", "Managed memory is reclaimed automatically; handles, streams, and connections need lifecycle discipline."),
        c("Finalizers and disposal", "Finalizers are a last-resort cleanup path, not a substitute for deterministic disposal."),
        c("Strings, spans, and pooling", "Reduce allocation only after measurement and without sacrificing correctness."),
        c("Memory leaks in managed code", "Long-lived references, subscriptions, caches, and static state can keep unused objects reachable.")
      ])
    ]
  },
  {
    title: ".NET application platform",
    description: "Understand the host beneath ASP.NET Core",
    category: "foundation",
    modules: [
      m("Dependency injection and lifetimes", "A dependency graph is safe only when object lifetimes are compatible with the state they hold.", "Draw the dependency graph for one request and explain why every service is transient, scoped, or singleton.", [
        c("Constructor injection", "Required collaborators become explicit and testable through the constructor."),
        c("Transient, scoped, and singleton", "Match lifetime to state ownership and avoid capturing shorter-lived dependencies."),
        c("Captive dependencies", "A long-lived service must not retain request-scoped state such as a DbContext."),
        c("Factories and scopes", "Create operation-specific dependencies deliberately inside singleton or background processes."),
        c("Composition root", "Keep object wiring at application startup while business code depends on abstractions."),
        c("Service locator smell", "Pulling arbitrary dependencies from IServiceProvider hides requirements and complicates testing.")
      ]),
      m("Configuration, options, and environments", "Configuration is layered input; validate it at startup and keep secrets outside source control.", "Run the same app with development and production settings, override one value through the environment, and prove which source won.", [
        c("Configuration providers and precedence", "JSON, environment variables, command-line arguments, and secrets combine in a defined order."),
        c("Options pattern", "Bind related configuration into validated, injectable types."),
        c("Environment-specific behaviour", "Use environments for genuine operational differences without scattering conditional logic."),
        c("Secret management", "Store credentials in protected deployment systems and rotate them without code changes."),
        c("Startup validation", "Fail clearly before serving traffic when required configuration is invalid.")
      ]),
      m("Hosting, lifecycle, and background work", "The generic host coordinates configuration, DI, logging, startup, graceful shutdown, and hosted services.", "Create a cancellable background worker, stop the process during work, and verify it shuts down without losing or duplicating a job.", [
        c("Generic host", "The host owns application lifetime and common infrastructure services."),
        c("Kestrel and reverse proxies", "Kestrel serves HTTP while IIS or another proxy may terminate TLS and forward requests."),
        c("IHostedService and BackgroundService", "Background services are long-lived processes that need scoped work and shutdown handling."),
        c("Graceful shutdown", "Stop accepting work, honor cancellation, and finish or safely abandon in-flight operations."),
        c("Health checks", "Liveness and readiness answer different questions for traffic management and recovery.")
      ])
    ]
  },
  {
    title: "HTTP and ASP.NET Core",
    description: "Trace every request end to end",
    category: "foundation",
    modules: [
      m("HTTP and browser fundamentals", "HTTP is a stateless request-response protocol whose semantics drive caching, security, and reliable API behaviour.", "Inspect a real browser request in Network tools and explain the method, URL, headers, cookies, status, caching, and TLS boundary.", [
        c("Methods and safety", "GET is safe retrieval; state-changing operations need methods whose semantics match their intent."),
        c("Status codes", "Responses should distinguish success, invalid input, missing resources, conflicts, authentication, authorization, and server failure."),
        c("Headers and content negotiation", "Headers carry metadata for representation, caching, identity, tracing, and transport behaviour."),
        c("Cookies and sessions", "Cookies are browser-managed state tokens; server sessions map a token to server-side state."),
        c("DNS, TCP, TLS, and proxies", "Know the network path well enough to locate failures outside application code."),
        c("Caching semantics", "Freshness and validators prevent unnecessary transfer while preserving correctness.")
      ]),
      m("ASP.NET Core request pipeline", "Middleware order controls which concerns run before and after routing and endpoint execution.", "Create request-timing middleware, deliberately place it incorrectly, and use logs to explain the observed behaviour.", [
        c("Middleware pipeline", "Each middleware can inspect, modify, short-circuit, or surround later processing."),
        c("Routing and endpoint metadata", "Routing selects an endpoint whose metadata informs authorization and other policies."),
        c("Model binding", "Request data is converted into action parameters before application logic runs."),
        c("Filters and endpoint filters", "Filters apply MVC or endpoint-specific cross-cutting behaviour where middleware is too broad."),
        c("Serialization", "JSON contracts, null handling, naming, and cycles affect every client."),
        c("Exception handling and Problem Details", "Translate failures consistently without leaking sensitive implementation detail.")
      ]),
      m("Production API design", "A durable API is a stable behavioural contract, not merely a controller that reaches the database.", "Design and integration-test a small book-lending API including validation, duplicate submission, cancellation, and failure responses.", [
        c("DTOs and contract boundaries", "Do not expose database entities or CMS models as public request and response contracts."),
        c("Validation", "Reject malformed input at the boundary and enforce business invariants inside the application."),
        c("Resource-oriented routes", "URLs identify resources while methods and representations express operations."),
        c("Pagination, filtering, and sorting", "Bound result sets and make query behaviour deterministic."),
        c("Backward compatibility and versioning", "Evolve contracts without unexpectedly breaking deployed clients."),
        c("OpenAPI", "A machine-readable contract supports discovery, testing, client generation, and change review.")
      ]),
      m("Authentication and authorization", "Authentication builds an identity; authorization evaluates whether that identity may perform an operation on a resource.", "Protect a document-editing endpoint with a default-deny policy and test anonymous, owner, editor, and forbidden paths.", [
        c("Schemes and handlers", "Authentication handlers validate credentials and produce a ClaimsPrincipal."),
        c("Claims and roles", "Claims describe identity attributes; roles are one coarse form of authorization data."),
        c("Policies and requirements", "Policies express reusable permission rules beyond scattered role checks."),
        c("Resource-based authorization", "Permission can depend on both the user and the specific object being accessed."),
        c("Cookie versus bearer authentication", "Credential transport changes browser behaviour, CSRF exposure, renewal, and storage risks."),
        c("401 versus 403", "Unauthenticated and authenticated-but-forbidden requests are different states.")
      ]),
      m("Outbound HTTP and integrations", "External calls are unreliable boundaries that need typed contracts, time budgets, resilience, and observability.", "Integrate a fake email or source-control API and demonstrate timeout, retry, malformed response, and provider outage behaviour.", [
        c("HttpClientFactory", "Manage handlers and connection reuse while configuring named or typed clients."),
        c("Timeouts and cancellation", "Bound total work and propagate caller cancellation through the external request."),
        c("Retry safety", "Retry only transient and repeatable operations with limits, delay, and jitter."),
        c("Circuit breaking and fallback", "Temporarily stop calls to a failing dependency and degrade intentionally."),
        c("Contract deserialization", "Treat external payloads as untrusted, versioned input."),
        c("Webhooks", "Verify authenticity, tolerate redelivery, and process events idempotently.")
      ])
    ]
  },
  {
    title: "SQL Server and EF Core",
    description: "Make data correct before making access convenient",
    category: "foundation",
    modules: [
      m("Relational modelling", "A good schema expresses identity, relationships, validity, and ownership so invalid data is difficult to store.", "Draw a small ER diagram for library members, books, loans, and loan history before creating entities.", [
        c("Tables, rows, and columns", "Tables model sets of facts with deliberate data types and nullability."),
        c("Primary and foreign keys", "Keys define identity and enforce relationships between records."),
        c("Cardinality", "One-to-one, one-to-many, and many-to-many relationships describe real domain constraints."),
        c("Normalization", "Separate facts to reduce duplication and update anomalies, then denormalize only for measured reasons."),
        c("Constraints", "Unique, check, default, and foreign-key constraints protect integrity independently of application code."),
        c("Temporal and audit data", "Decide whether history is business data, operational evidence, or both.")
      ]),
      m("SQL querying", "SQL describes the desired result set; joins, grouping, and predicates determine both meaning and cost.", "Write and explain queries for zero-related-row counts, latest-per-group, pagination, duplicate detection, and an aggregate report.", [
        c("SELECT, WHERE, and ordering", "Filter deliberately and use deterministic ordering whenever position matters."),
        c("Inner and outer joins", "Choose whether unmatched rows should disappear or remain in the result."),
        c("Grouping and aggregates", "Summarize sets while understanding how nulls and grouped columns behave."),
        c("Subqueries and CTEs", "Name intermediate result logic without assuming it automatically improves performance."),
        c("Window functions", "Calculate rankings, running values, and group-relative results without collapsing rows."),
        c("Data modification", "Update and delete with precise predicates, constraints, transactions, and verified impact.")
      ]),
      m("Indexes and query performance", "Indexes trade storage and write cost for faster access; their value depends on real query shapes and selectivity.", "Capture an execution plan for a slow order-history query, add an appropriate index, and compare reads and duration.", [
        c("Clustered and nonclustered indexes", "Understand the physical lookup path and the role of the clustering key."),
        c("Composite indexes", "Column order determines which predicates and sorts an index can support efficiently."),
        c("Covering and included columns", "Satisfy a query from the index while avoiding an excessively wide key."),
        c("Execution plans", "Read scans, seeks, joins, estimates, and key lookups as evidence rather than guesses."),
        c("Sargability", "Write predicates that allow useful index access instead of forcing row-by-row computation."),
        c("Parameter sensitivity", "A cached plan suitable for one parameter distribution may perform badly for another.")
      ]),
      m("EF Core fundamentals", "EF Core maps an object model to relational operations, but developers still own query shape, generated SQL, and lifecycle.", "Implement the operational schema from a clean migration and inspect every SQL query generated by one API flow.", [
        c("DbContext lifetime", "A context is a scoped unit of work and identity map, not a singleton database connection."),
        c("Entity mapping and relationships", "Map keys, requiredness, ownership, navigation, precision, and constraints explicitly."),
        c("Change tracking", "Tracked entity state determines the commands emitted by SaveChanges."),
        c("IQueryable versus IEnumerable", "Keep translatable operations in the database and know where execution crosses into memory."),
        c("Projection and no-tracking queries", "Fetch only required data and avoid tracking read-only results."),
        c("N+1 and loading strategies", "Recognize when navigation access causes repeated queries and select eager, explicit, or projected loading.")
      ]),
      m("Transactions, migrations, and concurrency", "Correct persistence requires atomic boundaries, safe schema evolution, and explicit handling of simultaneous changes.", "Race two updates against the same rowversion, resolve the conflict, and deploy an idempotent migration through a pipeline step.", [
        c("ACID transactions", "Group operations so they either commit together or leave no partial state."),
        c("Isolation levels", "Choose the visibility and locking trade-offs required by a business invariant."),
        c("Optimistic concurrency tokens", "Detect stale updates rather than silently overwriting newer data."),
        c("Deadlocks", "Keep transactions short and access resources consistently; retry selected deadlock victims safely."),
        c("Migrations", "Version schema changes, review generated operations, and separate production application from deployment."),
        c("Backup and restore thinking", "A deployment plan is incomplete without knowing how data is protected and recovered.")
      ])
    ]
  },
  {
    title: "Architecture and maintainability",
    description: "Use structure to control change",
    category: "production",
    modules: [
      m("Coupling, cohesion, and SOLID", "Design principles are diagnostic tools for controlling reasons to change, not rules demanding an interface and layer for every class.", "Review a deliberately over-engineered feature and remove abstractions that do not protect a real boundary.", [
        c("Coupling", "Reduce knowledge of volatile details between components while accepting necessary domain coupling."),
        c("Cohesion", "Keep behaviour and data that change for the same reason together."),
        c("Single responsibility", "A unit should have one coherent reason to change, not merely one method."),
        c("Open/closed and substitution", "Extend variation safely without breaking the expectations of existing callers."),
        c("Interface segregation and inversion", "Depend on focused capabilities owned by the needs of higher-level policy."),
        c("YAGNI and simplicity", "Do not pay abstraction cost for imagined variation without credible evidence.")
      ]),
      m("Application boundaries and Clean Architecture", "Dependencies should point toward stable business policy while frameworks remain replaceable implementation details.", "Move one weather-alert use case from controller-to-database code into an independently testable application boundary.", [
        c("Presentation boundary", "Translate transport concerns into application requests and results."),
        c("Application use cases", "Coordinate business operations without depending on HTTP or UI details."),
        c("Domain model", "Represent important rules and language independently of persistence mechanics."),
        c("Infrastructure adapters", "Implement databases, email, files, and external services behind explicit ports."),
        c("Dependency direction", "Inner policy must not depend on outer frameworks even when outer code depends on inner contracts."),
        c("Pragmatic layering", "Collapse layers when their separation adds ceremony without protecting change or testability.")
      ]),
      m("Domain modelling and patterns", "Patterns name recurring trade-offs; choose them because a problem exists, not because a diagram expects them.", "Model a contact-conversation lifecycle and compare an anemic service design with behaviour-rich domain objects.", [
        c("Entities and value objects", "Entities retain identity; value objects are defined entirely by their values."),
        c("Aggregates and invariants", "An aggregate defines the consistency boundary controlled by one root."),
        c("Repository trade-offs", "A repository may protect a domain boundary but can become redundant abstraction over EF Core."),
        c("Commands and queries", "Separate intention to change state from requests to read state when it clarifies behaviour."),
        c("Strategy, adapter, decorator", "Encapsulate algorithms, translate interfaces, or wrap behaviour without inheritance."),
        c("Domain events", "Represent an important completed fact without turning every method call into an event bus.")
      ]),
      m("Refactoring and legacy evolution", "Safe improvement preserves observable behaviour, uses tests as a harness, and proceeds through reversible steps.", "Refactor a tightly coupled controller in small commits while keeping contract tests green after every step.", [
        c("Characterization tests", "Capture existing behaviour before changing code whose requirements are unclear."),
        c("Seams and branch by abstraction", "Create controlled substitution points to replace behaviour incrementally."),
        c("Strangler pattern", "Route slices to a new implementation while the old system continues serving the rest."),
        c("Technical debt decisions", "Describe concrete cost, risk, and timing rather than labelling disliked code as debt."),
        c("Compatibility and migration", "Plan data, API, and operational transitions before switching implementations."),
        c("Architecture fitness", "Use tests, analyzers, and review rules to keep important boundaries from silently eroding.")
      ])
    ]
  },
  {
    title: "Testing and secure engineering",
    description: "Prove behaviour and defend boundaries",
    category: "production",
    modules: [
      m("Automated testing strategy", "Tests create fast evidence at different boundaries; the goal is confidence, not maximum mock count or coverage percentage.", "Write focused tests for small independent examples, then explain what each test boundary uniquely proves.", [
        c("Unit tests", "Exercise isolated business behaviour quickly with minimal infrastructure."),
        c("Integration tests", "Verify real collaboration with databases, framework pipelines, or other infrastructure."),
        c("API and contract tests", "Protect status codes, payload shape, authorization, headers, and compatibility."),
        c("Test doubles", "Use fakes, stubs, and mocks only where they clarify control or observation."),
        c("Testcontainers and test data", "Run realistic disposable dependencies with deterministic setup and cleanup."),
        c("Coverage and mutation thinking", "Use coverage to find untested paths, then ask whether tests fail when behaviour is wrong.")
      ]),
      m("Web application security", "Security is a set of threat-driven controls across input, identity, browser behaviour, storage, transport, and operations.", "Threat-model the contact and admin flows, exploit a deliberately vulnerable version, then prove the controls block it.", [
        c("Threat modelling", "Identify assets, trust boundaries, attackers, abuse cases, and mitigations before selecting controls."),
        c("Injection", "Use parameters and safe APIs so untrusted input cannot become executable SQL, commands, or templates."),
        c("XSS and output encoding", "Prevent untrusted content from becoming browser-executed markup or script."),
        c("CSRF and antiforgery", "Protect cookie-authenticated state changes from cross-site request initiation."),
        c("CSP and security headers", "Reduce browser attack surface with enforceable content and transport policies."),
        c("SSRF, files, and path traversal", "Constrain server-side network access and treat filenames and uploaded content as hostile."),
        c("Rate limiting and abuse", "Protect expensive and sensitive operations from automated overuse.")
      ]),
      m("Identity and secrets", "Identity systems fail when credential lifecycle, permission boundaries, and recovery paths are treated as controller attributes alone.", "Implement a least-privilege admin policy, rotate one secret, revoke a session, and verify security events without logging credentials.", [
        c("Password storage and identity providers", "Use established identity systems and adaptive password hashing rather than custom credential storage."),
        c("Least privilege", "Grant only the operations and data required for a role or service."),
        c("Session and token lifecycle", "Plan creation, expiry, renewal, revocation, theft, and logout behaviour."),
        c("Secret rotation", "Replace credentials without code changes or avoidable downtime."),
        c("Sensitive logging", "Record security-relevant events without exposing tokens, secrets, or private data."),
        c("Dependency and supply-chain risk", "Track packages, vulnerabilities, provenance, and update strategy.")
      ])
    ]
  },
  {
    title: "Production engineering",
    description: "Design for failure and operability",
    category: "production",
    modules: [
      m("Observability and diagnosis", "Logs, metrics, and traces provide complementary evidence; useful systems connect them through stable context and correlation.", "Diagnose a slow, failing request using only structured logs, a trace, metrics, and database evidence before opening the source.", [
        c("Structured Serilog events", "Log named properties and event meaning rather than concatenated prose."),
        c("Correlation and trace context", "Connect one operation across requests, jobs, database calls, and external services."),
        c("Metrics", "Measure rates, errors, duration, and saturation to understand system health over time."),
        c("Distributed tracing", "Visualize latency and failure across component boundaries."),
        c("Alert quality", "Alert on actionable user impact and symptoms rather than every internal irregularity."),
        c("Incident investigation", "Form hypotheses, preserve evidence, narrow the fault domain, and verify the cause.")
      ]),
      m("Performance and caching", "Performance work begins with measurement and preserves correctness under invalidation, load, and failure.", "Load-test a read endpoint, find its bottleneck, improve it, and document the before-and-after evidence.", [
        c("Latency, throughput, and saturation", "A fast single request does not guarantee capacity under concurrent load."),
        c("Profiling", "Use CPU, allocation, database, and network evidence to locate actual cost."),
        c("Response and data caching", "Cache at the boundary that matches reuse and consistency requirements."),
        c("Invalidation and stampedes", "Plan freshness, eviction, concurrent misses, and failure behaviour before caching."),
        c("Connection and thread pools", "Exhausted shared pools can make healthy dependencies appear slow."),
        c("Load testing", "Model realistic traffic, data, warmup, and service limits instead of chasing a synthetic number.")
      ]),
      m("Reliable background processing", "Durable work needs ownership, retries, deduplication, poison handling, and observable completion, not fire-and-forget tasks.", "Queue a contact notification transactionally, crash the worker after sending, and prevent duplicate delivery during recovery.", [
        c("Queues and workers", "Separate request latency from durable processing while accepting eventual completion."),
        c("Retry with backoff and jitter", "Retry transient failures without synchronizing clients or overwhelming a recovering dependency."),
        c("Outbox pattern", "Store a state change and its future message atomically, then publish reliably."),
        c("Dead-letter handling", "Quarantine repeatedly failing work with enough evidence and tooling for recovery."),
        c("At-least-once delivery", "Assume duplicate processing is possible and make consumers idempotent."),
        c("Scheduling", "Define timezone, missed-run, overlap, and ownership behaviour for recurring work.")
      ]),
      m("Delivery, IIS, containers, and CI/CD", "A repeatable release builds one trusted artifact, validates it, promotes it through environments, and supports safe rollback.", "Create a disposable demo API and a pipeline that builds, tests, packages, deploys, smoke-tests, and rolls it back.", [
        c("Build artifacts", "Build once from a known commit and promote the same immutable output."),
        c("CI quality gates", "Automate compilation, tests, formatting, analysis, and dependency checks before merge."),
        c("Database deployment", "Coordinate backward-compatible schema changes with application rollout."),
        c("IIS and process hosting", "Understand app pools, process identity, reverse proxying, recycling, logs, and permissions."),
        c("Containers", "Package runtime dependencies and configuration boundaries without assuming containers solve architecture."),
        c("Deployment strategies", "Choose rolling, blue-green, or staged release and pair it with health verification and rollback."),
        c("Infrastructure and environments", "Keep environment creation repeatable and configuration explicit rather than manually remembered.")
      ])
    ]
  },
  {
    title: "Umbraco 17 specialization",
    description: "Use the CMS deliberately, not magically",
    category: "platform",
    modules: [
      m("Content modelling and editor experience", "A strong content model expresses editorial meaning and reuse without leaking page layout decisions into every field.", "Model profile, project, article, technology, and landing-page content; then test the editing experience with realistic content.", [
        c("Document types and compositions", "Model reusable editorial capabilities while avoiding deep inheritance-like coupling."),
        c("Properties and data types", "Choose editors, validation, configuration, and storage according to the content meaning."),
        c("Blocks and structured content", "Use structured reusable components without turning content into unqueryable page-builder noise."),
        c("Culture and variation", "Plan language and segment variation before content and URLs depend on it."),
        c("Media and accessibility", "Model alt text, crops, formats, ownership, and lifecycle as content concerns."),
        c("Editor permissions and workflow", "Give editors the least access needed and design publishing paths that reduce mistakes.")
      ]),
      m("Published content and content services", "Published querying serves the website; content services manage editable database state. Confusing them harms performance and correctness.", "Build one read path from strongly typed published models and one controlled content-management operation, then explain why their APIs differ.", [
        c("Published snapshot", "Frontend reads operate against a cached published representation rather than arbitrary database writes."),
        c("Models Builder", "Generated models provide typed access to document-type contracts and reveal schema changes at compile time."),
        c("IPublishedContent querying", "Traverse and filter published content while avoiding broad, repeated tree scans."),
        c("Content and media services", "Use service APIs for administrative mutations, not routine website rendering."),
        c("Content identity and URLs", "Distinguish keys, numeric IDs, UDIs, routes, domains, cultures, and generated URLs."),
        c("Preview and unpublished state", "Respect the boundary between public published data and authenticated preview or editing state.")
      ]),
      m("Composition, notifications, and extension points", "Umbraco extension points integrate custom behaviour into startup and lifecycle events; ordering and failure behaviour must be deliberate.", "Register a notification handler that enforces a publishing invariant and integration-test both allowed and rejected saves.", [
        c("Composers and IUmbracoBuilder", "Register or replace services and collection items during application composition."),
        c("Notifications", "React to lifecycle events while distinguishing cancelable pre-events from completed post-events."),
        c("Handlers and ordering", "Keep handlers focused, deterministic, correctly ordered, and safe under retries or multiple instances."),
        c("Custom services", "Put business behaviour in ordinary injectable services rather than bloated controllers or handlers."),
        c("Health checks", "Expose actionable environment and configuration checks without revealing sensitive information."),
        c("Backoffice extensions", "Extend the modern backoffice only when editor workflow requires custom UI or capability.")
      ]),
      m("Routing, APIs, and headless delivery", "Umbraco and ASP.NET Core routing share one host; custom endpoints need clear ownership, authorization, and stable contracts.", "Serve a small news content model through the Delivery API or a deliberate custom projection, then add one secured operational endpoint.", [
        c("Templates and render controllers", "Understand how content routes select rendering and where custom page behaviour belongs."),
        c("Surface and API controllers", "Choose controller types according to form, backoffice, or public API responsibilities."),
        c("Content Delivery API", "Expose published content through supported headless contracts when it fits the client."),
        c("Custom projections", "Create purpose-specific DTOs when client needs or security differ from generic content delivery."),
        c("CORS and frontend integration", "Allow only intended browser origins and distinguish CORS from authentication and CSRF protection."),
        c("Member and backoffice identity", "Do not confuse public members, backoffice users, and custom application identities.")
      ]),
      m("Search, caching, and media", "Search indexes and caches are derived state; systems must tolerate staleness and support safe rebuilding.", "Create project/article search, customize one indexed field, rebuild the index, and verify unpublished content never leaks.", [
        c("Examine and Lucene concepts", "Understand documents, fields, analysis, indexing, and querying beneath the convenience API."),
        c("Internal, external, and member indexes", "Select an index whose visibility and content type match the use case."),
        c("Custom indexing", "Add normalized fields and value sets intentionally while planning rebuild behaviour."),
        c("Published cache invalidation", "Know which mutations refresh published state and how multi-instance environments receive changes."),
        c("Application caching", "Add custom caching only with an explicit key, lifetime, invalidation, and memory budget."),
        c("Image processing and delivery", "Control transformations, caching, formats, dimensions, and abuse of expensive image operations.")
      ]),
      m("Operations, upgrades, and Umbraco Cloud", "A CMS is both an application and an evolving content platform; code, schema, content, files, and indexes move differently.", "Promote a change through local, development, and production-like environments with documented validation and rollback.", [
        c("Configuration and environment overrides", "Separate versioned defaults from environment-specific settings and protected secrets."),
        c("Schema and content deployment", "Distinguish deployable structure from environment-owned content and operational data."),
        c("Cloud environment workflow", "Understand repository flow, environment promotion, variables, logs, and platform constraints."),
        c("Multi-instance behaviour", "Avoid process-local assumptions for cache, jobs, locks, files, and startup work."),
        c("Package and version upgrades", "Review compatibility, migrations, obsolete APIs, release notes, and rollback before upgrading."),
        c("Operational recovery", "Practice restoring data, rebuilding indexes, validating health, and diagnosing startup failures.")
      ])
    ]
  },
  {
    title: "Senior engineering",
    description: "Multiply correctness beyond your own code",
    category: "production",
    modules: [
      m("Distributed-system fundamentals", "Once work crosses processes or services, partial failure, delay, duplication, and inconsistent views are normal conditions.", "Design a small email-notification flow for network failure, duplicate messages, delayed delivery, and dependency recovery.", [
        c("Partial failure", "One component can fail while others succeed, so operations need explicit recovery semantics."),
        c("Consistency trade-offs", "Choose where immediate consistency is required and where eventual convergence is acceptable."),
        c("Timeout budgets", "Allocate a request time budget across nested dependencies instead of stacking unrelated timeouts."),
        c("Idempotent boundaries", "Attach stable operation identity where retries or redelivery can repeat side effects."),
        c("Outbox and inbox", "Bridge local transactions and message delivery without pretending they share one atomic commit."),
        c("Scaling and partitioning", "Scale stateless work easily, then identify state, coordination, and hotspot constraints.")
      ]),
      m("System design and trade-offs", "Senior design begins with requirements and constraints, compares credible alternatives, and makes failure and operations visible.", "Write a short design record for an audit-event service, including requirements, alternatives, data model, failure modes, security, rollout, and rejected options.", [
        c("Functional and quality requirements", "Capture behaviour plus latency, availability, security, operability, and cost expectations."),
        c("Capacity estimation", "Use rough numbers to expose likely bottlenecks and avoid architecture by intuition alone."),
        c("Architecture decision records", "Preserve context, options, choice, and consequences without writing a novel."),
        c("Failure-mode analysis", "Ask how each dependency fails, how the system responds, and how operators detect and recover."),
        c("Build versus buy", "Compare ownership cost, constraints, lock-in, risk, and differentiation."),
        c("Evolution strategy", "Design migration and compatibility steps, not only the desired end state.")
      ]),
      m("Technical leadership", "Seniority is demonstrated by improving decisions, delivery, and learning across the team, not by owning the most complicated code.", "Run a design review, review a pull request, write an incident summary, and mentor someone through a debugging session without taking over.", [
        c("Requirement clarification", "Expose assumptions, edge cases, and acceptance criteria before implementation cost grows."),
        c("Estimation and risk", "Break work into evidence-based slices and communicate uncertainty early."),
        c("Code review", "Review correctness, security, maintainability, operability, and shared understanding, not personal style."),
        c("Mentoring", "Use questions, context, and progressive ownership to make another developer more capable."),
        c("Incident leadership", "Coordinate mitigation, evidence, communication, recovery, and blameless follow-up."),
        c("Standards and leverage", "Improve templates, tooling, documentation, and paved paths that prevent repeated team-wide cost.")
      ]),
      m("Professional depth", "A senior engineer keeps learning, communicates clearly, and can demonstrate impact without depending on a job title.", "Write a short case study from real or simulated work that explains one difficult decision, its evidence, trade-offs, result, and what you would change next.", [
        c("Primary-source learning", "Use official documentation, specifications, source, and experiments before relying on summaries."),
        c("Technical writing", "Explain decisions, contracts, operations, and risks so another engineer can act correctly."),
        c("Interview readiness", "Practise explaining fundamentals, debugging, SQL, API design, and system trade-offs aloud."),
        c("Impact evidence", "Record outcomes such as reduced failures, faster diagnosis, safer releases, or simpler change."),
        c("Ethical ownership", "Protect users, data, colleagues, and systems when delivery pressure conflicts with responsible engineering.")
      ])
    ]
  }
];

const sourceModules = new Map(subjectStages.flatMap((stage) => stage.modules.map((module) => [module.title, module])));

function useModule(sourceTitle, options = {}) {
  const source = sourceModules.get(sourceTitle);
  if (!source) throw new Error(`Unknown curriculum module: ${sourceTitle}`);

  const conceptTitles = options.concepts || source.concepts.map((concept) => concept.title);
  const concepts = conceptTitles.map((title) => {
    const concept = source.concepts.find((item) => item.title === title);
    if (!concept) throw new Error(`Unknown concept '${title}' in '${sourceTitle}'`);
    return { ...concept };
  });

  return m(
    options.title || source.title,
    options.conclusion || source.conclusion,
    options.mission || source.mission,
    concepts
  );
}

const stages = [
  {
    title: "1. Learning workflow and developer tools",
    description: "Set up the habits and tools used throughout every later stage",
    category: "foundation",
    modules: [
      useModule("AI discipline and deliberate practice"),
      useModule("Visual Studio, debugger, and source navigation"),
      useModule("CLI, Git, and the build model")
    ]
  },
  {
    title: "2. Core C# reasoning",
    description: "Understand values, objects, behaviour, collections, and failure before frameworks",
    category: "foundation",
    modules: [
      m("C# language baseline", "Expressions create values, statements control execution, and methods and members organize behaviour behind explicit boundaries.", "Use a disposable console example to trace control flow, call methods, inspect properties, and rewrite one conditional with pattern matching.", [
        c("Expressions, statements, and operators", "Distinguish code that produces a value from code that performs an action, and understand operator precedence."),
        c("Conditions, loops, and control flow", "Use branches and loops deliberately, including early returns and short-circuit evaluation."),
        c("Methods, parameters, and return values", "Define clear inputs and outputs, understand overloads and optional parameters, and avoid hidden side effects."),
        c("Fields, properties, and constructors", "Know where object state lives, how access is exposed, and how valid state is established."),
        c("Access modifiers, namespaces, and assemblies", "Understand which code can access a member and how projects become compiled assembly boundaries."),
        c("Pattern matching and switch expressions", "Express type and value decisions concisely without unsafe casts or deeply nested conditionals."),
        c("Compiler diagnostics and warnings", "Treat compiler errors and nullable or analyzer warnings as evidence to understand, not messages to silence blindly.")
      ]),
      useModule("Types, variables, and memory"),
      m("Common backend values", "Backend correctness often depends on choosing and comparing ordinary values according to their real meaning.", "Solve small independent examples involving money, timestamps, identifiers, text comparison, and culture-sensitive parsing.", [
        c("Strings and comparison rules", "Choose ordinal or culture-aware comparison deliberately and understand that strings are immutable."),
        c("Numeric types and decimal", "Choose integer, floating-point, or decimal representations according to range, precision, and domain rules."),
        c("DateTimeOffset, UTC, and time zones", "Store an unambiguous instant and convert to local time only at an explicit boundary."),
        c("Enums and constrained states", "Use enums for a closed set of named states while validating undefined external values."),
        c("Guid and identity values", "Use identifiers according to identity requirements without treating randomness as authorization or secrecy."),
        c("Parsing, formatting, and culture", "Parse untrusted text explicitly and keep machine formats stable across server cultures.")
      ]),
      useModule("Classes, records, structs, and equality"),
      useModule("Encapsulation and object relationships"),
      useModule("Delegates, events, exceptions, and resources", {
        title: "Delegates, lambdas, and events",
        concepts: ["Delegates, Action, and Func", "Lambdas and closures", "Events"],
        conclusion: "Delegates model executable behaviour, lambdas create it concisely, and events provide controlled notification between objects.",
        mission: "Implement a small notification flow with a named delegate, a lambda, and an event, then inspect captured state in the debugger."
      }),
      useModule("Collections, generics, and LINQ"),
      useModule("Delegates, events, exceptions, and resources", {
        title: "Exceptions and explicit outcomes",
        concepts: ["Exception flow", "Result versus exception"],
        conclusion: "Expected business outcomes should be explicit; exceptions should preserve evidence about failures callers cannot handle normally.",
        mission: "Implement one operation with expected validation outcomes and one unexpected failure, then test and debug both paths."
      }),
      useModule("Automated testing strategy", {
        title: "First automated tests",
        concepts: ["Unit tests", "Test doubles"],
        conclusion: "A focused automated test proves observable behaviour quickly and isolates collaborators only when isolation adds value.",
        mission: "Write unit tests for a small price calculator, including a successful path, invalid input, and a failing collaborator."
      })
    ]
  },
  {
    title: "3. Essential asynchronous C#",
    description: "Learn non-blocking work and resource lifetime before writing web and database code",
    category: "foundation",
    modules: [
      useModule("Task-based asynchronous programming", {
        title: "Async and await fundamentals",
        concepts: ["Task and Task<T>", "async and await control flow", "I/O-bound versus CPU-bound", "CancellationToken", "Async failure and timeout"],
        conclusion: "Async represents incomplete work and releases threads during I/O; cancellation and failures must flow through every layer.",
        mission: "Trace a cancellable asynchronous operation in the debugger and explain when execution yields, resumes, fails, and stops."
      }),
      useModule("Delegates, events, exceptions, and resources", {
        title: "Deterministic resource lifetime",
        concepts: ["IDisposable and await using"],
        conclusion: "Resources with external lifetimes must be released deterministically on success, failure, and cancellation.",
        mission: "Use using and await using around disposable resources, deliberately throw inside each scope, and verify cleanup still runs."
      }),
      useModule("Runtime, allocation, and disposal", {
        title: "Managed and external resources",
        concepts: ["Managed versus unmanaged resources"],
        conclusion: "The garbage collector manages object memory, while handles, streams, and connections still need explicit lifetime ownership.",
        mission: "Classify the resources used by a small backend operation and document which component owns and releases each one."
      })
    ]
  },
  {
    title: "4. .NET application foundation",
    description: "Understand the host, dependency graph, and configuration before ASP.NET Core",
    category: "foundation",
    modules: [
      useModule("Hosting, lifecycle, and background work", {
        title: "The .NET generic host",
        concepts: ["Generic host"],
        conclusion: "The generic host owns application startup, configuration, dependency injection, logging, and shutdown.",
        mission: "Trace a .NET application's startup from Program.cs to a resolved service and explain what the host creates."
      }),
      useModule("Dependency injection and lifetimes"),
      useModule("Configuration, options, and environments")
    ]
  },
  {
    title: "5. HTTP and your first ASP.NET Core API",
    description: "Build and test a complete in-memory request before adding a database",
    category: "foundation",
    modules: [
      useModule("HTTP and browser fundamentals"),
      useModule("Hosting, lifecycle, and background work", {
        title: "Kestrel and reverse proxies",
        concepts: ["Kestrel and reverse proxies"],
        conclusion: "Kestrel accepts application HTTP traffic while IIS or another reverse proxy may own the public connection and forward requests.",
        mission: "Run an ASP.NET Core app directly and behind IIS or a documented proxy diagram, then identify each network boundary."
      }),
      useModule("ASP.NET Core request pipeline"),
      useModule("Production API design", {
        title: "First API contracts and validation",
        concepts: ["DTOs and contract boundaries", "Validation", "Resource-oriented routes", "OpenAPI"],
        conclusion: "A first API needs an explicit contract, truthful HTTP behaviour, boundary validation, and discoverable documentation.",
        mission: "Build a disposable in-memory books API with request and response DTOs, validation, Problem Details, and OpenAPI."
      }),
      useModule("Automated testing strategy", {
        title: "ASP.NET Core integration and contract tests",
        concepts: ["Integration tests", "API and contract tests"],
        conclusion: "Integration tests prove that routing, binding, middleware, serialization, DI, and endpoint behaviour work together.",
        mission: "Test the first API through its real HTTP pipeline, including success, invalid input, missing resources, and stable response contracts."
      })
    ]
  },
  {
    title: "6. SQL Server and EF Core persistence",
    description: "Learn relational storage before asking an API to persist real state",
    category: "foundation",
    modules: [
      useModule("Relational modelling"),
      useModule("SQL querying"),
      useModule("EF Core fundamentals"),
      useModule("Transactions, migrations, and concurrency"),
      useModule("Indexes and query performance"),
      useModule("Automated testing strategy", {
        title: "Database integration testing",
        concepts: ["Testcontainers and test data"],
        conclusion: "Database tests need a repeatable real schema and deterministic data so mappings, constraints, transactions, and SQL are genuinely exercised.",
        mission: "Run a small loans-data exercise against an isolated SQL Server database and prove one constraint and one transaction boundary."
      })
    ]
  },
  {
    title: "7. Secure production APIs",
    description: "Evolve the working database-backed API into a dependable public contract",
    category: "production",
    modules: [
      useModule("Production API design", {
        title: "API evolution and query contracts",
        concepts: ["Pagination, filtering, and sorting", "Backward compatibility and versioning"],
        conclusion: "Production APIs bound collection work, make queries deterministic, and evolve without surprising existing clients.",
        mission: "Add deterministic paging, filtering, and sorting to a disposable orders API, then make one backward-compatible contract change."
      }),
      useModule("Authentication and authorization"),
      useModule("Web application security"),
      useModule("Identity and secrets"),
      useModule("Outbound HTTP and integrations")
    ]
  },
  {
    title: "8. Architecture through real refactoring",
    description: "Introduce boundaries and patterns only after you have working code to improve",
    category: "production",
    modules: [
      useModule("Coupling, cohesion, and SOLID"),
      useModule("Application boundaries and Clean Architecture"),
      useModule("Domain modelling and patterns"),
      useModule("Refactoring and legacy evolution"),
      useModule("Automated testing strategy", {
        title: "Testing depth and confidence",
        concepts: ["Coverage and mutation thinking"],
        conclusion: "Coverage can reveal unexecuted code, but only meaningful assertions and mutation resistance indicate useful test protection.",
        mission: "Measure a small discount-calculator test suite, identify one falsely reassuring test, and strengthen it until a deliberate mutation is caught."
      })
    ]
  },
  {
    title: "9. Umbraco 17 application development",
    description: "Apply the transferable .NET, HTTP, data, security, and architecture foundations to Umbraco",
    category: "platform",
    modules: [
      useModule("Content modelling and editor experience"),
      useModule("Published content and content services"),
      useModule("Composition, notifications, and extension points"),
      useModule("Routing, APIs, and headless delivery")
    ]
  },
  {
    title: "10. Advanced runtime and reliable processing",
    description: "Add concurrency and background work after transactions and failure handling are understood",
    category: "production",
    modules: [
      useModule("Task-based asynchronous programming", {
        title: "Concurrent asynchronous work",
        concepts: ["Task.WhenAll and bounded concurrency"],
        conclusion: "Independent asynchronous operations can overlap, but concurrency must be bounded by downstream capacity.",
        mission: "Run independent calls sequentially and concurrently, measure the difference, then add a deliberate concurrency limit."
      }),
      useModule("Concurrency and thread safety"),
      useModule("Runtime, allocation, and disposal", {
        title: "Runtime behaviour and allocation",
        concepts: ["Garbage-collection generations", "Finalizers and disposal", "Strings, spans, and pooling", "Memory leaks in managed code"],
        conclusion: "Runtime optimization starts with correct ownership and measurement, not low-level techniques applied by instinct.",
        mission: "Profile one disposable text-processing endpoint, explain its allocation and retention behaviour, and improve only a measured problem."
      }),
      useModule("Hosting, lifecycle, and background work", {
        title: "Hosted services and application lifecycle",
        concepts: ["IHostedService and BackgroundService", "Graceful shutdown", "Health checks"],
        conclusion: "Long-running services need explicit scopes, cooperative shutdown, and health signals that reflect their ability to do work.",
        mission: "Create a scoped background worker, stop it during processing, and verify cancellation, cleanup, and health behaviour."
      }),
      useModule("Reliable background processing")
    ]
  },
  {
    title: "11. Production operation and Umbraco delivery",
    description: "Measure, tune, deploy, and recover the completed application",
    category: "production",
    modules: [
      useModule("Observability and diagnosis"),
      useModule("Performance and caching"),
      useModule("Search, caching, and media"),
      useModule("Delivery, IIS, containers, and CI/CD"),
      useModule("Operations, upgrades, and Umbraco Cloud")
    ]
  },
  {
    title: "12. Senior engineering",
    description: "Make sound decisions under scale, uncertainty, and shared ownership",
    category: "production",
    modules: [
      useModule("Distributed-system fundamentals"),
      useModule("System design and trade-offs"),
      useModule("Technical leadership"),
      useModule("Professional depth")
    ]
  }
];

const sessions = [
  ["Explore", "See the model", ["Read one short visual explanation", "Draw the flow or memory model", "Predict small code examples"], "If you want more: read one primary documentation page"],
  ["Practice", "Code and debug", ["Type the examples yourself", "Repair a deliberate defect", "Inspect runtime state in the debugger"], "If you want more: create a harder failure case"],
  ["Apply", "Try a focused exercise", ["Predict the result before running", "Type or modify the small example", "Explain why the result occurs"], "If you want more: create one variation"],
  ["Verify", "Test and operate", ["Add automated tests", "Inspect logs or SQL", "Test failure and edge cases"], "If you want more: measure performance or security"],
  ["Review", "Mastery gate", ["Recall without notes", "Complete the module mission", "Mark weak concepts for reinforcement"], "If you want more: try the senior trade-off challenge"]
];

const quizQuestions = [
  { track: "C#", q: "Two variables reference the same List<int>. One variable calls Add(4). What does the other variable observe?", a: ["The original list only", "The added value too", "A compile error", "A copied list"], correct: 1, why: "Both variables hold references to the same mutable list object, so mutation is visible through either reference." },
  { track: "C#", q: "When does a typical LINQ Where query over a List execute if ToList is not called?", a: ["When Where is called", "At compilation", "When the result is enumerated", "Only during garbage collection"], correct: 2, why: "Where normally uses deferred execution. Enumeration by foreach, ToList, Count, or another consumer runs the query." },
  { track: "C#", q: "What happens when an async method reaches an await whose Task is incomplete?", a: ["The process blocks", "The method returns an incomplete Task and later resumes", "A new thread is always created", "The awaited value becomes null"], correct: 1, why: "The method yields control and returns its Task. Its continuation resumes after the awaited operation completes." },
  { track: "C#", q: "Which statement best describes a record?", a: ["It always lives on the stack", "It cannot contain methods", "It provides concise value-oriented equality semantics", "It is automatically thread-safe"], correct: 2, why: "Records are designed for value-oriented data and supply value-based equality; they are not automatically immutable or thread-safe." },
  { track: ".NET", q: "Why is injecting a scoped DbContext into a singleton unsafe?", a: ["Singletons cannot use constructors", "The singleton captures a shorter-lived, non-thread-safe dependency", "DbContext only works in controllers", "It disables SQL indexes"], correct: 1, why: "The singleton can retain the scoped context beyond its request and use it concurrently or after disposal." },
  { track: ".NET", q: "What does dotnet publish primarily produce?", a: ["A Git branch", "Deployable application output", "A database backup", "Only unit-test results"], correct: 1, why: "Publish prepares the application and its runtime assets for deployment according to the selected options." },
  { track: ".NET", q: "Which component directly accepts HTTP connections in a typical ASP.NET Core app?", a: ["Serilog", "Kestrel", "Entity Framework", "NuGet"], correct: 1, why: "Kestrel is ASP.NET Core's web server. IIS may act as a reverse proxy and process manager in front of it." },
  { track: "Web/API", q: "Which method is most appropriate for retrieving a project without changing state?", a: ["GET", "POST", "DELETE", "PATCH"], correct: 0, why: "GET is defined as a safe retrieval method and should not perform state-changing operations." },
  { track: "Web/API", q: "An authenticated user lacks permission for a resource. Which response normally applies?", a: ["400", "401", "403", "500"], correct: 2, why: "401 means authentication is required or failed. 403 means the authenticated identity is not permitted." },
  { track: "Web/API", q: "Why should an API normally return DTOs instead of EF entities?", a: ["DTOs always query faster", "DTOs protect a stable contract and hide persistence details", "EF entities cannot serialize", "DTOs remove the need for validation"], correct: 1, why: "DTOs decouple public contracts from persistence shape, tracking state, navigation cycles, and accidental field exposure." },
  { track: "Web/API", q: "Which is the best response when a valid request conflicts with the resource's current state?", a: ["201 Created", "204 No Content", "409 Conflict", "502 Bad Gateway"], correct: 2, why: "409 communicates that the request cannot be completed because of the current resource state, such as an already completed transition." },
  { track: "Data", q: "Which join keeps every ticket even when it has no comments?", a: ["INNER JOIN", "LEFT JOIN from Tickets", "CROSS JOIN", "SELF JOIN"], correct: 1, why: "A left join preserves all rows from the left table and supplies nulls when no right-side row matches." },
  { track: "Data", q: "Why use COUNT(comment.Id) instead of COUNT(*) after a left join?", a: ["COUNT(*) is invalid SQL", "COUNT(column) ignores the null placeholder for no match", "COUNT(column) sorts first", "They are always identical"], correct: 1, why: "COUNT(*) counts the preserved ticket row, while COUNT(comment.Id) ignores null and correctly reports zero comments." },
  { track: "Data", q: "What problem does a SQL Server rowversion concurrency token help detect?", a: ["Missing NuGet packages", "A stale update overwriting a newer update", "An invalid password", "A slow DNS lookup"], correct: 1, why: "The update includes the original token; if another write changed it, zero rows match and EF reports a concurrency conflict." },
  { track: "Data", q: "What does an index generally trade for faster reads?", a: ["Authentication", "Storage and write maintenance cost", "Data types", "HTTP connections"], correct: 1, why: "Indexes occupy space and must be maintained during writes. Their benefit depends on actual query patterns." },
  { track: "Architecture", q: "TicketService uses IEmailSender. Which relationship is this?", a: ["Inheritance", "Composition", "Boxing", "Serialization"], correct: 1, why: "TicketService has or uses an email-sending capability; it is not itself a kind of email sender." },
  { track: "Architecture", q: "What should determine whether a new interface is useful?", a: ["Every class needs one", "Whether it protects a real boundary or variation", "Whether the class has two methods", "Whether dependency injection is installed"], correct: 1, why: "Interfaces have maintenance cost. Use them when callers need a stable capability, substitution, or architectural boundary." },
  { track: "Architecture", q: "In Clean Architecture, where should dependencies point?", a: ["Toward framework code", "Toward stable business policy", "Toward controllers", "Toward the largest project"], correct: 1, why: "Outer details depend on inner policy. Domain and application logic should not require HTTP, EF Core, or Umbraco types." },
  { track: "Testing/Security", q: "What does a database integration test prove that a mocked repository unit test cannot?", a: ["The method compiles", "Real mappings, constraints, SQL, and provider behaviour", "The UI has correct colors", "The API is publicly reachable"], correct: 1, why: "A real test database exercises actual translation, schema, constraints, transactions, and provider-specific behaviour." },
  { track: "Testing/Security", q: "A malicious site submits a form while the victim's authentication cookie is attached. What attack is this?", a: ["SQL injection", "CSRF", "DNS poisoning", "Buffer overflow"], correct: 1, why: "CSRF abuses the browser's automatic credential attachment to initiate a state-changing request from another site." },
  { track: "Testing/Security", q: "Which control directly prevents SQL input from becoming executable query syntax?", a: ["Parameterized queries", "CORS", "A singleton service", "Response caching"], correct: 0, why: "Parameters keep data separate from SQL syntax. String escaping and manual concatenation are fragile substitutes." },
  { track: "Production", q: "Which telemetry is best for following one request across several services?", a: ["A deployment zip", "A distributed trace", "A CSS source map", "A database migration"], correct: 1, why: "Trace and span context connect the operations and latency belonging to one distributed request." },
  { track: "Production", q: "Why can an unrestricted retry policy make an outage worse?", a: ["Retries delete logs", "Retries amplify load on a failing dependency", "Retries disable TLS", "Retries stop garbage collection"], correct: 1, why: "Immediate or unlimited retries create retry storms. Limit attempts and use backoff, jitter, and a total time budget." },
  { track: "Production", q: "What problem does the transactional outbox address?", a: ["Atomic persistence of state and intent to publish", "CSS caching", "Password hashing", "Git conflicts"], correct: 0, why: "The database transaction records both the state change and an outbox message; a worker can safely publish later." },
  { track: "Umbraco 17", q: "Which API category is intended for routine frontend reads of published content?", a: ["Published content APIs", "Content Service mutation APIs", "Database table writes", "Migration APIs"], correct: 0, why: "Published APIs read the cached public representation. Content services are intended for editable content management operations." },
  { track: "Umbraco 17", q: "Which Examine index should not be used to expose public search results containing only published content?", a: ["External index", "Internal index", "A purpose-built public index", "None of these"], correct: 1, why: "The internal index supports backoffice needs and can include unpublished content; public search must respect publication visibility." },
  { track: "Umbraco 17", q: "What is the main purpose of an Umbraco composer?", a: ["Write CSS", "Customize application composition and registrations at startup", "Store media binaries", "Execute SQL joins"], correct: 1, why: "Composers participate in startup composition to register services, handlers, and extension collection items." },
  { track: "Senior", q: "What is the first step in a system-design discussion?", a: ["Choose microservices", "Clarify requirements and constraints", "Add Redis", "Draw database tables"], correct: 1, why: "Architecture choices can only be evaluated against functional needs, quality requirements, constraints, and expected scale." },
  { track: "Senior", q: "Which statement best describes senior-level code review?", a: ["Enforce personal style", "Find only syntax errors", "Improve correctness, risk, maintainability, and shared understanding", "Rewrite the author’s code"], correct: 2, why: "Review protects the system and helps the team reason better; formatting should largely be automated." },
  { track: "Senior", q: "Why is eventual consistency sometimes accepted?", a: ["Databases are optional", "Immediate cross-boundary consistency may be unavailable or too costly", "It guarantees no duplicates", "It removes failure handling"], correct: 1, why: "Distributed boundaries cannot share simple atomic updates. Some workflows accept temporary divergence and reconcile reliably." }
];

const storageKey = "backend-field-guide-progress-v4";
const state = { completed: new Set(JSON.parse(localStorage.getItem(storageKey) || "[]")) };
const courseStorageKey = "backend-field-guide-course-v3";
const courseState = JSON.parse(localStorage.getItem(courseStorageKey) || "{}");
const courseLessons = window.courseLessons || {};
let activeConcept = null;
let activeCourseStep = "lesson";

const allConcepts = [];
const toStableId = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
stages.forEach((stage) => stage.modules.forEach((module) => module.concepts.forEach((concept) => {
  concept.id = `${toStableId(module.title)}--${toStableId(concept.title)}`;
  concept.stage = stage;
  concept.module = module;
  allConcepts.push(concept);
})));

function learningDomain(concept) {
  const text = `${concept.stage.title} ${concept.module.title} ${concept.title}`.toLowerCase();
  if (text.includes("umbraco") || /published content|content service|examine|media/.test(text)) return "Umbraco";
  if (/sql|database|relational|index|query|transaction|migration|ef core/.test(text)) return "Data";
  if (/http|api|authentication|authorization|security|identity|secret|webhook|csrf|cors/.test(text)) return "Web/API";
  if (/test|coverage|mutation/.test(text)) return "Testing";
  if (/architecture|solid|coupling|cohesion|domain model|refactor|legacy/.test(text)) return "Architecture";
  if (/observability|logging|trace|performance|cache|delivery|iis|container|ci\/cd|cloud|distributed|system design|leadership|professional/.test(text)) return "Production";
  if (/git|visual studio|debugger|cli|build|ai discipline|practice/.test(text)) return "Tooling";
  if (/async|task|concurren|thread|runtime|garbage|resource|disposal|host|dependency injection|configuration/.test(text)) return ".NET";
  return "C#";
}

const domainGuides = {
  "C#": {
    lens: "Read the code from types and values outward: identify what each variable contains, which operation changes state, and what the caller can observe.",
    evidence: "Predict the output, run the smallest example, and explain any difference using language semantics rather than intuition.",
    misuse: "Choosing syntax because it looks modern without checking its value, lifetime, equality, or mutation semantics.",
    code: "var values = new List<int> { 1, 2, 3 };\nvar result = values.Where(value => value > 1).ToArray();\n\nConsole.WriteLine(string.Join(\", \", result));"
  },
  ".NET": {
    lens: "Trace ownership and lifetime: who creates the work or resource, who awaits or uses it, and who cancels, disposes, or releases it.",
    evidence: "Use the debugger and logs to observe startup, lifetime, cancellation, failure, and cleanup instead of assuming the framework handles them.",
    misuse: "Hiding lifetime or failure boundaries behind convenience APIs and then relying on accidental framework behaviour.",
    code: "using var cancellation = new CancellationTokenSource(TimeSpan.FromSeconds(2));\nawait Task.Delay(100, cancellation.Token);\nConsole.WriteLine(\"Completed\");"
  },
  "Web/API": {
    lens: "Treat the request and response as a public contract. Separate transport validation, authorization, business rules, and infrastructure failure.",
    evidence: "Send a successful request plus invalid, missing, unauthenticated, forbidden, and conflicting cases; verify status and response shape.",
    misuse: "Returning 200 for every outcome or exposing internal models and exception details as the public contract.",
    code: "POST /tickets/42/close HTTP/1.1\nAuthorization: Bearer <token>\nContent-Type: application/json\n\n{}\n\nExpected cases: 200, 400, 401, 403, 404, 409"
  },
  Data: {
    lens: "Start from the data question, model the keys and constraints, then reason about the exact rows read or changed and the transaction boundary.",
    evidence: "Run the query against small known data, inspect the result and execution plan, and test duplicates, missing relationships, and concurrent changes.",
    misuse: "Accepting a query because it returns plausible rows without checking cardinality, null behaviour, constraints, or cost.",
    code: "SELECT t.Id, t.Title, COUNT(c.Id) AS CommentCount\nFROM Tickets AS t\nLEFT JOIN Comments AS c ON c.TicketId = t.Id\nGROUP BY t.Id, t.Title;"
  },
  Testing: {
    lens: "State one observable behaviour, arrange only the data it needs, perform one action, and assert the result that matters to a caller.",
    evidence: "Make the test fail for the intended reason, restore the implementation, and confirm the test protects behaviour rather than its internal steps.",
    misuse: "Mocking every class or chasing coverage while assertions fail to detect meaningful defects.",
    code: "[Fact]\npublic void Close_WhenAlreadyClosed_ReturnsConflict()\n{\n    var ticket = Ticket.Closed();\n\n    var result = ticket.Close();\n\n    Assert.Equal(CloseResult.AlreadyClosed, result);\n}"
  },
  Architecture: {
    lens: "Name the policy, the volatile detail, and the direction of dependency. Add a boundary only when it protects a real responsibility or source of change.",
    evidence: "Replace or test the outer detail without changing the inner policy, then explain the trade-off introduced by the abstraction.",
    misuse: "Creating an interface and layer for every class even when no useful boundary, variation, or test seam exists.",
    code: "public sealed class CloseTicketHandler(ITicketRepository tickets)\n{\n    public async Task<CloseResult> HandleAsync(int id, CancellationToken token)\n    {\n        var ticket = await tickets.FindAsync(id, token);\n        return ticket is null ? CloseResult.NotFound : ticket.Close();\n    }\n}"
  },
  Umbraco: {
    lens: "Decide whether the operation reads published content or changes editable content, then use the matching Umbraco API and lifecycle extension point.",
    evidence: "Test published and unpublished states, permissions, cache behaviour, and the relevant environment instead of writing directly to Umbraco tables.",
    misuse: "Using mutation services for routine frontend reads, bypassing published-state rules, or treating Umbraco database tables as a public API.",
    code: "public sealed class ArticleService(IPublishedContentQuery contentQuery)\n{\n    public IPublishedContent? Find(Guid key) => contentQuery.Content(key);\n}"
  },
  Production: {
    lens: "Define the expected load and failure first, then choose the smallest mechanism that makes the system observable, recoverable, and safe to operate.",
    evidence: "Use measurements, structured telemetry, a failure drill, and a rollback or recovery path to prove the operational claim.",
    misuse: "Adding infrastructure by fashion or optimizing a guessed bottleneck without a baseline and failure model.",
    code: "Log.Information(\n    \"Handled {Operation} for {EntityId} in {ElapsedMs} ms\",\n    operation, entityId, elapsed.TotalMilliseconds);"
  },
  Tooling: {
    lens: "Use the tool to collect evidence. Begin with a prediction, observe the actual build or runtime state, and record what changed your conclusion.",
    evidence: "Repeat the task without hidden IDE assistance and explain the command, debugger view, or source-control operation that proved the result.",
    misuse: "Clicking until an error disappears or accepting generated output without understanding which input, state, or command produced it.",
    code: "dotnet restore\ndotnet build --no-restore\ndotnet test --no-build\ndotnet run --project src/MyApp"
  }
};

function specificPractice(concept, guide) {
  const title = concept.title.toLowerCase();
  if (/attempt before assistance|ask for hints|verify generated|retrieval practice|own every retained line/.test(title)) return {
    code: "Problem: A ticket closes locally but remains open after refresh.\n\nMy prediction:\nEvidence I will collect:\nSmallest reproduction:\nFirst fix attempt:\nWhat I will ask AI only after the attempt:\nHow I will verify the retained code:",
    question: "Fill this out for a real or invented defect. Which parts must exist before you ask AI for a solution?",
    answer: "Write the prediction, evidence plan, reproduction, and first attempt yourself. Use AI for a hint or review, then verify every retained claim and line with execution, tests, debugging, logs, or primary documentation."
  };
  if (/breakpoint|call stack|locals|watches|exception settings|navigate|find references/.test(title)) return {
    code: "static int Total(int quantity, int price)\n{\n    var subtotal = quantity * price;\n    return subtotal;\n}\n\nConsole.WriteLine(Total(3, 20));",
    question: "Where would you pause, what value would you predict, and which debugger view proves the caller and current state?",
    answer: "Pause inside Total, predict subtotal as 60, inspect Locals or Watch for values, and use Call Stack to identify the caller. Change an input and repeat instead of relying on the source alone."
  };
  if (/project|solution|restore|build|run|publish|msbuild|launch profile|git/.test(title)) return {
    code: "dotnet restore\ndotnet build --no-restore\ndotnet test --no-build\ndotnet run --project src/MyApp\ndotnet publish src/MyApp -c Release",
    question: "State the distinct output or responsibility of each command, then identify which launch-profile settings an IDE may add when it runs the app.",
    answer: "Restore resolves packages, build compiles, test runs tests, run starts the project, and publish creates deployable output. Launch profiles can add URLs, environment names, and process variables; Git separately records content history and collaboration state."
  };
  if (/date|utc|time zone/.test(title)) return {
    code: "var instant = DateTimeOffset.Parse(\"2026-10-07T08:00:00Z\");\nvar manila = TimeZoneInfo.FindSystemTimeZoneById(\"Asia/Manila\");\nConsole.WriteLine(TimeZoneInfo.ConvertTime(instant, manila));",
    question: "Which value is the unambiguous instant, and at what boundary is local time introduced?",
    answer: "DateTimeOffset preserves the instant and offset. Conversion introduces Manila local time only for display or another explicit local-time requirement."
  };
  if (/string|culture|parsing|formatting/.test(title)) return {
    code: "var left = \"admin\";\nvar right = \"ADMIN\";\nConsole.WriteLine(string.Equals(left, right, StringComparison.OrdinalIgnoreCase));",
    question: "Why is the comparison rule stated explicitly?",
    answer: "Text comparison depends on purpose. OrdinalIgnoreCase is deterministic for identifiers; user-facing language may require culture-aware rules."
  };
  if (/async|await|task|cancellation|timeout/.test(title)) return {
    code: "using var timeout = new CancellationTokenSource(TimeSpan.FromSeconds(1));\nawait LoadAsync(timeout.Token);\n\nstatic async Task LoadAsync(CancellationToken token)\n{\n    await Task.Delay(100, token);\n}",
    question: "Where must the cancellation token travel, and what happens when cancellation wins?",
    answer: "The token must reach every cancellable async boundary. Await observes cancellation as an OperationCanceledException and cleanup must still run."
  };
  if (/lifetime|singleton|scoped|transient|dependency injection|scope/.test(title)) return {
    code: "services.AddScoped<TicketService>();\nservices.AddScoped<ITicketRepository, TicketRepository>();\n// Draw one request scope and mark who owns each instance.",
    question: "Which component owns these instances, and why must a singleton not capture either service?",
    answer: "The request scope owns scoped services. A singleton outlives that scope and would retain request-specific, potentially disposed or non-thread-safe state."
  };
  if (/status|401|403|route|validation|contract|dto/.test(title)) return {
    code: "GET /api/tickets/999\n\nExpected: 404 Not Found\n\nGET /api/admin/tickets/42\nAuthorization: Bearer <valid-non-admin-token>\n\nExpected: 403 Forbidden",
    question: "Why are these outcomes not successful 200 responses?",
    answer: "HTTP status is part of the contract. A missing resource and an authenticated-but-forbidden caller are different outcomes that clients must handle differently."
  };
  if (/join|sql|query|index|relational/.test(title)) return {
    code: "SELECT t.Id, COUNT(c.Id) AS CommentCount\nFROM Tickets AS t\nLEFT JOIN Comments AS c ON c.TicketId = t.Id\nGROUP BY t.Id;",
    question: "Why are LEFT JOIN and COUNT(c.Id) paired here?",
    answer: "LEFT JOIN keeps tickets without comments. COUNT(c.Id) ignores the null placeholder, producing zero instead of incorrectly counting one row."
  };
  if (/auth|claim|role|policy|csrf|cors|secret|injection|xss/.test(title)) return {
    code: "Request -> authenticate credential -> ClaimsPrincipal\n        -> evaluate policy for resource -> allow or forbid\n        -> execute state change only after authorization",
    question: "Which decision proves identity, and which decision grants permission?",
    answer: "Authentication proves or constructs identity. Authorization separately evaluates whether that identity may perform this action on this resource."
  };
  if (/race|concurren|idempoten|rowversion|optimistic/.test(title)) return {
    code: "Request A reads Version 7\nRequest B reads Version 7\nRequest A updates where Version = 7 -> Version 8\nRequest B updates where Version = 7 -> 0 rows",
    question: "What must Request B do after its conditional update affects zero rows?",
    answer: "It must treat the write as a concurrency conflict, reload current state, and either retry a safe operation or return a conflict for explicit resolution."
  };
  if (/published|content service|composer|notification|examine|umbraco/.test(`${title} ${concept.module.title.toLowerCase()}`)) return {
    code: guide.code,
    question: "Is this a published read, an editable-content mutation, or an application-startup concern, and which Umbraco API owns it?",
    answer: "Classify the operation first. Published APIs serve frontend reads, content services perform controlled mutations, and composers or notifications extend application lifecycle behaviour."
  };
  return {
    code: guide.code,
    question: `What would you inspect or change in this small example to demonstrate ${concept.title} rather than merely describe it?`,
    answer: `${guide.evidence} Relate the observation back to this rule: ${concept.summary}`
  };
}

function createCurriculumLesson(concept) {
  const domain = learningDomain(concept);
  const guide = domainGuides[domain];
  const practice = specificPractice(concept, guide);
  return {
    objectives: [
      `Explain ${concept.title} in plain language and name the problem it addresses.`,
      `Recognize ${concept.title} in unfamiliar ${domain} work.`,
      "Verify the behaviour with a small example or direct operational evidence."
    ],
    sections: [
      {
        title: "Core idea",
        body: concept.summary
      },
      {
        title: "How to reason about it",
        body: guide.lens,
        visual: `${concept.title}\n  -> What problem or constraint exists?\n  -> What observable behaviour follows?\n  -> What evidence would disprove the assumption?`
      },
      {
        title: "Where it fits",
        body: `${concept.module.conclusion} For this concept, do not stop at recognizing the term: connect it to a decision you could defend during implementation or review.`
      }
    ],
    pitfalls: [
      guide.misuse,
      "Memorizing the definition without testing a success path and a failure or edge case.",
      "Using AI output as evidence instead of verifying behaviour with code, tests, logs, a debugger, a query plan, or primary documentation."
    ],
    exercise: {
      title: `Demonstrate ${concept.title}`,
      intro: "Use a temporary console app, test, request, query window, or diagram. Predict the result before running or inspecting it.",
      code: practice.code,
      question: practice.question,
      answer: practice.answer,
      tryNext: `Change one input or assumption so the example fails, then explain how ${concept.title} changes the diagnosis or design.`
    },
    quiz: [
      {
        q: `Which statement best describes ${concept.title}?`,
        a: [
          concept.summary,
          "It is a framework convention that can be applied without considering behaviour or trade-offs.",
          "It is mainly a naming preference and does not affect correctness or maintenance.",
          "It guarantees a correct result without tests, runtime evidence, or boundary validation."
        ],
        correct: 0,
        why: concept.summary
      },
      {
        q: `What is the strongest evidence that you understand ${concept.title}?`,
        a: [
          "You recognize the term when AI or documentation uses it.",
          "You can repeat a definition word for word.",
          "You can predict, demonstrate, explain, and modify a small example, including a failure case.",
          "You used it once and the application compiled."
        ],
        correct: 2,
        why: guide.evidence
      }
    ]
  };
}

allConcepts.forEach((concept) => {
  courseLessons[concept.id] = courseLessons[concept.title] || createCurriculumLesson(concept);
});

const lessonFor = (concept) => courseLessons[concept.id];

document.querySelector("#totalConceptCount").textContent = String(allConcepts.length);

const roadmap = document.querySelector("#roadmap");
const trackFilter = document.querySelector("#trackFilter");
const statusFilter = document.querySelector("#statusFilter");
const searchInput = document.querySelector("#searchInput");
const dialog = document.querySelector("#conceptDialog");
const quizState = { round: [], index: 0, correct: 0, missed: [] };

stages.forEach((stage, index) => {
  const option = document.createElement("option");
  option.value = String(index);
  option.textContent = stage.title;
  trackFilter.append(option);
});

function persist() {
  localStorage.setItem(storageKey, JSON.stringify([...state.completed]));
}

function persistCourse() {
  localStorage.setItem(courseStorageKey, JSON.stringify(courseState));
}

const progressFileFormat = "backend-field-guide-progress";
const progressFileVersion = 1;
const knownConceptIds = new Set(allConcepts.map((concept) => concept.id));

function setProgressTransferStatus(message, type = "") {
  const status = document.querySelector("#progressTransferStatus");
  status.textContent = message;
  status.className = type;
}

function normalizedLessonProgress() {
  return Object.fromEntries(Object.entries(courseState)
    .filter(([conceptId, progress]) => knownConceptIds.has(conceptId) && progress && typeof progress === "object")
    .map(([conceptId, progress]) => [conceptId, {
      reviewed: progress.reviewed === true,
      exerciseRevealed: progress.exerciseRevealed === true,
      quizPassed: progress.quizPassed === true
    }]));
}

function exportProgress() {
  const snapshot = {
    format: progressFileFormat,
    version: progressFileVersion,
    exportedAt: new Date().toISOString(),
    completedConceptIds: [...state.completed].filter((conceptId) => knownConceptIds.has(conceptId)),
    lessonProgress: normalizedLessonProgress()
  };
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
  const downloadUrl = URL.createObjectURL(blob);
  const download = document.createElement("a");
  download.href = downloadUrl;
  download.download = `backend-field-guide-progress-${snapshot.exportedAt.slice(0, 10)}.json`;
  document.body.append(download);
  download.click();
  download.remove();
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
  setProgressTransferStatus(`Exported ${snapshot.completedConceptIds.length} completed concepts.`, "success");
}

function validateProgressSnapshot(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("The file does not contain a progress backup.");
  if (value.format !== progressFileFormat) throw new Error("This JSON file is not a Backend Field Guide progress backup.");
  if (value.version !== progressFileVersion) throw new Error(`Progress backup version ${value.version ?? "unknown"} is not supported.`);
  if (!Array.isArray(value.completedConceptIds)) throw new Error("The completed-concept list is missing or invalid.");
  if (!value.lessonProgress || typeof value.lessonProgress !== "object" || Array.isArray(value.lessonProgress)) throw new Error("The lesson-progress data is missing or invalid.");

  const completedConceptIds = [...new Set(value.completedConceptIds
    .filter((conceptId) => typeof conceptId === "string" && knownConceptIds.has(conceptId)))];
  const lessonProgress = {};
  Object.entries(value.lessonProgress).forEach(([conceptId, progress]) => {
    if (!knownConceptIds.has(conceptId) || !progress || typeof progress !== "object" || Array.isArray(progress)) return;
    lessonProgress[conceptId] = {
      reviewed: progress.reviewed === true,
      exerciseRevealed: progress.exerciseRevealed === true,
      quizPassed: progress.quizPassed === true
    };
  });

  return { completedConceptIds, lessonProgress };
}

async function importProgress(file) {
  if (file.size > 1_000_000) throw new Error("The selected file is too large to be a progress backup.");
  const snapshot = validateProgressSnapshot(JSON.parse(await file.text()));
  const hasCurrentProgress = state.completed.size > 0 || Object.keys(courseState).length > 0;
  if (hasCurrentProgress && !confirm("Replace the progress currently stored in this browser?")) return false;

  state.completed.clear();
  snapshot.completedConceptIds.forEach((conceptId) => state.completed.add(conceptId));
  Object.keys(courseState).forEach((conceptId) => delete courseState[conceptId]);
  Object.assign(courseState, snapshot.lessonProgress);
  persist();
  persistCourse();
  renderRoadmap();
  updateProgress();
  setProgressTransferStatus(`Imported ${snapshot.completedConceptIds.length} completed concepts.`, "success");
  return true;
}

function lessonState(concept) {
  courseState[concept.id] ??= { reviewed: false, exerciseRevealed: false, quizPassed: false };
  return courseState[concept.id];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function updateProgress() {
  const count = state.completed.size;
  const percent = allConcepts.length ? Math.round((count / allConcepts.length) * 100) : 0;
  document.querySelector("#sidebarPercent").textContent = `${percent}%`;
  document.querySelector("#heroPercent").textContent = `${percent}%`;
  document.querySelector("#sidebarBar").style.width = `${percent}%`;
  document.querySelector("#sidebarCount").textContent = `${count} of ${allConcepts.length} concepts complete`;
  renderWeek();
}

function matches(concept, stageIndex) {
  const query = searchInput.value.trim().toLowerCase();
  const selectedTrack = trackFilter.value;
  const selectedStatus = statusFilter.value;
  const searchable = `${concept.title} ${concept.summary} ${concept.module.title} ${concept.stage.title}`.toLowerCase();
  if (query && !searchable.includes(query)) return false;
  if (selectedTrack !== "all" && selectedTrack !== String(stageIndex)) return false;
  if (selectedStatus === "done" && !state.completed.has(concept.id)) return false;
  if (selectedStatus === "open" && state.completed.has(concept.id)) return false;
  return true;
}

function renderRoadmap() {
  roadmap.innerHTML = "";
  let visibleCount = 0;
  let openedAvailableModule = false;
  stages.forEach((stage, stageIndex) => {
    const visibleModules = stage.modules.map((module) => ({
      module,
      concepts: module.concepts.filter((concept) => matches(concept, stageIndex))
    })).filter(({ concepts }) => concepts.length);
    if (!visibleModules.length) return;
    visibleCount += visibleModules.reduce((sum, item) => sum + item.concepts.length, 0);

    const stageElement = document.createElement("section");
    stageElement.className = "stage";
    stageElement.innerHTML = `<div class="stage-meta"><h2>${stage.title}</h2><p>${stage.description}</p></div><div class="modules"></div>`;
    const modulesElement = stageElement.querySelector(".modules");

    visibleModules.forEach(({ module, concepts }, moduleIndex) => {
      const completed = module.concepts.filter((concept) => state.completed.has(concept.id)).length;
      const shouldOpen = !openedAvailableModule;
      if (shouldOpen) openedAvailableModule = true;
      const moduleElement = document.createElement("article");
      moduleElement.className = `module ${shouldOpen ? "open" : ""}`;
        moduleElement.innerHTML = `
        <button class="module-header" aria-expanded="${moduleElement.classList.contains("open")}">
          <span class="module-title"><strong>${module.title}</strong><small>${module.concepts.length} ${module.concepts.length === 1 ? "concept" : "concepts"}, focused examples and checks</small></span>
          <span class="module-progress"><b>${completed}/${module.concepts.length}</b> mastered</span>
        </button>
        <div class="module-body">
          <p class="module-conclusion"><strong>In plain English:</strong> ${module.conclusion}</p>
          <div class="concepts"></div>
        </div>`;
      moduleElement.querySelector(".module-header").addEventListener("click", (event) => {
        moduleElement.classList.toggle("open");
        event.currentTarget.setAttribute("aria-expanded", moduleElement.classList.contains("open"));
      });
      const conceptsElement = moduleElement.querySelector(".concepts");
      concepts.forEach((concept) => {
        const row = document.createElement("div");
        row.className = `concept ${state.completed.has(concept.id) ? "done" : ""}`;
        row.innerHTML = `<input id="concept-${concept.id}" type="checkbox" ${state.completed.has(concept.id) ? "checked" : ""} disabled><label for="concept-${concept.id}">${concept.title}</label><button class="learn-more">${state.completed.has(concept.id) ? "Review lesson" : "Start lesson"}</button>`;
        row.querySelector(".learn-more").addEventListener("click", () => openConcept(concept));
        conceptsElement.append(row);
      });
      modulesElement.append(moduleElement);
    });
    roadmap.append(stageElement);
  });
  document.querySelector("#emptyState").hidden = visibleCount > 0;
}

function openConcept(concept) {
  activeConcept = concept;
  activeCourseStep = "lesson";
  document.querySelector("#dialogTrack").textContent = `${concept.stage.title} / ${concept.module.title}`;
  document.querySelector("#dialogTitle").textContent = concept.title;
  document.querySelector("#dialogSummary").textContent = concept.summary;
  renderCourse();
  dialog.showModal();
}

function renderCourse() {
  const lesson = lessonFor(activeConcept);
  const progress = lessonState(activeConcept);
  const steps = [
    ["lesson", "Learn", true],
    ["exercise", "Practice", progress.reviewed],
    ["quiz", "Knowledge check", progress.exerciseRevealed]
  ];
  document.querySelector("#courseSteps").innerHTML = steps.map(([id, label, enabled]) =>
    `<button data-step="${id}" class="${activeCourseStep === id ? "active" : ""}" ${enabled ? "" : "disabled"}>${label}${stepComplete(id, progress) ? " ✓" : ""}</button>`
  ).join("");
  document.querySelectorAll("#courseSteps button:not(:disabled)").forEach((button) => button.addEventListener("click", () => {
    activeCourseStep = button.dataset.step;
    renderCourse();
  }));

  if (activeCourseStep === "lesson") renderLesson(lesson, progress);
  if (activeCourseStep === "exercise") renderCodeExercise(lesson, progress);
  if (activeCourseStep === "quiz") renderLessonQuiz(lesson, progress);
}

function stepComplete(step, progress) {
  if (step === "lesson") return progress.reviewed;
  if (step === "exercise") return progress.exerciseRevealed;
  if (step === "quiz") return progress.quizPassed;
  return false;
}

function renderLesson(lesson, progress) {
  const sections = lesson.sections.map((section) => `
    <section class="lesson-section">
      <h3>${escapeHtml(section.title)}</h3>
      <p>${escapeHtml(section.body)}</p>
      ${section.visual ? `<pre class="concept-visual">${escapeHtml(section.visual)}</pre>` : ""}
      ${section.code ? `<pre class="code-sample"><code>${escapeHtml(section.code)}</code></pre>` : ""}
    </section>`).join("");
  document.querySelector("#courseContent").innerHTML = `
    <section class="lesson-objectives">
      <h3>What you will be able to do</h3>
      <ul>${lesson.objectives.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>
    ${sections}
    <section class="lesson-section pitfalls">
      <h3>Common mistakes</h3>
      <ul>${lesson.pitfalls.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>
    <div class="course-action">
      <p>${progress.reviewed ? "Lesson reviewed. You can revisit it at any time." : "Explain the idea in your own words before continuing."}</p>
      <button id="finishLesson">${progress.reviewed ? "Continue to code exercise" : "I reviewed the lesson"}</button>
    </div>`;
  document.querySelector("#finishLesson").addEventListener("click", () => {
    progress.reviewed = true;
    persistCourse();
    activeCourseStep = "exercise";
    renderCourse();
  });
}

function renderCodeExercise(lesson, progress) {
  const exercise = lesson.exercise;
  document.querySelector("#courseContent").innerHTML = `
    <section class="course-intro"><h3>${escapeHtml(exercise.title)}</h3><p>${escapeHtml(exercise.intro)}</p></section>
    <section class="lesson-section">
      <h3>Predict before you run it</h3>
      <pre class="code-sample"><code>${escapeHtml(exercise.code)}</code></pre>
      <p><strong>Your question:</strong> ${escapeHtml(exercise.question)}</p>
    </section>
    <section class="lesson-section" id="exerciseAnswer" ${progress.exerciseRevealed ? "" : "hidden"}>
      <h3>Explanation</h3>
      <p>${escapeHtml(exercise.answer)}</p>
      ${exercise.tryNext ? `<p><strong>Try one change:</strong> ${escapeHtml(exercise.tryNext)}</p>` : ""}
    </section>
    <div class="course-action">
      <p>This is a disposable exercise. You do not need to add it to another project or maintain it afterward.</p>
      <button id="revealExercise">${progress.exerciseRevealed ? "Continue to knowledge check" : "Reveal explanation"}</button>
    </div>`;

  document.querySelector("#revealExercise").addEventListener("click", () => {
    if (!progress.exerciseRevealed) {
      progress.exerciseRevealed = true;
      persistCourse();
      renderCourse();
      return;
    }

    activeCourseStep = "quiz";
    renderCourse();
  });
}

function renderLessonQuiz(lesson, progress) {
  document.querySelector("#courseContent").innerHTML = `
    <section class="course-intro"><h3>Knowledge check</h3><p>Answer every question correctly. Explanations appear after submission, and you can retry without penalty.</p></section>
    <form id="lessonQuiz" class="lesson-quiz">
      ${lesson.quiz.map((question, questionIndex) => `
        <fieldset>
          <legend>${questionIndex + 1}. ${escapeHtml(question.q)}</legend>
          ${question.a.map((answer, answerIndex) => `<label><input type="radio" name="question-${questionIndex}" value="${answerIndex}"> <span>${escapeHtml(answer)}</span></label>`).join("")}
          <div class="lesson-answer" id="answer-${questionIndex}"></div>
        </fieldset>`).join("")}
      <div class="course-action"><p id="quizResult">${progress.quizPassed ? "Knowledge check passed. You can complete this concept or retake the quiz." : "Select one answer for each question."}</p><button type="submit">Check answers</button>${progress.quizPassed ? '<button type="button" id="completeConcept">Complete concept</button>' : ""}</div>
    </form>`;
  document.querySelector("#lessonQuiz").addEventListener("submit", (event) => {
    event.preventDefault();
    let correctCount = 0;
    lesson.quiz.forEach((question, questionIndex) => {
      const selected = new FormData(event.currentTarget).get(`question-${questionIndex}`);
      const correct = Number(selected) === question.correct;
      if (correct) correctCount += 1;
      const answer = document.querySelector(`#answer-${questionIndex}`);
      answer.className = `lesson-answer ${correct ? "correct" : "wrong"}`;
      answer.textContent = `${correct ? "Correct. " : `Not yet. The best answer is: ${question.a[question.correct]}. `}${question.why}`;
    });
    if (correctCount === lesson.quiz.length) {
      progress.quizPassed = true;
      persistCourse();
      renderCourse();
    } else {
      document.querySelector("#quizResult").textContent = `${correctCount} of ${lesson.quiz.length} correct. Review the explanations and retry.`;
    }
  });
  document.querySelector("#completeConcept")?.addEventListener("click", completeActiveConcept);
}

function completeActiveConcept() {
  state.completed.add(activeConcept.id);
  persist();
  persistCourse();
  renderRoadmap();
  updateProgress();
  dialog.close();
}

function currentModule() {
  for (const stage of stages) {
    for (const module of stage.modules) {
      if (module.concepts.some((concept) => !state.completed.has(concept.id))) return { stage, module };
    }
  }
  return { stage: stages.at(-1), module: stages.at(-1).modules.at(-1) };
}

function renderWeek() {
  const focus = currentModule();
  const remaining = focus.module.concepts.filter((concept) => !state.completed.has(concept.id));
  document.querySelector("#currentFocus").innerHTML = `<p class="context-line">Current focus / ${focus.stage.title}</p><h2>${focus.module.title}</h2><p>${focus.module.conclusion} When you return, continue with: ${remaining.slice(0, 4).map((concept) => concept.title).join(", ") || "final review"}.</p>`;
  document.querySelector("#weeklySessions").innerHTML = sessions.map(([mode, title, tasks, stretch]) => `
    <article class="session">
      <span class="day">${mode}</span>
      <h3>${title}</h3>
      <ul>${tasks.map((task) => `<li>${task}</li>`).join("")}</ul>
      <div class="stretch">${stretch}</div>
    </article>`).join("");
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index--) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function setupQuizTracks() {
  const select = document.querySelector("#quizTrack");
  select.innerHTML = `<option value="all">Mixed fundamentals</option>${[...new Set(quizQuestions.map((question) => question.track))].map((track) => `<option value="${track}">${track}</option>`).join("")}`;
}

function startQuiz(questions) {
  const selected = document.querySelector("#quizTrack").value;
  const pool = questions || quizQuestions.filter((question) => selected === "all" || question.track === selected);
  quizState.round = shuffle(pool).slice(0, Math.min(5, pool.length));
  quizState.index = 0;
  quizState.correct = 0;
  quizState.missed = [];
  document.querySelector("#retryQuiz").disabled = true;
  updateQuizScore();
  renderQuizQuestion();
}

function updateQuizScore() {
  document.querySelector("#quizScore").textContent = `${quizState.correct}/${quizState.index}`;
}

function renderQuizQuestion() {
  const card = document.querySelector("#quizCard");
  if (quizState.index >= quizState.round.length) {
    const total = quizState.round.length;
    const percent = total ? Math.round((quizState.correct / total) * 100) : 0;
    card.innerHTML = `<p class="quiz-kicker">Round complete</p><h2>${quizState.correct} of ${total} correct, ${percent}%</h2><p class="quiz-note">${quizState.missed.length ? "Review the explanations, then retry the missed questions." : "Strong recall. Reinforce it with one small code example or debugger experiment."}</p>`;
    document.querySelector("#retryQuiz").disabled = quizState.missed.length === 0;
    return;
  }
  const question = quizState.round[quizState.index];
  card.innerHTML = `<p class="quiz-kicker">${question.track} / Question ${quizState.index + 1} of ${quizState.round.length}</p><h2>${question.q}</h2><div class="quiz-answers">${question.a.map((answer, index) => `<button class="quiz-answer" data-index="${index}"><span>${String.fromCharCode(65 + index)}</span>${answer}</button>`).join("")}</div><div id="quizFeedback"></div>`;
  card.querySelectorAll(".quiz-answer").forEach((button) => button.addEventListener("click", () => answerQuiz(Number(button.dataset.index))));
}

function answerQuiz(selected) {
  const question = quizState.round[quizState.index];
  const correct = selected === question.correct;
  if (correct) quizState.correct += 1; else quizState.missed.push(question);
  document.querySelectorAll(".quiz-answer").forEach((button) => {
    const index = Number(button.dataset.index);
    button.disabled = true;
    if (index === question.correct) button.classList.add("correct");
    if (index === selected && !correct) button.classList.add("wrong");
  });
  quizState.index += 1;
  updateQuizScore();
  document.querySelector("#quizFeedback").innerHTML = `<div class="quiz-feedback"><strong>${correct ? "Correct." : "Not quite."}</strong> ${question.why}</div><div class="quiz-actions"><button class="quiz-next">${quizState.index < quizState.round.length ? "Next question" : "See result"}</button></div>`;
  document.querySelector(".quiz-next").addEventListener("click", renderQuizQuestion);
}

document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item === button));
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  document.querySelector(`#${button.dataset.view}View`).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}));

[searchInput, trackFilter, statusFilter].forEach((control) => control.addEventListener("input", renderRoadmap));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector("#resetProgress").addEventListener("click", () => {
  if (!confirm("Reset every completed concept?")) return;
  state.completed.clear();
  Object.keys(courseState).forEach((key) => delete courseState[key]);
  persist();
  persistCourse();
  renderRoadmap();
  updateProgress();
});

document.querySelector("#exportProgress").addEventListener("click", exportProgress);
document.querySelector("#importProgress").addEventListener("click", () => document.querySelector("#progressFile").click());
document.querySelector("#progressFile").addEventListener("change", async (event) => {
  const input = event.currentTarget;
  const [file] = input.files;
  if (!file) return;
  setProgressTransferStatus("Importing progress…");
  try {
    const imported = await importProgress(file);
    if (!imported) setProgressTransferStatus("Import canceled.");
  } catch (error) {
    setProgressTransferStatus(error instanceof SyntaxError ? "The selected file is not valid JSON." : error.message, "error");
  } finally {
    input.value = "";
  }
});

document.querySelector("#copyPrompt").addEventListener("click", async (event) => {
  const prompt = document.querySelector(".prompt-card blockquote").textContent;
  await navigator.clipboard.writeText(prompt);
  event.currentTarget.textContent = "Copied";
  setTimeout(() => { event.currentTarget.textContent = "Copy prompt"; }, 1500);
});

document.querySelector("#startQuiz").addEventListener("click", () => startQuiz());
document.querySelector("#retryQuiz").addEventListener("click", () => startQuiz(quizState.missed));

renderRoadmap();
setupQuizTracks();
updateProgress();
