import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Job = sequelize.define(
  'Job',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: [3, 150],
      },
    },
    company: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    job_type: {
      type: DataTypes.ENUM('Full-time', 'Part-time', 'Contract', 'Internship'),
      allowNull: false,
    },
    salary_min: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    salary_max: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING(5),
      defaultValue: 'USD',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    benefits: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'closed', 'draft'),
      defaultValue: 'draft',
    },
    posted_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    application_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'jobs',
    timestamps: false,
  }
);

export default Job;
