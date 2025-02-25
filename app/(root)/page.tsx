import SearchForm from "@/components/SearchForm";
import React from "react";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY} from "@/sanity/lib/queries";
// import {client} from "@/sanity/lib/client";
import {StartupTypeCard} from "@/components/StartupCard";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import {auth} from "@/auth";
import {client} from "@/sanity/lib/client";

export default async function Home({searchParams}:{searchParams:Promise<{query?: string}>}){
    const query = (await searchParams).query;
    // const posts =  await client.fetch(STARTUPS_QUERY)
    const params = {search: query || null};
    const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});
    const session = await auth();
    console.log(session?.id)
    console.log(client)
    return(
        <>
            <section className="pink_container">
                <h1 className="heading">Pitch Your Startup, <br/> Connect with Entrepreneurs</h1>
                <p className="sub-heading !max-w-3xl">
                    Submit ideas, Vote on pitches and get noticed in Virtual Competitions.
                </p>
                <SearchForm query = {query}/>
            </section>
            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}" `:"All Startups"}
                </p>

                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post:StartupTypeCard)=>(
                            <StartupCard key={post?._id} post={post}/>
                        ))
                    ):(
                        <p>No Startups Found</p>
                    )}

                </ul>

            </section>
        <SanityLive/>
        </>

    )
}
