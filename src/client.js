import { createClient } from '@supabase/supabase-js'

const URL = 'https://svilbmfrbkolhxriadpj.supabase.co'
const API_KEY = 'sb_publishable_PDVWrepRMM2bI8KshQMhnw_up2xGlb7'

export const supabase = createClient(URL, API_KEY)
