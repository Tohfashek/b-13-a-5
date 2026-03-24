// ১. স্যাম্পল ডেটা
const baseIssues = [
    { title: "Fix Navigation Menu On Mobile Devices", description: "The navigation menu doesn't collapse properly on small screen resolutions.", status: "Open", author: "john.doe", priority: "HIGH", label: "UI/UX", createdAt: "1/15/2026" },
    { title: "Dashboard Loading Performance", description: "Main dashboard data takes too long to fetch from the server.", status: "Closed", author: "rahul.dev", priority: "MEDIUM", label: "Performance", createdAt: "1/12/2026" },
    { title: "JWT Auth Token Validation", description: "Tokens are expiring randomly before the set limit in production.", status: "Open", author: "sara.smith", priority: "HIGH", label: "Security", createdAt: "1/18/2026" },
    { title: "PDF Report Generation Error", description: "Exporting large reports to PDF format leads to timeout errors.", status: "Closed", author: "linda.k", priority: "HIGH", label: "Bug", createdAt: "1/10/2026" }
];

// ২. লুপ দিয়ে ৪৮টি কার্ড তৈরি
const issues = [];
for (let i = 0; i < 48; i++) {
    const item = baseIssues[i % baseIssues.length];
    issues.push({
        ...item,
        title: `${item.title} #${i + 1}`,
        status: i % 3 === 0 ? "Closed" : "Open"
    });
}

let filteredData = [...issues];

// ৩. লগইন ফাংশন
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

// ৪. ডিসপ্লে ফাংশন (৪ কলাম লেআউট)
function displayIssues(data) {
    const container = document.getElementById('issue-container');
    const countDisplay = document.getElementById('issue-count');
    container.innerHTML = "";
    countDisplay.innerText = `${data.length} Issues`;

    data.forEach((item) => {
        const borderColor = item.status === 'Open' ? 'border-t-[#22C55E]' : 'border-t-[#A855F7]';
        const card = document.createElement('div');
        card.className = `bg-white p-6 rounded-xl shadow-sm border-t-[6px] ${borderColor} cursor-pointer hover:shadow-md transition-all flex flex-col justify-between h-full`;
        card.onclick = () => showModal(item);
        
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-center mb-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <span>${item.label}</span>
                    <span class="bg-gray-100 px-2 py-0.5 rounded text-gray-600">${item.priority}</span>
                </div>
                <h3 class="font-bold text-slate-800 mb-2 leading-tight">${item.title}</h3>
                <p class="text-xs text-slate-500 line-clamp-3 mb-4">${item.description}</p>
            </div>
            <div class="pt-4 border-t flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded bg-slate-800 text-white text-[10px] flex items-center justify-center font-bold">
                        ${item.author[0].toUpperCase()}
                    </div>
                    <span class="text-[11px] font-bold text-slate-600">@${item.author}</span>
                </div>
                <span class="text-[10px] font-bold text-gray-400">${item.createdAt}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// ফিল্টার ও সার্চ আগের মতোই থাকবে...
function filterData(status, element) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));
    element.classList.add('tab-active');
    filteredData = status === 'All' ? issues : issues.filter(i => i.status === status);
    displayIssues(filteredData);
}

function handleSearch() {
    const val = document.getElementById('search-input').value.toLowerCase();
    displayIssues(filteredData.filter(i => i.title.toLowerCase().includes(val)));
}

function showModal(item) {
    const content = document.getElementById('modal-content');
    content.innerHTML = `<h2 class="text-2xl font-bold mb-4">${item.title}</h2><p class="text-gray-600">${item.description}</p>`;
    issue_modal.showModal();
}