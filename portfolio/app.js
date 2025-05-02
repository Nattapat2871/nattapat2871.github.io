// ใช้ DOMContentLoaded เพื่อให้แน่ใจว่า HTML โหลดเสร็จก่อน JS ทำงาน
document.addEventListener('DOMContentLoaded', function() {

    
    

    // --- โค้ดเดิม Portfolio: Typewriter ---
    const changingTextElement = document.querySelector('.changing-text');
    if (changingTextElement) { // ตรวจสอบว่า element มีจริง
        const textArray = ["gamer", "programer", "freelancer", "Otaku"];
        let textArrayIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 200;
        const deletingSpeed = 100;
        const pauseBetweenTexts = 2000;

        function type() {
            if(!changingTextElement) return; // หยุดถ้า element หายไป
            const currentText = textArray[textArrayIndex];
            if (!isDeleting && charIndex < currentText.length) {
                changingTextElement.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else if (isDeleting && charIndex > 0) {
                 changingTextElement.textContent = currentText.substring(0, charIndex - 1);
                 charIndex--;
                 setTimeout(type, deletingSpeed); // เปลี่ยนจาก erase เป็น type
            } else if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, pauseBetweenTexts); // เปลี่ยนจาก erase เป็น type
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, typingSpeed);
            }
        }
        type(); // เริ่มทำงาน
    }


    // --- โค้ดเดิม Portfolio: Dropdown Menu ---
    const hamburgIcon = document.querySelector('.hamburg');
    const cancelIcon = document.querySelector('.cancel');
    const dropdownMenu = document.querySelector('.dropdown');

    function hamburg() {
        if(dropdownMenu) dropdownMenu.classList.add('open');
    }
    function cancel() {
        if(dropdownMenu) dropdownMenu.classList.remove('open');
    }
    if(hamburgIcon) hamburgIcon.addEventListener('click', hamburg);
    if(cancelIcon) cancelIcon.addEventListener('click', cancel);
    // เพิ่ม: ปิด dropdown เมื่อคลิกลิงก์
    if (dropdownMenu) {
        const dropdownLinks = dropdownMenu.querySelectorAll('a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', cancel);
        });
    }


    // --- โค้ดเดิม Portfolio: Service Box Hover (ถ้ายังต้องการ) ---
    const serviceBoxes = document.querySelectorAll('.services .boxes .box');
    serviceBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() { this.classList.add('hovered'); });
        box.addEventListener('mouseleave', function() { this.classList.remove('hovered'); });
    });


    // --- โค้ดเดิม Portfolio: Blinking Bar ---
    function createLastCharBlinkingEffect(elementSelector, blinkCharacter = '_', intervalTime = 500) {
        const element = document.querySelector(elementSelector);
        if (!element) {
            // console.error(`ไม่พบ element ที่มี selector: ${elementSelector}`); // อาจจะไม่จำเป็นต้องแสดง error
            return;
        }
        let isBlinking = false; // ใช้ตัวแปรช่วย track สถานะ
        setInterval(() => {
            const currentText = element.textContent;
             // ลบเฉพาะตัวสุดท้ายถ้ามันคือ blinkCharacter
            const baseText = currentText.endsWith(blinkCharacter) ? currentText.slice(0, -1) : currentText;

            if (isBlinking) {
                element.textContent = baseText; // แสดงเฉพาะ text
            } else {
                element.textContent = baseText + blinkCharacter; // แสดง text + blink
            }
            isBlinking = !isBlinking; // สลับสถานะ
        }, intervalTime);
    }
    createLastCharBlinkingEffect('.fixed-bar', '│', 500);


    // --- โค้ดเดิม Portfolio: Back to Top Button ---
    let backToTopBtn = document.getElementById("backToTopBtn");
    let homeSection = document.getElementById("home"); // ใช้ home section แทน about
    let homeSectionOffsetTop = homeSection ? homeSection.offsetTop + (homeSection.offsetHeight / 2) : 200; // เลื่อนลงมากลางๆ home section ค่อยโชว์

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (backToTopBtn) { // ตรวจสอบปุ่มก่อน
            // ใช้ค่า offset ที่คำนวณไว้
            if (document.body.scrollTop > homeSectionOffsetTop || document.documentElement.scrollTop > homeSectionOffsetTop) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        }
    }
    if (backToTopBtn) { // ตรวจสอบปุ่มก่อน add listener
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' }); // ใช้ window.scrollTo
        });
    }


    // --- โค้ด 3D Effect (Targeting Parent Wrapper) ---
    const wrapperFor3D = document.querySelector('.content-and-player-wrapper');

    if (wrapperFor3D) {
        wrapperFor3D.addEventListener('mousemove', (e) => {
            const rect = wrapperFor3D.getBoundingClientRect();
            const centerX = rect.left + rect.width / 3;
            const centerY = rect.top + rect.height / 3;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const deltaX = (mouseX - centerX) / (rect.width / 2);
            const deltaY = (mouseY - centerY) / (rect.height / 2);
            const rotateX = deltaY * 8;
            const rotateY = deltaX * -8;
            wrapperFor3D.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        wrapperFor3D.addEventListener('mouseleave', () => {
            wrapperFor3D.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg)`;
        });
    } else {
        console.warn("Element '.content-and-player-wrapper' not found for 3D effect.");
    }
    // --- จบส่วน 3D Effect ---






        // --- ส่วนที่ 1: จัดการ Overlay, Scroll Lock, และ AOS ---
    
        const overlay = document.getElementById('clickToCloseOverlay');
        const bodyElement = document.body;
    
        // ตรวจสอบว่าหา overlay element เจอหรือไม่
        if (!overlay) {
            console.error("Element with ID 'clickToCloseOverlay' not found!");
            // ถ้าหา overlay ไม่เจอ เราอาจจะยังต้องการให้ player ทำงาน แต่จะไม่ล็อค scroll/หน่วง AOS
        } else {
            // --- ตั้งค่าเริ่มต้นเมื่อโหลดหน้า (เมื่อเจอ overlay) ---
            // 1. เพิ่ม class 'overlay-active' เพื่อล็อกการเลื่อนหน้าจอทันที
            bodyElement.classList.add('overlay-active');
            // 2. ยังไม่ Initialize AOS (จะทำตอนปิด overlay)
        }
    
        // --- ส่วนที่ 2: Music Player ---
    
        // -- ดึง Element ของ Player --
        const audioPlayer = document.getElementById('audioPlayer'); // ID ของ <audio> element
        const playPauseBtn = document.getElementById('playPauseBtn');
        const playPauseIcon = playPauseBtn ? playPauseBtn.querySelector('i') : null; // ตรวจสอบเผื่อไม่มีปุ่ม
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const progressBar = document.getElementById('progressBar');
        const currentTimeEl = document.getElementById('currentTime');
        const totalDurationEl = document.getElementById('totalDuration');
        const albumArtEl = document.getElementById('albumArt');
        const songTitleEl = document.getElementById('songTitle');
        const speakerIcon = document.getElementById('speaker-icon');
        const volumeSlider = document.getElementById('volume-slider');
    
        // --- ตรวจสอบ Element ที่จำเป็นของ Player ---
        let playerReady = false; // ตั้งค่าสถานะว่า player พร้อมทำงานหรือไม่
        if (audioPlayer && playPauseBtn && prevBtn && nextBtn && progressBar && speakerIcon && volumeSlider && playPauseIcon /* เพิ่ม element อื่นๆ ที่จำเป็น */) {
            playerReady = true;
            console.log("Music Player elements found.");
        } else {
            console.error("Music Player Error: ไม่พบ Element ที่จำเป็นครบถ้วน. Player functionality might be disabled.");
            // อาจจะซ่อนส่วน Player บน UI ถ้า element ไม่ครบ
            const musicPlayerElement = document.querySelector('.music-player');
            if (musicPlayerElement) musicPlayerElement.style.display = 'none';
        }
    
        // --- กำหนดค่าเริ่มต้น ถ้า Player พร้อม ---
        if (playerReady) {
            audioPlayer.volume = 0.4; // ตั้งค่าเสียงเริ่มต้นตามที่คุณใส่มา
        }
    
        // --- Playlist ---
        const playlist = [
            {
                title: "destroy lonely - saveing me",
                src: "media/destroy lonely - saveing me.mp3",
                art: "https://i.ytimg.com/vi/hRKYHYrI5Gg/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgVShTMA8=&rs=AOn4CLBNCT29I7CH5rvTYOQkYpAfrh5lrA"
            },
            {
                title: "private jet - d. savage",
                src: "media/private jet - d. savage.mp3",
                art: "https://i.ytimg.com/vi/eF_p3euHj2Y/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAjggdByIDcAasm033uZsg2bdwCNQ"
            },
            {
                title: "นครดารา - YOUNGOHM",
                src: "media/นครดารา - YOUNGOHM.mp3",
                art: "https://i.ytimg.com/vi/ssKJYCw7Z7c/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAzTgMrPHheemSg0jeBBAKPMmJPkA"
            },
            // เพิ่มเพลงอื่นๆ ตามต้องการ
        ];
    
        // --- สถานะของ Player ---
        let currentTrackIndex = 0;
        let isPlaying = false;
        let isMuted = audioPlayer ? audioPlayer.muted : false; // อ่านสถานะ mute เริ่มต้น
        // อ่าน volume เริ่มต้น หรือใช้ 0.5 (แต่เราตั้ง audioPlayer.volume = 0.4 ไปแล้ว)
        let previousVolume = audioPlayer ? ((!isMuted && audioPlayer.volume > 0) ? audioPlayer.volume : 0.5) : 0.5;
    
    
        // --- ฟังก์ชันของ Player ---
    
        function formatTime(seconds) {
            if (isNaN(seconds) || seconds < 0) return "0:00";
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }
    
        function updateProgressBarVisual(currentTime, duration) {
            if (!progressBar) return;
            const progressPercent = (duration > 0) ? (currentTime / duration) * 100 : 0;
            progressBar.style.background = `linear-gradient(to right, #b3b3b3 ${progressPercent}%, #4d4d4d ${progressPercent}%)`;
        }
    
         function updateSpeakerIcon() {
            if (!speakerIcon || !audioPlayer) return;
            const volOff = 'fa-volume-xmark';
            const volLow = 'fa-volume-low';
            const volHigh = 'fa-volume-high';
    
            speakerIcon.classList.remove(volOff, volLow, volHigh);
    
            if (isMuted || audioPlayer.volume === 0) {
                speakerIcon.classList.add(volOff);
            } else if (audioPlayer.volume <= 0.5) {
                speakerIcon.classList.add(volLow);
            } else {
                speakerIcon.classList.add(volHigh);
            }
         }
    
        function loadTrack(index) {
            if (!playerReady) return; // ไม่ทำงานถ้า player ไม่พร้อม
    
            if (playlist.length === 0) {
                if(albumArtEl) { albumArtEl.src = "fa-music.png"; albumArtEl.alt = "No music available"; }
                if(songTitleEl) songTitleEl.textContent = "No Music Loaded";
                if (audioPlayer) audioPlayer.src = "";
                if (progressBar) { progressBar.value = 0; progressBar.max = 1; }
                if (currentTimeEl) currentTimeEl.textContent = formatTime(0);
                if (totalDurationEl) totalDurationEl.textContent = formatTime(0);
                updateProgressBarVisual(0, 1);
                isPlaying = false;
                if (playPauseIcon) { playPauseIcon.classList.remove('fa-pause'); playPauseIcon.classList.add('fa-play'); }
                return;
            }
    
            if (index < 0) {
                index = playlist.length - 1;
            } else if (index >= playlist.length) {
                index = 0;
            }
            currentTrackIndex = index;
    
            // โหลดข้อมูลเพลง
            const track = playlist[currentTrackIndex];
            audioPlayer.src = track.src;
            if(songTitleEl) songTitleEl.textContent = track.title;
            if(albumArtEl) {
                albumArtEl.src = track.art;
                albumArtEl.alt = track.title;
            }
    
            // รีเซ็ต UI ชั่วคราว
            progressBar.value = 0;
            if(currentTimeEl) currentTimeEl.textContent = formatTime(0);
            if(totalDurationEl) totalDurationEl.textContent = formatTime(0);
            updateProgressBarVisual(0, 1);
    
            // ตั้งค่า Volume/Mute ตามสถานะล่าสุด
            audioPlayer.muted = isMuted;
            audioPlayer.volume = isMuted ? 0 : previousVolume;
            if (volumeSlider) volumeSlider.value = isMuted ? 0 : audioPlayer.volume;
            updateSpeakerIcon();
    
            // รอ metadata โหลดเสร็จ
            audioPlayer.onloadedmetadata = () => {
                if (audioPlayer.duration && !isNaN(audioPlayer.duration)) {
                    if(totalDurationEl) totalDurationEl.textContent = formatTime(audioPlayer.duration);
                    progressBar.max = audioPlayer.duration;
                } else {
                    if(totalDurationEl) totalDurationEl.textContent = "-:--";
                    progressBar.max = 100; // fallback
                }
                // อัปเดต UI อีกครั้งหลัง metadata โหลด
                if (volumeSlider) volumeSlider.value = isMuted ? 0 : audioPlayer.volume;
                 updateSpeakerIcon();
            };
        }
    
        function togglePlayPause() {
            if (!playerReady || !audioPlayer || !playPauseIcon) return;
    
            if (!audioPlayer.paused) { // กำลังเล่น -> หยุด
                audioPlayer.pause();
                playPauseIcon.classList.remove('fa-pause');
                playPauseIcon.classList.add('fa-play');
                isPlaying = false;
            } else { // หยุดอยู่ -> เล่น
                const playPromise = audioPlayer.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        playPauseIcon.classList.remove('fa-play');
                        playPauseIcon.classList.add('fa-pause');
                        isPlaying = true;
                    }).catch(error => {
                        console.error("Playback failed:", error);
                        playPauseIcon.classList.remove('fa-pause');
                        playPauseIcon.classList.add('fa-play');
                        isPlaying = false;
                    });
                }
            }
        }
    
        function changeTrack(direction) {
            if (!playerReady || playlist.length === 0) return;
            const newIndex = currentTrackIndex + direction;
            const wasPlaying = isPlaying;
            isPlaying = false;
            loadTrack(newIndex);
    
            if (wasPlaying) {
                audioPlayer.addEventListener('canplay', () => {
                    // ตรวจสอบ index อีกครั้งเผื่อกดข้ามเร็วๆ
                    if (currentTrackIndex === ((newIndex + playlist.length) % playlist.length)) {
                        togglePlayPause(); // เล่นเพลงใหม่
                    }
                }, { once: true });
            } else {
                 if (playPauseIcon) { // อัปเดตไอคอนถ้าไม่ได้เล่นอยู่
                     playPauseIcon.classList.remove('fa-pause');
                     playPauseIcon.classList.add('fa-play');
                 }
            }
        }
    
         function updateProgress() {
            if (!playerReady || !audioPlayer || !progressBar) return;
            const currentTime = audioPlayer.currentTime;
            const duration = audioPlayer.duration;
    
            if (!isNaN(duration) && duration > 0) {
                progressBar.value = currentTime;
                if(currentTimeEl) currentTimeEl.textContent = formatTime(currentTime);
                updateProgressBarVisual(currentTime, duration);
            } else {
                if(currentTimeEl) currentTimeEl.textContent = formatTime(currentTime);
            }
         }
    


        // --- ฟังก์ชันสำหรับปิด Overlay และอื่นๆ (จากส่วนที่ 1) ---
        function hideOverlayAndEnablePage() {
            if (overlay) {
                overlay.classList.add('hidden');
                overlay.removeEventListener('click', hideOverlayAndEnablePage); // ลบ Listener
            }
            if (bodyElement) {
                bodyElement.classList.remove('overlay-active');
            }
    
            // เริ่ม AOS
            if (typeof AOS !== 'undefined') {
                AOS.init({ /* options */ });
                console.log('AOS Initialized.');
            } else { console.warn('AOS not found.'); }
    
            // *** เริ่มเล่นเพลงอัตโนมัติ ***
            if (playerReady && !isPlaying && typeof togglePlayPause === 'function') {
                console.log('Attempting auto-play after overlay closed...');
                togglePlayPause();
            } else {
                 if (!playerReady) console.warn("Player not ready, cannot auto-play.");
                 else if (typeof togglePlayPause !== 'function') console.warn("togglePlayPause function missing.");
                 else console.log("Music already playing or state issue, not auto-playing.");
            }
        }
    
        // --- Event Listeners ---
    
        // Overlay Click (ถ้า overlay มีอยู่)
        if (overlay) {
            overlay.addEventListener('click', hideOverlayAndEnablePage);
        }
    
        // Player Controls (ถ้า player พร้อม)
        if (playerReady) {
            playPauseBtn.addEventListener('click', togglePlayPause);
            prevBtn.addEventListener('click', () => changeTrack(-1));
            nextBtn.addEventListener('click', () => changeTrack(1));
            audioPlayer.addEventListener('timeupdate', updateProgress);
            audioPlayer.addEventListener('ended', () => changeTrack(1)); // เล่นเพลงถัดไปเมื่อจบ
            audioPlayer.addEventListener('error', (e) => {
                console.error("Audio Error:", audioPlayer.error);
                if(songTitleEl) songTitleEl.textContent = "Error loading track";
            });
            progressBar.addEventListener('input', () => {
                if (!isNaN(audioPlayer.duration)) {
                    audioPlayer.currentTime = progressBar.value;
                }
            });
            volumeSlider.addEventListener('input', () => {
                const volume = parseFloat(volumeSlider.value);
                audioPlayer.volume = volume;
                isMuted = (volume === 0); // Mute ถ้าลากไปที่ 0
                audioPlayer.muted = isMuted; // อัปเดตสถานะ mute ของ audio
                if (!isMuted) {
                    previousVolume = volume; // บันทึกค่าเสียงล่าสุด
                }
                updateSpeakerIcon(); // อัปเดตไอคอน
            });
            speakerIcon.addEventListener('click', () => {
                if (isMuted) { // Unmute
                    isMuted = false;
                    audioPlayer.muted = false;
                    const restoreVolume = previousVolume <= 0 ? 0.5 : previousVolume;
                    audioPlayer.volume = restoreVolume;
                    volumeSlider.value = restoreVolume;
                } else { // Mute
                    if (audioPlayer.volume > 0) { previousVolume = audioPlayer.volume; }
                    isMuted = true;
                    audioPlayer.muted = true;
                    volumeSlider.value = 0;
                }
                updateSpeakerIcon();
            });
            audioPlayer.addEventListener('volumechange', () => { // จัดการกรณีเสียงเปลี่ยนจากภายนอก
                const currentVolume = audioPlayer.volume;
                isMuted = audioPlayer.muted || currentVolume === 0;
                volumeSlider.value = isMuted ? 0 : currentVolume;
                if (!isMuted) { previousVolume = currentVolume; }
                updateSpeakerIcon();
            });
        }
    
    
        // --- เริ่มต้นโหลดเพลงแรก (ถ้า player พร้อม) ---
        if (playerReady) {
            loadTrack(currentTrackIndex);
        }  






        
    
   // --- ส่วนจัดการ Image/Video Switcher ---
   const imageElement = document.getElementById('ellipse-image');
   const videoElement = document.getElementById('ellipse-video');
   const ellipseContainer = document.getElementById('media-ellipse'); // ใช้ ID ที่เราตั้ง
   let switcherIntervalId = null; // สำหรับเก็บ ID ของ Interval

   // ตรวจสอบ Element
   if (imageElement && videoElement && ellipseContainer) {
       const switchIntervalTime = 5000; // 10 วินาที

       // ฟังก์ชันสลับการแสดงผล
       function switchMedia() {
           const currentActive = ellipseContainer.querySelector('.media-item.active');
           if (!currentActive) return;
           let nextActive;

           if (currentActive === imageElement) { // ถ้าปัจจุบันเป็นรูป
               nextActive = videoElement; // ต่อไปเป็นวิดีโอ
               videoElement.play().catch(e => console.warn("Video play error:", e)); // เล่นวิดีโอ
           } else { // ถ้าปัจจุบันเป็นวิดีโอ
               nextActive = imageElement; // ต่อไปเป็นรูป
               videoElement.pause(); // หยุดวิดีโอ
           }
           currentActive.classList.remove('active'); // เอา active ออกจากอันเดิม
           nextActive.classList.add('active'); // ใส่ active ให้อันใหม่
       }

       // ฟังก์ชันสำหรับเริ่มตัวสลับ (จะถูกเรียกหลังปิด Overlay)
       function startMediaSwitcher() {
           if (!switcherIntervalId) { // ป้องกันการ start ซ้ำ
               switcherIntervalId = setInterval(switchMedia, switchIntervalTime);
               console.log("Image/Video switcher started.");
           }
       }

   } else {
       console.warn("Ellipse switcher elements not found. Switcher disabled.");
   }


   // --- ฟังก์ชันสำหรับปิด Overlay (ต้องมีฟังก์ชันนี้อยู่แล้ว) ---
   function hideOverlayAndEnablePage() {
       // ... (โค้ดเดิม: ซ่อน overlay, ลบ overlay-active) ...
       if (overlay) {
           overlay.classList.add('hidden');
           overlay.removeEventListener('click', hideOverlayAndEnablePage);
       }
       if (bodyElement) {
           bodyElement.classList.remove('overlay-active');
       }


       // ... (โค้ดเดิม: เริ่ม AOS) ...
       if (typeof AOS !== 'undefined') { AOS.init(); console.log('AOS Initialized.'); }
       else { console.warn('AOS not found.'); }

       // ... (โค้ดเดิม: เริ่มเล่นเพลง ถ้าต้องการ) ...
       if (typeof isPlaying !== 'undefined' && !isPlaying && typeof togglePlayPause === 'function') { togglePlayPause(); }

       // ***** เรียกใช้ฟังก์ชันเพื่อเริ่มต้นการสลับรูป/วิดีโอ *****
       if (typeof startMediaSwitcher === 'function') {
           startMediaSwitcher(); // <<<===== เพิ่มบรรทัดนี้เข้าไป
       }
   }

   // --- Event Listener ของ Overlay (ต้องมีอยู่แล้ว) ---
   if (overlay) {
       overlay.addEventListener('click', hideOverlayAndEnablePage);
   }



   
    // ===========================================
    // ===== ส่วนจัดการ Typing Title Effect =====
    // ===========================================
    const siteTitles = [ // <-- แก้ไขข้อความในนี้ตามต้องการ
        "Welcome to",
        "Nattapat Jistom",
        "Portfolio",
        "Web Page developer",
        
    ];
    let titleWordIndex = 0;    // Index ของคำใน array siteTitles
    let titleLetterIndex = 0;   // Index ของตัวอักษรในคำปัจจุบัน
    let titleIsDeleting = false; // สถานะว่ากำลังลบหรือไม่
    const typingDelay = 180;   // ความเร็วในการพิมพ์ (ms ยิ่งน้อยยิ่งเร็ว)
    const deletingDelay = 80;   // ความเร็วในการลบ (ms ยิ่งน้อยยิ่งเร็ว)
    const pauseBeforeDelete = 2000; // พักหลังจากพิมพ์เสร็จ (ms)
    const pauseBeforeTyping = 500;  // พักหลังจากลบเสร็จ ก่อนเริ่มคำใหม่ (ms)
    const cursor = '│'; // ตัวอักษรแทน Cursor (ใช้ | หรือ _ หรือ "" ถ้าไม่ต้องการ)

    function typeTitleEffect() {
        const currentWord = siteTitles[titleWordIndex];
        let displayedTitle = '';
        let nextTimeoutDelay = 0;

        if (titleIsDeleting) {
            // --- กำลังลบ ---
            displayedTitle = currentWord.substring(0, titleLetterIndex - 1);
            titleLetterIndex--;
            nextTimeoutDelay = deletingDelay; // ใช้ความเร็วในการลบ

            // ตรวจสอบว่าลบหมดหรือยัง
            if (displayedTitle === '') {
                titleIsDeleting = false; // เปลี่ยนสถานะเป็นพิมพ์
                titleWordIndex = (titleWordIndex + 1) % siteTitles.length; // เลื่อนไปคำถัดไป (วน loop)
                titleLetterIndex = 0; // รีเซ็ต index ตัวอักษร
                nextTimeoutDelay = pauseBeforeTyping; // พักก่อนพิมพ์คำใหม่
            }
        } else {
            // --- กำลังพิมพ์ ---
            displayedTitle = currentWord.substring(0, titleLetterIndex + 1);
            titleLetterIndex++;
            nextTimeoutDelay = typingDelay; // ใช้ความเร็วในการพิมพ์

            // ตรวจสอบว่าพิมพ์ครบคำหรือยัง
            if (displayedTitle === currentWord) {
                titleIsDeleting = true; // เปลี่ยนสถานะเป็นลบ
                nextTimeoutDelay = pauseBeforeDelete; // พักก่อนเริ่มลบ
            }
        }

        // อัปเดต Title ของหน้าเว็บ
        document.title = displayedTitle + cursor;

        // ตั้งเวลาเรียกตัวเองในครั้งถัดไป
        setTimeout(typeTitleEffect, nextTimeoutDelay);
    }

    // --- เริ่มต้นการทำงานของ Title Effect ---
    // คุณสามารถเลือกได้ว่าจะให้เริ่มตอนไหน:
    // Option 1: เริ่มหลังจาก DOM โหลดเสร็จเล็กน้อย (เช่น 1-2 วินาที)
    setTimeout(typeTitleEffect, 1500); // เริ่มหลังจาก 1.5 วินาที

    // Option 2: เริ่มหลังจากที่ Overlay ถูกปิดไปแล้ว
    // ให้ย้าย setTimeout(typeTitleEffect, 1500); ไปใส่ในฟังก์ชัน hideOverlayAndEnablePage()
    // ตัวอย่างใน hideOverlayAndEnablePage():
    /*
    function hideOverlayAndEnablePage() {
        // ... (โค้ดเดิม: ซ่อน overlay, ลบ overlay-active, เริ่ม AOS, เริ่มเพลง, เริ่ม switcher) ...

        // เริ่ม Title Effect หลังจากทุกอย่างพร้อม
        setTimeout(typeTitleEffect, 500); // เริ่มหลังจากปิด overlay 0.5 วินาที

        // ... (โค้ดลบ listener เดิม) ...
    }
    */

    // --- (ฟังก์ชัน hideOverlayAndEnablePage และ Listener ของมัน ที่มีอยู่แล้ว) ---
    // ...

}); // --- จบ DOMContentLoaded ----


    