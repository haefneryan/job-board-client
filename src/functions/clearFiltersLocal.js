export const clearFiltersLocal = () => {
    document.getElementById('jobTitle').value = ''
    document.getElementById('companyName').value = ''
    document.getElementById('experience').value = ''
    document.getElementById('all').checked = true
    document.getElementById('location').value = ''
} 