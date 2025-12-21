import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

// Run the market simulation every minute
crons.interval("market_tick", { minutes: 5 }, api.simulation.tick, {});

export default crons;
