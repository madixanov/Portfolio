import { supabase } from "../lib/supabaseClient";

export const uploadCV = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileName =  `cv-${Date.now()}-${file.originalname}`;

        const { error: uploadError } = await supabase.storage.from('CV').upload(fileName, file.buffer,  {
            contentType: file.mimetype,
        })

        if (uploadError) {
            console.error('Error uploading file to Supabase:', uploadError);
            return res.status(500).json({ error: 'Failed to upload file' });
        }

        const { data } = await supabase.storage.from('CV').getPublicUrl(fileName);

        await supabase
                .from("CV")
                .upsert({
                    id: "main",
                    fileUrl,
                    fileName,
                    createdAt: new Date(),
                })

        const { data: cv, error } = await supabase.from('CV').insert(
            {
                id: "main",
                fileUrl,
                fileName,
                createdAt: new Date(),
            }
        )
        .select().single();

        if (error) {
            console.error('Error saving CV record to database:', error);
            return res.status(500).json({ error: 'Failed to save CV record' });
        }

        return res.status(200).json({ message: 'CV uploaded successfully', cv });
    } catch (error) {
        console.error('Error uploading CV:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const getCV = async (req, res) => {
    try {
        const  { data } = await supabase.from('CV').select('*').limit(1).single();
        return res.status(200).json({ cv: data });
    } catch (error) {
        console.error('Error fetching CV:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}