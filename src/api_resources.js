let api = {
    townships_URL: '/v1/admin/townships/',
    all_townships_URL: '/v1/admin/townships/all',
    companies_URL: '/v1/admin/companies/',
    all_companies_URL: '/v1/admin/companies/all',
    jobs_URL: '/v1/admin/jobs/',
    all_jobs_URL: '/v1/admin/jobs/all',
    all_students_URL: '/v1/admin/students/all',
    students_URL: '/v1/admin/students/',
    students_by_job_URL: '/v1/admin/students/job/',
    interviews_URL: '/v1/admin/interviews/',
    company_jobs_URL: (id) => `/v1/admin/company/${id}/jobs`,
    student_jobs_URL: (id) => `/v1/admin/students/${id}/jobs`,
    skills_URL: '/v1/admin/skills',
    languages_URL: '/v1/admin/languages'
};
export default api;
