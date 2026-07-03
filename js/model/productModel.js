import { supabase } from '../config/supabaseClient.js';

function formatProduct(product) {
    return {
        ...product,
        tipo: product.tipo === 'servico' ? 'Serviço' : 'Produto',
        preco: Number(product.preco || 0)
    };
}

function prepareProduct(product) {
    const price = Number(product.preco);

    return {
        nome: product.nome.trim(),
        tipo: product.tipo === 'Serviço' ? 'servico' : 'produto',
        categoria: product.categoria.trim(),
        descricao: product.descricao.trim(),
        preco: Number.isFinite(price) && price >= 0 ? price : 0
    };
}

export const ProductModel = {
    async list(search = '') {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .order('criado_em', { ascending: false });

        if (error) throw new Error(error.message);

        const products = (data || []).map(formatProduct);
        const term = search.trim().toLowerCase();

        if (!term) return products;

        return products.filter((item) =>
            item.nome.toLowerCase().includes(term) ||
            item.tipo.toLowerCase().includes(term) ||
            item.categoria.toLowerCase().includes(term)
        );
    },

    async findById(id) {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) throw new Error(error.message);
        return data ? formatProduct(data) : null;
    },

    async save(product) {
        const payload = prepareProduct(product);

        if (product.id) {
            const { data, error } = await supabase
                .from('produtos')
                .update(payload)
                .eq('id', product.id)
                .select()
                .single();

            if (error) throw new Error(error.message);
            return formatProduct(data);
        }

        const { data, error } = await supabase
            .from('produtos')
            .insert(payload)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return formatProduct(data);
    },

    async remove(id) {
        const { error } = await supabase
            .from('produtos')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
    }
};
