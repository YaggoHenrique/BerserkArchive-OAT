const SUPABASE_URL = 'https://gdpmixrbzdxldsrpcvig.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_4jH7rc_1_sJihwFP9qo4ig_nEXMo7CK';

if (!window.supabase) {
  throw new Error('A biblioteca do Supabase não foi carregada no index.html.');
}

if (
  SUPABASE_URL.includes('COLOQUE_') ||
  SUPABASE_PUBLISHABLE_KEY.includes('COLOQUE_')
) {
  console.warn(
    'Configure SUPABASE_URL e SUPABASE_PUBLISHABLE_KEY em js/config/supabaseClient.js.'
  );
}

export const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
