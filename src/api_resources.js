let api = {
    townships_URL: '/v1/admin/townships/',
    all_townships_URL: '/v1/admin/townships/all',
    companies_URL: '/v1/admin/companies/',
    all_companies_URL: '/v1/admin/companies/all',
    jobs_URL: '/v1/admin/jobs/',
    student_job_URL: '/v1/admin/jobs/add/student_job',
    // company_jobs_URL: `/v1/admin/company/${id}/jobs`,
    // company_jobs_URL: '/v1/admin/jobs/company',
    all_jobs_URL: '/v1/admin/jobs/all',
    all_students_URL: '/v1/admin/students/all',
    students_URL: '/v1/admin/students/',
    students_by_job_URL: '/v1/admin/students/job/',
    interviews_URL: '/v1/admin/interviews/',
    company_jobs_URL: (id) => `/v1/admin/company/${id}/jobs`,
    // update_company_jobs_URL: (company_id, job_id) => `/v1/admin/company/${company_id}/jobs/${job_id}`,
};
export default api;
