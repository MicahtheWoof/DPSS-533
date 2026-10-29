// 把 Firebase 專案設定貼在這裡（Firebase 主控台 → 專案設定 → 你的應用程式 → SDK 設定）。
// 這些值本來就會出現在網頁上，不是密碼，可以放心公開。
window.FIREBASE_CONFIG = {
  apiKey: "請貼上 apiKey",
  authDomain: "你的專案.firebaseapp.com",
  projectId: "你的專案",
  appId: "請貼上 appId"
};
// 玩家登入時只要打「帳號」，程式會自動接上這個網域變成 Email。
// 在 Firebase 建立帳號時，Email 請填：帳號@這個網域（例如 xiaoming@lab533.example.com）。
window.LOGIN_DOMAIN = "lab533.example.com";
