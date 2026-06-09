-- ============================================================
-- Tools for Teaching - Seed Data
-- Run AFTER schema.sql and AFTER setup.php creates the admin user
-- All apps are assigned to author_id = 1 (first admin); reassign as needed
-- @license CC BY-NC-SA 4.0
-- ============================================================

USE tft_db;

SET FOREIGN_KEY_CHECKS = 0;

-- ── APPS ─────────────────────────────────────────────────────

INSERT INTO apps (app_key, title, description, image_path, image_alt, badge, badge_class, launch_url, github_url, more_info_title, more_info_body, sort_order, author_id) VALUES

('think2code', 'Think2Code',
'A visual IDE where learners build flowcharts that generate Python code. Includes 30 challenges with a Submit and Test feature to check answers.',
'images/think2code-screenshot.jpg', 'Think2Code interface', 'Python', 'python',
'https://think2code.toolsforteaching.co.uk/',
'https://github.com/southernadd-cmyk/think2code',
'Think2Code - More info',
'<h2>Think2Code - Visual Flowcharts That Generate Real Python</h2><p><strong>Think2Code</strong> is a browser-based learning tool where students build <strong>flowcharts</strong> that compile into <strong>real Python code</strong>. It helps learners understand programming logic before they get stuck on syntax.</p><hr /><h3>What It Does</h3><ul><li>Students drag and connect flowchart blocks to build an algorithm</li><li>The flowchart compiles into readable Python automatically</li><li>Students can run the program and view output in the browser</li><li>Flowcharts can be used to teach sequence, selection, iteration, and variables</li></ul><hr /><h3>Challenges + Submit and Test</h3><p>Think2Code includes built-in challenges that students can complete independently. Each challenge focuses on a specific programming skill (such as inputs, decisions, loops, or lists).</p><p>Challenges include a <strong>Submit and Test</strong> feature which automatically checks the student''s solution and marks it as <strong>correct</strong> or <strong>incorrect</strong>. This is ideal for self-paced learning and quick formative assessment.</p><hr /><h3>Teacher tips (quick)</h3><ul><li>Start with <strong>sequence</strong> challenges, then move to <strong>if</strong> and <strong>loops</strong></li><li>Ask students to predict output before pressing run</li><li>Use Submit and Test as an "exit ticket" task at the end of a lesson</li></ul>',
1, 1),

('cm-html', 'HTML/CSS/JS Editor',
'A multi-file browser-based code editor for writing and previewing real HTML, CSS, and JavaScript. Features live preview, a built-in reference drawer, and project save/load — no login or installation required.',
'images/cm-html.webp', 'cm-html editor interface showing code editor, file tree, and live preview',
'Web Dev', 'webdev',
'https://html.toolsforteaching.co.uk/',
'https://github.com/SimonRundell/cm-html',
'HTML/CSS/JS Editor - More info',
'<h2>cm-html — Browser-Based Web Development Editor</h2><p><strong>cm-html</strong> is a full-featured teaching editor that lets students write, preview, and save real web pages entirely inside their browser. Built on the same code editor engine as Visual Studio Code, it gives Level 2 and Level 3 students an authentic development experience without installing any software.</p><hr /><h3>Key Features</h3><ul><li><strong>Monaco Editor:</strong> The same engine as VS Code — syntax highlighting, autocomplete, and bracket matching</li><li><strong>Live Preview:</strong> A sandboxed iframe updates as students save their work</li><li><strong>Built-in Reference Drawer:</strong> Select any HTML tag, CSS property, or JavaScript method to see an instant explanation</li><li><strong>MDN Integration:</strong> The help drawer searches MDN Web Docs live</li><li><strong>Mobile Preview:</strong> Switch to a simulated mobile viewport to test responsive designs</li><li><strong>Project Management:</strong> Multiple named projects stored in the browser</li><li><strong>Zip Export/Import:</strong> Download a full project as a .zip file</li></ul>',
2, 1),

('kanban', 'Kanban Pizza Game',
'A real-time multiplayer game where teams run a pizza kitchen in timed rounds. Anyone can join a room using a shared room name.',
'images/kanbanpizza-screenshot.jpg', 'Kanban Pizza Game interface', 'Agile', 'agile',
'https://kanbanpizza2-j1lz.onrender.com/',
'https://github.com/southernadd-cmyk/kanbanpizza2',
'Kanban Pizza Game - More info',
'<h2>Kanban Pizza Game - Collaborative Agile Workflow Simulator</h2><p><strong>Kanban Pizza Game</strong> is a real-time multiplayer classroom game where learners work together to run a pizza kitchen. It teaches <strong>Agile workflow</strong>, <strong>WIP limits</strong>, <strong>bottlenecks</strong>, and <strong>continuous improvement</strong> through timed rounds.</p><hr /><h3>What Students Learn</h3><ul><li><strong>Kanban workflow</strong> (work moving through stages)</li><li><strong>WIP limits</strong> and why doing less at once can deliver more</li><li><strong>Team coordination</strong> under time pressure</li><li><strong>Bottleneck spotting</strong> (where work gets stuck)</li><li><strong>Improvement cycles</strong> (getting better each round)</li></ul><hr /><h3>Teacher tips (quick)</h3><ul><li>Run a short "chaos round" first, then introduce roles</li><li>Assign roles (prep / build / deliver) to reduce confusion</li><li>Pause after each round and ask: "Where did work pile up?"</li></ul>',
3, 1),

('bash', 'Bash Game',
'An interactive terminal adventure that teaches real bash commands through puzzles and exploration. Great for Linux basics and cybersecurity foundations.',
'images/bashgame-screenshot.jpg', 'Bash Game interface', 'Terminal', 'terminal',
'https://bashgame-no6k.onrender.com/',
'https://github.com/southernadd-cmyk/bashgame/',
'Bash Game - More info',
'<h2>Bash Game - Learn Linux Commands Through a Terminal Adventure</h2><p><strong>Bash Game</strong> is an interactive terminal-style text adventure. Students progress by typing <strong>real Linux commands</strong> correctly to explore, find clues, and solve puzzles.</p><hr /><h3>Commands Practised</h3><ul><li><code>pwd</code>, <code>ls</code>, <code>cd</code>, <code>cat</code>, <code>grep</code>, <code>mkdir</code>, <code>touch</code>, <code>mv</code>, <code>rm</code></li></ul><hr /><h3>Teacher tips (quick)</h3><ul><li>Give students a "command bank" on the board for the first 10 minutes</li><li>Ask students to explain what each command did in plain English</li><li>Use it as a warm-up before Git / servers / cybersecurity labs</li></ul>',
4, 1),

('routing', 'Network Routing Simulator',
'An interactive browser-based simulator for teaching RIP and OSPF routing protocols across a realistic LAN/WAN topology. Step through convergence, inspect routing tables live, and see why OSPF beats RIP on bandwidth-constrained links.',
'images/routing-screenshot.png', 'Network Routing Simulator interface showing animated packet flow across routers',
'Networking', 'networking',
'https://routing.toolsforteaching.co.uk/',
'https://github.com/SimonRundell/routing',
'Network Routing Simulator - More info',
'<h2>Network Routing Simulator — RIP &amp; OSPF Teaching Tool</h2><p>The <strong>Network Routing Simulator</strong> is an interactive, browser-based teaching tool that animates how <strong>RIP</strong> and <strong>OSPF</strong> route packets across a realistic multi-router LAN/WAN network.</p><hr /><h3>What Students Learn</h3><ul><li><strong>Distance Vector vs Link State</strong> — how each protocol type builds its view of the network</li><li><strong>Bellman-Ford algorithm</strong> (RIP) — distributed hop-count convergence</li><li><strong>Dijkstra''s SPF algorithm</strong> (OSPF) — shortest path calculation</li><li><strong>OSPF cost formula</strong> — Cost = 10⁸ ÷ Bandwidth</li><li><strong>Convergence phases</strong> — Hello, DBD, LSR/LSU/LSAck, LSA flooding, SPF calculation</li></ul>',
5, 1),

('paint-key-exchange', 'Paint Key Exchange',
'A visual, browser-based teaching tool that explains Diffie-Hellman key exchange using a paint-mixing metaphor. Watch Alice and Bob agree on a shared secret colour without ever sending it across the network.',
'images/paint-key-screenshot.png', 'Paint Key Exchange interface showing Alice and Bob mixing paint colours',
'Cryptography', 'cryptography',
'https://paint-key-exchange.toolsforteaching.co.uk/',
'https://github.com/SimonRundell/paint-key-exchange/tree/main/paint-key-exchange',
'Paint Key Exchange - More info',
'<h2>Paint Key Exchange — Diffie-Hellman Teaching Tool</h2><p>The <strong>Paint Key Exchange</strong> app uses a <strong>paint-mixing metaphor</strong> to make the abstract mathematics of <strong>Diffie-Hellman (DH) key exchange</strong> concrete and memorable for students aged 16–19.</p><hr /><h3>App Modes</h3><ul><li><strong>Teaching Mode</strong> — a guided 7-step walkthrough revealing the protocol one phase at a time</li><li><strong>Simulation Mode</strong> — students choose any private colours and watch the mixing happen live</li></ul><hr /><h3>What Students Learn</h3><ul><li><strong>Key exchange without prior shared secrets</strong></li><li><strong>One-way functions</strong> — why easy-to-compute operations can be hard to reverse</li><li><strong>The Discrete Logarithm Problem</strong></li><li><strong>Public vs private information</strong></li><li><strong>Real-world context</strong> — DH is used in TLS (HTTPS), SSH, and Signal</li></ul>',
6, 1),

('kanban-sim', 'Kanban Simulation',
'An interactive Kanban board simulation demonstrating agile project management. Watch virtual developers move feature cards through a workflow with real-time updates.',
'images/kanban-screenshot.png', 'Kanban Simulation board interface', 'Agile', 'agile',
'https://kanban.toolsforteaching.co.uk/',
'https://github.com/SimonRundell/kanban/',
'Kanban Simulation - More info',
'<h2>Kanban Simulation - Interactive Workflow Demonstration</h2><p><strong>Kanban Simulation</strong> brings the Kanban methodology to life through an automated, visual demonstration. Students watch as a virtual development team works on building a takeaway ordering app, moving feature cards through the workflow in real-time.</p><hr /><h3>What Students Learn</h3><ul><li><strong>Visual Management:</strong> See the entire project status at a glance</li><li><strong>Flow &amp; Bottlenecks:</strong> Watch how work moves (or gets stuck)</li><li><strong>Team Collaboration:</strong> Multiple developers working on different features</li></ul>',
7, 1),

('sqldetective', 'SQL Detective',
'An interactive browser-based SQL learning game where students solve a detective mystery by writing SQL queries. Features a visual query builder and stylized result viewer.',
'images/sql-detective-screenshot.jpg', 'SQL Detective Game interface', 'SQL', 'sql',
'https://conansql.toolsforteaching.co.uk/',
'https://github.com/southernadd-cmyk/sql_detective_game',
'SQL Detective Game - More info',
'<h2>SQL Detective Game - Learn SQL by Solving a Mystery</h2><p><strong>SQL Detective Game</strong> is an interactive browser-based learning tool where students solve a detective mystery by writing <strong>SQL queries</strong>. Graffiti has appeared on a wall in Exeter city center with the message "SQL is Rubbish". Students must investigate this crime by querying a SQLite database.</p><hr /><h3>Skills Practised</h3><ul><li><code>SELECT</code> statements and filtering with <code>WHERE</code></li><li>Sorting with <code>ORDER BY</code></li><li>Joining multiple tables with <code>JOIN</code></li><li>Aggregating data with <code>GROUP BY</code></li></ul>',
8, 1),

('unittest', 'Unit Testing Practice',
'A React Login-Screen system that students can perform unit tests upon.',
'images/unittest.png', 'Test the Login unit', 'Testing', 'testing',
'https://unittest.toolsforteaching.co.uk/',
'',
'Unit Testing Practice - More info',
'<h2>Unit Practice</h2><p><strong>Test documentation at <a href="https://unittest.toolsforteaching.co.uk/Testing%20Grid.docx">https://unittest.toolsforteaching.co.uk/Testing%20Grid.docx</a></strong></p><hr /><p>Use the supplied testing grid to perform these unit tests.</p><hr /><h3>Skills Practised</h3><ul><li>Following a test script</li><li>Seeing the importance of unit testing</li><li>Imagining new tests</li></ul><hr /><h3>Teacher tips (quick)</h3><ul><li>Ask students to complete unit tests and report findings</li><li>There are some tests that will fail: which are they and how critical are they?</li><li>Identify UX/UI issues as well as functional failures</li></ul>',
9, 1),

('hardware-labeller', 'Hardware Labeller',
'A browser-based drag-and-drop labelling activity covering computer hardware components and their features. Students work through a twelve-slide teaching carousel before labelling three interactive schematic diagrams.',
'images/motherboard-screenshot.png', 'Hardware Labeller interface showing a schematic ATX motherboard diagram',
'Hardware', 'hardware',
'https://label.toolsforteaching.co.uk/',
'https://github.com/SimonRundell/motherboard',
'Hardware Labeller - More info',
'<h2>Hardware Labeller — Hardware Components Teaching Tool</h2><p>The <strong>Hardware Labeller</strong> app is a fully browser-based, interactive teaching and self-study activity designed for students aged 16–19 studying <strong>T-Level Digital (Software Development)</strong>. It covers every component and device specified in <strong>Learning Outcome 7.1.2</strong> of the T-Level Digital curriculum.</p><hr /><h3>The Three Phases</h3><ul><li><strong>Learn Phase</strong> — a twelve-slide carousel covering all LO 7.1.2 hardware topics</li><li><strong>Label Phase</strong> — three drag-and-drop SVG schematic diagrams</li><li><strong>Results Phase</strong> — instant scored summary with per-scene breakdown</li></ul>',
10, 1),

('network', 'OSI and TCP/IP Network Models',
'Learn the order and structure of both the OSI and TCP/IP Network Models.',
'images/network.gif', 'OSI and TCP/IP Network Models interface', 'Networks', 'networks',
'https://network.toolsforteaching.co.uk/',
'https://github.com/SimonRundell/networkmodels',
'OSI and TCP/IP Network Models - More info',
'<h2>A fun way to learn the order</h2><p>Remember that <strong>All People Seem To Need Data Processing</strong> but the OSI model is <strong>NITA</strong></p><hr /><h3>Skills Practised</h3><ul><li>Learning the models through a little bit of play</li></ul><hr /><h3>Teacher tips (quick)</h3><ul><li>Teach, then use this to embed</li><li>Follow up with Check For Understanding</li></ul>',
11, 1),

('network-topologies', 'Network Topologies',
'An interactive browser-based teaching tool covering the key network topologies for T-Level Digital Software Solutions (LO 7.3.4). Six guided teaching slides with animated SVG diagrams and a two-part assessment.',
'images/topology-screenshot.png', 'Network Topologies app showing an animated star topology diagram',
'Networking', 'networking',
'https://topology.toolsforteaching.co.uk/',
'https://github.com/SimonRundell/topology',
'Network Topologies - More info',
'<h2>Network Topologies — Interactive Teaching &amp; Assessment Tool</h2><p>The <strong>Network Topologies</strong> app covers star, full mesh, partial mesh, tree, bus, and logical vs physical topologies through animated diagrams, structured teaching slides, and a self-marking two-part assessment.</p><hr /><h3>Topologies Covered</h3><ul><li><strong>Star</strong> — the dominant modern LAN topology</li><li><strong>Full Mesh</strong> — maximum redundancy, high cost</li><li><strong>Partial Mesh</strong> — selective redundancy for real-world WANs</li><li><strong>Tree (Hierarchical)</strong> — tiered star structure</li><li><strong>Bus</strong> — historical shared-backbone topology</li><li><strong>Logical vs Physical</strong> — a conceptual explainer</li></ul>',
12, 1),

('sqlsimulation', 'SQLSimulation',
'An in-browser SQL sandbox where learners can write and run queries safely. Includes a built-in editor, sample tables/data, and instant results for practising SELECT, JOINs, filtering, and aggregation.',
'images/sql.png', 'SQLSimulation icon', 'SQL', 'sql',
'https://sqlsim.toolsforteaching.co.uk/',
'https://github.com/SimonRundell/SQLSim',
'SQLSimulation - More info',
'<h2>SQLSimulation - A Safe SQL Sandbox for Practice</h2><p><strong>SQLSimulation</strong> is a browser-based <strong>SQL sandbox</strong> that lets students write and run queries without needing a database server, accounts, or installs. It is designed for quick classroom practice and self-paced revision.</p><hr /><h3>Teacher tips (quick)</h3><ul><li>Give students 3–5 target queries to complete as an in-class drill</li><li>Ask students to predict the output before running the query</li><li>Use it as a low-friction warm-up before assessed SQL work</li></ul>',
13, 1),

('aaq', 'AAQ Unit 1 Exam Question Practice',
'Exam question practice for BTEC IT Unit 1 (AAQ spec). Includes spaced repetition grading (Again/Hard/Good/Easy), focus modes, and optional AI-powered "improve my answer" support.',
'images/aaq.png', 'AAQ Unit 1 Exam Question Practice app icon', 'Revision', 'revision',
'https://toolsforteaching.co.uk/aaq/',
'',
'AAQ Unit 1 Exam Question Practice - More info',
'<h2>AAQ Unit 1 Exam Question Practice (BTEC IT AAQ)</h2><p><strong>AAQ Unit 1 Exam Question Practice</strong> is a browser-based revision tool designed for short, high-impact practice sessions. Students answer exam-style prompts, then grade their confidence using <strong>Again / Hard / Good / Easy</strong> to drive <strong>spaced repetition</strong> scheduling.</p><hr /><h3>Key features</h3><ul><li><strong>Exam-style question practice</strong> aligned to Unit 1 topics</li><li><strong>Spaced repetition grading</strong> via Again / Hard / Good / Easy</li><li><strong>Focus modes</strong> that change question selection</li><li><strong>AI rewrite</strong> (limited daily uses) to improve a student''s own answer</li></ul>',
14, 1),

('cyberdefence', 'Cyber Defence TD',
'A tower-defence style cybersecurity game for BTEC IT Unit 1 Learning Aim D. Students defend network assets, answer knowledge checks, and apply layered security controls against realistic threats.',
'images/cyberdef.png', 'Cyber Defence Simulator gameplay screen', 'Cybersecurity', 'cyber',
'https://cyberdefence.toolsforteaching.co.uk',
'https://github.com/southernadd-cmyk/cyberdefense/',
'Cyber Defence TD - More info',
'<h2>Cyber Defence TD - Gamified Cybersecurity for BTEC Unit 1</h2><p><strong>Cyber Defence Simulator</strong> is a browser-based learning game where students protect digital assets from cyber threats using realistic security controls. It is designed to support <strong>BTEC IT Unit 1 - Learning Aim D</strong> through practical decision-making, strategy, and retrieval practice.</p><hr /><h3>What It Does</h3><ul><li>Students place and upgrade cyber defences on a live attack map</li><li>Threat waves include phishing, malware, ransomware, DDoS, SQL injection, and more</li><li>Players manage a budget and build <strong>defence in depth</strong></li><li>Each mission increases in complexity</li></ul>',
15, 1),

('averysinbox', 'Avery''s Inbox',
'A narrative, choice-driven cyber law + ethics scenario set presented inside an Outlook-style parody client (exeLook). Learners handle twenty emails and decide whether to report, leak/bypass, or stay silent.',
'images/averysinbox.png', 'Avery''s Inbox (exeLook) inbox interface', 'Cybersecurity', 'cyber',
'http://averysinbox.toolsforteaching.co.uk/',
'https://github.com/mradamclement-a11y/averysinbox',
'Avery''s Inbox - More info',
'<h2>Avery''s Inbox - Cyber law + ethics through an email client</h2><p><strong>Avery''s Inbox</strong> is a browser-based scenario set framed as an email inbox. Learners play an IT role receiving messages from colleagues, automated systems, regulators, and journalists, then choose what to do next.</p><hr /><h3>Legislation covered (core)</h3><p>DPA 2018 / UK GDPR, Computer Misuse Act 1990, RIPA 2000, FOI Act 2000, CDPA 1988, Health &amp; Safety at Work Act 1974, and PIDA 1998.</p><hr /><h3>Teacher tips (quick)</h3><ul><li>Run 1–2 emails as a whole-class starter, then compare decisions and justifications</li><li>Pause on the legislation panel to practise extracting key duties/thresholds</li><li>Use the end profile as a reflective discussion: process vs outcomes vs harm</li></ul>',
16, 1),

('regex-golf', 'RegEx Golf',
'A browser-based regex mini-game for KS4: write the shortest regular expression that matches the green list and avoids the red list. Includes 10 escalating holes, live match highlighting, a built-in cheat sheet, and a server-backed high score table.',
'images/regex-golf-screenshot.jpg', 'RegEx Golf interface showing match/avoid word lists, live highlighting, and leaderboard',
'Regex', 'python',
'https://golf.toolsforteaching.co.uk/',
'',
'RegEx Golf - More info',
'<h2>RegEx Golf - Regex Practice as a Game</h2><p><strong>RegEx Golf</strong> is a classroom-friendly mini game where students try to write the <strong>shortest</strong> regular expression that matches all the <strong>green</strong> words while avoiding all the <strong>red</strong> words.</p><hr /><h3>Teacher tips (quick)</h3><ul><li>Start with Hole 1 as a warm-up (characters, digits, hyphens), then move to anchors and classes</li><li>Ask students to explain <em>why</em> their regex works before they optimise it</li><li>Use Par as a simple differentiation tool</li></ul>',
17, 1),

('macbeth-regex-explorer', 'Macbeth Regex Explorer',
'A browser-based regex exploration tool built around Shakespeare\'s Macbeth. Students test regular expressions against the full play, see live match highlighting, and work through escalating challenge prompts.',
'images/macbeth-regex-explorer-screenshot.jpg', 'Macbeth Regex Explorer interface showing the play text, regex input, challenge panel, and highlighted matches',
'Regex', 'python',
'https://macbeth.toolsforteaching.co.uk/',
'https://github.com/mradamclement-a11y/macbeth',
'Macbeth Regex Explorer - More info',
'<h2>Macbeth Regex Explorer - Regex Practice Through Literature</h2><p><strong>Macbeth Regex Explorer</strong> is a classroom-friendly browser app that helps students learn regular expressions by testing patterns against the full text of <em>Macbeth</em>.</p><hr /><h3>Teacher tips (quick)</h3><ul><li>Use early challenges to introduce literals, alternation, anchors, and character classes</li><li>Ask students to explain why their regex succeeds or fails before changing it</li><li>Use the highlighted text and match results as a basis for discussion and peer review</li></ul>',
18, 1),

('cpu', 'CPU Fetch-Decode-Execute Simulator',
'An interactive browser-based visualisation of the CPU\'s Fetch–Decode–Execute cycle. Step through every micro-operation, watch data travel across colour-coded buses, then test understanding with a scored quiz mode.',
'images/cpu-screenshot.png', 'CPU Fetch-Decode-Execute Simulator showing animated signal travelling across buses',
'Hardware', 'hardware',
'https://cpu.toolsforteaching.co.uk/',
'https://github.com/SimonRundell/cpu',
'CPU FDE Simulator - More info',
'<h2>CPU Fetch–Decode–Execute Simulator</h2><p>The <strong>CPU FDE Simulator</strong> is an interactive, browser-based teaching tool that visualises every micro-operation inside the CPU\'s <strong>Fetch–Decode–Execute cycle</strong>. Students watch a glowing spark travel between registers and memory along colour-coded buses.</p><hr /><h3>What Students Learn</h3><ul><li><strong>The FDE cycle</strong> — Fetch, Decode, Execute as three distinct phases</li><li><strong>Register roles</strong> — PC, MAR, MDR, CIR, CU, ALU, ACC</li><li><strong>Why buses exist</strong> — Address, Data, and Control buses</li><li><strong>Common misconceptions corrected</strong></li></ul>',
19, 1),

('scrum-mastery', 'Scrum Mastery',
'A simulation of the Scrum Methodology where you act as the Scrum Manager for a mobile food-ordering app. Plan sprints, manage capacity, handle blockers, and review progress across multiple iterations.',
'images/scrummastery-screenshot.png', 'Front Page of the Scrum Mastery simulation', 'Project Management', 'agile',
'https://scrummastery.toolsforteaching.co.uk/',
'https://github.com/SimonRundell/scrummastery',
'Scrum Mastery - More info',
'<h2>Scrum Mastery - Run a Full Scrum Cycle in 3 Sprints</h2><p><strong>Scrum Mastery</strong> is a classroom-friendly simulation that lets students act as the Scrum Manager for a mobile food-ordering app. They plan, run, and review sprints while tracking capacity, blockers, and velocity.</p><hr /><h3>Teacher tips (quick)</h3><ul><li>Have students justify their backlog order before planning</li><li>Compare velocities across runs to discuss estimation and scope control</li><li>Use retrospectives to connect process changes to outcomes</li></ul>',
20, 1);

-- ── ARTICLES ─────────────────────────────────────────────────

INSERT INTO articles (medium_url, title, author_name, description, thumbnail_url, sort_order, author_id) VALUES

('https://medium.com/@southernadd/what-making-pizzas-taught-me-about-agile-986c5a9285bb',
'What Making Pizzas Taught Me About Agile',
'Adam Clement',
'A classroom analogy that makes Agile principles stick — using pizza kitchens to explain WIP limits, bottlenecks, and continuous improvement.',
'', 1, 1),

('https://medium.com/@tools4teachingemailbot/why-detective-stories-make-sql-click-c2982fe730f3',
'Why Detective Stories Make SQL Click',
'Tools for Teaching',
'How framing SQL as a detective investigation transforms a dry syntax lesson into an engaging problem-solving session.',
'', 2, 1),

('https://medium.com/@southernadd/why-tower-defence-games-are-perfect-for-teaching-cybersecurity-dfeadc6d6cac',
'Why Tower Defence Games Are Perfect for Teaching Cybersecurity',
'Adam Clement',
'Tower defence mechanics map surprisingly well onto layered security controls — here''s how to exploit that in the classroom.',
'', 3, 1),

('https://medium.com/@southernadd/before-the-code-theres-the-thinking-3de1a0122837',
'Before the Code, There''s the Thinking',
'Adam Clement',
'Why visual flowchart tools like Think2Code help students develop algorithmic thinking before they get tangled in syntax.',
'', 4, 1),

('https://medium.com/@tools4teachingemailbot/wubba-lubba-dub-dub-how-a-rick-and-morty-text-adventure-teaches-real-linux-skills-18a61bbe30c5',
'Wubba Lubba Dub Dub: How a Rick and Morty Text Adventure Teaches Real Linux Skills',
'Tools for Teaching',
'A Rick and Morty themed terminal game that secretly drills students in real bash commands while they''re too entertained to notice.',
'', 5, 1),

('https://medium.com/@mr.adam.clement/averys-inbox-the-case-for-simulated-ethical-decision-making-in-the-law-and-technology-classroom-d1a969ff00fc',
'Avery''s Inbox: The Case for Simulated Ethical Decision-Making',
'Adam Clement',
'How a simulated email inbox can teach cyber law, ethics, and the grey areas between compliance and whistleblowing.',
'', 6, 1);

SET FOREIGN_KEY_CHECKS = 1;
