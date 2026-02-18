import { useState } from 'react';
import type { Dispatch } from 'react';
import type {
  BuilderAction,
  BuilderGeneratedResume,
  BuilderState,
  TemplateType,
} from '../../lib/builderTypes';

type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string };

type BuilderChatReply =
  | { type: 'question'; message: string }
  | { type: 'resume'; message: string; resume: BuilderGeneratedResume };

interface AssistantChatProps {
  state: BuilderState;
  dispatch: Dispatch<BuilderAction>;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'initial',
  role: 'assistant',
  content:
    'I can assemble your resume for you. Tell me your target role, key experience, dates, and top accomplishments, and I will ask follow-up questions when needed.',
};

const HELPER_TEXT =
  'The assistant uses a strict JSON schema and will only apply a resume when all required details are gathered. If anything is unclear, it will ask a single follow-up question.';

function buildStateSnapshot(state: BuilderState): BuilderGeneratedResume {
  const template: TemplateType = state.template ?? 'chronological';

  return {
    template,
    name: state.name,
    contact: {
      email: state.contact.email,
      phone: state.contact.phone ?? '',
      addresses: state.contact.addresses ?? [],
      linkedin: state.contact.linkedin ?? '',
      website: state.contact.website ?? '',
    },
    objective: state.objective,
    education: state.education.slice(0, 4).map((edu) => ({
      institution: edu.institution,
      location: edu.location,
      degree: edu.degree,
      dates: edu.dates,
      gpa: edu.gpa,
      coursework: edu.coursework ?? [],
      details: edu.details ?? [],
    })),
    experienceSections: state.experienceSections.slice(0, 4).map((section) => ({
      title: section.title,
      items: section.items.slice(0, 4).map((item) => ({
        title: item.title,
        organization: item.organization,
        location: item.location,
        dates: item.dates,
        bullets: item.bullets.slice(0, 6),
      })),
    })),
    skills: state.skills.slice(0, 10),
    additionalInfo: state.additionalInfo.slice(0, 8),
  };
}

export default function AssistantChat({ state, dispatch }: AssistantChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appliedMessage, setAppliedMessage] = useState<string | null>(null);

  const disabled = loading || input.trim().length === 0;

  const sendMessage = async () => {
    if (disabled) return;
    const userMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      role: 'user',
      content: input.trim(),
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setLoading(true);
      setError(null);
      setAppliedMessage(null);

      try {
        const res = await fetch('/api/builder-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages,
          state: buildStateSnapshot(state),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.reply) {
        throw new Error(data?.error || 'Assistant request failed');
      }

      const reply = data.reply as BuilderChatReply;

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          role: 'assistant',
          content: reply.message,
        },
      ]);

      if (reply.type === 'resume' && reply.resume) {
        dispatch({ type: 'APPLY_AI_RESUME', resume: reply.resume });
        setAppliedMessage('Applied AI-generated resume to the builder.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-7 mb-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">AI intake assistant</p>
            <p className="text-sm text-gray-600">{HELPER_TEXT}</p>
          </div>
          {appliedMessage && (
            <span className="text-xs px-2 py-1 rounded-full bg-forest/10 text-forest border border-forest/40">
              {appliedMessage}
            </span>
          )}
        </div>

        <div
          className="border border-slate-200 rounded-lg bg-gray-50 max-h-80 min-h-[220px] overflow-y-auto p-3 space-y-3 text-sm"
          role="log"
          aria-label="Chat messages"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.map((msg, idx) => (
            <div
              key={msg.id || `${msg.role}-${idx}`}
              className={msg.role === 'assistant' ? 'text-gray-800' : 'text-ink font-medium'}
            >
              <span className="uppercase text-[11px] tracking-wide mr-2 text-gray-500">
                {msg.role === 'assistant' ? 'Assistant' : 'You'}
              </span>
              <span>{msg.content}</span>
            </div>
          ))}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <form
          className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center"
          onSubmit={(e) => {
            e.preventDefault();
            void sendMessage();
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for a resume or answer the assistant's follow-up..."
            aria-label="Message for AI intake assistant"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/70 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={disabled}
            aria-label="Send message to AI intake assistant"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-terracotta/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Working…' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
