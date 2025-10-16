# ./ Dotslash – IIIT Nagpur Coding Club

Website of **Dotslash**, the Coding Club of IIIT Nagpur.  
Built with **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**, the platform showcases events, contests, leadarboard and achievements of the club community.

🌐 **Live Site:** [https://dotslash-website-iiit-n.vercel.app/](https://dotslash-website-iiit-n.vercel.app/)  
📦 **Repository:** [https://github.com/OmAmar106/Dotslash-Website-IIIT-N](https://github.com/OmAmar106/Dotslash-Website-IIIT-N)

---

## 🚀 Features

- 🏆 **Contest Listings:** Displays upcoming and past contests automatically updated via GitHub Actions.  
- 🧑‍💻 **Leaderboard:** View Leaderboard of students that participated in contests hosted by dotslash.  
- 📅 **Events & Announcements:** Showcases upcoming contests on LeetCode, CodeChef and Codeforces.

---

## 🛠️ Tech Stack

* **Python**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **GitHub Actions**

---

## 🧩 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/OmAmar106/Dotslash-Website-IIIT-N.git
cd Dotslash-Website-IIIT-N
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Now open [http://localhost:8080](http://localhost:8080) in your browser.

---

## ⚙️ Automation (GitHub Actions)

A scheduled GitHub Action runs daily at **12 AM IST** to update `src/json/contests.json`
with the latest contest data fetched from:

```
https://competeapi.vercel.app/contests/upcoming
```

---

### 💡 Contributions

Pull requests are welcome!
If you find a bug or have a feature suggestion, open an issue in this repository followed by a pull request.