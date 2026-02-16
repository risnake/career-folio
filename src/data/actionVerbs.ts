export interface VerbCategory {
  name: string;
  verbs: string[];
}

export const verbCategories: VerbCategory[] = [
  {
    name: "Creative",
    verbs: [
      "Acted", "Abstracted", "Adapted", "Composed", "Conceptualized",
      "Created", "Designed", "Developed", "Directed", "Drew", "Fashioned",
      "Generated", "Illustrated", "Imagined", "Improvised", "Integrated",
      "Innovated", "Painted", "Performed", "Planned", "Problem solved",
      "Shaped", "Synthesized", "Visualized", "Wrote",
    ],
  },
  {
    name: "Manual Skills",
    verbs: [
      "Arranged", "Assembled", "Bound", "Built", "Checked", "Classified",
      "Constructed", "Controlled", "Cut", "Designed", "Developed", "Drove",
      "Handled", "Installed", "Invented", "Maintained", "Monitored",
      "Prepared", "Operated", "Repaired", "Tested",
    ],
  },
  {
    name: "Detail Oriented",
    verbs: [
      "Analyzed", "Approved", "Arranged", "Classified", "Collated",
      "Compared", "Compiled", "Documented", "Enforced", "Followed through",
      "Met deadlines", "Prepared", "Processed", "Recorded", "Retrieved",
      "Set priorities", "Systemized", "Tabulated",
    ],
  },
  {
    name: "Financial",
    verbs: [
      "Administered", "Allocated", "Analyzed", "Appraised", "Audited",
      "Budgeted", "Calculated", "Computed", "Developed", "Evaluated",
      "Figured", "Maintained", "Managed", "Performed", "Planned", "Projected",
    ],
  },
  {
    name: "Organizing",
    verbs: [
      "Achieved", "Assigned", "Consulted", "Contracted", "Controlled",
      "Coordinated", "Decided", "Delegated", "Developed", "Established",
      "Evaluated", "Negotiated", "Organized", "Planned", "Prepared",
      "Prioritized", "Produced", "Recommended", "Reported",
    ],
  },
  {
    name: "Providing Service",
    verbs: [
      "Advised", "Attended", "Cared", "Coached", "Coordinated", "Counseled",
      "Delivered", "Demonstrated", "Explained", "Furnished", "Generated",
      "Inspected", "Installed", "Issued", "Mentored", "Provided", "Purchased",
      "Referred", "Repaired", "Submitted",
    ],
  },
  {
    name: "Leadership",
    verbs: [
      "Administered", "Chaired", "Convinced", "Directed", "Examined",
      "Executed", "Expanded", "Facilitated", "Improved", "Initiated",
      "Managed", "Oversaw", "Produced", "Recommended", "Reviewed",
      "Supervised",
    ],
  },
  {
    name: "Research & Investigation",
    verbs: [
      "Calculated", "Cataloged", "Collected", "Computed", "Conducted",
      "Correlated", "Critiqued", "Diagnosed", "Discovered", "Evaluated",
      "Examined", "Experimented", "Extrapolated", "Gathered", "Identified",
      "Inspected", "Investigated", "Monitored", "Proved", "Reviewed",
      "Surveyed", "Tested",
    ],
  },
  {
    name: "Technical",
    verbs: [
      "Assembled", "Built", "Calculated", "Computed", "Designed",
      "Engineered", "Fabricated", "Maintained", "Operated", "Programmed",
      "Remodeled", "Repaired", "Solved",
    ],
  },
  {
    name: "Teaching",
    verbs: [
      "Adapted", "Advised", "Clarified", "Coached", "Developed",
      "Encouraged", "Evaluated", "Informed", "Inspired", "Motivated",
      "Participated", "Provided", "Represented", "Supported", "Taught",
      "Trained", "Verified",
    ],
  },
  {
    name: "Communication",
    verbs: [
      "Aided", "Advised", "Arbitrated", "Clarified", "Co-authored",
      "Collaborated", "Consulted", "Coordinated", "Counseled", "Defined",
      "Enlisted", "Formulated", "Influenced", "Informed", "Inspired",
      "Interpreted", "Interviewed", "Mediated", "Merged", "Negotiated",
      "Promoted", "Publicized", "Recommended", "Represented", "Resolved",
      "Suggested",
    ],
  },
];
