import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../db.json');

// Utility function to read JSON file
const readDB = (): any => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// Utility function to write JSON file
const writeDB = (data: any): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export const ping = (req: Request, res: Response): void => {
  res.send(true);
};

export const submit = (req: Request, res: Response): void => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const newSubmission = { name, email, phone, github_link, stopwatch_time };
  
  const db = readDB();
  db.submissions.push(newSubmission);
  writeDB(db);

  res.status(201).send(newSubmission);
};

export const read = (req: Request, res: Response): void => {
  const {index } = req.query;
  const ind = parseInt(index as string, 10);
  const db = readDB();
  
  let data = db.submissions[ind]

  if (!isNaN(ind) && ind >= 0 && ind < db.submissions.length) {

    data.totalForms = db.submissions.length
    res.send(data);
  } 
  else if(ind == db.submissions.length){
        res.status(404).send({ error: 'No more submissions' });
    }
  else res.status(404).send({ error: 'Submission not found' });
};

export const deleteSubmission = (req: Request, res: Response): void => {
    const { index } = req.query;
    const db = readDB();
  
    const ind = parseInt(index as string, 10);
  
    if (!isNaN(ind) && ind >= 0 && ind < db.submissions.length) {
      db.submissions.splice(ind, 1);
      writeDB(db);
      res.send({ success: true });
    } else {
      res.status(404).send({ error: 'Submission not found' });
    }
  };

  export const updateSubmission = (req: Request, res: Response): void => {
    const { index } = req.query;
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const db = readDB();
  
    const ind = parseInt(index as string, 10);
  
    if (!isNaN(ind) && ind >= 0 && ind < db.submissions.length) {
      db.submissions[ind] = { name, email, phone, github_link, stopwatch_time };
      writeDB(db);
      res.send({ success: true });
    } else {
      res.status(404).send({ error: 'Submission not found' });
    }
  };


