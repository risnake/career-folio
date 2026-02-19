import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { BuilderState } from '../../../../lib/builderTypes';

const s = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: 11,
    padding: '0.5in 0.6in',
    lineHeight: 1.3,
    color: '#000',
  },
  name: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contact: {
    fontSize: 9,
    textAlign: 'center',
    color: '#444',
    marginTop: 2,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 8,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    paddingBottom: 1,
    marginBottom: 4,
  },
  section: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  bold: {
    fontFamily: 'Times-Bold',
  },
  italic: {
    fontFamily: 'Times-Italic',
  },
  small: {
    fontSize: 9,
  },
  bullet: {
    flexDirection: 'row',
    marginLeft: 12,
    fontSize: 9.5,
  },
  bulletDot: {
    width: 8,
    fontSize: 9.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
  },
});

export default function FunctionalPdf({ state }: { state: BuilderState }) {
  const { name, contact, objective, experienceSections, education, additionalInfo } = state;

  const contactLine = [
    contact.email,
    contact.phone,
    ...(contact.addresses ?? []),
    contact.linkedin,
    contact.website,
  ]
    .filter(Boolean)
    .join(' | ');

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        <Text style={s.name}>{name || 'Your Name'}</Text>
        {contactLine && <Text style={s.contact}>{contactLine}</Text>}
        <View style={s.hr} />

        {/* Objective */}
        {objective && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Objective</Text>
            <Text style={{ fontSize: 9.5 }}>{objective}</Text>
          </View>
        )}

        {/* Skill-grouped Sections */}
        {experienceSections.map((section, si) => (
          <View key={si} style={s.section}>
            <Text style={s.sectionTitle}>{section.title}</Text>
            {section.items.map((item, ii) => (
              <View key={ii}>
                {item.bullets.map((b, bi) => (
                  <View key={bi} style={s.bullet}>
                    <Text style={s.bulletDot}>{'\u2022'}</Text>
                    <Text style={s.bulletText}>{b}</Text>
                  </View>
                ))}
                {(item.title || item.organization) && (
                  <Text style={{ fontSize: 9.5, marginTop: 1 }}>
                    {item.title ? <Text style={s.bold}>{item.title}</Text> : null}
                    {item.title && item.organization ? ', ' : ''}
                    {item.organization || ''}
                    {item.location ? `, ${item.location}` : ''}
                    {item.dates ? ` (${item.dates})` : ''}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}

        {/* Education */}
        {education.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i}>
                <View style={s.row}>
                  <Text>
                    <Text style={s.bold}>{edu.institution}</Text>
                    {edu.location ? `, ${edu.location}` : ''}
                  </Text>
                  {edu.dates ? <Text style={s.small}>{edu.dates}</Text> : null}
                </View>
                {edu.degree ? <Text style={s.italic}>{edu.degree}</Text> : null}
                {edu.gpa ? <Text style={s.small}>GPA: {edu.gpa}</Text> : null}
                {edu.coursework && edu.coursework.length > 0 && (
                  <Text style={s.small}>
                    Relevant Coursework: {edu.coursework.join(', ')}
                  </Text>
                )}
                {(edu.clubs || [])
                  .filter(
                    (club) =>
                      club &&
                      (club.name?.toString().trim() ||
                        club.position?.toString().trim() ||
                        club.impact?.toString().trim()),
                  )
                  .map((club, j) => (
                    <View key={`${club.name || 'club'}-${j}`} style={s.bullet}>
                      <Text style={s.bulletDot}>{'\u2022'}</Text>
                      <Text style={s.bulletText}>
                        <Text style={s.bold}>{club.name}</Text>
                        {club.position ? ` — ${club.position}` : ''}
                        {club.impact ? `: ${club.impact}` : ''}
                      </Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* Additional Info */}
        {additionalInfo.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Additional Information</Text>
            {additionalInfo.map((info, i) => (
              <View key={i} style={s.bullet}>
                <Text style={s.bulletDot}>{'\u2022'}</Text>
                <Text style={s.bulletText}>{info}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
