import { leads } from "./mockData/leads.js";
import { contacts } from "./mockData/contacts.js";
import { deals } from "./mockData/deals.js";
import { activity } from "./mockData/activity.js";

/**
 * This file simulates a real backend: async functions, network latency,
 * and the occasional failure. This is intentionally FINISHED — it's not
 * where you're meant to practice React concepts. It's the "server" you
 * write hooks and effects AGAINST.
 *
 * Treat every function here the way you'd treat a fetch() call to a real
 * REST API: you don't know exactly how long it'll take, and it can fail.
 */

const NETWORK_DELAY_MS = 500;
const FAILURE_RATE = 0.05; // 5% of calls randomly fail — build your error states for real

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function maybeFail() {
  if (Math.random() < FAILURE_RATE) {
    throw new Error("Network request failed. Please try again.");
  }
}

// In-memory copies so "writes" (create/update) persist for the session
// without a real database. Resets on page refresh — that's expected.
let leadsStore = [...leads];
const dealsStore = [...deals];

// "Registered" users for the fake auth. Only an email/password pair that
// matches a user here is allowed to log in. Resets on refresh — expected.
const REGISTERED_USERS = [
  { name: "Sijibomi", email: "demo@pulse.app", password: "demo123" },
];
let usersStore = [...REGISTERED_USERS];

export const api = {
  async getLeads() {
    await delay(NETWORK_DELAY_MS);
    maybeFail();
    return [...leadsStore];
  },

  async getLeadById(id) {
    await delay(NETWORK_DELAY_MS);
    maybeFail();
    const lead = leadsStore.find((l) => l.id === id);
    if (!lead) throw new Error(`Lead ${id} not found`);
    return lead;
  },

  async createLead(newLead) {
    await delay(NETWORK_DELAY_MS);
    maybeFail();
    const lead = {
      id: `ld_${String(leadsStore.length + 1).padStart(3, "0")}`,
      status: "new",
      createdAt: new Date().toISOString(),
      ...newLead,
    };
    leadsStore = [lead, ...leadsStore];
    return lead;
  },

  async updateLeadStatus(id, status) {
    await delay(NETWORK_DELAY_MS);
    maybeFail();
    leadsStore = leadsStore.map((l) => (l.id === id ? { ...l, status } : l));
    return leadsStore.find((l) => l.id === id);
  },

  async getContacts() {
    await delay(NETWORK_DELAY_MS);
    maybeFail();
    return [...contacts];
  },

  async getDeals() {
    await delay(NETWORK_DELAY_MS);
    maybeFail();
    return [...dealsStore];
  },

  async updateDealStage(id, stage) {
    await delay(NETWORK_DELAY_MS);
    maybeFail();
    const index = dealsStore.findIndex((d) => d.id === id);
    if (index === -1) throw new Error(`Deal ${id} not found`);
    dealsStore[index] = { ...dealsStore[index], stage };
    return dealsStore[index];
  },

  async getActivity() {
    await delay(NETWORK_DELAY_MS);
    maybeFail();
    return [...activity];
  },

  // Fake auth — good enough to practice Context + forms against.
  // Only a REGISTERED email + matching password is accepted.
  async login(email, password) {
    await delay(NETWORK_DELAY_MS);
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    const user = usersStore.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      throw new Error("Invalid email or password.");
    }
    // Don't leak the password back to the client.
    const { password: _pw, ...safeUser } = user;
    return { id: `usr_${safeUser.email}`, ...safeUser };
  },

  // Registers a new user (in-memory). Rejects duplicate emails.
  async register({ name, email, password }) {
    await delay(NETWORK_DELAY_MS);
    if (!name || !email || !password) {
      throw new Error("Name, email and password are required.");
    }
    const exists = usersStore.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      throw new Error("An account with that email already exists.");
    }
    const newUser = { name, email, password };
    usersStore = [...usersStore, newUser];
    const { password: _pw, ...safeUser } = newUser;
    return { id: `usr_${safeUser.email}`, ...safeUser };
  },
};
