import { useState } from 'react';
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

const SECTION_PRESETS = ['Work Experience', 'Leadership', 'Research', 'Volunteer', 'Projects'];

function PositionCard({
  item,
  itemIndex,
  sectionIndex,
  updateItem,
  dispatch,
  aiEnhancements,
}: {
  item: ExperienceItem;
  itemIndex: number;
  sectionIndex: number;
  updateItem: (si: number, ii: number, partial: Partial<ExperienceItem>) => void;
  dispatch: Dispatch<BuilderAction>;
  aiEnhancements: Record<string, AISuggestion>;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const title = item.title || item.organization || `Position ${itemIndex + 1}`;

  return (
    <div className="border border-gray-100 rounded-lg bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700 truncate">{title}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${collapsed ? '' : 'rotate-180'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {!collapsed && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <FormField
              label="Position title"
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
            <DateRangeInput
              dates={item.dates}
              onChange={(dates) => updateItem(sectionIndex, itemIndex, { dates })}
              namePrefix={`exp-dates-${sectionIndex}-${itemIndex}`}
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
    </div>
  );
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
      <DynamicList
        items={experienceSections}
        onAdd={() => dispatch({ type: 'ADD_EXPERIENCE_SECTION' })}
        onRemove={(index) => dispatch({ type: 'REMOVE_EXPERIENCE_SECTION', index })}
        addLabel="Add section"
        renderItem={(section, sectionIndex) => (
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
            {/* Section title with presets */}
            <div>
              <FormField
                label="Section name"
                name={`section-title-${sectionIndex}`}
                value={section.title}
                onChange={(e) => updateSection(sectionIndex, { title: e.target.value })}
                error={errors[`experienceSections.${sectionIndex}.title`]}
                placeholder="e.g. Work Experience"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {SECTION_PRESETS.map((title) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => updateSection(sectionIndex, { title })}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      section.title === title
                        ? 'border-forest bg-forest/10 text-forest'
                        : 'border-gray-300 text-gray-500 hover:bg-gray-100 hover:border-gray-400'
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>

            {/* Positions within this section */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Positions ({section.items.length})
              </p>
              <DynamicList
                items={section.items}
                onAdd={() => dispatch({ type: 'ADD_EXPERIENCE_ITEM', sectionIndex })}
                onRemove={(itemIndex) =>
                  dispatch({ type: 'REMOVE_EXPERIENCE_ITEM', sectionIndex, itemIndex })
                }
                addLabel="Add position"
                renderItem={(item, itemIndex) => (
                  <PositionCard
                    item={item}
                    itemIndex={itemIndex}
                    sectionIndex={sectionIndex}
                    updateItem={updateItem}
                    dispatch={dispatch}
                    aiEnhancements={aiEnhancements}
                  />
                )}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
