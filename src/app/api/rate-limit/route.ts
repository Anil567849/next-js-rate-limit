import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

// Create a new rateLimit instance
const rateLimit = new Ratelimit({
	redis: kv, // Use Vercel KV for storage
	limiter: Ratelimit.slidingWindow(5, '1m'), // Limit to 5 requests per minute
});

// set the runtime to edge so that the function runs on the edge
export const runtime = 'edge';

export async function GET(request: NextRequest) {

	// Get the IP address of the user
	const ip = request.headers.get('x-forwarded-for');
    // console.log(ip);    

	// Check if the user has reached their rate limit
	const { success } = await rateLimit.limit(`ratelimit_${ip}`);

	if (!success) {
		return NextResponse.json(
			{
				message: 'Too many requests, please try again later.',
			},
			{
				status: 429, // Too many requests
			}
		);
	}

	return NextResponse.json(
		{
			message: 'Hello, World!',
		},
		{
			status: 200,
		}
	);
}