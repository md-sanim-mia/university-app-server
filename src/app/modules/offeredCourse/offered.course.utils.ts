import { StatusCodes } from 'http-status-codes';
import { TSchedul } from './offered.course.interface';
import { AppError } from '../../errors/AppError';

export const hasTimeConflict = (
  assignSchedules: TSchedul[],
  newSchedul: TSchedul
) => {
  for (const schedul of assignSchedules) {
    const existStartTime = new Date(`970-01-01T${schedul.startTime}`);
    const existEndTime = new Date(`970-01-01T${schedul.endTime}`);
    const newStartTime = new Date(`970-01-01T${newSchedul.startTime}`);
    const newEndTime = new Date(`970-01-01T${newSchedul.endTime}`);

    if (newStartTime < existStartTime && newEndTime > existEndTime) {
      return true;
    }
  }

  return false;
};
