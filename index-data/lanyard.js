
//    #   #    ###   #####  #####   ###   ####    ###   #####   ###    ###   ######    #
//    ##  #   #   #    #      #    #   #  #   #  #   #    #    #   #  #   #       #   ##
//    # # #   #####    #      #    #####  ####   #####    #      #     ###       #     #
//    #  ##   #   #    #      #    #   #  #      #   #    #     #     #   #     #      #
//    #   #   #   #    #      #    #   #  #      #   #    #    #####   ###     #     #####  


// --- Configuration ---
const DISCORD_USER_ID = '1007237437627572275'; // <<-- UID DISCORD ของคุณ
const LANYARD_WEBSOCKET_URL = 'wss://api.lanyard.rest/socket';

// --- Variables for State Management ---
let lanyardSocket = null;
let heartbeatTimer = null;
let initialDataReceived = false;
let allActivities = []; 
let currentActivityIndex = 0; 
let activityIntervalId = null;
let timeUpdateIntervalId = null;

// --- DOM Elements References  ---
const profileLinkElement = document.getElementById('profileLink');
const avatarElement = document.getElementById('avatar');
const statusIndicatorElement = document.getElementById('statusIndicator');
const desktopStatusBadgeElement = document.getElementById('desktopStatusBadge');
const mobileStatusBadgeElement = document.getElementById('mobileStatusBadge');
const displayNameElement = document.getElementById('displayName');
const usernameElement = document.getElementById('username');
const customStatusElement = document.getElementById('customStatus');
// Activity Elements
const activitySection = document.getElementById('activity');
const activityContentWrapper = document.getElementById('activity');
const activityVisualsElement = document.querySelector('#activity .activity-visuals');
const activityLargeImageElement = document.getElementById('activityLargeImage');
const activitySmallImageElement = document.getElementById('activitySmallImage');
const activitySmallImageWrapper = document.querySelector('#activity .activity-small-image-wrapper');
const activitySmallImageTooltipElement = document.querySelector('#activity .activity-small-image-tooltip');
const activityTypeElement = document.getElementById('activityType');
const activityTitleElement = document.getElementById('activityTitle');
const activityDetailsElement = document.getElementById('activityDetails');
const activityStateElement = document.getElementById('activityState');
const activityTimeElement = document.getElementById('activityTime');
const paginationContainer = document.getElementById('activity-pagination');

// --- Helper Functions ---
function getActivityTypeString(type) {
    switch (type) {
        case 0: return 'Playing';
        case 1: return 'Streaming';
        case 2: return 'Listening to';
        case 3: return 'Watching';
        case 5: return 'Competing in';
        default: return '';
    }
}

// *** ฟังก์ชัน formatDuration ***
function formatDuration(startTs) {
    if (!startTs) return '';
    const now = Date.now();
    let totalSeconds = Math.floor((now - startTs) / 1000);
    if (totalSeconds < 0) totalSeconds = 0;

    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    if (hours > 0) {
        const paddedHours = String(hours).padStart(2, '0');
        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    } else {
        return `${paddedMinutes}:${paddedSeconds}`;
    }
}

function updateElapsedTime() {
    if (activityTimeElement && allActivities && allActivities.length > 0 && currentActivityIndex < allActivities.length) {
         const currentActivity = allActivities[currentActivityIndex];
         if (currentActivity?.timestamps?.start) {
             const formattedTime = formatDuration(currentActivity.timestamps.start);
             activityTimeElement.textContent = formattedTime ? `${formattedTime} passed` : '';
         } else {
             activityTimeElement.textContent = '';
         }
    } else if (activityTimeElement) {
        activityTimeElement.textContent = '';
    }
}

// --- Activity Image Update Function  ---
 function updateActivityImages(activity) {
    const assets = activity?.assets;
    const appId = activity?.application_id;
    let hasVisibleAsset = false;

    if (activityLargeImageElement) {
        activityLargeImageElement.style.display = 'none'; activityLargeImageElement.src = ''; activityLargeImageElement.alt = '';
    }
    if (activitySmallImageElement) {
        activitySmallImageElement.style.display = 'none'; activitySmallImageElement.src = ''; activitySmallImageElement.alt = '';
    }
    if (activitySmallImageTooltipElement) activitySmallImageTooltipElement.textContent = '';

    if (activityLargeImageElement && assets?.large_image) {
        let largeImageUrl = '';
        if (assets.large_image.startsWith('mp:external')) {
            largeImageUrl = `https://media.discordapp.net/${assets.large_image.replace("mp:", "")}`;
        } else if (assets.large_image.startsWith('spotify:')) {
            largeImageUrl = `https://i.scdn.co/image/${assets.large_image.split(':')[1]}`;
        } else if (appId) {
            largeImageUrl = `https://cdn.discordapp.com/app-assets/${appId}/${assets.large_image}.png`;
        }
        if (largeImageUrl) {
             activityLargeImageElement.src = largeImageUrl;
             activityLargeImageElement.alt = assets.large_text || activity.name || '';
             activityLargeImageElement.style.display = 'block';
             hasVisibleAsset = true;
        }
    }

    if (activitySmallImageElement && assets?.small_image) {
         let smallImageUrl = '';
         if (assets.small_image.startsWith('mp:external')) {
             smallImageUrl = `https://media.discordapp.net/${assets.small_image.replace("mp:", "")}`;
         } else if (assets.small_image.startsWith('spotify:')) {
             smallImageUrl = `https://i.scdn.co/image/${assets.small_image.split(':')[1]}`;
         } else if (appId) {
             smallImageUrl = `https://cdn.discordapp.com/app-assets/${appId}/${assets.small_image}.png`;
         }
         if (smallImageUrl) {
              activitySmallImageElement.src = smallImageUrl;
              activitySmallImageElement.alt = assets.small_text || '';
              activitySmallImageElement.style.display = 'block';
              if (activitySmallImageTooltipElement) activitySmallImageTooltipElement.textContent = assets.small_text || '';
              hasVisibleAsset = true;
         }
    }

     if (activityVisualsElement) {
         activityVisualsElement.style.display = hasVisibleAsset ? 'block' : 'none';
     } else { /* console.warn("Activity visuals container not found"); */ }
 }


// --- Function to display the current activity ---
function displayActivity(index) {
    if (!activitySection || !activityContentWrapper) {
        console.error("Activity container elements not found!");
        return;
    }
    if (!allActivities || allActivities.length === 0 || index >= allActivities.length) {
        activitySection.style.display = 'none';
        if (paginationContainer) paginationContainer.innerHTML = '';
        if (timeUpdateIntervalId) clearInterval(timeUpdateIntervalId);
        timeUpdateIntervalId = null;
        return;
    }

    activitySection.style.display = 'flex';

    const activity = allActivities[index];

    activityContentWrapper.style.opacity = 0;

    setTimeout(() => {
        // Update text content
        const activityTypeString = getActivityTypeString(activity.type);
        if (activityTypeElement) activityTypeElement.textContent = activityTypeString;
        if (activityTitleElement) {
             activityTitleElement.innerHTML = '';
             const titleText = activity.name || '';


             if (activity.type === 1 && activity.url) {
                 const linkElement = document.createElement('a');
                 linkElement.href = activity.url;
                 linkElement.target = '_blank';
                 linkElement.rel = 'noopener noreferrer';
                 linkElement.textContent = titleText;
                 linkElement.style.color = 'inherit'; 
                 linkElement.style.textDecoration = 'none';
                 linkElement.onmouseover = () => linkElement.style.textDecoration = 'underline';
                 linkElement.onmouseout = () => linkElement.style.textDecoration = 'none';
                 linkElement.style.cursor = "url('index-data/asset/cursor-pointer.png'), pointer";
                 activityTitleElement.appendChild(linkElement);
             } else {
                 activityTitleElement.textContent = titleText;
             }
        }
        if (activityStateElement) activityStateElement.textContent = activity.state || ''; 


        if (activityDetailsElement) {
            activityDetailsElement.innerHTML = '';
            const detailText = activity.details || null;

            if (detailText && activity.type !== 1) { 
                const searchQuery = encodeURIComponent(`${activity.name || ''} ${detailText}`);
                const searchUrl = `https://www.google.com/search?q=${searchQuery}`; // Using Google search as fallback

                const linkElement = document.createElement('a');
                linkElement.href = searchUrl;
                linkElement.target = '_blank';
                linkElement.rel = 'noopener noreferrer';
                linkElement.textContent = detailText;
                linkElement.style.color = 'inherit';
                linkElement.style.textDecoration = 'none';
                linkElement.onmouseover = () => linkElement.style.textDecoration = 'underline';
                linkElement.onmouseout = () => linkElement.style.textDecoration = 'none';
                linkElement.style.cursor = "url('index-data/asset/cursor-pointer.png'), pointer";

                activityDetailsElement.appendChild(linkElement);
            } else {
                // For streaming details (game name) or empty details, just show text
                 activityDetailsElement.textContent = detailText || '';
            }
        }

        // Update images
        updateActivityImages(activity);

        // Update elapsed time display
        updateElapsedTime();

        // Update pagination dots
        updatePaginationDots(index);

        // Fade in new content
        activityContentWrapper.style.opacity = 1;
    }, FADE_TRANSITION_MS); 
}
const FADE_TRANSITION_MS = 300;

// --- Functions for pagination dots ---
function createPaginationDots(count) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';
    if (count > 1) {
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('span');
            dot.classList.add('activity-dot');
            dot.dataset.index = i;
            paginationContainer.appendChild(dot);
        }
    }
}

function updatePaginationDots(activeIndex) {
    if (!paginationContainer) return;
    const dots = paginationContainer.querySelectorAll('.activity-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

// --- Function to start/stop/update the activity cycling ---
function startOrUpdateActivityCycle(activities) {
    const ACTIVITY_CYCLE_INTERVAL_MS = 6000; 
    if (activityIntervalId) clearInterval(activityIntervalId);
    if (timeUpdateIntervalId) clearInterval(timeUpdateIntervalId);
    activityIntervalId = null;
    timeUpdateIntervalId = null;
    allActivities = activities ? activities.filter(act => act.type !== 4) : [];
    currentActivityIndex = 0;

    createPaginationDots(allActivities.length); 

    if (allActivities.length > 0) {
        displayActivity(0); 

         if (allActivities[0]?.timestamps?.start) {
             timeUpdateIntervalId = setInterval(updateElapsedTime, 1000);
         }

        if (allActivities.length > 1) {
            activityIntervalId = setInterval(() => {
                currentActivityIndex = (currentActivityIndex + 1) % allActivities.length;
                displayActivity(currentActivityIndex); 

                 if (timeUpdateIntervalId) clearInterval(timeUpdateIntervalId); 
                 if(allActivities[currentActivityIndex]?.timestamps?.start){
                     timeUpdateIntervalId = setInterval(updateElapsedTime, 1000); 
                 } else {
                     timeUpdateIntervalId = null; 
                     if(activityTimeElement) activityTimeElement.textContent = ''; 
                 }
            }, ACTIVITY_CYCLE_INTERVAL_MS);
        }
    } else {
        if (activitySection) activitySection.style.display = 'none';
         if (paginationContainer) paginationContainer.innerHTML = '';
    }

}


// --- Main UI Update Function called by WebSocket ---
function updateUI(data) {
     if (!data || !data.discord_user) {
         if (activitySection) activitySection.style.display = 'none';
         if (paginationContainer) paginationContainer.innerHTML = '';
         if (displayNameElement) displayNameElement.innerHTML = `<span class="loading-placeholder" style="min-width: 100px;">Offline</span>`;
         if (usernameElement) usernameElement.textContent = '';
         if (customStatusElement) customStatusElement.innerHTML = '';
         if (avatarElement) avatarElement.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
         if (statusIndicatorElement) statusIndicatorElement.className = 'status-indicator status-offline';
         if (desktopStatusBadgeElement) desktopStatusBadgeElement.style.display = 'none';
         if (mobileStatusBadgeElement) mobileStatusBadgeElement.style.display = 'none';
         return;
     }

    // --- ส่วนอัปเดต Avatar, Status, Names, Custom Status ---
    const user = data.discord_user;
    const avatarHash = user.avatar;
    let avatarUrl;

    if (avatarHash) {
        const format = avatarHash.startsWith('a_') ? 'gif' : 'png';
        avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${avatarHash}.${format}?size=128`;
    } else {
        const discriminator = user.discriminator;
        const usernameForIndex = user.username || 'default';
        const index = (!discriminator || discriminator === '0')
          ? ( (usernameForIndex.charCodeAt(usernameForIndex.length - 1)) % 5)
          : (parseInt(discriminator) % 5);
        avatarUrl = `https://cdn.discordapp.com/embed/avatars/${index}.png`;
    }

    if (avatarElement) {
        avatarElement.src = avatarUrl;
        avatarElement.alt = user.username;
    } else { console.warn("Avatar element not found"); }

    if (statusIndicatorElement) { 
        let finalStatusClass = 'offline';
        let finalStatusText = 'Offline';

        if (data.discord_status) { 
            finalStatusClass = data.discord_status; 
            finalStatusText = data.discord_status.charAt(0).toUpperCase() + data.discord_status.slice(1);

            if (data.discord_status !== 'offline') {
                const isStreaming = data.activities?.some(act => act.type === 1); 

                if (isStreaming) {
                    finalStatusClass = 'streaming';
                    finalStatusText = 'Streaming'; 
                }
            }
        }

        statusIndicatorElement.className = `status-indicator status-${finalStatusClass}`;
        const statusTooltipSpan = statusIndicatorElement.querySelector('.status-tooltip');
        if (statusTooltipSpan) {
            statusTooltipSpan.textContent = finalStatusText;
        }

    } else {
        /* console.warn("Status indicator element not found"); */
    }

     if (profileLinkElement) profileLinkElement.href = `https://discord.com/users/${user.id}`; else { /* console.warn("Profile link element not found"); */ }
     if (displayNameElement) displayNameElement.textContent = user.display_name || user.username; else { /* console.warn("Display name element not found"); */ }

     if (usernameElement) {
         const currentUsernameText = usernameElement.childNodes[0]?.nodeValue?.trim();
          if(currentUsernameText !== user.username){
              usernameElement.textContent = user.username;
          }
     } else { /* console.warn("Username element not found"); */ }

     // Update Custom Status
     const customActivity = data.activities?.find(act => act.type === 4);
     let statusText = '';
     let customEmojiHtml = '';
     if (customActivity) {
          if (customActivity.emoji) {
               if (customActivity.emoji.id) {
                   const emojiUrl = `https://cdn.discordapp.com/emojis/${customActivity.emoji.id}.${customActivity.emoji.animated ? 'gif' : 'png'}?size=44`;
                   customEmojiHtml = `<img src="${emojiUrl}" alt="${customActivity.emoji.name || ''}" style="width: 1.1em; height: 1.1em; vertical-align: middle; margin-right: 4px;">`;
               } else if (customActivity.emoji.name) {
                    customEmojiHtml = `<span style="font-size: 1.1em; vertical-align: middle; margin-right: 4px;">${customActivity.emoji.name}</span>`;
               }
          }
          if (customActivity.state) statusText += customActivity.state;
     }
     if (customStatusElement) {
         customStatusElement.innerHTML = `${customEmojiHtml}<span class="status-text-content">${statusText || ''}</span>`;
         customStatusElement.style.display = (statusText || customEmojiHtml) ? 'block' : 'none';
     } else { /* console.warn("Custom status element not found"); */ }

     // Update Device Status Badges
     if (desktopStatusBadgeElement) desktopStatusBadgeElement.style.display = data.active_on_discord_desktop ? 'inline-block' : 'none'; else { /* console.warn("Desktop status badge element not found"); */ }
     if (mobileStatusBadgeElement) mobileStatusBadgeElement.style.display = data.active_on_discord_mobile ? 'inline-block' : 'none'; else { /* console.warn("Mobile status badge element not found"); */ }


    // --- เรียกใช้ฟังก์ชันจัดการ Activity Cycle ---
    startOrUpdateActivityCycle(data.activities);

} 

// --- Lanyard WebSocket Connection Logic ---
function connectWebSocket() {
    if (lanyardSocket && (lanyardSocket.readyState === WebSocket.OPEN || lanyardSocket.readyState === WebSocket.CONNECTING)) {
        console.log("[Lanyard WS] Already connected or connecting.");
        return;
    }
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    initialDataReceived = false;

    if (displayNameElement) displayNameElement.innerHTML = `<span class="loading-placeholder" style="min-width: 100px;">Connecting...</span>`;
    if (usernameElement) usernameElement.innerHTML = `<span class="loading-placeholder" style="width: 30%"></span>`;
    if (activitySection) activitySection.style.display = 'none';
    if (paginationContainer) paginationContainer.innerHTML = '';


    console.log("[Lanyard WS] Attempting to connect...");
    lanyardSocket = new WebSocket(LANYARD_WEBSOCKET_URL);

    lanyardSocket.onopen = () => {
        console.log("[Lanyard WS] Connection established.");
        lanyardSocket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_USER_ID } }));
    };

    lanyardSocket.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);
            switch (message.op) {
                case 0: // Event Dispatch
                     if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
                         const presenceData = message.d;
                          if(message.t === 'INIT_STATE' && !initialDataReceived) {
                              console.log("[Lanyard WS] Received INIT_STATE");
                              initialDataReceived = true;
                               updateUI(presenceData);
                          } else if (message.t === 'PRESENCE_UPDATE') {
                               updateUI(presenceData);
                          }
                     }
                    break;
                case 1: // Hello
                    console.log("[Lanyard WS] Received HELLO, starting heartbeat.");
                     const heartbeatInterval = message.d.heartbeat_interval;
                    if (heartbeatTimer) clearInterval(heartbeatTimer);
                    if (lanyardSocket.readyState === WebSocket.OPEN) lanyardSocket.send(JSON.stringify({ op: 3 })); // Send first HB
                     heartbeatTimer = setInterval(() => {
                        if (lanyardSocket.readyState === WebSocket.OPEN) lanyardSocket.send(JSON.stringify({ op: 3 }));
                     }, heartbeatInterval);
                    break;
                default: break; // Ignore other OPs
            }
        } catch (e) {
             console.error("[Lanyard WS] Error processing message:", e, "Raw data:", event.data);
        }
    };

    

    lanyardSocket.onerror = (error) => {
        console.error("[Lanyard WS] WebSocket Error:", error);
        if (displayNameElement) displayNameElement.textContent = 'Connection Error';
        if (usernameElement) usernameElement.textContent = '';
        startOrUpdateActivityCycle([]);
    };

    lanyardSocket.onclose = (event) => {
        console.log("[Lanyard WS] Connection closed:", event.code, event.reason);
        if (heartbeatTimer) clearInterval(heartbeatTimer);
        if (activityIntervalId) clearInterval(activityIntervalId);
        if (timeUpdateIntervalId) clearInterval(timeUpdateIntervalId);
        startOrUpdateActivityCycle([]);

        if (event.code !== 1000 && event.code !== 1005 ) {
             console.log(`[Lanyard WS] Attempting to reconnect in 5 seconds (Code: ${event.code})...`);
             setTimeout(connectWebSocket, 5000);
        } else {
             if (displayNameElement) displayNameElement.innerHTML = `<span class="loading-placeholder">Offline</span>`;
              if (usernameElement) usernameElement.textContent = '';
              if (statusIndicatorElement) statusIndicatorElement.className = 'status-indicator status-offline';
        }
    };
}



 // --- Initial Setup on DOMContentLoaded ---
 document.addEventListener('DOMContentLoaded', () => {
     if (profileLinkElement && DISCORD_USER_ID !== 'YOUR_DISCORD_USER_ID') {
         profileLinkElement.href = `https://discord.com/users/${DISCORD_USER_ID}`;
     }

     if (DISCORD_USER_ID && DISCORD_USER_ID !== 'YOUR_DISCORD_USER_ID') {
          connectWebSocket();
     } else {
          console.error("SET DISCORD_USER_ID in lanyard.js");
          if (displayNameElement) displayNameElement.textContent = 'Error: Config';
          if (usernameElement) usernameElement.textContent = 'Check lanyard.js';
     }




if (paginationContainer) {
    const ACTIVITY_CYCLE_INTERVAL_MS = 5000; 
    paginationContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('activity-dot') && event.target.dataset.index !== undefined) {
            const clickedIndex = parseInt(event.target.dataset.index, 10);
            if (!isNaN(clickedIndex) && clickedIndex !== currentActivityIndex && clickedIndex < allActivities.length) {
                currentActivityIndex = clickedIndex; 
                displayActivity(currentActivityIndex); 
                if (activityIntervalId) {
                    clearInterval(activityIntervalId);
                    activityIntervalId = null;
                }
                if (timeUpdateIntervalId) {
                    clearInterval(timeUpdateIntervalId);
                    timeUpdateIntervalId = null; 
                }
                if (allActivities[currentActivityIndex]?.timestamps?.start) {
                    timeUpdateIntervalId = setInterval(updateElapsedTime, 1000);
                } else {
                    if(activityTimeElement) activityTimeElement.textContent = '';
                }
                if (allActivities.length > 1) {
                    activityIntervalId = setInterval(() => {
                        currentActivityIndex = (currentActivityIndex + 1) % allActivities.length;
                        displayActivity(currentActivityIndex);
                        
                        if (timeUpdateIntervalId) clearInterval(timeUpdateIntervalId); 
                        if(allActivities[currentActivityIndex]?.timestamps?.start){
                            timeUpdateIntervalId = setInterval(updateElapsedTime, 1000);
                        } else {
                            timeUpdateIntervalId = null;
                            if(activityTimeElement) activityTimeElement.textContent = '';
                        }
                    }, ACTIVITY_CYCLE_INTERVAL_MS);
                }
            }
        }
    });

    try {
        const dots = document.querySelectorAll('.activity-dot');
        if (dots.length > 0) {
            dots.forEach(dot => {
                dot.style.cursor = "url('asset/cursor-pointer.png'), pointer";
            });
            console.log(`Applied custom cursor style to ${dots.length} activity dots via JS.`);
        } else {
            console.warn("Could not find any '.activity-dot' elements to apply cursor style via JS.");
        }
    
    } catch (error) {
        console.error("Error applying custom cursor style via JavaScript:", error);
    }

} else {
    console.warn("Pagination container (#activity-pagination) not found, cannot add click listener.");
}
 });