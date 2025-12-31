
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

        // Categories (อัปเดตตาม HTML ใหม่)
        cat_bot: 'Discord Bot',
        cat_web: 'Web Development',
        cat_backend: 'Backend Service',
        cat_profile: 'Profile Website',
        cat_monitor: 'System Monitor',
        cat_source: 'Source Code',
        
        cat_focalor: 'Auto daily login HoYoVerse Bot',
        cat_slimejuke: 'Discord Music Bot',
        cat_mc: 'Minecraft Server',
        cat_self_fortnite: 'Self Game service', // แก้ไข key ใน html ให้เป็นขีดล่าง _ หรือกลาง - ก็ได้ แต่ใน JS key ควรตรงกัน (ใน HTML คุณใช้ - แต่ใน JS object key ใช้ - ต้องใส่ quote, ถ้าใช้ _ จะง่ายกว่า แต่ถ้า HTML fix มาแล้วต้อง map ให้ตรง)
        'cat_self-fortnite': 'Self Game service', // แมพตรงกับ HTML (cat_self-fortnite)

        // Descriptions (อัปเดตตาม HTML ใหม่)
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
let currentStatusKey = 'system_loading'; // เก็บสถานะปัจจุบันเพื่อใช้ตอนสลับภาษา

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
        
        // กรณีพิเศษสำหรับสถานะระบบ: ใช้ key ที่ได้จาก API
        if (key === 'system_online') {
            el.innerHTML = translations[currentLang][currentStatusKey] || translations[currentLang]['system_normal'];
        } 
        // กรณีทั่วไป
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


// [ตั้งค่า] ลิงก์หลักของหน้า Status Page ของคุณ
const STATUS_PAGE_URL = 'https://status.nattapat2871.me';


// ฟังก์ชันดึงสถานะจาก API
async function fetchSystemStatus() {
    const dotElement = document.querySelector('.status-indicator .dot');
    
    // สร้าง URL API จากตัวแปรด้านบน
    const API_URL = `${STATUS_PAGE_URL}/api/summary`; 

    try {
        const response = await fetch(API_URL);
        
        // ถ้า Network Error หรือ Server ตาย (response ไม่ ok) ให้โยน Error ไป catch
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // ลบคลาสสีเก่าออก
        dotElement.classList.remove('normal', 'warning', 'critical');

        // เช็คสถานะตามเงื่อนไข
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

// เรียกใช้งานเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    // ตั้งค่า Link ให้ปุ่ม "ดูรายละเอียด"
    const statusLink = document.getElementById('status-link');
    if (statusLink) {
        statusLink.href = STATUS_PAGE_URL;
    }

    // ดึงสถานะครั้งแรก
    fetchSystemStatus();
    
    // ตั้งเวลาดึงข้อมูลใหม่ทุกๆ 60 วินาที
    setInterval(fetchSystemStatus, 60000);
});