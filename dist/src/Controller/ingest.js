"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestHandler = void 0;
const db_1 = require("../Model/db");
const to_sheet_1 = require("./to_sheet");
const tmr_1 = require("../Model/tmr");
const uuid_1 = require("uuid");
async function ingestHandler(req, res, next) {
    const codeInternGenerate = (0, uuid_1.v4)();
    const payload = {
        timeperweek: req.body.timeWeek,
        timestamp: req.body.timestamp,
        name: req.body.name,
        email: req.body.email,
        facebook: req.body.facebook,
        phone: req.body.phone,
        dob: req.body.dob,
        livingplace: req.body.livingplace,
        uni: req.body.uni,
        otheruni: req.body.otheruni,
        universityyear: req.body.universityyear,
        major: req.body.major,
        long1: req.body.long1,
        long2: req.body.long2,
        long3: req.body.long3,
        long4: req.body.long4,
        long5: req.body.long5,
        long6: req.body.long6,
        long7: req.body.long7,
        long8: req.body.long8,
        receiveinformation: req.body.receiveinformation,
        utm_source: req.body.utm_source,
        utm_medium: req.body.utm_medium,
        utm_campaign: req.body.utm_campaign,
        utm_term: req.body.utm_term,
        utm_id: req.body.utm_id,
        utm_content: req.body.utm_content,
        channel: req.body.channel,
        sonder: req.body.sonder,
        gender: req.body.gender,
        highschool: req.body.highschool,
        uniplace: req.body.uniplace,
        appliedbefore: req.body.appliedbefore,
        mostpreferred: req.body.mostpreferred,
        secondpreferred: req.body.secondpreferred,
        gocamp: req.body.gocamp,
        codeInternal: codeInternGenerate
    };
    console.log(payload);
    await db_1.db.insert(tmr_1.tmrTableDefined).values(payload)
        .then(async () => await to_sheet_1.toSheetQ.add(`${payload.name} of ${payload.email} to sheet`, payload, {
        removeOnComplete: true,
        removeOnFail: false
    }))
        .then(() => res.status(201).json({ status: 201 }))
        .catch((error) => {
        console.error(error);
        res.status(504).json({ error: 'An error occurred' });
    });
}
exports.ingestHandler = ingestHandler;
//# sourceMappingURL=ingest.js.map