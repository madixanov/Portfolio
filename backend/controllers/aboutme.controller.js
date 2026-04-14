import { supabase } from "../supabaseClient.js";

export const postAboutMe = async (req, res) => {
    try {
        const { content, widget } = req.body;

        const { data, error } = await supabase
            .from('AboutMe')
            .insert([{ content, widget }])
            .select()
            .single();

        if (error) {
            console.error('Error inserting about me:', error);
            return res.status(500).json({ error: 'Failed to insert about me' });
        }

        return res.status(201).json({ message: 'About me created successfully', aboutMe: data[0] });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}

export const getAboutMe = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('AboutMe')
            .select('*')
            .order('createdAt', { ascending: false })
            .limit(1);

        if (error) {
            console.error('Error fetching about me:', error);
            return res.status(500).json({ error: 'Failed to fetch about me' });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: 'No about me found' });
        }

        return res.status(200).json({ aboutMe: data[0] });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}

export const updateAboutMe = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, widget } = req.body;

        if (!content && !widget) {
            return res.status(400).json({ error: 'At least one of content or widget must be provided for update' });
        }

        const { data, error } = await supabase
            .from('AboutMe')
            .update({ content, widget })
            .eq('id', id)
            .select();
        if (error) {
            console.error('Error updating about me:', error);
            return res.status(500).json({ error: 'Failed to update about me' });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: 'About me not found' });
        }

        return res.status(200).json({ message: 'About me updated successfully', aboutMe: data[0] });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}