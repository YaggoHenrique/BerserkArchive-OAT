import { supabase } from '../config/supabaseClient.js';

export const ContactModel = {
    async save(contact) {
        const { data, error } = await supabase
            .from('contatos')
            .insert({
                nome: contact.nome.trim(),
                email: contact.email.trim(),
                assunto: contact.assunto?.trim() || 'Contato pelo site',
                mensagem: contact.mensagem.trim()
            })
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }
};
