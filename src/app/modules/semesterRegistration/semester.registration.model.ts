import { model, Schema } from 'mongoose';
import { TSemesterRegistration } from './semester.registration.interface';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic-semester',
    },
    status: {
      type: String,
      enum: ['UPCOMING', 'ONGOING', 'ENDED'],
      default: 'UPCOMING',
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    minCredit: { type: Number, default: 3 },
    maxCredit: { type: Number, default: 15 },
  },
  {
    timestamps: true,
  }
);

export const SemesterRegistratio = model<TSemesterRegistration>(
  'semster-register',
  semesterRegistrationSchema
);
