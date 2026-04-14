import { supabase } from "../lib/supabaseClient.js";

export const uploadSkill = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;
    
    if (!title || !file) {
      return res.status(400).json({ error: "Title and file are required" });
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from("icon")
        .upload(__filename, file.buffer, {
            contentType: file.mimetype,
        });

    if (uploadError) {
        return res.status(500).json({ error: uploadError.message });
    }

    const { data: publicUrlData } = supabase.storage
        .from("icon")
        .getPublicUrl(uploadData.path);
    
    const iconUrl = publicUrlData.publicUrl;

    const { data, error } = await supabase
        .from("Skill")
        .insert({ title, icon: iconUrl })
        .select()
        .single();
    
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({
        message: "Skill uploaded successfully",
        skill: data,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const getIcons = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Icon")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteIcon = async (req, res) => {
  const { id } = req.params;

  // 1. получить запись
  const { data: iconData } = await supabase
    .from("Icon")
    .select("*")
    .eq("id", id)
    .single();

  if (!iconData) {
    return res.status(404).json({ error: "Not found" });
  }

  // 2. удалить из storage
  const filePath = iconData.icon.split("/storage/v1/object/public/icons/")[1];

  await supabase.storage.from("icons").remove([filePath]);

  // 3. удалить из таблицы
  const { error } = await supabase
    .from("Icon")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ success: true });
};