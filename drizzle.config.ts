import { defineConfig } from "drizzle-kit";

// 1. Render ကပေးတဲ့ URL ကို ယူမယ်
// 2. ?ssl=... ပါနေရင် ဖြတ်ထုတ်လိုက်မယ် (ဒါမှ Offset Error မတက်မှာပါ)
const cleanUrl = (process.env.DATABASE_URL || "").split("?")[0];

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: cleanUrl, // Link အသန့်ကိုပဲ သုံးမယ်
    
    // SSL ကို ဒီမှာ သီးသန့် Code အနေနဲ့ ဖွင့်ပေးလိုက်မယ်
    ssl: {
      rejectUnauthorized: true // Render/Production မှာ true ထားတာ လုံခြုံပါတယ်
    }
  },
});