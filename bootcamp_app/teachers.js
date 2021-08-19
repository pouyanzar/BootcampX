const {Pool} = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
const args = process.argv;

pool.query(
  `SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM cohorts
  JOIN students
  ON cohorts.id = cohort_id
  JOIN assistance_requests
  ON student_id = students.id
  JOIN teachers
  ON teachers.id = teacher_id
  WHERE cohorts.name = '${args[2] || 'JUL02'}'
  ORDER BY teacher;`
)
.then(res => {
  res.rows.forEach(row => console.log(`${row.cohort}: ${row.teacher}`))
})
.catch(err => console.error('query error', err.stack));