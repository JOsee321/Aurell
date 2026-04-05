document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. DEKLARASI VARIABEL UTAMA ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('main-sidebar');
    const mainContent = document.querySelector('.main-content');
    const lightModeBtn = document.getElementById('light-mode-btn');
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const body = document.body;

    // --- 2. FUNGSI PERALIHAN TAB HALAMAN ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            
            // Panggil fungsi untuk mengganti halaman
            setActivePage(targetId);

            // Otomatis tutup sidebar di mobile saat link diklik
            if (window.innerWidth <= 1024) {
                closeMobileMenu();
            }
        });
    });

    function setActivePage(targetId) {
        if (!targetId) return;

        navLinks.forEach(nav => {
            if (nav.getAttribute('data-target') === targetId) {
                nav.classList.add('active');
            } else {
                nav.classList.remove('active');
            }
        });
        
        pages.forEach(page => {
            if (page.getAttribute('id') === targetId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        // Scroll konten utama ke atas saat ganti tab
        mainContent.scrollTo(0, 0);

        // Perbarui hash di URL
        window.location.hash = targetId;
    }

    // --- 3. FUNGSI TOGGLE LIGHT/DARK MODE ---
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            lightModeBtn.classList.add('active');
            darkModeBtn.classList.remove('active');
        } else {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            darkModeBtn.classList.add('active');
            lightModeBtn.classList.remove('active');
        }
    }

    lightModeBtn.addEventListener('click', () => {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    });

    darkModeBtn.addEventListener('click', () => {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    });

    // --- 4. FUNGSI TOGGLE SIDEBAR MOBILE ---
    function closeMobileMenu() {
        sidebar.classList.remove('active');
        mobileToggle.querySelector('i').classList.remove('fa-times');
        mobileToggle.querySelector('i').classList.add('fa-bars');
    }

    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        
        const icon = mobileToggle.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Tutup sidebar jika klik di luar area (di mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    // --- 5. FUNGSI PENERJEMAH BAHASA ---
    
    const languages = ['en', 'id', 'ja'];
    let currentLangIndex = 0; 

    // --- KAMUS TERJEMAHAN ---
    const translations = {
        'en': {
            'navHome': 'Home',
            'navAbout': 'About',
            'navAchievements': 'Achievements',
            'navProjects': 'Projects',
            'navContact': 'Contact',
            'navChatRoom': 'Chat Room',
            'footerText': 'Copyright &copy; 2025<br>Ichramsyah. All rights reserved.',
            'homeTitle': "Hello, I'm Ichramsyah Abdurrachman",
            'homeSubtitle': "from Jakarta, Indonesia 🇮🇩",
            'homeDescription': "A passionate Software Engineer focused on building high-performance, end-to-end software solutions. Experienced in transforming complex requirements into functional, scalable, and maintainable systems. Proficient in modern ecosystems such as React, Next.js, Node.js, TypeScript, and Laravel, with experience applying best practices in both Agile (Scrum) and Waterfall development environments. Focused on writing clean code, solid architecture, and effective team collaboration.",
            'homeSkillsTitle': '&lt;/> My Professional Skills',
            'homeSkillsSubtitle': 'My professional skills.',
            'homeGithubTitle': '<i class="fab fa-github"></i> GitHub Contributions',
            'homeGithubSubtitle': 'My GitHub activity over the past year.',
            'githubTotal': 'Total',
            'githubWeek': 'Week',
            'githubBest': 'Best',
            'githubAverage': 'Average',
            'githubLegendContributions': '918 contributions in the last year',
            'githubLegendLess': 'Less',
            'githubLegendMore': 'More',
            'aboutTitle': 'About Me',
            'aboutSubtitle': 'A brief introduction about myself.',
            'aboutDesc1': "I am a detail-oriented Software Engineer with over 5 years of experience. I am dedicated to solving complex problems and building efficient, impactful software solutions.",
            'aboutWhatIDo': "What I Do",
            'service1Title': 'Web Development',
            'service1Desc': 'Building robust and scalable web applications using modern tech stacks.',
            'service2Title': 'UI/UX Design',
            'service2Desc': 'Designing intuitive and user-centered interfaces for seamless digital experiences.',
            'service3Title': 'Mobile-first Design',
            'service3Desc': 'Ensuring seamless experiences across all devices, from desktop to mobile.',
            'service4Title': 'Performance Optimization',
            'service4Desc': 'Optimizing websites for speed and efficiency to enhance user satisfaction.',
            'achievementsTitle': 'Achievements',
            'achievementsSubtitle': 'Some of my accomplishments and certifications.',
            'resumeExperience': 'Experience',
            'exp1Title': 'Senior Software Engineer',
            'exp1Desc': 'Leading development of a new e-commerce platform, improving performance by 30%.',
            'exp2Title': 'Mid-level Developer',
            'exp2Desc': 'Developed and maintained various client websites using React and Laravel.',
            'resumeEducation': 'Education',
            'edu1Title': 'B.Sc. in Computer Science',
            'edu1Desc': 'Graduated with Cum Laude honors, focusing on Software Engineering and AI.',
            'resumeCerts': 'Certifications',
            'cert1Title': 'Certified ScrumMaster® (CSM)',
            'projectsTitle': 'Projects',
            'projectsSubtitle': 'A collection of my work.',
            'project1Title': 'E-commerce Platform',
            'project2Title': 'Mobile Banking App',
            'project3Title': 'Data Analytics Dashboard',
            'projectsView': 'View Project <i class="fas fa-arrow-right"></i>',
            'contactTitle': 'Contact',
            'contactSubtitle': "Let's connect and collaborate.",
            'contactEmailTitle': 'Email',
            'contactEmailDesc': 'Say hello at',
            'contactLinkedInTitle': 'LinkedIn',
            'contactLinkedInDesc': 'Connect professionally',
            'formNameLabel': 'Your Name',
            'formNamePlaceholder': 'Ichramsyah Abdurrachman',
            'formEmailLabel': 'Your Email',
            'formEmailPlaceholder': 'email@example.com',
            'formMessageLabel': 'Message',
            'formMessagePlaceholder': "Hello, I'm interested in...",
            'formButtonSend': 'Send Message',
'chatTitle': 'Chat Room',
'chatSubtitle': 'This is a local chat demo. Messages are stored in your browser.',
'chatInputPlaceholder': 'Type your message...',
'chatClear': 'Clear Chat',
'chatWelcome': 'Hello! This is a demo chat. Feel free to leave a message or ask a question.',
'chatClearConfirm': 'Are you sure you want to clear the entire chat history?',
        },
        'id': {
            'navHome': 'Beranda',
            'navAbout': 'Tentang',
            'navAchievements': 'Pencapaian',
            'navProjects': 'Proyek',
            'navContact': 'Kontak',
            'navChatRoom': 'Ruang Obrolan',
            'footerText': 'Hak Cipta &copy; 2025<br>Ichramsyah. Semua hak dilindungi.',
            'homeTitle': "Halo, saya Ichramsyah Abdurrachman",
            'homeSubtitle': "dari Jakarta, Indonesia 🇮🇩",
            'homeDescription': "Seorang Software Engineer yang bersemangat, berfokus pada pembangunan solusi perangkat lunak end-to-end berkinerja tinggi. Berpengalaman dalam mengubah persyaratan kompleks menjadi sistem yang fungsional, skalabel, dan dapat dipelihara. Mahir dalam ekosistem modern seperti React, Next.js, Node.js, TypeScript, dan Laravel, dengan pengalaman menerapkan praktik terbaik di lingkungan pengembangan Agile (Scrum) dan Waterfall. Fokus pada penulisan kode yang bersih, arsitektur yang solid, dan kolaborasi tim yang efektif.",
            'homeSkillsTitle': '&lt;/> Keahlian Profesional Saya',
            'homeSkillsSubtitle': 'Keahlian profesional saya.',
            'homeGithubTitle': '<i class="fab fa-github"></i> Kontribusi GitHub',
            'homeGithubSubtitle': 'Aktivitas GitHub saya selama setahun terakhir.',
            'githubTotal': 'Total',
            'githubWeek': 'Minggu',
            'githubBest': 'Terbaik',
            'githubAverage': 'Rata-rata',
            'githubLegendContributions': '918 kontribusi dalam setahun terakhir',
            'githubLegendLess': 'Sedikit',
            'githubLegendMore': 'Banyak',
            'aboutTitle': 'Tentang Saya',
            'aboutSubtitle': 'Perkenalan singkat tentang saya.',
            'aboutDesc1': "Saya seorang Software Engineer yang berfokus pada detail dengan pengalaman lebih dari 5 tahun. Saya berdedikasi untuk memecahkan masalah kompleks dan membangun solusi perangkat lunak yang efisien dan berdampak.",
            'aboutWhatIDo': 'Apa yang Saya Lakukan',
            'service1Title': 'Pengembangan Web',
            'service1Desc': 'Membangun aplikasi web yang kuat dan skalabel menggunakan tumpukan teknologi modern.',
            'service2Title': 'Desain UI/UX',
            'service2Desc': 'Merancang antarmuka yang intuitif dan berpusat pada pengguna untuk pengalaman digital yang mulus.',
            'service3Title': 'Desain Mobile-first',
            'service3Desc': 'Memastikan pengalaman yang mulus di semua perangkat, dari desktop ke seluler.',
            'service4Title': 'Optimasi Kinerja',
            'service4Desc': 'Mengoptimalkan situs web untuk kecepatan dan efisiensi guna meningkatkan kepuasan pengguna.',
            'achievementsTitle': 'Pencapaian',
            'achievementsSubtitle': 'Beberapa pencapaian dan sertifikasi saya.',
            'resumeExperience': 'Pengalaman',
            'exp1Title': 'Insinyur Perangkat Lunak Senior',
            'exp1Desc': 'Memimpin pengembangan platform e-commerce baru, meningkatkan performa sebesar 30%.',
            'exp2Title': 'Pengembang Tingkat Menengah',
            'exp2Desc': 'Mengembangkan dan memelihara berbagai situs web klien menggunakan React dan Laravel.',
            'resumeEducation': 'Pendidikan',
            'edu1Title': 'S1 Teknik Informatika',
            'edu1Desc': 'Lulus dengan predikat Cum Laude, fokus pada Rekayasa Perangkat Lunak dan AI.',
            'resumeCerts': 'Sertifikasi',
            'cert1Title': 'Certified ScrumMaster® (CSM)',
            'projectsTitle': 'Proyek',
            'projectsSubtitle': 'Kumpulan karya yang pernah saya buat.',
            'project1Title': 'Platform E-commerce',
            'project2Title': 'Aplikasi Mobile Banking',
            'project3Title': 'Dasbor Analitik Data',
            'projectsView': 'Lihat Proyek <i class="fas fa-arrow-right"></i>',
            'contactTitle': 'Kontak',
            'contactSubtitle': 'Mari terhubung dan berkolaborasi.',
            'contactEmailTitle': 'Email',
            'contactEmailDesc': 'Sapa saya di',
            'contactLinkedInTitle': 'LinkedIn',
            'contactLinkedInDesc': 'Terhubung secara profesional',
            'formNameLabel': 'Nama Anda',
            'formNamePlaceholder': 'Nama Anda',
            'formEmailLabel': 'Email Anda',
            'formEmailPlaceholder': 'email@contoh.com',
            'formMessageLabel': 'Pesan',
            'formMessagePlaceholder': 'Halo, saya tertarik pada...',
            'formButtonSend': 'Kirim Pesan',
'chatTitle': 'Ruang Obrolan',
'chatSubtitle': 'Ini adalah demo obrolan lokal. Pesan disimpan di peramban Anda.',
'chatInputPlaceholder': 'Ketik pesan Anda...',
'chatClear': 'Hapus Obrolan',
'chatWelcome': 'Halo! Ini adalah demo obrolan. Silakan tinggalkan pesan atau ajukan pertanyaan.',
'chatClearConfirm': 'Apakah Anda yakin ingin menghapus seluruh riwayat obrolan?',
        },
        'ja': {
            'navHome': 'ホーム',
            'navAbout': '概要',
            'navAchievements': '実績',
            'navProjects': 'プロジェクト',
            'navContact': '連絡先',
            'navChatRoom': 'チャットルーム',
            'footerText': '著作権 &copy; 2025<br>Ichramsyah. 全著作権所有。',
            'homeTitle': "こんにちは、イクラムシャです",
            'homeSubtitle': "インドネシア、ジャカルタから 🇮🇩",
            'homeDescription': "高性能なエンドツーエンドのソフトウェアソリューション構築に重点を置く、情熱的なソフトウェアエンジニアです。複雑な要件を機能的でスケーラブル、保守可能なシステムに変換する経験が豊富です。React、Next.js、Node.js、TypeScript、Laravelなどの最新エコシステムに精通しており、アジャイル（スクラム）とウォーターフォールの両開発環境でベストプラクティスを適用した経験があります。クリーンなコード、堅牢なアーキテクチャ、効果的なチームコラボレーションを重視しています。",
            'homeSkillsTitle': '&lt;/> 私の専門スキル',
            'homeSkillsSubtitle': '私の専門スキル。',
            'homeGithubTitle': '<i class="fab fa-github"></i> GitHubの貢献',
            'homeGithubSubtitle': '過去1年間の私のGitHubアクティビティ。',
            'githubTotal': '合計',
            'githubWeek': '週',
            'githubBest': 'ベスト',
            'githubAverage': '平均',
            'githubLegendContributions': '過去1年間の貢献918回',
            'githubLegendLess': '少ない',
            'githubLegendMore': '多い',
            'aboutTitle': '私について',
            'aboutSubtitle': '私についての簡単な紹介。',
            'aboutDesc1': "私は5年以上の経験を持つ、細部にこだわるソフトウェアエンジニアです。複雑な問題を解決し、効率的で影響力のあるソフトウェアソリューションを構築することに専念しています。",
            'aboutWhatIDo': '私の仕事',
            'service1Title': 'ウェブ開発',
            'service1Desc': '最新の技術スタックを使用して、堅牢でスケーラブルなWebアプリケーションを構築します。',
            'service2Title': 'UI/UXデザイン',
            'service2Desc': 'シームレスなデジタル体験のために、直感的でユーザー中心のインターフェースを設計します。',
            'service3Title': 'モバイルファーストデザイン',
            'service3Desc': 'デスクトップからモバイルまで、すべてのデバイスでシームレスな体験を保証します。',
            'service4Title': 'パフォーマンス最適化',
            'service4Desc': 'ユーザー満足度向上のため、ウェブサイトの速度と効率を最適化します。',
            'achievementsTitle': '実績',
            'achievementsSubtitle': '私の成果と認定資格の一部。',
            'resumeExperience': '職務経歴',
            'exp1Title': 'シニアソフトウェアエンジニア',
            'exp1Desc': '新しいEコマースプラットフォームの開発を主導し、パフォーマンスを30％向上させました。',
            'exp2Title': 'ミッドレベル開発者',
            'exp2Desc': 'ReactとLaravelを使用して、さまざまなお客様のウェブサイトを開発・保守しました。',
            'resumeEducation': '学歴',
            'edu1Title': 'コンピューターサイエンス学士',
            'edu1Desc': 'ソフトウェア工学とAIに焦点を当て、優等で卒業しました。',
            'resumeCerts': '認定資格',
            'cert1Title': '認定スクラムマスター® (CSM)',
            'projectsTitle': 'プロジェクト',
            'projectsSubtitle': '私の作品集。',
            'project1Title': 'Eコマースプラットフォーム',
            'project2Title': 'モバイルバンキングアプリ',
            'project3Title': 'データ分析ダッシュボード',
            'projectsView': 'プロジェクトを見る <i class="fas fa-arrow-right"></i>',
            'contactTitle': '連絡先',
            'contactSubtitle': 'つながり、協力しましょう。',
            'contactEmailTitle': 'Eメール',
            'contactEmailDesc': 'こんにちは',
            'contactLinkedInTitle': 'LinkedIn',
            'contactLinkedInDesc': '専門的につながる',
            'formNameLabel': 'お名前',
            'formNamePlaceholder': 'あなたのお名前',
            'formEmailLabel': 'Eメール',
            'formEmailPlaceholder': 'email@example.com',
            'formMessageLabel': 'メッセージ',
            'formMessagePlaceholder': 'こんにちは、私は...に興味があります',
            'formButtonSend': 'メッセージを送信',
'chatTitle': 'チャットルーム',
'chatSubtitle': 'これはローカルチャットのデモです。メッセージはブラウザに保存されます。',
'chatInputPlaceholder': 'メッセージを入力...',
'chatClear': 'チャットを消去',
'chatWelcome': 'こんにちは！これはチャットのデモです。お気軽にメッセージや質問を残してください。',
'chatClearConfirm': '本当にチャット履歴全体を消去しますか？',
        }
    };

    function setLanguage(lang) {
        const langData = translations[lang];
        if (!langData) return;

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            const translation = langData[key];
            
            if (translation !== undefined) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });
        
        langToggleBtn.textContent = lang.toUpperCase();
        localStorage.setItem('language', lang);
    }

    langToggleBtn.addEventListener('click', () => {
        currentLangIndex = (currentLangIndex + 1) % languages.length;
        const nextLang = languages[currentLangIndex];
        setLanguage(nextLang);
    });

    // --- 6. INISIALISASI SAAT HALAMAN DIMUAT ---
    
    // Inisialisasi Tema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('light'); // Default ke light mode
    }

    // Inisialisasi Bahasa
    const savedLang = localStorage.getItem('language') || 'en';
    currentLangIndex = languages.indexOf(savedLang);
    setLanguage(savedLang);

    // Inisialisasi Halaman (dari URL Hash)
    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        setActivePage(currentHash);
    } else {
        setActivePage('home'); // Default ke 'home'
    }

});
// --- 7. FUNGSI CHAT ROOM (BARU) ---

// Kunci untuk Local Storage
const CHAT_STORAGE_KEY = 'portfolioChatMessages';
let chatMessages = []; // Array untuk menyimpan pesan

// Ambil elemen DOM
const chatDisplay = document.getElementById('chat-display');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatClearBtn = document.getElementById('chat-clear-btn');

// Fungsi untuk membuat elemen pesan
function createMessageElement(message) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', message.sender);
    
    const text = document.createElement('span');
    text.textContent = message.text;
    bubble.appendChild(text);
    
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    // Format waktu
    timestamp.textContent = new Date(message.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    bubble.appendChild(timestamp);
    
    return bubble;
}

// Fungsi untuk merender semua pesan
function renderMessages() {
    if (!chatDisplay) return; // Keluar jika tidak di halaman chat
    
    chatDisplay.innerHTML = ''; // Kosongkan tampilan
    chatMessages.forEach(msg => {
        chatDisplay.appendChild(createMessageElement(msg));
    });
    
    // Otomatis scroll ke bawah
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Fungsi untuk menyimpan pesan ke Local Storage
function saveMessages() {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatMessages));
}

// Fungsi untuk memuat pesan dari Local Storage
function loadMessages() {
    const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    if (storedMessages) {
        chatMessages = JSON.parse(storedMessages);
    } else {
        // Jika tidak ada riwayat, tambahkan pesan sambutan
        chatMessages = [
            {
                sender: 'bot',
                text: 'Hello! This is a demo chat. Feel free to leave a message or ask a question.', // Teks default
                timestamp: new Date().toISOString()
            }
        ];
        // Coba terjemahkan pesan sambutan
        const currentLang = localStorage.getItem('language') || 'en';
        if (translations[currentLang] && translations[currentLang]['chatWelcome']) {
            chatMessages[0].text = translations[currentLang]['chatWelcome'];
        }
        saveMessages();
    }
    renderMessages();
}

// Fungsi untuk menambah pesan baru
function addMessage(text, sender) {
    const message = {
        sender: sender,
        text: text,
        timestamp: new Date().toISOString()
    };
    
    chatMessages.push(message);
    saveMessages();
    
    // Render hanya pesan baru untuk animasi
    chatDisplay.appendChild(createMessageElement(message));
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Inisialisasi Chat Room
function initChatRoom() {
    if (chatForm) {
        // Muat pesan saat halaman dibuka
        loadMessages();
        
        // Event listener untuk kirim pesan
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageText = chatInput.value.trim();
            
            if (messageText) {
                addMessage(messageText, 'user');
                chatInput.value = '';
                
                // (Opsional) Respon bot otomatis (placeholder)
                setTimeout(() => {
                    addMessage("Thanks for your message! This is a demo.", 'bot');
                }, 1000);
            }
        });

        // Event listener untuk hapus obrolan
        chatClearBtn.addEventListener('click', () => {
            // Dapatkan konfirmasi terjemahan
            const currentLang = localStorage.getItem('language') || 'en';
            const confirmText = translations[currentLang]['chatClearConfirm'] || 'Are you sure you want to clear the entire chat history?';

            if (confirm(confirmText)) {
                chatMessages = []; // Hapus array
                saveMessages(); // Simpan array kosong
                renderMessages(); // Render ulang (kosong)
                loadMessages(); // Muat ulang (akan memicu pesan sambutan)
            }
        });
    }
}

// Panggil inisialisasi chat
// Kita akan memanggil ini di dalam fungsi inisialisasi utama Anda
// di akhir file script.js

// --- MODIFIKASI FUNGSI INISIALISASI ---
// Cari fungsi `document.addEventListener('DOMContentLoaded', ...)`
// Di dalam fungsi tersebut, di bagian paling bawah (sebelum `});` penutup),
// tambahkan pemanggilan `initChatRoom();`

/* Di dalam 'DOMContentLoaded' event listener Anda, tambahkan ini di akhir:
*/

// --- 6. INISIALISASI SAAT HALAMAN DIMUAT ---
// ... (kode inisialisasi tema dan bahasa Anda) ...

// Panggil fungsi inisialisasi chat
initChatRoom();