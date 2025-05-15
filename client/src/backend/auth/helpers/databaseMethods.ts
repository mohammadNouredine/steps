import { supabase } from "@/lib/supabaseClient";

export async function writeFileToSupabase(
  filename: string,
  buffer: Buffer,
  file: File,
  bucketname: string = "avatars",
  pathname: string = "public"
) {
  return await supabase.storage
    .from(bucketname)
    .upload(`${pathname}/${filename}`, buffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
}
