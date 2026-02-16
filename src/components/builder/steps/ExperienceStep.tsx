import type { Dispatch } from 'react';
import type { ResumeSection, ExperienceItem } from '../../../data/resumes';
import type { BuilderAction, AISuggestion } from '../../../lib/builderTypes';
import FormField from '../shared/FormField';
import DynamicList from '../shared/DynamicList';
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

      <DynamicList
        items={experienceSections}
        onAdd={() => dispatch({ type: 'ADD_EXPERIENCE_SECTION' })}
        onRemove={(index) => dispatch({ type: 'REMOVE_EXPERIENCE_SECTION', index })}
        addLabel="Add section"
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

            <div className="space-y-4 pl-4 border-l-2 border-gray-200">
              <DynamicList
                items={section.items}
                onAdd={() => dispatch({ type: 'ADD_EXPERIENCE_ITEM', sectionIndex })}
                onRemove={(itemIndex) =>
                  dispatch({ type: 'REMOVE_EXPERIENCE_ITEM', sectionIndex, itemIndex })
                }
                addLabel="Add item"
                renderItem={(item, itemIndex) => (
                  <div className="space-y-3 p-3 border border-gray-100 rounded-lg bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <FormField
                        label="Title"
                        name={`exp-title-${sectionIndex}-${itemIndex}`}
                        value={item.title}
                        onChange={(e) =>
                          updateItem(sectionIndex, itemIndex, { title: e.target.value })
                        }
                        placeholder="Software Engineer"
                      />
                      <FormField
                        label="Organization"
                        name={`exp-org-${sectionIndex}-${itemIndex}`}
                        value={item.organization}
                        onChange={(e) =>
                          updateItem(sectionIndex, itemIndex, { organization: e.target.value })
                        }
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <FormField
                        label="Location"
                        name={`exp-loc-${sectionIndex}-${itemIndex}`}
                        value={item.location}
                        onChange={(e) =>
                          updateItem(sectionIndex, itemIndex, { location: e.target.value })
                        }
                        placeholder="San Francisco, CA"
                      />
                      <FormField
                        label="Dates"
                        name={`exp-dates-${sectionIndex}-${itemIndex}`}
                        value={item.dates}
                        onChange={(e) =>
                          updateItem(sectionIndex, itemIndex, { dates: e.target.value })
                        }
                        placeholder="6/2022 - Present"
                      />
                    </div>

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
