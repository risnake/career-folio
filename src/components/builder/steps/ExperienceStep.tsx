import type { Dispatch } from 'react';
import type { ResumeSection, ExperienceItem } from '../../../data/resumes';
import type { BuilderAction, AISuggestion } from '../../../lib/builderTypes';
import FormField from '../shared/FormField';
import DynamicList from '../shared/DynamicList';
import DateRangeInput from '../shared/DateRangeInput';
import BulletEditor from '../shared/BulletEditor';

interface ExperienceStepProps {
  experienceSections: ResumeSection[];
  errors: Record<string, string>;
  dispatch: Dispatch<BuilderAction>;
  aiEnhancements: Record<string, AISuggestion>;
}

export default function ExperienceStep({
  experienceSections,
  errors,
  dispatch,
  aiEnhancements,
}: ExperienceStepProps) {
  const updateSection = (sectionIndex: number, partial: Partial<ResumeSection>) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE_SECTION',
      index: sectionIndex,
      section: { ...experienceSections[sectionIndex], ...partial },
    });
  };

  const updateItem = (sectionIndex: number, itemIndex: number, partial: Partial<ExperienceItem>) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE_ITEM',
      sectionIndex,
      itemIndex,
      item: { ...experienceSections[sectionIndex].items[itemIndex], ...partial },
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Experience</h2>
      <p className="text-sm text-gray-500 mb-4">
        Organize your experience into sections (e.g. Work Experience, Leadership). Each section contains individual positions.
      </p>

      <DynamicList
        items={experienceSections}
        onAdd={() => dispatch({ type: 'ADD_EXPERIENCE_SECTION' })}
        onRemove={(index) => dispatch({ type: 'REMOVE_EXPERIENCE_SECTION', index })}
        addLabel="Add another section (e.g. Leadership, Research)"
        renderItem={(section, sectionIndex) => (
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
            <FormField
              label="Section Title"
              name={`section-title-${sectionIndex}`}
              value={section.title}
              onChange={(e) => updateSection(sectionIndex, { title: e.target.value })}
              error={errors[`experienceSections.${sectionIndex}.title`]}
              placeholder="e.g. Work Experience, Leadership, Research"
            />
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {['Work Experience', 'Professional Experience', 'Leadership', 'Research Experience', 'Volunteer Experience', 'Projects'].map((title) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => updateSection(sectionIndex, { title })}
                  className="text-xs px-2 py-0.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400 transition-colors"
                >
                  {title}
                </button>
              ))}
            </div>

            <div className="space-y-4 pl-4 border-l-2 border-gray-200">
              <DynamicList
                items={section.items}
                onAdd={() => dispatch({ type: 'ADD_EXPERIENCE_ITEM', sectionIndex })}
                onRemove={(itemIndex) =>
                  dispatch({ type: 'REMOVE_EXPERIENCE_ITEM', sectionIndex, itemIndex })
                }
                addLabel="Add position"
                renderItem={(item, itemIndex) => (
                  <div className="space-y-3 p-3 border border-gray-100 rounded-lg bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <FormField
                        label="Position Title"
                        name={`exp-title-${sectionIndex}-${itemIndex}`}
                        value={item.title}
                        onChange={(e) =>
                          updateItem(sectionIndex, itemIndex, { title: e.target.value })
                        }
                        placeholder="Software Engineer"
                      />
                      <FormField
                        label="Organization / Company"
                        name={`exp-org-${sectionIndex}-${itemIndex}`}
                        value={item.organization}
                        onChange={(e) =>
                          updateItem(sectionIndex, itemIndex, { organization: e.target.value })
                        }
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div>
                      <FormField
                        label="Location"
                        name={`exp-loc-${sectionIndex}-${itemIndex}`}
                        value={item.location}
                        onChange={(e) =>
                          updateItem(sectionIndex, itemIndex, { location: e.target.value })
                        }
                        placeholder="San Francisco, CA"
                      />
                      <p className="mt-0.5 text-xs text-gray-400">e.g. City, State or City, Country</p>
                    </div>
                    <DateRangeInput
                      dates={item.dates}
                      onChange={(dates) => updateItem(sectionIndex, itemIndex, { dates })}
                      namePrefix={`exp-dates-${sectionIndex}-${itemIndex}`}
                    />

                    <BulletEditor
                      bullets={item.bullets}
                      onChange={(bullets) => updateItem(sectionIndex, itemIndex, { bullets })}
                      sectionIndex={sectionIndex}
                      itemIndex={itemIndex}
                      dispatch={dispatch}
                      aiEnhancements={aiEnhancements}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
