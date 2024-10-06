const UserSchedule = require('../Model/userscheduleModel');

const WorkoutAssign = (
  weight,
  age,
  currenybodytypee,
  goalbodytype,
  musclegain,
) => {
  let scheduleid = 0;

  if (age < 35 && age >= 25) {
    if (
      (currenybodytypee === 'hevey' &&
        goalbodytype === 'fit' &&
        musclegain === 'musalgain') ||
      goalbodytype === 'fat' ||
      goalbodytype === 'avarage'
    ) {
      if (weight < 50 && weight >= 30) {
        scheduleid = 1;
      } else if (weight < 70 && weight >= 50) {
        scheduleid = 2;
      } else if (weight < 95 && weight >= 70) {
        scheduleid = 3;
      } else if (weight < 110 && weight >= 95) {
        scheduleid = 4;
      } else if (weight < 150 && weight >= 110) {
        scheduleid = 5;
      }
    } else if (currenybodytypee === 'fat' && goalbodytype === 'fit') {
      if (weight < 50 && weight >= 30) {
        scheduleid = 6;
      } else if (weight < 70 && weight >= 50) {
        scheduleid = 7;
      } else if (weight < 95 && weight >= 70) {
        scheduleid = 8;
      } else if (weight < 110 && weight >= 95) {
        scheduleid = 9;
      } else if (weight < 150 && weight >= 110) {
        scheduleid = 10;
      }
    }
  } else if (age < 25 && age >= 18) {
    if (currenybodytypee === 'avarage' && goalbodytype === 'hevey') {
      if (weight < 50 && weight >= 30) {
        scheduleid = 11;
      } else if (weight < 70 && weight >= 50) {
        scheduleid = 12;
      } else if (weight < 95 && weight >= 70) {
        scheduleid = 13;
      } else if (weight < 110 && weight >= 95) {
        scheduleid = 14;
      } else if (weight < 150 && weight >= 110) {
        scheduleid = 15;
      }
    } else if (currenybodytypee === 'fat' && goalbodytype === 'fit') {
      if (weight < 50 && weight >= 30) {
        scheduleid = 16;
      } else if (weight < 70 && weight >= 50) {
        scheduleid = 17;
      } else if (weight < 95 && weight >= 70) {
        scheduleid = 18;
      } else if (weight < 110 && weight >= 95) {
        scheduleid = 19;
      } else if (weight < 150 && weight >= 110) {
        scheduleid = 20;
      }
    }
  }

  return scheduleid;
};

exports.Workout = async (req, res) => {
  const scheduleid = WorkoutAssign();

  const userid = req.body.userid;

  try {
    const result = await UserSchedule.create({
      userid: userid,
      scheduleid: scheduleid,
    });

    res.status(201).json({
      status: 'success',
      data: {
        schedule: result,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: error.message,
    });
  }
};
