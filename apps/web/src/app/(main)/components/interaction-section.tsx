'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const PROVIDERS = [
  {
    id: 'gpt',
    name: 'OpenAI',
    method: 'UseOpenAi',
    model: 'gpt-4o',
    namespace: 'OpenAi',
    logo: '/models/gpt.png',
  },
  {
    id: 'claude',
    name: 'Anthropic',
    method: 'UseAnthropic',
    model: 'claude-3-5-sonnet',
    namespace: 'Anthropic',
    logo: '/models/claude.png',
  },
  {
    id: 'gemini',
    name: 'Google',
    method: 'UseGoogle',
    model: 'gemini-1.5-pro',
    namespace: 'Google',
    logo: '/models/gemini.png',
  },
  {
    id: 'grok',
    name: 'xAI',
    method: 'UseXAi',
    model: 'grok-2',
    namespace: 'xAI',
    logo: '/models/grok.png',
  },
];

type Provider = (typeof PROVIDERS)[0];

const getTabCode = (tabId: string, provider: Provider): string => {
  switch (tabId) {
    case 'text':
      return `using Leap.AI.Core;
using Leap.AI.Providers.${provider.namespace};

var leap = LeapClient.Create()
    .${provider.method}("sk-...", "${provider.model}")
    .UseRetry(maxRetries: 3)
    .Build();

string result = await leap.GenerateTextAsync(
    "Explain quantum entanglement simply."
);

Console.WriteLine(result);`;

    case 'streaming':
      return `using Leap.AI.Core;
using Leap.AI.Providers.${provider.namespace};

var leap = LeapClient.Create()
    .${provider.method}("sk-...", "${provider.model}")
    .Build();

await foreach (var chunk in leap.StreamAsync(
    "Count to 5, one word per line."
))
{
    Console.Write(chunk.Text);
}`;

    case 'structured':
      return `using Leap.AI.Core;
using Leap.AI.Providers.${provider.namespace};

var leap = LeapClient.Create()
    .${provider.method}("sk-...")
    .Build();

public record Recipe(
    string Name,
    int PrepTimeMinutes,
    List<string> Ingredients
);

var recipe = await leap.GenerateObjectAsync<Recipe>(
    "Give me a simple cookie recipe."
);

Console.WriteLine(
    $"{recipe.Name} ({recipe.PrepTimeMinutes}m prep)"
);`;

    case 'tools':
      return `using Leap.AI.Core;
using Leap.AI.Core.Tools;
using Leap.AI.Providers.${provider.namespace};

public record WeatherArgs(string City);

var weatherTool = FunctionTool<WeatherArgs>.Create(
    name: "get_weather",
    description: "Gets weather for a city.",
    handler: args =>
        $"The weather in {args.City} is sunny, 22\u00b0C."
);

var leap = LeapClient.Create()
    .${provider.method}("sk-...")
    .UseTool(weatherTool)
    .Build();

var response = await leap.GenerateTextAsync(
    "What's the weather in Paris?"
);`;

    default:
      return '';
  }
};

const TABS = [
  {
    id: 'text',
    label: 'Text Generation',
    filename: 'generate-text.cs',
    output: {
      prompt: 'Explain quantum entanglement simply.',
      response:
        'Quantum entanglement is like a pair of magic dice \u2014 no matter how far apart they are, when you roll one, the other always shows the matching face instantly. Once two particles are entangled, measuring one immediately determines the state of the other.',
    },
  },
  {
    id: 'streaming',
    label: 'Streaming',
    filename: 'stream-text.cs',
    output: {
      prompt: 'Count to 5, one word per line.',
      response: 'One\nTwo\nThree\nFour\nFive',
    },
  },
  {
    id: 'structured',
    label: 'Structured Data',
    filename: 'generate-object.cs',
    output: {
      prompt: 'Give me a simple cookie recipe.',
      response:
        '{\n  "Name": "Classic Chocolate Chip Cookies",\n  "PrepTimeMinutes": 15,\n  "Ingredients": ["flour", "butter", "sugar", "chocolate chips", "eggs", "vanilla"]\n}',
    },
  },
  {
    id: 'tools',
    label: 'Tool Calling',
    filename: 'tools.cs',
    output: {
      prompt: "What's the weather in Paris?",
      response:
        'The current weather in Paris is sunny with a temperature of 22\u00b0C \u2014 a lovely day to stroll along the Seine!',
    },
  },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const keywords =
    /\b(using|var|await|foreach|in|public|record|string|int|List|new|return|Console)\b/g;
  const strings = /(["`])(?:(?=(\\?))\2.)*?\1/g;
  const comments = /(\/\/.*)/g;
  const types = /\b(LeapClient|FunctionTool|ChatMessage|Recipe|WeatherArgs)\b/g;
  const methods =
    /\.(Create|UseOpenAi|UseAnthropic|UseGoogle|UseXAi|UseRetry|UseTool|Build|GenerateTextAsync|StreamAsync|GenerateObjectAsync|WriteLine|Write)\b/g;

  const highlight = (line: string) => {
    return line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(comments, '<span class="text-neutral-500">$1</span>')
      .replace(strings, '<span class="text-green-400">$&</span>')
      .replace(keywords, '<span class="text-blue-400 font-semibold">$&</span>')
      .replace(types, '<span class="text-yellow-300">$&</span>')
      .replace(methods, '.<span class="text-sky-300">$1</span>');
  };

  return (
    <div className="relative h-full">
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-neutral-500 hover:bg-neutral-800 hover:text-white transition-colors"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      <pre className="h-full overflow-auto p-4 text-[13px] leading-6 font-mono">
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex">
            <span className="mr-4 w-5 shrink-0 text-right text-neutral-600 select-none">
              {i + 1}
            </span>
            <span
              className="text-neutral-300"
              dangerouslySetInnerHTML={{ __html: highlight(line) }}
            />
          </div>
        ))}
      </pre>
    </div>
  );
}

export function InteractionSection() {
  const [activeTab, setActiveTab] = useState('text');
  const [activeProvider, setActiveProvider] = useState<Provider>(PROVIDERS[0]!);
  const tab = TABS.find((t) => t.id === activeTab)!;
  const dynamicCode = getTabCode(activeTab, activeProvider);

  return (
    <section id="demo" className="w-full border-t border-neutral-200 dark:border-neutral-800/60">
      {/* Model / Provider Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-8 border-b border-neutral-200 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/20">
        <div className="flex flex-col items-center sm:items-end">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1">
            Active Provider
          </span>
          <span className="text-sm font-semibold text-neutral-900 dark:text-white">
            {activeProvider.name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProvider(p)}
              className={`group relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
                activeProvider.id === p.id
                  ? 'border-neutral-900 dark:border-white bg-white dark:bg-neutral-800 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] scale-110 z-10'
                  : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={p.logo}
                alt={p.name}
                className={`h-7 w-7 object-contain transition-transform duration-300 ${
                  activeProvider.id === p.id ? 'scale-110' : ''
                }`}
              />
              {activeProvider.id === p.id && (
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-4 rounded-full bg-neutral-900 dark:bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-neutral-200 dark:border-neutral-800/60 px-4 sm:px-6 no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`shrink-0 px-4 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === t.id
                ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Code + Output panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[440px]">
        {/* Code panel */}
        <div className="border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-800/60 bg-neutral-950">
          {/* Code header */}
          <div className="flex items-center gap-1.5 border-b border-neutral-800 px-4 py-2.5">
            <div className="flex gap-1.5 mr-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-neutral-500 font-mono flex-1">{tab.filename}</span>
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800">
              <img src={activeProvider.logo} alt="" className="h-3 w-3 object-contain" />
              <span className="text-[10px] text-neutral-400 font-mono">{activeProvider.model}</span>
            </div>
          </div>
          <CodeBlock code={dynamicCode} />
        </div>

        {/* Output panel */}
        <div className="flex flex-col bg-white dark:bg-neutral-950/50">
          <div className="border-b border-neutral-200 dark:border-neutral-800/60 px-4 py-2.5">
            <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              Live Console Output
            </span>
          </div>
          <div className="flex flex-col gap-4 p-4 sm:p-8 flex-1 overflow-auto">
            {/* Prompt bubble */}
            <div className="self-end max-w-[85%] rounded-2xl rounded-tr-none bg-neutral-100 dark:bg-neutral-800 px-5 py-3 text-[13px] text-neutral-700 dark:text-neutral-200 shadow-sm border border-neutral-200/50 dark:border-neutral-700/50">
              {tab.output.prompt}
            </div>
            {/* Response bubble */}
            <div className="self-start max-w-[90%] rounded-2xl rounded-tl-none bg-neutral-950 dark:bg-neutral-900 px-5 py-3.5 text-[13px] text-neutral-100 whitespace-pre-wrap leading-relaxed shadow-xl border border-neutral-800">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-neutral-800/50">
                <img src={activeProvider.logo} alt="" className="h-3.5 w-3.5 object-contain" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  {activeProvider.name} Response
                </span>
              </div>
              {tab.output.response}
            </div>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="border-t border-neutral-200 dark:border-neutral-800/60 py-4 text-center bg-neutral-50/30 dark:bg-transparent">
        <a
          href="https://www.nuget.org/packages/LeapAi.Sdk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          Explore all <span className="font-bold">100+</span> supported models and custom pipeline
          middleware <span className="ml-1 text-[10px]">↗</span>
        </a>
      </div>
    </section>
  );
}