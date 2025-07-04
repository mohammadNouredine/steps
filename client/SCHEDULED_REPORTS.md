# 🕕 Scheduled Daily Reports Setup Guide

This guide explains how to set up automatic daily reports that will be sent to your Telegram bot every day at 6:00 PM without manual intervention.

## 📋 Prerequisites

Before setting up scheduled reports, ensure you have:

- ✅ Telegram bot token configured (`NEXT_PUBLIC_TELEGRAM_TOKEN`)
- ✅ Telegram chat ID configured (`NEXT_PUBLIC_TELEGRAM_CHAT_ID`)
- ✅ Your Next.js app deployed on Vercel
- ✅ GitHub repository connected to Vercel

## 🚀 Setup Options

### Option 1: Vercel Cron Jobs (Recommended if you have Pro plan)

**Requirements:** Vercel Pro plan ($20/month)

1. **Configure Environment Variables:**

   ```bash
   # Add to your Vercel environment variables
   CRON_SECRET=your-secure-random-string-here
   ```

2. **Deploy to Vercel:**
   The `vercel.json` file is already configured with:

   ```json
   {
     "crons": [
       {
         "path": "/api/telegram/daily-report",
         "schedule": "0 18 * * *"
       }
     ]
   }
   ```

3. **Verify Setup:**
   - Check Vercel dashboard → Functions → Cron tab
   - Your cron job should appear there
   - Test manually: `GET https://your-app.vercel.app/api/telegram/daily-report`

### Option 2: GitHub Actions (Free & Reliable)

**Requirements:** GitHub repository (free)

1. **Set up GitHub Secrets:**
   Go to your GitHub repository → Settings → Secrets and variables → Actions

   Add these secrets:

   ```
   CRON_SECRET=your-secure-random-string-here
   VERCEL_APP_URL=https://your-app.vercel.app
   ```

2. **Configure the Workflow:**
   The `.github/workflows/daily-report.yml` file is already set up.

3. **Adjust Timezone (if needed):**
   Edit the cron schedule in the workflow file:

   ```yaml
   schedule:
     # For 6 PM in different timezones:
     - cron: "0 18 * * *" # 6 PM UTC
     - cron: "0 22 * * *" # 6 PM EST (UTC-4)
     - cron: "0 23 * * *" # 6 PM CST (UTC-5)
     - cron: "0 1 * * *" # 6 PM PST (UTC-8, next day)
   ```

4. **Enable GitHub Actions:**

   - Go to your repository → Actions tab
   - Enable workflows if prompted
   - The workflow will run automatically

5. **Test the Workflow:**
   - Go to Actions tab → "Daily Telegram Report"
   - Click "Run workflow" to test manually

### Option 3: External Cron Service (Alternative)

Use services like **Cronitor**, **EasyCron**, or **cron-job.org**:

1. **Sign up** for a cron service
2. **Create a new cron job** with:
   - **URL:** `https://your-app.vercel.app/api/telegram/daily-report`
   - **Method:** GET
   - **Schedule:** `0 18 * * *` (6 PM daily)
   - **Headers:** `Authorization: Bearer your-cron-secret`

## 📊 Report Configuration

### Default Daily Report Includes:

- ✅ **Attendance:** Always included
- ✅ **Payments:** Included
- ✅ **Purchases:** Included
- ❌ **Loans:** Excluded (to avoid daily spam)

### Customize Report Content:

Edit `src/app/api/telegram/daily-report/route.ts`:

```typescript
const reportData = {
  date: new Date(),
  sendAttendance: true, // ← Change these
  sendLoans: false, // ← values to
  sendPayments: true, // ← customize
  sendPurchases: true, // ← your report
};
```

## 🔒 Security

The scheduled endpoint includes optional security:

- **Authorization header:** `Bearer your-cron-secret`
- **Environment variable:** `CRON_SECRET`

Without this, anyone can trigger your daily report by calling the endpoint.

## 🕐 Timezone Notes

- **Cron times are in UTC** by default
- **Adjust the schedule** based on your local timezone:
  - `0 18 * * *` = 6 PM UTC
  - `0 22 * * *` = 6 PM EST
  - `0 23 * * *` = 6 PM CST
  - `0 1 * * *` = 6 PM PST (next day)

## 📱 Sample Report Output

```
📊 Daily Report - Mon Dec 16 2024

👥 **ATTENDANCE REPORT**
✅ Total Present: 3 kids
1. 👦 Ahmed Ali
2. 👧 Fatima Hassan (Note: Brought lunch)
3. 👦 Omar Said [Extra: $5]

💳 **PAYMENTS REPORT**
💵 Total Payments: $50.00
1. 👧 Fatima Hassan: $30.00 (Monthly fee)
2. 👦 Ahmed Ali: $20.00

🛒 **PURCHASES REPORT**
🛍️ Total Purchases: $25.00
💰 Total Paid: $20.00
🏦 Outstanding: $5.00
1. 👦 Omar Said: $15.00 (Owing: $5.00) - Snacks
2. 👧 Sara Mohamed: $10.00

🕐 Generated at: 6:00:15 PM
```

## 🛠️ Troubleshooting

### Common Issues:

1. **"Unauthorized" Error:**

   - Check `CRON_SECRET` environment variable
   - Verify Authorization header in cron job

2. **"Chat not found" Error:**

   - Verify `NEXT_PUBLIC_TELEGRAM_CHAT_ID`
   - Make sure bot has access to the chat

3. **Reports not sending:**
   - Check Vercel function logs
   - Verify cron job is running (GitHub Actions tab)
   - Test the endpoint manually

### Manual Testing:

Test your scheduled endpoint:

```bash
curl -X GET \
  -H "Authorization: Bearer your-cron-secret" \
  https://your-app.vercel.app/api/telegram/daily-report
```

## 🎉 That's It!

Your daily reports will now be sent automatically every day at 6 PM to your Telegram bot. No manual intervention required! 🚀

---

**Need help?** Check the logs in:

- Vercel Dashboard → Functions → Logs
- GitHub Actions → Workflow runs
- Your cron service dashboard
