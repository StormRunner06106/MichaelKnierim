// Constants for portfolio data

export const PORTFOLIO_DATA = {
  // Personal Information
  personal: {
    name: "Michael T. Knierim",
    role: "Researcher, Academic",
    location: "Karlsruhe, Germany",
    email: "michael.knierim@kit.edu",
    phone: "+49 (721) 608-48385",
    group: "KIT",
    officeHours: "nach Vereinbarung / by appointment",
    room: "5C-03.1",
    // Google Scholar Configuration
    scholarId: "GZmvMCMAAAAJ",
    serpApiKey:
      "98544d70e920d9fe5b34096cf9fe4f24de44ec6f8109301901a17bbc53750863",
  },

  // Hero Section
  hero: {
    greeting: "Hi, I'm Michael T. Knierim",
    title: "Research Group Leader at KIT & Honorary Associate Professor at UoN",
    coreWork: ["Wearable Neurotechnology", "Well-being and productivity"],
  },

  // Landing Photos
  landingPhotos: [
    "Landing/1fd058a2-af3b-4943-97f4-6fa438bc1c66 2.jpg",
    "Landing/IMG_2277.jpg",
    "Landing/IMG_2342.JPG",
  ],

  // Work Focus Section
  workFocus: {
    title: "Work Focus",
    paragraphs: [
      {
        text: "I work at the intersection of <strong>Information Systems (IS)</strong> and <strong>Human-Computer Interaction (HCI)</strong>, collaborating across neuroscience, biomedical engineering, AI, and psychology—with publications in top venues spanning all these disciplines (ACM CHI, IMWUT, ISWC, CSCW, MISQ, ICIS, ECIS, Sensors, Scientific Reports, BCI).",
      },
      {
        text: "My research focuses on developing <strong>innovative neural wearables</strong> that provide critical insight into the daily dynamics of mental demands, recovery, and peak performance. I investigate three core areas: <strong>individual experiences</strong> in knowledge work (mental workload, flow states, sustainable productivity), <strong>team dynamics</strong> in virtual collaboration (emotional intelligence, meeting fatigue, affective regulation), and <strong>human-AI interaction</strong> at work (cognitive demands, user well-being in AI-assisted tasks).",
      },
      {
        text: "Methodologically, I pioneer <strong>wearable brain sensing beyond the laboratory</strong> – developing accessible technologies (ear-EEG, headphone-EEG) and conducting naturalistic studies to generate critical datasets. Open-source hardware and software contributions make these advancements accessible to the research community.",
      },
      {
        text: "By combining <strong>multimodal sensor systems</strong> (brain activity, heart rate variability, behavioral data) with <strong>advances in machine learning</strong>, my research group creates the foundation for adaptive systems that respond to psychological and physiological needs. Conducting this work <strong>transparently and openly</strong> ensures these technologies develop in an <strong>ethically responsible manner</strong> – serving societal needs rather than commercial interests.",
      },
    ],
  },

  // Recognitions Section
  recognitions: {
    title: "Recognitions",
    paragraphs: [
      {
        text: "My research and academic service have been recognized through multiple international awards and nominations. I received the Best Paper Award at the <em>International Symposium on Wearable Computing Systems (ISWC)</em> in 2025 and an Honorable Mention Award (top 5% of 5,014 submissions) at the <em>ACM CHI Conference on Human Factors in Computing Systems</em> in the same year. Earlier in my career, I received the Best Prototype Paper Award at the <em>Design Science Research in Information Systems and Technology (DESRIST)</em> conference (2017) and was nominated for Best Paper Awards at the <em>Group Decision and Negotiation</em> conference (2017) and the <em>International Conference on Physiological Computing Systems</em> (2018).",
      },
      {
        text: "In recognition of my contributions to the academic community, I have also received several Outstanding Reviewer Recognitions, including from <em>ACM CHI</em> (2024, 2025, 2026), <em>ACM IMWUT</em> (2025), and <em>UbiComp/ISWC</em> (2025).",
      },
    ],
  },

  // Featured Work Section
  featuredWork: {
    title: "Featured Work",
    categories: [
      {
        title: "Neural Wearables",
        description:
          "Traditional brain sensing has been confined to laboratories with bulky equipment. My research pioneers wearable EEG systems for everyday contexts – developing open-source hardware (Open-cEEGrids for gel-based ear-EEG, Open ExG Headphones with dry electrodes), algorithms (improving temporal precision for mobile EEG), and software (web apps for secure data streaming). Through lab-based and field-focused evaluations, this work bridges controlled experiments and naturalistic studies, making brain sensing as practical as heart rate monitoring and enabling continuous assessment of cognitive states in real-world environments.",
        muxAssetId: "00w8b00pKJXWMUn1wcGmCV02tFwpsd5Xv012by9fJ7NZoDA",
        images: [
          "Neural Wearables/open-ceegrids-2.png",
          "Neural Wearables/open-ceegrids.png",
          "Neural Wearables/open-exg-headphones-1.png",
          "Neural Wearables/open-exg-headphones-2.png",
          "Neural Wearables/open-exg-headphones-3.png",
        ],
        selectedWorks: [
          {
            title: "Systematic comparison of EEG amplifiers",
            description:
              "Validating that low-cost open-source OpenBCI systems achieve comparable performance to high-end amplifiers for around-the-ear EEG recordings (Sensors 2023)",
            link: "https://www.mdpi.com/1424-8220/23/9/4559",
          },
          {
            title: "Web platform for EEG data collection",
            description:
              "Scalable, customizable web-based platform simplifying OpenBCI EEG setup for field studies with privacy-compliant data streaming (UbiComp Workshop 2024)",
            link: "https://dl.acm.org/doi/10.1145/3675094.3678482",
          },
          {
            title: "Headphone-EEG for cognitive load detection",
            description:
              "Demonstrating superior wearability of headphone-EEG compared to traditional systems, with equal signal quality and reliable cognitive load classification validated in week-long field studies with nearly 200 hours of data (IMWUT 2025)",
            link: "https://dl.acm.org/doi/abs/10.1145/3712283",
          },
          {
            title: "Open-source EEG headphones platform",
            description:
              "3D-printed headphone design integrating OpenBCI hardware for biopotential earable research (CHI 2023)",
            link: "https://dl.acm.org/doi/abs/10.1145/3544549.3585875",
          },
          {
            title: "Open-source cEEGrid-OpenBCI integration",
            description:
              "Cost-effective adaptation of concealed ear-EEG electrodes to OpenBCI platform with 3D-printed components, replicating visual stimulation and mental workload effects (Brain-Computer Interfaces 2021)",
            link: "https://www.tandfonline.com/doi/abs/10.1080/2326263X.2021.1972633",
          },
        ],
      },
      {
        title:
          "Fostering Positive Experiences: Flow, Mental Workload & Mental Fatigue",
        description:
          "Understanding and fostering positive psychological experiences at work – particularly flow states – while managing mental workload and fatigue is crucial for sustainable productivity and well-being. My research investigates these interconnected phenomena using both physiological measurement (EEG, ECG) and experience sampling methods to capture their dynamics in real-world work contexts. By identifying when people are in optimal cognitive states versus experiencing overload or fatigue, this work enables the development of systems that support mental readiness and recovery, ultimately fostering healthier and more productive work experiences.",
        muxAssetId: "B02aNPDeR9gtjhkR02upoYvS8V2GW5BGvtKw7YVDFOJTg",
        images: [],
        selectedWorks: [
          {
            title: "Flow detection in real knowledge work",
            description:
              "Using discrete ear-EEG throughout entire workdays to identify neural correlates of flow, discovering that natural work tasks elicit more intense flow than artificial lab tasks (CHI 2025)",
            link: "https://dl.acm.org/doi/10.1145/3706598.3713512",
          },
          {
            title: "Games for recovery from high mental workload",
            description:
              "Demonstrating that intense, cognitively demanding games effectively enable recovery after high mental workload tasks, challenging traditional recovery theories (CHI 2025)",
            link: "https://dl.acm.org/doi/10.1145/3706598.3713915",
          },
          {
            title: "Mental readiness and fatigue at work",
            description:
              "Exploring the interplay between mental readiness, fatigue, cognitive functioning, and flow experiences in digital work environments (CHI EA 2025)",
            link: "https://dl.acm.org/doi/10.1145/3706599.3719836",
          },
          {
            title: "Physiological Classification of Flow at Work",
            description:
              "Applying machine learning to physiological signals for real-time detection of flow states during work tasks, advancing the development of adaptive information systems that can recognize and support optimal cognitive states (IEEE Transactions on Affective Computing 2021)",
            link: "https://ieeexplore.ieee.org/abstract/document/9296229/",
          },
          {
            title: "Psychophysiology of flow",
            description:
              "Systematic literature review of peripheral nervous system indicators of flow, proposing simple and unobtrusive measurement approaches for IS research (NeuroIS 2017)",
            link: "https://link.springer.com/chapter/10.1007/978-3-319-67431-5_13",
          },
          {
            title: "Framework for flow interventions at work",
            description:
              "Comprehensive three-dimensional framework for systematically developing and evaluating flow interventions, distinguishing between intervention aims (entering, boosting, maintaining flow), targets (context, individual, group), and executors (top-down, bottom-up) (Frontiers in Psychology 2023)",
            link: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1143654/full",
          },
        ],
      },
      {
        title:
          "Future of Work: Knowledge Work, Virtual Teamwork, Human-AI Interaction",
        description:
          "The nature of work is fundamentally transforming as digital technologies, remote collaboration, and AI assistance reshape how knowledge workers perform complex tasks. My research investigates the cognitive, physiological, and social dynamics of modern work environments, developing evidence-based approaches to support well-being, productivity, and optimal experiences in digitally-mediated settings.",
        videoLink: "",
        images: [
          "Future of Work Knowledge Work, Virtual Teamwork, Human-AI Interaction/1-flow-ml-1.jpg",
          "Future of Work Knowledge Work, Virtual Teamwork, Human-AI Interaction/2-emobot.png",
        ],
        selectedWorks: [
          {
            title: "What Disrupts Flow in Office Work?",
            description:
              "NeuroIS laboratory study manipulating interruption frequency and relevance during typical office tasks, examining impacts on self-reported flow, its dimensions, heart rate variability, and task performance to understand how IT-mediated interruptions affect deep work states (MIS Quarterly 2023)",
            link: "https://misq.umn.edu/misq/article-abstract/47/4/1615/2259/What-Disrupts-Flow-in-Office-Work-The-Impact-of?redirectedFrom=fulltext",
          },
          {
            title: "Temporal Dynamics of Mental Workload in Remote Meetings",
            description:
              "Using heart rate variability and neurophysiological measures to understand when mental workload peaks during extended remote meetings, providing foundations for designing neuro-adaptive video conferencing systems that propose breaks at optimal times (ICIS 2025)",
            link: "https://aisel.aisnet.org/icis2025/is_transformwork/is_transformwork/2/",
          },
          {
            title: "Flow in Knowledge Work Groups",
            description:
              "Examining how digitally-mediated communication affects flow experiences in collaborative knowledge work, using machine learning on ECG and self-report data to classify flow states and revealing that communication-restrictive digital environments may limit shared intense experiences (ICIS 2019)",
            link: "https://aisel.aisnet.org/icis2019/future_of_work/future_work/7/",
          },
          {
            title: "Chatbot-based Emotion Management for Distributed Teams",
            description:
              "Conducting participatory design studies to explore how chatbot technologies can support emotion awareness and regulation in text-based collaboration, addressing the decreased capacity for socio-emotional communication in distributed team environments (CSCW 2020)",
            link: "https://dl.acm.org/doi/abs/10.1145/3415189",
          },
          {
            title: "Cognitive Load Dynamics in Generative AI-Assistance",
            description:
              "Investigating how generative AI tools like ChatGPT affect real-time cognitive demands during knowledge work using wearable EEG, revealing that AI assistants don't universally reduce cognitive load and can sometimes increase it depending on task complexity (ICIS 2024)",
            link: "https://aisel.aisnet.org/icis2024/aiinbus/aiinbus/12/",
          },
        ],
      },
      {
        title: "Live Biofeedback",
        description:
          "Advances in sensor technology enable moving biofeedback applications from clinical settings into everyday information systems. My research explores how real-time neurophysiological feedback can support self-regulation skills and enhance emotional awareness in collaborative contexts.",
        videoLink: "",
        images: [
          "Live Biofeedback/2018-01-10-2.jpg",
          "Live Biofeedback/IMG_5451.jpg",
          "Live Biofeedback/LGBFScreenshots2.png",
        ],
        selectedWorks: [
          {
            title:
              "Designing Live Biofeedback for Groups to Support Emotion Management in Digital Collaboration",
            description:
              "Proposing psychophysiology-based emotion feedback to improve emotion management in digitally-mediated teamwork, addressing the lack of affective cues in computer-mediated collaboration (DESRIST 2017)",
            link: "https://link.springer.com/chapter/10.1007/978-3-319-59144-5_35",
          },
          {
            title:
              "Live Biofeedback as a User Interface Design Element: A Review of the Literature",
            description:
              "Systematic review synthesizing research across disciplines on integrating neurophysiological biofeedback into information systems for decision support, education, and gaming contexts (Communications of the AIS 2018)",
            link: "https://aisel.aisnet.org/cais/vol43/iss1/18/",
          },
        ],
      },
      {
        title: "Beyond Sensing: Actuating perception and environments",
        description:
          "Moving beyond passive sensing, my research explores how actively manipulating physical environments and perceptual experiences can enhance human comfort, well-being, and interaction. This work investigates thermal actuation systems, gaze-based interaction paradigms, and human-centric automation approaches that recognize psychological needs alongside technical capabilities.",
        muxAssetId: "02g7ookgTWwdeclUUXnGTpEXLOJqA02Eucs9ObHtPo9x00",
        images: [
          "Beyond Sensing/heatables-2.png",
          "Beyond Sensing/heatables.png",
          "Beyond Sensing/smartHomes.png",
        ],
        selectedWorks: [
          {
            title:
              "Heatables: Effects of Infrared-LED-Induced Ear Heating on Thermal Perception, Comfort, and Cognitive Performance",
            description:
              "Novel in-ear wearable that emits near-infrared radiation to deliver localized optical heating, significantly increasing perceived ambient temperature by 1.5°C and delaying cold discomfort, positioning unobtrusive thermal comfort enhancement for everyday contexts (ISWC 2025)",
            link: "https://dl.acm.org/doi/abs/10.1145/3715071.3750421",
          },
          {
            title:
              "Warmth on Demand: Designing Headphones for Enhanced Thermal Comfort in Work Environments",
            description:
              "Exploring how wearable thermal actuation systems integrated into everyday devices can support thermal comfort and cognitive performance during work activities (CHI 2024)",
            link: "https://dl.acm.org/doi/abs/10.1145/3613905.3650884",
          },
          {
            title:
              "BodyPursuits: Exploring Smooth Pursuit Gaze Interaction Based on Body Motion Targets",
            description:
              "Novel HCI method eliminating external screens by having users trace smooth trajectories with their hands while fixating gaze on their thumb, enabling natural gaze-based input without additional display requirements (ETRA 2025)",
            link: "https://dl.acm.org/doi/abs/10.1145/3715669.3723110",
          },
          {
            title:
              "Connecting Home: Human-Centric Setup Automation in the Augmented Smart Home",
            description:
              "Evaluating three IoT device positioning concepts with varying automation degrees, revealing users favor balance between efficiency and perceived autonomy over pure automation, grounded in self-determination theory's psychological needs for control and competence (CHI 2024)",
            link: "https://dl.acm.org/doi/full/10.1145/3613904.3642862",
          },
        ],
      },
    ],
  },

  // Publications Section
  publications: {
    title: "Publications",
  },

  // Beyond the Research Section
  beyondResearch: {
    title: "Beyond the Research",
    sections: [
      {
        title: "Community Engagement",
        text: 'Co-organizer of the <strong>Biosignals</strong> Connect ( "<strong>BioCon</strong>" ) conference series, associated editor at various IS & HCI outlets (CHI, ISWC, ECIS, WI, NeuroIS), active contributor to the <strong>OpenBCI</strong> open-source community, and advocate for <strong>transparent, privacy-preserving</strong> approaches to everyday <strong>neurotechnology</strong>. I frequently speak at public events like the <strong>Night of Sciences</strong> or the <strong>Night of Biosignals</strong>.',
        videoLink: "https://www.youtube.com/watch?v=UFQmVewsxk4",
        images: [
          "Community Engagement/005fe7ec-2d6e-4c1d-9e89-78cf0add4481.JPG",
          "Community Engagement/191741d1-a06c-48d2-8489-2b0bfc72d26a 2.JPG",
          "Community Engagement/2017-11-24-3.jpg",
          "Community Engagement/22b2c6f9-3c26-4d7e-8356-4d915219c0a1 2.jpg",
          "Community Engagement/IMG_6957 3.JPG",
          "Community Engagement/posterHawaii.jpg",
        ],
      },
      {
        title: "Collaboration & Partnerships",
        text: 'Research advances through community. I\'m grateful to work alongside talented doctoral researchers, students, and collaborators who bring fresh energy and perspectives to our projects. My work connects researchers across <a href="https://im.win.kit.edu/1175.php" target="_blank" rel="noopener noreferrer">KIT</a>, the <a href="https://kd2school.info/" target="_blank" rel="noopener noreferrer">KD2School Research Training Group</a>, and international partners at University of Nottingham, Politecnico di Milano, Nara Institute of Science and Technology, and institutions in Sweden and the USA. Industry collaborations with Mercedes-Benz, ABB, Bosch, and sensor manufacturers help bridge academic innovation with real-world impact.',
        images: [
          "Collaboration & Partnerships/IMG_1314.JPG",
          "Collaboration & Partnerships/IMG_3287.JPG",
          "Collaboration & Partnerships/IMG_3727.JPG",
        ],
      },
    ],
  },

  // Awards Section
  awards: {
    title: "Awards",
    items: [
      "Best Prototype Paper Award – International Conference on Design Science Research in Information System and Technology (DESRIST), 2017.",
      "Best Paper Nomination – Int. Conference on Group Decision and Negotiation (GDN), 2017.",
      "Best Student Paper Nomination – Int. Conference on Physiological Computing Systems (PhyCS), 2018.",
      "Honorable Mention Award (Top 5% of 5,014 completed submissions) – Conference on Human Factors in Computing Systems (CHI), 2025.",
      "Outstanding Reviewer Recognition – Conference on Human Factors in Computing Systems (CHI), 2024 & 2025",
    ],
  },

  // Academic Functions & Activities Section
  academicFunctions: {
    title: "Academic Functions & Activities",
    items: [
      "Since 08/2025: Honorary Associate Professor, School of Computer Science, University of Nottingham",
      "Since 03/2025: Technical Program Committee Member 'International Symposium on Wearable Computing' (ISWC)",
      "Since 08/2024: Associate Chair CHI Subcommittee 'Understanding People: Quantitative Methods'",
      "Since 06/2024: Technical Program Committee Member 'International Workshop on Open Wearable Computers' (Part of UbiComp/ISWC)",
      "Since 03/2023: Program Committee Member 'International Retreat on Neuro-Information Systems' (NeuroIS)",
    ],
  },

  // Contact Section
  contact: {
    title: "Contact",
    office: {
      group: "KIT",
      institution: "Karlsruhe Institute of Technology (KIT)",
      faculty: "Fakultät für Wirtschaftswissenschaften",
      institute: "Institut für Wirtschaftsinformatik und Marketing",
      address: "Kaiserstraße 89, 76133 Karlsruhe",
      officeHours: "Nach Vereinbarung / by appointment",
      room: "5C-03.1",
      phone: "+49 (721) 608-48385",
      email: "michael.knierim@kit.edu",
    },
    social: [
      {
        name: "Mail",
        url: "mailto:michael.knierim@kit.edu",
        icon: "email",
      },
      {
        name: "Google Scholar",
        url: "https://scholar.google.de/citations?user=GZmvMCMAAAAJ&hl=de",
        icon: "scholar",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/dr-michael-knierim-13397881/",
        icon: "linkedin",
      },
      { name: "GitHub", url: "https://github.com/MKnierim", icon: "github" },
    ],
  },

  // Navigation
  navigation: [
    { href: "#work-focus", label: "Work Focus" },
    { href: "#recognitions", label: "Recognitions" },
    { href: "#featured-work", label: "Featured Work" },
    { href: "#publications", label: "Publications" },
    { href: "#beyond-research", label: "Beyond the Research" },
  ],
};
