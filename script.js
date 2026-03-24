// ১. অনেকগুলো ডেমো কার্ড ডেটা
const issues = [
    { title: "Fix Navigation Menu On Mobile Devices", description: "The navigation menu doesn't collapse properly on small screen resolutions. It overlaps with the logo.", status: "Open", author: "john.doe", priority: "HIGH", label: "UI/UX", createdAt: "1/15/2026" },
    { title: "Dashboard Loading Performance", description: "Main dashboard data takes too long to fetch when thousands of entries exist.", status: "Closed", author: "rahul.dev", priority: "MEDIUM", label: "Performance", createdAt: "1/12/2026" },
    { title: "JWT Auth Token Validation", description: "Tokens are expiring randomly before the set 24-hour limit in production.", status: "Open", author: "sara.smith", priority: "HIGH", label: "Security", createdAt: "1/18/2026" },
    { title: "PDF Report Generation Error", description: "Exporting large reports to PDF format leads to server timeout errors.", status: "Closed", author: "linda.k", priority: "HIGH", label: "Bug", createdAt: "1/10/2026" },
    { title: "Broken Social Media Links", description: "Facebook and Twitter links in footer are pointing to developer environment URLs.", status: "Open", author: "piter.p", priority: "LOW", label: "Bug", createdAt: "1/22/2026" },
    { title: "Search Filter Lag", description: "There's a noticeable 1-second delay when typing fast in the search bar.", status: "Open", author: "jason.m", priority: "MEDIUM", label: "Logic", createdAt: "1/25/2026" },
    { title: "Dark Mode Background Issue", description: "Background remains white on login screen even when system is in dark mode.", status: "Open", author: "mike.ross", priority: "LOW", label: "Style", createdAt: "1/20/2026" },
    { title: "Email Verification Bug", description: "Users are not receiving verification emails for custom domain providers.", status: "Open", author: "tony.s", priority: "HIGH", label: "Feature", createdAt: "1/30/2026" },
    { title: "Table Data Overflow", description: "Responsive tables are breaking layout on tablet view (768px).", status: "Closed", author: "emma.w", priority: "LOW", label: "UI", createdAt: "1/05/2026" },
    { title: "Password Reset Logic", description: "Reset link remains active even after the password has been changed once.", status: "Open", author: "tom.h", priority: "MEDIUM", label: "Security", createdAt: "1/28/2026" },
    { title: "Sticky Header Shadow", description: "Shadow effect on header doesn't appear when scrolling down.", status: "Closed", author: "bruce.w", priority: "LOW", label: "Style", createdAt: "2/02/2026" },
    { title: "Image Upload Limit", description: "Server should prevent images larger than 10MB to be uploaded.", status: "Open", author: "clark.k", priority: "MEDIUM", label: "Backend", createdAt: "2/05/2026" }
];

let filteredData = [...issues];

// ২. লগইন লজিক
function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if(user === 'admin' && pass === 'admin123') {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('main-page').classList.remove('hidden');
        displayIssues(issues);
    } else {
        alert("ভুল ইউজারনেম বা পাসওয়ার্ড! (admin / admin123 চেষ্টা করো)");
    }
}

// ৩. ফিগমা কার্ড রেন্ডারিং
function displayIssues(data) {
    const container = document.getElementById('issue-container');
    const countDisplay = document.getElementById('issue-count');
    container.innerHTML = "";
    countDisplay.innerText = `${data.length} Issues`;

    data.forEach((item) => {
        const borderColor = item.status === 'Open' ? 'border-t-[#22C55E]' : 'border-t-[#A855F7]';
        const priorityColor = item.priority === 'HIGH' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600';
        
        const card = document.createElement('div');
        card.className = `bg-white p-6 rounded-xl shadow-sm border-t-[6px] ${borderColor} cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group`;
        card.onclick = () => showModal(item);
        
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest">${item.label}</span>
                    <span class="px-2 py-0.5 rounded-full ${priorityColor} text-[10px] font-bold tracking-tight">${item.priority}</span>
                </div>
                <h3 class="font-bold text-slate-800 text-base mb-2 group-hover:text-blue-600 transition-colors leading-snug">${item.title}</h3>
                <p class="text-[13px] text-slate-500 mb-6 leading-relaxed line-clamp-3">${item.description}</p>
            </div>
            
            <div class="pt-5 border-t border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                        ${item.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p class="text-[11px] font-bold text-slate-700">@${item.author}</p>
                        <p class="text-[10px] text-slate-400">${item.createdAt}</p>
                    </div>
                </div>
                <div class="flex gap-1">
                    <div class="w-1.5 h-1.5 rounded-full ${item.status === 'Open' ? 'bg-green-500' : 'bg-purple-500'}"></div>
                    <span class="text-[10px] font-bold text-slate-400 uppercase">${item.status}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// ৪. ট্যাব ফিল্টারিং
function filterData(status, element) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active', 'bg-white', 'shadow-sm', 'text-blue-600'));
    element.classList.add('tab-active', 'bg-white', 'shadow-sm', 'text-blue-600');

    document.getElementById('issue-container').classList.add('opacity-0');
    document.getElementById('loading').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('issue-container').classList.remove('opacity-0');

        filteredData = status === 'All' ? issues : issues.filter(i => i.status === status);
        displayIssues(filteredData);
    }, 400);
}

// ৫. সার্চ
function handleSearch() {
    const value = document.getElementById('search-input').value.toLowerCase();
    const result = filteredData.filter(i => i.title.toLowerCase().includes(value));
    displayIssues(result);
}

// ৬. মডাল ডিটেইলস
function showModal(item) {
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <div class="flex justify-between items-start mb-6">
             <div class="flex gap-2">
                <span class="badge badge-primary px-4 py-3 font-bold">${item.label}</span>
                <span class="badge badge-ghost px-4 py-3 font-bold">${item.priority}</span>
             </div>
             <span class="text-sm font-black px-4 py-1 rounded-lg ${item.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}">${item.status.toUpperCase()}</span>
        </div>
        <h2 class="text-3xl font-extrabold text-slate-800 mb-4 leading-tight">${item.title}</h2>
        <p class="text-slate-600 text-lg mb-8 leading-relaxed border-l-4 border-slate-200 pl-4 italic">"${item.description}"</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl">
            <div>
                <p class="text-[10px] uppercase font-bold text-slate-400 mb-1">Assigned Author</p>
                <p class="font-bold text-slate-700">@${item.author}</p>
            </div>
            <div>
                <p class="text-[10px] uppercase font-bold text-slate-400 mb-1">Issue Created</p>
                <p class="font-bold text-slate-700">${item.createdAt}</p>
            </div>
            <div>
                <p class="text-[10px] uppercase font-bold text-slate-400 mb-1">Project Phase</p>
                <p class="font-bold text-blue-600 font-mono">Development</p>
            </div>
        </div>
    `;
    issue_modal.showModal();
}