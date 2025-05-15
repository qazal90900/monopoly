// انتقال به صفحه انتخاب حالت
function goToSelectMode() {
    window.location.href = "select-mode.html";
}

// بازگشت به صفحه شروع
function goBack() {
    window.location.href = "index.html";
}

// شروع بازی بر اساس حالت انتخاب‌شده
function startGame(mode) {
    if (mode === "online") {
        window.location.href = "online-match.html";
    } else if (mode === "single") {
        window.location.href = "select-board.html"; // انتقال به صفحه انتخاب صفحه برای تک‌نفره
    } else {
        alert(`حالت ${mode} انتخاب شد! بازی شروع می‌شود.`);
        window.location.href = "board-image.html"; // انتقال به صفحه تصویر برای حالت‌های دیگر
    }
}

// انتخاب صفحه بازی
let selectedBoard = null;

function selectBoard(board) {
    selectedBoard = board;
    const cards = document.querySelectorAll('.board-card');
    cards.forEach(card => card.classList.remove('selected'));
    document.querySelector(`.board-card[onclick="selectBoard('${board}')"]`).classList.add('selected');
}

function startGameWithBoard() {
    if (selectedBoard) {
        // ذخیره صفحه انتخاب‌شده در localStorage
        localStorage.setItem("selectedBoard", selectedBoard);
        window.location.href = "board-image.html"; // انتقال به صفحه تصویر
    } else {
        alert("لطفاً یک صفحه انتخاب کنید!");
    }
}

// منطق پیدا کردن حریف آنلاین
let opponentFound = false;
const opponentNames = ["علی", "محمد", "رضا", "سارا", "نازنین", "حامد"];

function findOpponent() {
    const matchMessage = document.getElementById("match-message");
    const startMatchBtn = document.getElementById("start-match-btn");
    const opponentImage = document.getElementById("opponent-image");

    if (!opponentFound) {
        matchMessage.textContent = "در حال پیدا کردن حریف هستیم...";
        setTimeout(() => {
            opponentFound = true;
            const randomOpponent = opponentNames[Math.floor(Math.random() * opponentNames.length)];
            matchMessage.textContent = `حریف یافت شد: ${randomOpponent}`;
            opponentImage.style.display = "block";
            startMatchBtn.style.display = "block";
            localStorage.setItem("opponentName", randomOpponent);
        }, 2000);
    }
}

// اجرای توابع هنگام لود صفحه
window.onload = function() {
    if (window.location.href.includes("online-match.html")) {
        findOpponent();
        setInterval(findOpponent, 2000);
    } else if (window.location.href.includes("board-image.html")) {
        initializeGame(); // مقداردهی اولیه بازی
    } else if (window.location.href.includes("game.html")) {
        initializeGame();
    }
};

// شروع بازی آنلاین بعد از پیدا کردن حریف
function startOnlineGame() {
    const loginForm = document.createElement("div");
    loginForm.className = "login-overlay";
    loginForm.innerHTML = `
        <div class="login-box">
            <h2>ورود به حساب</h2>
            <p>برای بازی آنلاین باید حساب کاربری داشته باشید!</p>
            <button class="close-btn" onclick="closeLogin()">بستن</button>
            <button class="signup-btn" onclick="showSignupForm()">ایجاد حساب</button>
        </div>
    `;
    document.body.appendChild(loginForm);
}

// بستن فرم لاگین و بازگشت به صفحه قبلی
function closeLogin() {
    const loginForm = document.querySelector(".login-overlay");
    if (loginForm) loginForm.remove();
    window.history.back();
}

// نمایش فرم ساخت حساب
function showSignupForm() {
    const signupForm = document.createElement("div");
    signupForm.className = "login-overlay";
    signupForm.innerHTML = `
        <div class="signup-box">
            <h2>ایجاد حساب جدید</h2>
            <div class="signup-form">
                <input type="text" id="name" placeholder="نام" required>
                <input type="email" id="email" placeholder="ایمیل" required>
                <input type="password" id="password" placeholder="پسورد" required>
                <button class="submit-btn" onclick="submitSignup()">ثبت‌نام</button>
                <button class="close-btn" onclick="closeSignup()">بستن</button>
            </div>
        </div>
    `;
    document.body.appendChild(signupForm);
}

// بستن فرم ساخت حساب
function closeSignup() {
    const signupForm = document.querySelector(".login-overlay");
    if (signupForm) signupForm.remove();
}

// ثبت‌نام و نمایش صفحه خوش‌آمدگویی
function submitSignup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (name && email && password) {
        const userData = { name, email, password, wins: 0, losses: 0, level: 0 };
        localStorage.setItem("userData", JSON.stringify(userData));
        closeSignup();
        showWelcomeScreen();
    } else {
        alert("لطفاً تمام فیلدها را پر کنید!");
    }
}

// نمایش صفحه خوش‌آمدگویی
function showWelcomeScreen() {
    const welcomeScreen = document.createElement("div");
    welcomeScreen.className = "login-overlay";
    welcomeScreen.innerHTML = `
        <div class="welcome-box">
            <h2>Welcome to MONOPOLY!</h2>
            <p>Move around the board and buy property that will earn you rent when other players land on it. Trade with other players to get colour sets so you can build houses and hotels for increased rent. Bankrupt every other player to win!</p>
            <img src="monopoly-character.png" alt="Monopoly Character" style="display: none;">
            <button class="ok-btn" onclick="closeWelcome()">OK</button>
        </div>
    `;
    document.body.appendChild(welcomeScreen);
}

// بستن صفحه خوش‌آمدگویی و انتقال به صفحه بازی
function closeWelcome() {
    const welcomeScreen = document.querySelector(".login-overlay");
    if (welcomeScreen) welcomeScreen.remove();
    window.location.href = "board-image.html";
}

// باز و بسته کردن منوی همبرگری
function toggleMenu() {
    const menu = document.getElementById("hamburgerMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// نمایش پروفایل
function showProfile() {
    const userData = JSON.parse(localStorage.getItem("userData")) || {
        name: "کاربر ناشناس",
        email: "ایمیل ثبت نشده",
        password: "*****",
        wins: 0,
        losses: 0,
        level: 0
    };

    const profileOverlay = document.createElement("div");
    profileOverlay.className = "profile-overlay";
    profileOverlay.innerHTML = `
        <div class="profile-box">
            <h2>پروفایل من</h2>
            <div class="info">👤 نام: <span>${userData.name}</span></div>
            <div class="info">📧 ایمیل: <span>${userData.email}</span></div>
            <div class="info">🔒 پسورد: <span>${userData.password}</span></div>
            <div class="stats">🏆 تعداد برد: <span>${userData.wins}</span></div>
            <div class="stats">❌ تعداد باخت: <span>${userData.losses}</span></div>
            <div class="stats">⭐ سطح: <span>${userData.level}</span></div>
            <button class="edit-btn" onclick="showEditProfile()">ویرایش پروفایل</button>
            <button class="close-btn" onclick="closeProfile()">بستن</button>
        </div>
    `;
    document.body.appendChild(profileOverlay);
    toggleMenu();
}

// بستن صفحه پروفایل
function closeProfile() {
    const profileOverlay = document.querySelector(".profile-overlay");
    if (profileOverlay) profileOverlay.remove();
}

// نمایش فرم ویرایش پروفایل
function showEditProfile() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    closeProfile();

    const editOverlay = document.createElement("div");
    editOverlay.className = "profile-overlay";
    editOverlay.innerHTML = `
        <div class="edit-profile-box">
            <h2>ویرایش پروفایل</h2>
            <div class="edit-form">
                <input type="text" id="edit-name" value="${userData.name}" placeholder="نام" required>
                <input type="email" id="edit-email" value="${userData.email}" placeholder="ایمیل" required>
                <input type="password" id="edit-password" value="${userData.password}" placeholder="پسورد" required>
                <button class="save-btn" onclick="saveProfile()">ذخیره</button>
                <button class="cancel-btn" onclick="closeEditProfile()">لغو</button>
            </div>
        </div>
    `;
    document.body.appendChild(editOverlay);
}

// ذخیره تغییرات پروفایل
function saveProfile() {
    const name = document.getElementById("edit-name").value;
    const email = document.getElementById("edit-email").value;
    const password = document.getElementById("edit-password").value;

    if (name && email && password) {
        const userData = JSON.parse(localStorage.getItem("userData"));
        userData.name = name;
        userData.email = email;
        userData.password = password;
        localStorage.setItem("userData", JSON.stringify(userData));
        closeEditProfile();
        showProfile();
    } else {
        alert("لطفاً تمام فیلدها را پر کنید!");
    }
}

// بستن فرم ویرایش پروفایل
function closeEditProfile() {
    const editOverlay = document.querySelector(".profile-overlay");
    if (editOverlay) editOverlay.remove();
}

// خروج از بازی
function exitGame() {
    if (confirm("آیا مطمئن هستید که می‌خواهید از بازی خارج شوید؟")) {
        window.history.back();
    }
}

// ادامه بازی
function continueGame() {
    toggleMenu();
}

// تنظیمات صدا
let isSoundOn = true;

function soundSettings() {
    const audio = document.getElementById("background-audio");
    const soundIcon = document.getElementById("sound-icon");

    isSoundOn = !isSoundOn;
    if (isSoundOn) {
        audio.play();
        soundIcon.textContent = "🔊";
        soundIcon.classList.remove("muted");
    } else {
        audio.pause();
        soundIcon.textContent = "🔇";
        soundIcon.classList.add("muted");
    }
    toggleMenu();
}

// متغیرهای مربوط به بازی تاس
let isPlayerTurn = true;
let opponentName = "کامپیوتر";

// مقداردهی اولیه بازی
function initializeGame() {
    const userData = JSON.parse(localStorage.getItem("userData")) || { name: "کاربر ناشناس" };
    const playerName = userData.name;

    document.getElementById("current-turn").textContent = `نوبت: ${playerName}`;
}

// پرتاب تاس
function rollDice() {
    const userData = JSON.parse(localStorage.getItem("userData")) || { name: "کاربر ناشناس" };
    const playerName = userData.name;

    // تولید عدد رندوم بین 1 تا 6
    const randomNum = Math.floor(Math.random() * 6) + 1; // 1 تا 6
    document.getElementById("dice-result").textContent = `نتیجه تاس: ${randomNum}`;
    alert(`شما عدد ${randomNum} آوردید!`);

    if (isPlayerTurn) {
        isPlayerTurn = false;
        document.getElementById("current-turn").textContent = `نوبت: ${opponentName}`;
        // تاس برای کامپیوتر بعد از 1 ثانیه
        setTimeout(() => {
            const opponentRoll = Math.floor(Math.random() * 6) + 1; // 1 تا 6
            document.getElementById("dice-result").textContent = `نتیجه تاس: ${opponentRoll}`;
            alert(`کامپیوتر عدد ${opponentRoll} آورد!`);
            isPlayerTurn = true;
            document.getElementById("current-turn").textContent = `نوبت: ${playerName}`;
        }, 1000);
    }
}