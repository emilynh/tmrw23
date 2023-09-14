import { boolean, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

export const tmrTableDefined = pgTable('TMR', {
    id: serial('id').primaryKey(),
    timestamp: text("timestamp"),
    utm_source: text('utm_source'),
    utm_medium: text('utm_medium'),
    utm_campaign: text('utm_campaign'),
    utm_term: text('utm_term'),
    utm_id: text('utm_id'),
    utm_content: text('utm_content'),
    name: text("name"),
    dob: text("dob"),
    email: text("email"),
    phone: text("phone"),
    facebook: text("facebook"),
    gender: text("gender"),
    uni: text("uni"),
    otheruni: text("otheruni"),
    livingplace: text("livingplace"),
    highschool: text("highschool"),
    uniplace: text("uniplace"),
    universityyear: text("universityyear"),
    major: text("major"),
    long1: text("long1"),
    long2: text("long2"),
    long3: text("long3"),
    long4: text("long4"),
    long5: text("long5"),
    long6: text("long6"),
    long7: text("long7"),
    long8: text("long8"),
    channel: text("channel"),
    sonder: text("sonder"),
    gocamp: text("gocamp"),
    receiveinformation: text("receiveinformation"),
    timeperweek: text("timeperweek"),
    appliedbefore: text("appliedbefore"),
    mostpreferred: text("mostpreferred"),
    secondpreferred: text("secondpreferred"),
    toSheet: boolean("toSheet").default(false),
    codeInternal: text("codeInternal")
});

export type TMR = typeof tmrTableDefined.$inferSelect; // return type when queried
export type newTMR = typeof tmrTableDefined.$inferInsert; // insert type


/* const db: NodePgDatabase = drizzle(...);
 
const result: User[] = await db.select().from(users);
 
export async function insertUser(user: NewUser): Promise<User[]> {
  return db.insert(users).values(user).returning();
} */