# Backend Field Guide

A buildless visual learning dashboard spanning C#, .NET, ASP.NET Core, SQL Server, EF Core, architecture, testing, security, production engineering, Umbraco 17, and senior technical leadership.

The twelve-stage curriculum is ordered by prerequisites: a stage assumes only material introduced earlier. It includes persistent mastery checklists, flexible study sessions, concise concept explanations, independent code exercises, and multiple-choice quizzes with retry rounds. Exercises are intentionally small and disposable rather than parts of one long-running project.

The complete roadmap is usable from beginning to end. Every concept contains a concise lesson, a disposable practice exercise with a revealed explanation, and a knowledge check. Six memory-model lessons contain additional hand-authored examples; the remaining lessons are generated from the reviewed curriculum definitions so the learning path stays consistent and maintainable.

## Run locally

Open `dist/index.html` directly, or serve the `dist` directory with any static HTTP server.

Progress is stored only in the browser's local storage. No account or server is required.

Use **Export progress** to download a JSON backup containing completed concepts and partial lesson progress. Use **Import progress** on another browser or device to replace its current progress with that backup. The file contains roadmap identifiers and completion flags only; it contains no account information or lesson answers.

## Publish with GitHub Pages

The included GitHub Actions workflow publishes the `dist` directory whenever `main` is pushed.

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Push `main`, or run **Deploy GitHub Pages** manually from the repository's **Actions** tab.

The hosted site is public. Progress remains browser-local until it is exported and imported on another browser or device.
