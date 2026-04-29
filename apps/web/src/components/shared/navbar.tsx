'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sun, Moon, MessageSquare, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: feedbackEmail,
          message: feedbackMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        toast.error(data.error || 'Failed to send feedback');
      } else {
        setFeedbackOpen(false);
        setFeedbackMessage('');
        setFeedbackEmail('');
        toast.success('Feedback sent. Thank you!');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('An unexpected error occurrred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-4 z-50 w-full px-4 flex justify-center pointer-events-none">
      <div className="w-full max-w-5xl pointer-events-auto">
        <div className="flex h-14 items-center justify-between rounded-full border border-neutral-200/60 bg-white/70 px-6 shadow-lg shadow-neutral-200/20 backdrop-blur-xl dark:border-neutral-800/60 dark:bg-neutral-950/70 dark:shadow-black/40 transition-all text-neutral-900 dark:text-neutral-50">
          {/* Left: Logo & Name */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="group flex items-center space-x-2 sm:space-x-3 transition-opacity"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Leap Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="hidden text-lg font-bold tracking-tight sm:block">
                Leap
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/docs/introduction"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
              >
                Docs
              </Link>
            </nav>
          </div>

          {/* Right: Feedback & Theme */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Popover open={feedbackOpen} onOpenChange={setFeedbackOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-full border-neutral-200/60 bg-white/50 hover:bg-neutral-100 dark:border-neutral-800/60 dark:bg-neutral-950/50 dark:hover:bg-neutral-800 px-3 flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Feedback</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 rounded-xl p-4 shadow-xl border-neutral-200/60 bg-white/95 backdrop-blur-xl dark:border-neutral-800/60 dark:bg-neutral-950/95"
                align="end"
                sideOffset={8}
              >
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm leading-none">
                      Send us feedback
                    </h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Help us improve your experience.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-xs text-neutral-700 dark:text-neutral-300"
                      >
                        Email (optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={feedbackEmail}
                        onChange={(e) => setFeedbackEmail(e.target.value)}
                        className="h-9 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-xs text-neutral-700 dark:text-neutral-300"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="What's on your mind?"
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        className="min-h-[100px] resize-none bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Send Feedback
                  </Button>
                </form>
              </PopoverContent>
            </Popover>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-9 w-9 rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                title="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 animate-in zoom-in duration-300" />
                ) : (
                  <Moon className="h-4 w-4 animate-in zoom-in duration-300" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
