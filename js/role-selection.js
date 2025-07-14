document.addEventListener('DOMContentLoaded', () => {
    const roleButtons = document.querySelectorAll('.role-button');

    roleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const role = button.dataset.role;
            localStorage.setItem('userRole', role);
            window.location.href = `${role}.html`;
        });
    });
});
