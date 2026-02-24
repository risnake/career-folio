import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from 'docx';
import pkg from 'file-saver';
const { saveAs } = pkg;
import type { BuilderState } from '../../../lib/builderTypes';
import type { Education, ExperienceItem, ResumeSection } from '../../../data/resumes';

function contactLine(state: BuilderState): string {
  return [
    state.contact.email,
    state.contact.phone,
    ...(state.contact.addresses ?? []),
    state.contact.linkedin,
    state.contact.website,
  ]
    .filter(Boolean)
    .join(' | ');
}

function sectionHeading(title: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 20,
        font: 'Times New Roman',
      }),
    ],
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
    },
  });
}

function bulletParagraph(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 19, font: 'Times New Roman' })],
    bullet: { level: 0 },
    spacing: { after: 20 },
  });
}

function buildEducationParagraphs(education: Education[]): Paragraph[] {
  const paras: Paragraph[] = [sectionHeading('Education')];
  for (const edu of education) {
    paras.push(
      new Paragraph({
        children: [
          new TextRun({ text: edu.institution, bold: true, size: 22, font: 'Times New Roman' }),
          new TextRun({
            text: edu.location ? `, ${edu.location}` : '',
            size: 22,
            font: 'Times New Roman',
          }),
          ...(edu.dates
            ? [new TextRun({ text: `\t${edu.dates}`, size: 18, font: 'Times New Roman' })]
            : []),
        ],
        spacing: { before: 80, after: 20 },
      }),
    );
    if (edu.degree) {
      paras.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree, italics: true, size: 20, font: 'Times New Roman' }),
          ],
          spacing: { after: 20 },
        }),
      );
    }
    if (edu.gpa) {
      paras.push(
        new Paragraph({
          children: [
            new TextRun({ text: `GPA: ${edu.gpa}`, size: 18, font: 'Times New Roman' }),
          ],
          spacing: { after: 20 },
        }),
      );
    }
    if (edu.coursework && edu.coursework.length > 0) {
      paras.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Relevant Coursework: ${edu.coursework.join(', ')}`,
              size: 18,
              font: 'Times New Roman',
            }),
          ],
          spacing: { after: 20 },
        }),
      );
    }
    if (edu.clubs) {
      for (const club of edu.clubs) {
        if (!club?.name || club.name.trim() === '') {
          continue;
        }
        const line = `${club.name}${club.position ? ` — ${club.position}` : ''}${club.progression ? ` (${club.progression})` : ''}${club.impact ? `: ${club.impact}` : ''}`;
        paras.push(bulletParagraph(line));
      }
    }
    if (edu.details) {
      for (const d of edu.details) {
        paras.push(bulletParagraph(d));
      }
    }
  }
  return paras;
}

function buildItemParagraphs(item: ExperienceItem, showDetails: boolean): Paragraph[] {
  const paras: Paragraph[] = [];
  if (showDetails && (item.title || item.organization)) {
    const runs: TextRun[] = [];
    if (item.title) {
      runs.push(new TextRun({ text: item.title, bold: true, size: 22, font: 'Times New Roman' }));
    }
    if (item.title && item.organization) {
      runs.push(new TextRun({ text: ', ', size: 22, font: 'Times New Roman' }));
    }
    if (item.organization) {
      runs.push(new TextRun({ text: item.organization, size: 22, font: 'Times New Roman' }));
    }
    if (item.location) {
      runs.push(new TextRun({ text: `, ${item.location}`, size: 22, font: 'Times New Roman' }));
    }
    if (item.dates) {
      runs.push(new TextRun({ text: `\t${item.dates}`, size: 18, font: 'Times New Roman' }));
    }
    paras.push(
      new Paragraph({ children: runs, spacing: { before: 80, after: 20 } }),
    );
  }
  for (const b of item.bullets) {
    paras.push(bulletParagraph(b));
  }
  return paras;
}

function buildExperienceSections(
  sections: ResumeSection[],
  showItemDetails: boolean,
): Paragraph[] {
  const paras: Paragraph[] = [];
  for (const section of sections) {
    paras.push(sectionHeading(section.title));
    for (const item of section.items) {
      paras.push(...buildItemParagraphs(item, showItemDetails));
    }
  }
  return paras;
}

function buildSkillsParagraphs(
  skills: { label: string; value: string }[],
): Paragraph[] {
  if (skills.length === 0) return [];
  const paras: Paragraph[] = [sectionHeading('Skills')];
  for (const skill of skills) {
    paras.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${skill.label}: `, bold: true, size: 19, font: 'Times New Roman' }),
          new TextRun({ text: skill.value, size: 19, font: 'Times New Roman' }),
        ],
        spacing: { after: 20 },
      }),
    );
  }
  return paras;
}

function buildAdditionalInfoParagraphs(info: string[]): Paragraph[] {
  if (info.length === 0) return [];
  return [sectionHeading('Additional Information'), ...info.map((i) => bulletParagraph(i))];
}

export async function exportToDocx(state: BuilderState): Promise<void> {
  const template = state.template ?? 'chronological';
  const children: Paragraph[] = [];

  // Name
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: (state.name || 'Your Name').toUpperCase(),
          bold: true,
          size: 28,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
    }),
  );

  // Contact
  const cLine = contactLine(state);
  if (cLine) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: cLine, size: 18, font: 'Times New Roman', color: '444444' }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
      }),
    );
  }

  if (template === 'functional') {
    // Objective
    if (state.objective) {
      children.push(sectionHeading('Objective'));
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: state.objective, size: 19, font: 'Times New Roman' }),
          ],
          spacing: { after: 40 },
        }),
      );
    }
    children.push(...buildExperienceSections(state.experienceSections, false));
    children.push(...buildEducationParagraphs(state.education));
    children.push(...buildAdditionalInfoParagraphs(state.additionalInfo));
  } else if (template === 'combination') {
    children.push(...buildExperienceSections(state.experienceSections, true));
    children.push(...buildEducationParagraphs(state.education));
    children.push(...buildSkillsParagraphs(state.skills));
    children.push(...buildAdditionalInfoParagraphs(state.additionalInfo));
  } else {
    // chronological (default)
    children.push(...buildEducationParagraphs(state.education));
    children.push(...buildExperienceSections(state.experienceSections, true));
    children.push(...buildSkillsParagraphs(state.skills));
    children.push(...buildAdditionalInfoParagraphs(state.additionalInfo));
  }

  const doc = new Document({
    sections: [{ children }],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = state.name
    ? `${state.name.replace(/\s+/g, '_')}_Resume.docx`
    : 'Resume.docx';
  saveAs(blob, fileName);
}
