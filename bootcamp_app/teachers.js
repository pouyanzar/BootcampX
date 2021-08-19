const {Pool} = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
const args = process.argv;
const queryString = 
`SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM cohorts
JOIN students
ON cohorts.id = cohort_id
JOIN assistance_requests
ON student_id = students.id
JOIN teachers
ON teachers.id = teacher_id
WHERE cohorts.name = $1
ORDER BY teacher;`

const cohortName = args[2] || 'JUL02';
const values = [cohortName];
pool.query(queryString, values)
.then(res => {
  res.rows.forEach(row => console.log(`${row.cohort}: ${row.teacher}`))
})
.catch(err => console.error('query error', err.stack));