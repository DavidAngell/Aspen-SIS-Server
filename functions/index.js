const { aspenSession } = require('aspen-sis');

const functions = require("firebase-functions");
const express = require('express');
const app = express();

app.get('/v1/getRecentGradedAssignments', (req, res) => {
    // Verify parameters
    if (!req.query.username) {
        res.status(400).send({ error: true, errorMessage: "Missing username" });
        return;
    } else if (!req.query.password) {
        res.status(400).send({ error: true, errorMessage: "Missing password" });
        return;
    } else if (!req.query.aspenDomain) {
        res.status(400).send({ error: true, errorMessage: "Missing aspen domain" });
        return;
    }

    // Create session and get recent graded assignments
    const session = aspenSession(req.query.aspenDomain);
    session.login(req.query.username, req.query.password)
        .catch(err => res.send({ error: true, errorMessage: err }))
        .then(() => {
            session.getRecentGradedAssignments(req.query.classToken)
                .catch(err => res.status(400).send({ error: true, errorMessage: err }))
                .then(assignments => res.status(200).send(assignments))
        })
});

app.get('/v1/getAllAssignmentsByClass', async (req, res) => {
    // Verify parameters
    if (!req.query.username) {
        res.status(400).send({ error: true, errorMessage: "Missing username" });
        return;
    } else if (!req.query.password) {
        res.status(400).send({ error: true, errorMessage: "Missing password" });
        return;
    } else if (!req.query.aspenDomain) {
        res.status(400).send({ error: true, errorMessage: "Missing aspen domain" });
        return;
    } else if (!req.query.classToken) {
        res.status(400).send({ error: true, errorMessage: "Missing class token" });
        return;
    }

    // Create session and get all assignments by class
    const session = aspenSession(req.query.aspenDomain);
    session.login(req.query.username, req.query.password)
        .catch(err => res.send({ error: true, errorMessage: err }))
        .then(() => {
            session.getAllAssignmentsByClassToken(req.query.classToken)
                .catch(err => res.status(400).send({ error: true, errorMessage: err }))
                .then(assignments => res.status(200).send(assignments))
        })
});

app.get('/v1/getPortalClassList', (req, res) => {
    // Verify parameters
    if (!req.query.username) {
        res.status(400).send({ error: true, errorMessage: "Missing username" });
        return;
    } else if (!req.query.password) {
        res.status(400).send({ error: true, errorMessage: "Missing password" });
        return;
    } else if (!req.query.aspenDomain) {
        res.status(400).send({ error: true, errorMessage: "Missing aspen domain" });
        return;
    }

    // Create session and get portal class list
    const session = aspenSession(req.query.aspenDomain);
    session.login(req.query.username, req.query.password)
        .catch(err => res.send({ error: true, errorMessage: err }))
        .then(() => {
            session.getPortalClassList()
                .catch(err => res.status(400).send({ error: true, errorMessage: err }))
                .then(classList => res.status(200).send(classList))
        })
});

exports.app = functions.runWith({ minInstances: 5, timeoutSeconds: 60 }).https.onRequest(app);