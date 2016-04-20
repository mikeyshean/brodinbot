BrodinBot
===================

Record your fitness data through an SMS chat interface.
Messages are parsed and analyzed to trigger conversation workflows that
can either write to or query from the database.  Users will then be able
to view analytics created from their data through the web-app. Create or
modify conversation workflows using the admin tools and attach triggers to
hook them into the existing decision tree.  The goal is to build a
flexible tool to be able to deploy chat bots for other use cases.

Features (MVP)
----------

- [x] Twilio SMS Integration
- [x] Parse incoming messages and route to appropriate response workflow
- [x] Workflow 1 - New User Creation
- [ ] Workflow 2 - Select exercise & save resistance/rep count
- [ ] User Auth
- [ ] Create admin tool to easily create new workflows and attach triggers
- [ ] User should be able to save # of Sets/Reps/Resistance by exercise type via SMS
- [ ] Login via Web App to view analytics


Languages/Frameworks/Tools
----------
- Ruby/Rails
- React/Flux
- Twilio SMS API

## Design Docs
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md
