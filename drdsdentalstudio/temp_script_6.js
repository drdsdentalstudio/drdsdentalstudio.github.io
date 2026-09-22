
    window.openSupabaseModal = function() {
      try {
        var modal = document.getElementById('supabase-sync-modal');
        if (!modal) {
          console.warn('Supabase modal DOM not ready, retrying...');
          setTimeout(function() { window.openSupabaseModal && window.openSupabaseModal(); }, 50);
          return;
        }
        var urlInput = document.getElementById('supabase-url-input');
        var keyInput = document.getElementById('supabase-key-input');
        var savedUrl = localStorage.getItem('DDS_SUPABASE_URL_V2') || (window.supabaseConfig && window.supabaseConfig.url) || '';
        var savedKey = localStorage.getItem('DDS_SUPABASE_KEY') || (window.supabaseConfig && window.supabaseConfig.key) || '';
        if (urlInput && !urlInput.value) urlInput.value = savedUrl;
        if (keyInput && !keyInput.value) keyInput.value = savedKey;

        modal.classList.remove('hidden');
        modal.style.setProperty('display', 'flex', 'important');
        modal.style.setProperty('z-index', '99999', 'important');

        if (typeof updateSupabaseUIStatus === 'function') {
          updateSupabaseUIStatus(window.supabaseClient ? 'connected' : 'unconfigured');
        }
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          try { window.lucide.createIcons(); } catch(e) {}
        }
      } catch(err) {
        console.error('Error opening Supabase modal:', err);
      }
    };

    window.closeSupabaseModal = function() {
      var modal = document.getElementById('supabase-sync-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.setProperty('display', 'none', 'important');
      }
    };

    var openSupabaseModal = window.openSupabaseModal;
    var closeSupabaseModal = window.closeSupabaseModal;
  