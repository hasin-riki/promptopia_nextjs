import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        await connectToDB();

        const searchQuery = request.nextUrl.searchParams.get('search');

        let prompts;
        if (!searchQuery) {
            prompts = await Prompt.find({}).populate('creator');
        } else {
            const regex = new RegExp(searchQuery, 'i');

            prompts = await Prompt.find({tag: regex}).populate('creator');
        }

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts.", { status: 500 });
    }
}