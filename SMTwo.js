const moment = require("moment");

const yearMonDay = "YYYY-MM-DD";

class SMTwo {
  constructor(obj) {
    this.easiness = obj.easiness;
    this.interval = obj.interval;
    this.repetitions = obj.repetitions;
    this.reviewDate = obj.reviewDate;
  }

  static firstReview(quality, reviewDate = null, dateFmt = null) {
    if (!reviewDate) {
      reviewDate = moment().format(yearMonDay);
    }
    if (!dateFmt) {
      dateFmt = yearMonDay;
    }
    return new SMTwo({ easiness: 2.5, interval: 0, repetitions: 0 }).review(
      quality,
      reviewDate,
      dateFmt
    );
  }

  toJSON() {
    return {
      easiness: this.easiness,
      interval: this.interval,
      repetitions: this.repetitions,
      reviewDate: this.reviewDate,
    };
  }

  review(quality, reviewDate = null, dateFmt = null) {
    if (!reviewDate) {
      reviewDate = moment().format(yearMonDay);
    }
    if (!dateFmt) {
      dateFmt = yearMonDay;
    }
    if (typeof reviewDate === "string") {
      reviewDate = moment(reviewDate, dateFmt).format(yearMonDay);
    }
    if (quality < 3) {
      this.interval = 1;
      this.repetitions = 0;
    } else {
      if (this.repetitions === 0) {
        this.interval = 1;
      } else if (this.repetitions === 1) {
        this.interval = 6;
      } else {
        this.interval = Math.ceil(this.interval * this.easiness);
      }
      this.repetitions = this.repetitions + 1;
    }
    this.easiness += 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
    if (this.easiness < 1.3) {
      this.easiness = 1.3;
    }
    reviewDate = moment(reviewDate, yearMonDay)
      .add(this.interval, "days")
      .format(yearMonDay);
    this.reviewDate = reviewDate;
    return this;
  }
}

module.exports = SMTwo;
