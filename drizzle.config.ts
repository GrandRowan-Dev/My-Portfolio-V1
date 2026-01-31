import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    // Render မှာ ပြင်ထားတဲ့ URL အသန့်ကို ယူပါမယ်
    url: process.env.DATABASE_URL!,
    
    // SSL ကို ဒီနေရာမှာ Code နဲ့ သီးသန့်ဖွင့်ပေးလိုက်ပါ
    // ဒါမှ Offset Error လုံးဝ မတက်တော့မှာပါ
    ssl: {
      rejectUnauthorized: true,
    },
  },
});