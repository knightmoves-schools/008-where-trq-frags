const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
function runScript(db, script) {
  const sql = fs.readFileSync(script, 'utf8');
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
describe('the SQL in the `exercise.sql` file', () => {
  let db;
  let scriptPath;
  
  beforeAll(() => {
    const dbPath = path.resolve(__dirname, '..', 'lesson8.db');
    db = new sqlite3.Database(dbPath);
    scriptPath = path.resolve(__dirname, '..', 'exercise.sql');
  });
  
  afterAll(() => {
    db.close();
  });
  
  it('should return SalesAssociates who make a Salary of less than or equal to 1162, within the Employee table', async () => {
      const results = await runScript(db, scriptPath);

      expect(results.every(employee => employee.SALARY <= 1162)).toBe(true);
  });
});
