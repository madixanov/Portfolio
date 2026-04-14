import { supabase } from "../lib/supabaseClient";

export const uploadMajor = async (req, res) => {
  try {
    const { name } = req.body

    if (!name?.trim()) {
      return res.status(400).json({ error: "Name is required" })
    }

    const { data, error } = await supabase
      .from("Major")
      .insert({ name })
      .select()
      .single()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    return res.status(201).json({
      message: "Major created successfully",
      major: data,
    })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getMajors = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Major")
      .select("*")
      .order("createdAt", { ascending: false })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    return res.status(200).json({
      majors: data || [],
    })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const updateMajor = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    if (!id) {
      return res.status(400).json({ error: "ID is required" })
    }

    if (!name?.trim()) {
      return res.status(400).json({ error: "Name is required" })
    }

    const { data, error } = await supabase
      .from("Major")
      .update({ name })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    if (!data) {
      return res.status(404).json({ error: "Major not found" })
    }

    return res.status(200).json({
      message: "Major updated successfully",
      major: data,
    })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}