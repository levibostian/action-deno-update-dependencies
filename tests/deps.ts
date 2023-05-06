// This file contains purposely outdated dependencies that this project will attempt to update. 

// denoland example 
export * from "https://deno.land/x/obsidian@v8.0.0/mod.ts"; // expect to update to next major
export * from "https://deno.land/x/obsidian@v3.2.1/mod.ts#~"; // expect to just update to latest minor/patch

// npm example 
export * from "npm:@octokit/rest@19.0.7" // expect to update to next major 
export * from "npm:@octokit/rest@~18.0.15" // expect to just update to latest minor/patch
