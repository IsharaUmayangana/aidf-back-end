//@ts-nocheck

import OpenAI from "openai"
import JobApplication from "../../persistance/entities/JobApplication";

const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export const generateRating = async (jobApplicationId) => {
    const jobApplication = await JobApplication.findById(jobApplicationId).populate("job");

    const content = `Role: ${jobApplication.job.title}, User Description : ${jobApplication.answers.join(". ")}`;

    const completion = await client.chat.completions.create(
        {
            messages: [{role:"user",content}],
            model: "ft:gpt-3.5-turbo-0125:stemlink:fullstacktutorial:9CR6nB4Y"
        }
    );
    console.log(completion.choices[0].message.content);
    const response = JSON.parse(completion.choices[0].message.content);

    if(!response.rate){
        return
    }

    await JobApplication.findOneAndUpdate({_id:jobApplicationId},{rating:response.rate});
}