const Joi=require("joi");

// Schema for serverside error handling!
module.exports.listingSchema=Joi.object({
    // Jab bhi request ayaa toh listing name ki object honi honi chayeya!
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null),
        category:Joi.string().required(),
    }).required()
});

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
})

