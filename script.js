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
        cat_auto_claim: 'Self Game Service',

        // Descriptions
        desc_donate: 'เว็บไซต์สำหรับการสนับสนุนและโดเนทเพื่อเป็นกำลังใจในการพัฒนา',
        desc_port: 'หน้าเว็บแนะนำตัว ประวัติผลงาน และข้อมูลการติดต่ออย่างเป็นทางการ',
        desc_status: 'หน้าเว็บสำหรับตรวจสอบสถานะการทำงาน (Uptime) ของบอทและเว็บไซต์',
        desc_github: 'คลังเก็บโค้ด Open Source และโปรเจกต์ต่างๆ ที่เผยแพร่สาธารณะ',
        
        desc_focalor: 'บอท Discord สำหรับล็อคอินประจำวันของเกมในค่าย HoYoVerse และรองรับแลกโค้ดอัตโนมัติ',
        desc_api: 'ระบบ API สำหรับดึงข้อมูลโปรไฟล์ผูใช้ใน Discord เพียงแค่ใช้ User ID',
        desc_ame: 'บอท Discord ที่มีฟังชั่นการใช้งานหลากหลาย ประจำวัน และแชทบอท AI',
        desc_slimejuke: 'ยกเลิกการพัฒนาเพราะเปลี่ยนไปใช้ Rurina Melody',
        desc_melody: 'บอทเพลงคุณภาพสูงสำหรับ Discord รองรับการเล่นเพลงจากหลากหลายแพลตฟอร์ม พร้อมระบบจัดการห้องเพลงที่ทันสมัย และคุณภาพเสียงระดับ Lossless และคุณภาพเสียง 384 Kbps เพื่อให้คุณได้รับประสบการณ์ที่ดีที่สุด 🎶',
        desc_mc: 'เซิร์ฟเวอร์ Minecraft ที่ผมเปิดให้บริการ พร้อมระบบ Custom Plugin',
        cat_discord_quest: "Automation Script",
        desc_discord_quest: "สคริปต์ทำเควสและกดรับของรางวัล Discord อัตโนมัติผ่าน Console ทำงานสะดวกรวดเร็ว พร้อมระบบแสดงความคืบหน้าแบบเรียลไทม์ (Real-time Sync)",

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
        cat_melody: 'Discord Music Bot',
        cat_mc: 'Minecraft Server',
        'cat_self-fortnite': 'Self Game service',
        cat_auto_claim: 'Self Game Service',

        // Descriptions
        desc_donate: 'A website for supporting and donating to encourage my development.',
        desc_port: 'Official portfolio website featuring my profile, works, and contact info.',
        desc_status: 'A status page for monitoring the uptime of my bots and websites.',
        desc_github: 'A repository of Open Source code and public projects.',

        desc_focalor: 'A Discord bot for daily login to HoYoVerse games and automatic code redemption.',
        desc_api: 'API system for retrieving Discord user profile data using only User ID.',
        desc_ame: 'A multi-functional Discord bot featuring daily utilities and AI chatbot.',
        desc_slimejuke: 'Development cancelled, replaced by Rurina Melody.',
        desc_melody: 'High-quality music bot for Discord. Supports playback from various platforms, modern room management, Lossless audio quality, and 384 Kbps for the best experience 🎶',
        desc_mc: 'My Minecraft server service with custom plugins and configurations.',
        cat_discord_quest: "Automation Script",
        desc_discord_quest: "Automated Discord quest completion and reward claiming script via Console. Features safe execution and real-time progress syncing.",

        // Button Text
        btn_toggle: 'กดที่นี่เพื่อดูเว็บภาษาไทย'
    }
};

let currentLang = 'en'; // Default language
let currentStatusKey = 'system_loading'; 

function toggleLanguage() {
    currentLang = currentLang === 'th' ? 'en' : 'th';
    updateTranslations();
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key === 'system_online') {
            el.innerHTML = translations[currentLang][currentStatusKey] || translations[currentLang]['system_normal'];
        } else if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    const btn = document.getElementById('lang-toggle');
    if (btn) btn.innerText = translations[currentLang].btn_toggle;
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
            currentStatusKey = 'system_normal';
            dotElement.classList.add('normal');
        } else {
            currentStatusKey = 'system_warning';
            dotElement.classList.add('warning');
        }
    } catch (error) {
        console.error('Error fetching status:', error);
        currentStatusKey = 'system_critical'; 
        dotElement.classList.remove('normal', 'warning');
        dotElement.classList.add('critical');
    }
    updateTranslations();
}

// ==========================================
// Stats System (View + Like)
// ==========================================

const CURRENT_DOMAIN = window.location.hostname;
// [แก้ไข] ใช้ API ของจริงเสมอ ไม่ว่าจะรันบน localhost หรือไม่
const API_BASE = 'https://ame-api.nattapat2871.me';

const PAGE_STATS_API_URL = `${API_BASE}/api/page-stats?site=${CURRENT_DOMAIN}`;
const VIEW_UPDATE_API_URL = `${API_BASE}/api/view?site=${CURRENT_DOMAIN}`;
const LIKE_UPDATE_API_URL = `${API_BASE}/api/like?site=${CURRENT_DOMAIN}`;

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

async function initStatsSystem() {
    const viewCounterElement = document.getElementById('view-counter');
    const likeCounterElement = document.getElementById('like-count');
    const likeBtn = document.getElementById('like-btn');

    if (!viewCounterElement || !likeCounterElement) return;

    const likeCookieName = `liked_${CURRENT_DOMAIN}`;
    let isLiked = getCookie(likeCookieName) === 'true';
    if (isLiked) {
        likeBtn.classList.add('active');
    }

    try {
        const response = await fetch(PAGE_STATS_API_URL);
        if (!response.ok) throw new Error('Stats API Error');
        const data = await response.json();

        viewCounterElement.innerText = data.view_count.toLocaleString();
        likeCounterElement.innerText = data.like_count.toLocaleString();

        checkAndIncrementView(data.view_count);
    } catch (error) {
        console.error('Error loading stats:', error);
        viewCounterElement.innerText = '-';
        likeCounterElement.innerText = '-';
    }

    setupLikeButton(likeBtn, likeCounterElement, likeCookieName, isLiked);
}

async function checkAndIncrementView(currentCount) {
    const viewCookieName = `viewed_${CURRENT_DOMAIN}`;
    if (!getCookie(viewCookieName)) {
        setCookie(viewCookieName, 'true', 12); 
        try {
            const res = await fetch(VIEW_UPDATE_API_URL, { method: 'POST' });
            const data = await res.json();
            document.getElementById('view-counter').innerText = data.count.toLocaleString();
        } catch (e) { console.error('View increment error:', e); }
    }
}

function setupLikeButton(btn, counterElement, cookieName, initialState) {
    let isLiked = initialState;

    btn.addEventListener('click', async () => {
        isLiked = !isLiked;
        let currentNum = parseInt(counterElement.innerText.replace(/,/g, '')) || 0;
        
        if (isLiked) {
            btn.classList.add('active');
            counterElement.innerText = (currentNum + 1).toLocaleString();
            setCookie(cookieName, 'true'); 
            fetch(`${LIKE_UPDATE_API_URL}&action=like`, { method: 'POST' }); 
        } else {
            btn.classList.remove('active');
            counterElement.innerText = Math.max(0, currentNum - 1).toLocaleString();
            deleteCookie(cookieName);
            fetch(`${LIKE_UPDATE_API_URL}&action=unlike`, { method: 'POST' }); 
        }
    });
}

// ==========================================
// Discord WebSocket System
// ==========================================

const DISCORD_WS_URL = 'wss://ame-api.nattapat2871.me/ws/v1/user/1007237437627572275';

function connectDiscordWS() {
    const ws = new WebSocket(DISCORD_WS_URL);

    // Elements
    const avatarEl = document.getElementById('dc-avatar');
    const decorationEl = document.getElementById('dc-decoration');
    const statusDotEl = document.getElementById('dc-status');
    const usernameEl = document.getElementById('dc-username');
    const customStatusEl = document.getElementById('dc-custom-status');
    const activityBox = document.getElementById('dc-activity-box');
    const activityImg = document.getElementById('dc-activity-img');
    const activitySmall = document.getElementById('dc-activity-small');
    const activityName = document.getElementById('dc-activity-name');
    const activityState = document.getElementById('dc-activity-state');
    const activityTime = document.getElementById('dc-activity-time');

    // Guild Elements
    const guildContainer = document.getElementById('dc-guild-tag-container');
    const guildBadgeEl = document.getElementById('dc-guild-badge');
    const guildTextEl = document.getElementById('dc-guild-tag-text');

    ws.onopen = () => {
        console.log('Connected to Discord WebSocket');
        if(customStatusEl) customStatusEl.innerText = "Connected";
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            const ame = data.ame; // Access the 'ame' object
            
            if (!ame || !ame.user) return;

            const user = ame.user;

            // 1. Update Profile Info
            usernameEl.innerText = user.username;

            // 2. Avatar (GIF Support)
            let avatarFormat = 'webp';
            if (user.avatar && user.avatar.startsWith('a_')) {
                avatarFormat = 'gif'; 
            }

            if (user.avatar) {
                avatarEl.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${avatarFormat}?size=1024&animated=true`;
            } else {
                avatarEl.src = `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator || 0) % 5}.png`;
            }

            // Avatar Decoration
            if (user.avatar_decoration_data && user.avatar_decoration_data.asset) {
                decorationEl.src = `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png?size=96&passthrough=true`;
                decorationEl.style.display = 'block';
            } else {
                decorationEl.style.display = 'none';
            }

            // 3. Guild Badge & Tag (Pill Style)
            if (user.primary_guild) {
                // Set Tag Text
                if (user.primary_guild.tag) {
                    guildTextEl.innerText = user.primary_guild.tag;
                } else {
                    guildTextEl.innerText = "";
                }

                // Set Badge Image
                if (user.primary_guild.badge) {
                    const guildId = user.primary_guild.identity_guild_id;
                    const badgeHash = user.primary_guild.badge;
                    guildBadgeEl.src = `https://cdn.discordapp.com/clan-badges/${guildId}/${badgeHash}.png?size=32`;
                    guildBadgeEl.style.display = 'block';
                } else {
                    guildBadgeEl.style.display = 'none';
                }

                // Show Container if either tag or badge exists
                if (user.primary_guild.tag || user.primary_guild.badge) {
                    guildContainer.style.display = 'inline-flex';
                } else {
                    guildContainer.style.display = 'none';
                }

            } else {
                guildContainer.style.display = 'none';
            }

            // 4. Status Color
            statusDotEl.className = 'discord-status-dot'; // reset
            const status = ame.discord_status || 'offline';
            statusDotEl.classList.add(`status-${status}`);

            // 5. Update Custom Status / Bio
            if (status === 'offline') {
                customStatusEl.innerText = "Currently Offline";
                activityBox.style.display = 'none';
            } else {
                customStatusEl.innerText = ame.user_profile?.bio?.split('\n')[0] || "Online"; 
            }

            // 6. Update Activity
            const activities = ame.activities || [];
            const realActivity = activities.find(a => a.type !== 4);

            if (realActivity) {
                activityBox.style.display = 'flex';
                activityName.innerText = realActivity.name;
                activityState.innerText = realActivity.state || realActivity.details || "";
                
                // Images
                if (realActivity.assets) {
                    if (realActivity.assets.large_image) {
                        let largeImgUrl = realActivity.assets.large_image;
                        if (largeImgUrl.startsWith('mp:')) {
                             largeImgUrl = largeImgUrl.replace('mp:', 'https://media.discordapp.net/');
                        }
                        activityImg.src = largeImgUrl;
                    } else {
                         activityImg.src = `https://d2.alternativeto.net/dist/icons/discord_140974.png?width=128&height=128&mode=crop&upscale=false`;
                    }

                    if (realActivity.assets.small_image) {
                        let smallImgUrl = realActivity.assets.small_image;
                        if (smallImgUrl.startsWith('mp:')) {
                             smallImgUrl = smallImgUrl.replace('mp:', 'https://media.discordapp.net/');
                        }
                        activitySmall.src = smallImgUrl;
                        activitySmall.style.display = 'block';
                    } else {
                        activitySmall.style.display = 'none';
                    }
                } else {
                    activityImg.src = `https://d2.alternativeto.net/dist/icons/discord_140974.png?width=128&height=128&mode=crop&upscale=false`;
                    activitySmall.style.display = 'none';
                }
                
                // Time Elapsed
                if (realActivity.timestamps && realActivity.timestamps.start) {
                    const startTime = realActivity.timestamps.start;
                    const elapsed = Math.floor((Date.now() - startTime) / 1000 / 60); 
                    activityTime.innerText = `${elapsed} mins elapsed`;
                    activityTime.style.display = 'block';
                } else {
                    activityTime.style.display = 'none';
                }

            } else {
                activityBox.style.display = 'none';
            }

        } catch (err) {
            console.error('Error parsing WS data:', err);
        }
    };

    ws.onclose = () => {
        console.log('Discord WebSocket Closed. Reconnecting in 5s...');
        if(customStatusEl) customStatusEl.innerText = "Offline (Reconnecting...)";
        statusDotEl.className = 'discord-status-dot status-offline';
        setTimeout(connectDiscordWS, 5000);
    };
    
    ws.onerror = (err) => {
        console.error('WebSocket Error:', err);
    };
}


async function fetchComputerStats() {
    const API_URL = 'https://ame-api.nattapat2871.me/api/view-stats/nattapat2871';
    const widget = document.getElementById('computer-stats-card');
    
    // Elements
    const elHostname = document.getElementById('pc-hostname');
    const elOS = document.getElementById('pc-os');
    const elCPU = document.getElementById('pc-cpu');
    const elGPU = document.getElementById('pc-gpu');
    const elRAMText = document.getElementById('pc-ram-text');
    const elRAMBar = document.getElementById('pc-ram-bar');
    const elDiskContainer = document.getElementById('pc-disk-container');
    const elPing = document.getElementById('pc-ping');
    const elUpdated = document.getElementById('pc-updated');
    
    // Network Elements
    const elNetIn = document.getElementById('net-in');
    const elNetOut = document.getElementById('net-out');

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Stats API Error');
        
        const rawData = await response.json();
        // ดึง object ตัวแรก (ชื่อเครื่อง MSI-Nattapat)
        const machineData = Object.values(rawData)[0];
        
        if (!machineData || !machineData.data) throw new Error('Invalid Data');

        const data = machineData.data;

        // Show Widget
        widget.style.display = 'flex';

        // 1. Basic Info
        elHostname.innerText = data.computer_detail.hostname || 'Unknown Host';
        elOS.innerText = `${data.computer_detail.os}`;
        elUpdated.innerText = `Updated: ${machineData.last_updated}`;

        // 2. CPU
        elCPU.innerText = (data.cpu && data.cpu.length > 0) ? data.cpu[0].split('@')[0].trim() : '-';

        // 3. GPU
        if (data.gpu && data.gpu.length > 0) {
            elGPU.innerHTML = data.gpu.map(g => `<span>${g}</span>`).join('');
        } else {
            elGPU.innerText = '-';
        }

        // 4. RAM (ปรับรูปแบบใหม่: 74.1% Free: 4.07GB Total: 15.71GB)
        if (data.ram) {
            elRAMText.innerText = `${data.ram.percent_used}% Free: ${data.ram.available} Total: ${data.ram.total}`;
            elRAMText.classList.add('long-text'); // เพิ่มคลาสปรับขนาดตัวอักษร

            elRAMBar.style.width = `${data.ram.percent_used}%`;
            if (data.ram.percent_used > 85) elRAMBar.style.backgroundColor = '#ff4757';
            else elRAMBar.style.backgroundColor = ''; 
        }

        // 5. Disks (ปรับรูปแบบใหม่)
        if (data.disks && data.disks.length > 0) {
            elDiskContainer.innerHTML = data.disks.map(disk => {
                let colorClass = '';
                if (disk.percent > 90) colorClass = 'background-color: #ff4757;'; 

                return `
                <div class="stat-group disk-item">
                    <div class="stat-row">
                        <span class="stat-label"><i class="fa-solid fa-hard-drive"></i> ${disk.device}</span>
                        <span class="stat-value long-text">${disk.percent}% Free: ${disk.free} Total: ${disk.total}</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${disk.percent}%; ${colorClass}"></div>
                    </div>
                </div>`;
            }).join('');
        }

        // 6. Network (Ping & Speed)
        if (data.network) {
            elPing.innerHTML = `<i class="fa-solid fa-stopwatch"></i> Ping ${data.network.ping_ms} ms`;
            
            // Speed
            const down = data.network.speed_in_mbps ? data.network.speed_in_mbps.toFixed(2) : "0.00";
            const up = data.network.speed_out_mbps ? data.network.speed_out_mbps.toFixed(2) : "0.00";
            
            if(elNetIn) elNetIn.innerText = `${down} Mbps`;
            if(elNetOut) elNetOut.innerText = `${up} Mbps`;
        }

    } catch (error) {
        console.error('Error fetching PC stats:', error);
        if(elHostname) elHostname.innerText = "System Offline";
    }
}

// เรียกใช้งาน
document.addEventListener('DOMContentLoaded', () => {
    const statusLink = document.getElementById('status-link');
    if (statusLink) statusLink.href = STATUS_PAGE_URL;
    fetchSystemStatus();
    setInterval(fetchSystemStatus, 60000);
    
    initStatsSystem();
    connectDiscordWS();
    
    fetchComputerStats();
    setInterval(fetchComputerStats, 10000);
});

