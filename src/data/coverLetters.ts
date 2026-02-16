export interface CoverLetter {
  slug: string;
  author: string;
  type: string;
  senderInfo: string;
  date: string;
  recipientName: string;
  recipientTitle: string;
  company: string;
  recipientAddress: string;
  salutation: string;
  paragraphs: string[];
  closing: string;
}

export const coverLetters: CoverLetter[] = [
  {
    slug: "john-duncan",
    author: "John Duncan",
    type: "Response to Job Listing",
    senderInfo: "P.O. Box 000033, Stanford, CA 94000",
    date: "October 19, 20XX",
    recipientName: "Ms. Marian Armstone",
    recipientTitle: "Human Resources Manager",
    company: "LEK Consulting",
    recipientAddress: "9999 Oak Street, Palo Alto, CA 9003",
    salutation: "Dear Ms. Armstone:",
    paragraphs: [
      "This letter and the attached resume serve as my application for the Associate position at LEK Consulting. After speaking with Jo Kimmer at Stanford's Career Fair on October 9, I believe my skills, academic training, and work experience are a good fit for this position.",
      "I will complete a Master of Science degree in Mechanical Engineering in June 20XX. I have developed strong analytical and quantitative skills through coursework in technical, computer science, and economics courses. In addition, my hands-on experience in various internships and student leadership positions supports my qualifications as an Associate.",
      "As an intern at General Motors this past summer, I developed analytical skills by taking measurements on a development vehicle identifying design problems, offering solutions for improvement, and making recommendations in a written report. I was awarded a General Motors scholarship for my exceptional contributions as a member of the S-10 Crew Cab launch team.",
      "At Stanford, I demonstrated leadership ability by serving as the elected president for a service organization with over one hundred active members. In this effort, I honed my ability to make good decisions, plan and organize my time, work well on a team, and have developed sound interpersonal, oral, and written communications skills. Finally, I bring an entrepreneurial spirit and creativity to this position, as evidenced by my experience designing, patenting, and marketing my own product.",
      "I would enjoy speaking with you further to discuss, in detail, how I am a match for the Associate position. I will follow up in two weeks to see if there is additional information you would like me to provide or answer questions you may have.",
    ],
    closing: "Sincerely, John Duncan",
  },
  {
    slug: "andrea-abre",
    author: "Andrea Abre",
    type: "Internship Application",
    senderInfo: "12345 First Street | Palo Alto, CA 94305 | 650.555.1234 | andreaabre@stanford.edu",
    date: "",
    recipientName: "Hiring Manager",
    recipientTitle: "",
    company: "Jonson Inc.",
    recipientAddress: "123 Fifth Avenue, New York, NY 10019",
    salutation: "Dear Hiring Manager:",
    paragraphs: [
      "I am writing to apply for your summer intern position posted on JonsonInc.com. I have experience in fashion journalism through my work with the online magazine One Line to You and have a background in event planning through my work as a Marketing Intern this past summer. Currently, I am a junior at Stanford University studying Communication and International Relations and I plan to pursue a career in fashion upon graduation. Jonson would be a great springboard in achieving that goal.",
      "My passion for fashion and art comes from my grandmother who was a fabric designer in New York during the 1940s and 50s. From her, I learned a great deal about color and design. Since the age of 10, I have been consumed by the industry and have studied Vogue, Harper's Bazaar and Elle magazines. In addition, I analyze and examine the work of designers and follow fashion critics like Suzy Menkes. After beginning to write for the online magazine, One Line to You, I had the opportunity to parlay my depth of knowledge into written pieces about various aspects of the fashion world. My expression through this medium also allowed me to further my education of the industry.",
      "I believe the marketing internship at the San Francisco Symphony best prepared me for the responsibilities of an intern at Jonson. In this position I was trusted with a great deal of responsibility. I wrote newsletters, researched artists to compile performance programs, helped with event planning, ran errands, composed press releases and edited and proof-read written material. Through these tasks I learned the importance of being thorough while working in a fast-paced environment. My attention to detail and organization allowed me to thrive in this context and they will do the same at Jonson.",
      "After reviewing Jonson's spring ready-to-wear collection, I feel it would be amazing to work toward the new creative director Heather London's vision. It must be a very exciting time for the Jonson label.",
      "I look forward to hearing from you in the near future and am available for an interview at your convenience. Please contact me with any questions you may have. Thank you for your time and consideration.",
    ],
    closing: "Sincerely, Andrea Abre",
  },
  {
    slug: "jason-jefferson",
    author: "Jason Jefferson",
    type: "On-Campus Interview",
    senderInfo: "2468 College Avenue, Palo Alto, CA 94306",
    date: "January 10, 20XX",
    recipientName: "Mr. John Boulton",
    recipientTitle: "Director Technical Administration",
    company: "Hillview Laboratories",
    recipientAddress: "22244 Stevens Creek Blvd., San Jose, CA 94000",
    salutation: "Dear Mr. Boulton:",
    paragraphs: [
      "I appreciate the opportunity to meet with you this coming Thursday to discuss employment opportunities at Hillview Laboratories and to expand on my qualifications for the position.",
      "I reviewed your website and literature at the Career Development Center and also spoke with Janet Morris, who works at Hillview. Her comments have given me a clearer idea of your R & D efforts and the work with which I might be involved. In particular, I am impressed by your state-of-the-art laboratories and how Hillview has effectively integrated a participatory management style in its total operation.",
      "As my resume reflects, I have previous research experience in the area where I have developed strong analytical and technical skills. You will note my graduate work also directly relates to the type of work currently being done at Hillview.",
      "Thank you for your interest in my application and your willingness to come to Stanford University for interviews. I look forward to meeting you and discussing how my background and experience can contribute to your work.",
    ],
    closing: "Sincerely, Jason E. Jefferson",
  },
  {
    slug: "sarah-johnson",
    author: "Sarah Johnson",
    type: "Result of Phone Conversation",
    senderInfo: "P.O. Box 11335, Stanford, CA 94309",
    date: "February 2, 20XX",
    recipientName: "Mr. Scott Campbell",
    recipientTitle: "Managing Editor",
    company: "Corpus Christi Caller-Times",
    recipientAddress: "P.O. Box 9136, Corpus Christi, TX 78469-9136",
    salutation: "Dear Mr. Campbell:",
    paragraphs: [
      "As a result of our phone conversation on January 31, I am sending you my resume as you requested. I have also taken the liberty of attaching a sample of my writing. I was encouraged to contact you after speaking with my high school journalism teacher, Mr. Bill Jenkins, who has ties with Ms. Sally Smith of your organization.",
      "As I mentioned in our discussion, I am currently a student at Stanford University and am very interested in journalism, advertising, and graphic design. I am seeking an opportunity to develop and utilize my skills and qualifications in a paid summer internship, doing whatever work possible. Growing up in Corpus Christi, the Caller-Times has always been part of my life. Now that I am older I have come to respect it as a professional service vital to our community, and am now eager to enlist and gain insight into the career I dream of holding.",
      "My passion for journalism has only grown with time. As a Managing Editor of Hoofbeat, my high school's national award-winning newspaper, I collaborated with fellow editors and managed a staff of nearly 30 younger writers as part of the overall process of overseeing production of the newspaper from conception to publication. As my resume indicates, I have demonstrated strong leadership and undergone extensive training through active participation in academic and professional organizations. In my effort to fully develop these important skills, I will continue to serve as a Layout Designer for The Stanford Scientific, the only full-color publication on campus for the duration of this academic year. I hope to gain the position of Head of Production in the years ahead.",
      "In addition to my experience in journalism, my instruction includes coursework in statistics, psychology, and persuasive writing, and experience fielding phone calls and collecting data. My education has honed the writing, planning, organization, and presentation skills that I believe are essential to working in communications.",
      "I am excited about the many aspects of the journalism world and welcome the prospect of discussing opportunities to explore them in your company. I will follow up in a week to answer questions you may have or provide additional information. In the meantime, should you have questions, I can be reached at 650-555-5555 or sjohnson@stanford.edu.",
      "Thank you for your time and I look forward to hearing from you soon.",
    ],
    closing: "Sincerely, Sarah Johnson",
  },
  {
    slug: "maria-johnson",
    author: "Maria Johnson",
    type: "Unsolicited / Broadcast Letter",
    senderInfo: "P.O. Box 22445, Stanford, CA 94309",
    date: "August 7, 20XX",
    recipientName: "Dr. John Allen",
    recipientTitle: "Associate Director",
    company: "INT Consulting Company",
    recipientAddress: "12396 Park Blvd., Los Angeles, CA 93032",
    salutation: "Dear Dr. Allen:",
    paragraphs: [
      "Currently I am a student at Stanford University pursuing a BA degree in economics. I am very interested in business-related careers and am seeking opportunities to develop and utilize my skills and qualifications. I have researched your company and believe that your commitment to excellence and service is in alignment with my career goals and beliefs.",
      "In addition to economics, my academic training includes extensive coursework in the sciences where I've developed very strong analytical, quantitative, and technical skills. Through my research, I have cultivated strong planning, organization, and presentation skills that I believe will be an asset in a business environment.",
      "As an Investment Banker Summer Intern at Morgan Stanley, I collaborated with brokers to market online investing, consulted with prospective clients and networked through the internet and other computer software.",
      "As my resume indicates, I have demonstrated strong leadership and decision-making skills through active participation in campus organizations. In my effort to continue to develop these important skills, I will serve as a Head Academic Advisor this coming year, teaming with resident assistants and faculty members to plan educational and social programs for freshmen to help them plan their academics and adjust to campus life.",
      "I am excited about the many facets of the business world and welcome the opportunity to discuss opportunities to explore in your company. I will follow up in a week to answer questions you may have or provide additional information. In the meantime, should you have questions, I can be reached at 650-600-0000 or mjohnson@stanford.edu.",
      "Thank you for your time and I look forward to hearing from you soon.",
    ],
    closing: "Sincerely, Maria Johnson",
  },
  {
    slug: "amy-chen",
    author: "Amy Chen",
    type: "Networking / Approach Letter",
    senderInfo: "P.O. Box 12345, Stanford, CA 94309, 650-999-1212",
    date: "February 10, 20XX",
    recipientName: "Ms. Laura Valencia",
    recipientTitle: "Manager Creative Services Department",
    company: "Putnam Blair and Associates",
    recipientAddress: "12 Front Street, San Francisco, CA 94108",
    salutation: "Dear Ms. Valencia:",
    paragraphs: [
      "This June, I will graduate with a B.A. degree in English from Stanford University. I have a strong interest in advertising and will soon seek a position as a Junior or Assistant Copywriter. Robert Blum encouraged me to contact you, suggesting that you might be willing to meet with me and provide an insider's view of how I can best identify employment opportunities in this field.",
      "It may be helpful for you to know that I completed a summer internship in the Marketing Department of a small high-tech company and have worked as the Advertising Manager at the Stanford Daily. I believe that both experiences are relevant to future work in advertising. I have strong writing and communication skills and enjoy working in a fast-paced environment. In addition, working throughout my Stanford career to finance a substantial portion of my education has strengthened my time management skills and determination to pursue and achieve my goals. These skills, together with my passion for photography, fascination with the consumer market, and personal interest in the creative side of advertising lead to my strong interest in this field.",
      "I will be in touch with you by phone this week. At your convenience, I would like to set up a short 20-30 minute meeting with you at your worksite. Any advice or suggestions for my job search are welcomed. I understand you are busy, and I appreciate your time.",
    ],
    closing: "Sincerely, Amy Chen",
  },
];
