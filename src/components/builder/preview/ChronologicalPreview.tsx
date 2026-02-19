import type { BuilderState } from '../../../lib/builderTypes';

export default function ChronologicalPreview({ state }: { state: BuilderState }) {
  const { name, contact, education, experienceSections, skills, additionalInfo } = state;

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
              {edu.clubs && edu.clubs.length > 0 && (
                <ul className="ml-4 list-disc text-[9pt]">
                  {edu.clubs.map((club, j) => (
                    <li key={j}>
                      <span className="font-semibold">{club.name}</span>
                      {club.position ? ` — ${club.position}` : ''}
                      {club.impact ? `: ${club.impact}` : ''}
                    </li>
                  ))}
                </ul>
              )}
              {edu.details && edu.details.length > 0 && (
                <ul className="ml-4 list-disc text-[9pt]">
                  {edu.details.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Experience Sections */}
      {experienceSections.map((section, si) => (
        <section key={si} className="mb-3">
          <h2 className="mb-1 border-b border-black text-[10pt] font-bold uppercase">
            {section.title}
          </h2>
          {section.items.map((item, ii) => (
            <div key={ii} className="mt-1.5">
              <div className="flex items-start justify-between">
                <div>
                  {item.title && <span className="font-bold">{item.title}</span>}
                  {item.title && item.organization && <span>, </span>}
                  {item.organization && <span>{item.organization}</span>}
                  {item.location && <span>, {item.location}</span>}
                </div>
                {item.dates && (
                  <span className="shrink-0 text-[9pt]">{item.dates}</span>
                )}
              </div>
              {item.bullets.length > 0 && (
                <ul className="ml-4 list-disc text-[9.5pt]">
                  {item.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-3">
          <h2 className="mb-1 border-b border-black text-[10pt] font-bold uppercase">
            Skills
          </h2>
          {skills.map((skill, i) => (
            <div key={i} className="text-[9.5pt]">
              <span className="font-bold">{skill.label}: </span>
              {skill.value}
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
