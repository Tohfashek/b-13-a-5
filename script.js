// ১. ডাটা জেনারেশন (ঠিক ৫০টি কার্ড)
const baseIssues = [
    { title: "Fix Navigation Menu On Mobile Devices", description: "The navigation menu doesn't collapse properly on mobile devices. Needs urgent attention.", status: "Open", author: "john.doe", priority: "HIGH", label: "BUG", createdAt: "1/15/2026" },
    { title: "Dashboard Loading Slow", description: "Main dashboard charts take too long to load on production environment.", status: "Closed", author: "rahul.dev", priority: "MEDIUM", label: "PERFORMANCE", createdAt: "1/12/2026" },
    { title: "Authentication Fix", description: "Users are unable to reset passwords due to SMTP configuration issues.", status: "Open", author: "sara.smith", priority: "HIGH", label: "SECURITY", createdAt: "2/10/2026" }
];

const issues = [];
for (let i = 0; i < 50; i++) {
    const item = baseIssues[i % baseIssues.length];
    issues.push({
        ...item,
        title: `${item.title} #${i + 1}`,
        status: i % 3 === 0 ? "Closed" : "Open", // ছবি অনুযায়ী মিক্সড স্ট্যাটাস
        priority: i % 2 === 0 ? "HIGH" : "MEDIUM"
    });
}

let filteredData = [...issues];

// ২. লগইন ফাংশন
function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if(user === 'admin' && pass === 'admin123') {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('main-page').classList.remove('hidden');
        displayIssues(issues);
    } else {
        alert("ভুল ইউজারনেম বা পাসওয়ার্ড!");
    }
}

// ৩. কার্ড রেন্ডারিং (সব রিকোয়ারমেন্টসহ)
function displayIssues(data) {
    const container = document.getElementById('issue-container');
    const countDisplay = document.getElementById('issue-count');
    container.innerHTML = "";
    countDisplay.innerText = `${data.length} Issues`;

    data.forEach((item) => {
        const borderColor = item.status === 'Open' ? 'border-t-[#22C55E]' : 'border-t-[#A855F7]';
        const iconColor = item.status === 'Open' ? 'text-green-500' : 'text-purple-500';
        
        const card = document.createElement('div');
        card.className = `bg-white p-5 rounded-xl shadow-sm border-t-[5px] ${borderColor} cursor-pointer hover:shadow-lg transition-all flex flex-col justify-between h-full`;
        card.onclick = () => showModal(item);
        
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-3">
                    <div class="flex items-center gap-1.5">
                         <span class="w-4 h-4 rounded-full border-2 border-current ${iconColor} flex items-center justify-center text-[8px]">●</span>
                         <span class="text-[10px] font-extrabold text-gray-400 uppercase tracking-tighter">${item.label}</span>
                    </div>
                    <span class="text-[10px] font-extrabold text-orange-400 uppercase">${item.priority}</span>
                </div>
                
                <h3 class="font-bold text-slate-800 text-[13.5px] mb-2 leading-tight">${item.title}</h3>
                <p class="text-[11px] text-slate-400 mb-4 line-clamp-2">${item.description}</p>
                
                <div class="flex gap-2 mb-4">
                    <span class="px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 text-[9px] font-black italic border border-orange-100 uppercase"># BUG</span>
                    <span class="px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 text-[9px] font-black italic border border-orange-100 uppercase"># HELP WANTED</span>
                </div>
            </div>

            <div class="pt-3 border-t border-gray-50 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white uppercase">${item.author[0]}</div>
                    <span class="text-[10px] font-bold text-slate-700">by ${item.author}</span>
                </div>
                <span class="text-[9px] font-bold text-slate-400">${item.createdAt}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// ৪. ফিল্টার ও সার্চ
function filterData(status, element) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));
    element.classList.add('tab-active');
    
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('issue-container').classList.add('hidden');

    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('issue-container').classList.remove('hidden');
        filteredData = status === 'All' ? issues : issues.filter(i => i.status === status);
        displayIssues(filteredData);
    }, 300);
}

function handleSearch() {
    const val = document.getElementById('search-input').value.toLowerCase();
    displayIssues(filteredData.filter(i => i.title.toLowerCase().includes(val)));
}

function showModal(item) {
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <span class="text-[10px] font-black text-blue-500 uppercase mb-2 block">${item.label}</span>
        <h2 class="text-2xl font-extrabold text-slate-800 mb-4">${item.title}</h2>
        <p class="text-slate-600 text-sm mb-6 border-l-4 border-slate-200 pl-4 italic leading-relaxed">${item.description}</p>
        <div class="grid grid-cols-2 gap-4 text-[11px] bg-slate-50 p-5 rounded-xl font-bold uppercase text-slate-500">
            <p>Author: <span class="text-slate-800">@${item.author}</span></p>
            <p>Status: <span class="text-slate-800">${item.status}</span></p>
            <p>Priority: <span class="text-slate-800">${item.priority}</span></p>
            <p>Date: <span class="text-slate-800">${item.createdAt}</span></p>
        </div>
    `;
    issue_modal.showModal();
}