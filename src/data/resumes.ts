export interface ResumeContact {
  email: string;
  phone?: string;
  addresses?: string[];
  linkedin?: string;
  website?: string;
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  dates: string;
  details?: string[];
  gpa?: string;
  coursework?: string[];
}

export interface ExperienceItem {
  title: string;
  organization: string;
  location: string;
  dates: string;
  bullets: string[];
}

export interface ResumeSection {
  title: string;
  items: ExperienceItem[];
}

export interface Resume {
  slug: string;
  name: string;
  type: string;
  field: string;
  contact: ResumeContact;
  objective?: string;
  education: Education[];
  experienceSections: ResumeSection[];
  skills?: { label: string; value: string }[];
  additionalInfo?: string[];
}

export const resumes: Resume[] = [
  // ─── RESUME 1: Janette Powell ───────────────────────────────────────
  {
    slug: "janette-powell",
    name: "Janette Powell",
    type: "Chronological",
    field: "International Relations",
    contact: {
      email: "jan@stanford.edu",
      phone: "(650) 555-1234",
      addresses: ["P.O. Box 2738, Stanford, CA 94309"],
      linkedin: "linkedin.com/in/janettecampbell",
    },
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree: "BA, International Relations (to be conferred 6/XX)",
        dates: "9/XX - Present",
        gpa: "3.8/4.0",
        coursework: [
          "Economics",
          "Organizational Behavior",
          "Computer Science",
          "Statistics",
        ],
      },
      {
        institution: "Oxford University, Stanford-in-Oxford",
        location: "Oxford, England",
        degree:
          "Studied Comparative Anglo-American Judicial System",
        dates: "6/XX - 9/XX",
      },
    ],
    experienceSections: [
      {
        title: "Experience",
        items: [
          {
            title: "Resident Assistant",
            organization: "Madera House, Stanford University",
            location: "Stanford, CA",
            dates: "9/XX - Present",
            bullets: [
              "Work with staff of four RAs in 88-student freshman dormitory",
              "Create, plan, and implement academic, cultural, and social activities",
              "Encourage discussion of social, political, and ethical questions",
              "Build community spirit and guide residents in assuming responsibility",
              'Coordinator for "Madera Makes Music" weekly educational program',
              "Schedule performances, organize budget, and create publicity",
            ],
          },
          {
            title: "Visual Display Artist/Salesperson",
            organization: "The Gap",
            location: "Palo Alto, CA",
            dates: "10/XX - 6/XX",
            bullets: [
              "Designed and assembled window and floor displays",
              "Assisted customers with selection and purchase",
            ],
          },
          {
            title: "Vice President",
            organization: "Delta Gamma Sorority, Stanford University",
            location: "Stanford, CA",
            dates: "1/XX - 1/XX",
            bullets: [
              "Directed planning and implementation of activities for 95 chapter members",
              "Supervised and approved officer budgets",
              "Increased member participation through innovative motivational techniques",
              "Created prototype for annual chapter retreat and member recognition program",
              "Organized rush activities",
            ],
          },
          {
            title: "Entrepreneur",
            organization: "The Sewing Studio",
            location: "Durham, CA",
            dates: "6/XX - 6/XX",
            bullets: [
              "Created business offering fashion design and clothing construction courses",
              "Developed advertising strategies, coordinated class schedules, and taught classes",
              "Expanded into business with $200,000 in annual gross sales",
            ],
          },
          {
            title: "Administrative Intern",
            organization: "U.S. Congressman Eugene Chappie",
            location: "Chico, CA",
            dates: "7/XX - 9/XX",
            bullets: [
              "Developed computer cataloging system for constituent request files",
              "Researched local, state, and national issues for congressional use",
            ],
          },
        ],
      },
    ],
    additionalInfo: [
      "Division I Varsity Athlete, Women's Water Polo, Stanford University",
      "Familiar with Mac and PC software applications including Excel and PowerPoint",
      "Proficient in Spanish; basic skills in French",
      "Traveled extensively throughout Europe",
    ],
  },

  // ─── RESUME 2: Ben Pierce ──────────────────────────────────────────
  {
    slug: "ben-pierce",
    name: "Ben Pierce",
    type: "Functional",
    field: "Law / Paralegal",
    contact: {
      email: "pierce@stanford.edu",
      phone: "(650) 555-2190",
      addresses: [
        "6756 Ventura #36, Palo Alto, CA 94306",
        "13 Moss Lane, Crabapple Cove, WI 55555",
      ],
    },
    objective:
      "To obtain a position as a paralegal with a corporate law firm",
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree: "BA in Psychology",
        dates: "9/XX - 6/XX",
        coursework: [
          "Criminal Law",
          "Economics",
          "Political Science",
          "Sociology",
        ],
      },
    ],
    experienceSections: [
      {
        title: "Organizing/Supervising",
        items: [
          {
            title: "",
            organization: "",
            location: "",
            dates: "",
            bullets: [
              "As one of four class presidents, planned events and activities for Stanford senior class",
              "Contacted businesses for participation",
              "Organized and supervised committees for publicizing, promoting, and fundraising",
              "Set goals and guidelines for committee meetings",
            ],
          },
        ],
      },
      {
        title: "Researching/Writing",
        items: [
          {
            title: "",
            organization: "",
            location: "",
            dates: "",
            bullets: [
              "Researched language development in infants using library resources and experimental data",
              "Generated written report of research project results",
            ],
          },
        ],
      },
      {
        title: "Public Speaking/Communicating",
        items: [
          {
            title: "",
            organization: "",
            location: "",
            dates: "",
            bullets: [
              "Acted as senior class liaison to University officials",
              "Informed them of activities, enlisted support and approval",
              "Discussed campaign platform and issues at residence halls",
              "Participated in public relations events for Varsity Football program",
              "Conducted impromptu interviews with media representatives",
            ],
          },
        ],
      },
      {
        title: "Financial Planning/Budgeting",
        items: [
          {
            title: "",
            organization: "",
            location: "",
            dates: "",
            bullets: [
              "Coordinated $9,000 budget for senior class events",
              "Estimated and quoted prices for construction projects",
            ],
          },
        ],
      },
      {
        title: "Employment History",
        items: [
          {
            title: "Crew Member",
            organization: "Pierce's Asphalt and Seal Coating Service",
            location: "Crabapple Cove, WI",
            dates: "6/XX - 9/XX (Summers)",
            bullets: [],
          },
        ],
      },
    ],
    additionalInfo: [
      "President, Senior Class, Stanford University",
      "Running Back, Stanford Varsity Football Team",
    ],
  },

  // ─── RESUME 3: Patricia Dixon ──────────────────────────────────────
  {
    slug: "patricia-dixon",
    name: "Patricia Dixon",
    type: "Combination",
    field: "Psychology / Research",
    contact: {
      email: "pat@stanford.edu",
      addresses: [
        "P.O. Box 1234, Stanford, CA 94309",
        "123 Park Court, San Carlos, CA 94070",
      ],
    },
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree: "BA in Psychology with Honors",
        dates: "9/XX - 6/XX",
        gpa: "3.7/4.0",
        coursework: ["Biology", "Calculus", "Chemistry", "Statistics"],
      },
    ],
    experienceSections: [
      {
        title: "Research/Writing",
        items: [
          {
            title: "Public Relations Intern",
            organization: "Hoover Institute Public Affairs Office",
            location: "Stanford, CA",
            dates: "9/XX - 6/XX",
            bullets: [
              "Compiled Hoover Fellow articles from journals, magazines, and newspapers",
              "Used PageMaker to create mastheads and retype opinion editorials",
              "Developed efficient proofreading methods and innovative talent for pasting up difficult articles",
            ],
          },
          {
            title: "Research Assistant",
            organization:
              "University of Illinois at Chicago Cancer Center",
            location: "Chicago, IL",
            dates: "6/XX - 9/XX",
            bullets: [
              "Learned complicated laboratory procedures",
              "Executed molecular biology experiments involving DNA sequencing and gene analysis",
              "Maintained detailed records for procedural and statistical purposes",
              "Gained significant independent research and writing experience",
            ],
          },
          {
            title: "Feature Writer",
            organization: "The Stanford Daily",
            location: "Stanford, CA",
            dates: "9/XX - 6/XX",
            bullets: [
              "Developed journalistic writing style and interviewing skills",
              "Met all deadlines; consistently published front page articles",
            ],
          },
        ],
      },
      {
        title: "Teaching/Counseling",
        items: [
          {
            title: "Math/English Tutor",
            organization: "Self-initiated and directed",
            location: "Palo Alto, CA",
            dates: "10/XX - Present",
            bullets: [
              "Tutor two seventh grade students 2-3 hours per week",
              "Employ Socratic method to develop analytical skills and help with homework",
              "Design tests to chart progress",
              "Create interactive games to increase understanding of math and grammar",
              "Plan quarterly outings",
            ],
          },
          {
            title: "Focus Assistant",
            organization:
              "Stanford's Environmental Theme House",
            location: "Stanford, CA",
            dates: "9/XX - 6/XX",
            bullets: [
              "Participated on team of five to develop well-organized, thought-provoking social programs",
              "Familiarized residents with environmental theme",
            ],
          },
        ],
      },
      {
        title: "Leadership/Management",
        items: [
          {
            title: "Officer's Core Member",
            organization:
              "Black Student Union, Stanford University",
            location: "Stanford, CA",
            dates: "9/XX - 6/XX",
            bullets: [
              "Worked with team to plan, organize, and publicize activities and programs",
              "Designed to motivate and educate Stanford's African-American community",
              "Chaired committee to rejuvenate The Real News, African-American news publication",
            ],
          },
        ],
      },
    ],
    additionalInfo: [
      "Extensive program development and motivational skills",
      "Proficient with MS Word, Excel, FileMaker Pro, and PageMaker",
      "Experienced lab technician executing DNA sequencing and gene analysis",
      "Writing short stories",
      "Developing culinary skills in African-American cuisine",
      "Jazz",
    ],
  },

  // ─── RESUME 4: Joe Frosh ──────────────────────────────────────────
  {
    slug: "joe-frosh",
    name: "Joe Frosh",
    type: "Summer",
    field: "General / Freshman",
    contact: {
      email: "frosh@stanford.edu",
      phone: "(213) 555-5555",
      addresses: [
        "P.O. Box 123, Stanford, CA 94309",
        "345 Summer Job Lane, Hometown, IL 11111",
      ],
    },
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree: "Pursuing BA degree (to be conferred 6/XX)",
        dates: "9/XX - Present",
        coursework: ["Communication", "English", "Psychology"],
      },
      {
        institution: "ABC High School",
        location: "Hometown, IL",
        degree:
          "Advanced placement: Calculus, Biology, English / Salutatorian",
        dates: "9/XX - 6/XX",
      },
    ],
    experienceSections: [
      {
        title: "Honors/Awards",
        items: [
          {
            title: "",
            organization: "",
            location: "",
            dates: "",
            bullets: [
              "National Achievement Scholar",
              "National Honor Roll",
              "AP Scholar",
              "Gates Millennium Scholar Finalist",
            ],
          },
        ],
      },
      {
        title: "Experience",
        items: [
          {
            title: "Administrative Assistant",
            organization:
              "Career Development Center, Stanford University",
            location: "Stanford, CA",
            dates: "9/XX - Present",
            bullets: [
              "Answer daily inquiries from students and employers",
              "Greet employers visiting Stanford for on-campus recruiting",
              "Provide assistance to students using jobs/internships database",
            ],
          },
          {
            title: "Yearbook Editor",
            organization: "ABC High School",
            location: "Hometown, IL",
            dates: "9/XX - 6/XX",
            bullets: [
              "Supervised staff of 18",
              "Set timelines, divided and assigned tasks, managed all aspects of production",
              "Liaison between yearbook staff and school administration",
              "Assisted in soliciting over $5,000 in funding",
              "Conceptualized new layout and design format",
            ],
          },
          {
            title: "Head Lifeguard",
            organization: "Sink Like a Rock Pool",
            location: "Hometown, IL",
            dates: "6/XX - 9/XX",
            bullets: [
              "Oversaw safety of 100+ swimmers daily",
              "Assisted in hiring, training, and supervision of new lifeguards",
              "Organized pool competitions and special events",
              "Developed flyers to publicize events",
              "Promoted from lifeguard position 6/XX",
            ],
          },
        ],
      },
    ],
    skills: [
      {
        label: "Computer",
        value:
          "Microsoft Office Suite including MS Word, PowerPoint, Excel",
      },
      {
        label: "Languages",
        value:
          "Fluent in Portuguese; working knowledge of basic French",
      },
    ],
    additionalInfo: [
      "Certified American Red Cross CPR and First Aid Instructor",
      "Eagle Scout",
      "Member, ABC High School Varsity Baseball team",
      "Traveled throughout United States and Mexico",
      "Interests: jazz, basketball, baseball card collecting",
    ],
  },

  // ─── RESUME 5: Joe Student ────────────────────────────────────────
  {
    slug: "joe-student",
    name: "Joe Student",
    type: "Business",
    field: "Economics / Finance",
    contact: {
      email: "jstudent@stanford.edu",
      phone: "(650) 555-1212",
      addresses: ["P.O. Box 1234, Stanford, CA 94309"],
    },
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree: "BA in Economics, Honors Candidate",
        dates: "9/XX - 12/XX",
        gpa: "Major: 3.86/4.00, Cumulative: 3.78/4.00",
        coursework: [
          "Econometrics",
          "Multi-Variable Calculus",
          "Micro and Macro Economic Analysis",
          "Economics and Public Policy",
          "Imperfect Competition",
          "Financial Economics",
          "International Economics",
        ],
      },
      {
        institution: "Oxford University",
        location: "Oxford, England",
        degree:
          "Completed tutorial on Political Economy of Trade and Trade Agreements",
        dates: "9/XX - 12/XX",
      },
      {
        institution: "Sophomore College",
        location: "Stanford, CA",
        degree:
          'Participated in intensive seminar "Economic Thoughts of Plato and Aristotle"',
        dates: "",
        details: [
          "Academic work on economic ideas among major Greek philosophers",
          "Assumptions behind modern economic theory",
          "Culminated in paper critiquing rational choice and preference ranking",
        ],
      },
    ],
    experienceSections: [
      {
        title: "Experience",
        items: [
          {
            title: "Research Assistant",
            organization:
              "National Economic Research Associates (NERA)",
            location: "White Plains, NY",
            dates: "6/XX - 8/XX",
            bullets: [
              "Worked with team of four researchers on antitrust, intellectual property, and labor economics cases",
              "Conducted quantitative and qualitative research",
              "Collected and analyzed data",
              "Created and managed spreadsheets",
            ],
          },
          {
            title: "Summer Analyst",
            organization: "Galleon Group",
            location: "New York, NY",
            dates: "6/XX - 8/XX",
            bullets: [
              "Tracked technology companies for New York-based hedge fund",
              "Worked with three analysts collecting and analyzing financial statistics",
              "Performed qualitative research to assess company status",
            ],
          },
          {
            title: "Economics Tutor",
            organization:
              "Undergraduate Advising and Research, Stanford University",
            location: "Stanford, CA",
            dates: "5/XX - 6/XX",
            bullets: [
              "Assisted students with micro and macro economics, econometrics, and statistics",
              "Organized review sessions",
              "Prepared practice problems for exams",
            ],
          },
          {
            title: "Business Intern",
            organization:
              "American International Group (AIG)",
            location: "New York, NY",
            dates: "7/XX - 9/XX",
            bullets: [
              "Developed business analysis on foreign company in Sri Lanka",
              "Wrote report on Sri Lanka's insurance sector",
              "Focused on privatization and recent merger",
            ],
          },
        ],
      },
      {
        title: "Leadership",
        items: [
          {
            title: "Staff Editor",
            organization:
              "Undergraduate Journal of International Relations",
            location: "Stanford, CA",
            dates: "4/XX - Present",
            bullets: [
              "Review and edit articles on capital inflows and international trade in emerging economies",
              "Help distribute journal to think tanks, academic institutions, faculty, and students",
            ],
          },
          {
            title: "Program Director",
            organization:
              "SAT Success, Haas Center for Public Service",
            location: "Stanford, CA",
            dates: "5/XX - Present",
            bullets: [
              "Coordinate all aspects of tutoring program",
              "Recruit tutors and tutees",
              "Organize events for high school students on SAT preparation and college application",
              "Conduct training sessions on tutoring math and verbal sections",
            ],
          },
          {
            title: "Staff Editor",
            organization:
              "Undergraduate Journal of Philosophy",
            location: "Stanford, CA",
            dates: "1/XX - 6/XX",
            bullets: [
              "Evaluated, edited, selected, and compiled papers for The Dualist",
              "Focused on reviewing papers on political philosophy and ethics",
            ],
          },
        ],
      },
    ],
    skills: [
      {
        label: "Computer",
        value: "Proficient in Excel, PowerPoint, FileMaker",
      },
      {
        label: "Language",
        value: "Proficient in speaking and writing French",
      },
    ],
  },

  // ─── RESUME 6: Kenya Rios ─────────────────────────────────────────
  {
    slug: "kenya-rios",
    name: "Kenya Rios",
    type: "Arts Administration",
    field: "Arts / Media",
    contact: {
      email: "student@stanford.edu",
      phone: "650.123.4567",
      addresses: ["PO Box 12345, Stanford, CA 94309"],
    },
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree:
          "BA in American Studies with Mass Media & Consumer Culture focus (expected 6/XX)",
        dates: "9/XX - Present",
        gpa: "3.7",
      },
      {
        institution:
          "Stanford Bing Overseas Study Program",
        location: "Paris, France",
        degree:
          "Language, literature, and theater/cinema courses",
        dates: "9/XX - 12/XX",
      },
    ],
    experienceSections: [
      {
        title: "Related Experience",
        items: [
          {
            title: "Chief of Staff/Publicity Manager",
            organization: "Stanford Concert Network",
            location: "Stanford, CA",
            dates: "4/XX - Present",
            bullets: [
              "Liaison between Executive Board and general staff",
              "Lead meetings and planning of concert events",
              "Manage print and media relations, marketing, and external promotions",
            ],
          },
          {
            title:
              "Executive Cabinet Member and Recording Artist",
            organization: "Inphanyte Records",
            location: "Stanford, CA",
            dates: "11/XX - Present",
            bullets: [
              "Coordinate campus events to promote records and artists",
              "Write lyrics; work in studio recording and editing",
            ],
          },
          {
            title: "Programs Development Intern",
            organization:
              "Fender Center for the Performing Arts",
            location: "Corona, CA",
            dates: "6/XX - 8/XX",
            bullets: [
              "Selected as Arts for Youth Fellow by Stanford's Haas Center for Public Service",
              "Implemented three-month marketing plan increasing center recognition and concert attendance",
              "Developed and designed music camp program for summer 20XX",
              "Produced and directed promotional video for Capital Expansion Campaign",
            ],
          },
          {
            title: "Research Intern",
            organization:
              "Culture Pub (French television syndicated series)",
            location: "Paris, France",
            dates: "10/XX - 12/XX",
            bullets: [
              "Devised new system to catalogue and retrieve film stock",
              "Performed internet and archive research for upcoming specials",
            ],
          },
          {
            title: "Selection Team Member",
            organization:
              "Student Organizing Committee for the Arts",
            location: "Stanford, CA",
            dates: "1/XX - 4/XX",
            bullets: [
              "Chose artists and track listings for Stanford Soundtrack Vol. 3",
              "Developed record image",
            ],
          },
          {
            title: "Account Executive, Advertising",
            organization: "Stanford Student Enterprises",
            location: "Stanford, CA",
            dates: "6/XX - 9/XX",
            bullets: [
              "Met and exceeded weekly sales goals",
              "Twice chosen as employee of the term",
              "Designed advertisements for clients; managed accounts",
              "Identified leads; used persuasive communication skills to generate advertising prospects",
            ],
          },
        ],
      },
    ],
    skills: [
      {
        label: "Technical",
        value:
          "Drupal web design, Photoshop, Illustrator, InDesign",
      },
      { label: "Language", value: "Proficient in French" },
    ],
    additionalInfo: [
      "VP/Philanthropy Chair, Kappa Kappa Gamma Sorority",
      'Production Intern, Stanford Film Society short film "Sold America"',
      "Course Instructor, Modern French Cinema, Stanford",
      "Peer Academic Advisor, Stanford",
      "Volunteer Dance Instructor, Bay Area Boys and Girls Club",
      "Writer, Womenspeak and Black Arts Quarterly",
    ],
  },

  // ─── RESUME 7: Freda Rachelle ─────────────────────────────────────
  {
    slug: "freda-rachelle",
    name: "Freda Rachelle",
    type: "Policy",
    field: "Environmental Policy",
    contact: {
      email: "freda@stanford.edu",
      phone: "(555) 213-8866",
      addresses: [
        "20214 NE 39th Street, Seattle, WA 98074",
      ],
    },
    objective: "A position in environmental policy",
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree:
          "MS, Earth Systems (emphasis: conservation, communication, and stakeholder engagement)",
        dates: "1/XX - 6/XX",
        gpa: "3.95/4.0",
        coursework: [
          "Green Research and Writing",
          "Creating Sustainable Development",
          "Promoting Behavior Change",
          "NAFTA and the Environment",
          "World Food Economy",
          "Sustainable Agriculture",
          "Environmental Education",
        ],
      },
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree:
          "BS, Earth Systems with Honors (emphasis: ecology and conservation biology)",
        dates: "9/XX - 6/XX",
        gpa: "3.9/4.0",
        details: [
          "Phi Beta Kappa",
          "School of Earth Sciences Dean's Award for Undergraduate Academic Achievement",
        ],
        coursework: [
          "Conservation Biology",
          "Environmental Economics and Policy",
          "Intro to Earth Systems",
          "Ecological Anthropology",
          "Biology and Global Change",
          "Micro-Economics",
          "Soil Science",
          "Galapagos Islands Field Seminar",
        ],
      },
      {
        institution: "Stanford Alternative Spring Break",
        location: "Stanford, CA & Washington, DC",
        degree:
          "10-week course on sustainable development and poverty alleviation; 1-week trip to capitol to meet with NGOs, government agencies, and legislative representatives",
        dates: "1/XX - 3/XX",
      },
      {
        institution: "Stanford Hopkins Marine Station",
        location: "Monterey, CA",
        degree:
          "Biostatistics; Independent Research Project on Invasive Marine Mussels",
        dates: "4/XX - 6/XX",
      },
      {
        institution:
          "Stanford Program in Australia, University of Queensland",
        location: "Brisbane, Australia",
        degree:
          "Coral Reef Ecosystems, Coastal Resource Management, Research on Indigenous Resource Management",
        dates: "9/XX - 12/XX",
      },
    ],
    experienceSections: [
      {
        title: "Environmental/Research Experience",
        items: [
          {
            title: "Research Intern",
            organization:
              "Environmental Protection Agency, Smart Growth",
            location: "Washington, DC",
            dates: "6/XX - 8/XX",
            bullets: [
              "Researched and compiled smart growth case studies",
              "Updated status of past projects",
              "Independent research on affordable housing, green buildings, and smart growth",
            ],
          },
          {
            title: "Independent Field Researcher",
            organization: "Ranomafana National Park",
            location: "Madagascar",
            dates: "6/XX - 8/XX",
            bullets: [
              "Conducted six-week research project on lemur eating habits and conservation for honors thesis",
              "Independently organized, developed proposals/budget, and received grants for travel and research",
            ],
          },
          {
            title: "Field Intern",
            organization:
              "E.N. Huyck Preserve and Biological Research Station",
            location: "Rensselaerville, NY",
            dates: "6/XX - 8/XX",
            bullets: [
              "Designed and implemented independent research project",
              "Presented results at symposium",
              "Learned field techniques",
            ],
          },
          {
            title: "",
            organization:
              "Tropical Ecology and Conservation Field Seminar",
            location: "Veracruz, Mexico",
            dates: "4/XX - 6/XX",
            bullets: [
              "Week of field research in tropical rainforest ecology",
              "10-week analysis, scientific paper writing, and final presentation",
            ],
          },
          {
            title: "Environmental Education Intern",
            organization:
              "Cougar Mountain Endangered Species Zoo",
            location: "Issaquah, WA",
            dates: "6/XX - 8/XX",
            bullets: [
              "Educated visitors about animals",
              "Created educational literature on endangered species",
            ],
          },
        ],
      },
      {
        title: "Leadership",
        items: [
          {
            title: "Teaching Assistant",
            organization:
              "Stanford University, Introduction to Earth Systems",
            location: "Stanford, CA",
            dates: "9/XX - 12/XX",
            bullets: [
              "Taught weekly discussion section on biodiversity, ocean circulation, and environmental policy",
              "Collaborated with team of eight TAs to design sections, write exams, and problem sets",
            ],
          },
          {
            title: "Student Advisor",
            organization:
              "Stanford University Earth Systems Program",
            location: "Stanford, CA",
            dates: "9/XX - 6/XX",
            bullets: [
              "Advised students on planning classes, internships, and jobs",
              "Organized educational and social programs and events",
              "Acted as program representative and liaison with faculty advisors",
            ],
          },
          {
            title: "",
            organization:
              "Students for a Sustainable Stanford",
            location: "Stanford, CA",
            dates: "9/XX - 6/XX",
            bullets: [
              "Green Living Council (20XX-20XX): Developed awareness campaigns for sustainable habits",
              "Chaired organization of Earth Day events (20XX)",
              "Coordinated dorm environmental representatives (20XX)",
            ],
          },
          {
            title: "Shabbat and Holidays Chair",
            organization: "Jewish Students Association",
            location: "Stanford, CA",
            dates: "3/XX - 3/XX",
            bullets: [],
          },
        ],
      },
    ],
    skills: [
      {
        label: "Language",
        value:
          "Proficient in French and familiarity with Spanish",
      },
      {
        label: "Technical",
        value:
          "Experience with Microsoft Office and Mac OSX; Basic GIS",
      },
    ],
    additionalInfo: [
      "Volunteer, Organic farm in Bologna, Italy (8/XX - 9/XX) — involved in planting, harvesting, and attending markets",
    ],
  },

  // ─── RESUME 8: Kelly T. Victory ───────────────────────────────────
  {
    slug: "kelly-victory",
    name: "Kelly T. Victory",
    type: "Public Service",
    field: "Public Service / Community",
    contact: {
      email: "kvictory@stanford.edu",
      phone: "655.456.7890",
      addresses: ["P.O Box 123456, Stanford, CA 94309"],
    },
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree:
          'BA, American Studies, concentration "Urban Society and Social Change"',
        dates: "June 20XX",
        coursework: [
          "Political Science",
          "Urban Studies",
          "Sociology",
          "Psychology",
          "Calculus",
          "Spanish",
        ],
      },
    ],
    experienceSections: [
      {
        title: "Public Service Experience",
        items: [
          {
            title: "Resident Assistant",
            organization:
              "Roble Hall, Stanford University",
            location: "Stanford, CA",
            dates: "9/XX - Present",
            bullets: [
              "Design and implement programming regarding mental health, academic resources, diversity, and career preparation",
              "Work with team of 5 staff members",
              "Oversee wellbeing of 260 residents",
            ],
          },
          {
            title: "Peer Counselor",
            organization: "Bridge Peer Counseling Center",
            location: "Stanford, CA",
            dates: "9/XX - Present",
            bullets: [
              "Counsel students regarding personal and academic concerns",
            ],
          },
          {
            title: "Co-Chair",
            organization:
              "3rd Annual Stanford Dance Marathon, Stanford University",
            location: "Stanford, CA",
            dates: "3/XX - 4/XX",
            bullets: [
              "Selected to lead organization, planning, and management of philanthropic event",
              "Directed team of 60 undergraduates",
              "Recruited record 975 participants (up from 300)",
              "Raised $215,000+ (previous year raised $58,000) for Partners In Health",
              "Developed and maintained relationships with outside sponsors (Apple Inc., Kaplan)",
            ],
          },
          {
            title: "Kitchen Manager",
            organization:
              "Columbae House, Stanford University",
            location: "Stanford, CA",
            dates: "9/XX - 6/XX",
            bullets: [
              "Completed weekly grocery runs; managed $150,000 annual budget",
              "Reviewed daily with chefs in Spanish regarding menu, supplies, and resident feedback",
              "Managed residents; planned house activities as staff member",
            ],
          },
          {
            title: "Selection Officer",
            organization: "Volunteers in Latin America",
            location: "Stanford, CA",
            dates: "9/XX - 4/XX",
            bullets: [
              "Designed and implemented recruiting and application process",
              "Managed all advertisement, interview, and selection activities",
            ],
          },
          {
            title: "Volunteer",
            organization: "Volunteers in Latin America",
            location: "Quito, Ecuador",
            dates: "6/XX - 9/XX",
            bullets: [
              "Supervised 30 children ages 9-10 daily at center for street children",
              "Created lesson plans; organized field trips and workshops",
            ],
          },
        ],
      },
      {
        title: "Other Experience",
        items: [
          {
            title: "Tour Guide",
            organization:
              "Visitor Information Services, Stanford University",
            location: "Stanford, CA",
            dates: "9/XX - Present",
            bullets: [
              "Lead public and private tours emphasizing history and student life",
              "Provide customer service at front desk for Undergraduate Admissions",
              "Light accounting work",
            ],
          },
          {
            title: "Member",
            organization:
              "Stanford Women in Business Mentoring",
            location: "Stanford, CA",
            dates: "9/XX - Present",
            bullets: [
              "Learn about business world through panels and workshops",
              "Meet monthly with Stanford Graduate School of Business mentor",
            ],
          },
          {
            title: "Marketing Intern",
            organization: "SearchRev Inc.",
            location: "Palo Alto, CA",
            dates: "6/XX - 8/XX",
            bullets: [
              "Worked with Director of marketing to increase brand awareness and drive revenue",
              "Oversaw trade-show planning and preparation",
              "Managed national ad campaigns",
            ],
          },
          {
            title: "Registration Team Leader",
            organization: "Stanford Alumni Association",
            location: "Stanford, CA",
            dates: "9/XX - 11/XX",
            bullets: [
              "Planned registration system as member of 60-person team",
            ],
          },
        ],
      },
    ],
    skills: [
      {
        label: "Computer",
        value:
          "Mac and PC platforms, Excel, PowerPoint, HTML, JavaScript",
      },
      {
        label: "Languages",
        value: "Proficient in Spanish",
      },
    ],
    additionalInfo: [
      "Dean of Students Outstanding Achievement Award (4/XX) — Awarded annually to students who significantly enriched quality of student life on campus",
    ],
  },

  // ─── RESUME 9: Adriana Smithfield ─────────────────────────────────
  {
    slug: "adriana-smithfield",
    name: "Adriana Smithfield",
    type: "Health Career",
    field: "Health / Medicine",
    contact: {
      email: "asmithfield12@stanford.edu",
      addresses: [
        "P.O. Box 121212, Stanford, CA 94309",
      ],
    },
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree:
          "BA Candidate, Human Biology — Global Infectious Disease and Women's Health, Class of 2014",
        dates: "9/XX - Present",
        details: [
          "Academic interests: Access and utilization of health resources, emerging health technologies, gender disparities in health",
        ],
      },
      {
        institution: "Oxford University",
        location: "Oxford, England",
        degree:
          "Tutorial in International Health — studied social determinants of health, global governance, and behavior change",
        dates: "3/XX - 6/XX",
      },
    ],
    experienceSections: [
      {
        title: "Health Related Experience",
        items: [
          {
            title: "Intern",
            organization:
              "Center for Health Research in Women's and Sex Differences in Medicine",
            location: "Stanford, CA",
            dates: "6/XX - Present",
            bullets: [
              "Research ethical challenges to enrolling women in research studies globally",
              "Organize Global Women's Health Conference and presentation for conference speaker",
              "Created and designed course investigating physical, emotional, and mental effects of sexual abuse through the life course",
              "Identified course topics; drafted course syllabus",
            ],
          },
          {
            title: "Intern",
            organization:
              "Stanford Health 4 America, Stanford Prevention Center, School of Medicine",
            location: "Stanford, CA",
            dates: "6/XX - Present",
            bullets: [
              "Assist with launch of innovative professional certificate program",
              "Develop admission process, fellow handbook, and memorandum of understanding",
              "Create promotional animations while working on marketing strategy and outreach",
            ],
          },
          {
            title: "Undergraduate Research Assistant",
            organization:
              "Department of Psychiatry and Behavioral Sciences",
            location: "Stanford, CA",
            dates: "3/XX - 2/XX",
            bullets: [
              "Assisted with development of clinical trial investigating novel drug in children with autism",
              "Awarded $6,000 Bio-X Undergraduate Summer Research Grant",
              "Presented research at Bio-X symposium",
              "Presented at Symposia for Undergraduate Research and Public Service (SURPS)",
            ],
          },
          {
            title:
              "Southeast Asian Leadership Network (SEALNet) Project Philippines",
            organization: "SEALNet",
            location: "Cebu City, Philippines",
            dates: "8/XX",
            bullets: [
              "Collaborated on high blood pressure awareness and prevention campaign",
              "Conducted blood pressure screenings within local village",
              "Created health fairs for children and adults",
              "Organized and taught leadership workshops on team building, public speaking, goal setting, and professional career skills",
              "Created healthy lifestyle guide and leadership handbook for students",
            ],
          },
        ],
      },
      {
        title: "Leadership Experience",
        items: [
          {
            title: "Conference Coordinator",
            organization: "Southeast Asia Conference",
            location: "Stanford, CA",
            dates: "11/XX - 3/XX",
            bullets: [
              "Pioneered inaugural Southeast Asia (SEA) Change Conference",
              "Sparked dialogue about Southeast Asia and its place in the world",
              "Addressed SEA adapting to shifting global environment, preserving culture and society, and challenges for development",
              "Recruited keynote speakers, scheduled events, secured venue, and assisted with marketing and publicity",
            ],
          },
          {
            title:
              "SPLASH Underserved Student Recruiter and Teacher",
            organization: "SPLASH",
            location: "Stanford, CA",
            dates: "4/XX - 11/XX",
            bullets: [
              "Communicated with primary contacts at low-income high schools to draw hundreds of students to attend Fall SPLASH 2012",
              "Assisted in logistical planning as member of administration team",
              "Taught classes on biology and historical context of lactose intolerance at Spring SPLASH 20XX",
            ],
          },
          {
            title:
              "ThinkMath Instructor Trainer and Assistant Team Lead",
            organization: "ThinkMath",
            location: "Stanford, CA",
            dates: "9/XX - 1/XX",
            bullets: [
              "Taught elementary school students from Singaporean math curriculum",
              "Led training sessions for new ThinkMath instructors on lesson planning and teaching techniques",
              "Organized placement results; communicated with parents on site",
            ],
          },
        ],
      },
    ],
    skills: [
      {
        label: "Languages",
        value:
          "German (proficient), Spanish (conversational)",
      },
      {
        label: "Computer",
        value:
          "MS Office Suite, Macromedia Suite, DreamWeaver, PhotoShop",
      },
    ],
    additionalInfo: [
      "Alpha Kappa Delta Phi Sorority, VP of Community Service & Philanthropy",
      "Multicultural Greek Council Representative & Recruitment Chair",
      "Data Intern at Center for Interdisciplinary Brain Science Research",
      "Stanford Immersion in Medicine Physician Shadowing Program",
    ],
  },

  // ─── RESUME 10: Stephen Olsted ────────────────────────────────────
  {
    slug: "stephen-olsted",
    name: "Stephen Olsted",
    type: "Science",
    field: "Biology / Public Health",
    contact: {
      email: "solsted88@stanford.edu",
      phone: "415-121-3434",
      addresses: [
        "P.O. Box 88888, Stanford, CA 94309",
      ],
    },
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree:
          "BA Candidate in Biology, Minor in Mathematics, Class of 20XX",
        dates: "9/XX - Present",
        gpa: "3.82/4.00",
        coursework: [
          "Theory of Probability",
          "Computer Science",
          "Demography",
          "Environmental and Health Policy Analysis",
          "Biomedical Ethics",
          "Modeling Infectious Diseases",
        ],
      },
    ],
    experienceSections: [
      {
        title: "Work and Research Experience",
        items: [
          {
            title: "Health Policy Intern",
            organization: "The World Bank",
            location: "Washington, DC",
            dates: "09/XXXX - Present",
            bullets: [
              "Research and write global pharmaceutical policy articles for publication",
              "Assess challenges of adhering to international standards when conducting clinical trials in developing countries",
            ],
          },
          {
            title: "Research Assistant",
            organization:
              "Demography, Economics, and Health of Aging",
            location: "Stanford, CA",
            dates: "06/XXXX - 12/XXXX",
            bullets: [
              "Analyze recent convergence of male and female life expectancy in U.S.",
              "Parse large data sets; model trends by age, sex, and cause of death with statistical computer language R",
              "Discovered critical sex disparities in younger age groups not in previous literature",
              "Continuing toward honors thesis",
            ],
          },
          {
            title: "Research Assistant",
            organization: "Lab of Culture and Emotion",
            location: "Stanford, CA",
            dates: "01/XXXX - 06/XXXX",
            bullets: [
              "Recruited, scheduled, and ran hundreds of participants in multiple studies of ideal affect",
              "Organized materials, coordinated with research assistants, and met strict deadlines",
              "Usage of SPSS statistical software and Excel",
              "Synthesized literature review",
            ],
          },
        ],
      },
      {
        title: "Health and Leadership Experience",
        items: [
          {
            title: "Co-President",
            organization: "FACE AIDS Chapter",
            location: "Stanford, CA",
            dates: "09/XXXX - 12/XXXX",
            bullets: [
              "Marketed and directed multiple HIV education events",
              "Taught in high school outreach",
              "Facilitated HIV research seminars with faculty",
              "Organized 500+-person campus speaker event with Paul Farmer",
              "Led multiple fundraising events",
              "Managed organization webpage faceaids.wix.com/Stanford",
            ],
          },
          {
            title: "Peer Counselor",
            organization: "HIV*PACT and The Bridge",
            location: "Stanford, CA",
            dates: "01/XXXX - 06/XXXX",
            bullets: [
              "HIV*PACT: Provided anonymous, confidential HIV testing, counseling, and personalized health education to undergraduate and graduate students",
              "The Bridge: Counseled on emergency, crisis, academic, relationship, social, and mental health issues via phone and in-person",
            ],
          },
          {
            title:
              "Fundraiser/Advocate/Spokesperson",
            organization: "National AIDS Awareness Event",
            location: "",
            dates: "06/XXXX - 08/XXXX",
            bullets: [
              "Biked 4,000 miles in 67 days from San Francisco to Boston to fundraise and educate thousands about HIV/AIDS pandemic",
              "Planned, led, and spoke at multiple broadcast/media engagements, youth group presentations, and fundraising events",
              "Located, coordinated, and delegated housing each night for 18 riders",
              "Personally raised $11,500 of total $85,000 as a group",
            ],
          },
        ],
      },
    ],
    skills: [
      {
        label: "Computer/Technical",
        value:
          "R, Java, Microsoft Word, Excel, PowerPoint, SPSS",
      },
      {
        label: "Honors",
        value:
          "Levison Fellow 20XX — Stanford leadership and service program through a Jewish lens",
      },
    ],
    additionalInfo: [
      "Technology Education Connecting Cultures (Stanford 09/20XX - 6/20XX)",
    ],
  },

  // ─── RESUME 11: Joshua Xavier ─────────────────────────────────────
  {
    slug: "joshua-xavier",
    name: "Joshua Xavier",
    type: "International Affairs",
    field: "International Relations",
    contact: {
      email: "jxavier@stanford.edu",
      phone: "650.555.3999",
      addresses: ["PO Box 90484, Stanford, CA 94309"],
    },
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree:
          "BA, International Relations with Honors; Minor, Languages",
        dates: "9/XX - 6/XX",
        gpa: "3.5/4.0",
      },
      {
        institution:
          "Stanford at Sea, Stanford Hopkins Marine Station",
        location: "Monterey Bay, CA",
        degree: "",
        dates: "4/XX - 6/XX",
      },
      {
        institution: "Stanford in Paris Program",
        location: "Paris, France",
        degree: "",
        dates: "9/XX - 3/XX",
      },
    ],
    experienceSections: [
      {
        title: "Research/Analytical Experience",
        items: [
          {
            title: "Honors Thesis Research",
            organization: "(Self-directed)",
            location:
              "Baja California, Mexico and Stanford",
            dates: "6/XX - Present",
            bullets: [
              "Assess sustainability vs. development issues in energy production, salt production, and tourism",
              "Compile model on effective strategies in large-scale development proposal and opposition",
            ],
          },
          {
            title: "Researcher",
            organization:
              "Medecins Sans Frontieres, France",
            location:
              "Conakry, Republic of Guinea and Stanford",
            dates: "1/XX - Present",
            bullets: [
              "Evaluate decision making and donor/recipient country relations in emergency relief organization",
              "Coordinate fieldwork independently",
            ],
          },
          {
            title: "Researcher",
            organization:
              "Stanford/NSF Biocomplexity Project",
            location:
              "Baja California Sur, Mexico and Stanford",
            dates: "6/XX - Present",
            bullets: [
              "Design research surveys for Mexico's most productive fishing cooperatives",
              "Collaborate with scientists and fishermen to refine interview process for future research",
            ],
          },
          {
            title: "Researcher",
            organization:
              "Stanford Hopkins Marine Station",
            location:
              "Republic of Kiribati, Palmyra Atoll, Monterey Bay",
            dates: "4/XX - 6/XX",
            bullets: [
              "Monitored trophic cascades in reef ecosystems",
              "Identified and size-estimated 25 different species of herbivorous fish",
              "Surveyed over 3,000 square meters of reef from different islands with varying fishing gradients",
            ],
          },
          {
            title: "Researcher",
            organization:
              "Stanford Affordable Hearing Project",
            location: "Stanford, CA",
            dates: "4/XX - 6/XX",
            bullets: [
              "Calculated need of hearing aid devices for low-income population in Bay Area",
              "Conducted empathy work; identified gaps in Medicare and Medicaid",
              "Generated business plan presentation to donors",
            ],
          },
        ],
      },
      {
        title: "Leadership/Teamwork Experience",
        items: [
          {
            title: "Residential Assistant",
            organization: "Yost House (Dorm)",
            location: "Stanford, CA",
            dates: "9/XX - Present",
            bullets: [
              "Manage staff of seven in 60-student dormitory",
              "Plan events promoting Spanish and Portuguese language and culture",
            ],
          },
          {
            title: "Tutor",
            organization:
              "Center for Teaching and Learning",
            location: "Stanford, CA",
            dates: "9/XX - Present",
            bullets: [
              "Counsel peers in Spanish Literature and Composition courses and French language",
            ],
          },
          {
            title: "Policy Assistant",
            organization:
              "International Chamber of Commerce",
            location: "Paris, France",
            dates: "1/XX - 3/XX",
            bullets: [
              "Assembled data retention agency database and telecom liberalization policy paper",
              "Prepared VoIP technology memorandum in French",
              "Liaison for Latin American National Committees and Paris Secretariat",
            ],
          },
          {
            title:
              "Payson-Treat Cross-Cultural Fellow",
            organization: "Volunteers in Asia",
            location: "Stanford, CA",
            dates: "11/XX - 9/XX",
            bullets: [
              "Developed 2-week series of events on American Culture for visiting Japanese students",
              "Traveled to Asia on cultural exchange",
            ],
          },
          {
            title: "Intern",
            organization: "The Getty Center",
            location: "Los Angeles, CA",
            dates: "6/XX - 8/XX",
            bullets: [
              "Supported logistics operations at Museum and Grounds Department",
            ],
          },
          {
            title: "Tour Guide",
            organization:
              "Stanford Visitor Information Services",
            location: "Stanford, CA",
            dates: "9/XX - 6/XX",
            bullets: [
              "Led public and private tours through Stanford campus with emphasis on history, traditions, and student life",
            ],
          },
          {
            title: "Interpreter/Volunteer",
            organization: "Genesis Expeditions",
            location: "Ensenada, Mexico",
            dates: "6/XX - 6/XX",
            bullets: [
              "Mediated relations between non-profit directors, orphanage officials, and construction managers",
            ],
          },
        ],
      },
    ],
    skills: [
      {
        label: "Languages",
        value:
          "Native Spanish speaker; Fluent in English and French; Conversational Portuguese",
      },
      {
        label: "Technical",
        value:
          "HTML and JavaScript, MS Office, working knowledge of PhotoShop",
      },
      {
        label: "Interests",
        value:
          "Extensive travel in Mexico, Asia, Europe, and South America; Rock climber; Scuba diver (NAUI certified)",
      },
    ],
    additionalInfo: [
      "Bass, Stanford Symphonic Chorus (9/XX - Present)",
      "Athlete, Stanford Canoe and Kayak Team (12/XX - Present); Medaled in USACK Collegiate Nationals, Atlanta, GA (05/XX)",
    ],
  },

  // ─── RESUME 12: Gui-Ping (Gwen) Zhou ──────────────────────────────
  {
    slug: "gwen-zhou",
    name: "Gui-Ping (Gwen) Zhou",
    type: "International Student",
    field: "Solar Energy / Engineering",
    contact: {
      email: "istudent@stanford.edu",
      phone: "(650) 555-5555",
      addresses: [
        "659 Escondido Road, Apt. 16E, Stanford, CA 94305",
      ],
    },
    objective:
      "To obtain a position as Product Manager or New Product Strategist in the solar industry",
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree:
          "MS, Management Science and Engineering",
        dates: "9/XX - 6/XX",
        gpa: "3.6/4.0",
        coursework: [
          "Strategies in Innovation",
          "New Product Introduction",
          "Technology and Society",
          "Strategic Marketing",
        ],
      },
      {
        institution:
          "Swiss Federal Institute of Technology (ETH)",
        location: "Zurich, Switzerland",
        degree:
          "Licence (M.S. degree) with Honors, Materials Science and Engineering",
        dates: "8/XX - 5/XX",
        gpa: "9.2/10",
        coursework: [
          "Nanofabrication",
          "Semiconductor Devices",
          "MEMS",
          "Renewable Energy",
        ],
      },
    ],
    experienceSections: [
      {
        title: "Experience",
        items: [
          {
            title: "Technology Intern",
            organization:
              "National Solar Technology Institute",
            location: "Beijing, China",
            dates: "6/XX - 8/XX",
            bullets: [
              "Translated honors thesis from French to Mandarin",
              "Expanded assessment of technologies to include installation and operating costs specific to China",
              "Met varied forecasts of China's expanding energy needs",
              "Co-authored report and executive summary for Ministry of Energy officials",
            ],
          },
          {
            title:
              "Independent Researcher (Honors Thesis)",
            organization:
              "Swiss Federal Institute of Technology",
            location: "Zurich, Switzerland",
            dates: "8/XX - 5/XX",
            bullets: [
              "Conducted extensive literature review to assess competing solar energy technologies",
              "Estimated and compared projected efficiency limits and cost per generated kilowatt-hour of photovoltaic and solar-thermal configurations",
            ],
          },
          {
            title: "Research Assistant",
            organization:
              "Swiss Federal Institute of Technology (ETH)",
            location: "Zurich, Switzerland",
            dates: "6/XX - 8/XX (Summers)",
            bullets: [
              "Characterized electrical and optical properties of amorphous and polycrystalline silicon photovoltaic devices",
              "Automated test apparatus reducing data collection time from 2 hours to 20 minutes",
              "Assisted fabrication of photovoltaic devices with 50-nm dimensions in Class 10 nano-fabrication facility",
              "Became familiar with ion beam deposition and directional etching",
              "Helped empirically identify and document process parameters for depositing new type of passivation layer",
            ],
          },
        ],
      },
      {
        title: "Leadership",
        items: [
          {
            title: "Founder/President",
            organization:
              "Chinese Students Association, Swiss Federal Institute of Technology (ETH)",
            location: "Zurich, Switzerland",
            dates: "8/XX - 5/XX",
            bullets: [
              "Founded organization to support Chinese students and promote cultural awareness",
              "Surveyed students and university officials to assess need and clarify club's mission",
              "Persuaded Dean of Student Life to allocate seed funding to launch club",
            ],
          },
        ],
      },
    ],
    skills: [
      {
        label: "Languages",
        value:
          "Fluent in English (TOEFL 273/300) and French; Native speaker of Mandarin; Basic skills in German",
      },
      {
        label: "Computer",
        value: "PC, Word, Excel, Access, Stata 5.0",
      },
      {
        label: "Travel",
        value: "Europe, Asia, Central and North America",
      },
      {
        label: "Interests",
        value:
          "Skiing, mountain biking, playing piano, listening to jazz",
      },
    ],
  },

  // ─── RESUME 13: Julia Eng-Bachelor ────────────────────────────────
  {
    slug: "julia-eng",
    name: "Julia Eng-Bachelor",
    type: "Engineering",
    field: "Mechanical Engineering",
    contact: {
      email: "SUId@stanford.edu",
      phone: "(650) 723-0000",
      addresses: [
        "563 Salvatierra Walk, Stanford, CA 94305",
      ],
    },
    objective:
      "To obtain a hands-on position developing and optimizing robots and automated production systems",
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree: "BS in Mechanical Engineering (expected 20XX)",
        dates: "9/XX - Present",
        gpa: "Major: 3.7/4.0, Cumulative: 3.5/4.0",
        coursework: [
          "Robotics",
          "Machine Vision",
          "Mechatronics",
          "Product Design",
          "Control Systems",
          "Machines and Society",
        ],
      },
      {
        institution: "Stanford in Berlin",
        location: "Germany",
        degree:
          "Studied German language, history, and culture",
        dates: "Spring 20XX",
      },
    ],
    experienceSections: [
      {
        title: "Course Projects",
        items: [
          {
            title: "Integrated Compliant Arm-Wrist Robot",
            organization: "Stanford University",
            location: "Stanford, CA",
            dates: "4/XX - 6/XX",
            bullets: [
              "Worked on team to simulate and program existing robot with 6 degrees of freedom",
              "Empirically determined acceptable gripping pressures for objects of differing shape, weight, and surface texture",
              "Successfully trained robot to pick up and manipulate delicate wineglass without damaging it",
            ],
          },
          {
            title: "Throw & Catch Robots",
            organization: "Stanford University",
            location: "Stanford, CA",
            dates: "1/XX - 3/XX",
            bullets: [
              "Trained twin robots to repeatedly throw and catch tennis ball",
              "Worked on three-person team to simulate and develop motion and control algorithms",
              "Led team in rendering and fine-tuning algorithms into C++",
            ],
          },
        ],
      },
      {
        title: "Experience",
        items: [
          {
            title: "Engineering Intern",
            organization: "Siemens AG",
            location: "Munich, Germany",
            dates: "6/XX - 9/XX",
            bullets: [
              "Provided drafting and engineering support at plant manufacturing drives and motors",
              "Updated and maintained electro-mechanical drawings and documentation",
              "Adhered to best-practice protocols for document control",
              "Observed factory operations employing precision robots and machine vision",
            ],
          },
        ],
      },
      {
        title: "Activities",
        items: [
          {
            title: "Social Chair",
            organization: "Sigma Delta Tau Sorority",
            location: "Stanford, CA",
            dates: "20XX - Present",
            bullets: [
              "Led committee that planned and organized monthly events for all 50 women in house",
              "Organized successful benefit dinner that exceeded fundraising goal (>$5,000)",
            ],
          },
          {
            title: "Tour Guide",
            organization: "Stanford University",
            location: "Stanford, CA",
            dates: "20XX - Present",
            bullets: [
              "Polished public speaking skills while conducting three campus tours per week",
            ],
          },
        ],
      },
    ],
    skills: [
      { label: "Design", value: "SolidWorks" },
      {
        label: "Programming",
        value: "Matlab, C/C++, Java, HTML",
      },
      {
        label: "Fabrication",
        value: "CNC mill, lathe, brazing",
      },
      {
        label: "Languages",
        value: "German (conversational)",
      },
    ],
    additionalInfo: [
      "American Society of Mechanical Engineers",
      "Tau Beta Pi Engineering Honor Society",
      "Society of Women Engineers",
    ],
  },

  // ─── RESUME 14: Audrey Crenshaw ───────────────────────────────────
  {
    slug: "audrey-crenshaw",
    name: "Audrey Crenshaw",
    type: "Electronic/CS",
    field: "Computer Science",
    contact: {
      email: "student@stanford.edu",
      phone: "650.497.1234",
      addresses: [
        "P.O. Box 12345, Stanford, CA 94309",
      ],
    },
    objective:
      "Summer intern position focusing on software development",
    education: [
      {
        institution: "Stanford University",
        location: "Stanford, CA",
        degree:
          "Bachelor of Science, Computer Science (expected June 20XX)",
        dates: "9/XX - Present",
        coursework: [
          "Java",
          "C",
          "LISP",
          "Programming Paradigms and Algorithms",
          "Databases",
          "Artificial Intelligence",
        ],
      },
    ],
    experienceSections: [
      {
        title: "Experience",
        items: [
          {
            title:
              "Computer Technician and Programmer",
            organization:
              "Career Development Center, Stanford University",
            location: "Stanford, CA",
            dates: "10/20XX - Present",
            bullets: [
              "Set up and maintain JSP server for connectivity to FileMakerPro databases",
              "Help design and maintain center website",
            ],
          },
          {
            title: "Database Intern",
            organization:
              "Adobe Systems, Adobe Solutions Network",
            location: "San Jose, CA",
            dates: "6/20XX - 9/20XX",
            bullets: [
              "Set up and maintained JSP web pages for connectivity to MySQL databases",
              "Redesigned and maintained related FileMakerPro, Lotus Notes, and Oracle databases with team of two engineers",
            ],
          },
          {
            title: "Civil Engineering Intern",
            organization: "City of Orange",
            location: "Orange, CA",
            dates: "Summers 20XX - 20XX",
            bullets: [
              "Assisted with organizing road design plans",
            ],
          },
        ],
      },
    ],
    skills: [
      {
        label: "Computer",
        value:
          "C, Java, LISP, Perl, VisualBASIC, Oracle, PL/SQL, ODL/OQL, XML, SQL/CLI, PSM, UNIX, Linux, HTML, Web page design, Dreamweaver, Fireworks, Flash, Photoshop, GoLive, Illustrator, Acrobat, FileMakerPro, Lotus Notes, Databases",
      },
    ],
    additionalInfo: [
      "Bausch and Lomb Achievement Award",
      "National Society of Women Engineers Award",
      "Youth Science Center Teacher's Aide",
      "Campaign for Congress Volunteer",
      "Campaign for City Council Volunteer",
      "Society of Women Engineers",
      "Illustration, Writing, Poetry",
    ],
  },
];
