import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    // Render ကပေးတဲ့ URL အသန့်ကို ယူမယ်
    url: process.env.DATABASE_URL!,
    
    // ပြီးမှ SSL ကို ဒီနေရာမှာ Code နဲ့ သီးသန့်ဖွင့်မယ်
    // ဒါဆိုရင် URL parsing error လုံးဝ မတက်တော့ပါဘူး
    ssl: {
      rejectUnauthorized: true,
    },
  },
});