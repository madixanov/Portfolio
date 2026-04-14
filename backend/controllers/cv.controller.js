import { supabase } from "../lib/supabaseClient"

export const uploadCV = async (req, res) => {
  try {
    const file = req.file

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const fileName = `cv-${Date.now()}-${file.originalname}`

    // 📤 upload to storage
    const { error: uploadError } = await supabase.storage
      .from("CV")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      })

    if (uploadError) {
      return res.status(500).json({ error: uploadError.message })
    }

    // 🔗 get public url
    const { data } = supabase.storage
      .from("CV")
      .getPublicUrl(fileName)

    const fileUrl = data.publicUrl

    // 💾 UPSERT (ОДИН РАЗ!)
    const { data: cv, error } = await supabase
      .from("CV")
      .upsert({
        id: "main",
        fileUrl,
        fileName,
        createdAt: new Date(),
      })
      .select()
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({
      message: "CV uploaded successfully",
      cv,
    })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getCV = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("CV")
      .select("*")
      .eq("id", "main")
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ cv: data })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}