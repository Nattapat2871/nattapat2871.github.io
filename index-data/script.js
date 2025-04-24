
//     #   #    ###   #####  #####   ###   ####    ###   #####   ###    ###   ######    #
//     ##  #   #   #    #      #    #   #  #   #  #   #    #    #   #  #   #       #   ##
//     # # #   #####    #      #    #####  ####   #####    #      #     ###       #     #
//     #  ##   #   #    #      #    #   #  #      #   #    #     #     #   #     #      #
//     #   #   #   #    #      #    #   #  #      #   #    #    #####   ###     #     #####  



document.addEventListener('DOMContentLoaded', () => {
    if (profileLinkElement) {
        profileLinkElement.href = `https://discord.com/users/${DISCORD_USER_ID}`;
    } else {
        console.error("Element with ID 'profileLink' not found.");
    }
    connectWebSocket();

     const profileCard = document.getElementById('profileCard'); 
     const closeProfileBtn = document.getElementById('closeProfileBtn');
     const openProfileBtn = document.getElementById('openProfileBtn');

     if (profileCard && closeProfileBtn && openProfileBtn) {
         openProfileBtn.style.opacity = '0';
         openProfileBtn.style.pointerEvents = 'none';
         closeProfileBtn.addEventListener('click', () => {
             if (!profileCard.classList.contains('hidden')) {
                 profileCard.classList.add('hidden');
                 openProfileBtn.style.opacity = '1';
                 openProfileBtn.style.pointerEvents = 'auto';
             }
         });

         openProfileBtn.addEventListener('click', () => {
             if (profileCard.classList.contains('hidden')) {
                 profileCard.classList.remove('hidden');
                 openProfileBtn.style.opacity = '0';
                 openProfileBtn.style.pointerEvents = 'none';
             }
         });
     } else {
          console.warn("Open/Close button elements not found.");
     }
});



// --- About me SPEC ---
document.addEventListener('DOMContentLoaded', function() {
    const tabsContainer = document.querySelector('.about-spec-tabs');
    const contentContainer = document.querySelector('.about-spec-container');

    if (tabsContainer && contentContainer) {
        tabsContainer.addEventListener('click', function(event) {
            const clickedTab = event.target.closest('.about-spec-tabs > div[data-tab]');
            if (clickedTab) {
                const targetTabValue = clickedTab.dataset.tab;
                
                tabsContainer.querySelectorAll('div[data-tab]').forEach(tab => {
                    tab.classList.remove('active');
                });
                clickedTab.classList.add('active');
                
                contentContainer.querySelectorAll('div[data-tab]').forEach(pane => {
                    pane.classList.remove('active');
                });
                const targetContentPane = contentContainer.querySelector(`div[data-tab="${targetTabValue}"]`);
                if (targetContentPane) {
                    targetContentPane.classList.add('active');
                } else {
                    console.error(`ไม่พบ Content สำหรับ Tab: ${targetTabValue}`);
                }
            }
        });
 
    } else {
        console.error('ไม่พบ Tabs Container หรือ Content Container');
    }
});

// --- Profile Effect Animation ---
const profileEffectImage = document.getElementById('profileEffectImage');
const effectImages = [
    "https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/splash/intro.png",
    "https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/splash/loop.png"
];
let currentImageIndex = 0;
const displayTime = 3000; // 3 seconds
const delayTime = 4000;   // 5 seconds


function showImage() {
    profileEffectImage.src = effectImages[currentImageIndex];
    profileEffectImage.style.display = 'block';
    setTimeout(hideImage, displayTime);
}

function hideImage() {
    profileEffectImage.style.display = 'none';
    currentImageIndex = (currentImageIndex + 1) % effectImages.length;
    setTimeout(showImage, delayTime);
}

const initialLoadDelay = 5000; //delay firstTime
setTimeout(showImage, initialLoadDelay);



// --- 3D Interaction Effect ---
const cardToInteract = document.getElementById('discordProfile'); 

if (cardToInteract) {
    const maxTilt = 8; 

    // --- ตรรกะสำหรับเมาส์ (Desktop) ---
    function handleMouseMove(e) {
        if (!cardToInteract || cardToInteract.classList.contains('hidden')) return;

        const rect = cardToInteract.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const rotateY = maxTilt * ((mouseX / cardWidth) * 2 - 1);
        const rotateX = -maxTilt * ((mouseY / cardHeight) * 2 - 1);

        cardToInteract.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
    }

    function handleMouseLeave() {
        if (!cardToInteract) return;
        cardToInteract.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    }

    // --- ตรรกะสำหรับสัมผัส (Mobile/Touch) ---
    function handleTouchMove(e) {

        if (!cardToInteract || cardToInteract.classList.contains('hidden') || !e.touches[0]) return;

        const rect = cardToInteract.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const touchX = e.touches[0].clientX - rect.left;
        const touchY = e.touches[0].clientY - rect.top;

      
        const clampedX = Math.max(0, Math.min(touchX, cardWidth));
        const clampedY = Math.max(0, Math.min(touchY, cardHeight));

        const rotateY = maxTilt * ((clampedX / cardWidth) * 2 - 1);
        const rotateX = -maxTilt * ((clampedY / cardHeight) * 2 - 1);

        cardToInteract.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
    }

    function handleTouchEnd() {
        if (!cardToInteract) return;
 
        cardToInteract.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    }

    // --- ฟังก์ชันสำหรับเพิ่ม/ลบ Listener ทั้งหมด ---
    function addInteractionListeners() {
        // สำหรับเมาส์
        cardToInteract.addEventListener('mousemove', handleMouseMove);
        cardToInteract.addEventListener('mouseleave', handleMouseLeave);
        // สำหรับสัมผัส
        cardToInteract.addEventListener('touchmove', handleTouchMove, { passive: true }); 
        cardToInteract.addEventListener('touchend', handleTouchEnd);
        cardToInteract.addEventListener('touchcancel', handleTouchEnd);
    }

    function removeInteractionListeners() {
        // สำหรับเมาส์
        cardToInteract.removeEventListener('mousemove', handleMouseMove);
        cardToInteract.removeEventListener('mouseleave', handleMouseLeave);
        // สำหรับสัมผัส
        cardToInteract.removeEventListener('touchmove', handleTouchMove);
        cardToInteract.removeEventListener('touchend', handleTouchEnd);
        cardToInteract.removeEventListener('touchcancel', handleTouchEnd);
    }


 
    document.addEventListener('DOMContentLoaded', () => {
    
      const profileCard = cardToInteract;
      const closeProfileBtn = document.getElementById('closeProfileBtn');
      const openProfileBtn = document.getElementById('openProfileBtn');

      if (!profileCard || !closeProfileBtn || !openProfileBtn) {
        console.error("ไม่พบ Element ที่ต้องการ!");
        return;
      }

      openProfileBtn.style.opacity = '0';
      openProfileBtn.style.pointerEvents = 'none';

      if (!profileCard.classList.contains('hidden')) {
          addInteractionListeners();
      }

      // --- Event Listeners สำหรับปุ่ม ---
      closeProfileBtn.addEventListener('click', () => {
        if (!profileCard.classList.contains('hidden')) {
          profileCard.classList.add('hidden'); 
          openProfileBtn.style.opacity = '1';
          openProfileBtn.style.pointerEvents = 'auto'; 

          handleTouchEnd();
          removeInteractionListeners();
        }
      });

      openProfileBtn.addEventListener('click', () => {
        if (profileCard.classList.contains('hidden')) {
          profileCard.classList.remove('hidden');
          openProfileBtn.style.opacity = '0';
          openProfileBtn.style.pointerEvents = 'none';
          addInteractionListeners();
        }
      });
    });

} else {
    console.warn("ไม่พบ Element สำหรับ 3D effect.");
}



document.addEventListener('DOMContentLoaded', function() {

    const video = document.getElementById('bg-video');
    const speakerIcon = document.getElementById('speaker-icon');
    const volumeSlider = document.getElementById('volume-slider');

   
    if (!video || !speakerIcon || !volumeSlider) {
        console.error("ไม่พบ Element ของวิดีโอ หรือ ตัวควบคุมเสียง");
        return; 
    }

    function updateSpeakerIcon() {
        speakerIcon.classList.remove('fa-volume-xmark', 'fa-volume-off', 'fa-volume-low', 'fa-volume-high');

        if (video.muted || video.volume === 0) {
            speakerIcon.classList.add('fa-volume-xmark');
        } else if (video.volume < 0.5) {
            speakerIcon.classList.add('fa-volume-low');
        } else {
            speakerIcon.classList.add('fa-volume-high');
        }
    }

    video.volume = 0; //
    volumeSlider.value = 0; 
    updateSpeakerIcon(); 

    // --- Event Listener สำหรับ Slider ---
    volumeSlider.addEventListener('input', function() {
        video.volume = volumeSlider.value;

        if (video.volume === 0) {
            video.muted = true;
        } else {
            video.muted = false;
        }
        updateSpeakerIcon(); 
    });

    // --- Event Listener สำหรับการคลิกไอคอนลำโพง ---
    speakerIcon.addEventListener('click', function() {
        video.muted = !video.muted; 

        if (video.muted) {
            volumeSlider.value = 0;
        } else {

            if (video.volume === 0) {
                video.volume = 0.05;
            }
            volumeSlider.value = video.volume;
        }
        updateSpeakerIcon(); 
    });

  // ปุ้มเปิดปิด profile-card
    const profileCard = document.getElementById('discordProfile'); 

    const closeProfileBtn = document.getElementById('closeProfileBtn');
    const openProfileBtn = document.getElementById('openProfileBtn');
  
  
    if (!profileCard || !closeProfileBtn || !openProfileBtn) {
      console.error("ไม่พบ Element ที่ต้องการ! (profileCard, closeProfileBtn, หรือ openProfileBtn)");
      return;
    }
  
    openProfileBtn.style.opacity = '0';
    openProfileBtn.style.pointerEvents = 'none'; 
  
    closeProfileBtn.addEventListener('click', () => {
      if (!profileCard.classList.contains('hidden')) {
        profileCard.classList.add('hidden');
  
        openProfileBtn.style.opacity = '1';
        openProfileBtn.style.pointerEvents = 'auto';
      }
    });
  
    openProfileBtn.addEventListener('click', () => {
      if (profileCard.classList.contains('hidden')) {
        profileCard.classList.remove('hidden');
  
        openProfileBtn.style.opacity = '0';
        openProfileBtn.style.pointerEvents = 'none'; 
      }
    });

    



// --- effect mouse ---
const SPARKLE_THROTTLE_MS = 15;
const ANIMATION_DURATION_MS = 1500;

function createSingleSparkle(x, y) {
    const sparkle = document.createElement('span');
    sparkle.classList.add('sparkle');
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.textContent = '*';
    sparkle.style.fontSize = (Math.random() * 8 + 16) + 'px'; //ปรับขนาด

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, ANIMATION_DURATION_MS);
}

let canCreateSparkle = true;
document.addEventListener('mousemove', (event) => {
    if (canCreateSparkle) {
        createSingleSparkle(event.clientX, event.clientY);
        canCreateSparkle = false;
        setTimeout(() => {
            canCreateSparkle = true;
        }, SPARKLE_THROTTLE_MS);
    }
});




  //สภาพอากาศ
    const chiangMaiTimeElement = document.getElementById('chiangmai-time');
    const chiangMaiTempElement = document.getElementById('chiangmai-temp');
    const chiangMaiConditionElement = document.getElementById('chiangmai-condition');
    const chiangMaiIconElement = document.getElementById('chiangmai-icon');


    function updateChiangMaiTime() {
        if (chiangMaiTimeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('th-TH', {
                timeZone: 'Asia/Bangkok', 
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false 
            });
            chiangMaiTimeElement.textContent = timeString;
        }
    }

    
    function fetchChiangMaiWeather() {
        if (chiangMaiTempElement && chiangMaiConditionElement && chiangMaiIconElement) {
            // --- !!! ใส่ API Key ของคุณตรงนี้ ห้ามเอา api ของผมไปใช้นะครับ https://openweathermap.org/!!! ---
            // --- !!! Put your API Key here. Don't use my API https://openweathermap.org/!!! ---
            const apiKey = '4f5ec21320260ed91f1e1368c49b975f'; 

            if (apiKey === 'YOUR_OPENWEATHERMAP_API_KEY' || !apiKey) {
                console.warn("OpenWeatherMap API Key is missing.");
                chiangMaiTempElement.textContent = 'N/A';
                chiangMaiConditionElement.textContent = 'ไม่สามารถโหลดข้อมูลได้'; 
                chiangMaiIconElement.style.display = 'none'; 
                return; 
            }

            const lat = 18.787747; // ละติจูดเชียงใหม่
            const lon = 98.993126; // ลองจิจูดเชียงใหม่
            const units = 'metric'; 
            const lang = 'en'; 
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`; 

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    

                    // แสดงอุณหภูมิ
                    if (data.main && typeof data.main.temp !== 'undefined') {
                        const temp = Math.round(data.main.temp); // ปัดเศษอุณหภูมิ
                        chiangMaiTempElement.textContent = temp;
                    } else {
                        chiangMaiTempElement.textContent = 'N/A';
                    }

                    // --- แสดงสภาพอากาศและไอคอน ---
                    if (data.weather && data.weather.length > 0) {
                        const conditionData = data.weather[0]; 
                        const conditionDescription = conditionData.description; 
                        const iconCode = conditionData.icon;

                        chiangMaiConditionElement.textContent = conditionDescription; 

                        
                        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                        chiangMaiIconElement.src = iconUrl;
                        chiangMaiIconElement.alt = conditionDescription;
                        chiangMaiIconElement.style.display = 'inline-block'; 

                    } else {
                        chiangMaiConditionElement.textContent = 'N/A';
                        chiangMaiIconElement.style.display = 'none';
                    }

                })
                .catch(error => {
                    console.error("Error fetching Chiang Mai weather:", error);
                    chiangMaiTempElement.textContent = 'Error';
                    chiangMaiConditionElement.textContent = 'โหลดผิดพลาด Error'; 
                    chiangMaiIconElement.style.display = 'none';
                });
        } else {
            console.warn("One or more weather display elements are missing.");
        }
    }

 
    updateChiangMaiTime();
    setInterval(updateChiangMaiTime, 1000);

 
    fetchChiangMaiWeather();
    setInterval(fetchChiangMaiWeather, 600000);
});
