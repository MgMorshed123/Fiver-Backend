import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {

  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a gig!"));

  const newGig = new Gig({
    //  this userId: req.userId, information is coming from veryfyToken
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }

};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};


export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};


export const getGigs = async (req, res, next) => {
  const q = req.query; // Extracting query parameters from the request
  const filters = {
    ...(q.userId && { userId: q.userId }), // Filtering by userId if provided
    ...(q.cat && { cat: q.cat }), // Filtering by category if provided
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }), // Minimum price filter
        ...(q.max && { $lt: q.max }), // Maximum price filter
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }), // Searching by title if provided
  };

  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 }); // Finding gigs with applied filters and sorting
    res.status(200).send(gigs); // Sending the retrieved gigs in the response
  } catch (err) {
    next(err); // Passing any error to the next middleware
  }
};
