// --- DEĞİŞKENLER VE AYARLAR ---
let currentLang = 'tr';
let currentTheme = 'dark';
let currentCam = 1;
let monsterCam = 5; // Yaratık 5. kameradan başlar
let gameLoopInterval;

const dictionary = {
    tr: {
        title: "KARANLIK VARDİYA", play: "Oyna", settings: "Ayarlar",
        theme: "Tema: ", dark: "Karanlık", blood: "Kan Kırmızı",
        lang: "Dil: Türkçe", back: "Geri Dön",
        camPrefix: "Kamera ", exit: "Çıkış",
        monster: "👀 YARATIK BURADA!", jumpscare: "OYUN BİTTİ!"
    },
    en: {
        title: "DARK SHIFT", play: "Play", settings: "Settings",
        theme: "Theme: ", dark: "Dark", blood: "Blood Red",
        lang: "Language: English", back: "Go Back",
        camPrefix: "Camera ", exit: "Exit",
        monster: "👀 MONSTER IS HERE!", jumpscare: "GAME OVER!"
    }
};

// --- EKRAN KONTROLLERİ ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

function showMenu() { 
    clearInterval(gameLoopInterval); // Oyundan çıkarsa yaratığı durdur
    showScreen('menu-screen'); 
}
function showSettings() { showScreen('settings-screen'); }

// --- DİL VE TEMA SİSTEMİ ---
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'blood' : 'dark';
    document.body.className = `theme-${currentTheme}`;
    updateUI();
}

function toggleLang() {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    updateUI();
}

function updateUI() {
    const t = dictionary[currentLang];
    document.getElementById('title-text').innerText = t.title;
    document.getElementById('btn-play').innerText = t.play;
    document.getElementById('btn-settings').innerText = t.settings;
    document.getElementById('settings-title').innerText = t.settings;
    
    let themeName = currentTheme === 'dark' ? t.dark : t.blood;
    document.getElementById('btn-theme').innerText = t.theme + themeName;
    document.getElementById('btn-lang').innerText = t.lang;
    document.getElementById('btn-back').innerText = t.back;
    document.getElementById('btn-exit').innerText = t.exit;
    document.getElementById('jumpscare-text').innerText = t.jumpscare;
    document.getElementById('monster-warning').innerText = t.monster;
    document.getElementById('cam-text').innerText = `${t.camPrefix} ${currentCam}`;
}

// --- OYUN MEKANİKLERİ ---
function startGame() {
    monsterCam = 5; // Yaratığı sıfırla
    changeCam(1);   // Oyuncuyu ofise (Cam 1) al
    showScreen('game-screen');
    
    // Yaratık yapay zekası (Her 2 saniyede bir tetiklenir)
    gameLoopInterval = setInterval(monsterLogic, 2000);
}

function changeCam(camNum) {
    currentCam = camNum;
    document.getElementById('cam-text').innerText = `${dictionary[currentLang].camPrefix} ${camNum}`;
    checkCameras();
}

function monsterLogic() {
    // Yaratık %30 ihtimalle sana doğru (Kamera 1'e) yaklaşır
    if (Math.random() < 0.3 && monsterCam > 1) {
        monsterCam--;
    }

    // Eğer yaratık Kamera 1'de (Ofis) ise ve sen Kamera 1'e bakmıyorsan JUMPSCARE!
    if (monsterCam === 1 && currentCam !== 1) {
        triggerJumpscare();
    }
    
    checkCameras();
}

function checkCameras() {
    const warning = document.getElementById('monster-warning');
    // Baktığın kamerada yaratık varsa uyar
    if (currentCam === monsterCam) {
        warning.classList.remove('hidden');
    } else {
        warning.classList.add('hidden');
    }
}

function triggerJumpscare() {
    clearInterval(gameLoopInterval);
    showScreen('jumpscare-screen');
    
    // 3 Saniye sonra menüye dön
    setTimeout(() => {
        showMenu();
    }, 3000);
}

// Başlangıçta metinleri ayarla
updateUI();
