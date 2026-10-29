# 光道修仙錄：架站與帳號設定

這個資料夾就是整個遊戲網站。帳號密碼和存檔用 Google 的 Firebase（免費方案就夠用），網頁本身可以放在 GitHub Pages 上。

| 檔案 | 用途 |
|---|---|
| `index.html` | 遊戲本體 |
| `firebase-config.js` | 填入你的 Firebase 專案設定 |
| `firestore.rules` | 資料庫權限規則（貼到 Firebase） |
| `content.json` | 預設的遊戲內容（師父、派系、功法、作息），可以修改後從遊戲裡上傳 |
| `fonts/` | 像素字體「俐方體 11 號」（Cubic 11，免費授權，見 `fonts/OFL.txt`） |

設定好之後的運作方式：

- 只有你在 Firebase 建立的帳號能登入，沒有開放自行註冊。
- 每個人只能讀寫自己的存檔，你（管理者）可以在「弟子總覽」看到所有人的進度。
- 實驗室的真實內容存在資料庫，只有登入的人讀得到，不會出現在公開的網頁原始碼裡。

---

## 1. 建立 Firebase 專案

1. 到 <https://console.firebase.google.com> 用 Google 帳號登入，按「建立專案」。名稱隨意，例如 `lab533-game`。Google Analytics 可以關掉。
2. 進到專案首頁，按網頁圖示 `</>` 新增一個「網頁應用程式」。不用勾 Firebase Hosting。
3. 畫面會出現一段 `firebaseConfig`。把裡面的 `apiKey`、`authDomain`、`projectId`、`appId` 四個值，貼到 `firebase-config.js` 對應的位置。

## 2. 開啟帳號密碼登入，並關閉自行註冊

1. 左側選單「建構 → Authentication」，按「開始使用」。
2. 在「登入方式」分頁，啟用「電子郵件/密碼」（只開第一個開關，不用開「電子郵件連結」）。
3. 到「設定」分頁 →「使用者動作」（User actions），**取消勾選「啟用建立（註冊）」**（Enable create (sign-up)），然後儲存。

   這一步很重要：關掉之後，只有你在主控台建立的帳號才能登入。

## 3. 建立資料庫並貼上權限規則

1. 左側選單「建構 → Firestore Database」→「建立資料庫」。
2. 位置選 `asia-east1`（台灣），以「正式版模式」建立。
3. 到「規則」分頁，把 `firestore.rules` 的內容整個貼上，覆蓋原本的規則，按「發布」。

## 4. 幫每個人建立帳號

到「Authentication → 使用者」→「新增使用者」：

- **電子郵件**：`帳號@lab533.example.com`，例如 `xiaoming@lab533.example.com`
- **密碼**：至少 6 個字元

玩家登入時只要打 `xiaoming` 和密碼，後面的網域程式會自動補上。想改網域，就改 `firebase-config.js` 裡的 `LOGIN_DOMAIN`，建立帳號時也要用同一個網域。

玩家登入後，可以在畫面最下方按「改名稱」設定遊戲裡顯示的名字（道號），按「改密碼」自己改密碼。「弟子總覽」會顯示成「道號（帳號）」。

Firebase 主控台不能直接修改帳號（Email）。登入帳號一旦建立就不能改，要換只能刪掉重建；只是想換顯示的名字，用「改名稱」就好。忘記密碼的話，請管理者在主控台刪掉帳號、用同一個 Email 重新建立。重建的帳號會拿到新的 UID，所以原本的遊戲進度不會接回來。

## 5. 把自己設成管理者

1. 先幫自己建立一個帳號（步驟 4）。
2. 在「Authentication → 使用者」列表中，複製自己那一列的「使用者 UID」。
3. 到「Firestore Database → 資料」→「開始集合」：
   - 集合 ID：`admins`
   - 文件 ID：貼上你的 UID
   - 欄位隨便加一個，例如 `role`（字串）= `admin`

之後你登入遊戲，就會多出「弟子總覽」分頁。

## 6. 把網站放上 GitHub Pages

1. 在 GitHub 建立一個新的 repository（public 即可；遊戲內容放在資料庫，程式碼裡沒有私人資料）。
2. 把這個資料夾的檔案上傳到 repository 根目錄（`README.md` 可以一起放）：
   1. 先把 zip 解壓縮，並確認 `firebase-config.js` 已經填好（步驟 1）。
   2. 打開剛建立的 repository 頁面。如果是空的，點畫面中間「uploading an existing file」這個連結；已經有檔案的話，點右上角「Add file → Upload files」。
   3. 打開解壓後的 `lab533-game` 資料夾，**選取裡面的檔案**（`index.html`、`firebase-config.js`、`firestore.rules`、`content.json`、`README.md`，以及 `fonts` 資料夾），拖進瀏覽器的上傳區。`fonts` 資料夾要整個拖進去，GitHub 會保留資料夾結構；但不要拖最外層的 `lab533-game` 資料夾，否則檔案會多一層，網址就打不開。
   4. 拉到頁面最下方按綠色的「Commit changes」。
   5. 回到 repository 首頁，確認 `index.html` 直接出現在檔案列表裡，而不是在某個資料夾裡面。

   之後要修改 `firebase-config.js`，可以直接在 GitHub 點開檔案、按右上角的鉛筆圖示編輯，再按「Commit changes」。
3. 到 repository 的「Settings → Pages」，Source 選 `Deploy from a branch`，Branch 選 `main`、`/ (root)`，儲存。
4. 等一兩分鐘，網址會是 `https://你的帳號.github.io/repository名稱/`。
5. 回到 Firebase「Authentication → 設定 → 授權網域」，新增 `你的帳號.github.io`。沒加的話登入會失敗。

把網址傳給學弟妹，再告訴他們各自的帳號密碼，就可以開始玩了。

## 7. 設定每個人的身分與派系

用管理者帳號登入，按頁面上方的「弟子總覽（管理者）」：

- **身分**：專題生、碩一上、碩一下、碩二上……從下拉選單選。每個身分都有一個「應達境界」，玩家的人物頁會顯示「進度正常」「超前」或「落後」。
- **派系**：可以幫人指定；選「自選」就由玩家第一次登入時自己選。

設定存在資料庫的 `roster` 集合，只有管理者能改，玩家本人只能讀。

## 8. 換成 533 的真實內容

1. 用管理者帳號登入，到「弟子總覽」最下面的「遊戲內容」，按「下載目前內容」（或直接用這個資料夾的 `content.json`）。
2. 用任何文字編輯器修改：
   - `semester`：學期名稱、第 1 週週一的日期（`start`，格式 `2026-09-14`）、總週數。
   - `ranks`：身分清單。`expect` 是這個身分應達到的境界編號（0 = 煉氣期，對照 `realms`）。
   - `realms`：境界名稱，以及要完成多少 % 的本派功法（`min`）。
   - `mind`：本派以外的功法要叫什麼名目（預設「心法」，學一門加一重）。
   - `places`：地點。`floor` 是樓層（不填就是「校外」），`group` 會把房間框在一起，`lab: true` 代表有光學桌，`study: true` 代表可以自修，`tables` 是實驗桌與庫存（之後補）。美術欄位：`art` 是場景圖（`lounge`、`study`、`door`、`lab`、`desk`、`home`），`num` 是門牌，`beam` 是光束顏色。
   - `schools`：派系。`final` 是出師要練成的功法 id，它和它所有的前置功法就是「本派功法」。
   - `skills`：功法。`pre` 是前置功法，`practice: true` 代表有「做」這一步，`tier` 是 0 到 4 的層級。`reading` 是藏經閣的讀物，每筆可以寫：`type`（`book`、`paper`、`internal`）、`t`（書名或論文）、`ch`（章節）、`note`（備註）、`url`（連結）、`tbc: true`（待確認）。
   - `masters`：學長姐。`teach` 是會教的功法，`sched` 是一週作息（`"1"` 是週一，值是地點 id），`spec` 專長，`contact` 聯絡方式，`prep` 請教前要準備什麼，`look` 是像素外觀（`hair`、`robe`，以及 `bun`、`long`、`gog`、`glass`）。
   - `books`：人物頁可以拿在手上的教科書（只是外觀）。
3. 回到遊戲按「上傳內容檔」。程式會先檢查格式，有問題會告訴你哪裡錯。

JSON 常見錯誤：最後一個欄位後面不能有逗號；字串要用雙引號。

注意：如果刪掉或改名某個功法 id，玩家在那門功法的紀錄會不見。

---

### 常見問題

- **登入時顯示「帳號或密碼不正確」**：確認建立帳號時用的網域和 `LOGIN_DOMAIN` 一樣。
- **登入後顯示「讀取失敗」**：多半是 Firestore 規則沒有發布，回步驟 3 檢查。
- **畫面顯示「尚未完成設定」**：`firebase-config.js` 還沒填，或沒有一起上傳到網站。
- **藏經閣的章節**：預設讀物是依常見教科書擬的初稿，章節依版本不同，都標了「待確認」，請逐條核對後再拿掉 `tbc`。
- **費用**：免費方案每天有 5 萬次讀取、2 萬次寫入，一個實驗室的人數遠遠用不完。
