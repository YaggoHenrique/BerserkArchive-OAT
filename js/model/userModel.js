import { supabase } from '../config/supabaseClient.js';

async function buildUser(user) {
    if (!user) return null;

    const { data: profile, error } = await supabase
        .from('perfis')
        .select('nome, role')
        .eq('id', user.id)
        .maybeSingle();

    if (error) throw new Error(error.message);

    return {
        id: user.id,
        nome: profile?.nome || user.user_metadata?.nome || 'Usuário',
        email: user.email,
        perfil: profile?.role === 'admin' ? 'admin' : 'usuario'
    };
}

export const UserModel = {
    async login(email, senha) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: senha
        });

        if (error) return null;
        return buildUser(data.user);
    },

    async register(user) {
        const { data, error } = await supabase.auth.signUp({
            email: user.email.trim(),
            password: user.senha,
            options: {
                data: {
                    nome: user.nome.trim()
                }
            }
        });

        if (error) {
            if (error.message.toLowerCase().includes('already')) return false;
            throw new Error(error.message);
        }

        return data;
    },

    async getSession() {
        const {
            data: { session },
            error
        } = await supabase.auth.getSession();

        if (error || !session?.user) return null;
        return buildUser(session.user);
    },

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(error.message);
    }
};
