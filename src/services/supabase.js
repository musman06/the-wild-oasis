import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://izxyykvuqmckxgtlpodo.supabase.co";
const supabaseKey = "sb_publishable_RXKSF0YyxFQ1T69czIuBDA_yxxWYtST";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
