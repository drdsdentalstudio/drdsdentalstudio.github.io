const fs = require('fs');

const path = 'c:\\Users\\barat\\Music\\drdsdentalstudio\\index.html';

let content = fs.readFileSync(path, 'utf8');

const tom_select_injection = `
  <!-- TomSelect for searchable dropdowns -->
  <link href="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/css/tom-select.default.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/js/tom-select.complete.min.js"></script>
  <style>
    .ts-control {
      border-radius: 0.75rem !important;
      border-color: #e2e8f0 !important;
      padding: 0.5rem 0.75rem !important;
      font-size: 0.875rem !important;
      background-color: #f8fafc !important;
    }
    .ts-wrapper.focus .ts-control {
      border-color: #9C623F !important;
      box-shadow: 0 0 0 1px #9C623F !important;
    }
  </style>
  <script>
    function initSearchableDropdowns() {
      if (typeof TomSelect === 'undefined') return;
      document.querySelectorAll('select:not(.tomselected)').forEach(el => {
        try { 
          const ts = new TomSelect(el, { create: false, maxOptions: 100 }); 
          const observer = new MutationObserver(() => {
            if (el.tomselect) {
              clearTimeout(el.tomselect._syncTimeout);
              el.tomselect._syncTimeout = setTimeout(() => {
                if (el.tomselect) el.tomselect.sync();
              }, 100);
            }
          });
          observer.observe(el, { childList: true });
        } catch(e) {}
      });
    }
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initSearchableDropdowns, 500);
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach(m => {
          m.addedNodes.forEach(node => {
            if (node.nodeType === 1 && (node.tagName === 'SELECT' || node.querySelector('select'))) {
              shouldInit = true;
            }
          });
        });
        if (shouldInit) setTimeout(initSearchableDropdowns, 50);
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  </script>
</head>
`;

content = content.replace('</head>', tom_select_injection);

const delete_fn = `
    window.deleteTreatmentPlan = function(id) {
      if (confirm('Are you sure you want to permanently delete this treatment record?')) {
        db.treatmentPlans = db.treatmentPlans.filter(tp => tp.id !== id);
        if (typeof saveDatabase === 'function') saveDatabase();
        if (typeof saveDb === 'function') saveDb();
        if (typeof syncPushToSupabase === 'function') syncPushToSupabase(false);
        if (typeof renderTreatmentFunnel === 'function') renderTreatmentFunnel();
      }
    };

    // ==================== FEATURE 3 & 4: TREATMENT FUNNEL & LOST CASE ANALYSIS ====================
`;

content = content.replace('    // ==================== FEATURE 3 & 4: TREATMENT FUNNEL & LOST CASE ANALYSIS ====================', delete_fn);

const original_buttons_html = `              <div class="flex items-center justify-between pt-1">
                \${tp.stage !== 'Completed' ? \`
                  <button onclick="advanceTreatmentPlanStage('\${tp.id}')" class="text-brand-600 hover:text-brand-800 font-bold text-[10px] transition-all flex items-center space-x-1">
                    <span>Advance &rarr;</span>
                  </button>
                  <button onclick="openLostCaseModal('\${tp.id}')" class="text-rose-500 hover:text-rose-700 text-[10px] transition-all">Mark Lost</button>
                \` : \`
                  <span class="text-emerald-600 font-bold text-[10px]">✓ Delivered</span>
                  <button onclick="openSmartWhatsAppModal('review_request', '\${tp.patientId}')" class="text-brand-600 hover:text-brand-800 font-semibold text-[10px]">Review</button>
                \`}
              </div>`;

const new_buttons_html = `              <div class="flex items-center justify-between pt-1">
                \${tp.stage !== 'Completed' ? \`
                  <button onclick="advanceTreatmentPlanStage('\${tp.id}')" class="text-brand-600 hover:text-brand-800 font-bold text-[10px] transition-all flex items-center space-x-1">
                    <span>Advance &rarr;</span>
                  </button>
                  <div class="flex items-center space-x-2">
                    <button onclick="openLostCaseModal('\${tp.id}')" class="text-rose-500 hover:text-rose-700 text-[10px] transition-all">Mark Lost</button>
                    <button onclick="deleteTreatmentPlan('\${tp.id}')" class="text-red-500 hover:text-red-700 text-[10px] transition-all flex items-center gap-1" title="Delete"><i data-lucide="trash-2" class="w-3 h-3"></i></button>
                  </div>
                \` : \`
                  <span class="text-emerald-600 font-bold text-[10px]">✓ Delivered</span>
                  <div class="flex items-center space-x-2">
                    <button onclick="deleteTreatmentPlan('\${tp.id}')" class="text-red-500 hover:text-red-700 text-[10px] transition-all flex items-center gap-1" title="Delete"><i data-lucide="trash-2" class="w-3 h-3"></i></button>
                    <button onclick="openSmartWhatsAppModal('review_request', '\${tp.patientId}')" class="text-brand-600 hover:text-brand-800 font-semibold text-[10px]">Review</button>
                  </div>
                \`}
              </div>`;

if (!content.includes(original_buttons_html)) {
    console.log("Warning: original_buttons_html not found. Using regex replace.");
    content = content.replace(
        /<button onclick="openLostCaseModal\('\\?\$\{tp\.id\}'\)"[^>]*>Mark Lost<\/button>/g,
        `<button onclick="openLostCaseModal('\${tp.id}')" class="text-rose-500 hover:text-rose-700 text-[10px] transition-all">Mark Lost</button>\n                  <button onclick="deleteTreatmentPlan('\${tp.id}')" class="text-red-500 hover:text-red-700 text-[10px] transition-all flex items-center gap-1 ml-2" title="Delete"><i data-lucide="trash-2" class="w-3 h-3"></i></button>`
    );
    content = content.replace(
        /<button onclick="openSmartWhatsAppModal\('review_request'[^>]*>Review<\/button>/g,
        `<button onclick="deleteTreatmentPlan('\${tp.id}')" class="text-red-500 hover:text-red-700 text-[10px] transition-all flex items-center gap-1 mr-2" title="Delete"><i data-lucide="trash-2" class="w-3 h-3"></i></button>\n                  <button onclick="openSmartWhatsAppModal('review_request', '\${tp.patientId}')" class="text-brand-600 hover:text-brand-800 font-semibold text-[10px]">Review</button>`
    );
} else {
    content = content.replace(original_buttons_html, new_buttons_html);
    console.log("Main replace successful.");
}

fs.writeFileSync(path, content, 'utf8');
console.log("Done.");
