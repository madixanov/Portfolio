import { supabase } from "../lib/supabaseClient.js";

export const postCreed = async (req, res) => {
    try {
        const { content } = req.body;

        const { data, error } = await supabase
            .from('Creed')
            .insert([{ content }])
            .select()
            .single();
        
        if (error) {
            console.error('Error inserting creed:', error);
            return res.status(500).json({ error: 'Failed to insert creed' });
        }

        return res.status(201).json({ message: 'Creed inserted successfully', creed: data[0] });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}

export const getCreed = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Creed')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1);

        if (error) {
            console.error('Error fetching creed:', error);
            return res.status(500).json({ error: 'Failed to fetch creed' });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: 'No creed found' });
        }

        return res.status(200).json({ creed: data[0] });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}

export const updateCreed = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const { data, error } = await supabase
            .from('Creed')
            .update({ content })
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error updating creed:', error);
            return res.status(500).json({ error: 'Failed to update creed' });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: 'Creed not found' });
        }

        return res.status(200).json({ message: 'Creed updated successfully', creed: data[0] });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}