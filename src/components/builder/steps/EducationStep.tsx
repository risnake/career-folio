import { useState } from 'react';
import type { Dispatch } from 'react';
import type { Education, EducationClub } from '../../../data/resumes';
import type { BuilderAction } from '../../../lib/builderTypes';
import { createEmptyEducation } from '../../../lib/resumeDefaults';
import FormField from '../shared/FormField';
import DynamicList from '../shared/DynamicList';
import DateRangeInput from '../shared/DateRangeInput';

const AP_COURSES = [
  'AP Biology',
  'AP Calculus AB',
  'AP Calculus BC',
  'AP Chemistry',
  'AP Computer Science A',
  'AP Computer Science Principles',
  'AP English Language and Composition',
  'AP English Literature and Composition',
  'AP Environmental Science',
  'AP Macroeconomics',
  'AP Microeconomics',
  'AP Physics 1',
  'AP Physics 2',
  'AP Physics C: Mechanics',
  'AP Psychology',
  'AP Statistics',
  'AP United States History',
  'AP World History: Modern',
];

function CourseworkInput({
  coursework,
  onChange,
  id,
}: {
  coursework: string[];
  onChange: (courses: string[]) => void;
  id: string;
}) {
  const [query, setQuery] = useState('');
  const normalized = coursework.map((c) => c.trim()).filter(Boolean);

  const addCourse = (course: string) => {
    const value = course.trim();
    if (!value) return;
    const exists = normalized.some((c) => c.toLowerCase() === value.toLowerCase());
    if (exists) {
      setQuery('');
      return;
    }
    onChange([...normalized, value]);
    setQuery('');
  };

  const removeCourse = (course: string) => {
    onChange(normalized.filter((c) => c !== course));
  };

  const filtered = AP_COURSES.filter(
    (course) =>
      course.toLowerCase().includes(query.toLowerCase()) &&
      !normalized.some((c) => c.toLowerCase() === course.toLowerCase()),
  ).slice(0, 8);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        Relevant Coursework
      </label>
      <p className="text-xs text-gray-500">
        Search AP classes and click to add them, or press Enter to add your own course.
      </p>
      {normalized.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {normalized.map((course) => (
            <span
              key={course}
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-800 px-3 py-1 text-xs border border-blue-200"
            >
              {course}
              <button
                type="button"
                onClick={() => removeCourse(course)}
                className="text-blue-700 hover:text-blue-900"
                aria-label={`Remove ${course}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="space-y-2">
        <input
          id={id}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addCourse(query);
            }
          }}
          placeholder="e.g. AP Biology, Honors Algebra II, Dual Enrollment English"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {filtered.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filtered.map((course) => (
              <button
                key={course}
                type="button"
                onClick={() => addCourse(course)}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 hover:border-blue-400 hover:text-blue-700"
              >
                {course}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const CLUB_TEMPLATES: EducationClub[] = [
  { name: 'Student Council', position: 'Class Representative', impact: 'Planned events and coordinated volunteers' },
  { name: 'National Honor Society', position: 'Member', impact: 'Led tutoring sessions for underclassmen' },
  { name: 'Key Club', position: 'Treasurer', impact: 'Managed fundraising and tracked budgets' },
  { name: 'Robotics Club', position: 'Build Lead', impact: 'Designed mechanisms and ran weekly build meetings' },
  { name: 'DECA', position: 'Competitor', impact: 'Placed in state competition with marketing case study' },
];

function ClubsInput({
  clubs,
  onChange,
  idPrefix,
}: {
  clubs: EducationClub[];
  onChange: (clubs: EducationClub[]) => void;
  idPrefix: string;
}) {
  const addClub = (preset?: EducationClub) => {
    onChange([
      ...clubs,
      {
        name: preset?.name ?? '',
        position: preset?.position ?? '',
        impact: preset?.impact ?? '',
      },
    ]);
  };

  const updateClub = (index: number, partial: Partial<EducationClub>) => {
    onChange(
      clubs.map((club, i) => (i === index ? { ...club, ...partial } : club)),
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Clubs & Activities
        </label>
        <button
          type="button"
          onClick={() => addClub()}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Add club
        </button>
      </div>
      <p className="text-xs text-gray-500">
        Capture club roles and what you accomplished to quickly generate strong bullets.
      </p>
      <div className="flex flex-wrap gap-2">
        {CLUB_TEMPLATES.map((template) => (
          <button
            key={template.name}
            type="button"
            onClick={() => addClub(template)}
            className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 hover:border-blue-400 hover:text-blue-700"
          >
            {template.name}
          </button>
        ))}
      </div>
      <DynamicList
        items={clubs}
        onAdd={() => addClub()}
        onRemove={(index) => onChange(clubs.filter((_, i) => i !== index))}
        addLabel="Add another club"
        renderItem={(club, cIdx) => (
          <div className="space-y-2 p-3 border border-gray-200 rounded-lg bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                label="Club or organization"
                name={`${idPrefix}-club-${cIdx}`}
                value={club.name}
                onChange={(e) => updateClub(cIdx, { name: e.target.value })}
                placeholder="Robotics Club"
              />
              <FormField
                label="Role/Title"
                name={`${idPrefix}-club-role-${cIdx}`}
                value={club.position ?? ''}
                onChange={(e) => updateClub(cIdx, { position: e.target.value })}
                placeholder="Team Lead, Treasurer, Member"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What you did
              </label>
              <textarea
                name={`${idPrefix}-club-impact-${cIdx}`}
                value={club.impact ?? ''}
                onChange={(e) => updateClub(cIdx, { impact: e.target.value })}
                rows={2}
                placeholder="Organized weekly meetings, ran fundraisers, led regional competition team..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}

interface EducationStepProps {
  education: Education[];
  errors: Record<string, string>;
  dispatch: Dispatch<BuilderAction>;
}

export default function EducationStep({ education, errors, dispatch }: EducationStepProps) {
  const update = (index: number, partial: Partial<Education>) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      index,
      education: { ...education[index], ...partial },
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>

      <DynamicList
        items={education}
        onAdd={() => dispatch({ type: 'ADD_EDUCATION' })}
        onRemove={(index) => dispatch({ type: 'REMOVE_EDUCATION', index })}
        addLabel="Add education"
        renderItem={(edu, index) => {
          const details = edu.details ?? [];
          return (
            <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  label="Institution *"
                  name={`edu-institution-${index}`}
                  value={edu.institution}
                  onChange={(e) => update(index, { institution: e.target.value })}
                  error={errors[`education.${index}.institution`]}
                  placeholder="Stanford University"
                />
                <div>
                  <FormField
                    label="Location *"
                    name={`edu-location-${index}`}
                    value={edu.location}
                    onChange={(e) => update(index, { location: e.target.value })}
                    error={errors[`education.${index}.location`]}
                    placeholder="Stanford, CA"
                  />
                  <p className="mt-0.5 text-xs text-gray-400">e.g. City, State or City, Country</p>
                </div>
              </div>

              <FormField
                label="Degree *"
                name={`edu-degree-${index}`}
                value={edu.degree}
                onChange={(e) => update(index, { degree: e.target.value })}
                error={errors[`education.${index}.degree`]}
                placeholder="BA in Computer Science"
              />

              <DateRangeInput
                dates={edu.dates}
                onChange={(dates) => update(index, { dates })}
                namePrefix={`edu-dates-${index}`}
                error={errors[`education.${index}.dates`]}
                required
              />

              <FormField
                label="GPA"
                name={`edu-gpa-${index}`}
                value={edu.gpa ?? ''}
                onChange={(e) => update(index, { gpa: e.target.value })}
                placeholder="3.8/4.0"
              />

              <CourseworkInput
                coursework={edu.coursework ?? []}
                onChange={(courses) => update(index, { coursework: courses })}
                id={`edu-coursework-${index}`}
              />

              <ClubsInput
                clubs={edu.clubs ?? []}
                onChange={(clubs) => update(index, { clubs })}
                idPrefix={`edu-${index}`}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                </label>
                <DynamicList
                  items={details}
                  onAdd={() => update(index, { details: [...details, ''] })}
                  onRemove={(dIdx) =>
                    update(index, { details: details.filter((_, i) => i !== dIdx) })
                  }
                  addLabel="Add detail"
                  renderItem={(detail, dIdx) => (
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => {
                        const updated = [...details];
                        updated[dIdx] = e.target.value;
                        update(index, { details: updated });
                      }}
                      placeholder="Honor, award, or other detail"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
