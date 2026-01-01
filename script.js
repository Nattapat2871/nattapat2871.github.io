/// Dictionary for translations
const translations = {
    th: {
        header_title: 'NATTAPAT2871<br><span class="text-accent">PAGES</span>',
        about_title: 'ABOUT THIS PAGE',
        about_desc: 'หน้าเว็บนี้ ถูกสร้างขึ้นเพื่อใช้เป็น "สารบัญ" (Directory) สำหรับรวมลิงก์ไปยังโปรเจกต์ เกม บอท และผลงานโค้ดต่างๆ ของผมไว้ในที่เดียวเพื่อให้ง่ายต่อการเข้าถึง',
        links_title: 'LINKS',
        status_active: 'Active Developing',
        
        // --- สถานะระบบ ---
        system_normal: 'ระบบทำงานปกติ',
        system_warning: 'มีบริการบางอย่างออฟไลน์',
        system_critical: 'ไม่สามารถเชื่อมต่อระบบได้',
        system_loading: 'กำลังโหลดสถานะ...',
        view_details: 'ดูสถานะบริการแบบละเอียดได้ที่นี่',

        // Categories
        cat_bot: 'Discord Bot',
        cat_web: 'Web Development',
        cat_backend: 'Backend Service',
        cat_profile: 'Profile Website',
        cat_monitor: 'System Monitor',
        cat_source: 'Source Code',
        
        cat_focalor: 'Auto daily login HoYoVerse Bot',
        cat_slimejuke: 'Discord Music Bot',
        cat_mc: 'Minecraft Server',
        cat_self_fortnite: 'Self Game service', 
        'cat_self-fortnite': 'Self Game service', 

        // Descriptions
        desc_donate: 'เว็บไซต์สำหรับการสนับสนุนและโดเนทเพื่อเป็นกำลังใจในการพัฒนา',
        desc_port: 'หน้าเว็บแนะนำตัว ประวัติผลงาน และข้อมูลการติดต่ออย่างเป็นทางการ',
        desc_status: 'หน้าเว็บสำหรับตรวจสอบสถานะการทำงาน (Uptime) ของบอทและเว็บไซต์',
        desc_github: 'คลังเก็บโค้ด Open Source และโปรเจกต์ต่างๆ ที่เผยแพร่สาธารณะ',
        
        desc_focalor: 'บอท Discord สำหรับล็อคอินประจำวันของเกมในค่าย HoYoVerse และรองรับแลกโค้ดอัตโนมัติ (อยู่ในระหว่างการพัฒนา...)',
        desc_api: 'ระบบ API สำหรับดึงข้อมูลโปรไฟล์ผูใช้ใน Discord เพียงแค่ใช้ User ID',
        desc_ame: 'บอท Discord ที่มีฟังชั่นการใช้งานหลากหลาย ประจำวัน และแชทบอท AI',
        desc_slimejuke: 'บอทเพลง Discord ที่ให้บริการ โดยใช้ Lavalink เป็นตัวจัดการ (อยู่ในระหว่างการพัฒนา...)',
        desc_mc: 'เซิร์ฟเวอร์ Minecraft ที่ผมเปิดให้บริการ พร้อมระบบ Custom Plugin',
        'desc_self-fortnite': 'ส่งสถานะกิจกรรมที่ Discord และส่งไปที่กิจกรรมในเกม Fortnite โดยเชื่อมต่อ XMPP',

        // Button Text
        btn_toggle: 'View this page in English'
    },
    en: {
        header_title: 'NATTAPAT2871<br><span class="text-accent">PAGES</span>',
        about_title: 'ABOUT THIS PAGE',
        about_desc: 'This webpage is created as a "Directory" to collect links to my projects, games, bots, and various coding works in one place for easy access.',
        links_title: 'LINKS',
        status_active: 'Active Development',

        // --- System Status ---
        system_normal: 'All Systems Operational',
        system_warning: 'Some Services Offline',
        system_critical: 'System Unreachable',
        system_loading: 'Loading Status...',
        view_details: 'View detailed service status here',

        // Categories
        cat_bot: 'Discord Bot',
        cat_web: 'Web Development',
        cat_backend: 'Backend Service',
        cat_profile: 'Profile Website',
        cat_monitor: 'System Monitor',
        cat_source: 'Source Code',

        cat_focalor: 'Auto daily login HoYoVerse Bot',
        cat_slimejuke: 'Discord Music Bot',
        cat_mc: 'Minecraft Server',
        'cat_self-fortnite': 'Self Game service',

        // Descriptions
        desc_donate: 'A website for supporting and donating to encourage my development.',
        desc_port: 'Official portfolio website featuring my profile, works, and contact info.',
        desc_status: 'A status page for monitoring the uptime of my bots and websites.',
        desc_github: 'A repository of Open Source code and public projects.',

        desc_focalor: 'A Discord bot for daily login to HoYoVerse games and automatic code redemption (Currently in development...).',
        desc_api: 'API system for retrieving Discord user profile data using only User ID.',
        desc_ame: 'A multi-functional Discord bot featuring daily utilities and AI chatbot.',
        desc_slimejuke: 'A Discord music bot powered by Lavalink (Currently in development...).',
        desc_mc: 'My Minecraft server service with custom plugins and configurations.',
        'desc_self-fortnite': 'Syncs Discord activity status to Fortnite game presence via XMPP connection.',

        // Button Text
        btn_toggle: 'กดที่นี่เพื่อดูเว็บภาษาไทย'
    }
};

let currentLang = 'th'; // Default language
let currentStatusKey = 'system_loading'; 

function toggleLanguage() {
    // Switch language
    currentLang = currentLang === 'th' ? 'en' : 'th';
    updateTranslations();
}

function updateTranslations() {
    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        
        if (key === 'system_online') {
            el.innerHTML = translations[currentLang][currentStatusKey] || translations[currentLang]['system_normal'];
        } 
        else if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    // Update button text
    const btn = document.getElementById('lang-toggle');
    if (btn) {
        btn.innerText = translations[currentLang].btn_toggle;
    }
}


const STATUS_PAGE_URL = 'https://status.nattapat2871.me';

async function fetchSystemStatus() {
    const dotElement = document.querySelector('.status-indicator .dot');
    const API_URL = `${STATUS_PAGE_URL}/api/summary`; 

    try {
        const response = await fetch(API_URL);
    
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        dotElement.classList.remove('normal', 'warning', 'critical');

        if (data.status === 'normal') {
            // เขียว: ทุกอย่างปกติ
            currentStatusKey = 'system_normal';
            dotElement.classList.add('normal');
        } else {
            // เหลือง: มีบางอย่าง Offline (Backend ส่ง warning มา)
            currentStatusKey = 'system_warning';
            dotElement.classList.add('warning');
        }

    } catch (error) {
        console.error('Error fetching status:', error);
        
        // แดง: เชื่อมต่อ API ไม่ได้เลย (เว็บล่มหรือเน็ตหลุด)
        currentStatusKey = 'system_critical'; 
        dotElement.classList.remove('normal', 'warning');
        dotElement.classList.add('critical');
    }

    // อัปเดตข้อความบนหน้าจอทันที
    updateTranslations();
}


// ... (ส่วน Dictionary Translations เหมือนเดิม) ...

// ==========================================
// Stats System (View + Like) - Optimized
// ==========================================

const CURRENT_DOMAIN = window.location.hostname;
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE = isLocal ? 'http://localhost:8800' : 'https://api.ame.nattapat2871.me';

// URL APIs
// [ใหม่] API รวมยอด (เรียกทีเดียวได้ครบ)
const PAGE_STATS_API_URL = `${API_BASE}/api/page-stats?site=${CURRENT_DOMAIN}`;
// API สำหรับการกระทำ (Update)
const VIEW_UPDATE_API_URL = `${API_BASE}/api/view?site=${CURRENT_DOMAIN}`;
const LIKE_UPDATE_API_URL = `${API_BASE}/api/like?site=${CURRENT_DOMAIN}`;

// Helper Cookie Functions
function setCookie(name, value, hours) {
    const date = new Date();
    const timeToAdd = hours ? (hours * 60 * 60 * 1000) : (10 * 365 * 24 * 60 * 60 * 1000); 
    date.setTime(date.getTime() + timeToAdd);
    document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

// --- Main Function: Load Everything Together ---
async function initStatsSystem() {
    const viewCounterElement = document.getElementById('view-counter');
    const likeCounterElement = document.getElementById('like-count');
    const likeBtn = document.getElementById('like-btn');

    if (!viewCounterElement || !likeCounterElement) return;

    // 1. ตรวจสอบสถานะปุ่ม Like (จาก Cookie) เพื่อแสดงสีแดงทันที (ไม่ต้องรอ API)
    const likeCookieName = `liked_${CURRENT_DOMAIN}`;
    let isLiked = getCookie(likeCookieName) === 'true';
    if (isLiked) {
        likeBtn.classList.add('active');
    }

    // 2. เรียก API เดียว เพื่อดึงทั้ง View และ Like พร้อมกัน (เร็ว!)
    try {
        const response = await fetch(PAGE_STATS_API_URL);
        if (!response.ok) throw new Error('Stats API Error');
        const data = await response.json();

        // แสดงผลทันที
        viewCounterElement.innerText = data.view_count.toLocaleString();
        likeCounterElement.innerText = data.like_count.toLocaleString();

        // 3. (เบื้องหลัง) เช็คว่าต้องนับ View เพิ่มไหม
        checkAndIncrementView(data.view_count);

    } catch (error) {
        console.error('Error loading stats:', error);
        viewCounterElement.innerText = '-';
        likeCounterElement.innerText = '-';
    }

    // 4. ตั้งค่าปุ่มกด Like
    setupLikeButton(likeBtn, likeCounterElement, likeCookieName, isLiked);
}

// ฟังก์ชันนับ View เพิ่ม (ทำงานเงียบๆ เบื้องหลัง)
async function checkAndIncrementView(currentCount) {
    const viewCookieName = `viewed_${CURRENT_DOMAIN}`;
    
    // ถ้าไม่มี Cookie แปลว่าเป็นคนใหม่ -> สั่งบวกยอด
    if (!getCookie(viewCookieName)) {
        setCookie(viewCookieName, 'true', 12); // เก็บประวัติ 12 ชม.
        
        try {
            const res = await fetch(VIEW_UPDATE_API_URL, { method: 'POST' });
            const data = await res.json();
            // อัปเดตตัวเลขหน้าเว็บอีกครั้งให้เป็นยอดล่าสุด
            document.getElementById('view-counter').innerText = data.count.toLocaleString();
        } catch (e) { console.error('View increment error:', e); }
    }
}

// ฟังก์ชันจัดการปุ่ม Like
function setupLikeButton(btn, counterElement, cookieName, initialState) {
    let isLiked = initialState;

    btn.addEventListener('click', async () => {
        // Toggle สถานะ
        isLiked = !isLiked;
        
        // อัปเดต UI ทันที (Optimistic UI) - ไม่ต้องรอ Server ตอบกลับ
        let currentNum = parseInt(counterElement.innerText.replace(/,/g, '')) || 0;
        
        if (isLiked) {
            // กด Like
            btn.classList.add('active');
            counterElement.innerText = (currentNum + 1).toLocaleString();
            setCookie(cookieName, 'true'); 
            fetch(`${LIKE_UPDATE_API_URL}&action=like`, { method: 'POST' }); // ส่งข้อมูลไปบอก Server
        } else {
            // เอา Like ออก
            btn.classList.remove('active');
            counterElement.innerText = Math.max(0, currentNum - 1).toLocaleString();
            deleteCookie(cookieName);
            fetch(`${LIKE_UPDATE_API_URL}&action=unlike`, { method: 'POST' }); // ส่งข้อมูลไปบอก Server
        }
    });
}

// เรียกใช้งาน
document.addEventListener('DOMContentLoaded', () => {
    // ... (ส่วนอื่นๆ ของเดิม) ...
    const statusLink = document.getElementById('status-link');
    if (statusLink) statusLink.href = STATUS_PAGE_URL;
    fetchSystemStatus();
    setInterval(fetchSystemStatus, 60000);
    
    // เรียกใช้ระบบ Stats แบบใหม่
    initStatsSystem();
});