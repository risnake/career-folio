import type { BuilderState } from '../../../lib/builderTypes';

export default function FunctionalPreview({ state }: { state: BuilderState }) {
  const { name, contact, objective, experienceSections, education, additionalInfo } = state;

  return (
    <div className="font-serif text-[11pt] leading-snug text-black">
      {/* Name */}
      <h1 className="text-center text-xl font-bold uppercase tracking-wide">
        {name || 'Your Name'}
      </h1>

      {/* Contact Info */}
      <div className="mt-1 text-center text-[9pt] text-gray-700">
        {[
          contact.email,
          contact.phone,
          ...(contact.addresses ?? []),
          contact.linkedin,
          contact.website,
        ]
          .filter(Boolean)
          .join(' | ')}
      </div>

      <hr className="my-3 border-black" />

      {/* Objective */}
      {objective && (
        <section className="mb-3">
          <h2 className="mb-1 border-b border-black text-[10pt] font-bold uppercase">
            Objective
          </h2>
          <p className="text-[9.5pt]">{objective}</p>
        </section>
      )}

      {/* Skill-grouped Experience Sections (no individual item titles/orgs/dates) */}
      {experienceSections.map((section, si) => (
        <section key={si} className="mb-3">
          <h2 className="mb-1 border-b border-black text-[10pt] font-bold uppercase">
            {section.title}
          </h2>
          {section.items.map((item, ii) => (
            <div key={ii} className={ii > 0 ? 'mt-1' : ''}>
              {item.bullets.length > 0 && (
                <ul className="ml-4 list-disc text-[9.5pt]">
                  {item.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              )}
              {/* Show minimal employment info if title/org/dates exist (e.g. Employment History) */}
              {(item.title || item.organization) && (
                <div className="mt-0.5 text-[9.5pt]">
                  {item.title && <span className="font-bold">{item.title}</span>}
                  {item.title && item.organization && <span>, </span>}
                  {item.organization && <span>{item.organization}</span>}
                  {item.location && <span>, {item.location}</span>}
                  {item.dates && <span> ({item.dates})</span>}
                </div>
              )}
            </div>
          ))}
        </section>
      ))}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-3">
          <h2 className="mb-1 border-b border-black text-[10pt] font-bold uppercase">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="mt-1.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold">{edu.institution}</span>
                  {edu.location && <span>, {edu.location}</span>}
                </div>
                {edu.dates && (
                  <span className="shrink-0 text-[9pt]">{edu.dates}</span>
                )}
              </div>
              {edu.degree && <div className="italic">{edu.degree}</div>}
              {edu.gpa && <div className="text-[9pt]">GPA: {edu.gpa}</div>}
              {edu.coursework && edu.coursework.length > 0 && (
                <div className="text-[9pt]">
                  Relevant Coursework: {edu.coursework.join(', ')}
                </div>
              )}
              {(() => {
                const clubs = (edu.clubs || []).filter(
                  (club) =>
                    club &&
                    [club.name, club.position, club.impact].some(
                      (field) => typeof field === 'string' && field.trim() !== '',
                    ),
                );
                return clubs.length > 0 ? (
                  <ul className="ml-4 list-disc text-[9pt]">
                    {clubs.map((club, j) => (
                      <li key={j}>
                        <span className="font-semibold">{club.name}</span>
                        {club.position ? ` — ${club.position}` : ''}
                        {club.impact ? `: ${club.impact}` : ''}
                      </li>
                    ))}
                  </ul>
                ) : null;
              })()}
            </div>
          ))}
        </section>
      )}

      {/* Additional Info */}
      {additionalInfo.length > 0 && (
        <section className="mb-3">
          <h2 className="mb-1 border-b border-black text-[10pt] font-bold uppercase">
            Additional Information
          </h2>
          <ul className="ml-4 list-disc text-[9.5pt]">
            {additionalInfo.map((info, i) => (
              <li key={i}>{info}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
