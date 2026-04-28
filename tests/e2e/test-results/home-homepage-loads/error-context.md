# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> homepage loads
- Location: tests\home.spec.ts:3:5

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Leap AI Sdk/
Received string:  "Leap AI SDK"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    9 × unexpected value "Leap AI SDK"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner:
      - generic [ref=e4]:
        - link "Leap Logo Leap" [ref=e6] [cursor=pointer]:
          - /url: /
          - img "Leap Logo" [ref=e8]
          - generic [ref=e9]: Leap
        - button "Toggle theme" [ref=e11]:
          - img
    - main [ref=e12]:
      - generic [ref=e13]:
        - generic [ref=e15]:
          - heading "Provider-agnostic AI layer for .NET apps and agents" [level=1] [ref=e16]
          - paragraph [ref=e17]: A unified .NET SDK for building AI-powered apps with streaming, tool calling, and structured output—powered by OpenAI, Anthropic, and Google Gemini.
          - generic [ref=e18]:
            - link "Get Started" [ref=e19] [cursor=pointer]:
              - /url: https://github.com/e89wrhi/leap-ai-sdk
            - link "View Docs" [ref=e21] [cursor=pointer]:
              - /url: "#features"
          - button "Copy install command" [ref=e22]:
            - generic [ref=e23]: $
            - generic [ref=e24]: dotnet add package LeapAi.Sdk
            - img [ref=e26]
        - generic [ref=e29]:
          - generic [ref=e30]:
            - generic [ref=e31]:
              - generic [ref=e32]:
                - generic [ref=e33]: Active Provider
                - generic [ref=e34]: OpenAI
              - generic [ref=e35]:
                - button "OpenAI" [ref=e36]:
                  - img "OpenAI" [ref=e37]
                - button "Anthropic" [ref=e39]:
                  - img "Anthropic" [ref=e40]
                - button "Google" [ref=e41]:
                  - img "Google" [ref=e42]
                - button "xAI" [ref=e43]:
                  - img "xAI" [ref=e44]
            - generic [ref=e45]:
              - button "Text Generation" [ref=e46]
              - button "Streaming" [ref=e47]
              - button "Structured Data" [ref=e48]
              - button "Tool Calling" [ref=e49]
            - generic [ref=e50]:
              - generic [ref=e51]:
                - generic [ref=e52]:
                  - generic [ref=e57]: generate-text.cs
                  - generic [ref=e59]: gpt-4o
                - generic [ref=e60]:
                  - button [ref=e61]:
                    - img [ref=e62]
                  - generic [ref=e65]:
                    - generic [ref=e66]:
                      - generic [ref=e67]: "1"
                      - generic [ref=e68]: using Leap.AI.Core;
                    - generic [ref=e69]:
                      - generic [ref=e70]: "2"
                      - generic [ref=e71]: using Leap.AI.Providers.OpenAi;
                    - generic [ref=e73]: "3"
                    - generic [ref=e74]:
                      - generic [ref=e75]: "4"
                      - generic [ref=e76]: var leap = LeapClient.Create()
                    - generic [ref=e77]:
                      - generic [ref=e78]: "5"
                      - generic [ref=e79]: .UseOpenAi("sk-...", "gpt-4o")
                    - generic [ref=e80]:
                      - generic [ref=e81]: "6"
                      - generic [ref=e82]: ".UseRetry(maxRetries: 3)"
                    - generic [ref=e83]:
                      - generic [ref=e84]: "7"
                      - generic [ref=e85]: .Build();
                    - generic [ref=e87]: "8"
                    - generic [ref=e88]:
                      - generic [ref=e89]: "9"
                      - generic [ref=e90]: string result = await leap.GenerateTextAsync(
                    - generic [ref=e91]:
                      - generic [ref=e92]: "10"
                      - generic [ref=e93]: "\"Explain quantum entanglement simply.\""
                    - generic [ref=e94]:
                      - generic [ref=e95]: "11"
                      - generic [ref=e96]: );
                    - generic [ref=e98]: "12"
                    - generic [ref=e99]:
                      - generic [ref=e100]: "13"
                      - generic [ref=e101]: Console.WriteLine(result);
              - generic [ref=e102]:
                - generic [ref=e103]: Live Console Output
                - generic [ref=e104]:
                  - generic [ref=e105]: Explain quantum entanglement simply.
                  - generic [ref=e106]:
                    - generic [ref=e108]: OpenAI Response
                    - text: Quantum entanglement is like a pair of magic dice — no matter how far apart they are, when you roll one, the other always shows the matching face instantly. Once two particles are entangled, measuring one immediately determines the state of the other.
            - link "Explore all 100+ supported models and custom pipeline middleware ↗" [ref=e110] [cursor=pointer]:
              - /url: https://www.nuget.org/packages/LeapAi.Sdk
          - generic [ref=e111]:
            - generic [ref=e112]:
              - paragraph [ref=e113]: "3"
              - paragraph [ref=e114]: AI Providers
            - generic [ref=e115]:
              - paragraph [ref=e116]: 100+
              - paragraph [ref=e117]: Models supported
            - generic [ref=e118]:
              - paragraph [ref=e119]: "5"
              - paragraph [ref=e120]: NuGet Packages
            - generic [ref=e121]:
              - paragraph [ref=e122]: .NET 10
              - paragraph [ref=e123]: Native support
          - heading "The Provider-Agnostic .NET AI Toolkit" [level=2] [ref=e125]
          - generic [ref=e127]:
            - generic "ASP.NET Core" [ref=e128]: ASP
            - generic "Blazor" [ref=e129]: BLZ
            - generic "MAUI" [ref=e130]: MAU
            - generic "Worker Service" [ref=e131]: SVC
            - generic "Console App" [ref=e132]: CLI
            - generic "Azure Functions" [ref=e133]: AZF
          - generic [ref=e134]:
            - generic [ref=e135]:
              - paragraph [ref=e136]: Multi-provider support.
              - paragraph [ref=e137]: Switch between OpenAI, Anthropic & Google with one line of code.
            - generic [ref=e138]:
              - paragraph [ref=e139]: Streaming that just works.
              - paragraph [ref=e140]: Real-time SSE responses without custom parsing or provider adapters.
            - generic [ref=e141]:
              - paragraph [ref=e142]: Built-in retries & fallbacks.
              - paragraph [ref=e143]: Jittered exponential backoff and automatic failover out of the box.
          - generic [ref=e144]:
            - generic [ref=e145]:
              - generic [ref=e146]:
                - heading "Leap AI Core" [level=3] [ref=e147]
                - paragraph [ref=e148]: A unified API for generating text, structured objects, tool calls, and building agents with any LLM.
              - generic [ref=e149]:
                - generic [ref=e150]: $
                - generic [ref=e151]: dotnet add package Leap.AI.Core
            - generic [ref=e152]:
              - generic [ref=e153]:
                - heading "Leap AI DI Extensions" [level=3] [ref=e154]
                - paragraph [ref=e155]: Official ASP.NET Core IServiceCollection integrations using a fluent builder pipeline pattern.
              - generic [ref=e156]:
                - generic [ref=e157]: $
                - generic [ref=e158]: dotnet add package Leap.AI.Extensions.DependencyInjection
          - generic [ref=e159]:
            - generic [ref=e160]:
              - paragraph [ref=e166]: "\"Leap AI handles streaming, tool-call loops, and structured output in a single, clean pipeline. Every hard problem just disappears.\""
              - generic [ref=e167]:
                - generic [ref=e168]:
                  - paragraph [ref=e169]: Alex M.
                  - paragraph [ref=e170]: Senior Backend Engineer
                - paragraph [ref=e171]: FinTech Co.
            - generic [ref=e172]:
              - paragraph [ref=e178]: "\"We swapped providers in 30 seconds. No code changes outside the builder. That's the kind of abstraction you never want to live without.\""
              - generic [ref=e179]:
                - generic [ref=e180]:
                  - paragraph [ref=e181]: Priya S.
                  - paragraph [ref=e182]: CTO & Founder
                - paragraph [ref=e183]: AI-Start
        - generic [ref=e184]:
          - heading "Start building AI apps in .NET today" [level=2] [ref=e185]
          - paragraph [ref=e186]: Install the Leap AI SDK from NuGet and connect to any LLM provider in minutes.
          - generic [ref=e187]:
            - link "Get started for free" [ref=e188] [cursor=pointer]:
              - /url: https://www.nuget.org/packages/LeapAi.Sdk
            - link "View on GitHub" [ref=e189] [cursor=pointer]:
              - /url: https://github.com/e89wrhi/leap-ai-sdk
              - img [ref=e190]
              - text: View on GitHub
        - generic [ref=e194]:
          - generic [ref=e195]:
            - generic [ref=e196]:
              - paragraph [ref=e197]: GET STARTED
              - list [ref=e198]:
                - listitem [ref=e199]:
                  - link "Installation" [ref=e200] [cursor=pointer]:
                    - /url: "#"
                - listitem [ref=e201]:
                  - link "Quick Start" [ref=e202] [cursor=pointer]:
                    - /url: "#"
                - listitem [ref=e203]:
                  - link "NuGet Packages" [ref=e204] [cursor=pointer]:
                    - /url: https://www.nuget.org/packages/LeapAi.Sdk
            - generic [ref=e205]:
              - paragraph [ref=e206]: BUILD
              - list [ref=e207]:
                - listitem [ref=e208]:
                  - link "Text Generation" [ref=e209] [cursor=pointer]:
                    - /url: "#"
                - listitem [ref=e210]:
                  - link "Streaming" [ref=e211] [cursor=pointer]:
                    - /url: "#"
                - listitem [ref=e212]:
                  - link "Structured Data" [ref=e213] [cursor=pointer]:
                    - /url: "#"
                - listitem [ref=e214]:
                  - link "Tool Calling" [ref=e215] [cursor=pointer]:
                    - /url: "#"
                - listitem [ref=e216]:
                  - link "Agents" [ref=e217] [cursor=pointer]:
                    - /url: "#"
            - generic [ref=e218]:
              - paragraph [ref=e219]: PROVIDERS
              - list [ref=e220]:
                - listitem [ref=e221]:
                  - link "OpenAI" [ref=e222] [cursor=pointer]:
                    - /url: "#"
                - listitem [ref=e223]:
                  - link "Anthropic" [ref=e224] [cursor=pointer]:
                    - /url: "#"
                - listitem [ref=e225]:
                  - link "Google Gemini" [ref=e226] [cursor=pointer]:
                    - /url: "#"
            - generic [ref=e227]:
              - paragraph [ref=e228]: RESOURCES
              - list [ref=e229]:
                - listitem [ref=e230]:
                  - link "GitHub" [ref=e231] [cursor=pointer]:
                    - /url: https://github.com/e89wrhi/leap-ai-sdk
                - listitem [ref=e232]:
                  - link "Changelog" [ref=e233] [cursor=pointer]:
                    - /url: "#"
                - listitem [ref=e234]:
                  - link "Contributing" [ref=e235] [cursor=pointer]:
                    - /url: "#"
          - generic [ref=e236]:
            - paragraph [ref=e237]: © 2026 Leap AI SDK. Open source under the MIT license.
            - generic [ref=e238]:
              - link "Privacy" [ref=e239] [cursor=pointer]:
                - /url: "#"
              - link "Terms" [ref=e240] [cursor=pointer]:
                - /url: "#"
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e246] [cursor=pointer]:
    - img [ref=e247]
  - alert [ref=e250]
```

# Test source

```ts
  1 | import { test, expect } from "@playwright/test"
  2 | 
  3 | test("homepage loads", async ({ page }) => {
  4 |   await page.goto("/")
> 5 |   await expect(page).toHaveTitle(/Leap AI Sdk/)
    |                      ^ Error: expect(page).toHaveTitle(expected) failed
  6 | })
```