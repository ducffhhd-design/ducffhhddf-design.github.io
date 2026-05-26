// Dữ liệu mẫu giả lập thay cho Database API phát triển sau này
let mockDocuments = [
    { id: 1, title: "Đề thi Toán Cao Cấp A1 - Học kỳ 2024.1", description: "Đề thi chính thức kèm lời giải chi tiết từ giảng viên.", subject: "toan-cao-cap", year: "2024-2025", views: 124, url: "#" },
    { id: 2, title: "Slide bài giảng Cấu trúc dữ liệu & Giải thuật", description: "Tổng hợp toàn bộ slide lý thuyết nâng cao bằng C++.", subject: "lap-trinh-c", year: "2025-2026", views: 85, url: "#" },
    { id: 3, title: "Báo cáo mẫu thực hành Cơ sở dữ liệu", description: "Đề tài quản lý thư viện đạt điểm A+ học kỳ trước.", subject: "co-so-du-lieu", year: "2024-2025", views: 340, url: "#" }
];

const documentList = document.getElementById('document-list');
const searchInput = document.getElementById('search-input');
const subjectFilter = document.getElementById('subject-filter');
const yearFilter = document.getElementById('year-filter');

// Hàm hiển thị danh sách tài liệu ra HTML
function renderDocuments(docs) {
    documentList.innerHTML = "";
    if(docs.length === 0) {
        documentList.innerHTML = "<p>Không tìm thấy tài liệu phù hợp.</p>";
        return;
    }

    docs.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.innerHTML = `
            <div>
                <span class="doc-tag">${doc.year}</span>
                <h3 class="doc-title">${doc.title}</h3>
                <p class="doc-desc">${doc.description}</p>
            </div>
            <div class="doc-footer">
                <span class="view-count">👁️ ${doc.views} lượt xem</span>
                <a href="${doc.url}" class="btn-download" onclick="increaseView(${doc.id})">Tải về</a>
            </div>
        `;
        documentList.appendChild(card);
    });
}

// Hàm lọc dữ liệu theo Tìm kiếm, Môn học, Năm học
function filterDocuments() {
    const searchText = searchInput.value.toLowerCase();
    const selectedSubject = subjectFilter.value;
    const selectedYear = yearFilter.value;

    const filtered = mockDocuments.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchText);
        const matchesSubject = selectedSubject === "" || doc.subject === selectedSubject;
        const matchesYear = selectedYear === "" || doc.year === selectedYear;
        return matchesSearch && matchesSubject && matchesYear;
    });

    renderDocuments(filtered);
}

// ⭐ Hàm PUT API giả lập để tăng lượt xem (Yêu cầu của bạn)
function increaseView(id) {
    // Trong thực tế, bạn sẽ dùng fetch() gửi request PUT lên Server:
    // fetch(`/api/documents/${id}/view`, { method: 'PUT' })

    // Còn hiện tại ta xử lý trực tiếp trên mảng dữ liệu tạm thời:
    const docIndex = mockDocuments.findIndex(d => d.id === id);
    if (docIndex !== -1) {
        mockDocuments[docIndex].views += 1;
        console.log(`PUT API Success: Tài liệu ID ${id} tăng lên ${mockDocuments[docIndex].views} views`);
        
        // Load lại danh sách để thấy số view mới tăng
        filterDocuments(); 
    }
}

// Lắng nghe sự kiện người dùng tương tác với bộ lọc
searchInput.addEventListener('input', filterDocuments);
subjectFilter.addEventListener('change', filterDocuments);
yearFilter.addEventListener('change', filterDocuments);

// Lần đầu tiên chạy ứng dụng hiển thị toàn bộ tài liệu
renderDocuments(mockDocuments);