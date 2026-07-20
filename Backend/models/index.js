import User from './User.js';
import Job from './Job.js';
import Application from './Application.js';
import SavedJob from './SavedJob.js';

User.hasMany(Job, { foreignKey: 'posted_by', as: 'postedJobs' });
Job.belongsTo(User, { foreignKey: 'posted_by', as: 'recruiter' });

User.hasMany(Application, { foreignKey: 'candidate_id', as: 'applications' });
Application.belongsTo(User, { foreignKey: 'candidate_id', as: 'candidate' });

Job.hasMany(Application, { foreignKey: 'job_id', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

User.belongsToMany(Job, {
  through: SavedJob,
  foreignKey: 'user_id',
  otherKey: 'job_id',
  as: 'savedJobs',
});

Job.belongsToMany(User, {
  through: SavedJob,
  foreignKey: 'job_id',
  otherKey: 'user_id',
  as: 'savedBy',
});

export { User, Job, Application, SavedJob };