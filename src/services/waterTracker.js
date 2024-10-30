import WaterTrackerCollection from '../db/models/waterTracker.js';

export const getAllWaterTracker = () => WaterTrackerCollection.find();
export const getWaterTrackerById = id => WaterTrackerCollection.findById(id);
