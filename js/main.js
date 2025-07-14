document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const adminBtn = document.getElementById('adminBtn');
    const pmBtn = document.getElementById('pmBtn');
    const salesBtn = document.getElementById('salesBtn');

    const adminDashboard = `
        <div class="dashboard">
            <div class="panel">
                <h2>Admin Dashboard</h2>
                <p>Overview Panels: Total Revenue, Projects, Inventory Status, Staff Activity</p>
                <p>Quick Access: Add new branch, sync data, export full report</p>
                <p>Staff Management: Create, assign, monitor roles</p>
                <p>App Settings: Language, Currency, Tax, Permissions</p>
                <p>System Logs: View transaction history, sync issues, backup logs</p>
            </div>
        </div>
    `;

    const pmInterface = `
        <div class="dashboard">
            <div class="panel">
                <h2>Project Manager Interface</h2>
                <p>Projects Tab: View all ongoing projects with status indicators</p>
                <p>Material Dashboard: Products allocated vs. used</p>
                <p>Team Assignments: Staff assigned to each project, last login/action</p>
                <p>Notifications: Material requests, deadlines, updates</p>
                <p>Communication Board: Leave comments, upload files/photos</p>
            </div>
        </div>
    `;

    const salesInterface = `
        <div class="dashboard">
            <div class="panel">
                <h2>Sales Interface (POS Mode)</h2>
                <p>Clean Retail-Focused UI</p>
                <p>Simple "New Sale" flow</p>
                <p>Auto-search bar for products</p>
                <p>Category buttons for fast item access (Cement, Nails, Paint)</p>
                <p>Customer Quick Add</p>
                <p>Tap-to-enter name + contact</p>
                <p>Track purchase history</p>
                <p>Fast Receipts</p>
                <p>Tap → Confirm → Print/WhatsApp</p>
                <p>Offline Alert Toggle: Show small icon or banner when not synced</p>
            </div>
        </div>
    `;

    function showAdminDashboard() {
        content.innerHTML = adminDashboard;
    }

    function showPmInterface() {
        content.innerHTML = pmInterface;
    }



    function showSalesInterface() {
        content.innerHTML = salesInterface;
    }

    adminBtn.addEventListener('click', showAdminDashboard);
    pmBtn.addEventListener('click', showPmInterface);
    salesBtn.addEventListener('click', showSalesInterface);

    // Show admin dashboard by default
    showAdminDashboard();
});
